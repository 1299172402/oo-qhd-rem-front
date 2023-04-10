import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getProductionSplit(data){
    return request({
        url:`${baseUrl}/injectionProductionDeploy/productionAplit`,
        method:'post',
        params:data
    })
}

//获取油田
export function getOgfInfo () {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/getAllOgf`,
        method: "get",
    })

}

//获取区块
export function getblockData (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/getblockData`,
        method: "post",
        params
    })
}

export function getWellData (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/getWellData`,
        method: "post",
        params: params,
    }).then((res) => {
        if (res.data.data) {
            // 返回数据 [{"wellGroupId":"井组标识", "wellGroupName":"井组名"}]
            return res.data.data;
        } else {
            return [];
        }
    });
}

/**
 * 产量劈分 - 表格 - 下载
 */
export function exportProductionSplit (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/exportProductionSplit`,
        method: "post",
        params,
        responseType: "blob",
    })
}
