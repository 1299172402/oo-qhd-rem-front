import Layout from '@/layouts/index.vue';
<<<<<<< HEAD
import VSAuth from '@vsui/lib-vueauth4vseaf';

function checkLogined(to, userName, userPermission) {
  return VSAuth.getAuthInfo().isLogined;
}

export default [
  {
    path: '/dynamicManagement',
    name: 'dynamicManagement',
    hidden: false,
    component: Layout,
    meta: { title: '油藏动态管理', icon: 'client', single: false },
    children: [
      {
        path: 'dynamicTrackingOilAuxiliary',
        name: 'dynamicTrackingOilAuxiliary',
        meta: { title: '油井动态分析' },
        component: () => import('@/layouts/blank.vue'),
        children: [
          {
            hidden: false,
            path: 'oilAuxiliaryAnalysis',
            name: 'oilAuxiliaryAnalysis',
            component: () => import('@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/index.vue'),
            meta: { title: '油井辅助分析', icon: 'icon' },
          },
        ],
      },
      {
        path: 'performance',
        name: 'performance',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '井组动态分析', single: false },
        children: [
          {
            path: 'groupAssistance',
            name: 'groupAssistance',
            component: () => import('@/pages/rem/performance/wellGroup/groupAssistance/groupAssistance.vue'),
            meta: { title: '井组辅助分析', icon: 'icon' },
          },
        ],
      },
      {
        path: 'dynamicTrackingBlock',
        name: 'dynamicTrackingBlock',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '区块动态分析', single: false },
        children: [
          {
            path: 'blockAnalysisAided',
            name: 'blockAnalysisAided',
            component: () => import('@/pages/rem/performance/dynamicTracking/blockAnalysisAided/index.vue'),
            meta: { title: '区块辅助分析', icon: 'icon' },
          },
        ],
      },
      {
        path: 'wellGroupAnalysisAssistant',
        name: 'wellGroupAnalysisAssistant',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '开发效果评价', single: false },
        children: [
          {
            path: 'developmentEffectEvaluation_capacity',
            name: 'developmentEffectEvaluation_capacity',
            component: () =>
              import('@/pages/rem/performance/wellGroupAnalysisAssistant/developmentEffectEvaluation_capacity.vue'),
            meta: { title: '产能类评价', icon: 'icon' },
          },

          //油藏管理-开发现状跟踪-开发效果评价-储量
          {
            path: 'developmentEffectEvaluation_reserves',
            component: () =>
              import('@/pages/rem/performance/wellGroupAnalysisAssistant/developmentEffectEvaluation_reserves.vue'),
            name: 'developmentEffectEvaluation_reserves',
            meta: { title: '储存类评价', icon: 'icon' },
          },
          {
            path: 'developmentEffectEvaluation_water',
            component: () =>
              import('@/pages/rem/performance/wellGroupAnalysisAssistant/developmentEffectEvaluation_water.vue'),
            name: 'developmentEffectEvaluation_water',
            meta: { title: '含水类评价', icon: 'icon' },
          },

          {
            path: 'developmentEffectEvaluation_Decreasing',
            component: () =>
              import('@/pages/rem/performance/wellGroupAnalysisAssistant/developmentEffectEvaluation_Decreasing.vue'),
            name: 'developmentEffectEvaluation_Decreasing',
            meta: { title: '递减类评价', icon: 'icon' },
          },
        ],
      },
      // 开发预警
      {
        path: 'developmentWarning',
        name: 'developmentWarning',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '开发预警', single: false },
        children: [
          {
            path: 'developmentWarning_capacity',
            name: 'developmentWarning_capacity',
            component: () => import('@/pages/rem/performance/developmentWarning/developmentWarning_capacity.vue'),
            meta: { title: '产能类评价', icon: 'icon' },
          },
          {
            path: 'developmentWarningConfigTwo',
            name: 'developmentWarningConfigTwo',
            component: () => import('@/pages/rem/performance/developmentWarning/developmentWarningConfigTwo.vue'),
            meta: { title: '模型配置', icon: 'icon' },
          },
        ],
      },
      {
        path: 'MediumAnlOnG',
        name: 'MediumAnlOnG',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '规划计划管理', single: false },
        children: [
          {
            path: 'longTermPlanSearchLongTermPlan',
            name: 'longTermPlanSearchLongTermPlan',
            component: () => import('@/pages/rem/performance/MediumAnlOnG/longTermPlanSearchLongTermPlan.vue'),
            meta: { title: '中长期开发计划', icon: 'icon' },
          },
        ],
      },
    ],
  },
