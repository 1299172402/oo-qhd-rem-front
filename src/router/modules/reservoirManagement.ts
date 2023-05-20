import Layout from '@/layouts/index.vue';
const env = import.meta.env.MODE;
export default [
    {
        path: '/intelligence',
        name: 'intelligence',
        hidden:env == "development" ? false : true,
        component: Layout,
        meta: { title: '智能注采调配(迁移中)', icon: 'client', single: false },
        children: [
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
        ],

    },
];
