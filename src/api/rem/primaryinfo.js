import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function deleteFile({ remFileRecordId } = {}) {
  return request({
    url: `${baseUrl}/primaryInfo/deleteFile?remFileRecordId=${ remFileRecordId || "" }`,
    method: "delete",
  });
}
export function fetchALLOilFields() {
  return request({
    url: `${baseUrl}/primaryInfo/fetchALLOilFields`,
    method: "get",
  });
}
export function fetchAidInfo(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchAidInfo`,
    method: "post",
    data
  });
}
export function fetchAidInfoLayer(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchAidInfoLayer`,
    method: "post",
    data
  });
}
export function fetchFieldEvaluationResult(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchFieldEvaluationResult`,
    method: "post",
    data
  });
}
export function fetchFields(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchFields`,
    method: "post",
    data
  });
}
export function fetchInjectionWells(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchInjectionWells`,
    method: "post",
    data
  });
}
export function fetchInjectionWellsByPlatform(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchInjectionWellsByPlatform`,
    method: "post",
    data
  });
}
export function fetchOilFields() {
  return request({
    url: `${baseUrl}/primaryInfo/fetchOilFields`,
    method: "get",
  });
}
export function fetchPlatforms(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchPlatforms`,
    method: "post",
    data
  });
}
export function fetchProductionWells(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchProductionWells`,
    method: "post",
    data
  });
}
export function fetchProductionWellsByPlatform(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchProductionWellsByPlatform`,
    method: "post",
    data
  });
}
export function fetchWellGroupEvaluationResult(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fetchWellGroupEvaluationResult`,
    method: "post",
    data
  });
}
export function fieldLayers(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fieldLayers`,
    method: "post",
    data
  });
}
export function fieldOilLayers(data) {
  return request({
    url: `${baseUrl}/primaryInfo/fieldOilLayers`,
    method: "post",
    data
  });
}
export function getFilePathList(data) {
  return request({
    url: `${baseUrl}/primaryInfo/getFilePathList`,
    method: "post",
    data
  });
}
export function getWellInfo({ ogfId, platId } = {}) {
  return request({
    url: `${baseUrl}/primaryInfo/getWellInfo?ogfId=${ ogfId || "" }&platId=${ platId || "" }`,
    method: "get",
  });
}
export function setDefaultFile({ remFileRecordId } = {}) {
  return request({
    url: `${baseUrl}/primaryInfo/setDefaultFile?remFileRecordId=${ remFileRecordId || "" }`,
    method: "put",
  });
}
export function uploadFile(data) {
  return request({
    url: `${baseUrl}/primaryInfo/uploadFile`,
    method: "post",
    data
  });
}
export function wellGroups(data) {
  return request({
    url: `${baseUrl}/primaryInfo/wellGroups`,
    method: "post",
    data
  });
}
