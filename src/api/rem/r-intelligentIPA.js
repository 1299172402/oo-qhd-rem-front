// 智能注采调配 api
import Axios from "@/utils/request";

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"

// 首页 start ----

/**
 * 获取区块数据
 * @param params
 * params: {ogfId: '油田标识', blockId: '区块标识', dateTime: 'yyyy-MM'}
 * @returns {AxiosPromise}
 */
export function getWellGroupBlock(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/wellGroupBlock`,
        method: "post",
        params
    }).then((res) => {
        // if(res.data.code === 0 && res.data.data)

        return res.data.data
    });
}

/**
 * 分层注采量
 * @param params
 * ogfId   油田Id
 * blockId  区块Id
 * startTime  开始时间
 * endTime    结束时间
 * timeStatus  时间状态 月度：1，年度：2，阶段：3
 * @returns {AxiosPromise}
 */
export function getStratifiedInjectionDetails(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/stratifiedInjectionDetails`,
        method: "post",
        params
    }).then((res) => {
        // if(res.data.code === 0 && res.data.data)
        return res.data.data

    });
}

/**
 * 分层注采量
 * @param params
 * ogfId   油田Id
 * blockId  区块Id
 * startTime  开始时间
 * endTime    结束时间
 * timeStatus  时间状态 月度：1，年度：2，阶段：3
 * @returns {AxiosPromise}
 */
export function getStratifiedInjectionDetailsComp(data) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/stratifiedInjectionDetailsComp`,
        method: "post",
        data
    }).then((res) => {
        return res.data.data
    });
}

/**
 * 剩余油情况
 * @returns {AxiosPromise}
 */
export function getResidueOilCondotion(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/residueOilCondition`,
        method: "get",
        params
    }).then((res) => {
        return res.data
    });
}

/**
 * 超欠注情况统计
 * @param params
 * params: {ogfId: '油田标识', blockId: '区块标识', dateTime: 'yyyy-MM'}
 * @returns {AxiosPromise}
 */
export function getUltraShortShotStatistics(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/ultraShotStatistics`,
        method: "post",
        params
    }).then((res) => {
        // if(res.data.code === 0 && res.data.data)
        return res.data

    });
}

// 首页 end ------
// -------------------------------------------------------
// 详情 start ----
/**
 * 下载分层注采量文件
 * @param params
 * ogfId   油田Id
 * blockId  区块Id
 * startTime  开始时间
 * endTime    结束时间
 * timeStatus  时间状态 月度：1，年度：2，阶段：3
 * @returns {AxiosPromise}
 */
export function downloadStratifiedInjectionDetails(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/stratifiedInjectionDetails/download`,
        method: "post",
        params
    }).then((res) => {
        if (res.data.code === 0 && res.data.data)
            return res.data.data
    });
}

// 详情 end ----


/**
 * 查询条件
 * @returns
 */
//获取油田
export function getOgfInfo() {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/getAllOgf`,
        method: "get",
    }).then((res) => {
        return res.data
    });

}

//获取区块
export function getblockData(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/getblockData`,
        method: "post",
        params: params
    }).then((res) => {
        return res.data
    });
}

/**
 * 根据区块标识和井别获取井信息- 井号下拉
 * @params {blockId:'油田id'，apprndixId:'井别'} params
 * @returns
 */
export function getWellData(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/getWellData`,
        method: "post",
        params: params,
    }).then((res) => {
        if (res.data) {
            // 返回数据 [{"wellGroupId":"井组标识", "wellGroupName":"井组名"}]
            return res.data;
        } else {
            return [];
        }
    });
}


/**
 * 产量劈分
 */
export function getProductionSplit(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/productionAplit`,
        method: "post",
        params,
    }).then((res) => {
        return res.data
    })
        ;
}

/**
 * 产量劈分 - 表格 - 下载
 */
