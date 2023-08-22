<!-- 地层压力保持水平 -->
<template>
    <div class="app-container">
        
        <header-search style="width:100%;height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin: 10px 20px 10px 0px">
                    作业公司：
                    <el-select v-model="queryParams.companyId" placeholder="请选择" disabled @change="changeCompany">
                        <el-option v-for="item in companyList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px">
                    油田：
                    <el-select v-model="queryParams.oilFieldId" disabled>
                        <el-option v-for="item in oilFieldList" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" @change="changeOgf"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px">
                    年度：
                    <el-date-picker v-model="queryParams.year" type="year" placeholder="选择年" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div style="margin: 10px 20px 10px 0px">
                    <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
                </div>
                <div style="margin-left:auto;">
                    <el-button type="warning" plain class="commonBtn" @click="close">返回</el-button>
                </div>
            </div>
        </header-search>
        
        <page-panel-new class="app-content">
            <pagePanel headerTitle="地层压力保持水平" style="height: 500px;" show-btn>
                <div class="g-row-flex-V" style="margin-bottom: 20px;">
                    <div style="margin-right: 20px">
                        区块：
                        <el-select v-model="queryParams.fileId">
                            <el-option v-for="item in blockList" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                        </el-select>
                    </div>
                    <div style="margin-right: 20px">
                        层系：
                        <el-select v-model="queryParams.layerId">
                            <el-option v-for="item in layer" :key="item.fieldLayerId" :label="item.layerName" :value="item.fieldLayerId"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button icon="el-icon-search" type="primary" @click="doSearch">确定</el-button>
                    </div>
                </div>
                <Echart :chart-data="formationPressureRemainsLevel" height="calc(100% - 55px)"></Echart>
            </pagePanel>
            <pagePanel headerTitle="原始地层压力保持水平 (层位)" style="height: 550px;" show-btn>
                <div style="display: flex; justify-content: flex-end">
                    <el-button style="margin-bottom: 20px" type="primary" @click="doDownExcel('#ysdcylbcsp', '原始地层压力保持水平 (层位)')">下载</el-button>
                </div>
                <el-table id="ysdcylbcsp" :data="tableData1" highlight height="calc(100% - 55px)">
                    <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                    <el-table-column prop="ogfNo" label="油田" align="center"></el-table-column>
                    <el-table-column prop="layerName" label="层位/油组" align="center"></el-table-column>
                    <el-table-column label="原始参数" align="center">
                        <el-table-column prop="originalLayerPressureYear" :label="`原始地层压力\n(MPa)\n(校正到基准面)`" align="center" :formatter="toPrecise2"></el-table-column>
                    </el-table-column>
                    <el-table-column label="原始参数" align="center">
                        <el-table-column prop="datum_Depth" :label="`基准面垂深\n(m)`" align="center" :formatter="toPrecise2"></el-table-column>
                    </el-table-column>
                    <el-table-column label="2023年" align="center">
                        <el-table-column prop="originalReservesOil" :label="`动用地质储量\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                        <el-table-column prop="layerPressureYear" :label="`地层压力\n(MPa)`" align="center" :formatter="toPrecise2"></el-table-column>
                        <el-table-column prop="layerPressureLevelYear" :label="`原始地层压力保持水平\n(%)`" align="center" width="200" :formatter="toPrecise2"></el-table-column>
                        <el-table-column prop="avgWellPressure" :label="`实际单井静压平均值\n(MPa)\n(校正到基准面)`" align="center" :formatter="toPrecise2"></el-table-column>
                        <el-table-column prop="pressureLevel" :label="`目前压力保持水平\n(%)`" align="center" :formatter="toPrecise2"></el-table-column>
                    </el-table-column>
                </el-table>
            </pagePanel>
            <div style="padding-bottom:20px;">
                <pagePanel headerTitle="单井静压明细" style="height: 550px;" show-btn>
                    <div style="display: flex; justify-content: flex-end">
                        <el-button style="margin-bottom: 20px" type="primary" @click="doDownExcel('#djjymx', '单井静压明细')">下载</el-button>
                    </div>
                    <el-table id="djjymx" :data="tableData2" highlight height="calc(100% - 55px)">
                        <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                        <el-table-column prop="ogfNo" label="油田" align="center"></el-table-column>
                        <el-table-column prop="layerName" label="层位/油组" align="center"></el-table-column>
                        <el-table-column prop="wellNo" label="井号" align="center"></el-table-column>
                        <el-table-column prop="measureTime" :label="`测试日期\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="basalLevelStaticPress" :label="`基准面压力\n(MPa)`" align="center" :formatter="toPrecise2"></el-table-column>
                        <el-table-column prop="midOillayerStaticPress" :label="`油层中部压力\n(MPa)`" align="center" :formatter="toPrecise2"></el-table-column>
                        <el-table-column prop="measurePointPress" :label="`最大垂深测点压力\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
        </page-panel-new>
        
    </div>
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import { layerPressureLevelRate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    import { getOrgInfo, getOgfInfo } from "@/api/oilDeposit/ipm-03/basedata.js";
    import {fetchOilFields,fetchFields,fieldLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { exportExcel} from "@/lib/exportExcel.js";
    import dayjs from "dayjs";
    
    export default {
        name: "stratumPressure",
        components: {
            Echart,
        },
        data() {
            return {
                queryParams: {
                    companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
                    oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
                    fileId: "", // 区块id
                    layerId: "", // 层系id
                    year: dayjs().format("YYYY-MM-DD"), // 时间年份
                    // dates: [dayjs().subtract(7, "day").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")], // 时间范围集合
                    // beginDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"), // 开始时间
                    // endDate: dayjs().format("YYYY-MM-DD"), // 结束时间
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
                //区块信息
                blockList: [],
                //层系信息
                layer: [],
                //地层压力保持水平
                formationPressureRemainsLevel: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    title: {
                        text: "地层压力保持水平",
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
                        y2: 40,
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "地层压力保持水平",
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
                        name: "地层压力保持水平 (%)",
                        nameLocation:'middle',
                        nameGap:70,
                        nameTextStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        min: 0,
                        max: 100,
                        scale: true,
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
                    }, ],
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

                this.getFetchFields(); // 获取区块类型
                this.getFieldLayers(); // 获取层位信息
                // 地层压力保持水平图表数据
                this.doLayerPressureLevelRate();
            },
            // 获得区块类型
            getFetchFields() {
                fetchFields(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        this.blockList = res.data.data.fields;
                        this.queryParams.fileId = res.data.data.fields[0].fieldId;
                    }
                });
            },
            //获得层位信息
            getFieldLayers() {
                fieldLayers(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        this.layer = res.data.data.fieldLayers;
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
                this.getFetchFields(); // 获取区块类型
                this.getFieldLayers(); // 获取层位信息
                // getPlatInfo(this.queryParams.ogfId).then((data) => {
                //   this.queryParams.platId = null;
                //   let code = data.data.code;
                //   if (code == 200) {
                //     this.platformList = data.data.data;
                //   } else {
                //     this.platformList = [];
                //   }
                // });
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
                //地层压力保持水平
                this.doLayerPressureLevelRate();
            },
            //注水指标管理-地层压力保持水平
            doLayerPressureLevelRate() {
                layerPressureLevelRate(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        let legendData = [];
                        let seriesData = [];
                        let xData = [];
                        // TODO lv 临时
                        // let xSet = new Set();
                        let xSet = [];

                        let resData = res.data.data;
                        // let barCharts = resData?.chart?.barDataSets || [];
                        // TODO lv 临时
                        let barCharts = [{
                            label: "",
                            color: null,
                            barDatas: [
                                {
                                    label: "2020",
                                    value: 89.54,
                                    description: null,
                                },
                                {
                                    label: "2021",
                                    value: 89.87,
                                    description: null,
                                },
                                {
                                    label: "2022",
                                    value: 90.27,
                                    description: null,
                                },
                                {
                                    label: "2023",
                                    value: 90.30,
                                    description: null,
                                },
                            ],
                        }];
                        this.tableData1 = resData.tableList && resData.tableList[0] ? resData.tableList[0] : [];
                        this.tableData2 = resData.tableList && resData.tableList[1] ? resData.tableList[1] : [];
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
                            series.itemStyle = {
                                normal: {
                                    borderRadius: [7, 7, 0, 0],
                                },
                            };
                            let barData = item.barDatas;
                            let seriesMess = [];
                            barData.forEach((dot, index) => {
                                let point = [];
                                point.push(dot.label);
                                // TODO lv 临时
                                // xSet.add(dot.label);
                                xSet.push(dot.label);

                                point.push(dot.value);
                                seriesMess.push(point);
                            });
                            series.data = seriesMess;
                            seriesData.push(series);
                        });
                        // TODO lv 临时
                        // xData = Array.from(xSet).sort();
                        // this.formationPressureRemainsLevel.xAxis.data = xData;
                        this.formationPressureRemainsLevel.xAxis.data = xSet;

                        this.formationPressureRemainsLevel.legend.data = legendData;
                        this.formationPressureRemainsLevel.series = seriesData;
                        this.formationPressureRemainsLevel.title.text = `${this.oilFieldName || ''}${this.queryParams.year ? dayjs(this.queryParams.year).format("YYYY-MM-DD") : ""}地层压力保持水平`;
                    }
                });
            },
            //表格id表格名称
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
            // 表格格式化方法 - 数值只保留两位小数
            toPrecise2(row, column) {
                if (
                    (row[column.property] || parseFloat(row[column.property]) === 0) &&
                    typeof parseFloat(row[column.property]) === "number"
                ) {
                    return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                    ? parseFloat(row[column.property]).toFixed(2)
                    : "0";
                } else {
                    return row[column.property] ? row[column.property] : "-";
                }
            },
            // 表格格式化方法 - 数值只保留四位小数
            toPrecise4(row, column) {
                if (
                    (row[column.property] || parseFloat(row[column.property]) === 0) &&
                    typeof parseFloat(row[column.property]) === "number"
                ) {
                    return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                    ? parseFloat(row[column.property]).toFixed(4)
                    : "0";
                } else {
                    return row[column.property] ? row[column.property] : "-";
                }
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
