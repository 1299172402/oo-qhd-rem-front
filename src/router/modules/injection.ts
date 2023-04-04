import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/injection',
    name: 'injection',
    hidden: false,
    component: Layout,
    meta: { title: '智能注采调配', icon: 'client', single: false },
    children: [
        
      {
        path: 'productionSplit',
        name: 'productionSplit',
        component: () => import('@/pages/rem/injection/productionSplit/index.vue'),
        meta: { title: '产量劈分',icon: 'icon' }
      },
      {
        path: 'splitSection',
        name: 'splitSection', 
        hidden: true,
        component: () => import('@/pages/rem/injection/productionSplit/splitSection.vue'),
        meta: { title: '劈产剖面'}
      }, 
      {
        path: 'DividingCoefficient', 
        name: 'DividingCoefficient', 
        hidden: true, 
        component: () => import('@/pages/rem/injection/productionSplit/dividingCoefficient.vue'), 
        meta: { title: '劈分系数'}
      }
    ],
    
  },
];
