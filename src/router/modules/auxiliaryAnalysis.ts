import Layout from '@/layouts/index.vue';

export default [
      // 基础数据维护
      {
        path: '/basic',
        name: 'basic',
        component: Layout,
        redirect: '/basic/density',
        meta: { title: '井组辅助分析', icon: 'client', single: false },
        children: [
            {
                path: 'density',
                name: 'density',
                component: () => import('@/pages/rem/basic/densityMaintenance/index.vue'),
                meta: { title: '小层顶面结构图' },
              },
              {
                path: 'reserves',
                name: 'reserves',
                component: () => import('@/pages/rem/basic/wellControlReserves/index.vue'),
                meta: { title: '地震属性图' },
              },
              {
                path: 'maintenance',
                name: 'maintenance',
                component: () => import('@/pages/rem/basic/wellGroupMaintenance/index.vue'),
                meta: { title: '沉积相图' },
              },
        ],
      },

    ];
    