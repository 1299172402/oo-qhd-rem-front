import Axios from '@/utils/request'

export function fetchAidInfo(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchAidInfo`,
    method: "post",
    data: request,
  });
}
export function fetchFieldEvaluationResult(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchFieldEvaluationResult`,
    method: "post",
    data: request,
  });
}
//02-获取区块选项（SC-03-02）
export function fetchFields(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchFields`,
    method: "post",
    data: request,
  });
}
//获取油田水井选项（SC-03-01）
export function fetchInjectionWells(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchInjectionWells`,
    method: "post",
    data: request,
  });
}
//通过平台获取水井选项
export function fetchInjectionWellsByPlatform(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchInjectionWellsByPlatform`,
    method: "post",
    data: request,
  });
}
//获取油田选项（SC-03-01）
export function fetchOilFields() {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchOilFields`,
    method: "get",
  });
}
//获取平台选项（SC-03-03）(request{"oilFieldId":"string"})
export function fetchPlatforms(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchPlatforms`,
    method: "post",
    data: request,
  });
}
//通过油田获取采油井选项（SC-03-04）(request{"oilFieldId":"string"})
export function fetchProductionWells(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchProductionWells`,
    method: "post",
    data: request,
  });
}
//通过平台获取采油井选项（SC-03-06）(request{"platformId":"string"})
export function fetchProductionWellsByPlatform(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchProductionWellsByPlatform`,
    method: "post",
    data: request,
  });
}
export function fetchWellGroupEvaluationResult(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fetchWellGroupEvaluationResult`,
    method: "post",
    data: request,
  });
}

/**
 *  获得层位信息
 * @param request
 * @returns {AxiosPromise}
 */
export function fieldLayers(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fieldLayers`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 11-油田区块层位信息（SC-03-11）
 * @param request
 * @returns {AxiosPromise}
 */
export function fieldOilLayers(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/fieldOilLayers`,
    method: "post",
    data: request,
  });
}
export function uploadFile(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/uploadFile`,
    method: "post",
    data: request,
  });
}
export function ljpmImgUploadFile(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/saveSectionWell`,
    method: "post",
    data: request,
  });
}
/**
 *  hwh
 *  获得井组信息
 * @param request
 * @returns {AxiosPromise}
 */
export function wellGroups(request) {
  return Axios({
    url: `/rem02/api/primaryInfo/wellGroups`,
    method: "post",
    data: request,
  });
}
export function getLjpmWells(params) {
  return Axios({
    url: `/rem02/api/primaryInfo/getWellInfo`,
    method: "get",
    params: params,
  });
}
