import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/yield",
    name: "yield",
    hidden: false,
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
    ],
  },
];
