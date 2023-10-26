/*
 * @Description: 模型配置
 * @Date: 2021-01-25 10:23:58
 */
import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryTableData(query){
    return Axios({
        url: '/modelManageDev/model/page',
        method: 'get',
        params:query
    });
}
export function saveOrUpdateModel(data){
    return Axios({
        url: '/modelManageDev/model/saveOrUpdate',
        method: 'post',
        data:data
    });
}

//模型类型
export function modelTypeOption(type) {
    return Axios({
        url: `/modelManageDev/cog/getConfigByType?type=${type}`,
        method: 'get'
    })
}
//模型类型
export function modelTypeOptionTree(type) {
    return Axios({
        url: `/modelManageDev/cog/getParentConfigByType?type=${type}`,
        method: 'get'
    })
}
//根据模型Id查询模型
export function queryModelById(modelId){
    return Axios({
        url:  `/modelManageDev/model/info?modelId=${modelId}`,
        method: 'get',
    });
}

//关联实例
export function exampleVisible(data) {
    return Axios({
        url: `/modelManageDev/model/modelJoinExample`,
        method: 'post',
        data: data
    })
}
//关联实例详情
export function getModelJoin(modelId) {
    return Axios({
        url: `/modelManageDev/model/getModelJoin?modelId=${modelId}`,
        method: 'post'
    })
}
//驱动参数编码查询
export function  drivingParams(){
    return Axios({
        url: `/modelManageDev/iwellfljkcs/getJkcsByAll`,
        method: 'get'
    })
}
export function saveModelInterface(data) {
    return Axios({
        url:'/modelManageDev/model/saveModelInterface',
        method:'post',
        data:data
    })
}
export function getModelInterfaceByModelId(modelId){
    return Axios({
        url:`/modelManageDev/model/getModelInterfaceByModelId?modelId=${modelId}`,
        method:'get',
    })
}
export function getAll(){
    return Axios({
        url:'/modelManageDev/model/getAll',
        method:'get',
    })
}
export function getAllModelExpressionByModelId(modelId) {
    return Axios({
        url:`/modelManageDev/decisionExpression/getAllByModelId?modelId=${modelId}`,
        method: 'get'
    })
}
export function updateExpressionFormula(query){
    return Axios({
        url: '/modelManageDev/decisionExpression/updateExpressionFormula',
        method: 'get',
        params:query
    });
}


export function getDecisionConfig(query){
    return Axios({
        url: '/modelManageDev/decisionConfig/getDecisionConfig',
        method: 'get',
        params:query
    });
}

export function getDecisionDetail(query){
    return Axios({
        url: '/modelManageDev/decisionConfig/getDecisionDetail',
        method: 'get',
        params:query
    });
}
export function saveDecision(data){
    return Axios({
        url: '/modelManageDev/decisionExpression/save',
        method: 'post',
        data:data
    });
}

export  function getEvalConfigByModelId(query) {
    return Axios({
        url: '/modelManageDev/evaluationItemProfile/getByModelId',
        method: 'get',
        params:query
    });

}

export  function getEvalResultByEvalTypeId(query) {
    return Axios({
        url: '/modelManageDev/evaluationConclusionCode/getByEvalTypeId',
        method: 'get',
        params:query
    });

}
export  function saveDecisionConfig(data) {
    return Axios({
        url: '/modelManageDev/decisionConfig/save',
        method: 'post',
        data:data
    });

}

//编辑决策树
export  function editDecisionConfig(data) {
    return Axios({
        url: '/modelManageDev/decisionConfig/edit',
        method: 'post',
        data:data
    });

}
//删除决策树
export  function deleteByDecisionId(query) {
    return Axios({
        url: '/modelManageDev/decisionExpression/deleteByDecisionId',
        method: 'get',
        params:query
    });

}


//删除决策树单个公式
export  function deleteExpressionByDecisionId(query) {
    return Axios({
        url: '/modelManageDev/decisionConfig/delete',
        method: 'get',
        params:query
    });

}

export function getDecisionConfigAll(query){
    return Axios({
        url: '/modelManageDev/decisionConfig/getAll',
        method: 'get',
        params:query
    });
}

export function getOgfTree() {
    return Axios({
        url: '/modelManageDev/model/getOgfTree',
        method: 'get',
    });

}