=======
const env = import.meta.env.MODE;
export default [
    {
        hidden: env=='development'?false:true,
        path: '/dynamicManagement',
        name: 'dynamicManagement',
        component: Layout,
        meta: { title: '油藏动态管理', icon: 'client', single: false },
        children: [
            {
                path: 'dynamicTrackingOilAuxiliary',
                name: 'dynamicTrackingOilAuxiliary',
                meta: { title: '油井动态分析' },
                component: () => import('@/layouts/blank.vue'),
                children: [
                    {
                        hidden: false,
                        path: 'oilAuxiliaryAnalysis',
                        name: 'oilAuxiliaryAnalysis',
                        component: () => import('@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/index.vue'),
                        meta: { title: '油井辅助分析', icon: 'icon' },
                    },
                    // {
                    //     hidden: false,
                    //     path: 'oilReport',
                    //     name: 'oilReport',
                    //     component: () => import('@/pages/rem/performance/dynamicTracking/oilReport/index.vue'),
                    //     meta: { title: '油井分析报告', icon: 'icon' },
                    // },
                    // {
                    //     hidden: false,
                    //     path: 'waterReport',
                    //     name: 'waterReport',
                    //     component: () => import('@/pages/rem/performance/dynamicTracking/waterReport/index.vue'),
                    //     meta: { title: '水井分析报告', icon: 'icon' },
                    // },
                ],
            },
            {
                path: 'dynamicTrackingWaterAuxiliary',
                name: 'dynamicTrackingWaterAuxiliary',
                meta: { title: '水井动态分析' },
                component: () => import('@/layouts/blank.vue'),
                children: [
                    {
                        hidden: false,
                        path: 'waterAuxiliaryAnalysis',
                        name: 'waterAuxiliaryAnalysis',
                        component: () => import('@/pages/rem/performance/dynamicTracking/waterAuxiliaryAnalysis/index.vue'),
                        meta: { title: '水井辅助分析', icon: 'icon' },
                    },
                ],
            },
            {
                path: 'dynamicTrackingWellGroup',
                name: 'dynamicTrackingWellGroup',
                hidden: false,
                component: () => import('@/layouts/blank.vue'),
                meta: { title: '井组动态分析', single: false },
                children: [
                    {
                        path: 'wellGroupAnalysisAssistant',
                        name: 'wellGroupAnalysisAssistant',
                        component: () => import('@/pages/rem/performance/dynamicTracking/wellGroupAnalysisAssistant/index.vue'),
                        meta: { title: '井组辅助分析', icon: 'icon' },
                    },
                ],
            },
            {
                path: 'dynamicTrackingBlock',
                name: 'dynamicTrackingBlock',
                component: () => import('@/layouts/blank.vue'),
                meta: { title: '区块动态分析', single: false },
                children: [
                    {
                        path: 'blockAnalysisAided',
                        name: 'blockAnalysisAided',
                        component: () => import('@/pages/rem/performance/dynamicTracking/blockAnalysisAided/index.vue'),
                        meta: { title: '区块辅助分析', icon: 'icon' },
                    },
                ],
            },
            // {
            //   path: 'wellPerformance',
            //   name: 'wellPerformance',
            //   component: () => import('@/pages/rem/performance/wellPerformance/index.vue'),
            //   meta: { title: '水井动态分析', single: false },
            //   children: [
            //     {
            //       path: 'wellPerformance',
            //       name: 'wellPerformance',
            //       component: () => import('@/pages/rem/performance/wellPerformance/index.vue'),
            //       meta: { title: '水井辅助分析',icon: 'icon' },
            //     },
            //   ],
            // },
        ],
    },
>>>>>>> facb8e03914a579dd6ecbf3f7491703a5c49198c
];
