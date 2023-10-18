<template>
    <div style="height: 100%" >
        <el-row v-loading="fileParseLoading" element-loading-text="加载中"
                element-loading-background="rgba(0, 40, 80, 0.7)"
                style=" left: -20px; top: -15px; border: none !important;height: 100%">
            <!-- 模型管理  油藏优化模型 -->
            <el-card class="modelManagerClass" v-show="modelManagerDialog" style="height: 100%;">
                <el-button type="primary" @click="returnMainScreen" 
                           style="position: absolute;top: 10px;left:1510px;z-index: 10">返回主界面</el-button>
                <modelManager ref="modelManager" 
                              @fatherMethod="getResultCaseId"></modelManager>
            </el-card>
            <!-- 模型运算界面 优化方案区块指标和剩余油分布图 + 模型代码 -->
            <div v-show="ModelYunSuan" style="height: 100%">
                <!-- 五个按钮 -->
                <el-row>
                    <el-button size="small" type="primary" @click="modelManager">模型管理</el-button>
                    <el-button size="small" type="primary" @click="modelUpload">数据上传</el-button>
                    <el-button size="small" type="primary" @click="lookParam" :disabled="this.modelBasicInfo.modelStep == 0 ? true : false">调控参数</el-button>
                    <div style="float: right;margin-right: -40px;">
                        <el-button size="small" type="primary" @click="getRunModelTest">模型运行</el-button>
                        <el-button size="small" type="primary" @click="schDownload">预测方案</el-button>
                        <el-button size="small" type="primary" @click="resultUpload" :disabled="this.modelBasicInfo.modelStep == 0 ? true : false">结果上传</el-button>
                    </div>
                    <el-image :src="require('@/icons/svg/bj.png')" style="width: 102.5%; height: 20px"></el-image>
                    <div style="z-index: 3;color: #40c2d4; text-align: center; margin-top: -48px;
                            margin-left: 280px; font-size: 22px;"> 模型运算 </div>
                </el-row>
                <!--  解析文件Loading + echarts图表 + 剩余油分布图  -->
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
            <!-- 1、上传历史阶段文件dialog -->
            <div>
                <el-dialog title="上传历史阶段文件" 
                           :visible.sync="modelDialogVisibleF" width="47%"
                           style="position: absolute; top: -25px">
                    <fileUpload ref="fileChild" :modelBasicId="modelBasicId" @aa="aa" @parseSureButtonTrue="parseSureButtonTrue"
                                @parseSureButtonFalse="parseSureButtonFalse">
                    </fileUpload>
                    <el-row style="text-align: center;float: right;line-height: 50px">
                        <el-button @click="sureClickAfter" size="small" :disabled="parseSureButton" type="primary">确 定</el-button>
                        <el-button @click="closeDialogF" size="small" :disabled="parseSureButton" type="primary">取 消</el-button>
                    </el-row>
                </el-dialog>
            </div>
            <!-- 2、上传预测阶段文件dialog -->
            <div>
                <el-dialog title="上传预测阶段文件" :close-on-click-modal="false" :show-close="false"
                           :visible.sync="modelDialogVisibleA" width="45%"
                           style="position: absolute; top: -380px">
                    <fileUploadPredict ref="fileChildPredict" :modelBasicId="modelBasicId" @aa="aa"
                                       @parseSureButtonTrue="parseSureButtonTrue" @parseSureButtonFalse="parseSureButtonFalse">
                    </fileUploadPredict>
                    <el-row style="text-align: center; float: right;line-height: 50px">
                        <el-button type="primary" @click="sureClickAfterA" size="small" :disabled="parseSureButton">确 定</el-button>
                        <el-button type="primary" @click="closeDialogA" size="small" :disabled="parseSureButton">取 消</el-button>
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
                            <el-table height="calc(100% - 10px)" :data="tableListOne">
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
                            <el-table :data="tableListTwo" height="calc(100% - 10px)">
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
                            <el-table :data="tableListThree" height="calc(100% - 10px)">
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
            <!-- 模型运行dialog表格card -->
            <el-dialog style="margin-top: 120px"
                title="模型运行文件"
                :visible.sync="cardtable"
                width="40%"
                :close-on-click-modal="false">
                <el-table ref="multipleTable"  :data="tableData1" height="450"
                          @selection-change="selectItem">
                    <el-table-column type="selection" align="center" />
                    <el-table-column label="日期" prop="inputDate" align="center" />
                    <el-table-column label=".F文件名称" prop="fileName"  align="center" />
                    <el-table-column label="文件阶段类型" prop="fileVersion" align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.fileVersion == '0'">历史状态</span>
                            <span v-show="scope.row.fileVersion == '1'">优化状态</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row style="float: right;line-height:60px;margin-top: 5px">
                    <el-button @click="Fupload" type="primary">确定</el-button>
                    <el-button @click=" cardtable = false" type="primary">取消</el-button>
                </el-row>
            </el-dialog>
            <!-- 运行过程 loading -->
            <el-card v-show="showcard" 
                     style="height: 100%;width: 102.5%;position: absolute;top: 0px;background-color: rgba(0, 40, 80, 0.7);z-index: 111;border: 0px">
                <div v-loading="loading" element-loading-text="模型运行中，请稍后" style="margin-top:300px;"></div>
            </el-card>
            <!-- 运行成功card -->
            <el-dialog title="模型运行结果" :show-close="false" :visible.sync="showChange1"  :close-on-click-modal="false" :modal-append-to-body="false"
                       style="width: 50%;position: absolute;top: -200px;left: 410px">
                <div ref="card" style="text-align:center;height: 60px">
                    <p style="font-size:22px;color:white;margin-top: 50px">{{ modelData }}</p>
                </div>
            </el-dialog>
            <!-- 制度下载dialog  class="DialogStyle"-->
            <el-dialog title="预测方案下载" custom-class="no-header-dialog" :show-close="false" :visible.sync="dialogVisible" width="21%"
                           ref="outDialog" :close-on-click-modal="false" :modal-append-to-body="false">
                <el-row style="line-height: 50px">
                    <span style="color: white; font-size: 16px">开始时间 : </span>
                    <el-date-picker v-model="startDate" type="date" value-format="yyyy-MM-dd" 
                                    placeholder="年/月/日" @change="clearDateDisable"
                                    popper-class="elDatePicker">
                    </el-date-picker>
                </el-row>
                <el-row style="line-height: 50px">
                    <span style="color: white; font-size: 16px">结束时间 : </span>
                    <el-date-picker  v-model="endDate" type="date" placeholder="年/月/日"
                                     value-format="yyyy-MM-dd" @change="clearDateDisable"
                                     popper-class="elDatePicker">
                    </el-date-picker>
                </el-row>
                <el-row class="footer" style="line-height: 50px;float: right">
                    <el-button type="primary" @click="predictDownloadTable">
                            下载预测制度
                        </el-button>
                    <el-tooltip class="item" effect="dark" content="请选择时间" placement="top-start">
                        <el-button type="primary" @click="realDownloadTable">下载实际制度</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click=" dialogVisible = false">取 消
                    </el-button>
                </el-row>
            </el-dialog>
            <!-- 下载预测制度 -->
            <el-dialog title="下载预测制度" custom-class="no-header-dialog" :show-close="false" :visible.sync="dialogFormVisible" 
                          :close-on-click-modal="false" width="100%" style="height: 100%">
                <el-row type="flex" justify="space-between" :gutter="10">
                    <el-col :span="12">
                        <pagePanel headerTitle="WCONPROD" :show-btn="true"
                                   style="height: calc(100% - 10px)">
                            <predictTableWater :prodListTable="prodList" :tStep="tStep" :submit1="submit1" ref="preWater">
                            </predictTableWater>
                        </pagePanel>
                    </el-col>
                    <el-col :span="12">
                        <pagePanel headerTitle="WCONINJE" :show-btn="true"
                                   style="height: calc(100% - 10px)">
                            <predictTableInj :tStep="tStep" :submit1="submit1" :chooseAllData="tableData"
                                             ref="preInj"></predictTableInj>
                        </pagePanel>
                    </el-col>
                </el-row>                    
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-button type="primary"
                                   @click="showTable" style="margin-left: 10px">显示图片</el-button>
                        <!-- <el-tooltip class="item" effect="dark" content="请选择相同的时间步进行下载"
                        placement="top-start"> -->
                        <span @click="enter()">
                            <el-button :disabled="tooltipdiabled" type="primary" style="margin-left: 10px">下载</el-button>
                        </span>
                        <el-button type="primary" :disabled="tooltipdiabled" style="margin-left: 10px" @click="cancel">取 消</el-button>
                    </el-row>
                </div>
                <!-- 显示折线图 -->
                <el-card v-show="dialogVisiblePicture" style="width: 50%; height: 70%;position: absolute;top: 140px;left:500px;background-color: rgba(5,52,73,0.8);">
                    <span style="color:white;font-size:16px;margin-right: 10px">请选择优化时间:</span>
                    <!--选择框-->
                    <el-select class="radioselect" v-model="falutName" :popper-append-to-body="false"
                               @change="changeSelectImage($event, item)">
                        <el-option v-for="item in pictureOption" :key="item.pictureOption" :label="item.stepTime"
                                   :value="item.fileStepId">
                        </el-option>
                    </el-select>
                    <!--   放置echarts       -->
                    <Echart :chart-data="echartsListaa" height="100%" width="100%" style="height: 100% !important;margin-top: 20px"></Echart>
                    <el-button @click="close" type="primary" style="float: right">取 消</el-button>
                </el-card>
                </el-dialog>
            <!-- 下载实际制度 -->
            <el-dialog title="下载实际制度" custom-class="no-header-dialog" :show-close="false" :visible.sync="dialogReal" width="100%"
                            :close-on-click-modal="false" style="height: 100%">
                    <el-row type="flex" justify="space-between" :gutter="15">
                        <el-col :span="12">
                            <pagePanel headerTitle="WCONPROD" :show-btn="true"
                                       style="height: calc(100% - 10px)">
                                <realTableOil :prodRealList="prodRealList" :modelBasicId="modelBasicId" :startDate="startDate"
                                              :endDate="endDate" ref="prodRealList"></realTableOil>
                            </pagePanel>
                        </el-col>
                        <el-col :span="12">
                            <pagePanel headerTitle="WCONINJE" :show-btn="true"
                                       style="height: calc(100% - 10px);">
                                <realTableWater :injRealList="injRealList" :modelBasicId="modelBasicId" :startDate="startDate"
                                                :endDate="endDate" ref="injRealList"></realTableWater>
                            </pagePanel>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="downLoadRealFile" type="primary">下载</el-button>
                        <el-button @click="cancel1" type="primary">取 消</el-button>
                    </div>
                </el-dialog>
        </el-row>
    </div>
