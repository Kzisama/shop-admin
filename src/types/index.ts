export interface UserInfo {
  userID: number
  username: string
  avatar: string | null
  character: string
  createtime: string
  role: string // JSON格式的 number[]
  nickname: string | null
  tel: string | null
  email: string | null
  status: number
}

export interface IRoute {
  routeID: number
  pid: number
  path: string
  name: string
  pname: string
  link?: string
  title: string
  icon: string
  children?: IRoute[]
}

export interface Role {
  id: number
  character: string
  describe: string
  roles: string
}

export interface Category {
  categoryID: number
  name: string
  status: number
}
