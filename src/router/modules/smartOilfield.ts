// 智能油田一级页面
import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    // 静态本地路由【首页，组件样例，页面样例，门户页面】
    //   {
    //     path: '/homePage',
    //     name: 'homePage',
    //     component: Layout,
    //     redirect: '/homePage/index',
    //     meta: { title: '首页', icon: 'build', single: true },
    //     children: [
    //       {
    //         path: 'index',
    //         name: 'homePageIndex',
    //         component: () => import('@/pages/intelligentOilfield/homePage/index.vue'),
    //         meta: { title: '首页' },
    //       },
    //     ],
    //   },
    // {
    //     path: "/homePageDetail",
    //     name: "homePageDetail",
    //     component: Layout,
    //     // hidden: true,
    //     redirect: "/homePageDetail/homeDetail",
    //     meta: { title: "首页详情", icon: "", single: true },
    //     children: [
    //         {
    //             path: "homeDetail/:tenantId",
    //             name: "homeDetail",
    //             component: () => import("@/pages/intelligentOilfield/homePage/components/detail.vue"),
    //             meta: { title: "首页详情" }
    //         }
    //     ]
    // },
    {
        path: '/demo',
        name: 'demo',
        hidden: env == "development" ? false : true,
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
        hidden: env == "development" ? false : true,
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
        hidden: env == "development" ? false : true,
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
        path: '/system/role-auth',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'user/:roleId(\\d+)',
                component: (resolve) => require(['@/views/system/role/authUser'], resolve),
                name: 'AuthUser',
                meta: { title: '分配用户', activeMenu: '/system/role' }
            }
        ]
    },
    {
        path: "/demo5",
        name: "demo5",
        hidden: env == "development" ? false : true,
        component: Layout,
        redirect: "/demo5/demoIndex5",
        meta: { title: "拖拽组件", icon: "form", single: true },
        children: [
            {
                path: "demoIndex5",
                name: "demoIndex5",
                component: () => import("@/pages/intelligentOilfield/demo/demo3.vue"),
                meta: { title: "拖拽组件" }
            }
        ]
    },
    // 详情页路由注册——不显示在左侧菜单
    {
        path: "/userManagementDetail",
        name: "userManagementDetail",
        component: Layout,
        hidden: true,
        redirect: "/userManagementDetail/userDetail",
        meta: { title: "查看用户", icon: "", single: true },
        children: [
            {
                path: "userDetail/:userId",
                name: "userDetail",
                component: () => import("@/pages/intelligentOilfield/userManagement/components/detail.vue"),
                meta: { title: "查看用户" }
            }
        ]
    },
    // 详情页路由注册——不显示在左侧菜单
    {
        path: "/rolesManagementDetail",
        name: "rolesManagementDetail",
        component: Layout,
        hidden: true,
        redirect: "/rolesManagementDetail/rolesDetail",
        meta: { title: "分配用户", icon: "", single: true },
        children: [
            {
                path: "rolesDetail/:roleId",
                name: "rolesDetail",
                component: () => import("@/pages/intelligentOilfield/rolesManagement/components/detail.vue"),
                meta: { title: "分配用户" }
            }
        ]
    },
    {
        path: "/codeGeneration",
        name: "codeGeneration",
        component: Layout,
        hidden: true,
        redirect: "/codeGeneration/editTable",
        meta: { title: "修改生成配置", icon: "", single: true },
        children: [
            {
                path: "editTable",
                name: "editTable",
                component: () => import("@/pages/intelligentOilfield/codeGeneration/components/editTable.vue"),
                meta: { title: "修改生成配置" }
            }
        ]
    },
    {
        path: "/dictManagement/dict-data",
        component: Layout,
        hidden: true,
        redirect: "/dictManagement/dict-data/index/:dictId",
        children: [
            {
                path: "index/:dictId",
                name: "dictData",
                component: () => import("@/pages/intelligentOilfield/dictManagement/data.vue"),
                meta: { title: "字典数据" }
            }
        ]
    },
    // TODO: Maybe change back
    //   {
    //     path: "/stationMessage",
    //     component: Layout,
    //     hidden: true,
    //     redirect: "/stationMessage/stationMessageDetail",
    //     meta: { title: "站内信", icon: "", single: true },
    //     children: [
    //       {
    //         path: "stationMessageDetail",
    //         name: "stationMessageDetail",
    //         component: () => import("@/pages/intelligentOilfield/stationMessage/index.vue"),
    //         meta: { title: "站内信" }
    //       }
    //     ]
    //   },
    {
        path: "/messageCenter",
        component: Layout,
        hidden: true,
        redirect: "/messageCenter/platFormEquMon/:platName",
        meta: { title: "平台设备监控", icon: "", single: true },
        children: [
            {
                path: "platFormEquMon/:platName",
                name: "platFormEquMon",
                component: () => import("@/pages/intelligentOilfield/messageCenter/platFormEquMon/index.vue"),
                meta: { title: "平台设备监控" }
            }
        ]
    },
    // 指标中心小组件路由
    // 蓬勃产量指标
    {
        path: "/textCom/textComDetail",
        name: "textComDetail",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/textCom.vue")
    },
    // 蓬勃月度产量情况
    {
        path: "/barChartCom/barChartComDetail",
        name: "barChartComDetail",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/barChartCom.vue")
    },
    // 蓬勃采油速度
    {
        path: "/lineChartCom/lineChartComDetail",
        name: "lineChartComDetail",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/lineChartCom.vue")
    },
    // 蓬勃人员外勤
    {
        path: "/pieChartCom/pieChartComDetail",
        name: "pieChartComDetail",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/pieChartCom.vue")
    },
    // 秦皇岛产量指标
    {
        path: "/textComQHD/textComDetailQHD",
        name: "textComDetailQHD",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/textComQHD.vue")
    },
    // 秦皇岛月度产量情况
    {
        path: "/barChartComQHD/barChartComDetailQHD",
        name: "barChartComDetailQHD",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/barChartComQHD.vue")
    },
    // 秦皇岛采油速度
    {
        path: "/lineChartComQHD/lineChartComDetailQHD",
        name: "lineChartComDetailQHD",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/lineChartComQHD.vue")
    },
    // 秦皇岛人员外勤
    {
        path: "/pieChartComQHD/pieChartComDetailQHD",
        name: "pieChartComDetailQHD",
        component: () => import("@/pages/intelligentOilfield/homePage/components/indexCenter/pieChartComQHD.vue")
    },
    // 404页面
    {
        path: "/pageInfo/error",
        name: "error",
        component: () => import("@/pages/examplePage/result/404/index.vue")
    }
];