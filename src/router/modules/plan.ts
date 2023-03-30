import Layout from '@/layouts/index.vue';

export default [
    {
        path: '/plan',
        name: 'plan',
        component: Layout,
        redirect: '/plan/operationplan',
        meta: { title: '规划计划管理', icon: 'client', single: false },
        children: [
            {
                hidden: false,
                path: 'planIndex',
                name: 'planIndex',
                component: () => import('@/pages/rem/plan/index.vue'),
                meta: { title: '措施管理', icon: 'icon'},
            },
            {
              hidden: false,
              path: 'newPlanIndex2',
              name: 'newPlanIndex2',
              component: () => import('@/pages/rem/plan/newPlanIndex.vue'),
              meta: { title: '新措施管理', icon: 'icon' },
            },
            {
              hidden:true,
              path: 'wellMonitoring',
              name: 'wellMonitoring',
              component: () => import('@/pages/rem/plan/wellMonitoring.vue'),
              meta: { title: '措施效果跟踪',icon: 'icon'},
            },
        ],
    },

];

