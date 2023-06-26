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
                    <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                </div>
            </div>
        </headerSearch>
        
        <pagePanelNew style="height: calc(100% - 100px);" class="g-w100">
            <div class="btns" style="height:50px;;display: flex;padding-left:7px;">
                <el-button type="primary" @click="$router.push({path:'/modelConfiguration/modelconfig'})">模型配置</el-button>
                <el-button type="primary" @click="switchVersions">切换版式</el-button>
            </div>
            <!-- 旧版 -->
            <div class="old" style="height:calc(100% - 50px);padding-bottom:8px;overflow-y: scroll;" v-if="!isNewformat">
                <div style="margin-left:8px;margin-right:20px;">
                    <pagePanel headerTitle="主要开发矛盾洞察" style="margin-top:0;min-height:500px;">
                        <el-row :gutter="30" style="text-align: center;height:calc(100% - 55px);">
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:5px;">开采现状(地层压力)分析</el-button>
                                <!-- <el-row>
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{selRadioIterm(val,'indexChangeTrendList')})">
                                        <el-radio-button v-for="(item,index) in indexChangeTrendList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row> -->
                                
                                <el-row>
                                    <el-col v-for="(item,index) in indexChangeTrendList" :key="index" :span="24">
                                        <el-button class="z-button" style="height:34px!important;line-height: 8px;"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" @click.stop="selRadioIterm(item.code,'indexChangeTrendList')">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">开采现状(注水受效)分析</el-button>
                                <el-row style="width: 100%;">
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{selRadioIterm(val,'stabilityFoundationAnalysisList')})">
                                        <el-radio-button v-for="(item,index) in stabilityFoundationAnalysisList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">注采平衡分析</el-button>
                                <el-row>
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{selRadioIterm(val,'injectionProductionBalanceAnalysisList')})">
                                        <el-radio-button v-for="(item,index) in injectionProductionBalanceAnalysisList" :key="index" :label="item.code" :class="item.value>0?'checkButton about1':'checkButton'" style="width: 100%;">
                                            {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-row>
                            </el-col>
                            <el-col :span="6" style="height: 100%">
                                <el-button class="commonBtn" style="width:100%;cursor: inherit;">采出状况分析</el-button>
                                <el-row style="height: 60%">
                                    <el-radio-group v-model="indexChangeTrend" @change="((val)=>{selRadioIterm(val,'recoveryAnalysisList')})">
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
                                <H5Chart ref="H5Chart" height="350px" :url="url" width="100%"></H5Chart>
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
            <!-- 新版 -->
            <div class="new" style="height:calc(100% - 50px);padding-bottom:8px;overflow-y: scroll;" v-if="isNewformat">
                <div style="margin-left:8px;margin-right:7px;height:auto;">
                    <pagePanel headerTitle="主要开发矛盾洞察" style="margin-top:0;height:100%;">
                        <div class="z-content" style="height:calc(100% - 55px);">
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
                            <div class="z-content-n">
                                <div class="z-row">
                                    <div class="z_title">
                                        <img src="@/assets/rem/performance/z_sb.png" alt="">
                                        <span>开采现状（地层压力）分析</span>
                                    </div>
                                    <div class="z_schedule">
                                        <span class="sp1">正常：</span>
                                        <div class="z_proess">
                                            <span class="z_proess_sp1" :style="{width:indexChangeTrendNum.zczb+'%'}">
                                                <b style="cursor: pointer;" @click="indexChangeTrendSwitch=true">{{indexChangeTrendNum.zcnum}}</b>
                                            </span>
                                            <span class="z_proess_sp2"></span>
                                        </div>
                                        <span class="sp2">异常：<b style="cursor: pointer;" @click="indexChangeTrendSwitch=false">{{indexChangeTrendNum.ycnum}}</b></span>
                                    </div>
                                    <el-row :gutter="10">
                                        <el-col v-for="(item,index) in indexChangeTrendList" :key="index" :span="24">
                                            
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="!item.name.includes('正常')&&(item.value!=0||item.isShow)&&!indexChangeTrendSwitch"  @click.stop="selRadioIterm(item.code,'indexChangeTrendList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                            
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="item.name.includes('正常')&&indexChangeTrendSwitch" @click.stop="selRadioIterm(item.code,'indexChangeTrendList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                            
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="z-row">
                                    <div class="z_title">
                                        <img src="@/assets/rem/performance/z_sb.png" alt="">
                                        <span>开采现状（注水受效）分析</span>
                                    </div>
                                    <div class="z_schedule">
                                        <span class="sp1">正常：</span>
                                        <div class="z_proess">
                                            <span class="z_proess_sp1" :style="{width:stabilityFoundationAnalysisNum.zczb+'%'}">
                                                <b style="cursor: pointer;" @click="stabilityFoundationAnalysisSwitch=true">{{stabilityFoundationAnalysisNum.zcnum}}</b>
                                            </span>
                                            <span class="z_proess_sp2"></span>
                                        </div>
                                        <span class="sp2">异常：<b style="cursor: pointer;" @click="stabilityFoundationAnalysisSwitch=false">{{stabilityFoundationAnalysisNum.ycnum}}</b></span>
                                    </div>
                                    <el-row :gutter="10">
                                        <el-col v-for="(item,index) in stabilityFoundationAnalysisList" :key="index" :span="24">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="!item.name.includes('正常')&&(item.value!=0||item.isShow)&&!stabilityFoundationAnalysisSwitch"  @click.stop="selRadioIterm(item.code,'stabilityFoundationAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="item.name.includes('正常')&&stabilityFoundationAnalysisSwitch" @click.stop="selRadioIterm(item.code,'stabilityFoundationAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="z-row">
                                    <div class="z_title2">
                                        <img src="@/assets/rem/performance/z_sb.png" alt="">
                                        <span>注采平衡分析</span>
                                    </div>
                                    <div class="z_schedule">
                                        <span class="sp1">正常：</span>
                                        <div class="z_proess">
                                            <span class="z_proess_sp1" :style="{width:injectionProductionBalanceAnalysisNum.zczb+'%'}">
                                                <b style="cursor: pointer;" @click="injectionProductionBalanceAnalysisSwitch=true">{{injectionProductionBalanceAnalysisNum.zcnum}}</b>
                                            </span>
                                            <span class="z_proess_sp2"></span>
                                        </div>
                                        <span class="sp2">异常：<b style="cursor: pointer;" @click="injectionProductionBalanceAnalysisSwitch=false">{{injectionProductionBalanceAnalysisNum.ycnum}}</b></span>
                                    </div>
                                    <el-row :gutter="10">
                                        <el-col v-for="(item,index) in injectionProductionBalanceAnalysisList" :key="index" :span="24">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="!item.name.includes('正常')&&(item.value!=0||item.isShow)&&!injectionProductionBalanceAnalysisSwitch"  @click.stop="selRadioIterm(item.code,'injectionProductionBalanceAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="item.name.includes('正常')&&injectionProductionBalanceAnalysisSwitch" @click.stop="selRadioIterm(item.code,'injectionProductionBalanceAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="z-row">
                                    <div class="z_title2">
                                        <img src="@/assets/rem/performance/z_sb.png" alt="">
                                        <span>采出状况分析</span>
                                    </div>
                                    <div class="z_schedule">
                                        <span class="sp1">正常：</span>
                                        <div class="z_proess">
                                            <span class="z_proess_sp1" :style="{width:recoveryAnalysisNum.zczb+'%'}">
                                                <b style="cursor: pointer;" @click="recoveryAnalysisSwitch=true">{{recoveryAnalysisNum.zcnum}}</b>
                                            </span>
                                            <span class="z_proess_sp2"></span>
                                        </div>
                                        <span class="sp2">异常：<b style="cursor: pointer;" @click="recoveryAnalysisSwitch=false">{{recoveryAnalysisNum.ycnum}}</b></span>
                                    </div>
                                    <el-row :gutter="10">
                                        <el-col v-for="(item,index) in recoveryAnalysisList" :key="index" :span="24">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="!item.name.includes('正常')&&(item.value!=0||item.isShow)&&!recoveryAnalysisSwitch"  @click.stop="selRadioIterm(item.code,'recoveryAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==indexChangeTrend?'selectButton':'']" v-if="item.name.includes('正常')&&recoveryAnalysisSwitch" @click.stop="selRadioIterm(item.code,'recoveryAnalysisList')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </pagePanel>
                </div>
                <div style="margin-left:8px;margin-right:7px;height:498px;display: flex;">
                    <div style="flex:1;margin-right:10px;height:498px;">
                        <pagePanelNew headerTitle="" style="height:100%;">
                            <div style="height:100%;">
                                <div style="display: flex;justify-content: flex-end;margin-bottom:10px;">
                                    <el-button class="commonBtn" @click="switchToAnaylsis">区块分析</el-button>
                                </div>
                                <H5Chart2 ref="H5Chart2" height="calc(100% - 50px)" :url="url" width="100%"></H5Chart2>
                            </div>
                        </pagePanelNew>
                    </div>
                    <div style="width:664px;height:100%;">
                        <pagePanelNew headerTitle="" style="height:100%;">
                            <el-col :span="24" style="height: 100%;">
                                <div class="tips" v-show="myList.length>0">
                                    <img src="@/assets/rem/performance/zy.png" alt="">
                                    <p>{{tagMessage}}</p>
                                </div>
                                <div :class="[$store.state.setting.mode=='light'?'remark0':'remark']" v-show="myList.length>0">相关内容:</div>
                                <div style="width: 100%;max-height:340px;overflow: auto; margin-top: 15px;display: flex;flex-wrap: wrap;">
                                    <div v-for="(item,index) in myList" :key="index" :class="[$store.state.setting.mode=='light'?'z-well0':'z-well']" @click="getBorepipeTypeApi(item.well)">
                                        <span>{{item.well}}</span>
                                        <img src="@/assets/rem/performance/sjt0.png" alt="" v-if="$store.state.setting.mode=='light'">
                                        <img src="@/assets/rem/performance/sjt.png" alt="" v-else>
                                    </div>
                                </div>
                            </el-col>
                        </pagePanelNew>
                    </div>
                </div>
            </div>
        </pagePanelNew>
    
    </div>
</template>

<script>
    import H5Chart from "@/components/tools/H5Chart/index.vue";
    import H5Chart2 from "@/components/tools/H5Chart/index.vue";
    import { outputStatusAnalysis, areaDiagram, stableBaseAnalysis, proInjectionBalanceAnalysis, proStatusAnalysis} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import { fetchFields,fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { getBorepipeType } from "@/api/oilDeposit/ipm-03/basedata.js";
    export default {
        name:'blockAnalysisReport',
        components: {H5Chart,H5Chart2},
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
                //默认显示新版式
                isNewformat:true,
                url: '\/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
                layerData: null,//图层组件数据
                //开采现状(地层压力)分析
                indexChangeTrendList: [],
                indexChangeTrendNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                indexChangeTrendSwitch:false,
                //开采现状(注水受效)分析
                stabilityFoundationAnalysisList: [],
                stabilityFoundationAnalysisNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                stabilityFoundationAnalysisSwitch:false,
                //注采平衡分析
                injectionProductionBalanceAnalysisList: [],
                injectionProductionBalanceAnalysisNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                injectionProductionBalanceAnalysisSwitch:false,
                //采出状况分析
                recoveryAnalysisList: [],
                recoveryAnalysisNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                recoveryAnalysisSwitch:false,
                
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
        created() {
            //初始化时间
            this.rq = new Date().addDays(-1).format('yyyy-MM-dd');
            this.rq='2022-05-01';
        },
        mounted() {
            this.initData();
        },
        methods: {
            //重置
            resetting(){
                this.$nextTick(()=>{
                	Object.assign(this.$data, this.$options.data());
                	this.rq = new Date().addDays(-1).format('yyyy-MM-dd');
                	this.initData();
                })
            },
            //切换版式
            switchVersions(){
                this.isNewformat=!this.isNewformat;
                setTimeout(()=>{
                    if (this.layerData.data.mutiLayerPicResponse) {
                        if(!this.myList.length){
                            this.sjcl(this.layerData.data.mutiLayerPicResponse);
                        }else{
                            this.setProminentWell(this.layerData.data.mutiLayerPicResponse)
                        }
                    } else {
                        this.isNewformat?this.$refs.H5Chart2.setSampleDate(null):this.$refs.H5Chart.setSampleDate(null);
                    }
                })
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
                        let myData=data.data.data.indicatorAnalysisDetailInfos;
                        this.indexChangeTrendNum.allnum=0;
                        this.indexChangeTrendNum.zcnum=0;
                        this.indexChangeTrendNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            this.indexChangeTrendNum.allnum+=Number(el.value);
                            if(el.name.includes('正常')){
                                this.indexChangeTrendNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.indexChangeTrendNum.ycnum+=Number(el.value);
                            }
                        })
                        this.indexChangeTrendNum.zczb=this.indexChangeTrendNum.zcnum/this.indexChangeTrendNum.allnum * 100;
                        this.indexChangeTrendNum.yczb=this.indexChangeTrendNum.yczb/this.indexChangeTrendNum.allnum * 100;
                        console.log('this.indexChangeTrendNum',this.indexChangeTrendNum)
                        this.indexChangeTrendList = myData;
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
                        let myData=data.data.data.indicatorAnalysisDetailInfos;
                        this.stabilityFoundationAnalysisNum.allnum=0;
                        this.stabilityFoundationAnalysisNum.zcnum=0;
                        this.stabilityFoundationAnalysisNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            this.stabilityFoundationAnalysisNum.allnum+=Number(el.value);
                            if(el.name.includes('正常')){
                                this.stabilityFoundationAnalysisNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.stabilityFoundationAnalysisNum.ycnum+=Number(el.value);
                            }
                        })
                        this.stabilityFoundationAnalysisNum.zczb=this.stabilityFoundationAnalysisNum.zcnum/this.stabilityFoundationAnalysisNum.allnum * 100;
                        this.stabilityFoundationAnalysisNum.yczb=this.stabilityFoundationAnalysisNum.yczb/this.stabilityFoundationAnalysisNum.allnum * 100;
                        this.stabilityFoundationAnalysisList = myData;
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
                        let myData=data.data.data.indicatorAnalysisDetailInfos;
                        this.injectionProductionBalanceAnalysisNum.allnum=0;
                        this.injectionProductionBalanceAnalysisNum.zcnum=0;
                        this.injectionProductionBalanceAnalysisNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            this.injectionProductionBalanceAnalysisNum.allnum+=Number(el.value);
                            if(el.name.includes('正常')){
                                this.injectionProductionBalanceAnalysisNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.injectionProductionBalanceAnalysisNum.ycnum+=Number(el.value);
                            }
                        })
                        if(this.injectionProductionBalanceAnalysisNum.zcnum!==0 && this.injectionProductionBalanceAnalysisNum.allnum!==0){
                            this.injectionProductionBalanceAnalysisNum.zczb=this.injectionProductionBalanceAnalysisNum.zcnum/this.injectionProductionBalanceAnalysisNum.allnum * 100;
                        }
                        this.injectionProductionBalanceAnalysisNum.yczb=this.injectionProductionBalanceAnalysisNum.yczb/this.injectionProductionBalanceAnalysisNum.allnum * 100;
                        this.injectionProductionBalanceAnalysisList = myData;
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
                        let myData=data.data.data.indicatorAnalysisDetailInfos;
                        this.recoveryAnalysisNum.allnum=0;
                        this.recoveryAnalysisNum.zcnum=0;
                        this.recoveryAnalysisNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            this.recoveryAnalysisNum.allnum+=Number(el.value);
                            if(el.name.includes('正常')){
                                this.recoveryAnalysisNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.recoveryAnalysisNum.ycnum+=Number(el.value);
                            }
                        })
                        if(this.recoveryAnalysisNum.zcnum!==0 && this.recoveryAnalysisNum.allnum!==0){
                            this.recoveryAnalysisNum.zczb=this.recoveryAnalysisNum.zcnum/this.recoveryAnalysisNum.allnum * 100;
                        }
                        this.recoveryAnalysisNum.yczb=this.recoveryAnalysisNum.yczb/this.recoveryAnalysisNum.allnum * 100;
                        this.recoveryAnalysisList = myData;
                    }
                });
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
                    this.layerData = data.data;
                    if (data.data.data.mutiLayerPicResponse) {
                        if(!this.myList.length){
                            this.sjcl(data.data.data.mutiLayerPicResponse);
                        }else{
                            this.setProminentWell(data.data.data.mutiLayerPicResponse)
                        }
                    } else {
                        if(this.isNewformat){
                            this.$refs.H5Chart2.setSampleDate(null);
                        }else{
                            this.$refs.H5Chart.setSampleDate(null);
                        }
                    }
                });
            },
            
            //查询
            searchThing() {
                this.indexChangeTrend = '';
                this.selCode = '';
                this.myList=[];
                this.getProStatusAnalysis()
                this.getStableBaseAnalysis()
                this.getProInjectionBalanceAnalysis()
                this.outputStatusAnalysis()
                this.clickAnalysis();
            },
            
            //点击
            selRadioIterm(val, tag) {
                let myData = []; //我的数据
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                
                if(this.indexChangeTrend!=val){
                    this.indexChangeTrend = val; //选中项目
                }else{
                    this.indexChangeTrend='';
                    this.searchThing();
                    return false;
                }
                
                this.selTag = tag; //选中数据集
                if (val == undefined || val == "") {
                    return false; //无效参数
                }
                //获得选中指标名称 hwh
                let indexName = '';
                let indexCode = '';
                //进行运算
                //1、获取选中井集合
                console.log("logInfo:::",eval("this."+tag));
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
                
                console.log('this.myList',this.myList);
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
                // let LayerType = 8
                let LayerType=1;
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
                data.Layers = Layers;
                console.log('源数据',data);
                if(this.isNewformat){
                    setTimeout(()=>{
                        this.$refs.H5Chart2.setSampleDate(data);
                    },500)
                }else{
                    setTimeout(()=>{
                        this.$refs.H5Chart.setSampleDate(data);
                    },500)
                }
            },
            //突出井号
            setProminentWell(tc){
                let obj = tc;
                let data = {
                    Template: {
                        "Truncate": 0,
                        "WellSize": 3,
                        "TruncateEnd": 0,
                        "WGObjFullName": {
                            "ClassName": "WGFrameWell",
                            "NameSpace": "WGADPlatGraph2DFrame"
                        },
                        "ViewBrush": {
                            "TransViewY": 0,
                            "TransViewX": 0,
                            "FillStyle": 0,
                            "BrushColorA": 255,
                            "BrushColorR": 255,
                            "BrushColorG": 69,
                            "BrushColorB": 0
                        },
                        "Childrens": [{
                            "WGObjFullName": {
                                "ClassName": "WGFrameWellLabelText",
                                "NameSpace": "WGADPlatGraph2DFrame"
                            },
                            "DrawBoundary": true,
                            // "PenWidth": 0.5,
                            "PenWidth":1,
                            "PenColorA": 255,
                            // "PenColorR": 0,
                            // "PenColorG": 0,
                            // "PenColorB": 0,
                            "PenColorR": 255,
                            "PenColorG": 53,
                            "PenColorB": 53,
                            "ViewBrush": {
                                "TransViewY": 0,
                                "TransViewX": 0,
                                "FillStyle": 0,
                                "BrushColorG": 255,
                                "BrushColorA": 255,
                                "LinearGradientColor": [],
                                "BrushColorR": 255,
                                "BrushColorB": 255
                            },
                            "OffX": 4,
                            "OffY": -3.3,
                            "PaddingX": 3,
                            "PaddingY": 2,
                            "TextOffY": 0.4,
                            "RectRadius": 2,
                            "RectModel": "1",
                            "IsRightLabel": true,
                            "Font": {
                                "FontName": "微软雅黑",
                                "FontSize": 10,
                                "Color": {
                                    "ColorG": 0,
                                    "ColorR": 0,
                                    "ColorB": 0,
                                    "ColorA": 255
                                },
                                "Weight": "bold",
                                "HorizAlign": 1,
                                "VerticalAlign": 1,
                                "Shadow": false,
                                "ShadowOffsetY": 2,
                                "ShadowOffsetX": 2,
                                "ShadowBlur": 5,
                                "ShadowColor": {
                                    "ColorG": 51,
                                    "ColorR": 51,
                                    "ColorB": 255,
                                    "ColorA": 255
                                },
                                "TextStroke": false,
                                "TextStrokeLineWidth": 1,
                                "BackColor": {
                                    "ColorG": 0,
                                    "ColorR": 0,
                                    "ColorB": 0,
                                    "ColorA": 255
                                },
                                "Underline": false,
                                "UnderlineWidth": 1,
                                "UnderlineColor": {
                                    "ColorG": 0,
                                    "ColorR": 0,
                                    "ColorB": 0,
                                    "ColorA": 255
                                },
                                "Scale": 5.426344589246292,
                                "AutoSize": true,
                                "Orientation": 0,
                                "Variant": "normal",
                                "UnderlineSpace": 0,
                                "Transparent": false,
                                "StrikeOut": false,
                                "Pitch": 0,
                                "RowSpaceNew": 7,
                                "PitchAndFamily": 0,
                                "Style": "normal",
                                "CharSet": 1,
                                "Direction": 0,
                                "Clipped": false
                            },
                            "DrawDirectLine": false,
                            "ShowLineLength": 50,
                            "Visible": true,
                            "Hidden": false,
                            "IsAllowSelect": true,
                            "MaxScale": 500,
                            "LineCap": "round",
                            "PenROP": false,
                            "IsChanged": true,
                            "MinScale": 0,
                            "ObjTag": "",
                            "IsRecordHistory": true,
                            "AllowDrag": true,
                            "LineSmooth": false,
                            "LoadEditionNum": 156,
                            "LineJoin": "round",
                            "ObjID": "e1516852-0042-4d55-9177-cf76038206e7",
                            "ObjType": 112,
                            "ObjName": "井号",
                            "LabelCode": "井号",
                            "EnableDeleted": true,
                            "HintText": "GeoObj",
                            "IsFixedOff": true,
                            "PenDashStyle": 0
                        }],
                        "PenColorR": 0,
                        "PenColorG": 206,
                        "PenColorB": 209,
                        "PenColorA": 255,
                        "PenWidth": 3,
                        "PenDashStyle": 0
                    },
                    MinXMap:obj.x2,
                    MaxXMap:obj.x3,
                    MinYMap:obj.y2,
                    MaxYMap:obj.y3,
                    Layers:[],
                }
                let LayersItem = {
                    LayerName : "等值线图层",
                    LayerType : 8,
                    Active : true,
                    Display : true,
                    ClearLayer : true,
                    LayerIndex : 8,
                    WellDotInfo: [
                        {
                            "WellDotTypeCode": "0",
                            "WellDotTypeName": "油",
                            "WellSize": 6,
                            "ViewPen": {
                                "PenColorA": 255,
                                "PenColorR": 255,
                                "PenColorG": 255,
                                "PenColorB": 255,
                                "PenWidth": 3,
                                "PenDashStyle": 0,
                                "LineSmooth": false,
                                "PenROP": false,
                                "LineCap": "round",
                                "LineJoin": "round"
                            },
                            "ViewBrush": {
                                "BrushColorA": 255,
                                "BrushColorR": 255,
                                "BrushColorG": 0,
                                "BrushColorB": 0,
                                "FillStyle": 0,
                                "LinearGradientColor": [],
                                "Pattern": null,
                                "TransViewX": 0,
                                "TransViewY": 0
                            },
                            "Label":[
                              {
                                  "ViewPen": {
                                      "PenWidth": 0.5,
                                      "PenColorA": 255,
                                      "PenColorR": 255,
                                      "PenColorG": 0,
                                      "PenColorB": 0,
                                      "PenDashStyle": 0
                                  },
                                  "ViewBrush": {
                                      "FillStyle": 0,
                                      "BrushColorG": 255,
                                      "BrushColorA": 255,
                                      "BrushColorR": 255,
                                      "BrushColorB": 255
                                  },
                                  "Font": {
                                      "FontName": "微软雅黑",
                                      "FontSize": 10,
                                      "Color": {
                                          "ColorG": 0,
                                          "ColorR": 255,
                                          "ColorB": 0,
                                          "ColorA": 255
                                      },
                                      "Weight": "bold" 
                                  }
                            }]
                        }, 
                        {
                            "WellDotTypeCode": "1",
                            "WellDotTypeName": "水",
                            "WellSize": 6,
                            "ViewPen": {
                                "PenColorA": 255,
                                "PenColorR": 255,
                                "PenColorG": 255,
                                "PenColorB": 255,
                                "PenWidth": 3,
                                "PenDashStyle": 0,
                                "LineSmooth": false,
                                "PenROP": false,
                                "LineCap": "round",
                                "LineJoin": "round"
                            },
                            "ViewBrush": {
                                "BrushColorA": 255,
                                "BrushColorR": 0,
                                "BrushColorG": 0,
                                "BrushColorB": 255,
                                "FillStyle": 0,
                                "LinearGradientColor": [],
                                "Pattern": null,
                                "TransViewX": 0,
                                "TransViewY": 0
                            },
                            "Label":[
                              {
                                  "ViewPen": {
                                      "PenWidth": 0.5,
                                      "PenColorA": 255,
                                      "PenColorR": 0,
                                      "PenColorG": 0,
                                      "PenColorB": 255,
                                      "PenDashStyle": 0
                                  },
                                  "ViewBrush": {
                                      "FillStyle": 0,
                                      "BrushColorG": 255,
                                      "BrushColorA": 255,
                                      "BrushColorR": 255,
                                      "BrushColorB": 255
                                  },
                                  "Font": {
                                      "FontName": "微软雅黑",
                                      "FontSize": 10,
                                      "Color": {
                                          "ColorG": 0,
                                          "ColorR": 0,
                                          "ColorB": 255,
                                          "ColorA": 255
                                      },
                                      "Weight": "bold" 
                                  }
                              }]
                        }
                    ],
                    Objects:[]
                };
                this.myList.forEach((el,i)=>{
                    if(el.wellCoord!==null){    
                        LayersItem.Objects.push({
                            "ObjType": 110,
                            "CoordX": el.wellCoord[0].coordX,
                            "CoordY": el.wellCoord[0].coordY,
                            "WellDotType":String(el.wellCoord[0].wellCode),
                            "WellName": el.well
                        })
                    }
                })
                data.Layers.push(LayersItem);
                console.log('绘制突出井号数据源',data)
                if(this.isNewformat){
                    setTimeout(()=>{
                        this.sjcl(this.layerData.data.mutiLayerPicResponse);
                        setTimeout(()=>{
                            this.$refs.H5Chart2.setProminentWell(data);
                        },1500)
                    },500)
                }else{
                    setTimeout(()=>{
                        this.sjcl(this.layerData.data.mutiLayerPicResponse);
                        setTimeout(()=>{
                            this.$refs.H5Chart.setProminentWell(data);
                        },1500)
                    },500)
                }
            },
            //区块模型配置页面跳转
            blockModel() {
                this.$router.push({
                    path: "blockAnalysisAided"
                });
            },
            //跳转区块分析
            switchToAnaylsis() {
                this.$router.push({
                    name: 'blockAnalysisAided',
                });
            },
            //点击井跳转 动态分析界面
            getBorepipeTypeApi(wellNo){
                getBorepipeType(wellNo).then(res=>{
                    if(res.data.code==200){
                        let data=res.data.data;
                        if(data==1){//水井
                            this.$router.push({
                                path:`/dynamicManagement/dynamicTrackingWaterAuxiliary/waterAnalysisReport?wellNo=${wellNo}`
                            })
                        }else if(data==2){//油井
                            this.$router.push({
                                path:`/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport?wellNo=${wellNo}`
                            })
                        }
                    }
                })
            },
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
        .z-content{
            .z-content-n{
                margin-top:16px;
                display: flex;
                .z-row{
                    flex:1;
                    padding-right: 20px;
                    .z_title{
                        display: flex;
                        align-items: center;
                        position: relative;
                        img{
                            width:38px;
                            height:38px;
                            margin-right:10px;
                        }
                        span{
                            font-size: 16px;
                            // color: #FFFFFF;
                            text-align: center;
                            font-weight: 600;
                            z-index: 1;
                        }
                        &::before{
                            content:'';
                            background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                            width:200px;
                            height:32px;
                            position: absolute;
                            left:60px;
                            top:2px;
                            z-index: 0;
                        }
                    }
                    .z_title2{
                        display: flex;
                        align-items: center;
                        position: relative;
                        img{
                            width:38px;
                            height:38px;
                            margin-right:20px;
                        }
                        span{
                            font-size: 16px;
                            // color: #FFFFFF;
                            text-align: center;
                            font-weight: 600;
                            z-index: 1;
                        }
                        &::before{
                            content:'';
                            background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                            width:200px;
                            height:32px;
                            position: absolute;
                            left:50px;
                            top:2px;
                            z-index: 0;
                        }
                    }
                }
                .z_schedule{
                    margin-top:22px;
                    margin-bottom:10px;
                    display: flex;
                    align-items: center;
                    .sp1{
                        width:61px;
                        font-size: 14px;
                    }
                    .z_proess{
                        width:182px;
                        height:16px;
                        padding: 1px;
                        border: 1px solid rgba(41,171,226,1);
                        margin-right:16px;
                        display: flex;
                        align-items: center;
                        .z_proess_sp1{
                            height:100%;
                            background: linear-gradient(to right, #2cbdfb 0%, #80e2bf 50%, #befe93 100%);
                            b{
                                font-size: 14px;
                                color: #00223F;
                                letter-spacing: 0;
                                font-weight: 700;
                                position: relative;
                                top:-6px;
                                left:14px;
                            }
                        }
                        .z_proess_sp2{
                            flex:1;
                            height:100%;
                            background: linear-gradient(to right, #ffc255 0%, #ff9c46 50%, #ff7b39 100%);
                        }
                    }
                    .sp2{
                        font-size: 14px;
                        color:rgba(255,200,53,.8);
                        b{
                            font-size:20px;
                            opacity: 1;
                            color:#FFC835;
                        }
                    }
                }
            }
        }
        .tips{
            width:590px;
            height:40px;
            display: flex;    
            align-items: center;
            padding-left:8px;
            background: rgba(216,150,20,0.06);
            border: 1px solid rgba(255,149,1,1);
            border-radius: 2px;
            margin-bottom:15px;
            img{
                width:20px;
                height:20px;
                margin-right:8px;
            }
        }
        .remark0{
            padding-left:14px;
            width:590px;
            height:38px;
            line-height: 38px;
            font-size: 16.8px;
            color: #00DEF0;
            background-color: #eef1f4;
        }
        .remark{
            padding-left:14px;
            width:590px;
            height:38px;
            line-height: 38px;
            font-size: 16.8px;
            color: #00DEF0;
            background-color: #14334f;
            background-image: linear-gradient(90deg, #004473 0%, rgba(0,72,122,0.22) 100%);
        }
        .z-well0{
            width:285px;
            height:36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #D2E4FF;
            font-size: 14px;
            color:#313D4C;
            font-weight: 400;
            padding:0 14px;
            margin-bottom:14px;
            cursor: pointer;
            img{
                width:14px;
                height:14px;
            }
        }
        .z-well0:nth-child(1n){
            margin-right:18px;
        }
        .z-well{
            width:285px;
            height:36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-image: linear-gradient(0deg, #004473 0%, rgba(0,72,122,0.36) 100%);
            font-size: 14px;
            color: rgba(255,255,255,0.80);
            font-weight: 400;
            padding:0 14px;
            margin-bottom:14px;
            cursor: pointer;
            img{
                width:14px;
                height:14px;
            }
        }
        .z-well:nth-child(1n){
            margin-right:18px;
        }
    }
    
    .condationRow {
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    .checkBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        border-image: var(--primary-btn);
        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
        background-size: 100% 100% !important;
        color:#fff;
    }

    .about {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgb(2, 43, 117);
        color:#fff;
    }

    .noCheckBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgba(143, 164, 204, 0.3);
    }
    
    
    .z-button{
        width: 100%;
        height: 34px!important;
        margin-bottom: 5px;
        font-size:14px;
        text-align: center;
        border-color: var(--light-blue-color);
        color: var(--white-color);
        transition: all 0s;
        line-height: 8px;
        border-radius: 0 !important;
        background: rgba(143, 164, 204, 0.3);
        background-size: 100% 100% !important;
        white-space: pre-wrap;
        &:hover{
            border-image: var(--primary-btn);
            border-color: var(--light-blue-color);
            background: var(--primary-btn) !important;
        }
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
    .checkBtn2{
        width: 110px;
        height: 28px;
        text-align: center;
        background: rgba(255,200,53,0.8);
        font-size:14px;
    }
    .about2{
        width: 110px;
        height: 28px;
        text-align: center;
        background: rgba(0,133,225,0.34);
        font-size:14px;
    }
    .noCheckBtn2{
        width: 110px;
        height: 28px;
        text-align: center;
        background: rgba(143,164,204,0.18);
        font-size:14px;
    }


    .numBtn{
        cursor: pointer;
        min-width: 70px;
        border-radius:4px;
        height:60px;
        padding:0 10px;
        margin-right:8px;
        margin-bottom:8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
        .sp1{
            font-size: 16px;
            color: #FFCA07;
            font-weight: 600;
        }
        .sp2{
            font-size: 12px;
        }
    }
    .numBtnBgActive{
        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
    }
    
    
    
    .checkBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        border-image: var(--primary-btn);
        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
        background-size: 100% 100% !important;
        color:#fff;
    }
    
    .about {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgb(2, 43, 117);
        color:#fff;
    }
    .selectButton{
        border-image: var(--primary-btn);
        border-color: var(--light-blue-color);
        background: var(--primary-btn) !important;
    }
    
    .noCheckBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgba(143, 164, 204, 0.3);
    }
    
</style>
