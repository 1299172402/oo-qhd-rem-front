import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    {
        // hidden: env == "development" ? false : true,
        hidden:true,
        path: "/dynamicManagement",
        name: "dynamicManagement",
        component: Layout,
        meta: { title: "油藏动态管理", icon: "client", single: false },
        children: [
            {
                path: "dynamicTrackingOilAuxiliary",
                name: "dynamicTrackingOilAuxiliary",
                meta: { title: "油井动态分析" },
                component: () => import("@/layouts/blank.vue"),
                children: [
                    {
                        path: "analysisReport",
                        name: "analysisReport",
                        component: () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/analysisReport.vue"),
                        meta: { title: "油井动态分析报告", icon: "icon" },
                    },
                    {
                        path: "attributtonAnalysis",
                        name: "attributtonAnalysis",
                        component: () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/attributtonAnalysis.vue"),
                        meta: { title: "归因分析", icon: "icon" },
                    },
                    {
                        hidden: false,
                        path: "oilAuxiliaryAnalysis",
                        name: "oilAuxiliaryAnalysis",
                        component: () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/index.vue"),
                        meta: { title: "油井辅助分析", icon: "icon" },
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
                path: "dynamicTrackingWaterAuxiliary",
                name: "dynamicTrackingWaterAuxiliary",
                meta: { title: "水井动态分析" },
                component: () => import("@/layouts/blank.vue"),
                children: [
                    {
                        path: "analysisReport",
                        name: "analysisReport",
                        component: () => import("@/pages/rem/performance/dynamicTracking/waterAuxiliaryAnalysis/analysisReport.vue"),
                        meta: { title: "水井动态分析报告", icon: "icon" },
                    },
                    {
                        hidden: false,
                        path: "waterAuxiliaryAnalysis",
                        name: "waterAuxiliaryAnalysis",
                        component: () => import("@/pages/rem/performance/dynamicTracking/waterAuxiliaryAnalysis/index.vue"),
                        meta: { title: "水井辅助分析", icon: "icon" },
                    },
                ],
            },
            {
                path: "dynamicTrackingWellGroup",
                name: "dynamicTrackingWellGroup",
                hidden: false,
                component: () => import("@/layouts/blank.vue"),
                meta: { title: "井组动态分析", single: false },
                children: [
                    {
                        path: "analysisReport",
                        name: "analysisReport",
                        component: () => import("@/pages/rem/performance/dynamicTracking/wellGroupAnalysisAssistant/analysisReport.vue"),
                        meta: { title: "井组动态分析报告", icon: "icon" },
                    },
                    {
                        path: "wellGroupAnalysisAssistant",
                        name: "wellGroupAnalysisAssistant",
                        component: () => import("@/pages/rem/performance/dynamicTracking/wellGroupAnalysisAssistant/index.vue"),
                        meta: { title: "井组辅助分析", icon: "icon" },
                    },
                ],
            },
            {
                path: "dynamicTrackingBlock",
                name: "dynamicTrackingBlock",
                component: () => import("@/layouts/blank.vue"),
                meta: { title: "区块动态分析", single: false },
                children: [
                    {
                        path: "analysisReport",
                        name: "analysisReport",
                        component: () => import("@/pages/rem/performance/dynamicTracking/blockAnalysisAided/analysisReport.vue"),
                        meta: { title: "区块动态分析报告", icon: "icon" },
                    },
                    {
                        path: "blockAnalysisAided",
                        name: "blockAnalysisAided",
                        component: () => import("@/pages/rem/performance/dynamicTracking/blockAnalysisAided/index.vue"),
                        meta: { title: "区块辅助分析", icon: "icon" },
                    },
                ],
            },
        ],
    },
];
