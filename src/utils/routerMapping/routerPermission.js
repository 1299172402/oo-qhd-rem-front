/**
 * import文件映射，用于路由页面引入
 * 注意：1.映射名称必须为后端返回的name
 * 2.路由name不能重名必须唯一
 */

const GenerateRouter = {
  "Index": () => import("@/pages/intelligentOilfield/homePage/index.vue"), // 组织机构管理
  "Organization": () => import("@/pages/intelligentOilfield/organizationStructure/index.vue"), // 组织机构管理
  "User": () => import("@/pages/intelligentOilfield/userManagement/index.vue"), // 用户管理
  "AuthRole/:userId": () => import("@/pages/intelligentOilfield/userManagement/authRole.vue"), // 分配角色
  "AppRole/:id": () => import("@/pages/intelligentOilfield/userManagement/appRole.vue"), // 应用配置角色
  "Roles": () => import("@/pages/intelligentOilfield/rolesManagement/index.vue"), // 角色管理
  "Menu": () => import("@/pages/intelligentOilfield/menuManagement/index.vue"), // 菜单管理
  "UserAccess": () => import("@/pages/intelligentOilfield/userAccess/index.vue"), // 用户访问
  "Notice": () => import("@/pages/intelligentOilfield/noticeManagement/index.vue"), // 通知通告管理
  "Message": () => import("@/pages/intelligentOilfield/messageCenter/index1.vue"), // 消息中心管理
  "Equipment": () => import("@/pages/intelligentOilfield/messageCenter/equipment/index.vue"), // 设备维护
  "MyFirstMenu": () => import("@/pages/intelligentOilfield/firstMenu/index.vue"), // 一级菜单管理
  "MySecondMenu": () => import("@/pages/intelligentOilfield/secondMenu/index.vue"), // 二级菜单管理
  //   "LinkMenu":()=>import('@/pages/intelligentOilfield/iframePage/index.vue'),// 内部链接
  "Dict": () => import("@/pages/intelligentOilfield/dictManagement/index.vue"), // 字典管理

  "MyThirdMenu1": () => import("@/pages/intelligentOilfield/thirdMenu/index.vue"), // 三级菜单-1管理
  "MyThirdMenu2": () => import("@/pages/intelligentOilfield/myThirdMenu/index.vue"), // 三级菜单-2管理

  //   "Index":()=>import('@/pages/intelligentOilfield/demo/index.vue'),
  "CodeGeneration": () => import("@/pages/intelligentOilfield/codeGeneration/index.vue"),

  "HandleBusinessList": () => import("@/pages/common/handleBusinessList/index.vue"),
  "DoneBusinessList": () => import("@/pages/common/doneBusinessList/index.vue"),
  "MessageLog": () => import("@/pages/intelligentOilfield/messageCenter/index.vue"),
  "MessageSubject": () => import("@/pages/intelligentOilfield/messageCenter/messageConfig/index.vue"),
  "DemoIndex": () => import("@/pages/intelligentOilfield/demo/index.vue"),
  "DemoIndex2": () => import("@/pages/intelligentOilfield/demo/index2.vue"),
  "DemoIndex3": () => import("@/pages/intelligentOilfield/demo/index3.vue"),
  "DemoIndex5": () => import("@/pages/intelligentOilfield/demo/index5.vue"),
  "DragPanel": () => import("@/pages/intelligentOilfield/demo/demo3.vue")
};

export default GenerateRouter;