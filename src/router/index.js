import VueRouter from "vue-router";
import { MessageBox } from "element-ui";
// import baseRouters from './modules/base';
// import componentsRouters from './modules/components';
// import othersRouters from './modules/others';
// import smartOilfield from './modules/smartOilfield';
import Layout from "@/layouts/index.vue";

import proxy from "@/config/host.ts";

const env = import.meta.env.MODE;

// 存放动态路由
// export const asyncRouterList = [...smartOilfield, ...baseRouters, ...componentsRouters, ...othersRouters];
// 批量引入@/router/modules下所有ts文件
export const myFiles = import.meta.globEager("./modules/*.ts");
let modules = [];
Object.keys(myFiles).forEach(el => {
  modules = [].concat(modules, myFiles[el].default);
});
export const asyncRouterList = modules;

// 存放固定的路由
const defaultRouterList = [
//   {
//     path: '*',
//     redirect: '/login',
//   },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/pages/redirect.vue")
      }
    ]
  },
  {
    path: "/iamCallback",
    name: "iamCallback",
    hidden: true,
    component: () => import("@/pages/intelligentOilfield/login/components/IamCallback.vue")
  },
  {
    path: "/appCallback",
    name: "appCallback",
    hidden: true,
    component: () => import("@/pages/intelligentOilfield/login/components/AppCallback.vue")
  },
  {
    path: "/appIframeView",
    name: "appIframeView",
    hidden: true,
    component: () => import("@/pages/intelligentOilfield/iframePage/AppIframeView.vue")
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: (to, from, next) => {
      if (window.self !== window.top) {
        // 在 iframe 中，直接提示
        MessageBox.alert("当前数据有误，请刷新浏览器后再操作");
      } else if (proxy[env].appId !== "$system$" && env !== "development") {
        next(`/appCallback?redirect=${to.query?.redirect}`);
      } else {
        next();
      }
    },
    component: () => import("@/pages/intelligentOilfield/login/index.vue")
  },
  {
    path: "/file/preview",
    name: "PreviewPage",
    component: () => import("@/components/upload/preview/PreviewPage.tsx")
  },
  ...asyncRouterList
];

const createRouter = () =>
  new VueRouter({
    routes: defaultRouterList,
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;