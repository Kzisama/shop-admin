import { defineStore } from "pinia";
import { IRoute } from "@/types";

export const menuRouteStore = defineStore("routes", {
  state: () => {
    return {
      routeTree: <IRoute[]>[],
    };
  },
  actions: {
    setRouteTree(tree: IRoute[]) {
      this.routeTree = tree;
    },
  },
});
