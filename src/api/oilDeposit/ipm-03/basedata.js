import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
export function getOgfInfo(orgId) {
  return Axios({
    url: `${baseUrl}/baseData/getOgfInfo?orgId=${orgId}`,
    method: "get",
  });
}
export function getOrgInfo() {
  return Axios({
    url: `${baseUrl}/baseData/getOrgInfo`,
    method: "get",
  });
}
export function getPlatInfo(ogfId) {
  return Axios({
    url: `${baseUrl}/baseData/getPlatInfo?ogfId=${ogfId}`,
    method: "get",
  });
}
/* 全井 油井+水井 */
export function getWellInfo(platId, ogfId) {
  return Axios({
    url: `${baseUrl}/baseData/getWellInfo?platId=${platId}&ogfId=${ogfId}`,
    method: "get",
  });
}
/* 仅生产状态油井 */
export function getOilWellProdInfo(platId, ogfId,platIds) {
  return Axios({
    url: `${baseUrl}/baseData/getOilWellProdInfo?platId=${platId}&ogfId=${ogfId}&platIds=${platIds}`,
    method: "get",
  });
}
/* 全油井 */
export function getOilWellInfo(platId,ogfId,platIds) {
  return Axios({
    url: `${baseUrl}/baseData/getOilWellInfo?platId=${platId}&ogfId=${ogfId}&platIds=${platIds}`,
    method: "get",
  })
}
/* 全水井 */
export function getWaterWellInfo(platId, ogfId) {
  return Axios({
    url: `${baseUrl}/baseData/getWaterWellInfo?platId=${platId}&ogfId=${ogfId}`,
    method: "get",
  })
}

/**
 * hwh
 * 转换井号 根据井id取查找对应的井号
 * @param borepipeId
 * @returns {AxiosPromise}
 */
export function transformBorepipeNo(borepipeId) {
  return Axios({
    url: `${baseUrl}/baseData/transformBorepipeNo?borepipeId=${borepipeId}`,
    method: "get",
  })
}