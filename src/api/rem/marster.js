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
export function queryOgfReg(data) {
  return request({
    url: `${masterUrl}/queryOgfReg`,
    method: "post",
    data,
  });
}
export function queryOperatingCompanyDetail(data) {
  return request({
    url: `${masterUrl}/queryOperatingCompanyDetail`,
    method: "post",
    data,
  });
}
export function queryListOfOilfieldQueryPlatformsDetail(data) {
  return request({
    url: `${masterUrl}/queryListOfOilfieldQueryPlatformsDetail`,
    method: "post",
    data,
  });
}

export function queryPlatformQueryWellListDetail(data) {
  return request({
    url: `${masterUrl}/queryPlatformQueryWellListDetail`,
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
export function queryOperatorsCheckFieldListsDetail(data) {
  return request({
    url: `${masterUrl}/queryOperatorsCheckFieldListsDetail`,
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
// export function queryPlatformQueryWellListDetail(data) {
//   return request({
//     url: `${masterUrl}/queryPlatformQueryWellListDetail`,
//     method: "post",
//     data
//   });
// }
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
    url: `${masterUrl}/QueryOgfDetail`,
    method: "post",
    data,
  });
}
// 获取平台名称及id - 固定平台
export function QueryPlatformDetail(data) {
  return request({
    url: `${masterUrl}/QueryPlatformDetail`,
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
    url: `${masterUrl}/QueryWellDetail`,
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