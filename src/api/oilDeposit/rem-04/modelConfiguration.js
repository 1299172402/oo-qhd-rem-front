/*
 * @Description: 模型配置（深化接口）
 * @User: zxb
 * @Date: 2023-06-05
 */
import Axios from '@/utils/request';
const baseUrl = process.env.NODE_ENV == 'production' ? '/rem/api' : '/rem/api';

//根据油田数据源
export function getOgfList() {
  return Axios({
    url: `${baseUrl}/selectMt/getOgfList`,
    method: "get",
  });
}


//根据油田id-获取区块数据源
export function getBlockList(request) {
  return Axios({
    url: `${baseUrl}/selectMt/getBlockList`,
    method: "get",
    params: request
  });
}

//井型数据源
export function getProdDailyTable(request) {
  return Axios({
    url: `${baseUrl}/selectMt/getWellTypeList`,
    method: "get",
    params: request
  });
}

//获取井号数据源
export function getWellList(request) {
  return Axios({
    url: `${baseUrl}/selectMt/getWellList`,
    method: "get",
    params: request
  });
}


//根据井号id-获取上级井型，区块，油田
export function getWell(request) {
  return Axios({
    url: `${baseUrl}/selectMt/getWell`,
    method: "get",
    params: request
  });
}


//添加模型数据   
export function addGeneralConfig(request) {
  return Axios({
    url: `${baseUrl}/generalConfigMt/addGeneralConfig`,
    method: "post",
    data: request,
  });
}

//修改参数配置
export function editGeneralConfig(request) {
  return Axios({
    url: `${baseUrl}/generalConfigMt/editModelConfigValue`,
    method: "post",
    data: request,  
  });
}

//删除模型配置
export function delGeneralConfig(request) {
  return Axios({
    url: `${baseUrl}/generalConfigMt/delGeneralConfig/${request.id}`,
    method: "delete",
  });
}


//大分页接口
export function getPageBySelectType(request) {
  return Axios({
    url: `${baseUrl}/generalConfigMt/getPageBySelectType`,
    method: "get",
    params: request
  });
}



