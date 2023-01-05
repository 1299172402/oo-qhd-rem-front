// 智能油田一级页面
import { LayersIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  // 静态本地路由【首页，组件样例，页面样例，门户页面】
  {
    path: '/homePage',
    name: 'homePage',
    component: Layout,
    redirect: '/homePage/index',
    meta: { title: '首页', icon: 'build', single: true },
    children: [
      {
        path: 'index',
        name: 'homePageIndex',
        component: () => import('@/pages/intelligentOilfield/homePage/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    hidden: false, // 设置为true路由不可见
    component: Layout,
    redirect: '/demo/demoIndex',
    meta: { title: '组件样例', icon: 'dashboard', single: true }, // single设置为true只显示一级路由
    children: [
      {
        path: 'demoIndex',
        name: 'demoIndex',
        component: () => import('@/pages/intelligentOilfield/demo/index.vue'),
        meta: { title: '组件样例' },
      },
    ],
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: Layout,
    redirect: '/demo2/demoIndex2',
    meta: { title: '组件样例2', icon: 'education', single: true },
    children: [
      {
        path: 'demoIndex2',
        name: 'demoIndex2',
        component: () => import('@/pages/intelligentOilfield/demo/index2.vue'),
        meta: { title: '组件样例2' },
      },
    ],
  },
  {
    path: '/demo3',
    name: 'demo3',
    component: Layout,
    redirect: '/demo3/demoIndex3',
    meta: { title: '列表示例页', icon: 'form', single: true },
    children: [
      {
        path: 'demoIndex3',
        name: 'demoIndex3',
        component: () => import('@/pages/intelligentOilfield/demo/index3.vue'),
        meta: { title: '列表示例页' },
      },
    ],
  },
  {
    path: '/portal',
    component: Layout,
    redirect: '/portal/projectionMode',
    name: 'portal',
    hidden: true,
    meta: {
      title: '门户',
      icon: LayersIcon,
    },
    children: [
      {
        path: 'projectionMode',
        name: 'projectionMode',
        component: () => import('@/pages/intelligentOilfield/portal/projectionMode/index.vue'),
        meta: { title: '投影模式' },
      },
      {
        path: 'officeMode',
        name: 'officeMode',
        component: () => import('@/pages/intelligentOilfield/portal/officeMode/index.vue'),
        meta: { title: '办公模式' },
      },
    ],
  },
  // 详情页路由注册——不显示在左侧菜单
  {
    path: '/userManagementDetail',
    name: 'userManagementDetail',
    component: Layout,
    hidden: true,
    redirect: '/userManagementDetail/userDetail',
    meta: { title: '查看用户', icon: '', single: true },
    children: [
      {
        path: 'userDetail',
        name: 'userDetail',
        component: () => import('@/pages/intelligentOilfield/userManagement/components/detail.vue'),
        meta: { title: '查看用户' },
      },
    ],
  },
  {
    path: '/rolesManagementDetail',
    name: 'rolesManagementDetail',
    component: Layout,
    hidden: true,
    redirect: '/rolesManagementDetail/rolesDetail',
    meta: { title: '分配用户', icon: '', single: true },
    children: [
      {
        path: 'rolesDetail',
        name: 'rolesDetail',
        component: () => import('@/pages/intelligentOilfield/rolesManagement/components/detail.vue'),
        meta: { title: '分配用户' },
      },
    ],
  },
  //   {
  //     path: '/iframe',
  //     name: 'iframe',
  //     component: Layout,
  //     redirect: '/iframe/iframeDetail',
  //     meta: { title: 'iframe页面', icon: 'link', single: true },
  //     children: [
  //       {
  //         path: 'iframeDetail',
  //         name: 'iframeDetail',
  //         component: () => import('@/pages/intelligentOilfield/iframePage/index.vue'),
  //         meta: { title: 'iframe页面' },
  //       },
  //     ],
  //   },
  // 动态路由【智能油田后台管理系统】
  //   {
  //     path: '/organizationStructure',
  //     name: 'organizationStructure',
  //     component: Layout,
  //     redirect: '/organizationStructure/organization',
  //     meta: { title: '组织机构管理', icon: 'print', single: true},
  //     children: [
  //       {
  //         path: 'organization',
  //         name: 'organization',
  //         component: () => import('@/pages/intelligentOilfield/organizationStructure/index.vue'),
  //         meta: { title: '组织机构管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/userManagement',
  //     name: 'userManagement',
  //     component: Layout,
  //     redirect: '/userManagement/user',
  //     meta: { title: '用户管理', icon: 'user', single: true},
  //     children: [
  //       {
  //         path: 'user',
  //         name: 'user',
  //         component: () => import('@/pages/intelligentOilfield/userManagement/index.vue'),
  //         meta: { title: '用户管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/rolesManagement',
  //     name: 'rolesManagement',
  //     component: Layout,
  //     redirect: '/rolesManagement/roles',
  //     meta: { title: '角色管理', icon: 'usergroup', single: true},
  //     children: [
  //       {
  //         path: 'roles',
  //         name: 'roles',
  //         component: () => import('@/pages/intelligentOilfield/rolesManagement/index.vue'),
  //         meta: { title: '角色管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/menuManagement',
  //     name: 'menuManagement',
  //     component: Layout,
  //     redirect: '/menuManagement/menu',
  //     meta: { title: '菜单管理', icon: 'root-list', single: true},
  //     children: [
  //       {
  //         path: 'menu',
  //         name: 'menu',
  //         component: () => import('@/pages/intelligentOilfield/menuManagement/index.vue'),
  //         meta: { title: '菜单管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/dataPermission',
  //     name: 'dataPermission',
  //     component: Layout,
  //     redirect: '/dataPermission/permission',
  //     meta: { title: '数据权限管理', icon: 'server', single: true},
  //     children: [
  //       {
  //         path: 'permission',
  //         name: 'permission',
  //         component: () => import('@/pages/intelligentOilfield/dataPermission/index.vue'),
  //         meta: { title: '数据权限管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/applicationCenter',
  //     name: 'applicationCenter',
  //     component: Layout,
  //     redirect: '/applicationCenter/application',
  //     meta: { title: '应用中心管理', icon: 'app', single: true},
  //     children: [
  //       {
  //         path: 'application',
  //         name: 'application',
  //         component: () => import('@/pages/intelligentOilfield/applicationCenter/index.vue'),
  //         meta: { title: '应用中心管理' },
  //       },
  //     ],
  //   },

  //   {
  //     path: '/configurationCenter',
  //     name: 'configurationCenter',
  //     component: Layout,
  //     meta: { title: '配置中心管理', icon: 'setting' },
  //     children: [
  //       {
  //         path: 'processCenter',
  //         meta: { title: '流程中心'},
  //         component: () => import('@/layouts/blank.vue'), // 必须是这个页面
  //         children: [
  //           {
  //             path: 'designer',
  //             name: 'designer', 
  //             component: () => import('@/pages/intelligentOilfield/configurationCenter/processCenter/designer/index.vue'),
  //             meta: { title: '流程设计器', icon: 'icon' }, // 三级必加icon,为了缩进
  //           },
  //           {
  //             path: 'instanceList',
  //             name: 'instanceList',
  //             component: () => import('@/pages/intelligentOilfield/configurationCenter/processCenter/instanceList/index.vue'),
  //             meta: { title: '流程实例清单', icon: 'icon' },
  //           },
  //         ],
  //       },
  //       {
  //         path: 'applicationConfiguration',
  //         meta: { title: '应用配置'},
  //         component: () => import('@/pages/intelligentOilfield/configurationCenter/applicationConfiguration/index.vue'), // 必须是这个页面
  //       },
  //     ],
  //   },

  //   {
  //     path: '/noticeManagement',
  //     name: 'noticeManagement',
  //     component: Layout,
  //     redirect: '/noticeManagement/notice',
  //     meta: { title: '通知通告管理', icon: 'notification', single: true},
  //     children: [
  //       {
  //         path: 'notice',
  //         name: 'notice',
  //         component: () => import('@/pages/intelligentOilfield/noticeManagement/index.vue'),
  //         meta: { title: '通知通告管理' },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/messageCenter',
  //     name: 'messageCenter',
  //     component: Layout,
  //     redirect: '/messageCenter/message',
  //     meta: { title: '消息中心管理', icon: 'tips', single: true},
  //     children: [
  //       {
  //         path: 'message',
  //         name: 'message',
  //         component: () => import('@/pages/intelligentOilfield/messageCenter/index.vue'),
  //         meta: { title: '消息中心管理' },
  //       },
  //     ],
  //   },
];
