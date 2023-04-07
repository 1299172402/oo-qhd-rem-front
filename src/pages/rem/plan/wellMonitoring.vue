<!-- 措施效果跟踪 -->
<template>
    <div class="app-container">
        <pagePanelNew headerTitle="措施效果跟踪" style="height:100%;marginTop:0;">
            <div class="layout">
                <div class="searchBox">
                    <div class="titleBox">
                        <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;">
                            措施效果跟踪
                            <el-button type="primary" style="height:30px;" @click="switchToBack">返回</el-button>
                        </div>
                    </div>
                    <headerSearch style="height:80px;">
                        <div style="padding-top:20px;display: flex;align-items: center;">
                            <div class="fl">
                                <span>油田：</span>
                                <el-select v-model="selectOilField" class="f2" disabled @change="onFieldChange">
                                   <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId"></el-option>
                                </el-select>
                            </div>
                            <div class="fl mg">
                                <span>平台：</span>
                                <el-select v-model="selectPlatform" class="f2" style="width: 220px;" @change="onPlatfromChange">
                                   <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId"></el-option>
                                </el-select>
                            </div>
                            <div class="fl mg">
                                <span>井号：</span>
                                <el-select v-model="selectWellId" filterable class="f2">
                                   <el-option v-for="(item, index) in wells" :key="index" :label="item.wellName" :value="item.wellId"></el-option>
                                </el-select>
                            </div>
                            <div class="fl mg">
                                <span>措施事件：</span>
                                <el-select v-model="measuresType" class="f2">
                                  <el-option v-for="(item, index) in measuresTypes" :key="index" :label="item.name" :value="item.code">
                                  </el-option>
                                </el-select>
                            </div>
                            <div class="fl mg">
                                <span>时间:</span>
                                <el-date-picker class="f3" v-model="dateTime" style="margin-left:10px" type="year" placeholder="选择日期" value-format="yyyy"></el-date-picker>
                            </div>
                            <div class="fr mg">
                                <el-button type="primary" icon="el-icon-search" size="mini" @click="doSearch">搜索</el-button>
                            </div>
                        </div>
                    </headerSearch>
                </div>
                <div class="main">
                    <el-row :gutter="20" style="height: 132px">
                        <el-col :span="24">
                            <div style="height: 112px;padding-top:0;" class="svg">
                                <el-table v-show="type == 0" highlight :data="oilWellTableData" style="width: 100%" height="190">
                                    <el-table-column type="index" align="center" width="60" label="序号"></el-table-column>
                                    <el-table-column prop="wellNo" align="center" label="井号" width="160"></el-table-column>
                                    <el-table-column prop="beginDate" align="center" label="措施开始日期" width="110px"></el-table-column>
                                    <el-table-column prop="endDate" align="center" label="措施结束日期" width="110px"></el-table-column>
                                    <el-table-column align="center" label="措施前生产情况">
                                        <el-table-column align="center" label="日产液 m³/d" width="80" prop="bmLiquidDaily"></el-table-column>
                                        <el-table-column align="center" label="日产油 m³/d" width="80" prop="bmOilDaily"> </el-table-column>
                                        <el-table-column align="center" label="含水率 %" width="80" prop="bmWaterCut"></el-table-column>
                                    </el-table-column>
                                    <el-table-column align="center" label="措施效果">
                                        <el-table-column align="center" label="当日日增油 m³/d" :render-header="renderHeader" width="120" prop="incOilDaily"></el-table-column>
                                        <el-table-column align="center" label="累增油 m³" min-width="100" prop="sumOilDaily"></el-table-column>
                                        <el-table-column prop="days" align="center" label="增产有效期 d" width="110"></el-table-column>
                                        <el-table-column prop="geoDesignOilDaily" align="center" label="地质设计日增油 m³/d" :render-header="renderHeader" width="120"></el-table-column>
                                        <el-table-column prop="avgOilDaily" align="center" label="平均日增油 m³/d" :render-header="renderHeader" width="120"></el-table-column>
                                        <el-table-column prop="" align="center" label="滚动预测日增油 m³/d" :render-header="renderHeader" width="120"></el-table-column>
                                    </el-table-column>
                                    <el-table-column label="地质设计" align="center">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.geoDesg" class="chicked">
                                                <el-button type="text" @click="switchToPlan(scope.row.geoDesg, scope.row.geoDesgSl)" :disabled="!canDownload">方案查看</el-button>
                                            </div>
                                            <span v-else>-</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工艺设计" align="center">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.oprgProcDesg" class="chicked">
                                                <el-button type="text"
                                                    @click="switchToPlan(scope.row.oprgProcDesg, scope.row.oprgProcDesgSl)"
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
                                                    @click="switchToPlan(scope.row.oprgDesg, scope.row.oprgDesgSl)"
                                                    :disabled="!canDownload">方案查看
                                                </el-button>
                                            </div>
                                            <span v-else>-</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-table v-show="type == 1" highlight :data="waterWellTableData" style="width: 100%" height="180">
                                    <el-table-column type="index" align="center" width="60" label="序号"></el-table-column>
                                    <el-table-column prop="wellNo" align="center" label="井号" width="160"></el-table-column>
                                    <el-table-column prop="beginDate" align="center" label="措施开始日期" min-width="110px"></el-table-column>
                                    <el-table-column prop="endDate" align="center" label="措施结束日期" min-width="110px"></el-table-column>
                                    <el-table-column align="center" label="措施前注入情况" min-width="100">
                                        <el-table-column align="center" label="日注水量 m³/d" min-width="100" prop="bmInjWater"></el-table-column>
                                    </el-table-column>
                                    <el-table-column align="center" label="措施效果">
                                        <el-table-column prop="injDaily" align="center" label="当日日增注 m³/d" min-width="100"></el-table-column>
                                        <el-table-column align="center" label="累增注 m³" min-width="100" prop="sumInjDaily"></el-table-column>
                                        <el-table-column align="center" label="增注有效期 d" min-width="100" prop="days"></el-table-column>
                                        <el-table-column align="center" label="地质设计日配注 m³/d" min-width="120" prop="geoDesignInjDaily"></el-table-column>
                                    </el-table-column>
                                    <el-table-column label="地质设计" align="center">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.geoDesg" class="chicked">
                                                <el-button type="text" @click="switchToPlan(scope.row.geoDesg, scope.row.geoDesgSl)" :disabled="!canDownload">方案查看</el-button>
                                            </div>
                                            <span v-else>-</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工艺设计" align="center">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.oprgProcDesg" class="chicked">
                                                <el-button type="text" @click="switchToPlan(scope.row.oprgProcDesg, scope.row.oprgProcDesgSl)" :disabled="!canDownload">方案查看</el-button>
                                            </div>
                                            <span v-else>-</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="施工设计" align="center">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.oprgDesg" class="chicked">
                                                <el-button type="text" @click="switchToPlan(scope.row.oprgDesg, scope.row.oprgDesgSl)" :disabled="!canDownload">方案查看</el-button>
                                            </div>
                                            <span v-else>-</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="main-row" v-if="type == 0" style="height: 50px">
                        <verticalSwitchButton @selectBtn="selectBtn" :dataList="dataList" buttonWidth="120px" buttonHeight="40px" style="width: 9%" btnDirection="row"></verticalSwitchButton>
                    </el-row>
                    <el-row class="main-row" v-if="type == 1" style="height: 50px">
                        <verticalSwitchButton @selectBtn="selectBtn2" :dataList="dataList2" buttonWidth="120px" buttonHeight="40px" style="width: 9%" btnDirection="row"></verticalSwitchButton>
                    </el-row>
                    <el-row class="main-row2" v-if="type == 0">
                        <div class="svg" v-if="oilTabType == '0'">
                            <div class="search-date">
                                <span>日期：</span>
                                <el-date-picker v-model="selectData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                                <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="doSearchCharts">检索</el-button>
                            </div>
                            <div class="echarts-view">
                                <echarts :chart-data="oilOption" height="100%"></echarts>
                            </div>
                        </div>
                        <div class="svg" v-else-if="oilTabType == '1'">
                            <div class="search-date">
                                <span>日期：</span>
                                <el-date-picker v-model="dateDetail" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"  @change="createChange"></el-date-picker>
                                <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="doSearchCharts">检索</el-button>
                            </div>
                            <el-row v-for="(item, index) in checkList.filter((item) => {return item.isRealTime == 0;})" :key="index">
                                <div style="width: 100px; display: inline-block">
                                    <span>{{ item.paramName }}</span>
                                </div>
                                <el-checkbox-group v-model="queryParams.paramCodes" style="display: inline-block">
                                    <el-checkbox v-for="(it, i) in item.childParams" :key="i" :label="it.paramCode" style="color: #ffffff" @change="isDisabled">{{ it.paramName }}</el-checkbox>
                                </el-checkbox-group>
                            </el-row>
                            <div class="echarts-view">
                                <echarts :chart-data="optionRealData" height="100%"></echarts>
                            </div>
                        </div>
                        <div class="svg" v-else-if="oilTabType == '2'">
                            <div class="search-date">
                                <span>日期：</span>
                                <el-date-picker v-model="selectDateTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd hh:mm"></el-date-picker>
                                <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="doWellFluxLastDayHour">检索</el-button>
                            </div>
                            <div class="echarts-view">
                                <echarts :chart-data="oilOption2" height="100%"></echarts>
                            </div>
                        </div>
                        <div class="svg" v-else-if="oilTabType == '3'">
                            <div class="table-view">
                                <el-table :data="chemicalTableData" highlight style="width: 100%" height="446px"
                                    :row-style="{ height: '0px' }"
                                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                                    header-cell-class-name="table_header"
                                    :cell-style="{ padding: '2px', 'text-align': 'center' }">
                                    <el-table-column label="序号" type="index"></el-table-column>
                                    <el-table-column label="日期" prop="startTime"></el-table-column>
                                    <el-table-column label="含水" prop="waterCut"></el-table-column>
                                    <el-table-column label="含砂" prop="sand"></el-table-column>
                                    <el-table-column label="备注" prop="remark"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="svg" v-else-if="oilTabType == '4'">
                            <div class="table-view">
                                <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;">
                                    现场作业进度表
                                    <!-- <el-button type="primary" style="height:30px;">下载</el-button> -->
                                </div>
                                <!-- <info-window infoWidth="100%" infoHeight="calc(100% - 86px)" headerTitle="现场作业进度表"> -->
                                    <el-table :data="getWorkProgressData" highlight style="width: 100%" height="calc( 100% - 33px)"
                                        :row-style="{ height: '0px' }"
                                        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                                        header-cell-class-name="table_header"
                                        :cell-style="{ padding: '2px', 'text-align': 'center' }">
                                        <el-table-column label="井号" prop="wellNo" width="150"></el-table-column>
                                        <el-table-column label="开始时间" prop="beginTime" width="150"></el-table-column>
                                        <el-table-column label="预计结束时间" prop="endTime" width="150"></el-table-column>
                                        <el-table-column label="当前作业内容" prop="workContent"></el-table-column>
                                    </el-table>
                                    <pagination v-show="pageTotal2 > 0" :pageSizes="[15, 20, 40]" :total="pageTotal2" :page.sync="queryParams.page" :limit.sync="queryParams.pageSize" @pagination="pagination" />
                                <!-- </info-window> -->
                            </div>
                        </div>
                    </el-row>
                    <el-row class="main-row2" v-if="type == 1">
                        <div class="svg" v-if="waterTabType == '0'">
                            <div class="search-date">
                                <span>日期：</span>
                                <el-date-picker v-model="selectData" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                                <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="doSearchCharts">检索</el-button>
                            </div>
                            <div class="echarts-view">
                                <echarts :chart-data="waterOption" height="100%"></echarts>
                            </div>
                        </div>
                        <div class="svg" v-if="waterTabType == '1'">
                            <div class="search-date">
                                <span>日期：</span>
                                <el-date-picker v-model="selectRealData" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                                <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="doSearchCharts">检索</el-button>
                            </div>
                            <div class="echarts-view">
                                <echarts :chart-data="waterRealOption" height="100%"></echarts>
                            </div>
                        </div>
                    </el-row>
                </div>
            </div>
        </pagePanelNew>
    </div>
