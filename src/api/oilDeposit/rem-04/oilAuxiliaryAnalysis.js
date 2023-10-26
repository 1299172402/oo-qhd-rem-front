/*
 * @Description: 油藏动态管理模块深化接口）
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

//区块辅助分析-动态资料-液油含水等值线图-查询上传的文件列表 
export function getFilePathList(request) {
  return Axios({
    url: `${baseUrl}/primaryInfo/getFilePathList`,
    method: "post",
    data: request,
  });
}

//区块辅助分析-动态资料-液油含水等值线图-底图(设为默认)
export function putFilePathList(request) {
  return Axios({
    url: `${baseUrl}/primaryInfo/setDefaultFile`,
    method: "put",
    params: request,
  });
}

//区块辅助分析-动态资料-液油含水等值线图-底图(删除)
export function deleteFile(request) {
  return Axios({
    url: `${baseUrl}/primaryInfo/deleteFile`,
    method: "delete",
    params: request,
  });
}

//油井辅助分析-生产动态资料-生产数据(表格)
export function produceTableData(request) {
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/produceTableData`,
    method: "post",
    data: request,
  });
}

//

export function getDate(params) {
  return Axios({
    url: `${baseUrl}/primaryInfo/getDate`,
    method: "get",
    params,
  });
}


//根据井号id获取区块id
export function getBlockWell(params) {
  return Axios({
    url: `${baseUrl}/primaryInfo/getBlockWell`,
    method: "get",
    params,
  });
}