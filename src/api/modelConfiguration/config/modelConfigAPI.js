/*
 * @Description: 模型配置
 */
import Axios from '@/utils/request'
import request from "@/utils/request";
const baseUrl = process.env.NODE_ENV == "production" ? "/model/config" : "/model/config"

export function getAllModelName(){
    return Axios({
        url: `${baseUrl}/generalConfigMt/getAllModelName`,
        method: "get",
        params:{}
    });
}


export function queryTableData(query){
    return Axios({
        url: `${baseUrl}/generalConfigMt/pageList`,
        method: "get",
        params:query
    });
}

export function editModelConfigValue(date){
    return Axios({
        url: `${baseUrl}/generalConfigMt/editModelConfigValue`,
        method: "post",
        data:date
    });
}
//日度重跑
export function rangeSelDayApi(query){
    return Axios({
        url: `${baseUrl}/AcAll/rangeSelDay`,
        method: "get",
        params:query
    });
}
//月度重跑
export function selMonthRangeApi(query){
    return Axios({
        url: `${baseUrl}/AcAll/selMonthRange`,
        method: "get",
        params:query
    });
}
// 模型说明下载
export function getModelInstructionManual(){
    return Axios({
        url: `${baseUrl}/generalConfigMt/getModelInstructionManual`,
        method: "get",
		responseType:'blob',
        params:{}
    });
}
export function queryModelConfigurationByCode({ configurationModelCode} = {}) {
    return request({
        url: `injation/api/configurationModel/queryModelConfigurationByCode?configurationModelCode=${ configurationModelCode || "" }`,
        method: "get",
    });
}
export function updateModelConfigurationByCode(date){
    return Axios({
        url: `injation/api/configurationModel/updateModelConfigurationByCode`,
        method: "post",
        data:date
    });
}