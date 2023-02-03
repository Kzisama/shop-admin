// 管理员模块
import axios from "@/untils/axios.js";

// 登录
export const loginAPI = (username: string, password: string) => {
	return axios.post("/admin/login", {
		username,
		password,
	});
};

// 退出登录
export const logoutAPI = () => {
	return axios.post("/admin/logout");
};

// 获取管理员信息
export const getAdminInfoAPI = () => {
	return axios.post("/admin/getinfo");
};
