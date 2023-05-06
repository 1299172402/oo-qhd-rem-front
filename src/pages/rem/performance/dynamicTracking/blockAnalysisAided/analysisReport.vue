<!-- 区块动态分析报告 -->
<template>
    <div class="app-container">
        <headerSearch style="height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin-left: 10px;">
                    <span>油田：</span>
                    <el-select v-model="selectOilField" style="width: 180px" filterable clearable disabled>
                        <el-option v-for="item in fieldsData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled"></el-option>
                    </el-select>
                </div>
                <div style="margin-left: 10px;">
                    <span>区块：</span>
                    <el-select v-model="selectBlock" style="width: 180px" filterable clearable>
                        <el-option v-for="item in blocks" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                    </el-select>
                </div>
                <div style="margin-left: 10px;">
                    <span>日期：</span>
                    <el-date-picker v-model="rq" type="date" value-format="yyyy-MM-dd" placeholder="年-月-日"></el-date-picker>
                </div>
                <div style="margin-left: 10px;">
                    <el-button icon="el-icon-search" style="margin-left: 20px; width: 90px" type="primary" @click="searchThing">搜索</el-button>
                </div>
                <el-button type="primary" style="margin-left:auto;" @click="">切换版式</el-button>
            </div>
        </headerSearch>
        <pagePanelNew style="height: calc(100% - 100px);" class="g-w100">
            <div style="height:100%;padding-bottom:8px;overflow-y: scroll;">
                <div style="margin-left:8px;margin-right:20px;">
                    <pagePanel headerTitle="主要开发矛盾洞察" style="margin-top:0;min-height:500px;">
                        <el-row :gutter="30" style="text-align: center;height:calc(100% - 55px);">
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">开采现状(地层压力)分析</el-button>
                                <el-row>
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{changeFx(val,'indexChangeTrendList')})">
                                        <el-radio-button v-for="(item,index) in indexChangeTrendList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">开采现状(注水受效)分析</el-button>
                                <el-row style="width: 100%;">
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{changeFx(val,'stabilityFoundationAnalysisList')})">
                                        <el-radio-button v-for="(item,index) in stabilityFoundationAnalysisList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">注采平衡分析</el-button>
                                <el-row>
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{changeFx(val,'injectionProductionBalanceAnalysisList')})">
                                        <el-radio-button v-for="(item,index) in injectionProductionBalanceAnalysisList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                            <el-col :span="6" style="height: 100%">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">采出状况分析</el-button>
                                <el-row style="height: 60%">
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{changeFx(val,'recoveryAnalysisList')})">
                                        <el-radio-button v-for="(item,index) in recoveryAnalysisList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <table class="condationRow" style="float: right">
                                    <tr>
                                        <td style="padding-right:10px">图例：</td>
                                        <td class="checkBtn">选中</td>
                                        <td class="about">相关</td>
                                        <td class="noCheckBtn">未选中</td>
                                    </tr>
                                </table>
                            </el-col>
                        </el-row>
                    </pagePanel>
                </div>
                <div style="margin-left:8px;margin-right:20px;">
                    <pagePanelNew headerTitle="" style="height:398px;">
                        <el-row style="height: 100%;">
                            <el-col :span="12">
                                <div>
                                    <H5Chart ref="H5Chart" height="350px" :url="url" width="100%" @load="frameLoad"></H5Chart>
                                </div>
                            </el-col>
                            <el-col :span="11" style="margin-left:10px;height: 100%;">
                                <el-col :span="20" style="height: 100%;">
                                    <div style="width:100%;height: 15%;overflow: auto;">
                                        <p>{{tagMessage}}</p>
                                    </div>
                                    <span v-show="myList.length>0" style="font-size: 14px;margin-top: 20px;"><b>相关内容:</b></span>
                                    <div style="width: 100%;height: 74%;overflow: auto; margin-top: 10px;">
                                        <div v-for="(item,index) in myList" :key="index" style="margin-top: 4px;">{{item.well}}</div>
                                    </div>
                                </el-col>
                                <el-col :span="4" style="margin-top: 10px">
                                    <span style="color: #00d6ea;font-size: 14px;float: right;color: #00d6ea;cursor: pointer;" @click="switchToAnaylsis">
                                        区块分析
                                    </span>
                                </el-col>
                            </el-col>
                        </el-row>
                    </pagePanelNew>
                </div>
            </div>
        </pagePanelNew>
    </div>
