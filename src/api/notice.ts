import axios from "@/untils/axios";

export const pubNoticeAPI = (form: { title: string; content: string }) => {
	return axios.post("/notice/publish", form);
};

export const getNoticeAPI = () => {
	return axios.get("/notice/getnotice");
};

export const delNoticeAPI = (noticeID: number) => {
	return axios.put("/notice/delnotice", { noticeID });
};
