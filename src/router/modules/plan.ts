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
        path: "longTermPlanSearchLongTermPlan",
        name: "longTermPlanSearchLongTermPlan",
        component: () => import("@/pages/rem/AnnualProgramManagement/longTermPlanSearchLongTermPlan.vue"),
        meta: { title: "中长期开发规划", icon: "icon" },
      },



      
      {
        hidden: false,
        path: "newPlanIndex",
        name: "newPlanIndex",
        component: () => import("@/pages/rem/plan/newPlanIndex.vue"),
        meta: { title: "措施管理", icon: "icon" },
      },
      //年度计划管理
      {
        hidden: false,
        path: "AnnualProgramManagement",
        name: "AnnualProgramManagement",
        component: () => import("@/pages/rem/AnnualProgramManagement/AnnualProgramManagement.vue"),
        meta: { title: "年度计划管理", icon: "icon" },
      },
      //油藏管理-规划计划管理-年度计划管理-原油产量详情
      {
        hidden: false,
        path: "CrudeOutput",
        name: "CrudeOutput",
        component: () => import("@/pages/rem/AnnualProgramManagement/CrudeOutput.vue"),
        meta: { title: "原油产量详情", icon: "icon" },
      },
      //油藏管理-规划计划管理-年度计划管理-油田注水量详情
      {
        hidden: false,
        path: "OilfieldWaterInjectionManagement",
        name: "OilfieldWaterInjectionManagement",
        component: () => import("@/pages/rem/AnnualProgramManagement/OilfieldWaterInjectionManagement.vue"),
        meta: { title: "油田注水量详情", icon: "icon" },
      },
      //油藏管理-规划计划管理-年度计划管理-中长期开发规划

      //油藏管理-规划计划管理-年度计划管理-两提一降
      {
        hidden: false,
        path: "index",
        name: "index",
        component: () => import("@/pages/rem/AnnualProgramManagement/index.vue"),
        meta: { title: "两提一降", icon: "icon" },
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
        path: "operationplan",
        name: "operationplan",
        component: () => import("@/pages/rem/plan/operationplan.vue"),
        meta: { title: "现场作业计划" },
      },
      {
        hidden: true,
        path: "planmessage",
        name: "planmessage",
        component: () => import("@/pages/rem/plan/planmessage.vue"),
        meta: { title: "措施计划情况" },
      },
      {
        path: "effectofMeasures",
        name: "effectofMeasures",
        component: () => import("@/pages/rem/plan/effectofMeasures.vue"),
        meta: { title: "人员措施" },
      },
    ],
  },
];
