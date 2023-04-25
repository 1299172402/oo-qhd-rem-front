/*
 * @Description: 产量管理（深化接口）
 * @User: zxb
 * @Date: 2023-04-25
 */
import Axios from '@/utils/request';
const baseUrl = process.env.NODE_ENV == 'production' ? '/rem/api' : '/rem/api';


//措施版本
export function getMeasureVersion() {
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/getMeasureVersion`,
    method: "get",
  });
}


//产量运行分析报告- 中间的表格
export function getProdDailyTable(request) {
  return Axios({
    url: `${baseUrl}/outputManagement/getProdDailyTable`,
    method: "post",
    data: request,
  });
}
//获取产量波动统计表   
export function getWellOutputWaveTable(request) {
  return Axios({
    url: `${baseUrl}/outputManagement/getWellOutputWaveTable`,
    method: "post",
    data: request,
  });
}