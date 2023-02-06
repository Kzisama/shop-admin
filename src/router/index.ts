import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/layout/index.vue"),
	},
	{
		path: "/login",
		component: () => import("@/pages/login/Login.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/pages/notfound/NotFound.vue"),
		meta: {
			title: "页面走丢了",
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