</template>

<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
//-组件
import modelManager from "@/pages/rem/intelligence/optimization/modelOperation/modelManager.vue";
import blockIndicators from "@/pages/rem/intelligence/optimization/modelOperation/modelRun/blockIndicators.vue";
import surplusOil from "@/pages/rem/intelligence/optimization/modelOperation/modelRun/surplusOil.vue";
import fileUpload from "@/pages/rem/intelligence/optimization/modelOperation/modelUpload/fileUpload.vue"
import fileUploadPredict from "@/pages/rem/intelligence/optimization/modelOperation/modelUpload/fileUploadPredict.vue"
import predictTableInj from "@/pages/rem/intelligence/optimization/modelOperation/predictTable/predictTableInj.vue";
import predictTableWater from "@/pages/rem/intelligence/optimization/modelOperation/predictTable/predictTable.vue";
import realTableOil from "@/pages/rem/intelligence/optimization/modelOperation/realTable/realTableOil.vue";
import realTableWater from "@/pages/rem/intelligence/optimization/modelOperation/realTable/realTableWater.vue";
//-接口
import {
    GetModelBasicById,
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
    components:{
        Echart,
        modelManager,
        blockIndicators,
        surplusOil,
        fileUpload,
        fileUploadPredict,
        predictTableInj,
        predictTableWater,
        realTableOil,
        realTableWater,
    },
    data(){
        return{
            modelId:'',
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
        this.getCaseId()
    },
    methods: {
        //进入页面之后调用“获取最新方案”的方法
        //但是，查看结果和创建新的方案不能调用“获取最新方案”方法
        //需要判断id到底是哪里过来的，进而更新modelBasicInfo
        //创建新的方案和查看结果都需要传id，一共两个id
        //三个
        getCaseId(){
            var flag = this.modelId
            console.log('flag',flag)
            if(flag != undefined){
                this.getResultCaseId(flag)
            }
            else {
                this.getCaseByMax()
                console.log('获取最新方案')
            }
        },
        //接收模型管理页面传过来的id
        getResultCaseId(id) {
            this.modelId = id
            //通过caseId获取一条方案信息
            const param = {
                modelBasicId: id
            }
            //通过方案ID查询一个方案信息
            GetModelBasicById(param).then(res => {
                this.modelBasicId = res.result.modelBasicEntity.modelBasicId;
                this.modelBasicInfo.modelBasicId = res.result.modelBasicEntity.modelBasicId
                this.modelBasicInfo.modelStep = res.result.modelBasicEntity.modelStep
                this.modelBasicInfo.modelCode = res.result.modelBasicEntity.modelCode;
                this.modelBasicInfo.isModelRun = res.result.modelBasicEntity.isModelRun
                this.modelBasicInfo.fileNum = res.result.modelBasicEntity.fileNum
                this.modelBasicInfo.modelSubmitNum = res.result.modelBasicEntity.modelSubmitNum;
                this.modelBasicInfo.modelRun = res.result.modelBasicEntity.modelRunNum;
                console.log("方案idmodelrun", this.modelBasicInfo.modelRun)
            }).catch(err => {
                console.log(err)
            });
            this.ModelYunSuan = true
            this.modelManagerDialog = false
        },
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
                    // this.modelBasicInfo.modelRun = res.result.modelBasicEntity.modelRunNum;
                    console.log("智能配注modelrun", res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        
        // 模型管理页面返回主界面
        returnMainScreen(){
            this.modelManagerDialog = false
            this.ModelYunSuan = true
            this.getCaseByMax()
        },
        //表格单位换行
        renderHeader(h, { column }) {
            return h("span", {}, [
                h("span", {}, column.label.split("//")[0]),
                h("br"),
                h("span", {}, column.label.split("//")[1]),
            ])
        },
        //解析文件按钮禁用
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
                this.echartsListaa = this.echartsListaa
            });
        },
        changeSelectImage(item) {
            this.pictureArray = [];
            for (let index = 0; index < this.pictureOption.length; index++) {
                if (item == this.pictureOption[index].fileStepId) {
                    //画图数据
                    this.pictureArray = this.pictureOption[index].schedulePictureList;
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
        //点击模型管理按钮
        modelManager() {
            this.modelManagerDialog = true;
            this.ModelYunSuan = false
        },
        closeDialogF() {
            // this.zhezhao = false;
            this.modelDialogVisibleF = false;
            this.$nextTick(() => {
                this.$refs.fileChild.changeFileList();
            });
        },
        closeDialogA() {
            // this.zhezhao = false;
            this.modelDialogVisibleA = false;
            this.$nextTick(() => {
                this.$refs.fileChildPredict.changeFileListA();
            });
        },
        //模型上传按钮——控制文件上传前||后
        modelUpload() {
            // this.zhezhao = true;
            this.modelDialogVisibleF = true;
            console.log("modelStep", this.modelBasicInfo.modelStep);
            this.$nextTick(() => {
                this.$refs.fileChild.modelUploadChildF();
            });
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
                    // this.zhezhao = false;
                } else {
                    this.modelDialogVisibleF = true;
                    // this.zhezhao = true;
                }
            }, 1000);
        },
        //调用子组件方法
        aa() {
            setTimeout(() => {
                this.$refs.blockIndicators.run();
                this.$refs.surplusOil.run();
            }, 1000);
        },
        //结果上传 -------------------------------------------------------------------------
        resultUpload() {
            // this.zhezhao = true;
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
                    // this.zhezhao = false;
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
            // this.zhezhao = true;
        },
        //取消制度下载第二层dialog
        cancel1() {
            this.dialogVisible = true;
            this.dialogReal = false;
            // this.zhezhao = true;
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
                // this.zhezhao = true;
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
                                // this.zhezhao = false;
                            }, 2000);
                        } else {
                            this.showcard = false;
                            this.showChange1 = true;
                            setTimeout(() => {
                                this.showChange1 = false;
                                // this.zhezhao = false;
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
            // this.zhezhao = true;
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
            // this.zhezhao = false;
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
            // this.zhezhao = false;
            this.dialogReal = true;
            this.dialogVisible = false;
            this.nextTick(() => {
                this.$refs.prodRealList.DownloadTable();
                this.$refs.injRealList.DownloadINjTable();
            });
        },
        //下载实际制度
        downLoadRealFile() {
            // this.zhezhao = false;
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
            // this.zhezhao = true;
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

</style>