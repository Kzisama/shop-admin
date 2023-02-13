export interface UserInfo {
	userID: number;
	username: string;
	avatar: string | null;
	character: string;
	createtime: string;
	role: string; // JSON格式的 number[]
	nickname: string | null;
	tel: string | null;
	email: string | null;
	status: number;
}
