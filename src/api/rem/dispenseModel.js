import Axios from './dispenseRequest';
//张悦
//下载
//对于axios进行二次封装
// const pathWrite ='http://localhost:8005'
// const pathWrite ='http://192.168.222.100:8005';
// const pathWrite = 'http://10.86.55.41:8005'; //CZY
// const pathWrite = 'https://dl-front-qhd32-6znyt.tjdevapp.cnooc/dastudio/'; //测试环境地址
//const pathWrite = 'https://dl-front-qhd32-6znyt.tj.app.cnooc/dastudio/'; //生产地址
const pathWrite = 'https://intelligentdispensing.tjioms-tpro.tjltd.cnooc/'; //后端接口地址-迁移系统-开发环境
// const pathWrite = 'https://intelligentdispensing.tjioms-dev.tjltd.cnooc/'
// const pathWrite = 'https://intelligentdispensing.tjioms-test.tjltd.cnooc/'; //新环境地址(迁移系统)测试环境
// const pathWrite = 'https://dastudio-qhd32-6znyt.tj.app.cnooc/'
// /seaoil/modelFileAttr/getModelfList
export function GetModelfList(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelFileAttr/getModelfList?modelBasicId=${param.modelBasicId}`,
        method: "get",
    });
}
// /seaoil/modelFileAttr/getModelfList
export function GetmodelExec(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelRun/modelExec?modelBasicId=${param.modelBasicId}&modelFileAttributeId=${param.modelFileAttributeId}`,
        method: "get",
    });
}

// /seaoil/wellSchedule/getSchPicTstepData
export function GetSchPicTstepData(param) {
    return Axios({
        url: pathWrite + `/seaoil/wellSchedule/getSchPicTstepData?modelBasicId=${param.modelBasicId}`,
        method: "get",
    });
}
export function GetSchedule(param) {
    return Axios({
        url: pathWrite + `/seaoil/wellSchedule/getForecastSchedule?modelBasicId=${param.modelBasicId}&startDate=${param.startDate}&endDate=${param.endDate}`,
        method: "get",
    });
}
//seaoil/wellSchedule/getFactSchedule 实际制度
export function GetFactSchedule(param) {
    return Axios({
        url: pathWrite + `/seaoil/wellSchedule/getFactSchedule?modelBasicId=${param.modelBasicId}&startDate=${param.startDate}&endDate=${param.endDate}&pageSize=${param.pageSize}&pn=${param.pn}&wellTypeFlag=${param.wellTypeFlag}`,
        method: "get",
    });
}

//下载实际制度文件/seaoil/wellSchedule/downloadFactSchedule
export function DownloadFile(param) {
    return Axios({
        url: pathWrite + `/seaoil/wellSchedule/downloadFactSchedule?modelBasicId=${param.modelBasicId}&startDate=${param.startDate}&endDate=${param.endDate}`,
        method: "post",
        responseType: "blob",
        data: param
    })
}
//上传参数
export function GetupdateSchedule(wellData) {
    return Axios({
        url: pathWrite + '/seaoil/wellSchedule/updateSchedule',
        method: "post",
        data: wellData
    });
}
//模型运行
export function GetModelExec(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelRun/modelExec?modelBasicId=${param.modelBasicId}`,
        method: "get",
    });
}

//获取小层  /seaoil/modelLayer/getModelLayerList
export function GetModelLayerList(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelLayer/getModelLayerList?modelBasicId=${param.modelBasicId}`,
        method: "get",

    });
}
//获取小层图片  /seaoil/modelImage/getModelImageList
export function GetModelImageList(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelImage/getModelImageList?modelBasicId=${param.modelBasicId}&modelLayerId=${param.modelLayerId}&isRealData=${param.isRealData}`,
        method: "get",

    });
}

//孔雪
//区块折线图数据
export function GetBlockSeries(modelBasicId) {
    return Axios({
        url: pathWrite + `/seaoil/modelBlock/getBlockSeries?modelBasicId=${modelBasicId}`,
        method: 'get'
    })
}

//区块折线图对应的表格数据
export function GetBlockListByModelBasicId(modelBasicId) {
    return Axios({
        url: pathWrite + `/seaoil/modelBlock/getBlockListByModelBasicId?modelBasicId=${modelBasicId}`,
        method: 'get'
    })
}

//下拉框
export function GetModelWellNoList(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelWell/getModelWellNoList?modelBasicId=${param.modelBasicId}&modelWellType=${param.modelWellType}`,
        method: 'get'
    })
}


//单井折线图
export function GetWellSeries(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelWell/getWellSeries?modelBasicId=${param.modelBasicId}&modelWellType=${param.modelWellType}&modelWellNo=${param.modelWellNo}`,
        method: 'get'
    })
}

//单井表格
export function GetWellListByModelBasicId(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelWell/getWellListByModelBasicId?modelBasicId=${param.modelBasicId}&modelWellType=${param.modelWellType}&modelWellNo=${param.modelWellNo}`,
        method: 'get'
    })
}
// 通过方案ID查询一个方案信息
export function GetCaseById(param) {
    return Axios({
        url: pathWrite + `/seaoil/modelBasic/getModelBasicById/${param.modelBasicId}`,
        method: "get",
    });
}
//获得单井opt
export function GetOilWellOpt(modelBasicId) {
    return Axios({
        url: pathWrite + `/seaoil/modelWell/getOilWellOpt?modelBasicId=${modelBasicId}`,
        method: "get",
    });
}