</template>

<script>
    import fileSaver from 'file-saver';
    import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
    import Echarts from '@/components/rem/tools/Echarts/index.vue';
    import {fetchMeasureStatInfos} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {uploadFile} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import {produceData} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import {getDocDownloadUrl} from '@/api/oilDeposit/ipm-01/measuresmanageinfo.js';
    import {getIntervalWorkConditionDataCurve} from '@/api/oilDeposit/ipm-02/operationmonitor.js';
    import {getProduceParams,getRealtimeData} from '@/api/oilDeposit/ipm-03/machineprodwellipm.js';
    import {transformBorepipeNo} from '@/api/oilDeposit/ipm-03/basedata.js';
    import {wellFluxLastDayHour} from '@/api/oilDeposit/opm/opmData.js';
    import {fetchOilFields,fetchPlatforms,fetchInjectionWells,fetchInjectionWellsByPlatform,fetchProductionWells,fetchProductionWellsByPlatform} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import {nameAndCode} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {getWorkProgress} from '@/api/oilDeposit/rem-04/plan.js';
    export default {
        name: 'wellMonitoring',
        components: {
            verticalSwitchButton,
            Echarts,
        },
        data() {
            return {
                //油田下拉框
                oilFields: [],
                //油田id
                selectOilField: '',
                //平台下拉框
                platforms: [],
                //平台id
                selectPlatform: '',
                //井号下拉框
                wells: [],
                //井号id
                // WellId:'',
                //井号id
                selectWellId: '',
                //措施事件下拉框
                measuresTypes: [],
                //措施事件id
                measuresType: '',
                //时间
                dateTime: "",
                
                dataList: [
                    {
                        name: '油井日度曲线',
                        isChecked: true,
                        oilTabType: '0'
                    },
                    {
                        name: '油井实时曲线',
                        isChecked: false,
                        oilTabType: '1'
                    },
                    {
                        name: '虚拟计量曲线',
                        isChecked: false,
                        oilTabType: '2'
                    },
                    {
                        name: '化验数据',
                        isChecked: false,
                        oilTabType: '3'
                    },
                    {
                        name: '作业信息',
                        isChecked: false,
                        oilTabType: '4'
                    },
                ],
                dataList2: [{
                        name: '水井日度曲线',
                        isChecked: true,
                        waterTabType: '0'
                    },
                    {
                        name: '水井实时曲线',
                        isChecked: false,
                        waterTabType: '1'
                    },
                ],
                queryParams: {
                    beginDate: new Date().addDays(-1).format('yyyy-MM-dd'),
                    endDate: new Date().format('yyyy-MM-dd'),
                    companyId: '29053E229AC34E70954249E0F084A20B',
                    platId: '',
                    ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                    paramCodes: [
                        '001001',
                        '001002',
                        '001003',
                        '001004',
                        '001005',
                        '001008',
                        '002001',
                        '002002',
                        '002003',
                        '002004',
                        '002005',
                        '002006',
                        '002007',
                        '002008',
                    ],
                    borepipeId: '',
                },
                dateDetail: [new Date().addDays(-1).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')],
                checkList: [],
                realTimeData: [],
                isSelect: 0,
                optionRealData: {},
                defaultTypeList: [
                    ['001001', '001004', '002003', '002002', '003001', '003002', '003003', '003004', '003005',
                        '003006'
                    ],
                    ['001008', '001005', '002004', '002005', '002006', '002007', '003007', '003008', '003009',
                        '003010', '003011', '003012'
                    ],
                    ['002001', '001002', '001003', '002008', '003013', '003014', '003015', '003016', '003017',
                        '003018'
                    ],
                    ['003019', '003020'],
                ],
                paramsList: [{
                        paramName: '井口温度',
                        paramCode: '001001',
                        unit: '℃',
                    },
                    {
                        paramName: '油压',
                        paramCode: '001002',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '套压',
                        paramCode: '001003',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '运行电压',
                        paramCode: '001004',
                        unit: 'V',
                    },
                    {
                        paramName: '运行电流',
                        paramCode: '001005',
                        unit: 'A',
                    },
                    {
                        paramName: '运行频率',
                        paramCode: '001008',
                        unit: 'Hz',
                    },
                    {
                        paramName: '泵入口压力',
                        paramCode: '002001',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '泵入口温度',
                        paramCode: '002002',
                        unit: '℃',
                    },
                    {
                        paramName: '电机温度',
                        paramCode: '002003',
                        unit: '℃',
                    },
                    {
                        paramName: '漏电电流',
                        paramCode: '002004',
                        unit: 'mA',
                    },
                    {
                        paramName: 'X震动',
                        paramCode: '002005',
                        unit: 'g',
                    },
                    {
                        paramName: 'Y震动',
                        paramCode: '002006',
                        unit: 'g',
                    },
                    {
                        paramName: 'Z震动',
                        paramCode: '002007',
                        unit: 'g',
                    },
                    {
                        paramName: '泵出口压力',
                        paramCode: '002008',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '产液量',
                        paramCode: '003001',
                        unit: 'm³',
                    },
                    {
                        paramName: '含水率',
                        paramCode: '003002',
                        unit: '%',
                    },
                    {
                        paramName: '产油量',
                        paramCode: '003003',
                        unit: 'm³',
                    },
                    {
                        paramName: '日产水',
                        paramCode: '003004',
                        unit: 'm³',
                    },
                    {
                        paramName: '日产气量',
                        paramCode: '003005',
                        unit: '10⁴\nm³',
                    },
                    {
                        paramName: '气油比',
                        paramCode: '003006',
                        unit: '',
                    },
                    {
                        paramName: '生产时间',
                        paramCode: '003007',
                        unit: 'h',
                    },
                    {
                        paramName: '泵频率',
                        paramCode: '003008',
                        unit: 'Hz',
                    },
                    {
                        paramName: '油嘴直径',
                        paramCode: '003009',
                        unit: '%',
                    },
                    {
                        paramName: '泵电压',
                        paramCode: '003010',
                        unit: 'kV',
                    },
                    {
                        paramName: '泵电流',
                        paramCode: '003011',
                        unit: 'A',
                    },
                    {
                        paramName: '漏电电流',
                        paramCode: '003012',
                        unit: 'mA',
                    },
                    {
                        paramName: '泵入口压力',
                        paramCode: '003013',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '泵出口压力',
                        paramCode: '003014',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '油压',
                        paramCode: '003015',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '套压',
                        paramCode: '003016',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '泵入口温度',
                        paramCode: '003017',
                        unit: '℃',
                    },
                    {
                        paramName: '井口温度',
                        paramCode: '003018',
                        unit: '℃',
                    },
                    {
                        paramName: '回压',
                        paramCode: '003019',
                        unit: 'M\nP\na',
                    },
                    {
                        paramName: '电机温度',
                        paramCode: '003020',
                        unit: '℃',
                    },
                ],
                // 泵工况展示数据
                pumpData: {},
                // 泵工况实时数据i
                pumpRealDataI: [],
                // 泵工况实时数据j
                pumpRealDataJ: [],
                // 泵工况实时数据c
                pumpRealDataC: [],
                // 泵工况实时数据h
                pumpRealDataH: [],
                // 实时刷新内容存放
                flushDetail: 0,
                // 图组类型
                chartDataType: 'real',
                color: [
                    '#1379F7',
                    '#00BC9C',
                    '#9A72FF',
                    '#F5BE43',
                    '#2ACAFF',
                    '#FF30AD',
                    '#FF5844',
                    '#F5FFA3',
                    '#DA835E',
                    '#FC0707',
                ],
                // 单选
                radioParam: '',
                // 文件列表 现在是单文件 默认是一个文件
                fileList: [],
                // 文件解析后内容
                image: '',
                // 项目
                project: '',
                page: 1,
                pageSize: 10000,
                pageTotal: 0,
                
                // 措施id
                selectMeasuresId: '',
                // 措施时间
                measuresDate: '',
                // 井名 虚拟计量使用
                wellNameNano: '',
                // 井名 井管名称
                wellBoreName: '',
                // 判断类型（0为油井，1为水井）
                type: 0,
                tableData: [],
                // 油井数据内容
                oilWellTableData: [],
                // 水井数据内容
                waterWellTableData: [],
                // 化验数据
                chemicalTableData: [],
                // 作业信息
                getWorkProgressData:[],
                queryParams:{
                  page: 1,
                  pageSize: 15,
                },
                pageTotal2: 0,
                // 选择时间
                selectData: [],
                // 选择实时时间
                selectRealData: [],
                // 油井折线图内容
                oilOption: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
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
                    grid: [
                        {
                            left: '14%',
                            top: '6%',
                            width: '74%',
                            height: '25%',
                        },
                        {
                            left: '14%',
                            top: '38%',
                            width: '74%',
                            height: '25%',
                        },
                        {
                            left: '14%',
                            top: '66%',
                            width: '74%',
                            height: '28%',
                        },
                    ],
                    xAxis: [
                        {
                            gridIndex: 0,
                            type: 'category',
                            data: [
                                '2018-01',
                                '2018-04',
                                '2018-06',
                                '2018-10',
                                '2019-01',
                                '2019-04',
                                '2019-06',
                                '2019-10',
                                '2020-01',
                                '2020-04',
                                '2020-06',
                                '2020-10',
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            data: [
                                '2018-01',
                                '2018-04',
                                '2018-06',
                                '2018-10',
                                '2019-01',
                                '2019-04',
                                '2019-06',
                                '2019-10',
                                '2020-01',
                                '2020-04',
                                '2020-06',
                                '2020-10',
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                        {
                            gridIndex: 2,
                            type: 'category',
                            data: [
                                '2018-01',
                                '2018-04',
                                '2018-06',
                                '2018-10',
                                '2019-01',
                                '2019-04',
                                '2019-06',
                                '2019-10',
                                '2020-01',
                                '2020-04',
                                '2020-06',
                                '2020-10',
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: '流\n压\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#ff8e08',
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: '折\n算\n基\n准\n面\n流\n压\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fe10f6',
                                fontSize: 14,
                            },
                            offset: 80,
                            position: 'left',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: '油\n压\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#ccb71f',
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                   color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: '泵\n频\n率\n︵\nH\nz\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#0d66fd',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            max: 50,
                            min: 0,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '含\n水\n︵\n%\n︶',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#0206f7',
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '气\n油\n比\n',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#9dce2f',
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '生\n产\n时\n间\n︵\nH\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fb6112',
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            max: 24,
                            min: 0,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '井\n口\n温\n度\n︵\n℃\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#5a9df2',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: '日\n产\n油\n︵\n方\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#018000',
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: '日\n产\n液\n︵\n方\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#f300f1',
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: '日\n产\n气\n︵\n万\n方\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#f90d03',
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            minInterval: 0,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        /* {
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
                                      }, */
                    ],
                    series: [],
                },
                // 油井 虚拟计量曲线
                oilOption2: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: {
                        data: ['油', '气', '水', '液'],
                    },
                    xAxis: {
                        name: '时间',
                        nameTextStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        type: 'category',
                        data: [],
                    },
                    yAxis: {
                        name: '流量Sm³/d',
                        nameTextStyle: {
                            color: '#8FA4CC',
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
                        },
                    ],
                },
                // 水井折线图内容
                waterOption: {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
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
                    /* toolbox: {
                                  show : true,
                                  feature : {
                                    saveAsImage : {
                                      name :'水井曲线对比分析图',
                                      pixelRatio: 15,//值越大分辨率越高,下载的图片越清晰
                                      backgroundColor:'#022644'
                                    }
                                  }
                                }, */
                    grid: [{
                            left: '14%',
                            top: '8%',
                            width: '74%',
                            height: '42%',
                        },
                        {
                            left: '14%',
                            top: '52%',
                            width: '74%',
                            height: '42%',
                        },
                    ],
                    xAxis: [{
                            gridIndex: 0,
                            type: 'category',
                            data: [
                                '2018-01',
                                '2018-04',
                                '2018-06',
                                '2018-10',
                                '2019-01',
                                '2019-04',
                                '2019-06',
                                '2019-10',
                                '2020-01',
                                '2020-04',
                                '2020-06',
                                '2020-10',
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    // color: '#979797'
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            data: [
                                '2018-01',
                                '2018-04',
                                '2018-06',
                                '2018-10',
                                '2019-01',
                                '2019-04',
                                '2019-06',
                                '2019-10',
                                '2020-01',
                                '2020-04',
                                '2020-06',
                                '2020-10',
                            ],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                // show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    // color: '#979797'
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                    ],
                    yAxis: [{
                            gridIndex: 0,
                            name: '注\n入\n时\n间\n︵\nh\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            max: 24,
                            min: 0,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                // show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: '井\n口\n压\n力\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: '套\n压\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //   show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '水\n聚\n总\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '日\n配\n注\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '日\n注\n聚\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            position: 'right',
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '日\n注\n水\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [],
                },
                waterRealOption: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                        },
                    },
                    grid: [{
                            x: '80',
                            y: '4%',
                            width: '92%',
                            height: '40%',
                        },
                        {
                            x: '80',
                            y: '50%',
                            width: '92%',
                            height: '40%',
                        },
                    ],
                    xAxis: [{
                            show: false,
                            gridIndex: 0,
                            type: 'category',
                            data: [],
                            axisLabel: {
                                show: true,
                                color: 'rgba(255,255,255,0)',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                color: '#FFFFFF',
                            },
                            axisTick: {
                                show: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                },
                            },
                        },
                    ],
                    yAxis: [{
                            gridIndex: 0,
                            name: '注水压力\n（MPa）',
                            nameGap: 40,
                            nameLocation: 'center',
                            nameRotate: 90,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                // lineHeight: 80
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#FFFFFF',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#FFFFFF',
                                },
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            name: '注水量\n（m³/d）',
                            nameLocation: 'center',
                            nameRotate: 90,
                            nameGap: 40,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                // lineHeight: 80
                            },
                            scale: true,
                            axisLabel: {
                                show: true,
                                color: '#FFFFFF',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#FFFFFF',
                                },
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                    ],
                    series: [{
                            name: '注水压力',
                            type: 'line',
                            showAllSymbol: false,
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [],
                        },
                        {
                            name: '注水量',
                            type: 'line',
                            showAllSymbol: false,
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: [],
                        },
                    ],
                },
                wellType: '',
                // 油井选择内容
                oilTabType: '0',
                // 水井选择内容
                waterTabType: '0',
                // 下载权限
                canDownload: false,
                // 选择日期时间 虚拟计量时间选择框
                selectDateTime: new Date(),
            };
        },
        computed: {
            childParamsList() {
                return this.checkList.map((item) => item.childParams).flat(Infinity);
            },
            defaultType() {
                return this.defaultTypeList
                    .map(
                        (arr, index) => arr.filter((item) => this.queryParams.paramCodes.includes(
                            item)), // [[1,2],[3,4]] //[2,3]
                    )
                    .filter((item) => item.length);
            },
        },
        mounted() {
            if(this.$route.query.dateTime){
               this.dateTime =this.$route.query.dateTime;
            }else{
               this.dateTime = new Date().format('yyyy');
            }
            this.initData();
            this.initSearchSelect();
        },
        methods: {
            selectBtn(item) {
                if (this.oilTabType != item.oilTabType) {
                    this.oilTabType = item.oilTabType;
                    this.doSearchCharts();
                }
            },
            selectBtn2(item) {
                if (this.waterTabType != item.waterTabType) {
                    this.waterTabType = item.waterTabType;
                    this.doSearchCharts();
                }
            },
            //初始化
            async initData() {  
                const {oilFieldId} = this.$route.query;
                const {platformId} = this.$route.query;
                const {selectWellId} = this.$route.query;
                const {selectMeasuresId} = this.$route.query;
                const {measuresDate} = this.$route.query;
                const {wellNameNano} = this.$route.query;
                const {wellBoreName} = this.$route.query;
                this.canDownload = this.$route.query.canDownload;   
                console.log(this.$route.query.wellType);
                const { wellType} = this.$route.query;
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
                // this.selectData.push(new Date(this.measuresDate).format('yyyy-MM-dd'));
                // this.selectData.push(new Date(this.measuresDate).addDays(30).format('yyyy-MM-dd'));
                // 获得年份
                const year = new Date().getFullYear();
                this.selectData = [new Date(`${year}-01-01`).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
                this.selectRealData = [new Date().addDays(-1).format('yyyy-MM-dd'), new Date().format(
                'yyyy-MM-dd')];
                // this.selectData.push(new Date(year+'-01-01').format('yyyy-MM-dd'));
                // this.selectData.push(new Date().format('yyyy-MM-dd'));
                this.getFetchMeasureStatInfos(
                    this.selectOilField,
                    this.selectPlatform,
                    this.selectWellId,
                    this.selectMeasuresId,
                    this.measuresDate,
                    this.page,
                    this.pageSize,
                    this.wellType,
                    this.wellBoreName,
                );
                this.getWorkProgress();
                this.doSearchCharts();
            },
            async initSearchSelect() {
                //油田
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFields = res.data.data.oilFields;
                    }
                });
                //平台
                this.getFetchPlatforms(this.selectOilField);
                //初始化需要根据油田
                const requestWell = {
                    oilFieldId: this.selectOilField,
                };
                await fetchProductionWells(requestWell).then((res) => {
                    if (res.data.code == 200) {
                        let wellData=res.data.data.productionWells;
                        if(wellData.length){
                            const wellList = wellData.filter(el=>el.wellName);
                            this.wells = [...wellList];
                        }
                    }
                });
                await fetchInjectionWells(requestWell).then((res) => {
                    if (res.data.code == 200) {
                        const wellList = res.data.data.injectionWell;
                        this.wells = [...this.wells, ...wellList];
                    }
                });
                this.wells.unshift({
                    wellId: '',
                    wellName: '全部'
                });
                //措施事件
                this.getMeasureNameAndCode(this.selectOilField, this.selectPlatform, this.wellId, this.measuresType, this.dateTime, this.page, this.pageSize, 0);
            },
            //措施事件下拉框数据源
            getMeasureNameAndCode(oilFieldId, platformId, wellId, measureId, year, page, pageSize, isStimTypeCodeOrNot) {
              const wellArray = [];
              wellArray.push(wellId);
              const request = {
                oilFieldId,
                platformId,
                wellId: wellArray,
                measureId,
                year,
                page,
                pageSize,
                isStimTypeCodeOrNot,
              }
              nameAndCode(request).then((res) => {      
                if (res.data.code == 200) {
                  this.measuresTypes = res.data.data.namesAndCodes;
                  this.measuresTypes.unshift({ code: '', name: '全部' });
                }
              });
            },
            //油田下拉框change事件
            onFieldChange(val) {
              this.getFetchPlatforms(val);
            },
            //根据油田id查-平台数据
            getFetchPlatforms(oilFieldId) {
              const request = {oilFieldId};
              fetchPlatforms(request).then((res) => {
                if (res.data.code == 200) {
                  this.platforms = res.data.data.platform;
                }
              });
            },
            //平台下拉框change事件
            onPlatfromChange(val) {
              this.getFetchWells(this.selectOilField, val);
            },
            //通过油田或平台-查井号
            getFetchWells(oilFieldId, platformId) {
                this.wells = [];
                if (oilFieldId == platformId) {
                    const request = {
                        oilFieldId,
                    };
                    fetchProductionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData=res.data.data.productionWells||[];
                            if(wellData.length){
                                const wellList = wellData.filter(el=>el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                    fetchInjectionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            const waterWellList = res.data.data.injectionWell || [];
                            this.wells = this.wells.concat(waterWellList);
                        }
                    });
            
                } else {
                    const request = {
                        platformId,
                    };
                    fetchProductionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            const oilWellList = res.data.data.productionWells || [];
                            this.wells = this.wells.concat(oilWellList);
                        }
                    });
                    fetchInjectionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData=res.data.data.productionWells||[];
                            if(wellData.length){
                                const wellList = wellData.filter(el=>el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                }
                this.wells.unshift({
                    wellId: '',
                    wellName: '全部'
                });
                this.selectWellId='';
            },
            //检索文件
            doSearch() {
                this.doSearchCharts();
                this.getFetchMeasureStatInfos(
                    this.selectOilField,
                    this.selectPlatform,
                    this.selectWellId,
                    this.selectMeasuresId,
                    this.measuresDate,
                    this.page,
                    this.pageSize,
                    this.wellType,
                );
                this.queryParams.page =1;
                this.getWorkProgress();
            },
            //化验数据列表
            getFetchMeasureStatInfos(oilFieldId, platformId, wellId, measureId, yearMonth, page, pageSize, wellType,wellBoreName) {
                const wellArray = [];
                wellArray.push(wellId);
                const wellBoreArray = [];
                wellBoreArray.push(wellBoreName);
                const request = {
                    oilFieldId,
                    platformId,
                    wellId: wellArray,
                    wellBoreName: wellBoreArray,
                    measureId,
                    yearMonth,
                    page,
                    pageSize,
                    wellType,
                };
                this.tableData = [];
                this.chemicalTableData = [];
                fetchMeasureStatInfos(request).then((res) => {
                    console.log(res, 99)
                    if (res.data.code == 200) {
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
            //作业信息列表接口
            getWorkProgress(){
                const request = {
                    ogfId:this.selectOilField,
                    prodPlatformId:this.selectPlatform==this.selectOilField?'':this.selectPlatform,
                    wellId:this.selectWellId,
                    year:this.dateTime,
                    pageNum:this.queryParams.page,
                    pageSize:this.queryParams.pageSize,
                };
                getWorkProgress(request).then(res=>{
                    console.log(res,777)
                    if (res.data.code == 200) {
                        this.pageTotal2=res.data.data.total;
                        this.getWorkProgressData = res.data.data.rows;
                    }
                })
            },
            pagination(e){
              this.queryParams.page = e.page;
              this.queryParams.pageSize = e.limit;
              this.getWorkProgress();
            },
            //改变当前页 跳转下一页
            handleChangePage(pageValue) {
                const page = pageValue;
                const {
                    pageSize
                } = this;
                this.getFetchMeasureStatInfos(
                    this.oilFieldId,
                    this.plarformId,
                    this.wellId,
                    this.measureId,
                    this.year,
                    page,
                    pageSize,
                    this.wellType,
                );
            },
            //改变当前页大小
            handleChangePageSize(rowsValue) {
                this.pageSize = rowsValue;
                const {
                    page
                } = this;
                const pageSize = rowsValue;
                this.getFetchMeasureStatInfos(
                    this.oilFieldId,
                    this.plarformId,
                    this.wellId,
                    this.measureId,
                    this.year,
                    page,
                    pageSize,
                    this.wellType,
                );
            },
            //上传文件
            async useUploadPic(file, fileList) {
                if (fileList.length > 1) {
                    this.fileList.slice(-1);
                }
                // 获得油田参数
                const oilFieldid = this.selectOilField;
                // 获得平台id
                const platForm = this.selectPlatform;
                // 获得井号
                const wellId = this.selectWellId;
                // 获得措施id
                const measuresId = this.selectMeasuresId;
                // 措施时间
                const {
                    measuresDate
                } = this;
                // 一级目录 油井目录
                const firstPath = 'cssj';
                // 文件类型
                const fileType = file.raw.type;
                if (fileType != 'application/pdf') {
                    this.$message.error('请上传pdf格式文件');
                    return;
                }
                // 获得图片二进制流
                const fileData = await this.selectImageFile(file.raw);
                const fileDataNew = fileData.replace(/^data:\w+\/\w+;base64,/, '');
                // 文件名称拼接
                const fileName = `${wellId}_${measuresId}_${measuresDate}`;
                // 请求参数
                const request = {
                    contentType: fileType,
                    data: fileDataNew,
                    fieldId: oilFieldid,
                    fileName,
                    operatingCompanyId: '',
                    path: firstPath,
                    platformId: platForm,
                    wellGroupId: '',
                    wellId,
                    wellTypeCode: '',
                };
                console.log(request);
                uploadFile(request).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success('文件上传成功');
                        this.doSearch();
                    }
                });
            },
            //解析图片文件 图片文件转Base64流
            selectImageFile(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (result) => {
                        resolve(reader.result);
                    };
                });
            },
            //返回
            switchToBack() {
                this.$router.go(-1);
            },
            //执行油井搜索 移植过来 代码未简化 不影响性能
            doOilSearch() {
                const startDate = this.selectData[0];
                const endDate = this.selectData[1];
                const request = {
                    beginDate: startDate,
                    endDate,
                    ogfId: this.selectOilField,
                    platformId: this.selectPlatform,
                    wellId: this.selectWellId,
                };
                produceData(request).then((res) => {
                    const seriesData = [];
                    const legendData = [];
                    if (res.data.code == 200) {
                        const chartDataS = res.data.data.charts;
                        // 获取x轴数据信息
                        const xSet = new Set();
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (!chartDataS[i].linearDataSets) {
                                continue;
                            }
                            const chartData = chartDataS[i].linearDataSets[0];
                            const chartDatalabel = chartData.label;
                            legendData.push(chartDatalabel);
                            const series = {};
                            const lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            if (lineName == '含水') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                                series.itemStyle={color:'#0206f7'}
                            } else if (lineName == '日产油') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                                series.itemStyle={color:'#018000'}
                            } else if (lineName == '日产液') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                                series.itemStyle={color:'#f300f1'}
                            } else if (lineName == '流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                                series.itemStyle={color:'#ff8e08'}
                            } else if (lineName == '油压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                                series.itemStyle={color:'#ccb71f'}
                            } else if (lineName == '泵频率') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 3;
                                series.itemStyle={color:'#0d66fd'}
                            } else if (lineName == '井口温度') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 7;
                                series.itemStyle={color:'#5a9df2'}
                            } else if (lineName == '折算基准面流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                                series.itemStyle={color:'#fe10f6'}
                            } else if (lineName == '日产液量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                                series.itemStyle={color:'#f300f1'}
                            } else if (lineName == '日产油量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                                series.itemStyle={color:'#018000'}
                            } else if (lineName == '日产气量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 10;
                                series.itemStyle={color:'#f90d03'}
                            } else if (lineName == '气油比') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                                series.itemStyle={color:'#9dce2f'}
                            } else if (lineName == '生产时间') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                                series.itemStyle={color:'#fb6112'}
                            } else {
                                continue;
                            }
                            // 折线数据
                            const lineData = chartData.linearData;
                            const pointData = [];
                            for (let i = 0; i < lineData.length; i++) {
                                const point = [];
                                point.push(lineData[i].label);
                                xSet.add(lineData[i].label);
                                point.push(lineData[i].value);
                                pointData.push(point);
                            }
                            series.data = pointData;
                            series.showSymbol = false;
                            seriesData.push(series);
                        }
                        const xData = Array.from(xSet).sort();
                        this.oilOption.xAxis[0].data = xData;
                        this.oilOption.xAxis[1].data = xData;
                        this.oilOption.xAxis[2].data = xData;
                        this.oilOption.series = seriesData;

                        console.log(this.oilOption, 7788)

                    }
                });
            },
            //执行水井搜索 移植过来的 代码未简化 不影响性能
            doWaterSearch() {
                const startDate = this.selectData[0];
                const endDate = this.selectData[1];
                const request = {
                    beginDate: startDate,
                    endDate,
                    ogfId: this.selectOilField,
                    platformId: this.selectPlatform,
                    wellId: this.selectWellId,
                };
                produceData(request).then((res) => {
                    console.log('res', res)
                    const seriesData = [];
                    const legendData = [];
                    // 获取x轴数据信息
                    const xSet = new Set();
                    if (res.data.code == 200) {
                        const chartDataS = res.data.data.charts;
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (chartDataS[i].linearDataSets == null || chartDataS[i].linearDataSets ==
                                undefined) {
                                continue;
                            }
                            const chartData = chartDataS[i].linearDataSets[0];
                            const chartDatalabel = chartData.label;
                            const series = {};
                            const lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            legendData.push(series.name);
                            // 数据所属图像
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
                            // 折线数据
                            const lineData = chartData.linearData;
                            const pointData = [];
                            for (let i = 0; i < lineData.length; i++) {
                                const point = [];
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
                    const xData = Array.from(xSet).sort();
                    this.waterOption.xAxis[0].data = xData;
                    this.waterOption.xAxis[1].data = xData;
                    this.waterOption.series = seriesData;
                    console.log('this.waterOption', this.waterOption)
                });
            },
            //检索图形
            doSearchCharts() {
                if (this.type == '0') {
                    switch (this.oilTabType) {
                        case '0': {
                            this.doOilSearch();
                        }
                        break;
                    case '1': {
                        this.queryParams.platId = this.selectPlatform;
                        this.queryParams.borepipeId = this.selectWellId;
                        this.fetchProduceParams();
                        this.getRealtimeData();
                    }
                    break;
                    case '2': {
                        this.doWellFluxLastDayHour();
                    }
                    break;
                    case '3': {}
                    break;
                    default: {}
                    }
                } else if (this.type == '1') {
                    switch (this.waterTabType) {
                        case '0': {
                            this.doWaterSearch();
                        }
                        break;
                    case '1': {
                        this.fetchIntervalWorkConditionDataCurve(0, '008');
                        this.fetchIntervalWorkConditionDataCurve(1, '009');
                    }
                    break;
                    default: {}
                    }
                }
            },
            //水井实时 i 为图中位置 code 008 009
            fetchIntervalWorkConditionDataCurve(i, code) {
                const request = {
                    code,
                    ogfId: this.selectOilField,
                    platId: this.selectPlatform,
                    borepipeId: this.selectWellId,
                    beginDate: this.selectRealData[0],
                    endDate: this.selectRealData[1],
                };
                getIntervalWorkConditionDataCurve(request).then((data) => {
                    const {
                        code
                    } = data.data;
                    if (code == 200) {
                        const res = data.data.data;
                        const xData = [];
                        const yData = [];
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
            //下载文档 跳转至方案查看
            switchToPlan(filePath, fileType) {
                const fp = encodeURI(filePath);
                const ft = fileType;
                const request = {
                    filePath: fp,
                    fileType: ft,
                };
                getDocDownloadUrl(request).then((res) => {
                    if(res.code==200){
                        const fn = res.headers.filename;
                        const fileName = decodeURI(fn);
                        fileSaver.saveAs(res.data, fileName);
                    }
                })
            },
            fatchAllData() {
                this.getRealtimeData();
            },
            fetchProduceParams() {
                getProduceParams().then((data) => {
                    const {
                        code
                    } = data.data;
                    if (code == 200) {
                        this.checkList = data.data.data;
                        this.checkList
                            .map((item) => item.childParams)
                            .flat(Infinity)
                            .forEach((item) => {
                                console.log(item.paramName, ' : ', item.paramCode);
                            });
                    }
                });
            },
            //判断是否可选中
            isDisabled(select, index) {
                /* this.getRealtimeData(); */
                if (!select.length) {
                    this.isSelect = null;
                } else {
                    const obj = this.childParamsList.find((child) => child.paramCode == select[0]);
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
                    const {
                        code
                    } = data.data;
                    if (code == 200) {
                        const res = data.data.data;
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
                // 求实时数据中的x轴，，
                const xSet = new Set();
                for (const [key, value] of Object.entries(this.realTimeData)) {
                    // 判断value是否为数组
                    if (Array.isArray(value)) {
                        value.forEach((item, index) => {
                            xSet.add(item.date);
                        });
                    } else {
                        return true;
                    }
                }
                // 对x轴做排序
                const xArray = Array.from(xSet).sort();
                this.optionRealData = {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                    },
                    /* legend: {}, */
                    grid: [
                        ...this.defaultType
                        .map(
                            (arr, index) => arr.filter((item) => this.queryParams.paramCodes.includes(
                                item)), // [[1,2],[3,4]] //[2,3]
                        )
                        .map((item, index) => {
                            if (this.chartDataType == 'real') {
                                return {
                                    top: `${4 + 30 * index + index}%`,
                                    height: '28%',
                                    left: '20%',
                                    right: '20%',
                                    width: '60%',
                                };
                            }
                            if (this.chartDataType == 'date') {
                                return {
                                    top: `${4 + 22 * index + index}%`,
                                    height: '22%',
                                    left: '20%',
                                    right: '20%',
                                    width: '60%',
                                };
                            }
                        }),
                    ],
                    xAxis: [
                        ...this.defaultType
                        .map((arr, index) => arr.filter((item) => this.queryParams.paramCodes.includes(item)))
                        .map((item, index) => ({
                            gridIndex: index,
                            type: 'category',
                            /* data: (this.realTimeData[0] && this.realTimeData[0].paramValues)
                                              ? this.realTimeData[0].paramValues.map((item) => item.date)
                                              : [], */
                            data: xArray,
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    // color: '#979797'
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        })),
                    ],
                    yAxis: [
                        ...this.defaultType
                        .map((arr, typeIndex) =>
                            arr
                            .filter((item) => this.queryParams.paramCodes.includes(item))
                            .map((item, index) => ({
                                gridIndex: typeIndex,
                                name: this.childParamsList.find((param) => param.paramCode == item) ?
                                    `${this.childParamsList
                        .find((param) => param.paramCode == item)
                        .paramName.split('')
                        .join('\n')}\n${this.paramsList.find((param) => param.paramCode == item).unit}` : '',
                                nameLocation: 'center',
                                offset: Math.floor(index / 2) * 70,
                                nameRotate: 360,
                                nameGap: 50,
                                position: index % 2 ? 'right' : 'left',
                                minInterval: 2,
                                scale: true,
                                nameTextStyle: {
                                    color: this.color[(typeIndex + index) % 10],
                                },
                                axisLabel: {
                                    show: true,
                                    color: '#8FA4CC',
                                    minInterval: 0,
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    // show: false,
                                    lineStyle: {
                                        color: '#979797',
                                    },
                                },
                                splitLine: {
                                    show: false,
                                },
                            })),
                        )
                        .flat(Infinity),
                    ],
                    series: [
                        ...this.defaultType
                        .map((arr, typeIndex, parentArr) =>
                            arr
                            .filter((item) => this.queryParams.paramCodes.includes(item))
                            .map((paramCode, index) => ({
                                type: 'line',
                                xAxisIndex: typeIndex,
                                yAxisIndex: parentArr
                                    .map((item) => item)
                                    .flat(Infinity)
                                    .indexOf(paramCode),
                                /* data: this.realTimeData.find(
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
                                                      : [], */
                                data: this.realTimeData[paramCode] ?
                                    this.realTimeData[paramCode].map((item) => [item.date, item
                                        .paramValue
                                    ]) : [],
                                name: this.childParamsList.find((item) => item.paramCode == paramCode)
                                    .paramName,
                                label: {
                                    show: false,
                                    color: '#fff',
                                    fontSize: 14,
                                },
                                /* lineStyle: {
                                                      color: "#00BC9C",
                                                    }, */
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                itemStyle: {
                                    color: this.color[(typeIndex + index) % 10],
                                    borderColor: 'rgba(255,255,255,0.32)',
                                    borderWidth: 2,
                                    borderType: 'solid',
                                },
                            })),
                        )
                        .flat(Infinity),
                    ],
                };
                // 如果x轴大于1条，只显示最下层的x轴的坐标信息
                if (this.optionRealData.xAxis.length > 1) {
                    const arr = this.optionRealData.xAxis;
                    for (let i = 0; i < arr.length - 1; i++) {
                        arr[i].axisLabel.show = false;
                    }
                }
                if (this.canDownload) {
                    let fileName = '';
                    if (this.chartDataType == 'real') {
                        fileName = `${this.wellName ? this.wellName : ''}实时数据`;
                    } else if (this.chartDataType === 'date') {
                        fileName = `${this.wellName ? this.wellName : ''}日度数据`;
                    } else {
                        fileName = `${this.wellName ? this.wellName : ''}图表`;
                    }
                    const toolBox = {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: fileName,
                                pixelRatio: 15, // 值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                            },
                        },
                    };
                    this.optionRealData.toolbox = toolBox;
                }
            },
            //根据井号id转换对应实时数据的井名信息
            transformBorepipeNo(borepipeId) {
                transformBorepipeNo(borepipeId).then((res) => {
                    if (res.data.code == 200) {
                        this.wellName = res.data.data;
                    } else {
                        this.wellName = '';
                    }
                });
            },
            //初始化Mqtt数据
            initMqttMess() {
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: '/edge_electric_submersible_pump_monitor/qhd32-6cepi',
                    message: (e) => {
                        this.pumpRealDataI = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        });
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: '/edge_electric_submersible_pump_monitor/qhd32-6cepj',
                    message: (e) => {
                        this.pumpRealDataJ = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        });
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: '/edge_electric_submersible_pump_monitor/qhd32-6whpc',
                    message: (e) => {
                        this.pumpRealDataC = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        });
                    },
                });
                this.initMqtt(process.env.SOCKET_URL, {
                    topic: '/edge_electric_submersible_pump_monitor/qhd32-6whph',
                    message: (e) => {
                        this.pumpRealDataH = e.data;
                        this.$nextTick(() => {
                            this.getPumpRealData();
                        });
                    },
                });
            },
            //获得泵工况数据信息
            getPumpRealData() {
                // 泵数据
                let pumpWellData = [];
                if (this.queryParams.platId == '3F1E5858C6CC41E2BF4FFC4902797C08') {
                    // 获得i平台实时数据
                    pumpWellData = this.pumpRealDataI;
                } else if (this.queryParams.platId == 'FA1CF76628104FB383BB444C8861BFCB') {
                    // 获得j平台实时数据
                    pumpWellData = this.pumpRealDataJ;
                } else if (this.queryParams.platId == '0C118F2856574256A8F1BBA26F99BA1A') {
                    // 获得c平台实时数据
                    pumpWellData = this.pumpRealDataC;
                } else if (this.queryParams.platId == '89A1EF273FD748A7BD922E6458ACE128') {
                    // 获得h平台实时数据
                    pumpWellData = this.pumpRealDataH;
                }
                if (this.wellName) {
                    const wellThing = pumpWellData.find((item) => item.well_id == this.wellName);
                    if (wellThing) {
                        this.pumpData = wellThing;
                    } else {
                        this.pumpData = {};
                    }
                } else {
                    this.pumpData = {};
                }
            },
            //返回数据为已封装好的集合数据
            fetchAllData() {
                if (this.oilTabType == '1') {
                    this.queryParams.platId = this.selectPlatform;
                    this.queryParams.borepipeId = this.selectWellId;
                    this.fetchProduceParams();
                    this.getRealtimeData();
                }
            },
            //el table 表格头 标题单位样式
            renderHeader(h, {
                column
            }) {
                const header = column.label.split(' ');
                return [h('p', [h('p', {}, header[0]), h('span', {}, header[1])])];
            },
            //虚拟计量内容 查询
            doWellFluxLastDayHour() {
                const request = {
                    date: this.selectDateTime,
                    wellName: this.wellNameNano,
                };
                const xData = [];
                const seriesData1 = [];
                const seriesData2 = [];
                const seriesData3 = [];
                const seriesData4 = [];
                wellFluxLastDayHour(request)
                    .then((res) => {
                        if (res.data.code == 200) {
                            const tableList = res.data.data;
                            tableList.forEach((item) => {
                                xData.push(item.M_CREATE);
                                const oil = parseFloat(Number(Number(item.M_FO_STDVOL) * 60 * 60 * 24)
                                    .toFixed(2));
                                const gas = parseFloat(Number(Number(item.M_FG_STDVOL) * 60 * 60 * 24)
                                    .toFixed(2));
                                const water = parseFloat(Number(Number(item.M_FW_STDVOL) * 60 * 60 * 24)
                                    .toFixed(2));
                                const fluid = parseFloat(Number(oil + water).toFixed(2));
                                seriesData1.push([item.M_CREATE, oil]);
                                seriesData2.push([item.M_CREATE, gas]);
                                seriesData3.push([item.M_CREATE, water]);
                                seriesData4.push([item.M_CREATE, fluid]);
                            });
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
                    })
                    .catch((err) => {
                        this.oilOption2.xAxis.data = xData;
                        this.oilOption2.series[0].data = seriesData1;
                        this.oilOption2.series[1].data = seriesData2;
                        this.oilOption2.series[2].data = seriesData3;
                        this.oilOption2.series[3].data = seriesData4;
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
       .layout {
            height: 100%;
            display:flex;
            flex-direction: column;
            .searchBox{
                height:140px;
            }
            .main {
                flex:1;
                height: 0;
                display: flex;
                flex-direction: column;
                .main-row2 {
                    height: calc( 100% - 182px );
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
            
                .svg {
                    flex: 1;
                    height:0;
                    padding-top: 10px;
                    display: flex;
                    flex-direction: column;
            
                    .search-date {
                        padding-bottom: 15px;
                    }
            
                    .echarts-view {
                        flex: 1;
                    }
            
                    .table-view {
                        flex: 1;
                        height:0;
                        padding-bottom: 75px;
                    }
            
                }
            }
        }
    }


    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }

    .titleBox {
        margin-bottom: 14px;
    }

    .f2 {
        width: 250px !important;
    }

    .f3 {
        width: 180px !important;
    }

    .mg {
        margin-left: 15px;
    }
</style>
