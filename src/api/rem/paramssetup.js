import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function deleteParameterSetting({ xIpmStimSuggestId } = {}) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/deleteParameterSetting?xIpmStimSuggestId=${ xIpmStimSuggestId || "" }`,
    method: "get",
  });
}
export function selectCraftMonolayer() {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/maxCraftMonolayerFlowRate/selectCraftMonolayer`,
    method: "get",
  });
}
export function updateCraftMonolayer({ injSeparateTypeCode, maxFlow, type } = {}) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/maxCraftMonolayerFlowRate/updateCraftMonolayer?injSeparateTypeCode=${ injSeparateTypeCode || "" }&maxFlow=${ maxFlow || "" }&type=${ type || "" }`,
    method: "get",
  });
}
export function parameterSetting() {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/parameterSetting`,
    method: "get",
  });
}
export function updateParameterSetting({ stimTypeName, xIpmStimSuggestId } = {}) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/updateParameterSetting?stimTypeName=${ stimTypeName || "" }&xIpmStimSuggestId=${ xIpmStimSuggestId || "" }`,
    method: "get",
  });
}
