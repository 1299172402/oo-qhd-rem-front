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
      {
        path: 'connectivityData',
        name: 'connectivityData',
        component: () => import('@/pages/rem/injection/connectivityData/connectivityData.vue'),
        meta: { title: '井间连通性评价',icon: 'icon' },
      },
      {
        path: 'coefficientCalculates',
        name: 'coefficientCalculates', 
        hidden:true,
        component: () => import('@/pages/rem/injection/connectivityData/connectivityCoefficientCalculatesProperty.vue'),
        meta: { title: '基础计算数据',icon: 'icon' },
      },
      {
        path: 'optimization',
        name: 'optimization',
        component: () => import('@/pages/rem/injection/optimization/index.vue'),
        meta: { title: '注采调配优化',icon: 'icon' },
      },
      {
        path: 'optimizationResult',
        name: 'optimizationResult',
        component: () => import('@/pages/rem/injection/optimization/result.vue'),
        meta: { title: '方案详情',icon: 'icon' },
      },
      {
        path: 'feasibilityAssessment',
        name: 'feasibilityAssessment',
        component: () => import('@/pages/rem/injection/feasibilityAssessment/feasibilityAssessment.vue'),
        meta: { title: '可行性评估',icon: 'icon' },
      },
    ],
    
  },
];
