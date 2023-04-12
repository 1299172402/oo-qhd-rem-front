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
        hidden:true,
        component: () => import('@/pages/rem/home/linkage/index.vue'),
        meta: { title: '注采联动',icon: 'icon' },
      },
      {
        path: 'reservoirDisplay',
        name: 'reservoirDisplay',
        component: () => import('@/pages/rem/home/reservoirDisplay/index.vue'),
        meta: { title: '油藏看板',icon: 'icon' },
      },
    ],
    
  },
];
