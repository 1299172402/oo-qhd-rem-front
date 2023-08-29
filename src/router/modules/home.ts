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
        path: 'oilexhibition',
        name: 'oilexhibition',
        component: () => import('@/pages/rem/home/reservoirDisplay/oilexhibition.vue'),
        meta: { title: '油藏看板',icon: 'icon' },
      },
        {
            path: 'worker',
            name: 'worker',
            component: () => import('@/pages/rem/home/reservoirDisplay/worker.vue'),
            meta: { title: '油藏工程师看板',icon: 'icon' },
        },
        {
            path: 'director',
            name: 'director',
            component: () => import('@/pages/rem/home/reservoirDisplay/director.vue'),
            meta: { title: '主任工程师看板',icon: 'icon' },
        },
        {
            path: 'leader',
            name: 'leader',
            component: () => import('@/pages/rem/home/reservoirDisplay/leader.vue'),
            meta: { title: '分公司领导看板',icon: 'icon' },
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
        {
            path: 'problemWellStatistics',
            name: 'problemWellStatistics',
            hidden: true,
            component: () => import('@/pages/rem/home/reservoirDisplay/table/problemWellStatistics.vue'),
            meta: { title: '问题井详细',icon: 'icon' },
        },
    
    ],
    
  },
];
