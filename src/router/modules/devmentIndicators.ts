import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    // {
    //     // hidden: env == "development" ? false : true,
    //     hidden:true,  
    //     path: "/devmentIndicators",
    //     name: "devmentIndicators",
    //     component: Layout,
    //     meta: { title: "开发指标管理", icon: "client", single: false },
    //     children: [
    //         {
    //             path: "technicalIndexManagement",
    //             name: "technicalIndexManagement",
    //             component: () => import("@/pages/rem/devmentIndicators/technicalIndexManagement/index.vue"),
    //             meta: { title: "技术指标管理" },
    //         },
            
    //         {
    //             path: "waterInjectionIndexManagement",
    //             name: "waterInjectionIndexManagement",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/index.vue"),
    //             meta: { title: "注水指标管理" },
    //         },
    //         {
    //             hidden: true,
    //             path: "annualInjection",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/annualInjection.vue"),
    //             name: "annualInjection",
    //             meta: { title: "年注入量" },
    //         },
    //         {
    //             hidden: true,
    //             path: "stratumPressure",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/stratumPressure.vue"),
    //             name: "stratumPressure",
    //             meta: { title: "地层压力保持水平" },
    //         },
    //         {
    //             hidden: true,
    //             path: "waterQuality",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/waterQuality.vue"),
    //             name: "waterQuality",
    //             meta: { title: "注水水质达标率" },
    //         },
    //         {
    //             hidden: true,
    //             path: "splitHole",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/splitHole.vue"),
    //             name: "splitHole",
    //             meta: { title: "分注井层段合格率" },
    //         },
    //         {
    //             hidden: true,
    //             path: "waterInjectionWell",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/waterInjectionWell.vue"),
    //             name: "waterInjectionWell",
    //             meta: { title: "注水井分注率" },
    //         },
    //         {
    //             hidden: true,
    //             path: "dynamicMonitoring",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/dynamicMonitoring.vue"),
    //             name: "dynamicMonitoring",
    //             meta: { title: "动态监测完成率" },
    //         },
    //         {
    //             hidden: true,
    //             path: "splitWellTest",
    //             component: () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/splitWellTest.vue"),
    //             name: "splitWellTest",
    //             meta: { title: "分注井测试率" },
    //         },
    //     ],
    // },
];
