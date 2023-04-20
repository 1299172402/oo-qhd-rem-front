import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
  {
    hidden: env == "development" ? false : true,
    path: "/yield",
    name: "yield",
    component: Layout,
    meta: { title: "产量管理", icon: "client", single: false },
    children: [
      {
        path: "formalPrediction",
        name: "formalPrediction",
        component: () => import("@/pages/rem/yield/formalPrediction/index.vue"),
        meta: { title: "产量形势预测", icon: "icon" },
      },

      {
        path: "ProductionOfEarlyWarning",
        name: "ProductionOfEarlyWarning",
        component: () => import("@/pages/rem/yield/production-management/ProductionOfEarlyWarning.vue"),
        meta: { title: "产量波动预警分析", icon: "icon" },
      },
      //油藏管理-产量管理-产量管理-归因分析-正常
      {
        // hidden: true,
        path: "NormalAttributionReporting",
        component: () => import("@/pages/rem/yield/production-management/NormalAttributionReporting.vue"),
        name: "NormalAttributionReporting",
        meta: { title: "产量管理-归因分析-正常", icon: "icon" },
      },
    ],
  },
];
