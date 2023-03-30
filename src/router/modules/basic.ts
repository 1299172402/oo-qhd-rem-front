import Layout from '@/layouts/index.vue';

export default [
      // 基础数据维护
      {
        path: '/basic',
        name: 'basic',
        component: Layout,
        redirect: '/basic/density',
        meta: { title: '基础数据维护', icon: 'client', single: false },
        children: [
            {
                path: 'density',
                name: 'density',
                component: () => import('@/pages/rem/basic/densityMaintenance/index.vue'),
                meta: { title: '密度维护表' },
              },
              {
                path: 'reserves',
                name: 'reserves',
                component: () => import('@/pages/rem/basic/wellControlReserves/index.vue'),
                meta: { title: '井控储量数据页面' },
              },
              {
                path: 'maintenance',
                name: 'maintenance',
                component: () => import('@/pages/rem/basic/wellGroupMaintenance/index.vue'),
                meta: { title: '井组信息维护' },
              },
            // {
            //     path: 'personnelplan',
            //     name: 'personnelplan',
            //     component: () => import('@/pages/rem/plan/personnelplan/index.vue'),
            //     meta: {title: '人员措施'},
            // },
            // {
            //     path: 'operationplan',
            //     name: 'operationplan',
            //     component: () => import('@/pages/rem/plan/operationplan/index.vue'),
            //     meta: {title: '现场作业计划'},
            // },
            // {
            //     path: 'planmessage',
            //     name: 'planmessage',
            //     component: () => import('@/pages/rem/plan/planmessage/index.vue'),
            //     meta: {title: '措施计划情况'},
            // },
        ],
      },

    ];
    
