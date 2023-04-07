import Layout from '@/layouts/index.vue';
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
];
