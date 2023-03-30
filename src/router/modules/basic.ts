import Layout from '@/layouts/index.vue';

export default [
  // 基础数据维护
  {
    path: '/basic',
    name: 'basic',
    component: Layout,
    redirect: '/basic/density',
    meta: { title: '基础数据维护', icon: 'client', single: false },
    children: [
      {
        path: 'density',
        name: 'density',
        component: () => import('@/pages/rem/basic/densityMaintenance/index.vue'),
        meta: { title: '密度维护表' },
      },
      {
        path: 'reserves',
        name: 'reserves',
        component: () => import('@/pages/rem/basic/wellControlReserves/index.vue'),
        meta: { title: '井控储量数据页面' },
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: () => import('@/pages/rem/basic/wellGroupMaintenance/index.vue'),
        meta: { title: '井组信息维护' },
      },
      // {
      //     path: 'effectofMeasures',
      //     name: 'effectofMeasures',
      //     component: () => import('@/pages/rem/plan/effectofMeasures.vue'),
      //     meta: {title: '人员措施'},
      // },
    ],
  },
];
