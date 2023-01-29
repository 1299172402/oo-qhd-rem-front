/**
 * import文件映射，用于路由页面引入
 * 注意：1.映射名称必须为后端返回的name
 * 2.路由name不能重名必须唯一
 */

const  GenerateRouter = {
  "Organization":()=>import('@/pages/intelligentOilfield/organizationStructure/index.vue'),// 组织机构管理
  "User":()=>import('@/pages/intelligentOilfield/userManagement/index.vue'),// 用户管理
  "Roles":()=>import('@/pages/intelligentOilfield/rolesManagement/index.vue'),// 角色管理
  "Menu":()=>import('@/pages/intelligentOilfield/menuManagement/index.vue'),// 菜单管理
  "Permission":()=>import('@/pages/intelligentOilfield/dataPermission/index.vue'),// 数据权限管理
  // "Application":()=>import('@/pages/intelligentOilfield/applicationCenter/index.vue'),// 应用中心管理
  "Designer":()=>import('@/pages/intelligentOilfield/configurationCenter/processCenter/designer/index.vue'),// 流程设计器
  "InstanceList":()=>import('@/pages/intelligentOilfield/configurationCenter/processCenter/instanceList/index.vue'),// 流程实例清单
  "ApplicationConfiguration":()=>import('@/pages/intelligentOilfield/configurationCenter/applicationConfiguration/index.vue'),// 应用配置
  "Notice":()=>import('@/pages/intelligentOilfield/noticeManagement/index.vue'),// 通知通告管理
  "Message":()=>import('@/pages/intelligentOilfield/messageCenter/index.vue'),// 消息中心管理
  "MyFirstMenu":()=>import('@/pages/intelligentOilfield/firstMenu/index.vue'),// 一级菜单管理
  "MySecondMenu":()=>import('@/pages/intelligentOilfield/secondMenu/index.vue'),// 二级菜单管理
  //   "LinkMenu":()=>import('@/pages/intelligentOilfield/iframePage/index.vue'),// 内部链接
  "Dict":()=>import('@/pages/intelligentOilfield/dictManagement/index.vue'),// 字典管理

  "MyThirdMenu1":()=>import('@/pages/intelligentOilfield/thirdMenu/index.vue'),// 三级菜单-1管理
  "MyThirdMenu2":()=>import('@/pages/intelligentOilfield/myThirdMenu/index.vue'),// 三级菜单-2管理

  "Index":()=>import('@/pages/intelligentOilfield/demo/index.vue'),
  "CodeGeneration":()=>import('@/pages/intelligentOilfield/codeGeneration/index.vue'),
  "DataIndexConfiguration":()=>import('@/pages/intelligentOilfield/configurationCenter/dataIndexConfiguration/index.vue'), // 配置中心-数据指标配置
  "UserAccess":()=>import('@/pages/intelligentOilfield/userAccess/index.vue'), // 用户访问
  "ApplicationList":()=>import('@/pages/intelligentOilfield/configurationCenter/applicationList/index.vue'), // 应用列表
  "LargeScreenConfiguration":()=>import('@/pages/intelligentOilfield/configurationCenter/largeScreenConfiguration/index.vue'), // 大屏配置
  "KanbanConfiguration":()=>import('@/pages/intelligentOilfield/configurationCenter/kanbanConfiguration/index.vue'), // 看板配置
  "ShortcutEntryConfiguration":()=>import('@/pages/intelligentOilfield/configurationCenter/shortcutEntryConfiguration/index.vue'), // 快捷入口配置


  "HandleBusinessList": () => import('@/pages/common/handleBusinessList/index.vue'),
  "DoneBusinessList": () => import('@/pages/common/doneBusinessList/index.vue')
}

export default GenerateRouter