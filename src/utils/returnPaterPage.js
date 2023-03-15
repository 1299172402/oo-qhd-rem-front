import store from '@/store';
import router from '@/router/index';

export default (currentPath, path) => {
  console.log(currentPath);
  console.log(path);
  store.commit('tabRouter/subtractCurrentTabRouter', {
    path: store.getters['tabRouter/tabRouterList'].find((item) => item.path === currentPath).path,
    routeIdx: store.getters['tabRouter/tabRouterList'].findIndex((item) => item.path === currentPath),
  });
  router.push({ path });
};
