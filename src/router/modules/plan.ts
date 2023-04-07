import Layout from '@/layouts/index.vue';
const env = import.meta.env.MODE;
export default [
    {
        hidden: env=='development'?false:true,
        path: '/plan',
        name: 'plan',
        component: Layout,
        redirect: '/plan/operationplan',
        meta: { title: '规划计划管理', icon: 'client', single: false },
        children: [
            // {
            //     path: 'planIndex',
            //     name: 'planIndex',
            //     component: () => import('@/pages/rem/plan/index.vue'),
            //     meta: { title: '措施管理(旧)', icon: 'icon'},
            // },
            {
              hidden: false,
              path: 'newPlanIndex',
              name: 'newPlanIndex',
              component: () => import('@/pages/rem/plan/newPlanIndex.vue'),
              meta: { title: '措施管理', icon: 'icon' },
            },
            {
              hidden:true,
              path: 'wellMonitoring',
              name: 'wellMonitoring',
              component: () => import('@/pages/rem/plan/wellMonitoring.vue'),
              meta: { title: '措施效果跟踪',icon: 'icon'},
            },
            {
              hidden:true,
              path: 'effectofMeasures',
              name: 'effectofMeasures',
              component: () => import('@/pages/rem/plan/effectofMeasures.vue'),
              meta: { title: '措施效果跟踪',icon: 'icon'},
            },
        ],
    },
];
