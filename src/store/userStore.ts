import { defineStore } from "pinia";
import { UserInfo } from "@/types";
import { getUserInfoAPI } from "@/api/user";

export const userStore = defineStore("user", {
	state: () => {
		return {
			userInfo: <UserInfo>{},
		};
	},
	actions: {
		setUserInfo() {
			getUserInfoAPI().then((res) => {
				console.log(res);
				this.userInfo = res.data;
			});
		},
	},
	getters: {},
});
