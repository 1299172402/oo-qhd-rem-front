import request from "@/utils/request";

// 快捷入口模块
export function listEnter(query) {
  return request({
    url: "/system/enter/list",
    method: "get",
    params: query
  });
}

// 新增入口
export function addEnter(data) {
  return request({
    url: "/system/enter",
    method: "post",
    data
  });
}
// 删除入口
export function delEnter(enterId) {
  return request({
    url: `/system/enter/${enterId}`,
    method: "delete"
  });
}

// 修改入口
export function updateEnter(data) {
  return request({
    url: "/system/enter",
    method: "put",
    data
  });
}

// 门户办公模式-查询列表
export function getListEnter(query) {
  return request({
    url: "/system/enter/getList",
    method: "get",
    params: query
  });
}

export function getListEnterSelect(query) {
  return request({
    url: "/system/enter/officeSelected",
    method: "get",
    params: query
  });
}
export function getListEnterAll(query) {
  return request({
    url: "/system/enter/officeSelector",
    method: "get",
    params: query
  });
}

// 门户办公模式-选中
export function selectEnter(data) {
  return request({
    url: "/system/enter/inEnter",
    method: "post",
    data
  });
}

// 门户办公模式-取消选中
export function noSelectEnter(data) {
  return request({
    url: "/system/enter/outEnter",
    method: "post",
    data
  });
}

// 门户办公模式-确定取消
export function sureEnter(data) {
  return request({
    url: "/system/enter/sureEnter",
    method: "post",
    data
  });
}

// 门户办公模式-获取已关联菜单应用列表
export function queryLinkedApps() {
  return request({
    url: "/system/app/queryLinkedApps",
    method: "get"
  });
}