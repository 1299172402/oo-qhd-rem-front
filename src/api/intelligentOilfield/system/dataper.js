import request from "@/utils/request";

// 查询数据权限列表
export function dataPerList(query) {
  return request({
    url: "/system/data/list",
    method: "get",
    params: query
  });
}
// 查询新增-应用选择
export function appList(query) {
  return request({
    url: "/system/app/list",
    method: "get",
    params: query
  });
}
// 查询新增-列表选择
export function tableList(appleId) {
  return request({
    url: `/system/table/getTables/${appleId}`,
    method: "get"
  });
}
// 查询新增-字段选择
export function fieldsList(tableId) {
  return request({
    url: `/system/field/getFields/${tableId}`,
    method: "get"
  });
}
// 新增数据权限
export function adddataPer(data) {
  return request({
    url: "/system/data",
    method: "post",
    data
  });
}
// 删除数据权限
export function deldataPer(dataIds) {
  return request({
    url: `/system/data/${dataIds}`,
    method: "delete"
  });
}
// 查询数据权限详细
export function getdataPer(dataId) {
  return request({
    url: `/system/data/${dataId}`,
    method: "get"
  });
}
// 修改数据权限
export function updatePer(data) {
  return request({
    url: "/system/data",
    method: "put",
    data
  });
}
// 数据权限状态修改
export function changeDataStatus(dataId, status) {
  const data = {
    dataId,
    status
  };
  return request({
    url: "/system/data/changeStatus",
    method: "put",
    data
  });
}
// 根据appId获取数据源列表
export function dataSourceList(data) {
  return request({
    url: "/dsm/datasource/getDsListByAppId",
    method: "post",
    data
  });
}
// 根据数据源id获取列表
export function ulList(data) {
  return request({
    url: "/dsm/datasource/getTableProjectByDsId",
    method: "post",
    data
  });
}
// 根据列表id获取字段
export function fieldList(data) {
  return request({
    url: "/dsm/datasource/getFieldProjectByTableId",
    method: "post",
    data
  });
}