export function exportProductionSplit(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/exportProductionSplit`,
        method: "post",
        params,
        responseType: "blob",
    })
}


/**
 * 产量劈分 - 剖面 - 井
 */
export function getSelectWellGroup(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/selectWellGroup`,
        method: "get",
        params
    }).then((res) => {
        return res.data.data
    })
        ;
}

/**
 * 产量劈分 - 剖面 - 表格
 */
export function getChopSection(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/chopSection`,
        method: "post",
        params
    }).then((res) => {
        return res.data
    })
        ;
}

/**
 * 劈分系数-水井下载
 */
export function exportChopSection(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/exportChopSection`,
        method: "post",
        params,
        responseType: "blob",
    })
}


/**
 * 注采调配优化 - 单井月度配产计划表
 */
export function getWellMonthAllocation(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellMonthAllocation`,
        method: "get",
        params
    }).then((res) => {
        return res.data
    })

}

/**
 * 注采调配优化 - 单井月度配注计划表
 */
export function getWellMonthInj(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellMonthInj`,
        method: "post",
        params: params
    }).then((res) => {
        return res.data
    })

}

/**
 * 注采调配优化 - 单井月度配注计划表 - NEW
 */
export function getChatPlanINjAlloc(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/chatPlanINjAlloc`,
        method: "POST",
        data: params
    }).then((res) => {
        return res.data.data
    })

}

/**
 * 注采调配优化 - 指定单井产量修改
 */
export function wellAvgFluidProdAllocUpdate(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellAvgFluidProdAllocUpdate`,
        method: "post",
        data: params
    }).then((res) => {
        if (!res) {
            return true
        } else {
            return false
        }
    })
}

/**
 * 注采调配优化 - 指定单井产量修改
 */
export function wellAvgFluidProdAllocUpdateNew(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellAvgFluidProdAllocUpdateNew`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data.code == 0) {
            return true
        } else {
            return false
        }
    })

}

/**
 * 注采调配优化 - 指定单井产量
 */
export function getWellAvgFluidProdAlloc(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellAvgFluidProdAlloc`,
        method: "post",
        params
    }).then((res) => {
        return res.data
    })

}


/**
 * 注采调配优化 - 指定注采比
 */
export function getWellInjRatio(data) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellInjRatio`,
        method: "post",
        data
    }).then((res) => {
        if (res.data.code == 0) {
            console.log(res.data.data)
            return res.data.data
        } else {
            return null
        }
    })

}

/**
 * 注采调配优化 - 预测结果
 */
export function getWellGuessResult(params) {
    return Axios({
        url: `${baseUrl}/injDeployOptimize/wellGuessResult`,
        method: "post",
        data: params
    }).then((res) => {
        return res.data.data
    })
}

/**
 * 设置对象树
 */
export function getObjectTree() {
    return Axios({
        url: `${baseUrl}/baseData/setObjectTree`,
        method: "get",
    }).then((res) => {

        if (res.data.data) {
            res.data.data.id = res.data.data.orgId
            res.data.data.name = res.data.data.orgName
            if (res.data.data.ogfRegList) {
                res.data.data.children = res.data.data.ogfRegList
                res.data.data.children.forEach(aa => {
                    aa.id = aa.ogfId
                    aa.name = aa.ogfName
                    if (aa.prodPlataformList) {
                        aa.children = aa.prodPlataformList
                        aa.children.forEach(bb => {
                            bb.id = bb.assetCode
                            bb.name = bb.platformName
                            if (bb.wellList) {
                                bb.children = bb.wellList
                                bb.children.forEach(cc => {
                                    cc.id = cc.wellId
                                    cc.name = cc.wellName
                                    if (cc.layerRegList) {
                                        cc.children = cc.layerRegList
                                        cc.children.forEach(dd => {
                                            dd.id = dd.layerId
                                            dd.name = dd.layerName
                                            dd.wellId = cc.wellId
                                            dd.wellName = cc.wellName
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }
        }
        return res.data.data
    })

}


