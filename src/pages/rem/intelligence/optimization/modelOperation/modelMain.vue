<template>
    <div style="height: 100%">
        <el-row v-loading="fileParseLoading" element-loading-text="加载中"
                element-loading-background="rgba(0, 40, 80, 0.7)"
                style=" left: -20px; top: -15px; border: none !important;height: 100%">
            <!-- 模型管理  油藏优化模型 -->
<!--            <modelManager ref="modelManager"></modelManager>-->
            <!-- 模型运算界面 优化方案区块指标和剩余油分布图 + 模型代码 -->
            <div v-show="ModelYunSuan" style="height: 100%">
                <!-- 五个按钮 -->
                <el-row>
                    <el-button size="small" type="primary" @click="modelManager">模型管理</el-button>
                    <el-button size="small" type="primary" @click="modelUpload">数据上传</el-button>
                    <el-button size="small" type="primary" @click="lookParam">调控参数</el-button>
                    <!-- :disabled="this.modelBasicInfo.modelStep == 0 ? true : false" -->
                    <div style="float: right;margin-right: -40px;">
                        <el-button size="small" type="primary" @click="getRunModelTest">模型运行</el-button>
                        <el-button size="small" type="primary" @click="schDownload">预测方案</el-button>
                        <el-button size="small" type="primary" @click="resultUpload">结果上传</el-button>
                        <!-- :disabled="this.modelBasicInfo.modelStep == 0 ? true : false" -->
                    </div>
                    <el-image :src="require('@/icons/svg/bj.png')" style="width: 102.5%; height: 20px"></el-image>
                    <div style="z-index: 3;color: #40c2d4; text-align: center; margin-top: -48px;
                            margin-left: 280px; font-size: 22px;"> 模型运算 </div>
                </el-row>
                <!--  解析文件Loading  -->
                <el-row :gutter="15" type="flex" style="height: calc(100% - 20px )" justify="center">
                    <el-col :span="12" style="margin-top:10px;height: 90%">
                        <!--  echarts图表  -->
                        <pagePanel headerTitle="优化方案区块指标"  :show-btn="true" style="height:100%">
                            <blockIndicators ref="blockIndicators" :modelBasicInfo="modelBasicInfo"></blockIndicators>
                        </pagePanel>
                    </el-col>
                    <!--  剩余油分布图  -->
                    <el-col :span="12" style="margin-top:10px;margin-right: -40px;height: 90%">
                        <pagePanel headerTitle="剩余油分布图" @zoom-out-com="zoomOutComNew" :show-btn="true" style="height:100%">
                            <surplusOil ref="surplusOil" :modelBasicInfo="modelBasicInfo"></surplusOil>
                        </pagePanel>
                    </el-col>
                </el-row>
                <!--  显示模型代码  -->
                <el-row style="float: right; margin-top: -46px; font-size: 14px; margin-right: -10px">
                    <span style="color: white">模型代码：</span>
                    <span style="color: #40c2d4">{{ modelBasicInfo.modelCode }}</span>
                </el-row>
            </div>
            <!--  遮罩封装  -->
            <div v-show="zhezhao">
                <el-image :src="require('@/icons/svg/zhezhao.jpg')"
                          style="position: absolute; top: 0px; opacity: 0.7; width: 1645px; height: 730px; z-index: 100"></el-image>
            </div>
            
            <!-- 1、上传历史阶段文件dialog class="uploadDialogStyle"-->
            <div>
                <el-dialog title="上传历史阶段文件" :show-close="false" :close-on-click-modal="false"
                           :visible.sync="modelDialogVisibleF" :modal="false" class="dialogUpload" width="740px"
                           style="position: absolute; top: -25px">
                    <fileUpload ref="fileChild" :modelBasicId="modelBasicId" @aa="aa" @parseSureButtonTrue="parseSureButtonTrue"
                                @parseSureButtonFalse="parseSureButtonFalse">
                    </fileUpload>
                    <el-row style="text-align: center;float: right;">
                        <el-button @click="sureClickAfter" size="small" :disabled="parseSureButton" type="primary">确 定</el-button>
                        <el-button @click="closeDialogF" size="small" :disabled="parseSureButton" type="primary">取 消</el-button>
                    </el-row>
                </el-dialog>
            </div>
            <!-- 2、上传预测阶段文件dialog  class="uploadDialogStyle"  src="@/icons/svg/zhezhao.jpg"-->
            <div>
                <el-dialog title="上传预测阶段文件" :close-on-click-modal="false" :show-close="false"
                           :visible.sync="modelDialogVisibleA" :modal="false" class="dialogUploadPredict" width="715px"
                           style="position: absolute; top: -380px">
                    <fileUploadPredict ref="fileChildPredict" :modelBasicId="modelBasicId" @aa="aa"
                                       @parseSureButtonTrue="parseSureButtonTrue" @parseSureButtonFalse="parseSureButtonFalse">
                    </fileUploadPredict>
                    <el-row style="text-align: center; float: right;">
                        <el-button type="prymary" @click="sureClickAfterA" size="small" :disabled="parseSureButton">确 定</el-button>
                        <el-button type="prymary" @click="closeDialogA" size="small" :disabled="parseSureButton">取 消</el-button>
                    </el-row>
                </el-dialog>
            </div>
            <!-- 调控参数dialog -->
            <el-card class="modelManagerClass" v-show="regulateParams" style="background-color: rgba(5,52,73,0.8);z-index: 111">
                <el-row type="flex" justify="center" :gutter="25">
                    <el-col :span="7">
                        <!--  区块参数 ——  区块调控值 -->
                        <pagePanel headerTitle="区块参数 : 区块调控值"  :show-btn="true"
                                   style="height: calc(100% - 10px);height: 650px;">
                            <el-table height="570" :cell-style="changeColor" :data="tableListOne">
                                <el-table-column property="blockName" label="区块" align="center"></el-table-column>
                                <el-table-column property="maxBlockValue" label="最大调控值//(m³/d)"
                                                 :render-header="renderHeader" align="center" style="width:95px">
                                </el-table-column>
                                <el-table-column property="minBlockValue" label="最小调控值//(m³/d)"
                                                 :render-header="renderHeader" align="center"></el-table-column>
                            </el-table>
                        </pagePanel>
                    </el-col>
                    <el-col :span="8">
                        <!--  水井参数 ——  注采参数 -->
                        <pagePanel headerTitle="水井参数 : 注采参数"  :show-btn="true"
                                   style="height: calc(100% - 10px);height: 650px;">
                            <el-table :data="tableListTwo" height="570">
                                <el-table-column type="index" label="序号" align="center"></el-table-column>
                                <el-table-column property="modelWellNo" label="操作井名" align="center"></el-table-column>
                                <el-table-column property="modelWellType" label="油水井" align="center"></el-table-column>
                                <el-table-column property="maxWellValue" label="最大调控值//(m³/d)" :render-header="renderHeader"
                                                 align="center"></el-table-column>
                                <el-table-column property="minWellValue" label="最小调控值//(m³/d)" :render-header="renderHeader"
                                                 align="center"></el-table-column>
                            </el-table>
                        </pagePanel>
                    </el-col>
                    <el-col :span="8">
                        <!--  油井参数 ——  注采参数 -->
                        <pagePanel headerTitle="油井参数 : 注采参数" :show-btn="true"
                                   style="height: calc(100% - 10px);height: 650px;">
                            <el-table :data="tableListThree" height="570">
                                <el-table-column type="index" label="序号" align="center"></el-table-column>
                                <el-table-column property="modelWellNo" label="操作井名" align="center"></el-table-column>
                                <el-table-column property="modelWellType" label="油水井" align="center"></el-table-column>
                                <el-table-column property="maxWellValue" label="最大调控值//(m³/d)" :render-header="renderHeader"
                                                 align="center"></el-table-column>
                                <el-table-column property="minWellValue" label="最小调控值//(m³/d)" :render-header="renderHeader"
                                                 align="center"></el-table-column>
                            </el-table>
                        </pagePanel>
                    </el-col>
                </el-row>
                <el-button @click="regulateParams = false"  size="small" type="primary"
                           style="height: 30px;font-size: 14px;float: right;margin-top: 20px;margin-right: 30px">退出查看
                </el-button>
            </el-card>
            
        </el-row>
    </div>
