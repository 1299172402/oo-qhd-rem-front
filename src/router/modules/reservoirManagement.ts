/*
 * @Author: Dear_Zxb 13521265431@163.com
 * @Date: 2023-03-17 10:18:04
 * @LastEditors: Dear_Zxb 13521265431@163.com
 * @LastEditTime: 2023-03-17 14:18:54
 * @FilePath: \dcoit_haiyou\oo-qhd-rem-front\src\router\modules\reservoirManagement.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        ],
      },

    ];
    

