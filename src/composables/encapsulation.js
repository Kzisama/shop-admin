// 二次封装element组件
import { ElNotification, ElMessageBox } from "element-plus";

export const useNotification = (message, type = "success", title = null) => {
	return ElNotification({
		title,
		message,
		type,
		duration: 1500,
	});
};

export const useElMessageBox = (
	content = "提示内容",
	title = "",
	type = "waring"
) => {
	return ElMessageBox.confirm(content, title, {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type,
	});
};
