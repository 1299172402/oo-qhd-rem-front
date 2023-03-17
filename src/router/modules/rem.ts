/*
 * @Author: Dear_Zxb
 * @Date: 2023-03-15 15:03:10
 * @LastEditors: Dear_Zxb 
 * @LastEditTime: 2023-03-16 14:42:39
 * @Description: 油藏模块本地路由表
 */
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
          {
            hidden:true,
            path: 'wellMonitoring',
            name: 'wellMonitoring',
            component: () => import('@/pages/rem/plan/wellMonitoring.vue'),
            meta: { title: '措施效果跟踪',icon: 'icon'},
          },
        ],
      },
    ],
  },
];
