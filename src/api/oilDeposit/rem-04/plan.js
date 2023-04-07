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
 


