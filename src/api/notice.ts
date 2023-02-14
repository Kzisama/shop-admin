import axios from "@/untils/axios";

// 发布通知
export const pubNoticeAPI = (form: { title: string; content: string }) => {
  return axios.post("/notice/publish", form);
};

// 获取通知
export const getNoticeAPI = () => {
  return axios.get("/notice/getnotice");
};

// 删除通知
export const delNoticeAPI = (noticeID: number) => {
  return axios.put("/notice/delnotice", { noticeID });
};
