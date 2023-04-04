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
export function queryByPageName(pageName) {
  return request({
    url: `system/page/queryByPageName?pageName=${pageName}`,
    method: "get"
  });
}

// 查询接口/重置接口-带租户用户id
export function queryByPage(param) {
  return request({
    url: "system/page/queryByPage?pageName",
    method: "post",
    param
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