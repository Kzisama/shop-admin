import axios from "@/untils/axios.js";

// 登录
export const loginAPI = (form: { username: string; password: string }) => {
	return axios.post("/api/login", {
		username: form.username,
		password: form.password,
	});
};

// 退出登录
export const logoutAPI = () => {
	return axios.post("/user/logout");
};

// 创建用户
export const createAPI = (form: {
	username: string;
	password: string;
	character: string;
	nickname: string;
	tel: string;
	email: string;
}) => {
	return axios.post("/user/create", form);
};

// 获取用户信息
export const getUserInfoAPI = () => {
	return axios.get("/user/info");
};

// 获取全部用户信息
export const getUserInfoAllAPI = () => {
	return axios.get("/user/allinfo");
};

// 修改用户信息
export const updateUserInfoAPI = (form: {
	nickname: string | null;
	tel: string | null;
	email: string | null;
}) => {
	return axios.post("/user/update", form);
};

// 修改密码---个人
export const updatePasswordAPI = (form: {
	oldpassword: string;
	password: string;
	repassword: string;
}) => {
	return axios.post("/user/updatepassword", form);
};

// 获取用户路由
export const getRouteAPI = () => {
	return axios.get("/user/routes");
};

// 修改用户头像
export const updateAvatarAPI = (arg: FormData) => {
	return axios.post("/user/avatar", arg);
};
