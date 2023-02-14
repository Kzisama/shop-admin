import { defineStore } from "pinia";

export const menuStore = defineStore("menu", {
  state: () => {
    return {
      // 侧边栏展开状态
      isFold: true,
      asideWidth: "230px",
    };
  },
  actions: {
    foldFn() {
      this.isFold = !this.isFold;
      this.asideWidth = this.isFold ? "230px" : "64px";
    },
  },
});
