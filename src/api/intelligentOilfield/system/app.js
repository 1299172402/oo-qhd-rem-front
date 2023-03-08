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