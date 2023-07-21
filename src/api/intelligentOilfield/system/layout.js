// grid-layout拖拽组件接口
import request from "@/utils/request";

// 保存接口
export function savePage(data) {
  return request({
    url: "system/page/savePage",
    method: "post",
    data
  });
}

// 查询接口/重置接口
export function queryByPageName(pageName, tenantId) {
  return request({
    url: `system/page/queryByPageName?pageName=${pageName}&tenantId=${tenantId}`,
    method: "get"
  });
}

// 删除接口
export function removeByPageName(pageName) {
  return request({
    url: `system/page/removeByPageName?pageName=${pageName}`,
    method: "delete"
  });
}

// 指定为默认面板接口
export function setDefaultPage(data) {
  return request({
    url: "system/page/setDefaultPage",
    method: "post",
    data
  });
}

// 点击顶部logo跳转页面
export function goNewPage() {
  return request({
    url: "auth/portal/indexUrl",
    method: "get"
  });
}

// 筛选统计首页样例接口
export function systemNum(info) {
  return request({
    url: `statistics/userMonthlyActivityStatistics?top=${info.num}&date=${info.date}`,
    method: "get"
  });
}