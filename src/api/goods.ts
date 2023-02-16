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
