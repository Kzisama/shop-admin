import { getCurrentInstance } from 'vue'

export const useGlobal = () => {
  // 解构
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any
  return globalProperties
}
