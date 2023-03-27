import Layout from '@/layouts/index.vue';

export default [
      // 基础数据维护
      {
        path: '/plan',
        name: 'plan',
        component: Layout,
        redirect: '/plan/operationplan',
        meta: { title: '规划计划管理', icon: 'client', single: false },
        children: [
            {
                path: 'operationplan',
                name: 'operationplan',
                component: () => import('@/pages/rem/plan/operationplan/index.vue'),
                meta: { title: '现场作业计划' },
              },
              {
                path: 'planmessage',
                name: 'planmessage',
                component: () => import('@/pages/rem/plan/planmessage/index.vue'),
                meta: { title: '措施计划情况' },
              },
        ],
      },

    ];
    
