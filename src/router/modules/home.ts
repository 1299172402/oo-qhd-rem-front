import Layout from '@/layouts/index.vue';

export default [
  {
    // hidden: env == "development" ? false : true,
    hidden:true,  
    path: '/reservoirDisplay',
    name: 'reservoirDisplay',
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
        path: 'oilEventDetail',
        name: 'oilEventDetail',
        hidden: true,
        component: () => import('@/pages/rem/home/reservoirDisplay/detailPage/oilEventDetail.vue'),
        meta: { title: '油田大事件详情',icon: 'icon' },
      },
    
    ],
    
  },
];
