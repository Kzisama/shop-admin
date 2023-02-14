// 操作 sessionStorage

const TokenKey = "admin-token";
// 设置token
export const setToken = (token: string, name: string = TokenKey) => {
  sessionStorage.setItem(name, token);
};
// 获取token
export const getToken = (name: string = TokenKey) => {
  return sessionStorage.getItem(name);
};
// 删除token
export const removeToken = (name: string = TokenKey) => {
  sessionStorage.removeItem(name);
};
