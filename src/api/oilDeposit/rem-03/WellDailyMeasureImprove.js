import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
/**
 * 获取单井日度措施配产
 * @param params
 * @returns {AxiosPromise}
 */
export function getWellDailyMeasureInfo(params) {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/getWellDailyMeasureInfo`,
    method: "get",
    params: params,
  });
}

/**
 * 删除单井日度措施配产
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteWellDailyMeasureInfoByIds(data) {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/deleteWellDailyMeasureInfoByIds`,
    method: "delete",
    data: data,
  });
}

/**
 * 保存单井日度措施配产
 * @param data
 * @returns {AxiosPromise}
 */
export function insertWellDailyMeasureInfo(data) {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/insertWellDailyMeasureInfo`,
    method: "post",
    data: data
  });
}


/**
 * 保存单井日度措施配产-单条
 * @param data
 * @returns {AxiosPromise}
 */
export function insertWellDailyMeasureInfoSingle(data) {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/insertWellDailyMeasureInfoSingle`,
    method: "post",
    data: data
  });
}

/**
 * 获取措施列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getMeasureTypeList() {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/queryMeasureTypeList`,
    method: "get"
  });
}


/**
 * 计算单井配产量
 * @param params
 * @returns {AxiosPromise}
 */
export function calcSingleWellMeasureStatInfos(params) {
  return Axios({
    url: `${baseUrl}/wellDailyMeasureImprove/calcSingleWellMeasureStatInfos`,
    method: "get",
    params: params
  });
}