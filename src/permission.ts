import { useNotification } from "@/composables/encapsulation.js";
import router from "@/router/index.js";
import { getToken } from "@/untils/token";
import { userStore } from "@/store/userStore";

router.beforeEach(async (to, from, next) => {
	const user = userStore();
	const token = getToken();
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
	// 如果登录，自动获取用户信息并保存数据到vuex中
	if (token) {
		user.setUserInfo();
	}
	// 设置页面标题
	document.title = (to.meta.title as string)
		? (to.meta.title as string)
		: "超市后台管理";
	next();
});
