import Layout from '@/layouts/index.vue';

export default [
      // 显示一级菜单
      {
        path: '/user',
        name: 'user',
        component: Layout,
        redirect: '/user/index',
        meta: { title: '基础数据维护', icon: 'client', single: true },
        children: [
        ],
      },

    ];
    