import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/reservoirDisplay',
    name: 'reservoirDisplay',
    hidden: false,
    component: Layout,
    meta: { title: '首页', icon: 'client', single: false },
    children: [
      {
        path: 'linkage',
        name: 'linkage',
        hidden:false,
        component: () => import('@/pages/rem/home/linkage/index.vue'),
        meta: { title: '注采联动',icon: 'icon' },
      },
      {
        path: 'reservoirDisplay',
        name: 'reservoirDisplay',
        component: () => import('@/pages/rem/home/reservoirDisplay/index.vue'),
        meta: { title: '油藏看板',icon: 'icon' },
      },
      {
        path: 'shutdownDetection',
        name: 'shutdownDetection',
        component: () => import('@/pages/rem/home/reservoirDisplay/shutdownDetection.vue'),
        meta: { title: '关停井跟踪',icon: 'icon' },
      },
      
      {
        path: 'remHome',
        name: 'remHome',
        component: () => import('@/pages/rem/home/remHome/index.vue'),
        meta: { title: '油藏动态分析',icon: 'icon' },
      },
      {
        path: 'ipmHome',
        name: 'ipmHome',
        component: () => import('@/pages/rem/home/ipmHome/index.vue'),
        meta: { title: '智能注采调配',icon: 'icon' },
      },
    ],
    
  },
];