</template>

<script>
//-组件
// import modelManager from "@/pages/rem/intelligence/optimization/modelOperation/modelManager.vue";
import blockIndicators from "@/pages/rem/intelligence/optimization/modelOperation/modelRun/blockIndicators.vue";
import surplusOil from "@/pages/rem/intelligence/optimization/modelOperation/modelRun/surplusOil.vue";
import fileUpload from "@/pages/rem/intelligence/optimization/modelOperation/modelUpload/fileUpload.vue"
import fileUploadPredict from "@/pages/rem/intelligence/optimization/modelOperation/modelUpload/fileUploadPredict.vue"
//-接口
import {
    // GetBlockListByOgfId,
    // GddModelBasic,
    // DeleteModelBasicById,
    // JudgeModelBasicNameUnique,
    GetModelBasicById,
    // GetModelBasicListByCondition,
    // GetOgfBlockCascader,
    // GetOgfList,
    GetModelBasicByMaxModelSort,
    GetModelFileAttrListByModelBasicId,
    ParseFiles,
    GetRegulationList,
} from "@/api/rem/dispenseIndex.js";
import {
    GetSchedule,
    DownloadFile,
    GetupdateSchedule,
    GetSchPicTstepData,
    GetModelfList,
    GetmodelExec
} from "@/api/rem/dispenseModel.js";

