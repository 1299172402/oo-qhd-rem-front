import request from "@/utils/request";
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d";
// http://10.77.78.243:8003/primaryInfo/fetchPlatforms

export function fetchPlatforms(data) {
  return request({
    url: `${masterUrl}/fetchPlatforms`,
    method: "post",
    data,
  });
}

export function queryOilAndGasFieldQueryPositionDetail(data) {
  return request({
    url: `${masterUrl}/queryOilAndGasFieldQueryPositionDetail`,
    method: "post",
    data,
  });
}
export function getYczcTree(data) {
  return request({
    url: `${masterUrl}/getYczcTree`,
    method: "post",
    data,
  });
}
// 获取作业公司名称及id
export function QueryOrganizationDetail(data) {
  return request({
    url: `${masterUrl}/QueryOrganizationDetail`,
    method: "post",
    data,
  });
}
// 获取油田名称及id
export function QueryOgfDetail(data) {
  return request({
    url: `/rem/api/omc003d/QueryOgfDetail`,
    method: "post",
    data,
  });
}
// 获取平台名称及id - 固定平台
export function QueryPlatformDetail(data) {
  return request({
    url: `/rem/api/omc003d/QueryPlatformDetail`,
    method: "post",
    data,
  });
}
// 获取平台名称及id - 查询生产平台，固定平台基础上减去EPP，加上FPSO
export function QuertProductionPlatformDetail(data) {
  return request({
    url: `${masterUrl}/QuertProductionPlatformDetail`,
    method: "post",
    data,
  });
}
// 获取所有井名称及id
export function QueryWellDetail(data) {
  return request({
    url: `/rem/api/omc003d/QueryWellDetail`,
    method: "post",
    data,
  });
}
// 获取油田下的区块
export function QueryReservoirAnalyseUnit(data) {
  return request({
    url: `${masterUrl}/QueryReservoirAnalyseUnit`,
    method: "post",
    data,
  });
}
export function userListByUserNames(data) {
    return request({
        url: `${masterUrl}/system/syncData/userListByUserNames`,
        method: "post",
        data,
    });
}