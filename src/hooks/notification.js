import { ElNotification } from "element-plus";

export const useNotification = (message, type, title = null) => {
  return ElNotification({
    title,
    message,
    type,
    duration: 1500
  });
};