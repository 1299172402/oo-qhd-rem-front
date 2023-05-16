import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    {
        // hidden: env == "development" ? false : true,
        hidden:true,  
        path: "/yield",
        name: "yield",
        component: Layout,
        meta: { title: "产量管理", icon: "client", single: false },
        children: [
            {
                path: "fluctuationWarningAnalysis",
                name: "fluctuationWarningAnalysis",
                component: () => import("@/pages/rem/yield/fluctuationWarningAnalysis/index.vue"),
                meta: { title: "产量波动预警分析" },
            },
            {
                hidden:true,
                path: "productionOperationAnalysisReport",
                name: "productionOperationAnalysisReport",
                component: () => import("@/pages/rem/yield/fluctuationWarningAnalysis/productionOperationAnalysisReport.vue"),
                meta: { title: "产量运行分析报告" },
            },
            {
                hidden:true,
                path: "analysisAbnormal",
                name: "analysisAbnormal",
                component: () => import("@/pages/rem/yield/fluctuationWarningAnalysis/analysisAbnormal.vue"),
                meta: { title: "产量异常归因分析报告" },
            },
            
            {
                hidden:true,
                path: "statisticalTableProduction",
                name: "statisticalTableProduction",
                component: () => import("@/pages/rem/yield/fluctuationWarningAnalysis/statisticalTableProduction.vue"),
                meta: { title: "产量波动统计表" },
            },
            {
                path: "productionSituationPrediction",
                name: "productionSituationPrediction",
                component: () => import("@/pages/rem/yield/productionSituationPrediction/index.vue"),
                meta: { title: "产量形势预测" },
            },
        ],
    },
];
