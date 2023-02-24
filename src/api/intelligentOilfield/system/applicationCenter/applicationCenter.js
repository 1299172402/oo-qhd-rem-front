import request from '@/utils/request'
// 查询应用列表
export function listApp(query) {
  return request({
    url: '/system/app/list',
    method: "get",
    params: query
  });
}
// 删除应用配置
export function delApp(appId) {
  return request({
    url: `/system/app/${appId}`,
    method: "delete"
  });
}
// 新增应用配置
export function addApp(data) {
  return request({
    url: "/system/app",
    method: "post",
    data
  });
}
// 查询应用详细
export function getApp(appId) {
  return request({
    url: `/system/app/${appId}`,
    method: "get"
  });
}

// 修改应用配置
export function updateApp(data) {
  return request({
    url: "/system/app",
    method: "put",
    data
  });
}
