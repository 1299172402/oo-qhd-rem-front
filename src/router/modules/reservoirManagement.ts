import Layout from '@/layouts/index.vue';
const env = import.meta.env.MODE;
export default [
    {
        path: '/intelligence1',
        name: 'intelligence1',
        hidden:env == "development" ? false : true,
        component: Layout,
        meta: { title: '智能注采调配', icon: 'client', single: false },
        children: [
            {
                path: 'index',
                name: 'index',
                hidden:false,
                component: () => import('@/pages/rem/intelligence/index.vue'),
                meta: { title: '首页',icon: 'icon' },
            },
            {
                path: 'ipmHome',
                name: 'ipmHome',
                component: () => import('@/pages/rem/home/ipmHome/index.vue'),
                meta: { title: '智能注采调配',icon: 'icon' },
            },
            // 油藏管理-智能注采调配-首页详情
            {
                path: "intelligenceDetail",
                component: () => import("@/pages/rem/intelligence/detail.vue"),
                name: "intelligenceDetail",
                hidden:true,
                meta: {
                    title: "详情"
                },
            },
            {
                path: 'productionSplit',
                name: 'productionSplit',
                component: () => import('@/pages/rem/intelligence/productionSplit/index.vue'),
                meta: { title: '产量劈分',icon: 'icon' },
            },
            {
                path: 'splitSection',
                name: 'splitSection',
                hidden:true,
                component: () => import('@/pages/rem/intelligence/productionSplit/splitSection.vue'),
                meta: { title: '劈分剖面',icon: 'icon' },
            },
            {
                path: 'DividingCoefficient',
                name: 'DividingCoefficient',
                hidden: true,
                component: () => import('@/pages/rem/intelligence/productionSplit/DividingCoefficient.vue'),
                meta: { title: '劈分系数',icon: 'icon' },
            },
            {
                path: 'connectivityData',
                name: 'connectivityData',
                component: () => import('@/pages/rem/intelligence/connectivityData/connectivityData.vue'),
                meta: { title: '井间连通性评价',icon: 'icon' },
            },
            {
                path: 'coefficientCalculates',
                name: 'coefficientCalculates',
                hidden:true,
                component: () => import('@/pages/rem/intelligence/connectivityData/connectivityCoefficientCalculatesProperty.vue'),
                meta: { title: '基础计算数据',icon: 'icon' },
            },
            {
                path: 'optimization',
                name: 'optimization',
                component: () => import('@/pages/rem/intelligence/optimization/index.vue'),
                meta: { title: '注采调配优化',icon: 'icon' },
            },
            //油藏管理-注采调配优化-查看详情
            {
                path: "optimizationDetail",
                name: "optimizationDetail",
                component: () => import("@/pages/rem/intelligence/optimization/view.vue"),
                hidden: true,
                meta: { title: "查看详情" },
            },
            {
                path: 'optimizationResult',
                name: 'optimizationResult',
                hidden: true,
                component: () => import('@/pages/rem/intelligence/optimization/result.vue'),
                meta: {title: '方案详情', icon: 'icon'},
            },
        ],

    },
];
