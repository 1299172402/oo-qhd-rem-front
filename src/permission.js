import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import store from "@/store";
import router from "@/router";

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters["permission/whiteListRouters"];
let defaultToWithoutPath = null;

router.beforeEach(async(to, from, next) => {
  NProgress.start();
  if ((to.path === "/login" && Object.prototype.hasOwnProperty.call(to.query, "srid")) || to.path.indexOf("/iamCallback") === 0) {
    // 如果跳转到登录页且携带srid参数则放行
    next();
    NProgress.done();
    return;
  }
  if (Object.prototype.hasOwnProperty.call(to.query, "srid")) {
    // url地址存在srid参数携带该参数跳转到登录页
    await store.commit("user/removeToken");
    next({ path: "/login", query: { ...to.query }});
    NProgress.done();
    return;
  }
  const token = store.getters["user/token"];

  if (token) {
    const roles = store.getters["user/roles"];
    if (roles && roles.length > 0) {
      if (to.path === "/portal/projectionMode" || to.path === "/portal/officeMode") {
        store.commit("user/SETISGROUPLOGIN", true);
        next();
      } else {
        defaultToWithoutPath = store.getters["permission/defaultTo"];
        if (to.path === "/login" || to.path === "/" || (to.path === "/pageInfo/error" && defaultToWithoutPath !== "/pageInfo/error")) {
          // 如果没有指定跳转地址，则获取默认路径或者可跳转菜单的第一个,并且切回后台模式
          store.commit("tabRouter/removeTabRouterList");
          store.commit("user/SETISGROUPLOGIN", false);
          next(defaultToWithoutPath);
          // 如果本身地址不变，需要关闭一下进度条，因为不执行 afterEach
          NProgress.done();
        } else {
          next();
        }
      }
    } else {
      try {
        if (from.path !== "/login") {
          await store.dispatch("user/getUserInfo");
        } else {
          await store.dispatch("user/getUserInfo", "firstLogin");
        }
        // 路由跳转前拦截：先获取登录时拿到的角色
        await store.dispatch("permission/initRoutes", store.getters["user/roles"]);
        next({ ...to });
      } catch (error) {
        await store.commit("user/removeToken");
        next(`/login?redirect=${to.fullPath}`);
        NProgress.done();
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      Object.prototype.hasOwnProperty.call(to.query, "srid") ? next({ path: "/login", query: { ...to.query }}) : next(`/login?redirect=${to.fullPath}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});