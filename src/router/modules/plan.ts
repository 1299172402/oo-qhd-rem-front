import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
  {
    hidden: env == "development" ? false : true,
    path: "/plan",
    name: "plan",
    component: Layout,
    redirect: "/plan/operationplan",
    meta: { title: "规划计划管理", icon: "client", single: false },
    children: [
      {
        hidden: false,
        path: "newPlanIndex",
        name: "newPlanIndex",
        component: () => import("@/pages/rem/plan/newPlanIndex.vue"),
        meta: { title: "措施管理", icon: "icon" },
      },
      {
        hidden: true,
        path: "wellMonitoring",
        name: "wellMonitoring",
        component: () => import("@/pages/rem/plan/wellMonitoring.vue"),
        meta: { title: "措施效果跟踪", icon: "icon" },
      },
      {
        hidden: true,
        path: "effectofMeasures",
        name: "effectofMeasures",
        component: () => import("@/pages/rem/plan/effectofMeasures.vue"),
        meta: { title: "措施效果跟踪", icon: "icon" },
      },
      {
        path: "longTermPlanSearchLongTermPlan",
        name: "longTermPlanSearchLongTermPlan",
        component: () => import("@/pages/rem/performance/MediumAnlOnG/longTermPlanSearchLongTermPlan.vue"),
        meta: { title: "中长期开发计划", icon: "icon" },
      },
      {
        path: "AnnualProgramManagement",
        name: "AnnualProgramManagement",
        component: () => import("@/pages/rem/performance/MediumAnlOnG/AnnualProgramManagement.vue"),
        meta: { title: "年度计划管理", icon: "icon" },
      },
      // 原油产量详情
      {
        path: "CrudeOutput",
        name: "CrudeOutput",
        component: () => import("@/pages/rem/performance/MediumAnlOnG/CrudeOutput.vue"),
        meta: { title: "原油产量详情", icon: "icon" },
      },
      // 油田注水详情
      {
        path: "OilfieldWaterInjectionManagement",
        name: "OilfieldWaterInjectionManagement",
        component: () => import("@/pages/rem/performance/MediumAnlOnG/OilfieldWaterInjectionManagement.vue"),
        meta: { title: "油田注水详情", icon: "icon" },
      },
      // 两提一降
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/rem/performance/MediumAnlOnG/index.vue"),
        meta: { title: "两提一降", icon: "icon" },
      },
    ],
  },
];
