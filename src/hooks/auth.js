import { useCookies } from "@vueuse/integrations/useCookies";

const TokenKey = "admin-token";
const cookie = useCookies();
// 设置token
export const useSetToken = (token) => {
  cookie.set(TokenKey, token);
};
// 获取token
export const useGetToken = () => {
  return cookie.get(TokenKey);
};
// 删除token
export const useRemoveToken = () => {
  cookie.remove(TokenKey);
};