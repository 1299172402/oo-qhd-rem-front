/*
 * @Description: 油藏动态管理模块-措施管理（深化接口）
 * @User: zxb
 * @Date: 2023-03-22
 */
import Axios from '@/utils/request';
const baseUrl = process.env.NODE_ENV == 'production' ? '/rem/api' : '/rem/api';

//作业信息列表
export function getWorkProgress(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getWorkProgress`,
    method: "post",
    data: request,
  });
}

//措施版本
export function getMeasureVersion() {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getMeasureVersion`,
    method: "get",
  });
}

//措施管理列表
export function getFetchMeasureInfos(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getFetchMeasureInfos`,
    method: "post",
    data: request,
  });
}

//年度计划管理-滚动预测下拉框-数据源
export function getRollForecastVersion(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getRollForecastVersion`,
    method: "post",
    data: request,
  });
}


//年度计划管理-天然气产量跟踪表格
export function getGasTable(request) {
  return Axios({
    url: `${baseUrl}//oilFieldManagePlanController/getGasTable`,
    method: "post",
    data: request,
  });
}
//年度计划管理-基础产量表格
export function oldWellTable(request) {
  return Axios({
    url: `${baseUrl}//oilFieldManagePlanController/oldWellTable`,
    method: "post",
    data: request,
  });
}
//年度计划管理-措施井产量表格
export function measureTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/measureTable`,
    method: "post",
    data: request,
  });
}
//年度计划管理-措施井产量表格
export function adjustWellTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/adjustWellTable`,
    method: "post",
    data: request,
  });
}
//年度计划管理-措施井产量表格
export function devWellTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/devWellTable`,
    method: "post",
    data: request,
  });
}
//年度计划管理-原油产量表格下载
export function downLoadOilProductionTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/downLoadOilProductionTable`,
    method: "post",
    data: request,
    responseType: "blob"
  });
}

//年度计划管理-天然气产量表格下载
export function downGetGasTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/downGetGasTable`,
    method: "post",
    data: request,
    responseType: "blob"
  });
}

//年度计划管理-油田注水量表格下载
export function dowmInjectionTable(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/dowmInjectionTable`,
    method: "post",
    data: request,
    responseType: "blob"
  });
}
