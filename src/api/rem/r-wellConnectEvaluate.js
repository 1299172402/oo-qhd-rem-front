// 井间连通性评价 api
import request from "@/utils/request";
import Axios from "@/utils/request";
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
const baseUrlIpm = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"

// export function getIsoline () {
//     return request({
//         url: `${baseUrl}/WellBorePipe/getIsoline`,
//         method: "get",
//     });
// }

// 条件搜索 依赖数据 ----  end
/**
 * 油田下拉
 * @params {} params
 * @returns
 */
export function getoilfield () {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/getAllOgf`,
        method: "get",
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
 * 获取根据油田标识获取区块信息-区块下拉
 * @params {ogfId:'油田id'} params
 * @returns
 */
export function getblock (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/getblockData`,
        method: "post",
        params,
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
 * 根据区块标识和井别获取井信息- 井号下拉
 * @params {blockId:'油田id'，apprndixId:'井别'} params
 * @returns
 */
export function getselectWellGroup (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/selectWellGroup`,
        method: "get",
        params,
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
 * 根据区块标识和井别获取井信息- 井号下拉
 * @params {blockId:'油田id'，apprndixId:'井别'} params
 * @returns
 */
 export function listGroupDataByBlockIdAndDate (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/listGroupDataByBlockIdAndDate`,
        method: "get",
        params,
    }).then((res) => {
        if (res) {
            return res;
        } else {
            return [];
        }
    });
}




// 井间连通性评价 首页 ---- start
/**
 * 运算及修正
 * @param {blockId:'区块id'，dataTime:'时间2022-04',type:'1:计算 2：修正'}
 * @returns{wellGroupId:'井组id', wellGroupName: '井组名称', layerNo: '层位名称'，remark:'备注'，unciomRatio:'连调系数计算'
 *         operUnicomRatio:'连调系数动态调整'，oilWellNo:'油井井号',injWellNo:'水井井号'} params
 */
export function getCorrectionOperation (params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/unicomModelOperation`,
        method: "post",
        timeout:30000,
        headers:{
            showloading:false
        },
        params,
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
 * 井组数据展示
 * @param {ogfId:'油田id',blockId: '区块id',dataTime: '时间 2022-04'} data
 * @returns
 */
export function postCoefficientconnectivity (data) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/wellGroupParamConfiguration`,
        method: "post",
        data,
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
 * 产量劈分 - 剖面 - 表格
 */
export function getChopSection (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/chopSection`,
        method: "post",
        params
    }).then((res) => {
        return res
    })
        ;
}

/**
 * 劈分系数-水井下载
 */
export function exportChopSection (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/exportChopSection`,
        method: "post",
        params,
        responseType: "blob",
    })
}


/**
 * 井组自定义-更改-回显
 * @param {ogfId:'油田id',blockId: '区块id',dataTime: '时间 2022-04'} data
 * @returns
 */
 export function wellGroupDataById (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellGroupDataById`,
        method: "GET",
        params,
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
 * 井组数据展示
 * @param {ogfId:'油田id',blockId: '区块id',dataTime: '时间 2022-04'} data
 * @returns
 */
 export function postCoefficientconnectivityList (data) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/wellGroupParamConfigurationList`,
        method: "post",
        data,
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
 * 连通性计算修改
 * @param { proWellId: '油井id',layerId: '层位标识', injDividingCoeff:'联通系数-动态调整', remark: '备注'} params
 * @returns
 */
// export function postCalculateUpdate (params) {
//     return request({
//         url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
//         method: "post",
//         data: params,
//     }).then((res) => {
//         if (res.data.data) {
//             // 返回数据 [{"wellGroupId":"井组标识", "wellGroupName":"井组名"}]
//             return res.data.data;
//         } else {
//             return [];
//         }
//     });
// }

/**
 * 连通系数保存
 * @param { wellGroupId: '井组标识',proWellId: '油井标识', remark:'备注', injDividingCoeff: '动态调整',dateTime:'时间'} params
 * @returns
 */
export function postCoefficientConnectionpreserve (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
        method: "post",
        data: params,
    }).then((res) => {
        if (res.code == 0) {
            return true;
        } else {
            return false;
        }
    });
}


