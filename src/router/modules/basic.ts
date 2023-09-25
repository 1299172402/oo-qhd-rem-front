import Layout from '@/layouts/index.vue';
const env = import.meta.env.MODE;

export default [
  // 基础数据维护
  // {
  //   // hidden: env == "development" ? false : true,
  //   hidden:true,  
  //   path: '/basic',
  //   name: 'basic', 
  //   component: Layout,
  //   redirect: '/basic/density',
  //   meta: { title: '基础数据维护', icon: 'client', single: false },
  //   children: [
  //     {
  //       path: 'density',
  //       name: 'density',
  //       component: () => import('@/pages/rem/basic/densityMaintenance/index.vue'),
  //       meta: { title: '密度维护表' },
  //     },
  //     {
  //       path: 'reserves',
  //       name: 'reserves',
  //       component: () => import('@/pages/rem/basic/wellControlReserves/index.vue'),
  //       meta: { title: '井控储量数据维护' },
  //     },
  //     // {
  //     //   path: 'maintenance',
  //     //   name: 'maintenance',
  //     //   component: () => import('@/pages/rem/basic/wellGroupMaintenance/index.vue'),
  //     //   meta: { title: '井组信息维护' },
  //     // },
  //     {
  //       path: 'customQuery',
  //       name: 'customQuery', 
  //       hidden: env == "development" ? false : true,
  //       component: () => import('@/pages/rem/basic/customQuery/index.vue'),
  //       meta: { title: '自定义查询' }
  //     },
  //     {
  //         path: 'wellGroup_Maintenance',
  //         name: 'wellGroup_Maintenance',
  //         component: () => import('@/pages/rem/basic/wellGroup_Maintenance/index.vue'),
  //         meta: { title: '井组自定义维护' }
  //     },
  //   ],
  // },
];
