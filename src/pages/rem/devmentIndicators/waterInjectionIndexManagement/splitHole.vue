<!-- 分注井层段合格率 -->
<template>
    <div class="app-container">
        
        <header-search style="width:100%;height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin: 10px 20px 10px 0px;">
                    作业公司：
                    <el-select v-model="queryParams.companyId" placeholder="请选择" disabled @change="changeCompany">
                        <el-option v-for="item in companyList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    油田：
                    <el-select v-model="queryParams.oilFieldId" disabled>
                        <el-option v-for="item in oilFieldList" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" @change="changeOgf"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    开始与结束日期：
                    <el-date-picker v-model="queryParams.dates" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" unlink-panels @change="createChange">
                    </el-date-picker>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
                </div>
                <div style="margin-left:auto;">
                    <el-button type="warning" plain class="commonBtn" @click="close">返回</el-button>
                </div>
            </div>
        </header-search>
        
        <page-panel-new class="app-content">
            <info-window headerTitle="分注井层段合格率*" info-width="100%" info-height="500px" is-show-max-btn>
                <div class="g-row-flex-V" style="margin: 20px 0;">
                    <div style="margin-right: 20px">
                        平台：
                        <el-select v-model="queryParams.platFormId" style="width: 220px">
                            <el-option v-for="item in platformList" :key="item.platFormId" :label="item.platName" :value="item.platFormId"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button icon="el-icon-search" type="primary" @click="doSearch">确定</el-button>
                    </div>
                </div>
                <Echart :chart-data="sectionPassRate" height="calc(100% - 75px)"></Echart>
            </info-window>
            <el-row :gutter="20" style="padding-bottom:20px; margin-top: 20px;">
                <el-col :span="12">
                    <info-window :headerTitle="`${oilFieldName || ''}分注井层段合格率明细*`" info-width="100%" info-height="500px" is-show-max-btn>
                        <el-button style="position: absolute; z-index: 9; right: 56px; top: 0; height: 32px; margin-top: 3px;line-height: 8px;" type="primary" @click="doDownExcel('#fzjcdhglmx', `${oilFieldName || ''}分注井层段合格率明细`)">
                            下载
                        </el-button>
                        <div class="g-row-flex-V" style="margin: 20px 0;">
                            <div style="margin-right: 20px">
                                日期选择：
                                <el-date-picker v-model="queryParams.month" type="month" placeholder="选择月" value-format="yyyy-MM" @change="doSearch"></el-date-picker>
                            </div>
                        </div>
                        <el-table id="fzjcdhglmx" :data="tableData1" highlight height="calc(100% - 75px)">
                            <!-- :index="formatIndex"  -->
                            <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                            <el-table-column prop="ogfName" label="油田" align="center"></el-table-column>
                            <el-table-column prop="wellNo" label="注水井号" align="center"></el-table-column>
                            <el-table-column prop="layerName" label="层段号" align="center"></el-table-column>
                            <el-table-column prop="statisticsDate" label="年月" align="center"></el-table-column>
                            <el-table-column prop="isUnqualified" label="是否合格" :formatter="formatterBoolean1" align="center"></el-table-column>
                        </el-table>
                    </info-window>
                </el-col>
                <el-col :span="12">
                    <info-window :headerTitle="`${oilFieldName || ''}单井层段合格明细*`" info-width="100%" info-height="500px" is-show-max-btn>
                        <el-button style="position: absolute; z-index: 9; right: 56px; top: 0; height: 32px; margin-top: 3px;line-height: 8px;" type="primary" @click="doDownExcel('#djcdhgmx', `${oilFieldName || ''}单井层段合格明细`)">
                            下载
                        </el-button>
                        <div class="g-row-flex-V" style="margin: 20px 0;">
                            <div style="margin-right: 20px">
                                日期选择：
                                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="doSearch"></el-date-picker>
                            </div>
                        </div>
                        <el-table id="djcdhgmx" :data="tableData2" highlight height="calc(100% - 75px)">
                            <!-- :index="formatIndex"  -->
                            <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                            <el-table-column prop="wellNo" label="井号" align="center"></el-table-column>
                            <el-table-column prop="isSplit" label="是否分注" :formatter="formatterBoolean2" align="center"></el-table-column>
                            <el-table-column prop="isBlending" label="是否调配" :formatter="formatterBoolean2" align="center"></el-table-column>
                            <el-table-column prop="totalLayers" label="总层段数" align="center"></el-table-column>
                            <el-table-column prop="effectLayers" label="有效层段数" align="center"></el-table-column>
                            <el-table-column prop="qualifieLayers" label="合格层段数" align="center"></el-table-column>
                        </el-table>
                    </info-window>
                </el-col>
            </el-row>
        </page-panel-new>
        
    </div>    
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import {dividingLayerQualityRate} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    import {getOrgInfo,getOgfInfo} from "@/api/oilDeposit/ipm-03/basedata.js";
    import {fetchOilFields,fetchPlatforms} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    import dayjs from "dayjs";

    export default {
        name: "splitHole",
        components: {
            Echart,
        },
        data() {
            return {
                queryParams: {
                    companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
                    oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
                    platFormId: "", // 平台
                    dates: [dayjs().format("YYYY-01-01"), dayjs().format("YYYY-MM-DD")], // 时间范围集合
                    beginDate: dayjs().format("YYYY-01-01"), // 开始时间
                    endDate: dayjs().format("YYYY-MM-DD"), // 结束时间
                    layerYear: dayjs().format("YYYY-MM"), // 分注井层段合格率明细 日期选择
                    wellYear: dayjs().format("YYYY-MM-DD"), // 单井层段合格明细 日期选择
                    // pageNum: 1,
                    // pageSize: 9999,
                },
                // 油田名称
                oilFieldName: "",
                //作业公司列表
                companyList: [],
                //油田列表
                oilFieldList: [
                    {
                        value: "CEPI",
                        label: "CEPI",
                    },
                    {
                        value: "CEPJ",
                        label: "CEPJ",
                    },
                    {
                        value: "WHPC",
                        label: "WHPC",
                    },
                    {
                        value: "WHPH",
                        label: "WHPH",
                    },
                ],
                //平台列表
                platformList: [],
                //分注井层段合格率
                sectionPassRate: {
                    title: {
                        text: "分注井层段合格率",
                        textStyle: {
                            color: "#8FA4CC",
                        },
                        top: 0,
                        left: "center"
                    },
                    grid: {
                        x: 120,
                        y: 30,
                        x2: 120,
                        y2: 60,
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "分注井层段合格率",
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity: 0,
                                }
                            },
                        },
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:0,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        name: "年月",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                            padding:[10,0,0,0],
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#8FA4CC",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: [{
                        name: "分注井层段合格率 (%)",
                        nameLocation:'middle',
                        nameGap:70,
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "value",
                        min: 0,
                        max: 100,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#8FA4CC",
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            }
                        }
                    }],
                    color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
                    series: [],
                },
                // 表格数据
                tableData1: [],
                tableData2: [],
            };
        },
        mounted() {
            this.initData();
        },
        methods: {
            //重置
            resetting(){
                Object.assign(this.$data, this.$options.data())
                this.initData();
            },
            //表格序号
            formatIndex(index) {
                return (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1;
            },
            //返回按钮
            close() {
                const obj = {
                    name: "waterInjectionIndexManagement"
                };
                this.$tab.closeOpenPage(obj);
            },
            //初始化页面
            async initData() {
                // 获取作业公司
                await getOrgInfo().then((data) => {
                    let code = data.data.code;
                    if (code == 200) {
                        this.companyList = data.data.data;
                    }
                });
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFieldList = res.data.data.oilFields;
                        if (this.oilFieldList.length == 0) {
                            this.queryParams.oilFieldId = "";
                            this.oilFieldName = "";
                        } else {
                            this.queryParams.oilFieldId = this.oilFieldList[0].oilFieldId;
                            this.oilFieldName = this.oilFieldList[0].name;
                        }
                    } else {
                        this.$message.error("油田读取错误");
                    }
                });
                // 获取平台信息
                this.getFetchPlatforms();
                // 分注井层段合格率图表数据
                this.doDividingLayerQualityRate();
            },
            //获得平台数据
            getFetchPlatforms() {
                fetchPlatforms(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        this.platformList = res.data.data.platform;
                        this.queryParams.platFormId = res.data.data.platform[0].platFormId;
                    }
                });
            },
            //作业公司切换事件
            changeCompany() {
                getOgfInfo(this.queryParams.companyId).then((data) => {
                    this.queryParams.oilFieldId = null;
                    this.oilFieldList = [];
                    let code = data.data.code;
                    if (code == 200) {
                        this.oilFieldList = data.data.data;
                    } else {
                        this.oilFieldList = [];
                    }
                });
            },
            //油田切换
            changeOgf() {
                this.getFetchPlatforms();
            },
            //时间范围切换
            createChange(dates) {
                if (dates && dates.length == 2) {
                    this.queryParams.beginDate = dates[0];
                    this.queryParams.endDate = dates[1];
                } else {
                    this.queryParams.beginDate = "";
                    this.queryParams.endDate = "";
                }
            },
            //查询
            doSearch() {
                //分注井层段合格率
                this.doDividingLayerQualityRate();
            },
            //分注井层段合格率
            doDividingLayerQualityRate() {
                dividingLayerQualityRate(this.queryParams).then((res) => {
                    if (res?.data?.code == 200) {
                        let legendData = [];
                        let seriesData = [];
                        let xData = [];
                        let xSet = new Set();
                        let resData = res.data.data;
                        // TODO lv 临时
                        // let barCharts = resData?.chart?.linearDataSets;
                        let barCharts = [{
                                label: "实际值",
                                color: null,
                                linearData: [{
                                        label: "2023-01",
                                        value: 90.68,
                                        description: null,
                                    },
                                    {
                                        label: "2023-02",
                                        value: 84.13,
                                        description: null,
                                    },
                                    {
                                        label: "2023-03",
                                        value: 83.91,
                                        description: null,
                                    },
                                    {
                                        label: "2023-04",
                                        value: 0,
                                        description: null,
                                    },
                                ],
                            },
                            {
                                label: "今年考核值",
                                color: null,
                                linearData: [],
                            },
                        ];
                        this.tableData1 = resData.tableList && resData.tableList[0] ? resData.tableList[0] : [];
                        this.tableData2 = resData.tableList && resData.tableList[1] ? resData.tableList[1] : [];
                        if (barCharts) {
                            barCharts.forEach((item, index) => {
                                legendData.push(item.label);
                                let series = {};
                                series.name = item.label;
                                series.type = "bar";
                                series.barWidth = "22";
                                series.label = {
                                    show: true,
                                    position: "top",
                                    color: "#8FA4CC",
                                };
                                let barData = item.linearData;
                                let seriesMess = [];
                                barData.forEach((dot, index) => {
                                    let point = [];
                                    point.push(dot.label);
                                    xSet.add(dot.label);
                                    point.push(dot.value);
                                    seriesMess.push(point);
                                });
                                series.data = seriesMess;
                                seriesData.push(series);
                            });
                        }
                        xData = Array.from(xSet).sort();
                        this.sectionPassRate.xAxis.data = xData;
                        this.sectionPassRate.legend.data = legendData;
                        this.sectionPassRate.series = seriesData;
                        this.sectionPassRate.title.text =
                            `${this.oilFieldName || ''}${this.queryParams.beginDate && this.queryParams.endDate ? dayjs(this.queryParams.beginDate).format("YYYY-MM-DD") + "至" + dayjs(this.queryParams.endDate).format("YYYY-MM-DD") : ""}分注井层段合格率`;

                    }
                });
            },
            //表格id 表格名称
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
            //表格格式化方法 - 是否合格 1不合格 0合格
            formatterBoolean1(row, column) {
                return row[column.property] == 1 ? "否" : "是";
            },
            //表格格式化方法 - 是否分注、是否调配 0否 其它是
            formatterBoolean2(row, column) {
                return row[column.property] == 0 ? "否" : "是";
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container{
        padding:0 7px;
        height:100%;
    }
    ::v-deep .app-content{
        height: calc(100% - 100px)!important;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-bottom:8px;
        .g-w100:first-child{
          padding-top:0!important;  
        }
    }
    
    ::v-deep .el-main {
        padding: 0px 0px 20px;
        overflow: hidden;
    }

    .formBox {
        &>div:not(:first-child) {
            margin-left: 20px;
        }
    }

    .basicTable {
        height: auto;
        // padding-bottom: 10px;
    }

    .el-col-4 {
        width: 20%;
    }

    ::v-deep .el-table .cell:empty::before {
        content: "-";
    }

    ::v-deep .el-table__header-wrapper {
        .cell {
            height: auto !important;
            line-height: 1.5 !important;
            white-space: pre;
        }
    }
</style>
