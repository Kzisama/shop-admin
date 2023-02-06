import { useNotification } from "@/composables/encapsulation.js";
import router from "@/router/index.js";
import { getToken } from "@/untils/token";
import { userStore } from "@/store/userStore";
import { dataToTree, generateRoute } from "@/hooks";
import { menuRouteStore } from "@/store/routeStore";
import routesData from "@/mockData/mockRoute.json";

router.beforeEach((to, from, next) => {
	const user = userStore();
	const token = getToken();
	const menuRoute = menuRouteStore();

	// 设置页面标题
	document.title = (to.meta.title as string)
		? (to.meta.title as string)
		: "超市后台管理";

	// 没有登录
	if (!token && to.path !== "/login") {
		useNotification("请先登录", "error", "");
		return next({ path: "/login" });
	}

	// 防止重复登录
	if (token && to.path === "/login") {
		useNotification("请勿重复登录", "error", "");
		return next({ path: from.path ? from.path : "/" });
	}

	// 记录是否有路由动态生成
	let hasRouteAdd = false;
	if (token) {
		user.setUserInfo(); // 获取用户数据并保存

		// 判断是否是刷新，如果刷新那么pinia中的数据会重新加载，此时routerTree长度为0
		// 解决了动态路由重复加载问题
		if (menuRoute.routeTree.length === 0) {
			// TODO:将routesData替换成真实接口提供的数据
			const routeTree = dataToTree(routesData); // 将数据转换成树形结构
			menuRoute.setRouteTree(routeTree); // 将树形结构保存到pinia
			const newRoutes = generateRoute(routeTree); // 树形结构转换成路由对象
			newRoutes.forEach((route) => {
				router.addRoute("Home", route); // 添加路由
				hasRouteAdd = true;
			});
		}
	}

	// 动态路由需要手动调用router.push或router.replace
	hasRouteAdd ? next({ path: to.fullPath }) : next();
});
