import { defineStore } from "pinia";
import { UserInfo } from "@/types";
import { getUserInfoAPI } from "@/api/user";

const SERVER_URL = "http://127.0.0.1:8081";

export const userStore = defineStore("user", {
	state: () => {
		return {
			userInfo: <UserInfo>{},
		};
	},
	actions: {
		setUserInfo() {
			getUserInfoAPI().then((res) => {
				const user = {
					...res.data,
					avatar: SERVER_URL + res.data.avatar,
				};
				this.userInfo = user;
			});
		},
	},
	getters: {},
});
