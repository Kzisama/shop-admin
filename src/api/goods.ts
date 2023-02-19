import axios from '@/untils/axios'

export const addCategoryAPI = (form: { name: string }) => {
  return axios.post('/goods/addcategory', form)
}

export const getCategoryAPI = () => {
  return axios.get('/goods/getcategory')
}

export const setCategoryAPI = (form: { categoryID: number; name: string }) => {
  return axios.put('/goods/setcategory', form)
}

export const delCategoryAPI = (form: { categoryID: number }) => {
  return axios.post('/goods/delcategory', form)
}

export const addGoodsAPI = (fd: FormData) => {
  return axios.post('/goods/addgoods', fd)
}

export const getGoodsListAPI = () => {
  return axios.get('/goods/getgoods')
}

export const setGoodsAPI = (fd: FormData) => {
  return axios.post('/goods/setgoods', fd)
}

export const takeOffGoodsAPI = (obj: { goodsID: number; status: number }) => {
  return axios.post('/goods/takeoffgoods', obj)
}
export const delGoodsAPI = (obj: { goodsID: number }) => {
  return axios.post('/goods/delgoods', obj)
}
