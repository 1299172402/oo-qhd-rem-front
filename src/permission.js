import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import store from '@/store';
import router from '@/router';
import { jumpFromGateway } from "@/utils/thirdPartyInteraction";

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters['permission/whiteListRouters'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.path === "/login" && Object.prototype.hasOwnProperty.call(to.query, "srid")) {
    // 如果跳转到登录页且携带srid参数则放行
    next();
    NProgress.done();
    return;
  }
  if (to.path.indexOf("/iamCallback") === 0 ) {
    next();
  } else if (Object.prototype.hasOwnProperty.call(to.query, "srid")) {
    // url地址存在srid参数携带该参数跳转到登录页
    await store.commit("user/removeToken");
    next({ path: "/login", query: { ...to.query }});
  } else if (jumpFromGateway(to)) {
    return;
  }
  const token = store.getters['user/token'];

  if (token) {
    // console.log('toPath', to.path)
    // if (to.path === '/login') {
    //   setTimeout(() => {
    //     store.dispatch('user/logout');
    //     store.dispatch('permission/restore');
    //     console.log('12121212')
    //   });
    //   next();
    //   return;
    // }

    const roles = store.getters['user/roles'];

    if (roles && roles.length > 0) {
      next();
    } else {
      try {
        await store.dispatch('user/getUserInfo');

        // 路由跳转前拦截：先获取登录时拿到的角色
        await store.dispatch('permission/initRoutes', store.getters['user/roles']);

        next({ ...to });
        // store.dispatch('user/getUserInfo').then(() => {
        //   store.dispatch('permission/initRoutes', store.getters['user/roles']);
        //   next({ ...to });
        // }).catch(err=>{
        //   console.log(err);
        // });
        
      } catch (error) {
        await store.commit('user/removeToken');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
