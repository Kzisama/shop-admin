export interface UserInfo {
	id: number;
	username: string;
	avatar: string | null;
	charactor: string;
	role: string; // JSON格式的 number[]
}