</template>

<script>
    import H5Chart from "@/components/tools/H5Chart/index.vue";
    import { outputStatusAnalysis, areaDiagram, stableBaseAnalysis, proInjectionBalanceAnalysis, proStatusAnalysis} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import { fetchFields,fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    export default {
        components: {H5Chart},
        data() {
            return {
                //油田
                fieldsData: [{oilFieldId: ""}],
                selectOilField: "",
                //区块
                blocks: [],
                selectBlock: "",
                //日期
                rq: "",
                //是否加载完成
                loadFinish: false,
                url: '\/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
                layerData: null,//图层组件数据
                //开采现状(地层压力)分析
                indexChangeTrendList: [],
                //开采现状(注水受效)分析
                stabilityFoundationAnalysisList: [],
                //注采平衡分析
                injectionProductionBalanceAnalysisList: [],
                //采出状况分析
                recoveryAnalysisList: [],
                //相关井组
                wellList: [],
                tableData: [],
                //分析信息
                tagMessage: '',
                //展示列表
                myList: [],
                
                //开采现状分析
                indexChangeTrend: "",
                indexChangeTrendName: "",
                //稳产基础分析
                stabilityFoundationAnalysis: [],
                //注采平衡
                injectionProductionBalanceAnalysis: "",
                //采出状况分析
                recoveryAnalysis: "",
            };
        },
        watch: {
            //监听选择油田 油田改变 区块数组进行改变
            selectOilField(val) {
                this.blocks = [];
                this.selectBlock = ""
                //查询区块信息
                this.getFieldsData(val);
            }
        },
        mounted() {
            /*this.getfetchOilFields1();//获取油田
            this.getProStatusAnalysis();//开采状况分析
            this.outputStatusAnalysis();//采出状况分析
            this.getStableBaseAnalysis();//稳产基础分析
            this.getProInjectionBalanceAnalysis();//注采平衡分析
            this.clickAnalysis();//获取图层组件（接入数据后启用）*/
            this.initData();
        },
        created() {
            //初始化时间
            /* this.rq = new Date().addDays(-1).format('yyyy-MM-dd');*/
            this.rq = new Date().addDays(-1).format('yyyy-MM-dd');
        },
        methods: {
            //测试
            test(item) {
                console.log(item, '---')
            },
            frameLoad() {
                this.loadFinish = true;
                if (this.layerData) {
                    this.sjcl(this.layerData)
                }
            },
            getfetchOilFields1() { //油田
                fetchOilFields().then((data) => {
                    if (data != null) {
                        this.fieldsData = data.data.data.oilFields;
                        this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F'; //hwh xg 默认初始化qhd326  //this.fieldsData[0].oilFieldId;
                        this.getFieldsData(this.selectOilField);
                    }
                });
            },
            //获得区块信息
            getFieldsData(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId
                };
                fetchFields(request).then((res) => {
                    if (res.data.data.fields.length != 0) { //获得区块信息
                        this.blocks = res.data.data.fields;
                        //默认选中第一个区块信息
                        this.selectBlock = this.blocks[0].fieldId;
                    }
                });

            },
            //查询
            searchThing() {
                this.indexChangeTrend = '';
                this.selCode = '';
                this.getProStatusAnalysis()
                this.getStableBaseAnalysis()
                this.getProInjectionBalanceAnalysis()
                this.outputStatusAnalysis()
                this.clickAnalysis();
            },
            getProStatusAnalysis() { //0304-开采状况分析（模型计算）
                //选中油田值
                let oilFieldId = this.selectOilField;
                //区块
                let fieldId = this.selectBlock;
                //当前日期
                let currentDate = this.rq;
                let request = {
                    evalTopic: "",
                    evalTypeId: "",
                    fieldId: fieldId, //区块
                    fileName: "",
                    oilFieldId: oilFieldId, //油田
                    path: "",
                    seasonCode: "",
                    yearMonth: currentDate,
                };
                proStatusAnalysis(request).then((data) => {
                    if (data.data.data != null) {
                        this.indexChangeTrendList = data.data.data.indicatorAnalysisDetailInfos;
                    }
                });
            },
            getStableBaseAnalysis() { //稳产基础分析
                //选中油田值
                let oilFieldId = this.selectOilField;
                //选中区块
                let fieldId = this.selectBlock;
                //当前日期
                let currentDate = this.rq;
                let request = {
                    evalTopic: "",
                    evalTypeId: "",
                    fieldId: fieldId, //区块
                    fileName: "",
                    oilFieldId: oilFieldId, //油田
                    path: "",
                    seasonCode: "",
                    yearMonth: currentDate,
                };
                stableBaseAnalysis(request).then((data) => {
                    if (data.data.data != null) {
                        this.stabilityFoundationAnalysisList = data.data.data.indicatorAnalysisDetailInfos;
                        console.log(data.data.data)
                    }
                });
            },
            getProInjectionBalanceAnalysis() { //注采平衡分析
                //选中油田值
                let oilFieldId = this.selectOilField;
                //选中区块
                let fieldId = this.selectBlock;
                //当前日期
                let currentDate = this.rq;
                let request = {
                    evalTopic: "",
                    evalTypeId: "",
                    fieldId: fieldId, //区块
                    fileName: "",
                    oilFieldId: oilFieldId, //油田
                    path: "",
                    seasonCode: "",
                    yearMonth: currentDate,
                };
                proInjectionBalanceAnalysis(request).then((data) => {
                    if (data.data.data != null) {
                        this.injectionProductionBalanceAnalysisList = data.data.data.indicatorAnalysisDetailInfos;
                    }

                });
            },
            outputStatusAnalysis() { //0304-采出状况分析（模型计算）
                //选中油田值
                let oilFieldId = this.selectOilField;
                //选中区块
                let fieldId = this.selectBlock;
                //当前日期
                let currentDate = this.rq;
                let request = {
                    evalTopic: "",
                    evalTypeId: "",
                    fieldId: fieldId, //区块
                    fileName: "",
                    oilFieldId: oilFieldId, //油田
                    path: "",
                    seasonCode: "",
                    yearMonth: currentDate,
                };
                outputStatusAnalysis(request).then((data) => {
                    if (data.data.data != null) {
                        this.recoveryAnalysisList = data.data.data.indicatorAnalysisDetailInfos;
                    }
                });
            },
            changeFx(val, tag) {
                let myData = []; //我的数据
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                this.selCode = val; //选中项目
                this.selTag = tag; //选中数据集
                if (val == undefined || val == "") {
                    return false; //无效参数
                }
                //获得选中指标名称 hwh
                let indexName = '';
                let indexCode = '';
                //进行运算
                //1、获取选中井集合
                // console.log("logInfo:::",eval("this."+tag));
                if (eval("this." + tag)) {
                    for (let i = 0; i < eval("this." + tag).length; i++) {
                        let tData = eval("this." + tag)[i];
                        if (val == tData.code) {
                            if (tData.wells == undefined || tData.wells == "" || tData.wells == "null") { //无数据
                                myData = []; //没有数据
                                eval("this." + tag)[i].value = 0; //井数
                                myWellCount[tData.code] = 0; //计数器
                                //置空展示信息
                                this.tagMessage = '';
                                this.myList = [];
                            } else { //有数据
                                let wellList = tData.wells.split(","); //我的井号串（逗号分割）
                                eval("this." + tag)[i].value = wellList.length; //井数
                                myWellCount[tData.code] = wellList.length; //计数器
                                for (let j = 0; j < wellList.length; j++) {
                                    myData[j] = {
                                        wellId: wellList[j]
                                    }; //初始容器
                                }
                                this.wellList = wellList;

                                this.tagMessage = tData.msg;
                                this.myList = tData.basis ? tData.basis : [];
                            }
                            //获得其值 hwh
                            indexName = tData.name;
                            indexCode = tData.code;
                            break; //找到
                        }
                    }
                }
                for (let i = 0; i < myData.length; i++) {
                    let myWellId = myData[i].wellId; //井号
                    //indexChangeTrendList//开采现状分析，（单列）
                    for (let j = 0; j < this.indexChangeTrendList.length; j++) {
                        let t_data = this.indexChangeTrendList[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            //hwh修改
                            myData[i].indexChangeTrend = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['indexChangeTrendMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['indexChangeTrendMessage'] = messData ? messData.message ? messData.message : '' : '';
                                myData[i]['indexChangeTrend'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                //hwh修改
                                myData[i].indexChangeTrend = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['indexChangeTrendMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['indexChangeTrendMessage'] = messData ? messData.message ? messData.message : '' : '';
                                    myData[i]['indexChangeTrend'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //stabilityFoundationAnalysisList//稳产基础分析，（单列）
                    for (let j = 0; j < this.stabilityFoundationAnalysisList.length; j++) {
                        let t_data = this.stabilityFoundationAnalysisList[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            //hwh修改
                            myData[i].stabilityFoundationAnalysis = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['stabilityFoundationAnalysisMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['stabilityFoundationAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                myData[i]['stabilityFoundationAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                //hwh修改
                                myData[i].stabilityFoundationAnalysis = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['stabilityFoundationAnalysisMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['stabilityFoundationAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                    myData[i]['stabilityFoundationAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //injectionProductionBalanceAnalysisList//注采平衡分析，（单列）
                    for (let j = 0; j < this.injectionProductionBalanceAnalysisList.length; j++) {
                        let t_data = this.injectionProductionBalanceAnalysisList[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            //hwh修改
                            myData[i].injectionProductionBalanceAnalysis = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['injectionProductionBalanceAnalysisMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['injectionProductionBalanceAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                myData[i]['injectionProductionBalanceAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                //hwh修改
                                myData[i].injectionProductionBalanceAnalysis = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['injectionProductionBalanceAnalysisMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['injectionProductionBalanceAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                    myData[i]['injectionProductionBalanceAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //recoveryAnalysisList//采出状况分析，（单列）
                    for (let j = 0; j < this.recoveryAnalysisList.length; j++) {
                        let t_data = this.recoveryAnalysisList[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            //hwh修改
                            myData[i].recoveryAnalysis = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['recoveryAnalysisMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['recoveryAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                myData[i]['recoveryAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                //hwh修改
                                myData[i].recoveryAnalysis = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['recoveryAnalysisMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['recoveryAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                    myData[i]['recoveryAnalysis'] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                }
                //indexChangeTrendList//开采现状分析，（单列）
                for (let j = 0; j < this.indexChangeTrendList.length; j++) {
                    let t_data = this.indexChangeTrendList[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.indexChangeTrendList[j].value = t_count; //登记条数
                }
                //stabilityFoundationAnalysisList//稳产基础分析，（单列）
                for (let j = 0; j < this.stabilityFoundationAnalysisList.length; j++) {
                    let t_data = this.stabilityFoundationAnalysisList[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.stabilityFoundationAnalysisList[j].value = t_count; //登记条数
                }
                //injectionProductionBalanceAnalysisList//注采平衡分析，（单列）
                for (let j = 0; j < this.injectionProductionBalanceAnalysisList.length; j++) {
                    let t_data = this.injectionProductionBalanceAnalysisList[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.injectionProductionBalanceAnalysisList[j].value = t_count; //登记条数
                }
                //recoveryAnalysisList//采出状况分析，（单列）
                for (let j = 0; j < this.recoveryAnalysisList.length; j++) {
                    let t_data = this.recoveryAnalysisList[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.recoveryAnalysisList[j].value = t_count; //登记条数
                }
                this.tableData = myData;
                //没用
                this.indexChangeTrendCod = 2;
                this.clickAnalysis(indexCode, indexName);
            },
            clickAnalysis(code = '', evalTopic = '') {
                let yearMonth = this.rq;
                let oilFieldId = this.selectOilField;
                let fieldId = this.selectBlock;
                let evalTypeId = code
                console.log("evalTypeId----" + evalTypeId)
                let request = {
                    evalTopic: evalTopic,
                    evalTypeId: evalTypeId,
                    fieldId: fieldId, //区块
                    fileName: 'quyutu',
                    oilFieldId: oilFieldId, //油田
                    path: "field",
                    seasonCode: "",
                    yearMonth: yearMonth,
                };
                areaDiagram(request).then((data) => {
                    this.layerData = data.data
                    if (this.loadFinish) {
                        if (data.data.data.mutiLayerPicResponse) {
                            this.sjcl(data.data.data.mutiLayerPicResponse);
                        } else {
                            this.$refs.H5Chart.setSampleDate(null);
                        }

                    }
                });
            },
            //zwm写 hwh修改复用--等值线图
            sjcl(tc) {
                let obj = tc;
                let MinXMap = obj.x2;
                let MaxXMap = obj.x3;
                let MinYMap = obj.y2;
                let MaxYMap = obj.y3;
                //let PictureBase64 = obj.data;
                let IsShowPicture = true;
                let PicMinXMap = obj.x2;
                let PicMaxXMap = obj.x3;
                let PicMinYMap = obj.y2;
                let PicMaxYMap = obj.y3;
                let LayerName = "等值线图层"
                let LayerType = 8
                let Active = true
                let Display = true
                let LayerIndex = 8
                let data = {}
                let Layers = []
                data.MinXMap = MinXMap;
                data.MaxXMap = MaxXMap;
                data.MinYMap = MinYMap;
                data.MaxYMap = MaxYMap;
                data.PictureBase64 = "data:" + obj.layerPics[0].type + ";base64," + obj.layerPics[0].data;
                data.IsShowPicture = IsShowPicture;
                data.PicMinXMap = PicMinXMap;
                data.PicMaxXMap = PicMaxXMap;
                data.PicMinYMap = PicMinYMap;
                data.PicMaxYMap = PicMaxYMap;
                let Layers_cont = {}
                Layers_cont.LayerName = LayerName
                Layers_cont.LayerType = LayerType
                Layers_cont.Active = Active
                Layers_cont.Display = Display
                Layers_cont.LayerIndex = LayerIndex
                let Objects = []
                let areaLines = obj.areaLine ? obj.areaLine : [];
                for (let i = 0; i < areaLines.length; i++) {
                    let object = {
                        ObjType: 131,
                        Closed: false,
                        ShowDot: false,
                        Value: areaLines[i].isolineValue ? areaLines[i].isolineValue : '',
                        ViewPen: {
                            PenColorA: 255,
                            /*PenColorR: parseInt(areaLines[i].objects.fillColor.substr(1,3),16),
                            PenColorG:parseInt(areaLines[i].objects.fillColor.substr(3,5),16),
                            PenColorB: parseInt(areaLines[i].objects.fillColor.substr(5,7),16),*/
                            PenColorR: 0,
                            PenColorG: 255,
                            PenColorB: 0,
                            PenWidth: 6,
                            PenDashStyle: 0
                        },
                        circleRadius: 0,
                        ViewPenCircle: {
                            PenColorA: 0,
                            PenColorR: 255,
                            PenColorG: 255,
                            PenColorB: 255,
                            PenWidth: 0,
                            PenDashStyle: 0
                        },
                        ViewBrushCircle: {
                            BrushColorA: 0,
                            BrushColorR: 255,
                            BrushColorG: 0,
                            BrushColorB: 0,
                            FillStyle: 5
                        },
                        UseSign: true,
                    }
                    //let a = areaLines[i].points.length
                    object.Points = areaLines[i].points
                    Objects[i] = object
                }
                Layers_cont.Objects = Objects
                Layers[0] = Layers_cont;
                data.Layers = Layers
                this.$refs.H5Chart.setSampleDate(data);
            },
            /*sjcl(tc) {
                let  result = tc.data.mutiLayerPicResponse;
                let  rem = result;
                //区块分析模型跳转
                // this.$router.push({path: "/blockAnalysisAided"});
                let obj = tc.data.fieldAreaDiagram;
                let MinXMap = obj.x2;
                let MaxXMap = obj.x3;
                let MinYMap = obj.y2;
                let MaxYMap = obj.y3;
                let PictureBase64 = obj.data;
                let IsShowPicture = true;
                let PicMinXMap = obj.x2;
                let PicMaxXMap = obj.x3;
                let PicMinYMap = obj.y2;
                let PicMaxYMap = obj.y3;
                let LayerName = "等值线图层"
                let LayerType = 8
                let Active = true
                let Display = true
                let LayerIndex = 8
                let data = {}
                let Layers = []
                data.MinXMap = MinXMap;
                data.MaxXMap = MaxXMap;
                data.MinYMap = MinYMap;
                data.MaxYMap = MaxYMap;
                data.PictureBase64 = "data:image/png;base64," + PictureBase64;
                data.IsShowPicture = IsShowPicture;
                data.PicMinXMap = PicMinXMap;
                data.PicMaxXMap = PicMaxXMap;
                data.PicMinYMap = PicMinYMap;
                data.PicMaxYMap = PicMaxYMap;
                let Layers_cont = {}
                Layers_cont.LayerName = LayerName
                Layers_cont.LayerType = LayerType
                Layers_cont.Active = Active
                Layers_cont.Display = Display
                Layers_cont.LayerIndex = LayerIndex
                let Objects = []
                let areaLines = obj.areaLines
                for (let i = 0; i < areaLines.length; i++) {
                    let object = {
                        ObjType: 131,
                        Closed: false,
                        ShowDot: true,
                        ViewPen: {
                            PenColorA: 255,
                            PenColorR: 0,
                            PenColorG: 0,
                            PenColorB: 0,
                            PenWidth: 5,
                            PenDashStyle: 0
                        },
                        circleRadius: 5,
                        ViewPenCircle: {
                            PenColorA: 255,
                            PenColorR: 255,
                            PenColorG: 255,
                            PenColorB: 255,
                            PenWidth: 5,
                            PenDashStyle: 0
                        },
                        ViewBrushCircle: {
                            BrushColorA: 255,
                            BrushColorR: 255,
                            BrushColorG: 0,
                            BrushColorB: 0,
                            FillStyle: 0
                        },
                        UseSign: false,
                    }
                    //let a = areaLines[i].linePoints.length  点数量
                    object.Points = areaLines[i].linePoints
                    Objects[i] = object
                }
                Layers_cont.Objects = Objects
                Layers[0] = Layers_cont;
                data.Layers = Layers
                this.$refs.H5Chart.setSampleDate(data);
            },*/
            //区块模型配置页面跳转
            blockModel() {
                this.$router.push({
                    path: "blockAnalysisAided"
                });
            },
            async initData() {
                await fetchOilFields().then((data) => {
                    if (data != null) {
                        this.fieldsData = data.data.data.oilFields;
                        this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F'; //hwh xg 默认初始化qhd326  //this.fieldsData[0].oilFieldId;
                        this.getFieldsData(this.selectOilField);
                    }
                });
                let fieldsPara = {
                    oilFieldId: this.selectOilField
                }
                await fetchFields(fieldsPara).then((res) => {
                    if (res.data.data.fields.length != 0) { //获得区块信息
                        this.blocks = res.data.data.fields;
                        //默认选中第一个区块信息
                        this.selectBlock = this.blocks[0].fieldId;
                    }
                });
                this.getProStatusAnalysis();
                this.getStableBaseAnalysis();
                this.getProInjectionBalanceAnalysis();
                this.outputStatusAnalysis()
                this.clickAnalysis();


            },
            switchToAnaylsis() {
                this.$router.push({
                    name: 'blockAnalysisAided',
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .app-container{
        height:100%;
        .pageHeader{
            width:100%!important;
            height:32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom:20px;
        }
    }
    
    .condationRow {
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    .checkBtn {
        width: 100px;
        height: 30px;
        text-align: center;
        border-image: var(--primary-btn);
        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
        background-size: 100% 100% !important;
        color:#fff;
    }

    .about {
        width: 100px;
        height: 30px;
        text-align: center;
        background: rgb(2, 43, 117);
        color:#fff;
    }

    .noCheckBtn {
        width: 100px;
        height: 30px;
        text-align: center;
        background: rgba(143, 164, 204, 0.3);
    }
    
    //默认未选中
    ::v-deep .checkButton {
        margin-top: 5px;
        .el-radio-button__inner{
            width:100%;
            height:100%;
            border-radius:0;
            border:1px solid rgba(143, 164, 204, 0.3);
            background: rgba(143, 164, 204, 0.3)!important;
            &:hover{
                background: var(--primary-btn)!important;
            }
        }
    }
    //选中
    ::v-deep .el-radio-group {
        .is-active{
            .el-radio-button__inner{
                width:100%;
                height:100%;
                border-radius:0;
                border:1px solid rgba(143, 164, 204, 0.3);
                background: var(--primary-btn)!important;
                &:hover{
                    background: var(--primary-btn)!important;
                }
            }
        }
    }
    //相关
    ::v-deep .about1 {
        background: rgb(2, 43, 117);
        .el-radio-button__inner{
            color:#fff;
            background: transparent!important;
        }
    }
    
</style>