/**
 * 平面注水劈分结果
 * @param { blockId: '区块id',dataTime: '时间 2022-04'} params
 * @returns
 */
export function getUnicomInjSplit (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/unicomInjSplit`,
        method: "post",
        params,
    }).then((res) => {
        if (res.data) {
            // 返回数据 [{"wellGroupId":"井组标识", "wellGroupName":"井组名"}]
            return res.data.data;
        } else {
            return [];
        }
    });
}


/**
 * 井组参数配置修改
 * @param {*} data
 * @returns
 */
export function postWellgroupRevise (data) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/updateWellGroup`,
        method: "post",
        data,
    });
}

/**
 *劈分系数表格
 * @param {*} params
 * @returns
 */
export function postdividingCoefficient (params) {
    return request({
        url: `${baseUrlIpm}/injectionProductionDeploy/dividingCoefficient`,
        method: "post",
        params,
    }).then((res) => {
        return res.data
    });
}


/**
 *劈分系数确认
 * @param {*} params
 * @returns
 */
export function postupdata (wellData) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/dividingCoefficient/updata`,
        method: "post",
        data: wellData,
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
 *劈分系数: 列表页保存按钮/弹框确定按钮
 * @param {*} params
 * @returns
 */
 export function postdividingCoefficientSave (data) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/dividingCoefficientSave`,
        method: "post",
        data,
    }).then((res) => {
        if (res.data.data) {
            return res.data.data;
        } else {
            return [];
        }
    });
}

/**
 *劈分系数油井导出
 * @param {*} params
 * @returns
 */
 export function exportDividingCoefficient (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/exportDividingCoefficient`,
        method: "post",
        params,
        responseType: "blob",
    })
}

/**
 *获取井组下的油井
 * @param {*} params
 * @returns
 */
export function postselectProWellByGroup (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/selectProWellByGroup`,
        method: "post",
        params,
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

/**
 * 删除井组
 * @param params
 * @returns {*}
 */
export function delectByWellGroupId(params){
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/delectByWellGroupId`,
        type: 'get',
        params
    })
}


/**
 *新增井组时水井和层段信息
 * @param {*} params
 * @returns
 */
export function getwaterWellAndLayerData (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/waterWellAndLayerData`,
        method: "get",
        params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

/**
 *根据水井标识获取层段
 * @param {*} params
 * @returns
 */
export function getlayerListByWaterWellId (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/layerListByWaterWellId`,
        method: "get",
        params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

/**
 *井组自定义修改+新增
 * @param {*} params
 * @returns
 */
export function postsaveAndupdateWellGroup (params) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/saveAndupdateWellGroup`,
        method: "post",
        data:params
    }).then((res) => {
        if (res.code == 0) {
            return true;
        } else {
            return false;
        }
    });
}

/**
 * 油藏管理-基础信息维护-列表页保存
 * @param {*} params
 * @returns
 */
 export function saveAllWellGroup (data) {
    return request({
        url: `${baseUrl}/injectionProductionDeploy/saveAllWellGroup`,
        method: "POST",
        data
    }).then((res) => {
        if (res.data.data) {
            return res.data.data;
        } else {
            return [];
        }
    });
}

/**
 * 井间连通性下载
 * @param {*} params 
 * @returns 
 */
export function downLoadUnicomModeloperationDto(data) {
    return request({
      url: `${baseUrl}/injectionProductionDeploy/downLoadUnicomModeloperationDto`,
      method: "POST",
      responseType: 'blob',
      data
    })
  }

  /**
 * 井间连通性-计算基础数据下载
 * @param {*} params 
 * @returns 
 */
export function downloadGroupParamDTO(data) {
    return request({
      url: `${baseUrl}/injectionProductionDeploy/downloadGroupParamDTO`,
      method: "POST",
      responseType: 'blob',
      data
    })
  }
export function getMonthlyActionStatus (params) {
    return request({
        url: `${baseUrl}/wellGroupCustomMaintenance/getMonthlyActionStatus`,
        method: "get",
        params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}
