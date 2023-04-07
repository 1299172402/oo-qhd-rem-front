import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
  {
    hidden: env == "development" ? false : true,
    path: "/developStatus",
    name: "developStatus",
    component: Layout,
    meta: { title: "开发现状跟踪", icon: "client", single: false },
    children: [
      {
        path: "developmenthistory",
        name: "developmenthistory",
        meta: { title: "开发历程" },
        component: () => import("@/pages/rem/developStatus/developmenthistory.vue"),
      },
      {
        path: "developmentTrendAnalysis",
        name: "developmentTrendAnalysis",
        meta: { title: "开发趋势分析" },
        component: () => import("@/pages/rem/developStatus/developmentTrendAnalysis.vue"),
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
              import('@/pages/rem/developStatus/wellGroupAnalysisAssistant/developmentEffectEvaluation_capacity.vue'),
            meta: { title: '产能类评价', icon: 'icon' },
          },
          //油藏管理-开发现状跟踪-开发效果评价-储量
          // {
          //   path: 'developmentEffectEvaluation_reserves',
          //   component: () =>
          //     import('@/pages/rem/developStatus/wellGroupAnalysisAssistant/developmentEffectEvaluation_reserves.vue'),
          //   name: 'developmentEffectEvaluation_reserves',
          //   meta: { title: '储存类评价', icon: 'icon' },
          // },
          {
            path: 'developmentEffectEvaluation_water',
            component: () =>
              import('@/pages/rem/developStatus/wellGroupAnalysisAssistant/developmentEffectEvaluation_water.vue'),
            name: 'developmentEffectEvaluation_water',
            meta: { title: '含水类评价', icon: 'icon' },
          },
          // {
          //   path: 'developmentEffectEvaluation_Decreasing',
          //   component: () =>
          //     import('@/pages/rem/developStatus/wellGroupAnalysisAssistant/developmentEffectEvaluation_Decreasing.vue'),
          //   name: 'developmentEffectEvaluation_Decreasing',
          //   meta: { title: '递减类评价', icon: 'icon' },
          // },
        ],
      },
    ],
  },
];
