import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getWellGroupCommunicateDynamic({ blockId, firstMonth, secondMonth, wellGroupId } = {}) {
  return request({
    url: `${baseUrl}/oilWellAuxiliaryAnalysis/getWellGroupCommunicateDynamic?blockId=${ blockId || "" }&firstMonth=${ firstMonth || "" }&secondMonth=${ secondMonth || "" }&wellGroupId=${ wellGroupId || "" }`,
    method: "get",
  });
}
export function getWellGroupInjectionDynamic({ blockId, firstMonth, ogfId, secondMonth, wellGroupId } = {}) {
  return request({
    url: `${baseUrl}/oilWellAuxiliaryAnalysis/getWellGroupInjectionDynamic?blockId=${ blockId || "" }&firstMonth=${ firstMonth || "" }&ogfId=${ ogfId || "" }&secondMonth=${ secondMonth || "" }&wellGroupId=${ wellGroupId || "" }`,
    method: "get",
  });
}
export function queryInjectionWellNetworkConditionsList({ blockId, firstMonth, ogfId, pageNum, pageSize, secondMonth, wellGroupId } = {}) {
  return request({
    url: `${baseUrl}/oilWellAuxiliaryAnalysis/queryInjectionWellNetworkConditionsList?blockId=${ blockId || "" }&firstMonth=${ firstMonth || "" }&ogfId=${ ogfId || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&secondMonth=${ secondMonth || "" }&wellGroupId=${ wellGroupId || "" }`,
    method: "get",
  });
}
export function queryWellGroupInjDynamicData({ wellGroupId,month,ogfId } = {}) {
    return request({
        url: `ipm/api/analyzeWellGroup/queryWellGroupInjDynamicData?wellGroupId=${ wellGroupId || "" }&ogfId=${ ogfId || "" }&month=${ month || "" }`,
        method: "get",
    });
}
export function getWellGroupsByBlock({ blockId,month } = {}) {
    return request({
        url: `ipm/api/analyzeWellGroup/getWellGroupsByBlock?blockId=${ blockId || "" }&month=${ month || "" }`,
        method: "get",
    });
}