import Axios from './dispenseRequest';
// const pathWrite ='http://localhost:8005'
//const pathWrite ='http://192.168.222.100:8005'
// const pathWrite = 'http://10.86.55.41:8005'; //CZY后端
// const pathWrite = 'https://dl-front-qhd32-6znyt.tjdevapp.cnooc/dastudio/'; //测试环境地址
//const pathWrite = 'https://dl-front-qhd32-6znyt.tj.app.cnooc/dastudio/'; //生产地址
const pathWrite = 'https://intelligentdispensing.tjioms-tpro.tjltd.cnooc/'; //后端接口地址-迁移系统-开发环境
// const pathWrite = 'https://intelligentdispensing.tjioms-dev.tjltd.cnooc/'
// const pathWrite = 'https://intelligentdispensing.tjioms-test.tjltd.cnooc/'; //新环境地址(迁移系统)测试环境
// const pathWrite = 'https://dastudio-qhd32-6znyt.tj.app.cnooc/'
// 获取全部油田信息
export function GetOgfList() {
    return Axios({
        url: pathWrite + '/seaoil/modelBasic/getOgfList',
        method: "get",
    });
}

// 通过油田Id获取区块列表
export function GetBlockListByOgfId(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/getBlockListByOgfId?ogfId=${param.ogfId}`,
        method: "get"
    });
}
// 条件查询方案列表
export function GetModelBasicListByCondition(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/getModelBasicListByCondition?pn=${param.pn}&pageSize=${param.pageSize}&ogfId=${param.ogfId}&blockId=${param.blockId}&startDate=${param.startDate}&endDate=${param.endDate}`,
        method: "get"
    });
}
// 判断方案名是否唯一
export function JudgeModelBasicNameUnique(modelName) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/judgeModelBasicNameUnique?modelName=${modelName}`,
        method: "get",
    });
}
// 获取表单中油田区块二级级联
export function GetOgfBlockCascader() {
    return Axios({
        url: pathWrite + '/seaoil/modelBasic/getOgfBlockCascader',
        method: "get",
    });
}
//  插入一条方案数据
export function GddModelBasic(caseVo) {
    return Axios({
        url: pathWrite + '/seaoil/modelBasic/addModelBasic',
        method: "post",
        data: caseVo
    });
}
// 通过方案ID删除一个方案
export function DeleteModelBasicById(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/deleteModelBasicById/${param.modelBasicId}`,
        method: "delete",
    });
}

// 通过方案ID查询一个方案信息
export function GetModelBasicById(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/getModelBasicById/${param.modelBasicId}`,
        method: "get",
    });
}
//得到最新方案信息
export function GetModelBasicByMaxModelSort() {
    return Axios({
        url: pathWrite + '/seaoil/modelBasic/getModelBasicByMaxModelSort',
        method: "get",
    });
}

//上传文件
export function UploadMultipartFile(formData) {
    return Axios({
        url: pathWrite + '/seaoil/modelFileAttr/uploadMultipartFile',
        method: "post",
        contentType: 'multipart/form-data',
        data: formData
    });
}
//得到已上传文件
export function GetModelFileAttrListByModelBasicId(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/getModelFileAttrListByModelBasicId?modelBasicId=${param.modelBasicId}&dataFlag=${param.dataFlag}`,
        method: "get",
    })
}
//通过caseId和fileType获取文件列表
export function GetModelFileAttrListByCondition(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/getModelFileAttrListByCondition?modelBasicId=${param.modelBasicId}&fileType=${param.fileType}`,
        method: "get",
    })
}
//通过fileAddressId删除文件
export function DeleteModelFileAttrById(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/deleteModelFileAttrById/${param.modelFileAttributeId}`,
        method: "delete"
    });
}
//解析文件
export function ParseFiles(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/parseFiles?modelBasicId=${param.modelBasicId}&submitFlag=${param.submitFlag}`,
        method: "get",
    })
}

//得到调控参数文件数据
export function GetRegulationList(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/getRegulationList?modelBasicId=${param.modelBasicId}`,
        method: 'get'
    })
}