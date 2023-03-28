import Layout from '@/layouts/index.vue';

export default [
    {
        path: '/dynamicManagement',
        name: 'dynamicManagement',
        hidden: false,
        component: Layout,
        meta: { title: '油藏动态管理', icon: 'client', single: false },
        children: [
            {
                path: 'dynamicTracking',
                meta: { title: '油井动态分析' },
                component: () => import('@/layouts/blank.vue'),
                children: [
                    {
                        hidden: false,
                        path: 'oilAuxiliaryAnalysis',
                        name: 'oilAuxiliaryAnalysis',
                        component: () => import('@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/index.vue'),
                        meta: { title: '油井辅助分析', icon: 'icon' },
                    },
                ],
            },
            {
                path: 'performance',
                name: 'performance',
                component: () => import('@/layouts/blank.vue'),
                meta: { title: '井组动态分析', single: false },
                children: [
                    {
                        path: 'groupAssistance',
                        name: 'groupAssistance',
                        component: () => import('@/pages/rem/performance/wellGroup/groupAssistance/groupAssistance.vue'),
                        meta: { title: '井组辅助分析', icon: 'icon' },
                    },
                ],
            },
            // {
            //   path: 'wellPerformance',
            //   name: 'wellPerformance',
            //   component: () => import('@/pages/rem/performance/wellPerformance/index.vue'),
            //   meta: { title: '水井动态分析', single: false },
            //   children: [
            //     {
            //       path: 'wellPerformance',
            //       name: 'wellPerformance',
            //       component: () => import('@/pages/rem/performance/wellPerformance/index.vue'),
            //       meta: { title: '水井辅助分析',icon: 'icon' },
            //     },
            //   ],
            // },
        ],

    },
];
