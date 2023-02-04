import axios from "@/untils/axios.js";

// 登录
export const loginAPI = (form: { username: string; password: string }) => {
	return axios.post("/api/login", {
		username: form.username,
		password: form.password,
	});
};

// 获取用户信息
export const getUserInfoAPI = () => {
	return axios.get("/user/info");
};
