import Layout from '@/layouts/index.vue';
const env = import.meta.env.MODE;
export default [
  {
    // hidden: env == "development" ? false : true,
    hidden:true,    
    path: '/injection',
    name: 'injection',
    component: Layout,
    meta: { title: '智能注采调配', icon: 'client', single: false },
    children: [
      {
        path: 'injection',
        name: 'injection',
        component: () => import('@/pages/rem/injection/yieldSplitting.vue'),
        meta: { title: '产量劈分',icon: 'icon' },
      },
      // {
      //   path: 'splitSection',
      //   name: 'splitSection',
      //   hidden: true,
      //   component: () => import('@/pages/rem/injection/productionSplit/splitSection.vue'),
      //   meta: { title: '劈分剖面',icon: 'icon' },
      // },
      // {
      //   path: 'DividingCoefficient',
      //   name: 'DividingCoefficient',
      //   hidden: true,
      //   component: () => import('@/pages/rem/injection/productionSplit/dividingCoefficient.vue'),
      //   meta: { title: '劈分系数',icon: 'icon' },
      // },
      {
        path: 'connectivityData',
        name: 'connectivityData',
        component: () => import('@/pages/rem/injection/connectivityData/connectivityData.vue'),
        meta: { title: '井间连通性评价',icon: 'icon' },
      },
      // {
      //   path: 'coefficientCalculates',
      //   name: 'coefficientCalculates', 
      //   hidden:true,
      //   component: () => import('@/pages/rem/injection/connectivityData/connectivityCoefficientCalculatesProperty.vue'),
      //   meta: { title: '基础计算数据',icon: 'icon' },
      // },
      {
        path: 'optimization',
        name: 'optimization',
        component: () => import('@/pages/rem/injection/optimization/index.vue'),
        meta: { title: '注采调配优化',icon: 'icon' },
      },
    //   {
    //     path: 'optimizationResult',
    //     name: 'optimizationResult',
    //     hidden: true,
    //     component: () => import('@/pages/rem/injection/optimization/result.vue'),
    //     meta: { title: '方案详情',icon: 'icon' },
    //   },
    // //油藏管理-注采调配优化-查看详情
    //   {
    //     path: "optimizationDetail",
    //     name: "optimizationDetail",
    //     component: () => import("@/pages/rem/injection/optimization/view.vue"),
    //     hidden: true,
    //     meta: { title: "查看详情" },
    //   },
    //   {
    //     path: 'feasibilityAssessment',
    //     name: 'feasibilityAssessment',
    //     hidden: true,
    //     component: () => import('@/pages/rem/injection/feasibilityAssessment/feasibilityAssessment.vue'),
    //     meta: { title: '可行性评估',icon: 'icon' },
    //   },
    ],
    
  },
];
