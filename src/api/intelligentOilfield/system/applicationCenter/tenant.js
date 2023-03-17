import request from "@/utils/request";

// 查询租户分页列表
export function tenantList(query) {
  return request({
    url: "/system/tenant/paginate",
    method: "get",
    params: query
  });
}

// 查询租户详情
export function findById(id) {
  return request({
    url: `/system/tenant/${id}`,
    method: "get"
  });
}

// 新增租户
export function addTenant(data) {
  return request({
    url: "/system/tenant",
    method: "post",
    data
  });
}

// 修改租户
export function updateTenant(data) {
  return request({
    url: "/system/tenant",
    method: "put",
    data
  });
}

// 删除租户
export function deleteTenant(id) {
  return request({
    url: `/system/tenant/${id}`,
    method: "delete",
    data: id
  });
}

// 租户的用户列表
export function tenantUserList(query) {
  return request({
    url: "/system/tenant/users",
    method: "get",
    params: query
  });
}

// 绑定租户分配的用户
export function bindTenantUser(data) {
  return request({
    url: "/system/tenant/bind/user",
    method: "put",
    data
  });
}

// 解绑租户分配的用户
export function unbindTenantUser(data) {
  return request({
    url: "/system/tenant/unbind/user",
    method: "put",
    data
  });
}

// 绑定租户管理员
export function bindTenantManager(data) {
  return request({
    url: "/system/tenant/bind/manager",
    method: "put",
    data
  });
}

// 解绑租户管理员
export function unbindTenantManager(data) {
  return request({
    url: "/system/tenant/unbind/manager",
    method: "put",
    data
  });
}

// 根据租户 code 查询信息
export function getInfoByCode(tenantCode) {
  return request({
    url: `/system/tenant/getInfoByCode/${tenantCode}`,
    method: "get"
  });
}