export default {    
    name: "modelMain",
    components:{
        // modelManager,
        blockIndicators,
        surplusOil,
        fileUpload,
        // fileUploadPredict,
        
    },
    data(){
        return{
            fileParseLoading: false,
            ModelYunSuan: true,   //模型运算页面和模型管理页面
            modelManagerDialog: false, //是否显示模型管理页面
            tableListOne: [],
            tableListTwo: [],
            tableListThree: [],
            // //智能配注代码
            checkList: [],
            tableData1: [],
            cardtable: false,
            startList: [],
            endList: [],
            threeList: [],
            markLineData: [],
            item: "",
            falutName: "",
            pictureArray: [],
            pictureOption: [],
            tooltipdiabled: false,
            modelBasicId: "", //父子传Id
            tStep: "",
            zhezhao: false, //false
            zhezhao1: false,
            // schDownLoading: false,
            oneFlag: true, //模型管理按钮是否可用
            twoFlag: true, //按钮是否可用
            threeFlag: true, //按钮是否可用
            fourFlag: true, //按钮是否可用
            fiveFlag: true, //按钮是否可用
            //接收方案信息
            modelBasicInfo: {
                modelBasicId: "",
                modelCode: "",
                modelStep: "",
                isModelRun: "",
                fileNum: "",
                modelSubmitNum: "",
                modelRun: "",
            },
            submitFlag: "", //解析文件Flag--上传文件设置禁用(优化后)
            modelDialogVisibleF: false, //上传优化前dialog
            modelDialogVisibleA: false, //上传优化后dialog
            fileCount: {
                faCount: "", //1
                ffCount: "", //2
                ftCount: "", //3
                fyCount: "", //4
                fnCount: "", //5
                fdCount: "", //6
                frCount: "", //7
                fhCount: "", //8
                fcCount: "", //9
                fbCount: "", //10
                fgCount: "", //11

                baCount: "",
                bfCount: "",
            },
            parseFlag: true,
            parseSureButton: false,
            dialogTableVisibleParam: false, //调控参数dialog
            //模型运行dialog
            showcard: false,
            showChange1: false,
            loading: true,
            //制度下载dialog
            hh: "模型正在运行中",
            showChange: true,
            dialogVisible: false,
            dialogReal: false,
            dialogRun: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        },
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        },
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        },
                    },
                ],
            },
            startDate: "",
            endDate: "",
            //测试路由传参
            options: [
                {
                    value: "选项1",
                    label: "明化镇组下段I油组3小组",
                },
                {
                    value: "选项2",
                    label: "明化镇组下段0油组3小组",
                },
            ],
            value: "",
            regulateParams:false,
            tableData: [],
            prodList: [],
            submitData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            injRealList: [],
            prodRealList: [],
            oilData: [],
            waterData: [],
            preInjdata: [],
            pretData1: [],
            preInjdata2: [],
            pretData: [],
            modelData: [],
            timerCard: null,
            sumData: [],
            dataDialog: true,
            fileData: [],
            oildate: [],
            arrrDate: [],
            disable: true,
            modelStepPanduan: "",
            stepJiexi: "",
            dialogVisiblePicture: false,
            echartsListaa: {
                backgroundColor: "rgba(128, 128, 128, 0)",
                color: ["orange", "#30ff00"],
                tooltip: {
                    backgroundColor: "",
                    textStyle: {
                        color: "#FFFFFF",
                        fontSize: "16",
                    },
                    trigger: "axis",
                    showDelay: 0,
                    axisPointer: {
                        show: true,
                        type: "cross",
                        lineStyle: { type: "dashed", width: 1 },
                    },
                },
                legend: {
                    x: 240,
                    data: ["当前值", "优化值"],
                    textStyle: {
                        color: "#FFFFFF",
                        fontSize: 15,
                    },
                },
                toolbox: {
                    show: true,
                    orient: "vertical",
                    left: "right",
                    top: "top",
                    feature: {
                        saveAsImage: {
                            backgroundColor: "#014059",
                        },
                    },
                    iconStyle: {
                        borderColor: "#FFFFFF",
                    },
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        handleSize: 20,
                        height: "20px",
                        startValue: 0,
                        endValue: 11, //xArraylength是x轴返回的数据的个数
                        showDetail: false,
                        bottom: "1",
                        left: "60",
                        zoomLock: true,
                        brushSelect: false,
                    },
                ],
                grid: {
                    left: "45",
                    top: "60",
                    right: "30",
                    bottom: "80",
                },
                xAxis: [
                    {
                        name: "井号",
                        type: "category",
                        scale: true,
                        splitNumber: 4,
                        lineStyle: {
                            type: "solid",
                        },
                        axisLabel: {
                            show: true,
                            rotate: 25,
                            // x轴的字体样式
                            textStyle: {
                                color: "#FFFFFF",
                                fontSize: "13",
                            },
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(192,192,192,0.4)",
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                        splitLine: {
                            show: false,
                        },
                        nameTextStyle: {
                            padding: [0, 0, -60, -10],
                            color: "#FFFFFF",
                            fontSize: "13",
                        },
                    },
                ],
                yAxis: {
                    type: "value",
                    scale: true,
                    splitNumber: 4,
                    name: "m³/天",
                    nameTextStyle: {
                        padding: [0, 0, 10, -45],
                        color: "#FFFFFF",
                        fontSize: "13",
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#FFFFFF",
                            fontSize: "13",
                        },
                    },
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            type: "dotted",
                            color: "rgba(192,192,192,0.2)",
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: "当前值",
                        type: "scatter",
                        symbol: "circle",
                        symbolSize: 10,
                        data: [],
                        markLine: {
                            symbol: ["", "arrow"],
                            //symbolSize: 12,
                            silent: false,
                            //symbol: "none",
                            data: [],
                        },
                    },
                    {
                        name: "优化值",
                        type: "scatter",
                        symbol: "circle",
                        symbolSize: 10,
                        data: [],
                    },
                ],
            },
            
        }
    },
    mounted() {
        this.getCaseByMax()
    },
    methods: {
        //获取最新方案方法--智能配注请求后台
        getCaseByMax() {
            //判断是哪里传过来的caseId
            GetModelBasicByMaxModelSort()
                .then((res) => {
                    this.modelBasicId = res.result.modelBasicEntity.modelBasicId;
                    console.log("znpz", res);
                    this.modelBasicInfo.modelBasicId = res.result.modelBasicEntity.modelBasicId;
                    this.modelBasicInfo.modelCode = res.result.modelBasicEntity.modelCode;
                    this.modelBasicInfo.modelStep = res.result.modelBasicEntity.modelStep;
                    this.modelBasicInfo.isModelRun = res.result.modelBasicEntity.isModelRun;
                    this.modelBasicInfo.fileNum = res.result.modelBasicEntity.fileNum;
                    this.modelBasicInfo.modelSubmitNum = res.result.modelBasicEntity.modelSubmitNum;
                    this.modelBasicInfo.modelRun = res.result.modelBasicEntity.modelRunNum;
                    console.log("智能配注modelrun", res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        parseSureButtonTrue() {
            this.parseSureButton = true;
        },
        parseSureButtonFalse() {
            this.parseSureButton = false;
        },
        close() {
            this.tooltipdiabled = false;
            this.dialogVisiblePicture = false;
        },
        getPictureData() {
            //------------------------------------------------------------------------- 得到echarts数据
            const param = {
                modelBasicId: this.modelBasicInfo.modelBasicId,
            };
            GetSchPicTstepData(param).then((res) => {
                this.pictureOption = res.result.fileStepList;
                console.log("res.result.fileStepList", res.result.fileStepList);
                this.falutName = res.result.fileStepList[0].stepTime;
                this.pictureArray = this.pictureOption[0].schedulePictureList; //画图的数据//一共有四个值-------------------------------
                this.startList = [];
                this.endList = [];
                for (let i = 0; i < this.pictureArray.length; i++) {
                    var currentValue = this.pictureArray[i].currentValue;
                    var optimizeValue = this.pictureArray[i].optimizeValue;
                    var dataLakeWellNo = this.pictureArray[i].dataLakeWellNo;
                    var startArr = [dataLakeWellNo, currentValue];
                    var endArr = [dataLakeWellNo, optimizeValue];
                    this.startList.push(startArr);
                    this.endList.push(endArr);
                }
                this.markLineData = [];
                for (let index = 0; index < this.pictureArray.length; index++) {
                    this.threeList = [];
                    this.threeList.push(this.pictureArray[index].dataLakeWellNo);
                    this.threeList.push(this.pictureArray[index].currentValue);
                    this.threeList.push(this.pictureArray[index].optimizeValue);
                    var oneArr = [this.threeList[0], this.threeList[1]];
                    var twoArr = [this.threeList[0], this.threeList[2]];
                    // if(this.threeList[0]==='H22H'){
                    //   console.log('this.threeList[1]',this.threeList[1])
                    //   console.log('this.threeList[2]',this.threeList[2])
                    // }
                    if (this.threeList[1] < this.threeList[2]) {
                        var markLineArr = [
                            {
                                coord: oneArr,
                                lineStyle: {
                                    width: 1,
                                    color: "red",
                                },
                            },
                            {
                                coord: twoArr,
                                lineStyle: {
                                    width: 1,
                                },
                            },
                        ];
                    } else {
                        var markLineArr = [
                            {
                                coord: oneArr,
                                lineStyle: {
                                    width: 1,
                                    color: "blue",
                                },
                            },
                            {
                                coord: twoArr,
                                lineStyle: {
                                    width: 1,
                                },
                            },
                        ];
                    }
                    this.markLineData.push(markLineArr);
                }
                //console.log('this.markLineData',this.markLineData)
                console.log("this.startList", this.startList);
                this.echartsListaa.series[0].data = this.startList;
                this.echartsListaa.series[1].data = this.endList;
                this.echartsListaa.series[0].markLine.data = this.markLineData;
                // console.log('serises',this.echartsListaa.series[0].markLine.data)
                var myChart = echarts.init(this.$refs.smain);
                myChart.setOption(this.echartsListaa, true);
            });
        },
        changeSelectImage(item) {
            this.pictureArray = [];
            console.log("222222222", item);
            for (let index = 0; index < this.pictureOption.length; index++) {
                console.log("333333333", this.pictureOption[index].fileStepId);
                if (item == this.pictureOption[index].fileStepId) {
                    //画图数据
                    this.pictureArray = this.pictureOption[index].schedulePictureList;
                    //console.log("this.pictureArray",this.pictureArray)
                }
            }
            this.startList = [];
            this.endList = [];
            for (let i = 0; i < this.pictureArray.length; i++) {
                var currentValue = this.pictureArray[i].currentValue;
                var optimizeValue = this.pictureArray[i].optimizeValue;
                var dataLakeWellNo = this.pictureArray[i].dataLakeWellNo;
                var startArr = [dataLakeWellNo, currentValue];
                var endArr = [dataLakeWellNo, optimizeValue];
                this.startList.push(startArr);
                this.endList.push(endArr);
            }
            this.markLineData = [];
            for (let index = 0; index < this.pictureArray.length; index++) {
                this.threeList = [];
                this.threeList.push(this.pictureArray[index].dataLakeWellNo);
                this.threeList.push(this.pictureArray[index].currentValue);
                this.threeList.push(this.pictureArray[index].optimizeValue);
                var oneArr = [this.threeList[0], this.threeList[1]];
                var twoArr = [this.threeList[0], this.threeList[2]];
                // if(this.threeList[0]==='H22H'){
                //   console.log('this.threeList[1]',this.threeList[1])
                //   console.log('this.threeList[2]',this.threeList[2])
                // }
                if (this.threeList[1] < this.threeList[2]) {
                    var markLineArr = [
                        {
                            coord: oneArr,
                            lineStyle: {
                                width: 1,
                                color: "red",
                            },
                        },
                        {
                            coord: twoArr,
                            lineStyle: {
                                width: 1,
                            },
                        },
                    ];
                } else {
                    var markLineArr = [
                        {
                            coord: oneArr,
                            lineStyle: {
                                width: 1,
                                color: "blue",
                            },
                        },
                        {
                            coord: twoArr,
                            lineStyle: {
                                width: 1,
                            },
                        },
                    ];
                }
                this.markLineData.push(markLineArr);
            }
            console.log("this.startList", this.startList);
            this.echartsListaa.series[0].data = this.startList;
            this.echartsListaa.series[1].data = this.endList;
            this.echartsListaa.series[0].markLine.data = this.markLineData;
            var myChart = echarts.init(this.$refs.smain);
            myChart.setOption(this.echartsListaa, true);
        },
        showTable() {
            this.tooltipdiabled = true;
            this.dialogVisiblePicture = true;
            this.getPictureData();
        },
        clearDateDisable() {
            if (this.endDate == null && this.startDate == null) {
                this.disable = true;
            } else if (this.endDate != null && this.startDate == null) {
                this.disable = true;
            }
            console.log("111111111");
        },

        //接收“查看结果”传过来的caseId——方法
        getResultCaseId() {
            console.log('hhhhhhhhhhhhhhhhhhhhnihaoya')
            //通过caseId获取一条方案信息
            const param = {
                modelBasicId: this.lookResClickId,
            };
            console.log(param,'chakanjieguo')
            //通过方案ID查询一个方案信息
            GetModelBasicById(param)
                .then((res) => {
                    console.log(res)
                    this.modelBasicId = res.result.modelBasicEntity.modelBasicId;
                    this.modelBasicInfo.modelBasicId = res.result.modelBasicEntity.modelBasicId;
                    this.modelBasicInfo.modelStep = res.result.modelBasicEntity.modelStep;
                    this.modelBasicInfo.modelCode = res.result.modelBasicEntity.modelCode;
                    this.modelBasicInfo.isModelRun = res.result.modelBasicEntity.isModelRun;
                    this.modelBasicInfo.fileNum = res.result.modelBasicEntity.fileNum;
                    this.modelBasicInfo.modelSubmitNum = res.result.modelBasicEntity.modelSubmitNum;
                    this.modelBasicInfo.modelRun = res.result.modelBasicEntity.modelRunNum;
                    console.log("方案idmodelrun", this.modelBasicInfo.modelRun);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //点击模型管理按钮
        modelManager() {
            this.modelManagerDialog = true;
            this.ModelYunSuan = false
            // this.$router.push({ name: "modelManager" });
        },

        closeDialogF() {
            this.zhezhao = false;
            this.modelDialogVisibleF = false;
            this.$nextTick(() => {
                this.$refs.fileChild.changeFileList();
            });
        },
        closeDialogA() {
            this.zhezhao = false;
            this.modelDialogVisibleA = false;
            this.$nextTick(() => {
                this.$refs.fileChildPredict.changeFileListA();
            });
        },

        //模型上传按钮——控制文件上传前||后
        modelUpload() {
            this.zhezhao = true;
            this.modelDialogVisibleF = true;
            console.log("modelStep", this.modelBasicInfo.modelStep);
            this.$nextTick(() => {
                this.$refs.fileChild.modelUploadChildF();
            });
            console.log("this.$parent.fileLoading", this.$parent.fileLoading);
        },
        //校验每一行是否上传了文件
        checkFiles() {
            const param = {
                modelBasicId: this.modelBasicId,
                dataFlag: 0,
            };
            GetModelFileAttrListByModelBasicId(param)
                .then((res) => {
                    this.fileCount.faCount = res.result.uploadFileList.FA.length;
                    this.fileCount.ffCount = res.result.uploadFileList.FF.length;
                    this.fileCount.ftCount = res.result.uploadFileList.FT.length;
                    this.fileCount.fyCount = res.result.uploadFileList.FY.length;
                    this.fileCount.fnCount = res.result.uploadFileList.FN.length;
                    this.fileCount.fdCount = res.result.uploadFileList.FD.length;
                    this.fileCount.frCount = res.result.uploadFileList.FR.length;
                    this.fileCount.fhCount = res.result.uploadFileList.FH.length;
                    this.fileCount.fcCount = res.result.uploadFileList.FC.length;
                    this.fileCount.fbCount = res.result.uploadFileList.FB.length;
                    this.fileCount.fgCount = res.result.uploadFileList.FG.length;

                    if (res.result.uploadFileList.FA.length === 0) {
                        this.$message.warning("没有上传历史.A文件");
                    }
                    setTimeout(() => {
                        if (res.result.uploadFileList.FF.length === 0) {
                            this.$message.warning("没有上传历史.F文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FT.length === 0) {
                            this.$message.warning("没有上传训练模型文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FY.length === 0) {
                            this.$message.warning("没有上传summary文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FN.length === 0) {
                            this.$message.warning("没有上传grdecl文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FD.length === 0) {
                            this.$message.warning("没有上传fegrid文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FR.length === 0) {
                            this.$message.warning("没有上传调控参数文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FH.length === 0) {
                            this.$message.warning("没有上传schedule文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FC.length === 0) {
                            this.$message.warning("没有上传小层划分文件");
                        }
                    }, 1);
                    setTimeout(() => {
                        if (res.result.uploadFileList.FB.length === 0) {
                            this.$message.warning("没有上传井名对应文件");
                        }
                    }, 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        checkFilesA() {
            const param = {
                modelBasicId: this.modelBasicId,
                dataFlag: 1,
            };
            GetModelFileAttrListByModelBasicId(param)
                .then((res) => {
                    this.fileCount.baCount = res.result.uploadFileList.BA.length;
                    this.fileCount.bfCount = res.result.uploadFileList.BF.length;

                    if (res.result.uploadFileList.BA.length === 0) {
                        this.$message.warning("没有上传历史.A文件");
                    }
                    setTimeout(() => {
                        if (res.result.uploadFileList.BF.length === 0) {
                            this.$message.warning("没有上传历史.F文件");
                        }
                    }, 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        //上传历史文件点击确定之后
        //优化前点击确定按钮开始解析文件
        sureClickAfter() {
            this.checkFiles();
            console.log(this.fileCount.faCount);
            setTimeout(() => {
                if (
                    this.fileCount.faCount > 0 &&
                    this.fileCount.ffCount > 0 &&
                    this.fileCount.ftCount > 0 &&
                    this.fileCount.fyCount > 0 &&
                    this.fileCount.fnCount > 0 &&
                    this.fileCount.fdCount > 0 &&
                    this.fileCount.frCount > 0 &&
                    this.fileCount.fhCount > 0 &&
                    this.fileCount.fcCount > 0 &&
                    this.fileCount.fbCount > 0
                ) {
                    console.log("dhdhdhhdh");
                    this.fileParseLoading = true;
                    this.parseFlag = true;
                    const param = {
                        modelBasicId: this.modelBasicInfo.modelBasicId,
                        submitFlag: 0,
                    };
                    ParseFiles(param)
                        .then((res) => {
                            if (res.code === 0) {
                                this.parseFlag = false;
                                console.log("if--code = 0 里面flag的值", this.parseFlag);
                            } else {
                                this.parseFlag = true;
                            }
                            console.log("this.parseFlag", this.parseFlag);
                            console.log("1111");
                            console.log("解析文件的res", res);
                            // if(res.code === 0){
                            //   clearInterval(this.interval)
                            // }
                            // this.aa()
                        })
                        .catch((err) => {
                            this.parseFlag = true;
                        });

                    //this.modelBasicInfo.modelStep = this.modelBasicInfo.modelStep + 1
                    this.modelBasicInfo.modelSubmitNum = this.modelBasicInfo.modelSubmitNum + 1;

                    console.log("this.modelBasicInfo.modelSubmitNum", this.modelBasicInfo.modelSubmitNum);
                    console.log("111111111111111111111111111000000000000000");
                    //30s
                    setTimeout(() => {
                        if (this.parseFlag === true) {
                            console.log("if里面的interval", this.parseFlag);
                            this.interval = setInterval(() => {
                                //通过方案ID查询一个方案信息
                                GetModelBasicById(param).then((res) => {
                                    console.log("计时器里的parameter", param);
                                    this.modelStepPanduan = res.result.modelBasicEntity.modelSubmitNum;

                                    //解析文件问题提醒
                                    if (this.modelStepPanduan === -1) {
                                        setTimeout(() => {
                                            this.$message.error("解析 小层 文件有误！");
                                            this.$message.warning("请修改后重新上传！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -2) {
                                        setTimeout(() => {
                                            this.$message.error("解析 fegrid 文件、schedule 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -3) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .F 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -4) {
                                        setTimeout(() => {
                                            this.$message.error("解析 summery 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -5) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -6) {
                                        setTimeout(() => {
                                            this.$message.error("解析 summery 文件、小层 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -7) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、小层 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -8) {
                                        setTimeout(() => {
                                            this.$message.error("解析 fegrid 文件、schedule 文件、summery 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -9) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、fegrid 文件、schedule 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -10) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .F 文件、summery 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -11) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、.F 文件有误！");
                                            this.fileParseLoading = false;
                                            clearInterval(this.interval);
                                        }, 3000);
                                    }
                                });
                                //if (this.modelStepPanduan > 0) {
                                if (this.modelBasicInfo.modelSubmitNum == this.modelStepPanduan) {
                                    this.getCaseId(this.modelBasicInfo.modelBasicId);
                                    console.log("this.modelBasicInfo.modelSubmitNum++++++++", this.modelBasicInfo.modelSubmitNum);
                                    //console.log('0000011111222233333', this.modelBasicInfo.modelSubmitNum < this.modelStepPanduan)
                                    clearInterval(this.interval);
                                    console.log("调用子组件方法");
                                    this.aa();
                                    console.log("调用子组件方法结束");
                                    this.fileParseLoading = false;
                                    //this.submitFlag = this.submitFlag + 1
                                }
                                //}
                                console.log("this.modelStepPanduan", this.modelStepPanduan);
                            }, 30 * 1000);
                        } else {
                            this.aa();
                            console.log("调用子组件方法结束");
                            this.fileParseLoading = false;
                        }
                    }, 1000);

                    console.log("this.modelBasicInfo.modelSubmitNum", this.modelBasicInfo.modelSubmitNum);

                    this.modelDialogVisibleF = false;
                    this.zhezhao = false;
                } else {
                    this.modelDialogVisibleF = true;
                    this.zhezhao = true;
                }
            }, 1000);
        },
        //调用子组件方法
        aa() {
            setTimeout(() => {
                this.$refs.blockIndicators.run();
                this.$refs.surplusOil.run();
                console.log("diaoyong+run111111111111");
                console.log("父组件是否被条用啊！！！！");
            }, 1000);
        },

        //结果上传 -------------------------------------------------------------------------
        resultUpload() {
            this.zhezhao = true;
            this.modelDialogVisibleA = true;
            this.$nextTick(() => {
                this.$refs.fileChildPredict.modelUploadChildA();
                //this.zhezhao = false
            });
        },
        //优化后上传预测文件点击确定之后开始解析文件
        sureClickAfterA() {
            //this.modelDialogVisibleA = false;
            this.checkFilesA();
            setTimeout(() => {
                if (this.fileCount.baCount > 0 && this.fileCount.bfCount > 0) {
                    this.fileParseLoading = true;
                    this.parseFlag = true;
                    const param = {
                        modelBasicId: this.modelBasicInfo.modelBasicId,
                        submitFlag: 1,
                    };
                    ParseFiles(param)
                        .then((res) => {
                            if (res.code == 0) {
                                this.parseFlag = false;
                            } else {
                                this.parseFlag = true;
                            }
                        })
                        .catch((err) => {
                            this.parseFlag = true;
                        });
                    this.modelBasicInfo.modelStep = this.modelBasicInfo.modelStep + 1;
                    this.modelBasicInfo.modelSubmitNum = this.modelBasicInfo.modelSubmitNum + 1;
                    //30s
                    setTimeout(() => {
                        if (this.parseFlag == true) {
                            this.interval1 = setInterval(() => {
                                //通过方案ID查询一个方案信息
                                GetModelBasicById(param).then((res) => {
                                    console.log("计时器里的parameter", param);
                                    this.modelStepPanduan = res.result.modelBasicEntity.modelSubmitNum;

                                    //解析文件问题提醒
                                    if (this.modelStepPanduan === -1) {
                                        setTimeout(() => {
                                            this.$message.error("解析 小层 文件有误！请修改后上传！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -2) {
                                        setTimeout(() => {
                                            this.$message.error("解析 fegrid 文件、schedule 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -3) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .F 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -4) {
                                        setTimeout(() => {
                                            this.$message.error("解析 summery 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -5) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -6) {
                                        setTimeout(() => {
                                            this.$message.error("解析 summery 文件、小层 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -7) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、小层 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -8) {
                                        setTimeout(() => {
                                            this.$message.error("解析 fegrid 文件、schedule 文件、summery 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -9) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、fegrid 文件、schedule 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -10) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .F 文件、summery 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                    if (this.modelStepPanduan == -11) {
                                        setTimeout(() => {
                                            this.$message.error("解析 .A 文件、.F 文件有误！");
                                            this.fileParseLoading = false;
                                        }, 3000);
                                    }
                                });
                                if (this.modelBasicInfo.modelSubmitNum == this.modelStepPanduan) {
                                    this.getCaseId(this.modelBasicInfo.modelBasicId);
                                    //console.log('0000011111222233333', this.modelBasicInfo.modelSubmitNum < this.modelStepPanduan)
                                    clearInterval(this.interval1);
                                    this.aa();
                                    this.fileParseLoading = false;
                                    this.submitFlag = this.submitFlag + 1;
                                }
                                console.log("this.modelStepPanduan", this.modelStepPanduan);
                            }, 30 * 1000);
                        } else {
                            this.aa();
                            console.log("调用子组件方法结束");
                            this.fileParseLoading = false;
                        }
                    }, 1000);

                    this.modelDialogVisibleA = false;
                    this.zhezhao = false;
                } else {
                    this.modelDialogVisibleA = true;
                    this.zhezhao = true;
                }
            }, 1000);
        },
        //调控参数按钮
        lookParam() {
            console.log('123456789',this.regulateParams)
            this.regulateParams = true;
            // this.ModelYunSuan = false;
            console.log('hhhhhhhhhhhhhhhhhhh',this.regulateParams)
            // this.$nextTick(() => {
            //   this.$refs.paramChild.lookParamChild();
            // });
            const param = {
                modelBasicId: this.modelBasicId
            }
            GetRegulationList(param).then(res => {
                this.tableListOne = res.result.regulationBlockList;
                this.tableListTwo = res.result.regulationWaterWellList;
                this.tableListThree = res.result.regulationOilWellList;
                console.log('shibaile')
            }).catch(err => {
                console.log(err)
            });
        },
        //取消制度下载dialog
        cancel() {
            this.$refs.preWater.clearFilter();
            this.$refs.preInj.clearFilter();
            this.dialogVisible = true;
            this.dialogFormVisible = false;
            this.zhezhao = true;
        },
        //取消制度下载第二层dialog
        cancel1() {
            this.dialogVisible = true;
            this.dialogReal = false;
            this.zhezhao = true;
        },
        submit1() {
            this.$refs.preWater.transData();
            this.$refs.preInj.transData();
            this.preInjdata = this.$refs.preWater.prodListTable1;
            this.pretData = this.$refs.preInj.prodListTable2;
            this.preInjdata1 = this.$refs.preWater.prodListTable3;
            this.pretData1 = this.$refs.preInj.prodListTable4;
            console.log("1111", this.preInjdata);
            console.log("22222", this.pretData);
            console.log("3333", this.preInjdata1);
            console.log("4444", this.pretData1);
            console.log("pt", this.$attrs.chooseAllData);
            const wellData = {
                modelBasicId: this.modelBasicId,
                injVos: this.pretData,
                prodVos: this.preInjdata,
            };
            console.log(this.modelBasicId);
            console.log("西撒在", wellData);
            GetupdateSchedule(wellData).then((res) => {
                console.log(res);
            });
        },

        selectItem(rows) {
            if (rows.length > 1) {
                const newRows = rows.filter((it, index) => {
                    if (index == rows.length - 1) {
                        this.$refs.multipleTable.toggleRowSelection(it, true);
                        return true;
                    } else {
                        this.$refs.multipleTable.toggleRowSelection(it, false);
                        return false;
                    }
                });
                this.multipleSelection = newRows;
            } else {
                this.multipleSelection = rows;
                console.log("selectItem", rows);
            }
            // this.userId = this.multipleSelection.length? this.multipleSelection[0].guid: "";
            console.log("2", this.multipleSelection);
        },
        onSelectOp(row) {
            this.$refs.multipleTable.clearSelection();
            this.multipleSelection = row;
            console.log("onSelectOp", this.multipleSelection);
        },
        //模型运行
        Fupload() {
            console.log("111111111111");
            if (this.multipleSelection.length < 1) {
                this.$message.warning("请选择一个.F文件进行解析");
            } else {
                this.cardtable = false;
                this.zhezhao = true;
                this.showcard = true;
                console.log("111111", this.multipleSelection[0].modelFileAttributeId);
                //传参
                const param = {
                    modelBasicId: this.modelBasicInfo.modelBasicId,
                    modelFileAttributeId: this.multipleSelection[0].modelFileAttributeId,
                };
                //请求后台接口
                GetmodelExec(param)
                    .then((res) => {
                        this.modelData = res.message;
                        console.log(res);
                        if (res.code === 0) {
                            this.showcard = false;
                            this.showChange1 = true;
                            //控制card显示时间
                            setTimeout(() => {
                                this.showChange1 = false;
                                this.zhezhao = false;
                            }, 2000);
                        } else {
                            this.showcard = false;
                            this.showChange1 = true;
                            setTimeout(() => {
                                this.showChange1 = false;
                                this.zhezhao = false;
                            }, 2000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                this.modelBasicInfo.isModelRun = 1;
                this.modelBasicInfo.modelRun = this.modelBasicInfo.modelRun + 1;
            }
        },
        zoomOutComNew(ismax){
            this.$refs.surplusOil.ismax(ismax)
        },
        //模型测试
        getRunModelTest() {
            this.cardtable = true;
            this.zhezhao = true;
            //传参
            const param = {
                modelBasicId: this.modelBasicInfo.modelBasicId,
            };
            GetModelfList(param).then((res) => {
                this.tableData1 = res.result.modelfList;
                console.log(this.tableData1);
                this.$nextTick(() => {
                    console.log("11111111111", this.tableData1[0]);
                    this.$refs.multipleTable.toggleRowSelection(this.tableData1[0], true);
                });

                console.log(this.tableData1[0]);
            });
            // setTimeout(() => {
            //
            // }, 100)

            // this.showChange1 = false;
            // this.zhezhao = true;
        },
        //预测接口请求
        predictDownloadTable() {
            this.zhezhao = false;
            this.dialogFormVisible = true;
            this.dialogVisible = false;
            const param = {
                modelBasicId: this.modelBasicId,
            };
            GetSchedule(param).then((res) => {
                this.tableData = res.result.injList;
                this.prodList = res.result.prodList;
                this.tStep = res.result.tStepList;
                console.log("-----------", res);
                console.log('xiazaiyucezhidudeshujushishen',res.result.injList)
            });
        },
        //实际接口请求
        realDownloadTable() {
            this.zhezhao = false;
            this.dialogReal = true;
            this.dialogVisible = false;
            nextTick(() => {
                this.$refs.prodRealList.DownloadTable();
                this.$refs.injRealList.DownloadINjTable();
            });
        },
        //下载实际制度
        downLoadRealFile() {
            this.zhezhao = false;
            const param = {
                modelBasicId: this.modelBasicId,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            DownloadFile(param).then((res) => {
                const url = window.URL.createObjectURL(res);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Bschedule.dat";
                // 将 a 标签添加到 DOM 中，并模拟点击，触发浏览器的下载功能
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
        },
        //sch文件下载
        schDownload() {
            this.zhezhao = true;
            this.dialogVisible = true;
            //再次打开文件下载，开始时间，结束时间设为空
            this.startDate = "";
            this.endDate = "";
            //this.disable = true
        },
        enter() {
            this.$refs.preWater.transData();
            this.$refs.preInj.transData();
            this.preInjdata = this.$refs.preWater.prodListTable1;
            this.pretData = this.$refs.preInj.prodListTable2;
            this.preInjdata1 = this.$refs.preWater.prodListTable3;
            this.pretData1 = this.$refs.preInj.prodListTable4;
            // console.log("1111", this.preInjdata);
            // console.log("22222", this.pretData);
            console.log("3333", this.preInjdata1);
            console.log("4444", this.pretData1);
            //tooltip

            if (this.preInjdata1.length > 0 && this.pretData1.length > 0) {
                for (let i = 0; i < this.preInjdata1.length; i++) {
                    for (let j = 0; j < this.pretData1.length; j++) {
                        console.log(this.preInjdata1[i].timeStep);
                        console.log(this.pretData1[j].timeStep);
                        if (this.preInjdata1[i].tstep !== this.pretData1[j].tstep) {
                            setTimeout(() => {
                                this.$message.warning("请选择相同的时间步数据下载");
                            }, 1);
                            console.log("tool111111111");
                            return;
                        }
                    }
                }
                this.submit();
            } else {
                this.$message.warning("请选择WCONPROD和WCONINJE表格数据下载");
            }
            this.$refs.preWater.clearFilter();
            this.$refs.preInj.clearFilter();
        },
        // 提交修改参数 + 预测
        submit() {
            //调用子组件方法
            this.$refs.preWater.transData();
            this.$refs.preInj.transData();
            this.preInjdata = this.$refs.preWater.prodListTable1;
            this.pretData = this.$refs.preInj.prodListTable2;
            this.preInjdata1 = this.$refs.preWater.prodListTable3;
            this.pretData1 = this.$refs.preInj.prodListTable4;
            console.log("1111", this.preInjdata);
            console.log("22222", this.pretData);
            console.log("3333", this.preInjdata1);
            console.log("4444", this.pretData1);

            let prodContent = "WCONPROD" + "\n";
            let injContent = "WCONINJE" + "\n";
            let content = "";
            for (let i = 0; i < this.preInjdata1.length; i++) {
                prodContent =
                    prodContent +
                    "'" +
                    this.preInjdata1[i].wellName +
                    "'" +
                    "    " +
                    this.preInjdata1[i].status +
                    "    " +
                    this.preInjdata1[i].ctrlMode +
                    "    " +
                    this.preInjdata1[i].defaultValue +
                    "    " +
                    this.preInjdata1[i].maxProd +
                    " /" +
                    "\n";
            }
            for (let i = 0; i < this.pretData1.length; i++) {
                injContent =
                    injContent +
                    "'" +
                    this.pretData1[i].wellName +
                    "'" +
                    "    " +
                    this.pretData1[i].injType +
                    "    " +
                    this.pretData1[i].status +
                    "    " +
                    this.pretData1[i].ctrlMode +
                    "    " +
                    this.pretData1[i].maxInj +
                    "    " +
                    this.pretData1[i].defaultValue +
                    " /" +
                    "\n";
            }
            let tstep = "TSTEP" + "\n" + this.preInjdata1[0].timeStep;
            content = prodContent + "/\n\n" + injContent + "/\n" + tstep + "\n" + "/";
            console.log(content);
            var date = new Date();
            const year = date.getFullYear();
            const file = document.createElement("a");
            let blob = new Blob([content], { type: "application/vnd.ms-dat" });
            file.download = "Fschedule" + year + ".dat";
            file.href = URL.createObjectURL(blob);
            // file.href=fileUrl;
            file.target = "_blank";
            file.style.display = "none";
            document.body.appendChild(file);
            file.click();
            window.URL.revokeObjectURL(file.href);
            document.body.removeChild(file);
        },
        
        
        //数据上传代码结束

        //调控参数部分代码

        //调控参数代码结束

        //模型运行部分代码

        //模型运行代码结束

        //预测方案部分代码

        //预测方案代码结束

        //结果上传部分代码

        //结果上传代码结束
    }
    
}
</script>

<style scoped>
.modelManagerClass {
    position: absolute;
    top: 0px;
    left: 3px;
    height: 100%;
    width: 102%;
    border: 0px !important;
}
/* 数据上传dialog样式 */
.dialogUpload {
    
}
::v-deep .el-dialog__title {
    line-height: 20px;
    font-size: 16px !important;
    color: white !important;
}





::v-deep .el-table__header-wrapper .cell {
    height: 30px !important;
    font-size: 15px !important;
    transform: translateY(5px);
}

/* 弹出层设置背景色  头部 */
::v-deep .el-dialog__header {
    text-align: center;
    border: #136f93 0px solid !important;
    border-bottom: 0;
    margin-top: 0px;
    background: transparent !important;
}

::v-deep .no-header-dialog .el-dialog__header {
    display: none;
}

::v-deep .el-dialog__body {
    /*background-color: #ffffff !important;*/
    /*background-color: transparent !important;*/
    background: linear-gradient(#0484ae, #042e4d) !important;
    border: #136f93 0px solid;
    border-top: 0;
    height: 520px !important;
}

::v-deep .el-dialog__footer {
    border: #136f93 1px solid;
    border-top: 0;
}
/* 预测 */
.dialogUploadPredict {
    position: absolute;
    top: 40px;
    
}
::v-deep .el-dialog__title {
    line-height: 20px;
    font-size: 16px;
    color: white;
}

::v-deep .el-dialog {
    background: linear-gradient(#0484ae, #042e4d) !important;
}

::v-deep .el-upload--text {
    border: none !important;
}

/* 弹出层设置背景色  头部 */
::v-deep .el-dialog__header {
    text-align: center;
    background: transparent !important;
    border: #136f93 1px solid;
    border-bottom: 0;
    margin-top: 0px;
}

::v-deep .el-dialog__header .el-icon-close {
    margin-top: 15px;
}

::v-deep .el-table__header-wrapper .cell {
    height: 30px !important;
    font-size: 14px !important;
    transform: translateY(5px);
}

::v-deep .el-dialog__body {
    background-color: transparent !important;
    border: none;
    border-top: 0;
    height: 140px;
}

::v-deep .el-dialog__footer {
    border: #136f93 1px solid;
    border-top: 0;
}
</style>