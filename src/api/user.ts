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

// 修改密码---个人
export const updatePasswordAPI = (form: {
	oldpassword: string;
	password: string;
	repassword: string;
}) => {
	return axios.post("/user/updatepassword", {
		...form,
	});
};

// 退出登录
export const logoutAPI = () => {
	return axios.post("/user/logout");
};
