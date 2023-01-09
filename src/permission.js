import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import store from '@/store';
import router from '@/router';

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters['permission/whiteListRouters'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

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
