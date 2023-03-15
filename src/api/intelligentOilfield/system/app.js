import request from '@/utils/request'

// 应用API自动生成appID
export function autoAppId() {
  return request({
    url: "/system/app/autoAppID",
    method: "get"
  });
}
// 应用API自动生成appID
export function autoAppSecret() {
  return request({
    url: "/system/app/autoAppSecret",
    method: "get"
  });
}
// 查询应用已授权租户角色列表
export function listAuthorizedApp(appId) {
  return request({
    url: `/system/app/authorizedList/${appId}`,
    method: "get"
  });
}
// 应用授权批量申请·(appId,deptIds)
export function authorizeBatch(data) {
  return request({
    url: "/system/app/authorized/save",
    method: "post",
    data
  });
}

// 所有查询租户列表
export function newListTenant(query) {
  return request({
    url: "/system/tenant/newList",
    method: "get",
    params: query
  });
}

// 查询租户分页列表
export function list(query) {
  return request({
    url: "/system/tenant/list",
    method: "get",
    params: query
  });
}

// 查询应用列表
export function listApp(query) {
  return request({
    url: "/system/app/list",
    method: "get",
    params: query
  });
}