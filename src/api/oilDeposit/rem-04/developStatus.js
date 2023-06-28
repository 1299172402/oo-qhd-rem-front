/*
 * @Description: 开发现状跟踪深化接口）
 * @User: zxb
 * @Date: 2023-06-28
 */
import Axios from '@/utils/request';
const baseUrl = process.env.NODE_ENV == 'production' ? '/rem/api' : '/rem/api';

//开发预警-历史预警-搜索日期
export function getWarningsDate(params) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getWarningsDate`,
    method: "get",
    params
  });
}

//开发趋势分析-获取搜索框最大日期
export function getSearchDevTrendAnalysisDate(request) {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getSearchDevTrendAnalysisDate`,
    method: "get",
  });
}