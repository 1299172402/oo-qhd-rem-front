<!-- 注水水质达标率 -->
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
                    年度：
                    <el-date-picker v-model="queryParams.year" type="year" placeholder="选择年" value-format="yyyy-MM-dd"></el-date-picker>
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
            <pagePanel :headerTitle="`${oilFieldName || ''}注水水质达标率`" style="height: 490px;" showBtn>
                <Echart :chart-data="standardRateOfInjectionWaterQuality" height="100%"></Echart>
            </pagePanel>
            <pagePanel :headerTitle="`${oilFieldName || ''}注水水质达标率*`" style="height: 490px;" showBtn>
                <el-button style="position: absolute; z-index: 9; right: 56px; top: 0; height: 26px; margin-top: 3px;line-height: 8px;" type="primary" @click="doDownExcel('#zsszkzzb', `${oilFieldName || ''}注水水质达标率`)">下载</el-button>
                <el-table id="ysdcylbcsp" :data="tableData1" highlight height="100%">
                    <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                    <el-table-column prop="ofgName" label="油田" align="center"></el-table-column>
                    <el-table-column prop="plantformName" label="平台" align="center"></el-table-column>
                    <el-table-column label="检测次数" align="center">
                        <el-table-column prop="oilContent" :label="`含油量`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="totalSs" :label="`悬浮物`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="medianSize" :label="`粒径中值`" align="center" width="80"></el-table-column>
                        <el-table-column prop="srb" :label="`SRB`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="tgb" :label="`TGB`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="fb" :label="`铁细菌`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="corrosionRate" :label="`腐蚀率`" align="center" min-width="70"></el-table-column>
                    </el-table-column>
                    <el-table-column label="达标次数" align="center">
                        <el-table-column prop="qualityOilContent" :label="`含油量`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="qualityTotalSs" :label="`悬浮物`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="qualityMedianSize" :label="`粒径中值`" align="center" width="80"></el-table-column>
                        <el-table-column prop="qualitySrb" :label="`SRB`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="qualityTgb" :label="`TGB`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="qualityFb" :label="`铁细菌`" align="center" min-width="70"></el-table-column>
                        <el-table-column prop="qualityCorrosionRate" :label="`腐蚀率`" align="center" min-width="70"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="wellQualityRate" :label="`水质\n达标率\n(%)`" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wellQualityNumber" :label="`水质达标率\n考核指标\n(%)`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="wellPlanNumber" :label="`水质达标率\n奋斗指标\n(%)`" align="center" min-width="100"></el-table-column>
                </el-table>
            </pagePanel>
            <div style="padding-bottom:20px;">
                <pagePanel :headerTitle="`${oilFieldName || ''}注水水质控制指标*`" style="height: 490px;" showBtn>
                    <el-button style="position: absolute; z-index: 9; right: 56px; top: 0; height: 26px; margin-top: 3px;line-height: 8px;" type="primary" @click="doDownExcel('#zsszkzzb', `${oilFieldName || ''}注水水质控制指标`)">下载</el-button>
                    <el-table id="zsszkzzb" :data="tableData2" highlight height="100%">
                        <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                        <el-table-column prop="oilContent" :label="`含油量\n(mg/l)`" align="center"></el-table-column>
                        <el-table-column prop="totalSs" :label="`悬浮物\n(mg/l)`" align="center"></el-table-column>
                        <el-table-column prop="medianSize" :label="`粒径中值\n(μm)`" align="center"></el-table-column>
                        <el-table-column prop="srb" :label="`SRB\n(个/ml)`" align="center"></el-table-column>
                        <el-table-column prop="tgb" :label="`TGB\n(个/ml)`" align="center"></el-table-column>
                        <el-table-column prop="fb" :label="`铁细菌\n(个/ml)`" align="center"></el-table-column>
                        <el-table-column prop="corrosionRate" :label="`腐蚀率\n(mm/a)`" align="center"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
        </page-panel-new>
        
    </div>
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import { waterQualityRate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    import { getOrgInfo, getOgfInfo } from "@/api/oilDeposit/ipm-03/basedata.js";
    import { fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    import dayjs from "dayjs";

    export default {
        name: "waterQuality",
        components: {
            Echart,
        },
        data() {
            return {
                queryParams: {
                    companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
                    oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
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
                //注水水质达标率
                standardRateOfInjectionWaterQuality: {
                    title: {
                        text: "注水水质达标率",
                        textStyle: {
                            color: "#8FA4CC",
                        },
                        top: 10,
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
                                name: "注水水质达标率",
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
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
                        name: "平台",
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
                    yAxis: [
                        {
                            name: "水质达标率 (%)",
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
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
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        }
                    ],
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
                // 注水水质达标率图表数据
                this.doWaterQualityRate();
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
                //注水水质达标率
                this.doWaterQualityRate();
            },
            //注水指标管理-注水指标达标率
            doWaterQualityRate() {
                waterQualityRate(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        let legendData = [];
                        let seriesData = [];
                        let xData = [];
                        let xSet = new Set();
                        let resData = res.data.data;
                        let barCharts = resData?.chart?.barDataSets;
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
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            // 四个数字分别对应 数组中颜色的开始位置，分别为 右，下，左，上。例如（1,0,0,0 ）代表从右边开始渐
                                            // 变。offset取值为0~1，0代表开始时的颜色，1代表结束时的颜色，柱子表现为这两种颜色的渐变。
                                            offset: 0,
                                            color: "#16c8ed",
                                        },
                                        {
                                            offset: 1,
                                            color: "#0f66ea",
                                        },
                                    ]),
                                },
                            };
                            let barData = item.barDatas;
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
                        xData = Array.from(xSet).sort();
                        this.standardRateOfInjectionWaterQuality.xAxis.data = xData;
                        this.standardRateOfInjectionWaterQuality.legend.data = legendData;
                        this.standardRateOfInjectionWaterQuality.series = seriesData;
                        this.standardRateOfInjectionWaterQuality.title.text = `${this.oilFieldName || ''}${this.queryParams.year ? dayjs(this.queryParams.year).format("YYYY") + "年" : ""}注水水质达标率`;
                    }
                });
            },
            //表格id表格名称
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
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
