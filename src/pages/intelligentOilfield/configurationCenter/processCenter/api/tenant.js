import request from ".";

// 流程平台查询租户列表
export function processTenantList(param) {
  return request({
    url: "/app/rest/sys/check-users",
    method: "post",
    data: param
  });
}

// 流程平台租户禁用
export function disable(tenantCode) {
  return request({
    url: `/app/rest/sys/user/${tenantCode}/disable`,
    method: "post"
  });
}

// 流程平台租户启动
export function enable(tenantCode) {
  return request({
    url: `/app/rest/sys/user/${tenantCode}/enable`,
    method: "post"
  });
}

// 新增保存流程租户基本信息
export function saveTenantInfo(data) {
  return request({
    url: "app/rest/sys/user",
    method: "post",
    data
  });
}

// 编辑保存流程租户基本信息
export function saveEditTenantInfo(data) {
  return request({
    url: `app/rest/sys/user/${data.id}`,
    method: "post",
    data
  });
}

// 查询流程租户单条数据
export function findById(id) {
  return request({
    url: `/app/rest/sys/user/${id}`,
    method: "get"
  });
}