/**
 * 隐藏菜单高亮路由映射
 * key：详情页面的路由 name
 * value：当前详情页面要高亮的那个末级菜单的路由 name
 * 可以从 routerPermission.js 中找到对应的 name，routerPermission 中 key 就是路由 name，value 是对应的 vue 文件路径
 * 比如说：应用详情是隐藏菜单，对应的路由 name 为 ApplicationForm/:id?【所以 key 就写这个】
 *        进入到应用详情时，应该高亮左侧应用超市这个菜单，所以 value 写 ApplicationList
 */
export default {};