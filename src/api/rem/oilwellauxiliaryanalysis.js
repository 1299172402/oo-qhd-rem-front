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
