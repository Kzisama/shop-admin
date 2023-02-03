import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@/pages/layout/index.vue"),
		meta: {
			title: "后台首页",
		},
	},
	{
		path: "/login",
		component: () => import("@/pages/login/index.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/pages/notfound/index.vue"),
		meta: {
			title: "页面走丢了",
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
