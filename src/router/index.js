import VueRouter from 'vue-router';

// import baseRouters from './modules/base';
// import componentsRouters from './modules/components';
// import othersRouters from './modules/others';
import smartOilfield from './modules/smartOilfield';
import Layout from '@/layouts/index.vue';

// 存放动态路由
// export const asyncRouterList = [...smartOilfield, ...baseRouters, ...componentsRouters, ...othersRouters];
export const asyncRouterList = [...smartOilfield,];


// 存放固定的路由
const defaultRouterList = [
//   {
//     path: '*',
//     redirect: '/login',
//   },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/intelligentOilfield/login/index.vue'),
  },
  ...asyncRouterList,
];

const createRouter = () =>
  new VueRouter({
    routes: defaultRouterList,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
