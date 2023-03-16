<template>
    <el-container class="layout">
        <el-header height="auto">
            <div class="titleBox">
                <span class="title">措施效果跟踪</span>
                <el-button type="primary" class="fr" @click="switchToBack">返回</el-button>
            </div>
        </el-header>
        <el-main class="mt-4">
            <el-row :gutter="20" style="height: 240px;">
                <el-col :span="24">
                    <NormalCard title="" height="220px" class="svg">
                        <el-table v-show="type == 0" highlight :data="oilWellTableData" style="width: 100%"
                            height="190">
                            <el-table-column type="index" align="center" width="60" label="序号">
                            </el-table-column>
                            <el-table-column prop="wellNo" align="center" label="井号" width="160">
                            </el-table-column>
                            <el-table-column prop="beginDate" align="center" label="措施开始日期" width="110px">
                            </el-table-column>
                            <el-table-column prop="endDate" align="center" label="措施结束日期" width="110px">
                            </el-table-column>
                            <el-table-column align="center" label="措施前生产情况">
                                <el-table-column align="center" label="日产液 m³/d" width="80" prop="bmLiquidDaily">
                                    <!-- <template slot-scope="scope">
                    <span>{{ scope.row.bmLiquidDaily ? scope.row.bmLiquidDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="日产油 m³/d" width="80" prop="bmOilDaily">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.bmOilDaily ? scope.row.bmOilDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="含水率 %" width="80" prop="bmWaterCut">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.bmWaterCut ? scope.row.bmWaterCut : '-' }}</span>
                  </template>-->
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="措施效果">
                                <el-table-column align="center" label="当日日增油 m³/d" :render-header="renderHeader"
                                    width="120" prop="incOilDaily">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.incOilDaily ? scope.row.incOilDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="累增油 m³" min-width="100" prop="sumOilDaily">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.sumOilDaily ? scope.row.sumOilDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column prop="days" align="center" label="增产有效期 d" width="110">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.days ? scope.row.days : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column prop="geoDesignOilDaily" align="center" label="地质设计日增油 m³/d"
                                    :render-header="renderHeader" width="120">
                                </el-table-column>
                                <el-table-column prop="avgOilDaily" align="center" label="平均日增油 m³/d"
                                    :render-header="renderHeader" width="120">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="地质设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.geoDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.geoDesg,scope.row.geoDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="工艺设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.oprgProcDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.oprgProcDesg,scope.row.oprgProcDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="施工设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.oprgDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.oprgDesg,scope.row.oprgDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table v-show="type == 1" highlight :data="waterWellTableData" style="width: 100%"
                            height="180">
                            <el-table-column type="index" align="center" width="60" label="序号">
                            </el-table-column>
                            <el-table-column prop="wellNo" align="center" label="井号" width="160">
                            </el-table-column>
                            <el-table-column prop="beginDate" align="center" label="措施开始日期" min-width="110px">
                            </el-table-column>
                            <el-table-column prop="endDate" align="center" label="措施结束日期" min-width="110px">
                            </el-table-column>
                            <el-table-column align="center" label="措施前注入情况" min-width="100">
                                <el-table-column align="center" label="日注水量 m³/d" min-width="100" prop="bmInjWater">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.bmInjWater ? scope.row.bmInjWater : '-' }}</span>
                  </template>-->
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="措施效果">
                                <el-table-column prop="injDaily" align="center" label="当日日增注 m³/d" min-width="100">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.injDaily ? scope.row.injDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="累增注 m³" min-width="100" prop="sumInjDaily">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.sumInjDaily ? scope.row.sumInjDaily : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="增注有效期 d" min-width="100" prop="days">
                                    <!--<template slot-scope="scope">
                    <span>{{ scope.row.days ? scope.row.days : '-' }}</span>
                  </template>-->
                                </el-table-column>
                                <el-table-column align="center" label="地质设计日配注 m³/d" min-width="120"
                                    prop="geoDesignInjDaily">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="地质设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.geoDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.geoDesg,scope.row.geoDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="工艺设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.oprgProcDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.oprgProcDesg,scope.row.oprgProcDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="施工设计" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.oprgDesg" class="chicked">
                                        <el-button type="text"
                                            @click="switchToPlan(scope.row.oprgDesg,scope.row.oprgDesgSl)"
                                            :disabled="!canDownload">方案查看
                                        </el-button>
                                    </div>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </NormalCard>
                </el-col>
            </el-row>
            <el-row class="mt-4" v-if="type == 0" style="height: 50px;">
                <el-radio-group v-model="oilTabType" @change="doSearchCharts">
                    <el-radio-button label="0" name="油井日度曲线">油井日度曲线</el-radio-button>
                    <el-radio-button label="1" name="油井实时曲线">油井实时曲线</el-radio-button>
                    <el-radio-button label="2" name="虚拟计量曲线">虚拟计量曲线</el-radio-button>
                    <el-radio-button label="3" name="化验数据">化验数据</el-radio-button>
                </el-radio-group>
            </el-row>
            <el-row class="mt-4" v-if="type == 1" style="height: 50px;">
                <el-radio-group v-model="waterTabType" @change="doSearchCharts">
                    <el-radio-button label="0" name="水井日度曲线">水井日度曲线</el-radio-button>
                    <el-radio-button label="1" name="水井实时曲线">水井实时曲线</el-radio-button>
                </el-radio-group>
            </el-row>
            <el-row class="mt-4" v-if="type == 0">
                <NormalCard title="" v-if="oilTabType == '0'">
                    <div>
                        <span>日期</span>
                        <el-date-picker v-model="selectData" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <el-button @click="doSearchCharts">检索</el-button>
                    </div>
                    <Echarts :chart-data="oilOption" height="480px"></Echarts>
                </NormalCard>
                <NormalCard title="" v-else-if="oilTabType == '1'">
                    <span>日期：</span>
                    <el-date-picker v-model="dateDetail" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
                        @change="createChange">
                    </el-date-picker>
                    <el-button icon="el-icon-search" style="margin-left: 10px" type="primary" @click="doSearchCharts">检索
                    </el-button>
                    <el-row v-for="(item,index) in checkList.filter(item=>{return item.isRealTime == 0})" :key="index">
                        <div style="width: 100px;display: inline-block;"><span>{{item.paramName}}</span></div>
                        <el-checkbox-group v-model="queryParams.paramCodes" style="display: inline-block">
                            <el-checkbox v-for="(it, i) in item.childParams" :key="i" :label="it.paramCode"
                                style="color: #ffffff" @change="isDisabled">{{ it.paramName }}</el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                    <el-scrollbar style="height: 460px">
                        <Echarts :chart-data="optionRealData" style="height: 460px"></Echarts>
                    </el-scrollbar>
                </NormalCard>
                <NormalCard title="" v-else-if="oilTabType == '2'">
                    <div>
                        <span>日期</span>
                        <el-date-picker v-model="selectDateTime" type="datetime" placeholder="选择日期时间"
                            format="yyyy-MM-dd hh:mm">
                        </el-date-picker>
                        <el-button @click="doWellFluxLastDayHour">检索</el-button>
                    </div>
                    <Echarts :chart-data="oilOption2" height="480px"></Echarts>
                </NormalCard>
                <NormalCard title="" v-else-if="oilTabType == '3'">
                    <el-table :data="chemicalTableData" highlight style="width: 100%" height="480">
                        <el-table-column label="序号" align="center" header-align="center" type="index"></el-table-column>
                        <el-table-column label="日期" prop="startTime" align="center" header-align="center">
                        </el-table-column>
                        <el-table-column label="含水" prop="waterCut" align="center" header-align="center">
                        </el-table-column>
                        <el-table-column label="含砂" prop="sand" align="center" header-align="center"></el-table-column>
                        <el-table-column label="备注" prop="remark" align="center" header-align="center">
                        </el-table-column>
                    </el-table>
                </NormalCard>
            </el-row>
            <el-row class="mt-4" v-if="type == 1">
                <NormalCard title="" v-if="waterTabType == '0'">
                    <div>
                        <span>日期</span>
                        <el-date-picker v-model="selectData" type="datetimerange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <el-button @click="doSearchCharts">检索</el-button>
                    </div>
                    <Echarts :chart-data="waterOption" height="480px"></Echarts>
                </NormalCard>
                <NormalCard title="" v-if="waterTabType == '1'">
                    <div>
                        <span>日期</span>
                        <el-date-picker v-model="selectRealData" type="datetimerange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <el-button @click="doSearchCharts">检索</el-button>
                    </div>
                    <Echarts :chart-data="waterRealOption" height="480px"></Echarts>
                </NormalCard>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    import fileSaver from "file-saver";
    import NormalCard from "@/components/oilDeposit/tools/NormalCard";
    import Echarts from "@/components/oilDeposit/tools/Echarts";
    import {fetchMeasureStatInfos} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {uploadFile} from "@/api/oilDeposit/rem-02/primaryinfo";
    import {produceData} from "@/api/oilDeposit/rem-01/dynamicAnalysis";
    import {getDocDownloadUrl} from "@/api/oilDeposit/ipm-01/measuresmanageinfo";
    import {getIntervalWorkConditionDataCurve} from "@/api/oilDeposit/ipm-02/operationmonitor";
    import {getProduceParams,getRealtimeData} from "@/api/oilDeposit/ipm-03/machineprodwellipm";
    import {transformBorepipeNo} from "@/api/oilDeposit/ipm-03/basedata";
    import {wellFluxLastDayHour} from "@/api/oilDeposit/opm/opmData";
    export default {
        components: {
            NormalCard,
            Echarts,
        },
        data() {
            return {
                queryParams: {
                    beginDate: new Date().addDays(-1).format('yyyy-MM-dd'),
                    endDate: new Date().format('yyyy-MM-dd'),
                    companyId: "29053E229AC34E70954249E0F084A20B",
                    platId: "",
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    paramCodes: [
                        "001001",
                        "001002",
                        "001003",
                        "001004",
                        "001005",
                        "001008",
                        "002001",
                        "002002",
                        "002003",
                        "002004",
                        "002005",
                        "002006",
                        "002007",
                        "002008"
                    ],
                    borepipeId: "",
                },
                dateDetail: [new Date().addDays(-1).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')],
                checkList: [],
                realTimeData: [],
                isSelect: 0,
                optionRealData: {},
                defaultTypeList: [
                    ["001001", "001004", "002003", "002002", "003001", "003002", "003003", "003004", "003005",
                        "003006"
                    ],
                    [
                        "001008",
                        "001005",
                        "002004",
                        "002005",
                        "002006",
                        "002007",
                        "003007", "003008", "003009", "003010", "003011", "003012"
                    ],
                    ["002001", "001002", "001003", "002008",
                        "003013", "003014", "003015", "003016", "003017", "003018"
                    ],
                    [
                        "003019", "003020"
                    ]
                ],
                paramsList: [{
                        paramName: "井口温度",
                        paramCode: "001001",
                        unit: "℃"
                    },
                    {
                        paramName: "油压",
                        paramCode: "001002",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "套压",
                        paramCode: "001003",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "运行电压",
                        paramCode: "001004",
                        unit: "V"
                    },
                    {
                        paramName: "运行电流",
                        paramCode: "001005",
                        unit: "A"
                    },
                    {
                        paramName: "运行频率",
                        paramCode: "001008",
                        unit: "Hz"
                    },
                    {
                        paramName: "泵入口压力",
                        paramCode: "002001",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "泵入口温度",
                        paramCode: "002002",
                        unit: "℃"
                    },
                    {
                        paramName: "电机温度",
                        paramCode: "002003",
                        unit: "℃"
                    },
                    {
                        paramName: "漏电电流",
                        paramCode: "002004",
                        unit: "mA"
                    },
                    {
                        paramName: "X震动",
                        paramCode: "002005",
                        unit: "g"
                    },
                    {
                        paramName: "Y震动",
                        paramCode: "002006",
                        unit: "g"
                    },
                    {
                        paramName: "Z震动",
                        paramCode: "002007",
                        unit: "g"
                    },
                    {
                        paramName: "泵出口压力",
                        paramCode: "002008",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "产液量",
                        paramCode: "003001",
                        unit: "m³"
                    },
                    {
                        paramName: "含水率",
                        paramCode: "003002",
                        unit: "%"
                    },
                    {
                        paramName: "产油量",
                        paramCode: "003003",
                        unit: "m³"
                    },
                    {
                        paramName: "日产水",
                        paramCode: "003004",
                        unit: "m³"
                    },
                    {
                        paramName: "日产气量",
                        paramCode: "003005",
                        unit: "10⁴\nm³"
                    },
                    {
                        paramName: "气油比",
                        paramCode: "003006",
                        unit: ""
                    },
                    {
                        paramName: "生产时间",
                        paramCode: "003007",
                        unit: "h"
                    },
                    {
                        paramName: "泵频率",
                        paramCode: "003008",
                        unit: "Hz"
                    },
                    {
                        paramName: "油嘴直径",
                        paramCode: "003009",
                        unit: "%"
                    },
                    {
                        paramName: "泵电压",
                        paramCode: "003010",
                        unit: "kV"
                    },
                    {
                        paramName: "泵电流",
                        paramCode: "003011",
                        unit: "A"
                    },
                    {
                        paramName: "漏电电流",
                        paramCode: "003012",
                        unit: "mA"
                    },
                    {
                        paramName: "泵入口压力",
                        paramCode: "003013",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "泵出口压力",
                        paramCode: "003014",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "油压",
                        paramCode: "003015",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "套压",
                        paramCode: "003016",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "泵入口温度",
                        paramCode: "003017",
                        unit: "℃"
                    },
                    {
                        paramName: "井口温度",
                        paramCode: "003018",
                        unit: "℃"
                    },
                    {
                        paramName: "回压",
                        paramCode: "003019",
                        unit: "M\nP\na"
                    },
                    {
                        paramName: "电机温度",
                        paramCode: "003020",
                        unit: "℃"
                    },
                ],
                //泵工况展示数据
                pumpData: {},
                //泵工况实时数据i
                pumpRealDataI: [],
                //泵工况实时数据j
                pumpRealDataJ: [],
                //泵工况实时数据c
                pumpRealDataC: [],
                //泵工况实时数据h
                pumpRealDataH: [],
                //实时刷新内容存放
                flushDetail: 0,
                //图组类型
                chartDataType: 'real',
                color: [
                    "#1379F7",
                    "#00BC9C",
                    "#9A72FF",
                    "#F5BE43",
                    "#2ACAFF",
                    "#FF30AD",
                    "#FF5844",
                    "#F5FFA3",
                    "#DA835E",
                    "#FC0707",
                ],
                //单选
                radioParam: "",
                //文件列表 现在是单文件 默认是一个文件
                fileList: [],
                //文件解析后内容
                image: '',
                //项目
                project: '',
                page: 1,
                pageSize: 10000,
                pageTotal: 0,
                //油田id
                selectOilField: '',
                //平台id
                selectPlatform: '',
                //井号id
                selectWellId: '',
                //措施id
                selectMeasuresId: '',
                //措施时间
                measuresDate: '',
                //井名 虚拟计量使用
                wellNameNano: '',
                //井名 井管名称
                wellBoreName: '',
                //判断类型（0为油井，1为水井）
                type: 0,
                tableData: [],
                //油井数据内容
                oilWellTableData: [],
                //水井数据内容
                waterWellTableData: [],
                //化验数据
                chemicalTableData: [],
                //选择时间
                selectData: [],
                //选择实时时间
                selectRealData: [],
                //油井折线图内容
                oilOption: {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    /*toolbox: {
                      show : true,
                      feature : {
                        saveAsImage : {
                          name : '油井曲线对比分析',
                          pixelRatio: 15,//值越大分辨率越高,下载的图片越清晰
                          backgroundColor:'#022644'
                        }
                      }
                    },*/
                    grid: [{
                            left: "14%",
                            top: "6%",
                            width: "74%",
                            height: "24%"
                        },
                        {
                            left: "14%",
                            top: "38%",
                            width: "74%",
                            height: "24%"
                        },
                        {
                            left: "14%",
                            top: "66%",
                            width: "74%",
                            height: "24%"
                        },
                    ],
                    xAxis: [{
                            gridIndex: 0,
                            type: "category",
                            data: [
                                "2018-01",
                                "2018-04",
                                "2018-06",
                                "2018-10",
                                "2019-01",
                                "2019-04",
                                "2019-06",
                                "2019-10",
                                "2020-01",
                                "2020-04",
                                "2020-06",
                                "2020-10",
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            type: "category",
                            data: [
                                "2018-01",
                                "2018-04",
                                "2018-06",
                                "2018-10",
                                "2019-01",
                                "2019-04",
                                "2019-06",
                                "2019-10",
                                "2020-01",
                                "2020-04",
                                "2020-06",
                                "2020-10",
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                        {
                            gridIndex: 2,
                            type: "category",
                            data: [
                                "2018-01",
                                "2018-04",
                                "2018-06",
                                "2018-10",
                                "2019-01",
                                "2019-04",
                                "2019-06",
                                "2019-10",
                                "2020-01",
                                "2020-04",
                                "2020-06",
                                "2020-10",
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                //show: false,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                    ],
                    yAxis: [{
                            gridIndex: 0,
                            name: "流\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "折\n算\n基\n准\n面\n流\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            offset: 80,
                            position: 'left',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                // show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "油\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "泵\n频\n率\n︵\nH\nz\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            max: 50,
                            min: 0,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //   show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "含\n水\n︵\n%\n︶",
                            nameLocation: "center",
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "气\n油\n比\n",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "生\n产\n时\n间\n︵\nH\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            max: 24,
                            min: 0,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "井\n口\n温\n度\n︵\n℃\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //   show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n油\n︵\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n液\n︵\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n气\n︵\n万\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            minInterval: 0,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        /*{
                          gridIndex: 2,
                          name: "动\n液\n面\n︵\nm\n︶",
                          nameLocation: "center",
                          nameRotate: 0,
                          nameGap: 50,
                          nameTextStyle: {
                            color: "#fff",
                            fontSize: 14,
                          },
                          position: 'right',
                          offset: 80,
                          axisLabel: {
                            show: true,
                            color: "#8FA4CC",
                          },
                          axisTick: {
                            show: false,
                          },
                          axisLine: {
                            //   show: false,
                            lineStyle: {
                              color: "#979797",
                            },
                          },
                          splitLine: {
                            show: false,
                          },
                        },*/
                    ],
                    series: []
                },
                //油井 虚拟计量曲线
                oilOption2: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: "shadow",
                        }
                    },
                    legend: {
                        data: ['油', '气', '水', '液'],
                    },
                    xAxis: {
                        name: '时间',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        type: 'category',
                        data: [],
                    },
                    yAxis: {
                        name: '流量Sm³/d',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        type: 'value',
                    },
                    series: [{
                            name: '油',
                            type: 'line',
                            data: [],
                        },
                        {
                            name: '气',
                            type: 'line',
                            data: [],
                        },
                        {
                            name: '水',
                            type: 'line',
                            data: [],
                        },
                        {
                            name: '液',
                            type: 'line',
                            data: [],
                        }
                    ]
                },
                //水井折线图内容
                waterOption: {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    /*toolbox: {
                      show : true,
                      feature : {
                        saveAsImage : {
                          name :'水井曲线对比分析图',
                          pixelRatio: 15,//值越大分辨率越高,下载的图片越清晰
                          backgroundColor:'#022644'
                        }
                      }
                    },*/
                    grid: [{
                            left: "14%",
                            top: "8%",
                            width: "74%",
                            height: "42%"
                        },
                        {
                            left: "14%",
                            top: "52%",
                            width: "74%",
                            height: "42%"
                        },
                    ],
                    xAxis: [{
                            gridIndex: 0,
                            type: "category",
                            data: [
                                "2018-01",
                                "2018-04",
                                "2018-06",
                                "2018-10",
                                "2019-01",
                                "2019-04",
                                "2019-06",
                                "2019-10",
                                "2020-01",
                                "2020-04",
                                "2020-06",
                                "2020-10",
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            type: "category",
                            data: [
                                "2018-01",
                                "2018-04",
                                "2018-06",
                                "2018-10",
                                "2019-01",
                                "2019-04",
                                "2019-06",
                                "2019-10",
                                "2020-01",
                                "2020-04",
                                "2020-06",
                                "2020-10",
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                //show: false,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                    ],
                    yAxis: [{
                            gridIndex: 0,
                            name: "注\n入\n时\n间\n︵\nh\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            max: 24,
                            min: 0,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "井\n口\n压\n力\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "套\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //   show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "水\n聚\n总\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "日\n配\n注\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "日\n注\n聚\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "日\n注\n水\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#fff",
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: "#979797",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: []
                },
                waterRealOption: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // Use axis to trigger tooltip
                            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },
                    grid: [{
                            x: "80",
                            y: "4%",
                            width: "92%",
                            height: "40%"
                        },
                        {
                            x: "80",
                            y: "50%",
                            width: "92%",
                            height: "40%"
                        },
                    ],
                    xAxis: [{
                            show: false,
                            gridIndex: 0,
                            type: "category",
                            data: [],
                            axisLabel: {
                                show: true,
                                color: "rgba(255,255,255,0)",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#FFFFFF",
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            data: [],
                            type: "category",
                            axisLabel: {
                                color: "#FFFFFF",
                            },
                            axisTick: {
                                show: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#FFFFFF",
                                },
                            },
                        },
                    ],
                    yAxis: [{
                            gridIndex: 0,
                            name: "注水压力\n（MPa）",
                            nameGap: 40,
                            nameLocation: "center",
                            nameRotate: 90,
                            nameTextStyle: {
                                color: "#fff",
                                //lineHeight: 80
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#FFFFFF",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#FFFFFF",
                                },
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "注水量\n（m³/d）",
                            nameLocation: "center",
                            nameRotate: 90,
                            nameGap: 40,
                            nameTextStyle: {
                                color: "#fff",
                                //lineHeight: 80
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: "#FFFFFF",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#FFFFFF",
                                },
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                    ],
                    series: [{
                            name: '注水压力',
                            type: "line",
                            showAllSymbol: false,
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [],
                        },
                        {
                            name: '注水量',
                            type: "line",
                            showAllSymbol: false,
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: [],
                        },
                    ],
                },
                wellType: '',
                //油井选择内容
                oilTabType: '0',
                //水井选择内容
                waterTabType: '0',
                //下载权限
                canDownload: false,
                //选择日期时间 虚拟计量时间选择框
                selectDateTime: new Date(),
            };
        },
        computed: {
            childParamsList() {
                return this.checkList.map((item) => item.childParams).flat(Infinity);
            },
            defaultType() {
                return this.defaultTypeList
                    .map((arr, index) => {
                        return arr.filter((item) =>
                            this.queryParams.paramCodes.includes(item)
                        ); //[[1,2],[3,4]] //[2,3]
                    })
                    .filter((item) => item.length);
            },
        },
        mounted() {
            this.initData();
        },
        methods: {
            /**
             * hwh
             * 初始化
             * @returns {Promise<void>}
             */
            async initData() {
                let oilFieldId = this.$route.params.oilFieldId;
                let platformId = this.$route.params.platformId;
                let selectWellId = this.$route.params.selectWellId;
                let selectMeasuresId = this.$route.params.selectMeasuresId;
                let measuresDate = this.$route.params.measuresDate;
                let wellNameNano = this.$route.params.wellNameNano;
                let wellBoreName = this.$route.params.wellBoreName;
                this.canDownload = this.$route.params.canDownload;
                console.log(this.$route.params.wellType);
                let wellType = this.$route.params.wellType;
                if (wellType == '002002001') {
                    this.type = 0;
                } else if (wellType == '002003001' || wellType == '002005001') {
                    this.type = 1;
                }
                this.wellType = wellType;

                this.selectOilField = oilFieldId;
                this.selectPlatform = platformId;
                this.selectWellId = selectWellId;
                this.selectMeasuresId = selectMeasuresId;
                this.measuresDate = measuresDate;
                this.wellNameNano = wellNameNano;
                this.wellBoreName = wellBoreName;
                //this.selectData.push(new Date(this.measuresDate).format('yyyy-MM-dd'));
                //this.selectData.push(new Date(this.measuresDate).addDays(30).format('yyyy-MM-dd'));

                //获得年份
                let year = new Date().getFullYear();
                this.selectData = [new Date(year + '-01-01').format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
                this.selectRealData = [new Date().addDays(-1).format('yyyy-MM-dd'), new Date().format(
                'yyyy-MM-dd')];
                // this.selectData.push(new Date(year+'-01-01').format('yyyy-MM-dd'));
                // this.selectData.push(new Date().format('yyyy-MM-dd'));

                this.getFetchMeasureStatInfos(this.selectOilField, this.selectPlatform, this.selectWellId, this
                    .selectMeasuresId, this.measuresDate, this.page, this.pageSize, this.wellType, this
                    .wellBoreName);
                this.doSearchCharts();
            },
            /**
             * hwh
             * 检索文件
             *
             */
            doSearch() {

                this.getFetchMeasureStatInfos(this.selectOilField, this.selectPlatform, this.selectWellId, this
                    .selectMeasuresId, this.measuresDate, this.page, this.pageSize, this.wellType);
            },
            /**
             * hwh
             * 措施信息表
             * @param oilFieldId
             * @param platformId
             * @param wellId
             * @param measureId
             * @param yearMonth
             * @param page
             * @param pageSize
             */
            getFetchMeasureStatInfos(oilFieldId, platformId, wellId, measureId, yearMonth, page, pageSize, wellType,
                wellBoreName) {
                let wellArray = [];
                wellArray.push(wellId);
                let wellBoreArray = [];
                wellBoreArray.push(wellBoreName);
                let request = {
                    oilFieldId: oilFieldId,
                    platformId: platformId,
                    wellId: wellArray,
                    wellBoreName: wellBoreArray,
                    measureId: measureId,
                    yearMonth: yearMonth,
                    page: page,
                    pageSize: pageSize,
                    wellType: wellType,
                };
                this.tableData = [];
                this.chemicalTableData = [];
                fetchMeasureStatInfos(request).then((res) => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data.measureResultStat;
                        this.chemicalTableData = res.data.data.taskPlanExcuteRecordList;
                        if (this.type == 0) {
                            this.oilWellTableData = this.tableData;
                        } else if (this.type == 1) {
                            this.waterWellTableData = this.tableData;
                        }

                    }
                });

            },
            /**
             *  hwh
             *  改变当前页 跳转下一页
             * @param pageValue 当前页数
             */
            handleChangePage(pageValue) {
                let page = pageValue;
                let pageSize = this.pageSize;
                this.getFetchMeasureStatInfos(this.oilFieldId, this.plarformId, this.wellId, this.measureId, this.year,
                    page, pageSize, this.wellType);
            },
            /**
             *  hwh
             *  改变当前页大小
             * @param rowsValue 当前页大小
             */
            handleChangePageSize(rowsValue) {
                this.pageSize = rowsValue;
                let page = this.page;
                let pageSize = rowsValue;
                this.getFetchMeasureStatInfos(this.oilFieldId, this.plarformId, this.wellId, this.measureId, this.year,
                    page, pageSize, this.wellType);
            },
            /**
             * hwh
             * 上传文件
             * @param file
             * @param fileList
             * @returns {Promise<void>}
             */
            async useUploadPic(file, fileList) {
                if (fileList.length > 1) {
                    this.fileList.slice(-1);
                }
                //获得油田参数
                let oilFieldid = this.selectOilField;
                //获得平台id
                let platForm = this.selectPlatform;
                //获得井号
                let wellId = this.selectWellId;
                //获得措施id
                let measuresId = this.selectMeasuresId;
                //措施时间
                let measuresDate = this.measuresDate;
                //一级目录 油井目录
                let firstPath = 'cssj';
                //文件类型
                let fileType = file.raw.type;
                if (fileType != 'application/pdf') {
                    this.$message.error('请上传pdf格式文件');
                    return;
                }
                //获得图片二进制流
                const fileData = await this.selectImageFile(file.raw);
                let fileDataNew = fileData.replace(/^data:\w+\/\w+;base64,/, "");
                //文件名称拼接
                let fileName = wellId + '_' + measuresId + '_' + measuresDate;
                //请求参数
                let request = {
                    contentType: fileType,
                    data: fileDataNew,
                    fieldId: oilFieldid,
                    fileName: fileName,
                    operatingCompanyId: '',
                    path: firstPath,
                    platformId: platForm,
                    wellGroupId: '',
                    wellId: wellId,
                    wellTypeCode: '',
                };
                console.log(request);
                uploadFile(request).then((res) => {
                    if (res.data.code == 0) {
                        this.$message.success('文件上传成功');
                        this.doSearch();
                    }
                });
            },
            /**
             * hwh
             * 解析图片文件 图片文件转Base64流
             * @param file
             * @returns {Promise<unknown>}
             */
            selectImageFile(file) {
                return new Promise(((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = ((result) => {
                        resolve(reader.result)
                    });
                }))
            },
            //返回
            switchToBack() {
                this.$router.go(-1);
            },
            //执行油井搜索 移植过来 代码未简化 不影响性能
            doOilSearch() {
                let startDate = this.selectData[0];
                let endDate = this.selectData[1];
                let request = {
                    beginDate: startDate,
                    endDate: endDate,
                    ogfId: this.selectOilField,
                    platformId: this.selectPlatform,
                    wellId: this.selectWellId,
                };
                produceData(request).then((res) => {
                    let seriesData = [];
                    let legendData = [];
                    if (res.data.code == 0) {
                        let chartDataS = res.data.data.charts;
                        //获取x轴数据信息
                        let xSet = new Set();
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (!chartDataS[i].linearDataSets) {
                                continue;
                            }
                            let chartData = chartDataS[i].linearDataSets[0];
                            let chartDatalabel = chartData.label;
                            legendData.push(chartDatalabel);
                            let series = {};
                            let lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            if (lineName == '含水') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                            } else if (lineName == '日产油') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                            } else if (lineName == '日产液') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                            } else if (lineName == '流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                            } else if (lineName == '油压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                            } else if (lineName == '泵频率') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 3;
                            } else if (lineName == '井口温度') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 7;
                            } else if (lineName == '折算基准面流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                            } else if (lineName == '日产液量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                            } else if (lineName == '日产油量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                            } else if (lineName == '日产气量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 10;
                            } else if (lineName == '气油比') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                            } else if (lineName == '生产时间') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                            } else {
                                continue;
                            }
                            //折线数据
                            let lineData = chartData.linearData;
                            let pointData = [];
                            for (let i = 0; i < lineData.length; i++) {
                                let point = [];
                                point.push(lineData[i].label);
                                xSet.add(lineData[i].label);
                                point.push(lineData[i].value);
                                pointData.push(point);
                            }
                            series.data = pointData;
                            series.showSymbol = false;
                            seriesData.push(series);
                        }
                        let xData = Array.from(xSet).sort();
                        this.oilOption.xAxis[0].data = xData;
                        this.oilOption.xAxis[1].data = xData;
                        this.oilOption.xAxis[2].data = xData;
                        this.oilOption.series = seriesData;
                    }
                })
            },
            //执行水井搜索 移植过来的 代码未简化 不影响性能
            doWaterSearch() {
                let startDate = this.selectData[0];
                let endDate = this.selectData[1];
                let request = {
                    beginDate: startDate,
                    endDate: endDate,
                    ogfId: this.selectOilField,
                    platformId: this.selectPlatform,
                    wellId: this.selectWellId,
                };
                produceData(request).then((res) => {
                    let seriesData = [];
                    let legendData = [];
                    //获取x轴数据信息
                    let xSet = new Set();
                    if (res.data.code == 0) {
                        let chartDataS = res.data.data.charts;
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (chartDataS[i].linearDataSets == null || chartDataS[i].linearDataSets ==
                                undefined) {
                                continue;
                            }
                            let chartData = chartDataS[i].linearDataSets[0];
                            let chartDatalabel = chartData.label;
                            let series = {};
                            let lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            legendData.push(series.name);
                            //数据所属图像
                            if (chartDatalabel == '套压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                            } else if (chartDatalabel == '日注水量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                            } else if (chartDatalabel == '井口压力') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                            } else if (chartDatalabel == '注入时间') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                            } else if (chartDatalabel == '日配注量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                            } else if (chartDatalabel == '水聚总量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 3;
                            } else if (chartDatalabel == '日注聚量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                            } else {
                                continue;
                            }
                            //折线数据
                            let lineData = chartData.linearData;
                            let pointData = [];
                            for (let i = 0; i < lineData.length; i++) {
                                let point = [];
                                point.push(lineData[i].label);
                                xSet.add(lineData[i].label);
                                point.push(lineData[i].value);
                                pointData.push(point);
                            }
                            series.data = pointData;
                            series.showSymbol = false;
                            seriesData.push(series);
                        }

                    }
                    let xData = Array.from(xSet).sort();
                    this.waterOption.xAxis[0].data = xData;
                    this.waterOption.xAxis[1].data = xData;
                    this.waterOption.series = seriesData;
                })
            },
            //检索图形
            doSearchCharts() {
                if (this.type == '0') {
                    switch (this.oilTabType) {
                        case "0": {
                            this.doOilSearch();
                        }
                        break;
                    case "1": {
                        this.queryParams.platId = this.selectPlatform
                        this.queryParams.borepipeId = this.selectWellId;
                        this.fetchProduceParams();
                        this.getRealtimeData();
                    }
                    break;
                    case "2": {
                        this.doWellFluxLastDayHour();
                    }
                    break;
                    case "3": {

                    }
                    break;
                    default: {

                    }
                    }
                } else if (this.type == '1') {
                    switch (this.waterTabType) {
                        case "0": {
                            this.doWaterSearch();
                        }
                        break;
                    case "1": {
                        this.fetchIntervalWorkConditionDataCurve(0, '008');
                        this.fetchIntervalWorkConditionDataCurve(1, '009');
                    }
                    break;
                    default: {

                    }
                    }

                }
            },

            /**
             *
             * 水井实时
             * i 为图中位置
             * code 008 009
             *
             */
            fetchIntervalWorkConditionDataCurve(i, code) {
                let request = {
                    code: code,
                    ogfId: this.selectOilField,
                    platId: this.selectPlatform,
                    borepipeId: this.selectWellId,
                    beginDate: this.selectRealData[0],
                    endDate: this.selectRealData[1],
                }
                getIntervalWorkConditionDataCurve(request).then((data) => {
                    let code = data.data.code;
                    if (code == 0) {
                        let res = data.data.data;
                        let xData = [];
                        let yData = [];
                        if (res && res.length > 0) {
                            res.forEach((element) => {
                                xData.push(element.day);
                                yData.push(element.dayValue ? parseFloat(Number(element.dayValue)
                                    .toFixed(1)) : element.dayValue);
                            });
                        }
                        this.waterRealOption.series[i].data = yData;
                        this.waterRealOption.xAxis[i].data = xData;
                    } else {
                        this.waterRealOption.series[i].data = [];
                        this.waterRealOption.xAxis[i].data = [];
                    }
                });
            },

            /**
             *  author : hwh
             *  下载文档
             *  date : 2021-02-25 19:04:44
             *  description : 跳转至方案查看
             *
             */
            switchToPlan(filePath, fileType) {
                let fp = encodeURI(filePath);
                let ft = fileType;
                let request = {
                    filePath: fp,
                    fileType: ft,
                }
                getDocDownloadUrl(request).then((res) => {
                    let fn = res.headers.filename;
                    let fileName = decodeURI(fn);
                    fileSaver.saveAs(res.data, fileName);
                })
            },
            fatchAllData() {
                this.getRealtimeData();
            },
            /*async initData(queryParams) {
              //this.initMqttMess();
              this.queryParams.companyId = queryParams.companyId;
              this.queryParams.ogfId = queryParams.ogfId;
              this.queryParams.platId = queryParams.platId;
              this.queryParams.borepipeId = queryParams.borepipeId;
              this.fetchWellLastData();
              this.fetchProduceParams();
              this.getRealtimeData();
              //获得转换后的井名
              //this.transformBorepipeNo(this.queryParams.borepipeId);

            },*/
            fetchProduceParams() {
                getProduceParams().then((data) => {
                    let code = data.data.code;
                    if (code == 0) {
                        this.checkList = data.data.data;
                        this.checkList
                            .map((item) => item.childParams)
                            .flat(Infinity)
                            .forEach((item) => {
                                console.log(item.paramName, " : ", item.paramCode);
                            });
                    }
                });
            },
            // 判断是否可选中
            isDisabled(select, index) {
                /*this.getRealtimeData();*/
                if (!select.length) {
                    this.isSelect = null;
                } else {
                    let obj = this.childParamsList.find(
                        (child) => child.paramCode == select[0]
                    );
                    if (obj) this.isSelect = obj.isRealTime;
                }
                this.$nextTick(() => {
                    this.getChartsOption();
                });
            },
            createChange(dates) {
                this.queryParams.beginDate = dates[0];
                this.queryParams.endDate = dates[1];
            },
            getRealtimeData() {
                getRealtimeData(this.queryParams).then((data) => {
                    let code = data.data.code;
                    if (code == 0) {
                        let res = data.data.data;
                        if (res) {
                            this.realTimeData = res;
                        } else {
                            this.realTimeData = [];
                        }
                    } else {
                        this.realTimeData = [];
                    }
                    this.$nextTick(() => {
                        this.getChartsOption();
                    });
                });
            },
            getChartsOption() {
                //求实时数据中的x轴，，
                let xSet = new Set();
                for (let [key, value] of Object.entries(this.realTimeData)) {
                    //判断value是否为数组
                    if (Array.isArray(value)) {
                        value.forEach((item, index) => {
                            xSet.add(item.date);
                        })
                    } else {
                        return true;
                    }
                }
                //对x轴做排序
                let xArray = Array.from(xSet).sort();
                this.optionRealData = {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                    },
                    /*legend: {},*/
                    grid: [
                        ...this.defaultType
                        .map((arr, index) => {
                            return arr.filter((item) =>
                                this.queryParams.paramCodes.includes(item)
                            ); //[[1,2],[3,4]] //[2,3]
                        })
                        .map((item, index) => {
                            if (this.chartDataType == 'real') {
                                return {
                                    top: `${4 + 30 * index + index}%`,
                                    height: "28%",
                                    left: "20%",
                                    right: "20%",
                                    width: "60%",
                                };
                            } else if (this.chartDataType == 'date') {
                                return {
                                    top: `${4 + 22 * index + index}%`,
                                    height: "22%",
                                    left: "20%",
                                    right: "20%",
                                    width: "60%",
                                };
                            }

                        }),
                    ],
                    xAxis: [
                        ...this.defaultType
                        .map((arr, index) => {
                            return arr.filter((item) =>
                                this.queryParams.paramCodes.includes(item)
                            );
                        })
                        .map((item, index) => {
                            return {
                                gridIndex: index,
                                type: "category",
                                /*data: (this.realTimeData[0] && this.realTimeData[0].paramValues)
                                  ? this.realTimeData[0].paramValues.map((item) => item.date)
                                  : [],*/
                                data: xArray,
                                textStyle: {
                                    fontSize: 14,
                                },
                                axisLabel: {
                                    show: true,
                                    color: "#8FA4CC",
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    lineStyle: {
                                        //color: '#979797'
                                        color: "rgba(255,255,255,.16)",
                                    },
                                },
                            };
                        }),
                    ],
                    yAxis: [
                        ...this.defaultType
                        .map((arr, typeIndex) => {
                            return arr
                                .filter((item) => this.queryParams.paramCodes.includes(item))
                                .map((item, index) => {
                                    return {
                                        gridIndex: typeIndex,
                                        name: this.childParamsList.find(
                                                (param) => param.paramCode == item
                                            ) ?
                                            this.childParamsList
                                            .find((param) => param.paramCode == item)
                                            .paramName.split("")
                                            .join("\n") + "\n" + this.paramsList.find((param) => param
                                                .paramCode == item).unit :
                                            "",
                                        nameLocation: "center",
                                        offset: Math.floor(index / 2) * 70,
                                        nameRotate: 360,
                                        nameGap: 50,
                                        position: index % 2 ? "right" : "left",
                                        minInterval: 2,
                                        scale: true,
                                        nameTextStyle: {
                                            color: this.color[(typeIndex + index) % 10],
                                        },
                                        axisLabel: {
                                            show: true,
                                            color: "#8FA4CC",
                                            minInterval: 0,
                                        },
                                        axisTick: {
                                            show: false,
                                        },
                                        axisLine: {
                                            //show: false,
                                            lineStyle: {
                                                color: "#979797",
                                            },
                                        },
                                        splitLine: {
                                            show: false,
                                        },
                                    };
                                });
                        })
                        .flat(Infinity),
                    ],
                    series: [
                        ...this.defaultType
                        .map((arr, typeIndex, parentArr) => {
                            return arr
                                .filter((item) => this.queryParams.paramCodes.includes(item))
                                .map((paramCode, index) => {
                                    return {
                                        type: "line",
                                        xAxisIndex: typeIndex,
                                        yAxisIndex: parentArr
                                            .map((item) => item)
                                            .flat(Infinity)
                                            .indexOf(paramCode),
                                        /*data: this.realTimeData.find(
                                          (item) =>
                                            this.childParamsList.find(
                                              (item) => item.paramCode == paramCode
                                            ).paramName == item.paramName
                                        )
                                          ? this.realTimeData
                                              .find(
                                                (item) =>
                                                  this.childParamsList.find(
                                                    (item) => item.paramCode == paramCode
                                                  ).paramName == item.paramName
                                              )
                                              .paramValues.map((item) => item.paramValue)
                                          : [],*/
                                        data: this.realTimeData[paramCode] ? this.realTimeData[
                                                paramCode].map((item) => [item.date, item.paramValue]) :
                                            [],
                                        name: this.childParamsList.find((item) => {
                                            return item.paramCode == paramCode
                                        }).paramName,
                                        label: {
                                            show: false,
                                            color: "#fff",
                                            fontSize: 14,
                                        },
                                        /*lineStyle: {
                                          color: "#00BC9C",
                                        },*/
                                        symbol: "circle",
                                        symbolSize: 5,
                                        showSymbol: false,
                                        itemStyle: {
                                            color: this.color[(typeIndex + index) % 10],
                                            borderColor: "rgba(255,255,255,0.32)",
                                            borderWidth: 2,
                                            borderType: "solid",
                                        },
                                    };
                                });
                        })
                        .flat(Infinity),
                    ],
                };
                //如果x轴大于1条，只显示最下层的x轴的坐标信息
                if (this.optionRealData.xAxis.length > 1) {
                    let arr = this.optionRealData.xAxis;
                    for (let i = 0; i < arr.length - 1; i++) {
                        arr[i].axisLabel.show = false;
                    }
                }
                if (this.canDownload) {
                    let fileName = '';
                    if (this.chartDataType == 'real') {
                        fileName = (this.wellName ? this.wellName : '') + '实时数据';
                    } else if (this.chartDataType === 'date') {
                        fileName = (this.wellName ? this.wellName : '') + '日度数据';
                    } else {
                        fileName = (this.wellName ? this.wellName : '') + '图表';
                    }
                    let toolBox = {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: fileName,
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644'
                            }
                        }
                    };
                    this.optionRealData.toolbox = toolBox;
                }
            },
            /**
             *
             * hwh
             * 根据井号id转换对应实时数据的井名信息
             *
             */
            transformBorepipeNo(borepipeId) {
                transformBorepipeNo(borepipeId).then((res) => {
                    if (res.data.code == 0) {
                        this.wellName = res.data.data;
                    } else {
                        this.wellName = '';
                    }
                });
            },
            /**
             * hwh
             * 初始化Mqtt数据
             */
            initMqttMess() {
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: "/edge_electric_submersible_pump_monitor/qhd32-6cepi",
                    message: (e) => {
                        this.pumpRealDataI = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        })
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: "/edge_electric_submersible_pump_monitor/qhd32-6cepj",
                    message: (e) => {
                        this.pumpRealDataJ = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        })
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: "/edge_electric_submersible_pump_monitor/qhd32-6whpc",
                    message: (e) => {
                        this.pumpRealDataC = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        })
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: "/edge_electric_submersible_pump_monitor/qhd32-6whph",
                    message: (e) => {
                        this.pumpRealDataH = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        })
                    },
                });
            },
            /**
             * hwh
             * 获得泵工况数据信息
             */
            getPumpRealData() {
                //泵数据
                let pumpWellData = [];
                if (this.queryParams.platId == '3F1E5858C6CC41E2BF4FFC4902797C08') {
                    //获得i平台实时数据
                    pumpWellData = this.pumpRealDataI;
                } else if (this.queryParams.platId == 'FA1CF76628104FB383BB444C8861BFCB') {
                    //获得j平台实时数据
                    pumpWellData = this.pumpRealDataJ;
                } else if (this.queryParams.platId == '0C118F2856574256A8F1BBA26F99BA1A') {
                    //获得c平台实时数据
                    pumpWellData = this.pumpRealDataC;
                } else if (this.queryParams.platId == '89A1EF273FD748A7BD922E6458ACE128') {
                    //获得h平台实时数据
                    pumpWellData = this.pumpRealDataH;
                }
                if (this.wellName) {
                    let wellThing = pumpWellData.find((item) => {
                        return item.well_id == this.wellName
                    });
                    if (wellThing) {
                        this.pumpData = wellThing;
                    } else {
                        this.pumpData = {};
                    }
                } else {
                    this.pumpData = {};
                }

            },
            /**
             * 点击事件
             * @return 返回数据为已封装好的集合数据
             * @Author Mr.Cao
             * @Date 2021/11/16
             */
            fetchAllData() {
                if (this.oilTabType == "1") {
                    this.queryParams.platId = this.selectPlatform
                    this.queryParams.borepipeId = this.selectWellId;
                    this.fetchProduceParams();
                    this.getRealtimeData();
                }
            },
            /**
             * hwh el table 表格头 标题单位样式
             * @param h
             * @param column
             * @returns {*[]}
             */
            renderHeader(h, {
                column
            }) {
                let header = column.label.split(' ');
                return [h('p', [
                    h('p', {}, header[0]),
                    h('span', {}, header[1])
                ])];
            },
            /**
             * hwh
             * 虚拟计量内容 查询
             */
            doWellFluxLastDayHour() {
                let request = {
                    date: this.selectDateTime,
                    wellName: this.wellNameNano,
                };
                let xData = [];
                let seriesData1 = [];
                let seriesData2 = [];
                let seriesData3 = [];
                let seriesData4 = [];
                wellFluxLastDayHour(request).then((res) => {
                    if (res.data.code == 200) {
                        let tableList = res.data.data;
                        tableList.forEach((item) => {
                            xData.push(item.M_CREATE);
                            let oil = parseFloat(Number(Number(item.M_FO_STDVOL) * 60 * 60 * 24)
                                .toFixed(2));
                            let gas = parseFloat(Number(Number(item.M_FG_STDVOL) * 60 * 60 * 24)
                                .toFixed(2));
                            let water = parseFloat(Number(Number(item.M_FW_STDVOL) * 60 * 60 * 24)
                                .toFixed(2));
                            let fluid = parseFloat(Number(oil + water).toFixed(2));
                            seriesData1.push([item.M_CREATE, oil]);
                            seriesData2.push([item.M_CREATE, gas]);
                            seriesData3.push([item.M_CREATE, water]);
                            seriesData4.push([item.M_CREATE, fluid]);
                        })
                        this.oilOption2.xAxis.data = xData;
                        this.oilOption2.series[0].data = seriesData1;
                        this.oilOption2.series[1].data = seriesData2;
                        this.oilOption2.series[2].data = seriesData3;
                        this.oilOption2.series[3].data = seriesData4;
                    } else {
                        this.oilOption2.xAxis.data = xData;
                        this.oilOption2.series[0].data = seriesData1;
                        this.oilOption2.series[1].data = seriesData2;
                        this.oilOption2.series[2].data = seriesData3;
                        this.oilOption2.series[3].data = seriesData4;
                    }
                }).catch((err) => {
                    this.oilOption2.xAxis.data = xData;
                    this.oilOption2.series[0].data = seriesData1;
                    this.oilOption2.series[1].data = seriesData2;
                    this.oilOption2.series[2].data = seriesData3;
                    this.oilOption2.series[3].data = seriesData4;
                })
            },
        },
    };
</script>
<style lang="scss" scoped>
    .el-container {
        .el-container {
            // padding: 0 20px;
        }
    }

    .el-main {
        .el-row {
            height: 100%;

            .el-col {
                height: 100%;
            }
        }
    }

    .chicked {
        color: rgb(0, 102, 255);
        cursor: pointer;
        text-decoration: underline;
    }

    ::v-deep .el-upload {
        border: 0px;
        border-radius: 0px;
    }

    ::v-deep .el-upload-list {
        display: none;
    }

    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
