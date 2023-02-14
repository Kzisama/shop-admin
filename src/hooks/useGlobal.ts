import { getCurrentInstance } from "vue";

export const useGlobal = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  return globalProperties;
};
