// 注入评估分析 api
import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"

/**
 *
 * @returns {requestPromise}
 */
export function getWaterAbsorptionCapacityForecast (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/waterAbsorptionCapacityForecast`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data.code === 0 && res.data) return res.data
    });
}




/**
 * 配注方案分析与评估-评估结果统计查询
 * @param {*} params 
 * @returns 
 */
export function grtAssessStatisticsResult (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/evaluationResultStatistics`,
        method: "get",
        params
    }).then((res) => {
        return res.data
    });
}

// 条件检索 依赖数据 ----  end
/**
 * 获取作业公司
 * @params {} params
 * @returns
 */
export function getoperatingCompany () {
    return request({
        url: `${baseUrl}/baseData/getOrgInfo`,
        method: "get",
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

/**
 * 获取油田
 * @params {作业公司id} params
 * @returns
 */
export function getoilField (params) {
    return request({
        url: `${baseUrl}/baseData/getOgfInfo`,
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
 * 获取平台
 * @params {油田id} params
 * @returns
 */
export function getplatform (params) {
    return request({
        url: `${baseUrl}/searchCriteria/getPlatInfo`,
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
 * 获取井号
 * @params {} params
 * @returns
 */
export function getwellInfo (params) {
    return request({
        url: `${baseUrl}/searchCriteria/getWaterWellInfo`,
        method: "get",
        params
    }).then((res) => {
            return res.data;
    });
}

// 吸水能力预测 ----  end
/**
 * @params {} params
 * @returns
 */
export function getwaterAbsorptionPrediction (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/waterAbsorptionCapacityForecast`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 统计查询 ----  end
/**
 * @params {} params
 * @returns
 */
export function getstatisticalQuery (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/selectStatisticsWaterAbsorption`,
        method: "post",
        data: params
    }).then((res) => {
            return res.data;
    });
}

// 临时增注计算 ----  end
/**
 * @params {} params
 * @returns
 */
export function gettemporaryIncreaseInjCompute (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/temporaryIncreaseInjCompute`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第一个大图表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getInjAndOilPress (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/InjAndOilPress`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第二个大图表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getforecastinjectAssessActual (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/forecastinjectAssessActual`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第三个表格 ----  end
/**
 * @params {} params
 * @returns
 */
export function getsatisticsWaterAbsorp (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/satisticsWaterAbsorp`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第一个小图表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getinjectAssessTest (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/injectAssessTest`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第二个小图表 ----  end
/**
 * @params {} params
 * @returns
 */
export function gethierarchicalProvisioning (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/hierarchicalProvisioning`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 吸水能力预测查看页第三个小图表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getquarterlyDaily (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/quarterlyDaily`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 配注方案分析与评估列表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getinjPlanAnalyzeAssessment (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/injPlanAnalyzeAssessment`,
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

// 配注方案分析与评估列表-->可行性评估-->处理 ----  end
/**
 * @params {} params
 * @returns
 */
export function getabsorpPredict (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/getHandleList`,
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

// 配注方案分析与评估列表-->评估结果统计查询 ----  end
/**
 * @params {} params
 * @returns
 */
export function getanalyse (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/submitAnalyesTest`,
        method: "post",
        params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 配注方案分析与评估列表-->查看页评估列表 ----  end
/**
 * @params {} params
 * @returns
 */
export function getassessmentList (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/wellDetail`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-工艺可行性-注水工艺信息----  end
/**
 * @params {} params
 * @returns
 */
export function getseparateType (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/compProbability/separateType`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-工艺可行性-流量计测量范围信息----  end
/**
 * @params {} params
 * @returns
 */
export function getflowParameter (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/compProbability/flowParameter`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-工艺可行性-超范围层段图表信息----  end
/**
 * @params {} params
 * @returns
 */
export function getcompMaxInjDaily (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/compProbability/compMaxInjDaily`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-管柱可行性----  end
/**
 * @params {} params
 * @returns
 */
export function getcompProbility (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/compProbility`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-地层可行性----  end
/**
 * @params {} params
 * @returns
 */
export function getlayerProbability (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/layerProbability`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-地面可行性----  end
/**
 * @params {} params
 * @returns
 */
export function getequipmentProbability (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/equipmentProbability`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-获取措施下拉选信息----  end
/**
 * @params {} params
 * @returns
 */
export function getSuggestInfo () {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/getSuggestInfo`,
        method: "get",
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-处理-提交----  end
/**
 * @params {} params
 * @returns
 */
export function getupdateSuggestInfo (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/updateSuggestInfo`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.code == 0) {
            return true
        } else {
            return false;
        }
    });
}

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-分析-试算列表（分析页第一个列表）----  end
/**
 * @params {} params
 * @returns
 */
export function gettrialCalc (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/trialCalc`,
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

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-分析-试算结果----  end
/**
 * @params {} params
 * @returns
 */
export function gettrialResult (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/trialResult`,
        method: "post",
        data: params
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 配注方案分析与评估列表-->查看页-->单井配注方案评估详情-分析-试算列表下拉选----  end
/**
 * @params {} params
 * @returns
 */
export function getSeparateTypeInfo () {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/getSeparateTypeInfo`,
        method: "get",
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 参数设置-注水井措施建议查询----  end
/**
 * @params {} params
 * @returns
 */
export function getparameterSetting () {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/parameterSetting`,
        method: "get",
    }).then((res) => {
        if (res.data) {
            return res.data;
        } else {
            return [];
        }
    });
}

// 可行性评估----  end
/**
 * @params {} params
 * @returns
 */
 export function getstartZcyEvaluate (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/startZcyEvaluate`,
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

// 参数设置-注水井措施建议设置-新增+修改----  end
/**
 * @params {} params
 * @returns
 */
export function getupdateParameterSetting (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/updateParameterSetting`,
        method: "get",
        params
    }).then((res) => {
       return res
    });
}

// 参数设置-注水井措施建议设置-删除----  end
/**
 * @params {} params
 * @returns
 */
export function getdeleteParameterSetting (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/deleteParameterSetting`,
        method: "get",
        params
    }).then((res) => {
        if (res.code == 0) {
            return true;
        } else {
            return false;
        }
    });
}

/**
 * 配注方案分析预评估-参数设置-工艺单层最大测试流量设置
 * @param {*} params 
 * @returns 
 */
export function grtSelectCraftMonolayer () {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/maxCraftMonolayerFlowRate/selectCraftMonolayer`,
        method: "get",
    }).then((res) => {
        return res.data
    });
}

// 参数设置-工艺单层最大测试流量设置-删除----  end
/**
 * @params {} params
 * @returns
 */
export function getdeleteCraftMonolayer (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/maxCraftMonolayerFlowRate/deleteCraftMonolayer`,
        method: "get",
        params
    }).then((res) => {
        if (res.code == 0) {
            return true;
        } else {
            return false;
        }
    });
}

// 参数设置-工艺单层最大测试流量设置-修改+新增----  end
/**
 * @params {} params
 * @returns
 */
export function getupdateCraftMonolayer (params) {
    return request({
        url: `${baseUrl}/injectAssessAnalyse/maxCraftMonolayerFlowRate/updateCraftMonolayer`,
        method: "get",
        params
    }).then((res) => {
        if (res.code == 0) {
            return true;
        } else {
            return false;
        }
    });
}



// ----------  算法接口

  /**
   * 单井配注方案评估详情-分析-开始注水可行性评估（全部可查井）
   * @param {*} params 
   * @returns 
   */
   export function postStartZcyEvaluate() {
    return request({
      url: `${baseUrl}/injectAssessAnalyse/startZcyEvaluate`,
      method: "post",
    }).then((res) => {
        if(res.data.code == 0 && res.data) return res.data
    });
  }


  /**
   * 单井配注方案评估详情-分析-试算参数初始值（获取井/层段的日度数据for注水方案评估算法）
   * @param {wellId, yearmonth} params 
   * @returns 
   */
  export function getInjEvaluationLayerData(params) {
    return request({
      url: `${baseUrl}/injectAssessAnalyse/injEvaluationLayerDataDtosParamByWellId`,
      method: "get",
      params
    }).then((res) => {
        if(res.code == 0 && res.data) return res.data
    });
  }



    /**
   * 单井配注方案评估详情-分析-试算参数初始值（获取井/层段的日度数据for注水方案评估算法）
   * @param {wellId, yearmonth} params 
   * @returns 
   */
     export function getWellStringComp(params) {
      return request({
        url: `${baseUrl}/injectAssessAnalyse/wellStringCompDtoListParamByWellId`,
        method: "get",
        params
      }).then((res) => {

          if(res.data.code == 0 && res.data) return res.data
      });
    }
  


    /**
   * 单井配注方案评估详情-分析-分析按钮（单井）
   * @param {wellId, yearmonth, injEvaluationLayerDataDtosParam[], wellStringCompDtoListParam[]} params 
   * @returns 
   */
       export function getStartZcyEvaluate(params) {
        return request({
          url: `${baseUrl}/injectAssessAnalyse/startZcyEvaluateByWellIdAndParams`,
          method: "post",
          data: params
        }).then((res) => {
            if(res.code == 0 && res.data) return res.data
        });
      }
    
   /**
   * 注采管理-注水管理-注入评估分析-查看-第一个图表的下拉
   * @param {wellId, yearmonth} params 
   * @returns 
   */
     export function getLayerListByWellId(params) {
        return request({
          url: `${baseUrl}/injectAssessAnalyse/layerListByWellId`,
          method: "get",
          params
        }).then((res) => {
            return res.data
        });
      }

   /**
   * 注采管理-注水管理-日度运行监控-模型运算
   * @param {date} params 
   * @returns 
   */
     export function startWarningEvaluateAllByDate(params) {
        return request({
          url: `${baseUrl}/injectAssessAnalyse/startWarningEvaluateAllByDate`,
          method: "get",
          params,
          timeout: 1000 * 60 * 5
        }).then((res) => {
            return res
        });
      }

      /**
       * 吸水能力预测总览-跑数据-预测吸水指数
       * @param {*} params 
       * @returns 
       */
      export function absorbWaterIndexForecastWithParam (params) {
        return request({
            url: `${baseUrl}/zhuCaiAlgorithm/absorbWaterIndexForecastWithParam`,
            method: "GET",
            params,
            timeout: 1000 * 60 * 5
        }).then((res) => {
            return res
        });
    }

    /**
     * 吸水能力预测总览-跑数据-月均视吸水指数
     * @param {*} params 
     * @returns 
     */
    export function absorbWaterIndexBanForecastWithParam (params) {
      return request({
          url: `${baseUrl}/zhuCaiAlgorithm/absorbWaterIndexBanForecastWithParam`,
          method: "GET",
          params,
          timeout: 1000 * 60 * 5
      }).then((res) => {
          return res
      });
  }