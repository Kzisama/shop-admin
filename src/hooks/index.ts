import { RouteRecordRaw } from "vue-router";
import { IRoute } from "@/types";

// list转换成tree
export function dataToTree(list: IRoute[]) {
  const parent = list.filter((routeInfo) => routeInfo.pid === 0);
  const children = list.filter((routeInfo) => routeInfo.pid !== 0);
  changeTree(parent, children);

  return parent;

  function changeTree(parent: IRoute[], children: IRoute[]) {
    parent.forEach((parent) => {
      children.forEach((child, index) => {
        // 两者相等表示为父子路由
        if (parent.routeID === child.pid) {
          // 此时进行递归,将原有的children拷贝一份
          let _children: IRoute[] = JSON.parse(JSON.stringify(children));
          // 剔除该路由本身,就可以将其当作父路由再去遍历children中剩下的的元素 _children
          _children.splice(index, 1);
          changeTree([child], _children);
          if (parent.children) {
            // 如果此时父路由有children属性，就追加
            parent.children.push(child);
          } else {
            // 如果此时父路由没有children属性，就设置一个初始值
            parent.children = [child];
          }
        }
      });
    });
  }
}

// 根据tree转换成route对象
export function generateRoute(routerTree: IRoute[]) {
  let newRoutes = routerTree.map((route) => {
    let _route: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      component: () => import(`@/pages/${route.pname}/${route.name}.vue`),
      meta: {
        title: route.title,
        icon: route.icon,
      },
      children: [],
    };
    // 如果路由有children，那么继续添加
    if (route.children) {
      _route.children = generateRoute(route.children);
    }
    return _route;
  });
  return newRoutes;
}
