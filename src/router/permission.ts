import { useNotification } from "@/composables/encapsulation.js";
import router from "@/router/index.js";
import { getToken } from "@/untils/token";
import mainStore from "@/store";
import { dataToTree, generateRoute } from "@/hooks";
import { getRouteAPI } from "@/api/user";

let hasGetInfo = false; // 是否获取过用户数据

router.beforeEach(async (to, from, next) => {
	const token = getToken();

	const { user, menuRoute } = mainStore();

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
	if (token && !hasGetInfo) {
		user.setUserInfo(); // 获取用户数据并保存

		hasGetInfo = true; // 标记为以获取过用户数据

		// 解决动态路由重复加载
		const res = await getRouteAPI(); // 获取用户路由
		const routeTree = dataToTree(res.data.userRoutes); // 将用户路由转换成树形结构
		menuRoute.setRouteTree(routeTree); // 将树形结构保存到pinia
		const newRoutes = generateRoute(routeTree); // 树形结构转换成路由对象
		newRoutes.forEach((route) => {
			router.addRoute("Home", route); // 添加路由
			hasRouteAdd = true;
		});
	}

	// 设置页面标题
	document.title = (to.meta.title as string)
		? (to.meta.title as string)
		: "超市后台管理";

	// 动态路由需要手动调用router.push或router.replace
	hasRouteAdd ? next({ path: to.fullPath }) : next();
});
