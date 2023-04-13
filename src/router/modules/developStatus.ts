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
        path: "developmentWarningCapacity",
        name: "developmentWarningCapacity",
        meta: { title: "开发预警" },
        component: () => import("@/pages/rem/developStatus/developmentWarningCapacity.vue"),
      },
      {
        hidden: true,
        path: "developmaenWamingter",
        name: "developmaenWamingter",
        meta: { title: "新预警" },
        component: () => import("@/pages/rem/developStatus/developmentWarning/developmaenWamingter.vue"),
      },

      {
        hidden: true,
        path: "radioValue",
        name: "radioValue",
        meta: { title: "观察" },
        component: () => import("@/pages/rem/developStatus/developmentWarning/radioValue.vue"),
      },
      {
        hidden: true,
        path: "developmaenWamingterOne",
        name: "developmaenWamingterOne",
        meta: { title: "历史预警" },
        component: () => import("@/pages/rem/developStatus/developmentWarning/developmaenWamingterOne.vue"),
      },
      //油藏-开发现状跟踪-开发预警-预警处理
      {
        hidden: true,
        path: "warningDisposeOil",
        component: () => import("@/pages/rem/developStatus/warningDisposeOil.vue"),
        name: "warningDisposeOil",
        meta: { title: "预警处理" },
      },
      //油藏-开发现状跟踪-开发预警-预警处理1
      {
        hidden: true,
        path: "warningDisposeWater",
        component: () => import("@/pages/rem/developStatus/warningDisposeWater.vue"),
        name: "warningDisposeWater",
        meta: { title: "预警处理1" },
      },
      {
        path: "developmentEffectEvaluation",
        name: "developmentEffectEvaluation",
        component: () =>
          import("@/pages/rem/developStatus/developmentEffectEvaluation/index.vue"),
        meta: { title: "开发效果评价" },
      },
    ],
  },
];
