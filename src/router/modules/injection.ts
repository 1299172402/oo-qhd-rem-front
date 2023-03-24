import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/injection',
    name: 'injection',
    hidden: true,
    component: Layout,
    meta: { title: '智能注采调配', icon: 'client', single: false },
    children: [
      {
        path: 'injection',
        name: 'injection',
        component: () => import('@/pages/rem/injection/yieldSplitting.vue'),
        meta: { title: '产量劈分',icon: 'icon' },
      },
    ],
    
  },
];
