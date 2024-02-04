<!-- 措施计划情况 -->
<template>
    <div class="app-container" style="height:calc(100% - 60px)">
        <headerSearch class="g-w100 g-h100" style="width: 100%">
            <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">

                <el-form-item label="油田：">
                    <el-select v-model="queryParams.selectOilField" @change="changepla">
                        <el-option
                            v-for="item in oilFields"
                            :key="item.oilFieldId"
                            :label="item.oilFieldName"
                            :value="item.oilFieldId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台：">
                    <el-select
                        v-model="queryParams.selectPlatform"
                        style="width: 220px"
                        placeholder="请选择"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item in platform"
                            :key="item.platFormId"
                            :label="item.platName"
                            :value="item.platFormId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker v-model="queryParams.endTime" value-format="yyyy-MM-dd" type="date"
                                    placeholder="年/月/日">
                    </el-date-picker>
                </el-form-item>
                <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search"
                           style="margin-left: 10px"
                >搜索
                </el-button
                >
                <el-button class="commonBtn" @click="reset" icon="el-icon-refresh"> 重置</el-button>
                <el-button style="float: right" type="primary" @click="returnrouter">返回</el-button>
            </el-form>
        </headerSearch>


        <pagePanel headerTitle="措施计划情况表" style="height: calc(100% - 20px)">
            <el-form>
                <el-form-item>
                    <el-button
                        type="primary"
                        style="float: right"
                        icon="el-icon-download"
                        @click="doDownExcel()"
                    >
                        下载
                    </el-button> 
                </el-form-item>
            </el-form>
            <el-table
                :data="noticeList"
                highlight-current-row
                :span-method="objectSpanMethod"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '2px' }"
                height="calc(100% - 50px)"
                style="overflow-y:hidden"
                id="xczyjhb"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="序号" prop="Nosort" width="50px" align="center"></el-table-column>
                <el-table-column label="井基本信息" prop="wellId" align="center">
                    <el-table-column sortable label="井号" prop="wellNo" min-width="200px" align="center">
                    </el-table-column>
                    <el-table-column sortable label="推荐措施" prop="measType" min-width="120px" align="center">
                    </el-table-column>
                    <el-table-column label="生产层位" sortable prop="layerName" min-width="200px" align="center"
                                     class-name="cellWrap">
                        <template slot-scope="scope">
                            <span v-if="scope.row.layerName !== null && scope.row.layerName !== ''"
                                  v-html="scope.row.layerName"></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属区块" sortable prop="blockName" min-width="200px" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.blockName !== null && scope.row.blockName !== ''">{{
                                    scope.row.blockName
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="`油层厚度 \n（m）`"  width="130px" prop="reservoirThickness"
                                     align="center" class-name="cellWrap">
                        <template slot-scope="scope">
                            <span v-if="scope.row.reservoirThickness !== null && scope.row.reservoirThickness !== ''"
                                  v-html="scope.row.reservoirThickness"></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="`水平段长度 \n（m）`" sortable min-width="130px" prop="horizonIntervalLen"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.horizonIntervalLen !== null && scope.row.horizonIntervalLen !== ''">{{
                                    scope.row.horizonIntervalLen.toFixed(2)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="完井方式" sortable min-width="130px" prop="completionMethod" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.completionMethod !== null && scope.row.completionMethod !== ''">{{
                                    scope.row.completionMethod
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="生产现状" prop="name" align="center">
                    <el-table-column sortable :label="`投产日期\n    （yyyy-mm-dd）`" min-width="200" prop="startDate"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.startDate !== null && scope.row.startDate !== ''">{{
                                    scope.row.startDate
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`日产液\n（m³）`" min-width="130px" prop="fluidProdDaily"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.fluidProdDaily !== null && scope.row.fluidProdDaily !== ''">{{
                                    scope.row.fluidProdDaily
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`日产油\n（m³）`" min-width="130px" prop="oilProdDaily"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.oilProdDaily !== null && scope.row.oilProdDaily !== ''">{{
                                    scope.row.oilProdDaily
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`含水\n（%）`" min-width="130px" prop="waterRatio" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.waterRatio !== null && scope.row.waterRatio !== ''">{{
                                    scope.row.waterRatio
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`泵频\n（Hz）`" min-width="100px" prop="pumpFrequency"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.pumpFrequency !== null && scope.row.pumpFrequency !== ''">{{
                                    scope.row.pumpFrequency
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`累产油\n（10⁴m³）`" min-width="130px" prop="cumOilProdYearly"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.cumOilProdYearly !== null && scope.row.cumOilProdYearly !== ''">{{
                                    Number(scope.row.cumOilProdYearly / 10000).toFixed(4)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`地层压力测试时间\n （yyyy-mm-dd）`" prop="testDate" min-width="200"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.testDate !== null && scope.row.testDate !== ''">{{
                                    (scope.row.testDate)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`测试压力值\n（MPa）`" min-width="130px"
                                     prop="basalLevelStaticPress" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.basalLevelStaticPress !== null && scope.row.basalLevelStaticPress !== ''">{{
                                    (scope.row.basalLevelStaticPress)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`流压\n（MPa）`" min-width="130px" prop="flowPress" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.flowPress !== null && scope.row.flowPress !== ''">{{
                                    scope.row.flowPress
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`生产压差\n（MPa）`" min-width="130px" prop="productPress"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.productPress !== null && scope.row.productPress !== ''">{{
                                    scope.row.productPress
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="120px" :label="`井控储量\n(10⁴m³)`" prop="probReservesWell"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.probReservesWell !== null && scope.row.probReservesWell !== ''">{{
                                    Number(scope.row.probReservesWell).toFixed(4)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`剩余可采储量\n(10⁴m³)`" prop="remainingRecoverableReserves"
                                     min-width="130px" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.remainingRecoverableReserves !== null && scope.row.remainingRecoverableReserves !== ''">{{
                                    !isNaN(Number(scope.row.remainingRecoverableReserves)) ? Number(scope.row.remainingRecoverableReserves).toFixed(4) : "-"
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable :label="`采液指数\n（m³/d.MPa）`" min-width="150px"
                                     prop="fluidProductionIndex" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.fluidProductionIndex !== null && scope.row.fluidProductionIndex !== ''">{{
                                    scope.row.fluidProductionIndex
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="预测值" prop="name" align="center">
                    <el-table-column sortable min-width="120px" :label="`产液值\n（m³/d）`" prop="forecastFluid"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastFluid !== null && scope.row.forecastFluid !== ''">{{
                                    scope.row.forecastFluid
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="100px" :label="`含水\n（%）`" prop="forecastWaterRatio"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastWaterRatio !== null && scope.row.forecastWaterRatio !== ''">{{
                                    scope.row.forecastWaterRatio
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="120px" :label="`日增油\n（m³）`" prop="forecastOilInc"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastOilInc !== null && scope.row.forecastOilInc !== ''">{{
                                    scope.row.forecastOilInc
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="120px" :label="`日产油\n（m³）`" prop="forecastOil"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastOil !== null && scope.row.forecastOil !== ''">{{
                                    scope.row.forecastOil
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="120px" :label="`生产压差\n（MPa）`" prop="forecastProductPress"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastProductPress !== null && scope.row.forecastProductPress !== ''">{{
                                    scope.row.forecastProductPress
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="120px" :label="`流压\n（MPa）`" prop="forecastFlowPress"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.forecastFlowPress !== null && scope.row.forecastFlowPress !== ''">{{
                                    scope.row.forecastFlowPress
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="其他因素" prop="name" align="center">
                    <el-table-column sortable min-width="130px" :label="`排量效率\n(%)`" prop="displacementEfficiency"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.displacementEfficiency !== null && scope.row.displacementEfficiency !== ''">{{
                                    scope.row.displacementEfficiency
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" :label="`历史出砂(d)`" prop="historySandDay"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.historySandDay !== null && scope.row.historySandDay !== ''">{{
                                    scope.row.historySandDay
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" :label="`近期出砂(d)`" prop="sandDay" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.sandDay !== null && scope.row.sandDay !== ''">{{
                                    scope.row.sandDay
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" :label="`出砂量(%)`" prop="sandValue" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.sandValue !== null && scope.row.sandValue !== ''">{{
                                    scope.row.sandValue
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="150px" :label="`防砂措施`" prop="sandMeasure" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.sandMeasure !== null && scope.row.sandMeasure !== ''">{{
                                    scope.row.sandMeasure
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="150px" :label="`措施时间\n(yyyy-mm-dd)`" prop="measureTime" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.measureTime !== null && scope.row.measureTime !== ''">{{
                                    scope.row.measureTime
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" label="电泵情况" prop="pumpCondition" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.pumpCondition !== null && scope.row.pumpCondition !== ''">{{
                                    scope.row.pumpCondition
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" label="管柱情况" prop="tubularColumnCondition"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.tubularColumnCondition !== null && scope.row.tubularColumnCondition !== ''">{{
                                    scope.row.tubularColumnCondition
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="190px" label="海管名称" prop="pipeline" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.pipeline" placement="top"
                                        v-if="scope.row.pipeline !== null && scope.row.pipeline !== ''">
                                <div
                                    class="name-wrapper"
                                    style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; position: relative"
                                >
                                    <span>{{ scope.row.pipeline ? scope.row.pipeline : "-" }}</span>
                                </div>
                            </el-tooltip>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column sortable min-width="200px"   label="终止平台名称" prop="toplatformName" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.toplatformName !== null && scope.row.toplatformName !== ''">{{scope.row.toplatformName}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column sortable min-width="130px" :label="`海管余量\n     (m³)`" prop="quantity"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.quantity !== null && scope.row.quantity !== ''"> {{
                                    Number(scope.row.quantity).toFixed(2)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable label="泵能耗预测" min-width="130px" prop="pumpEnergyConsumeForecast"
                                     align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.pumpEnergyConsumeForecast !== null && scope.row.pumpEnergyConsumeForecast !== ''">{{
                                    scope.row.pumpEnergyConsumeForecast
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" label="变频器" prop="frequencyConverter" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.frequencyConverter !== null && scope.row.frequencyConverter !== ''">{{
                                    scope.row.frequencyConverter
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable min-width="130px" label="变压器" prop="transformer" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.transformer !== null && scope.row.transformer !== ''">{{
                                    scope.row.transformer
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </pagePanel>
    </div>
</template>

<script>
import {
    userListByUserNames,
    QueryOgfDetail,
    QueryPlatformDetail
} from "@/api/basic/master";
import {pumpReplaceDetail, pumpReplaceDetailSkip} from "@/api/rem/welldynamicanalysis";
import {
    measureRecommend,
} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {exportExcel} from "@/lib/exportExcel";
import {getOilFieldList} from "@/api/rem/workcompanydesignate.js";
import {
    fetchPlatforms,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";

export default {
    data() {
        return {
            open: false, // 新增弹框
            dialogVisible: false, //运行计算展示弹窗
            title: "", // 弹窗标题
            company: [],
            oilfield: [],
            deptSelect: [],
            // 表格数据
            noticeList: [],
            // 是否展开，默认全部展开
            isExpandAll: true,
            deptList: [],
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 选中数组
            ids: [],
            date: '',
            // 保存数组
            savelist: [],
            oilFields: [],
            platforms: [],
            platform: [],
            queryParams: {
                endTime: "",
                selectPlatform: '',
                selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F"
            },
        };
    },
    created() {
        this.getserch()
        this.queryParams.endTime = this.$route.query.currentDate
        this.getList();
        // this.choiceDepts(); // 获取组织机构
    },
    methods: {
        // formatArray(arr) {
        //     let a=arr.map((item) => {
        //         return item + '<br/>';
        //     }).join('');
        //     return a;
        // },
        changepla(){
          this.getserch() 
        },
        getserch() {
            getOilFieldList({orgId: "715AD1CD60484BB59E737CD18A9DE44A"}).then((res) => {
                if (res.data.code == 200) {
                    this.oilFields = res.data.data;
                    let paraPlatForm = {
                        oilFieldId: this.queryParams.selectOilField,
                    };
                    fetchPlatforms(paraPlatForm).then((res) => {
                        if (res.data.code == 200) {
                            this.platform = res.data.data.platform;
                            this.platform.map((n) => {
                                if (n.platName == '全部') {
                                    n.platFormId = ''
                                }
                            })
                            this.queryParams.selectPlatform = '';
                        }
                    });
                } else {
                    this.$message.error("系统错误请重新尝试或联系运维人员！");
                    this.queryParams.selectPlatform = '';
                }
            });
        },
        retrieval() {
            if (this.$route.query.scourePage === "措施建议表详情") {
                this.queryTableData();
            } else {
                let selectPlatform = ''
                if (this.queryParams.selectPlatform == '') {
                    selectPlatform = '3FC9A818F5BC43B88270DB80BBB3018F'
                } else {
                    selectPlatform = this.queryParams.selectPlatform
                }
                let list =
                    {
                        oilFieldId: this.queryParams.selectOilField,
                        selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
                        evaluationDate: this.queryParams.endTime,
                        platformId: selectPlatform,
                        timeGranularityCode: "",
                        wellId: "",
                        showNormal: true
                    }
                measureRecommend(list).then((res) => {
                    const wells = []
                    res.data?.data?.indicatorAnalysisDetailInfos.map((n) => {
                        if (n.code == this.$route.query.measureCode) {
                            n?.basis?.map((j) => {
                                wells.push(j.id)
                            })
                        }
                    })
                    if (wells.length > 0) {
                        let data = {
                            date: this.queryParams.endTime,
                            ogfId: this.queryParams.selectOilField,
                            platId: selectPlatform,
                            measureCode: this.$route.query.measureCode,
                            wellIds: wells,
                        };
                        pumpReplaceDetail(data).then((res) => {
                            if (res.data.code == 200) {
                                this.noticeList = res.data.data;
                            } else {
                                this.noticeList = []
                            }
                        });
                    }

                })
            }

        },
        doDownExcel() {
            exportExcel("#xczyjhb", "措施计划情况表");
        },
        queryTableData() {
            //jgl
            let selectPlatform = '';
            if (this.queryParams.selectPlatform == '') {
                selectPlatform = '3FC9A818F5BC43B88270DB80BBB3018F'
            } else {
                selectPlatform = this.queryParams.selectPlatform
            }
            let ogfId = '';
            if (this.queryParams.selectOilField == '') {
                ogfId = '3FC9A818F5BC43B88270DB80BBB3018F'
            } else {
                ogfId = this.queryParams.selectOilField
            }
            let params = {
                date: this.queryParams.endTime,
                ogfId: ogfId,
                platId: selectPlatform
            };
            pumpReplaceDetailSkip(params).then(res => {
                if (res.data.code == 200) {
                    this.noticeList = res.data.data;
                } else {
                    this.noticeList = []
                }
            })
        },
        getList() {
            if (this.$route.query.scourePage === "措施建议表详情") {
                this.queryTableData();
            } else {
                let list =
                    {
                        oilFieldId: this.queryParams.selectOilField,
                        selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
                        evaluationDate: this.$route.query.currentDate,
                        platformId: this.$route.query.platform,
                        timeGranularityCode: "",
                        wellId: "",
                        showNormal: true
                    };
                this.queryParams.endTime = this.$route.query.currentDate
                measureRecommend(list).then((res) => {
                    const wells = []
                    res.data?.data?.indicatorAnalysisDetailInfos.map((n) => {
                        if (n.code == this.$route.query.measureCode) {
                            n.basis?.map((j) => {
                                wells.push(j.id)
                            })
                        }
                    })
                    if (wells.length > 0) {
                        let data = {
                            date: this.$route.query.currentDate,
                            ogfId: this.queryParams.selectOilField,
                            platId: this.$route.query.platform,
                            wellIds: wells,
                            measureCode: this.$route.query.measureCode,
                        };
                        pumpReplaceDetail(data).then((res) => {
                            if (res.data.code == 200) {
                                // debugger
                                this.noticeList = res.data.data;
                            } else {
                                this.noticeList = []
                            }
                        });
                    }
                })
            }
        },
        objectSpanMethod({row, column, rowIndex, columnIndex}) {
            const concatList = [
                {col: 0, colName: 'wellNo'},
                {col: 1, colName: 'layerName'},
                {col: 2, colName: 'blockName'},
                {col: 3, colName: 'reservoirThickness'},
                {col: 4, colName: 'horizonIntervalLen'},
                {col: 5, colName: 'completionMethod'},
                {col: 6, colName: 'startDate'},
                {col: 7, colName: 'fluidProdDaily'},
                {col: 8, colName: 'oilProdDaily'},
                {col: 9, colName: 'waterRatio'},
                {col: 10, colName: 'pumpFrequency'},
                {col: 11, colName: 'cumOilProdYearly'},
                {col: 12, colName: 'testDate'},
                {col: 13, colName: 'basalLevelStaticPress'},
                {col: 14, colName: 'flowPress'},
                {col: 15, colName: 'productPress'},
                {col: 16, colName: 'probReservesWell'},
                {col: 17, colName: 'remainingRecoverableReserves'},
                {col: 18, colName: 'fluidProductionIndex'},
                {col: 19, colName: 'forecastFluid'},
                {col: 20, colName: 'forecastOilInc'},
                {col: 21, colName: 'forecastOil'},
                {col: 22, colName: 'forecastProductPress'},
                {col: 23, colName: 'forecastFlowPress'},
                {col: 24, colName: 'displacementEfficiency'},
                {col: 25, colName: 'historySandDay'},
                {col: 26, colName: 'sandDay'},
                {col: 27, colName: 'sandValue'},
                {col: 28, colName: 'pumpCondition'},
                {col: 29, colName: 'tubularColumnCondition'},
                {col: 30, colName: 'sandValue'},
                {col: 31, colName: 'pumpCondition'},

            ]
            for (let i = 0; i < concatList.length; i++) {
                if (concatList[i].col == columnIndex) {
                    const _row = this.filterData(this.noticeList, concatList[i].colName, concatList).one[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col,
                    };
                }
            }
        },
        returnrouter() {
            this.$router.go(-1);
        },
        reset() {
            this.queryParams.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F'
            this.queryParams.endTime = this.$route.query.currentDate
            this.retrieval()
        },
        filterData(arr, colName, concatList) {
            let spanOneArr = [];
            let concatOne = 0;
            arr.forEach((item, index) => {
                if (index === 0) {
                    spanOneArr.push(1);
                } else {
                    if (item[colName] === arr[index - 1][colName]) {
                        let col = []
                        for (let j = 0; j < concatList.length; j++) {
                            if (concatList[j].colName == colName && colName != concatList[0].colName) {
                                col = concatList.slice(0, j)
                            }
                        }
                        let flag = true
                        for (let k = 0; k < col.length; k++) {
                            if (item[col[k].colName] != arr[index - 1][col[k].colName]) {
                                flag = !flag
                                break
                            }
                        }
                        if (flag) {
                            spanOneArr[concatOne] += 1;
                            spanOneArr.push(0);
                        } else {
                            spanOneArr.push(1);
                            concatOne = index;
                        }
                    } else {
                        spanOneArr.push(1);
                        concatOne = index;
                    }
                }
            });

            // 表格序号
            let Nosort = 0;
            for (const n in spanOneArr) {
                if (spanOneArr[n] > 0) {
                    Nosort += 1;
                    this.$set(this.noticeList[n], 'Nosort', Nosort);
                }
            }

            return {
                one: spanOneArr,
            };
        },
    },
};
</script>
<style lang="less" scoped>
.app-container {
    height: 100%;

    .el-table {
        overflow: scroll;
    }
}

.el-tree {
    max-height: 370px;
    overflow: scroll;
}

::v-deep .el-table__header-wrapper {
    .cell {
        height: auto !important;
    }
}

.pertable thead .el-table-column--selection .cell {
    display: none;
}

#xczyjhb {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}

::v-deep .cellWrap .cell {
    height: auto !important;
    line-height: 30px !important;
    white-space: pre !important;
}
</style>
