import Layout from '@/layouts/index.vue';

export default [
    {
        hidden: true,
        path: '/developStatus',
        name: 'developStatus',
        component: Layout,
        meta: { title: '开发现状跟踪', icon: 'client', single: false },
        children: [
            {
                path: 'developmenthistory',
                name: 'developmenthistory',
                meta: { title: '开发历程' },
                component: () => import('@/pages/rem/developStatus/developmenthistory.vue'),
            },
            {
                path: 'developmentTrendAnalysis',
                name: 'developmentTrendAnalysis',
                meta: { title: '开发趋势分析' },
                component: () => import('@/pages/rem/developStatus/developmentTrendAnalysis.vue'),
            },
        ]
    },
];
