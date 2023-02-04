import axios from "axios";
import { useNotification } from "@/composables/encapsulation.js";
import { getToken } from "./token";

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
	interface AxiosResponse<T = any> {
		token: string;
		code: number;
		msg: string;
		// 这里追加你的参数
	}
	export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const service = axios.create({
	baseURL: "/base", // 配置在vite.config.ts中
	timeout: 20000,
});

// 添加请求拦截器
service.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		const token = getToken();
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		return response.data;
	},
	function (error) {
		// 对响应错误做点什么
		useNotification(error.response.data.msg || "请求错误", "error", "");
		return Promise.reject(error);
	}
);

export default service;
