/*
 * @Description: 油藏动态管理模块-油井辅助分析（深化接口）
 * @User: zxb
 * @Date: 2023-03-22
 */
import Axios from '@/utils/request';
const baseUrl = process.env.NODE_ENV == 'production' ? '/rem/api' : '/rem/api';

//大师简要-下拉框数据源
export function getMajorEventsBriefly(request) {
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/getMajorEventsBriefly`,
    method: "post",
    data: request,
  });
}
 
//生产状态列表接口
export function getProductionStatus(request) {
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/getProductionStatus`,
    method: "get",
    params: request
  });
}


