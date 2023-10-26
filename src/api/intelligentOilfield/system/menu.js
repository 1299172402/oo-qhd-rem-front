import request from "@/utils/request";

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: "/system/menu/list",
    method: "get",
    params: query
  });
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: `/system/menu/${menuId}`,
    method: "get"
  });
}

// 根据appID查询菜单下拉树结构
export function roleMenuTreeSelectByAppId(query) {
  return request({
    url: "/system/menu/roleMenuTreeSelectByAppId",
    method: "get",
    params: query
  });
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: "/system/menu/treeselect",
    method: "get"
  });
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: `/system/menu/roleMenuTreeselect/${roleId}`,
    method: "get"
  });
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: "/system/menu",
    method: "post",
    data
  });
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: "/system/menu",
    method: "put",
    data
  });
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: `/system/menu/${menuId}`,
    method: "delete"
  });
}

// 快捷入口模糊搜索菜单应用
export function getMunuAppList(menuName) {
  return request({
    url: `/system/menu/getMenuAndAppList/${menuName}`,
    method: "get"
  });
}