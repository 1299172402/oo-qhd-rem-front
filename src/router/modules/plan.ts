import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    {
        // hidden: env == "development" ? false : true,
        hidden:true,  
        path: "/plan",
        name: "plan",
        component: Layout,
        redirect: "/plan/operationplan",
        meta: { title: "规划计划管理", icon: "client", single: false },
        children: [
            {
                path: "mediumLongTermPlanning",
                name: "mediumLongTermPlanning",
                component: () => import("@/pages/rem/plan/mediumLongTermPlanning/index.vue"),
                meta: { title: "中长期开发规划", icon: "icon" },
            },
            {
                path: "annualPlan",
                name: "annualPlan",
                component: () => import("@/pages/rem/plan/annualPlan/index.vue"),
                meta: { title: "年度计划管理", icon: "icon" },
            },
            {
                hidden: true,
                path: "waterInjectionVolumeDetail",
                name: "waterInjectionVolumeDetail",
                component: () => import("@/pages/rem/plan/annualPlan/waterInjectionVolume/detail.vue"),
                meta: { title: "油田注水量详情", icon: "icon" },
            },
            {
                path: "measureManagement",
                name: "measureManagement",
                component: () => import("@/pages/rem/plan/measureManagement/index.vue"),
                meta: { title: "措施管理",icon: "icon"},
            },
            {
                hidden: true,
                path: "measureEffectTracking",
                name: "measureEffectTracking",
                component: () => import("@/pages/rem/plan/measureManagement/measureEffectTracking.vue"),
                meta: { title: "措施效果跟踪",icon: "icon"},
            },
            {
                hidden: false,
                path: "personnelMeasures",
                name: "personnelMeasures",
                component: () => import("@/pages/rem/plan/measureManagement/personnelMeasures.vue"),
                meta: { title: "人员措施",icon: "icon"},
            },
            {
                path: "twoIncreasesOneDecrease",
                name: "twoIncreasesOneDecrease",
                component: () => import("@/pages/rem/plan/twoIncreasesOneDecrease/index.vue"),
                meta: { title: "两提一降", icon: "icon" },
            },
            
        ],
    },
];
