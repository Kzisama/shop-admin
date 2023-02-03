import { getToken } from "@/untils/auth.js";
import { useNotification } from "@/composables/encapsulation.js";
import router from "@/router/index.js";
import store from "./store";

router.beforeEach(async (to, from, next) => {
	const token = getToken();
	// 没有登录
	if (!token && to.path !== "/login") {
		useNotification("请先登录", "error");
		return next({ path: "/login" });
	}
	// 防止重复登录
	if (token && to.path === "/login") {
		useNotification("请勿重复登录", "error");
		return next({ path: from.path ? from.path : "/" });
	}
	// 如果登录，自动获取用户信息并保存数据到vuex中
	if (token) {
		await store.dispatch("getinfo");
	}
	// 设置页面标题
	let title = to.meta.title ? to.meta.title : "超市后台管理";
	document.title = title;
	next();
});
