//油藏模块
import Layout from '@/layouts/index.vue';
export default [
    {
        path: '/rem',
        name: 'rem',
        component: Layout,
        hidden: false,
        meta: { title: '油藏管理', icon: 'client' },
        children: [
            {
                path: 'plan',
                meta: { title: '规划计划管理' },
                component: () => import('@/layouts/blank.vue'),
                children: [
                    {
                        hidden: false,
                        path: 'planIndex',
                        name: 'planIndex',
                        component: () => import('@/pages/rem/plan/index.vue'),
                        meta: { title: '措施管理', icon: 'icon' },
                    },
                    // {
                    //     hidden:false,
                    //     path: 'ff',
                    //     name: 'ff',
                    //     component: () => import('@/pages/rem/plan/wellMonitoring.vue'),
                    //     meta: { title: '措施管理',icon: 'icon'},
                    // },
                ],
            },
        ],
    },
];
