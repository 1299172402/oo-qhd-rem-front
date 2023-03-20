/**
 * import文件映射，用于路由页面引入
 * 注意：1.映射名称必须为后端返回的name
 * 2.路由name不能重名必须唯一
 */

const  RemRouter = {
    "density":()=>import('@/pages/rem/basic/densityMaintenance/index.vue'),// 密度维护
  }
  
  export default RemRouter