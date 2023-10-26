import request from "@/utils/request";

// 搜索
export function searchequipment(data) {
  return request({
    url: "/system/equipment/listByLike",
    method: "post",
    data
  });
}

// 获取状态
export function equipmentStatus(query) {
  return request({
    url: "system/equipment/selectStatus",
    method: "get",
    params: query
  });
}

// 系统列表，带分页
export function eqSystemList(query) {
  return request({
    url: "system/eqSystem/list",
    method: "get",
    params: query
  });
}

// 系统列表，不带分页
export function eqSystemListNoPage(terraceId) {
  return request({
    url: `system/eqSystem/listByLike?terraceId=${terraceId}`,
    method: "post"
  });
}

// 新增系统
export function addEqSystem(data) {
  return request({
    url: "system/eqSystem",
    method: "post",
    data
  });
}

// 修改系统
export function editEqSystem(data) {
  return request({
    url: "system/eqSystem/edit",
    method: "post",
    data
  });
}

// 系统详情
export function queryEqSystem(systemId) {
  return request({
    url: `system/eqSystem/${systemId}`,
    method: "get"
  });
}

// 删除系统
export function removeEqSystem(systemId) {
  return request({
    url: `system/eqSystem/remove/${systemId}`,
    method: "post"
  });
}

// 获取系统下拉来源
export function getTerrace() {
  return request({
    url: "system/eqSystem/getTerrace",
    method: "get"
  });
}

// 设备列表，带分页
export function equipmentList(query) {
  return request({
    url: "system/equipment/list",
    method: "get",
    params: query
  });
}

// 新增设备
export function addEquipment(data) {
  return request({
    url: "system/equipment",
    method: "post",
    data
  });
}

// 修改设备
export function editEquipment(data) {
  return request({
    url: "system/equipment/edit",
    method: "post",
    data
  });
}

// 设备详情
export function queryEquipment(equipmentId) {
  return request({
    url: `system/equipment/${equipmentId}`,
    method: "get"
  });
}

// 删除设备
export function removeEquipment(equipmentId) {
  return request({
    url: `system/equipment/remove/${equipmentId}`,
    method: "post"
  });
}

// 查询云上链表列表
export function linkList(query) {
  return request({
    url: "system/link/list",
    method: "get",
    params: query
  });
}

// 根据要求搜索云上链表列表
export function listByLike(query) {
  return request({
    url: "system/link/listByLike",
    method: "post",
    params: query
  });
}

// 查询海陆数据的平台关系及状态
export function terraceState() {
  return request({
    url: "system/eqSystem/terraceState",
    method: "get"
  });
}

// 搜索
export function searchEquipmentByLink(query) {
  return request({
    url: `/system/equipment/listByLike?systemId=${query.systemId}&equipmentType=${query.equipmentType}&equipmentCode=${query.equipmentCode}`,
    method: "post"
  });
}

export function uploadFile1(updateSupport, data) {
  return request({
    url: `/system/eqSystem/importData?updateSupport=${updateSupport}`,
    method: "post",
    data
  });
}
export function uploadFile2(updateSupport, data) {
  return request({
    url: `/system/equipment/importData?updateSupport=${updateSupport}`,
    method: "post",
    data
  });
}

// 第三版接口
export function monitorLinks(data) {
  return request({
    url: "/system/monitor/links",
    method: "post",
    data
  });
}

// 平台链路列表
// 列表
export function terraceList(query) {
  return request({
    url: "system/terrace/list",
    method: "get",
    params: query
  });
}

// 新增
export function addTerrace(data) {
  return request({
    url: "system/terrace/add",
    method: "post",
    data
  });
}

// 修改
export function editTerrace(data) {
  return request({
    url: "system/terrace/edit",
    method: "post",
    data
  });
}

// 详情
export function getTerraceDetail(terraceId) {
  return request({
    url: `system/terrace/${terraceId}`,
    method: "get"
  });
}

// 删除
export function removeTerrace(terraceId) {
  return request({
    url: `system/terrace/${terraceId}`,
    method: "post"
  });
}

// 云端链路列表

// 新增
export function addLink(data) {
  return request({
    url: "system/link/add",
    method: "post",
    data
  });
}

// 修改
export function editLink(data) {
  return request({
    url: "system/link/edit",
    method: "post",
    data
  });
}

// 详情
export function getLinkDetail(linkId) {
  return request({
    url: `system/link/${linkId}`,
    method: "get"
  });
}

// 删除
export function removeLink(linkId) {
  return request({
    url: `system/link/${linkId}`,
    method: "post"
  });
}