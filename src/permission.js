import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import store from "@/store";
import router from "@/router";
import { sysMenuAccess, checkAndRefreshToken } from "@/api/intelligentOilfield/system/user";

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters["permission/whiteListRouters"];
let defaultToWithoutPath = null;

router.beforeEach(async(to, from, next) => {
  NProgress.start();
  if (to.query.access_token) {
    if (to.path === "/appCallback") {
      next();
      return;
    }
    next({
      path: "/appCallback",
      query: {
        ...to.query,
        redirect: to.path
      }
    });
    return;
  }
  if ((to.path === "/login" && Object.prototype.hasOwnProperty.call(to.query, "srid")) || to.path.indexOf("/iamCallback") === 0 || to.path === "/appCallback") {
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
        store.commit("user/SETISGROUPLOGIN", false);
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
  const token = store.getters["user/token"];
  if (router.currentRoute.path !== "/login" && router.currentRoute.path !== "/appCallback" && token) {
    // 1.判断token是否失效
    const tokenParams = {
      token: store.getters["user/token"],
      username: store.getters["user/userInfo"].userName
    };
    checkAndRefreshToken(tokenParams).then(response => {
      if (response?.data?.data) {
        const tokenIsLose = response.data.data.tokenExpired;
        const currentRoute = router.currentRoute;
        let params = {
          menuName: "",
          menuPath: ""
        };
        if (!tokenIsLose) {
          // 不做统计的白名单：投影和办公
          if (currentRoute.path !== "/portal/officeMode" && currentRoute.path !== "/portal/projectionMode") {
            store.commit("permission/setScrollLoading", true);
            // 2.通过currentRoute.params判断是否为二级页面
            if (JSON.stringify(currentRoute.params) === "{}") { // 一级页面不带query传参
              params = {
                menuName: currentRoute.meta.title,
                menuPath: currentRoute.path
              };
            } else { // 二级页面不带query传参
              // 3.path路径做截取处理
              params = {
                menuName: currentRoute.meta.title,
                menuPath: currentRoute.path.slice(0, currentRoute.path.lastIndexOf("/"))
              };
            }
            // 4.调用访问页面接口统计
            sysMenuAccess(params).then(() => {});
          }
        }
      }
    });
  }
  NProgress.done();
});