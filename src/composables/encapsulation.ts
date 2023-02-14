// 二次封装element组件-----函数触发
import { ElNotification, ElMessageBox } from "element-plus";

export const useNotification = (message: string, type: any, title: string) => {
  return ElNotification({
    title,
    message,
    type,
    duration: 1500,
  });
};

export const useElMessageBox = (content: string, title: string, type: any) => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type,
  });
};
