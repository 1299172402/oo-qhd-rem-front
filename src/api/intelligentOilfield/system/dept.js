import request from "@/utils/request";

// 根据组织机构id查询其下的组织机构
export function getTenantsByUserId(userId) {
  return request({
    url: `/system/tenant/getTenantsByUserId/${userId}`,
    method: "get"
  });
}

// 查询部门列表
export function listDept(query) {
  return request({
    url: "/system/dept/list",
    method: "get",
    params: query
  });
}

// 查询部门列表
export function selectDepts(query) {
  return request({
    url: "/system/dept/selectDepts",
    method: "get",
    params: query
  });
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: `/system/dept/list/exclude/${deptId}`,
    method: "get"
  });
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: `/system/dept/${deptId}`,
    method: "get"
  });
}

// 查询部门下拉树结构，只展示未停用的部门
export function treeselect() {
  return request({
    url: "/system/dept/treeselect?status=0",
    method: "get"
  });
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: `/system/dept/roleDeptTreeselect/${roleId}`,
    method: "get"
  });
}

// 新增部门
export function addDept(data) {
  return request({
    url: "/system/dept",
    method: "post",
    data
  });
}

// 修改部门
export function updateDept(data) {
  return request({
    url: "/system/dept",
    method: "put",
    data
  });
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: `/system/dept/${deptId}`,
    method: "delete"
  });
}

// 删除部门(确认)
export function delDeptsure(deptId) {
  return request({
    url: `/system/dept/sureDeleteDept/${deptId}`,
    method: "get"
  });
}

// 获取编辑时的不可编辑项
export function getNoEditable() {
  return request({
    url: "/system/dept/nonEditable",
    method: "get"
  });
}