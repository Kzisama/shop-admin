import { useGetToken } from "@/hooks/auth.js";
import { useNotification } from "@/hooks/notification.js";
import router from "@/router/index.js";

router.beforeEach((to, from, next) => {
  const token = useGetToken();
  // 没有登录
  if (!token && to.path !== "/login") {
    useNotification("请先登录", "error");
    return next({ path: "/login" });
  }
  // 防止重复登录
  if (token && to.path === "/login") {
    useNotification("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  next();
});