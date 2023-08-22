<!--注采对应曲线-->
<template>
    <div class="z-main">
        <div class="z-search" style="display:flex;align-items: center;">
            <span>日期：</span>
            <el-date-picker v-model="selectDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
            <el-radio-group v-model="wellValue" @input="changeWell" style="margin-left:20px;">
              <el-radio-button v-for="well in wellList" :key="well.wellId" :label="well.wellId" >{{well.wellNo}}</el-radio-button>
            </el-radio-group>
        </div> 
        <div class="z-echarts">
            <div v-for="(chart,index) in wellOptions" :key="index" >
                <page-panel :headerTitle="chart.wellNo+'对应曲线图'" style="height: 600px; margin-top:0;margin-bottom:10px;"  show-btn >
                    <Echart :ref="'echartDown'+index" :chart-data="chart.option" height="100%"></Echart>
                </page-panel>
            </div>
            <div class="develop" v-if="wellOptions.length">
                <span :class="[isDevelop?'top-span':'active-span']" @click="tapDevelop"></span>
            </div>
            <page-panel headerTitle="水井对应曲线表" v-show="isDevelop" style="height: 450px; margin-top:10px;" show-btn>
                <el-table id="tableData1" :data="wellInjCurves" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;"
                    height="100%" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="time" label="时间"> </el-table-column>
                    <el-table-column prop="injDaily" :label="`日注水量\n(m³)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="cgsPress" :label="`套压\n(Mpa)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="whInjPress" :label="`井口压力\n(Mpa)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="injDuration" :label="`注入时间\n(h)`"></el-table-column>
                    <el-table-column prop="juSum" :label="`水聚总量\n(m³)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="injPlan" :label="`日配注量\n(m³)`" :formatter="toPrecise2"></el-table-column>
                </el-table>
            </page-panel>
            <page-panel headerTitle="油井对应曲线表" v-show="isDevelop"  style="height: 450px; margin-top:10px;" show-btn>
                <el-table id="tableData2" :data="wellOilCurves" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;"
                    height="100%" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="time" label="时间"> </el-table-column>
                    <el-table-column prop="flowingPress" :label="`流压\n(Mpa)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="oilPress" :label="`油压\n(Mpa)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="pumpFreq" :label="`泵频率\n(Hz)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="whTemp" :label="`井口温度\n(℃)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="prodDuration" :label="`生产时间\n(h)`"></el-table-column>
                    <el-table-column prop="waterRatio" :label="`含水\n(%)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="fluidProdDaily" :label="`日产液\n(m³)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="oilProdDaily" :label="`日产油\n(m³)`" :formatter="toPrecise2"></el-table-column>
                    <el-table-column prop="gasProdDaily" :label="`日产气\n(万方)`" :formatter="toPrecise4"></el-table-column>
                    <el-table-column prop="gasOilRatio" :label="`气油比\n(m³/m³)`" :formatter="toPrecise2"></el-table-column>
                </el-table>
            </page-panel>
        </div>
    </div>
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import { proInjectLineCharts } from '@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js';
    import {exportExcel} from '@/lib/exportExcel.js';
    export default {
        components: {
            Echart,
        },
        props: {
            //油田id
            oilFieldId: {},
            //区块id
            blockId: {},
            //井组切换
            wellCentre:{},
            //井组id
            wellGroupId: {}
        },
        data() {
            return {
                selectDate: [],
                //油井折线图
                oilWellOption: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0, 1, 2],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
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
                        x:'center',
                        bottom:5,
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            saveAsImage: {
                                name: '油井曲线对比分析',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644'
                            }
                        }
                    },
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
                    xAxis: [
                        {
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
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
                                color: "#8FA4CC",
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
                        },
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: "流\n压\n︵\nM\nP\na\n︶", //0
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "折\n算\n基\n准\n面\n流\n压\n︵\nM\nP\na\n︶", //1
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "油\n压\n︵\nM\nP\na\n︶", //2
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "泵\n频\n率\n︵\nH\nz\n︶", //3
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            min:0,
                            max:50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "含\n水\n︵\n%\n︶", //4
                            nameLocation: "center",
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "气\n油\n比\n︵\n方\n/\n方\n︶", //5
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "rgb(255,0,0)",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "生\n产\n时\n间\n︵\nH\n︶", //6
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
                                fontSize: 14,
                            },
                            min:0,
                            max:24,
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "井\n口\n温\n度\n︵\n℃\n︶", //7
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n油\n︵\n方\n︶", //8
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "rgb(0,255,0)",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n液\n︵\n方\n︶", //9
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "rgb(165,42,42)",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 2,
                            name: "日\n产\n气\n︵\n万\n方\n︶", //10
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: []
                },
                //水井折线图
                injectionWellOption: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0, 1],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
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
                        x:'center',
                        bottom:5,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            saveAsImage: {
                                name: '水井曲线对比分析图',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644'
                            }
                        }
                    },
                    grid: [
                        {
                            left: "14%",
                            top: "7%",
                            width: "74%",
                            height: "38%"
                        },
                        {
                            left: "14%",
                            top: "50%",
                            width: "74%",
                            height: "38%"
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
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
                                color: "#8FA4CC",
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
                        }
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: "注\n入\n时\n间\n︵\nh\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
                                fontSize: 14,
                            },
                            min:0,
                            max:24,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
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
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "井\n口\n压\n力\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
                                fontSize: 14,
                            },
                            position: 'right',
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
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
                            },
                        },
                        {
                            gridIndex: 0,
                            name: "套\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
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
                                color: "#8FA4CC",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
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
                                color: "#8FA4CC",
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
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
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "日\n注\n聚\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "#8FA4CC",
                                fontSize: 14,
                            },
                            position: 'right',
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
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
                            },
                        },
                        {
                            gridIndex: 1,
                            name: "日\n注\n水\n量\n︵\nm³\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: "rgb(0,255,255)",
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
                                show: true,
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: []
                },
                //井组中井信息
                wellOptions: [],
                wellList: [],
                wellValue:'',
                isDevelop:false,//是否展示表格
                wellInjCurves:[],//水井对应表
                wellOilCurves:[],//油井对应表
            };
        },
        mounted() {
            let year = new Date().getFullYear();
            this.selectDate = [new Date(year + '-01-01').format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            this.doSearch();
        },
        methods: {
            //搜索
            doSearch() {
                let beginDate = this.selectDate[0];
                let endDate = this.selectDate[1];
                let request = {
                    beginDate: beginDate,
                    endDate: endDate,
                    fieldId: this.blockId,
                    oilFieldId: this.oilFieldId,
                    wellGroupId: this.wellGroupId,
                    wellCentre:this.wellCentre
                }
                this.wellOptions = [];
                this.wellList = [];
                this.wellValue='';
                proInjectLineCharts(request).then((res) => {
                    if (res.data.code == 200) {
                        this.wellInjCurves=res.data.data.wellInjCurves;
                        this.wellOilCurves=res.data.data.wellOilCurves;
                        let resList = res.data.data.productionInjectionList;
                        if(resList.length){
                            resList.forEach((resItem, index) => {
                                let arrItem = {};
                                arrItem.wellId = resItem.wellId;
                                arrItem.wellNo = resItem.wellName;
                                if (resItem.charts.length && (resItem.wellType == '002002001') || (resItem.wellType == '003002001')) {
                                    arrItem.option = this.createOilWellOption(resItem.charts, resItem.wellName);
                                } else if (resItem.charts.length && (resItem.wellType == '002003001' || resItem.wellType == '003003001')) {
                                    arrItem.option = this.createWaterWellOption(resItem.charts, resItem.wellName);
                                }
                                this.wellOptions.push(arrItem);
                                this.wellList.push({wellId: resItem.wellId,wellNo: resItem.wellName});
                            })
                            this.wellValue=this.wellList[0].wellId;
                        }
                    }
                })
            },
            //生成油井图表信息
            createOilWellOption(charts, wellName) {
                let resOption = {};
                Object.assign(resOption, this.oilWellOption);
                let seriesDataOil = [];
                let legendOil = [];
                let xSet = new Set();
                let title = {
                    text: wellName,
                    left: '10%',
                    top: 0,
                    textStyle: {
                        color: '#fff',
                        align: 'center'
                    }
                }
                if (charts) {
                    charts.forEach((item, index) => {
                        let lineSet = item.linearDataSets[0];
                        if (lineSet) {
                            legendOil.push(lineSet.label);
                            let series = {
                                name: lineSet.label,
                                type: "line",
                                label: {
                                    show: false,
                                    color: "#fff",
                                    fontSize: 14,
                                },
                                lineStyle: {},
                                symbol: "circle",
                                symbolSize: 5,
                                itemStyle: {
                                    borderColor: "rgba(255,255,255,0.32)",
                                    borderWidth: 2,
                                    borderType: "solid",
                                },
                            }
                            let seriesData = [];
                            if (lineSet.linearData.length) {
                                let pointSet = lineSet.linearData;
                                pointSet.forEach((dot, index1) => {
                                    let point = [];
                                    point.push(dot.label);
                                    xSet.add(dot.label);
                                    point.push(dot.value);
                                    seriesData.push(point);
                                })
                            }
                            if (lineSet.label == '流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                            } else if (lineSet.label == '油压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                            } else if (lineSet.label == '泵频率') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 3;
                                
                            } else if (lineSet.label == '含水') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                            } else if (lineSet.label == '日产液') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                                series.itemStyle={color:'rgb(165,42,42)'}
                            } else if (lineSet.label == '日产油') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                                series.itemStyle={color:'rgb(0,255,255)'}
                            } else if (lineSet.label == '日产气') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 10;
                            } else if (lineSet.label == '井口温度') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 7;
                            } else if (lineSet.label == '折算基准面流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                            } else if (lineSet.label == '气油比') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                                series.itemStyle={color:'rgb(255,0,0)'}
                            } else if (lineSet.label == '生产时间') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                            } else {
                                return true;
                            }
                            series.data = seriesData;
                            series.showSymbol = false;
                            seriesDataOil.push(series);
                        }
                    })
                }
                let xData = Array.from(xSet);
                // resOption.title = title;
                resOption.legend.data = legendOil;
                resOption.xAxis[0].data = xData;
                resOption.xAxis[1].data = xData;
                resOption.xAxis[2].data = xData;
                resOption.series = seriesDataOil;
                
                console.log(resOption,888)
                return resOption;
            },
            //生成水井图表信息
            createWaterWellOption(charts, wellName) {
                let resOption = {};
                Object.assign(resOption, this.injectionWellOption);
                let seriesDataInj = [];
                let legendInj = [];
                let xSet = new Set();
                let title = {
                    text: wellName,
                    left: '10%',
                    top: 0,
                    textStyle: {
                        color: '#fff',
                        align: 'center'
                    }
                }
                if (charts) {
                    charts.forEach((item, index) => {
                        if (!item.linearDataSets) {
                            return true;
                        }
                        let lineSet = item.linearDataSets[0];
                        if (lineSet) {
                            legendInj.push(lineSet.label);
                            let series = {
                                name: lineSet.label,
                                type: "line",
                                label: {
                                    show: false,
                                    color: "#fff",
                                    fontSize: 14,
                                },
                                lineStyle: {},
                                symbol: "circle",
                                symbolSize: 5,
                                itemStyle: {
                                    borderColor: "rgba(255,255,255,0.32)",
                                    borderWidth: 2,
                                    borderType: "solid",
                                },
                            }
                            let seriesData = [];
                            let pointSet = lineSet.linearData;
                            if (pointSet) {
                                pointSet.forEach((dot, index1) => {
                                    let point = [];
                                    point.push(dot.label);
                                    xSet.add(dot.label);
                                    point.push(dot.value);
                                    seriesData.push(point);
                                })
                            }
                            if (lineSet.label == '日注水量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                                series.itemStyle={color:'rgb(0,255,255)'}
                            } else if (lineSet.label == '套压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                            } else if (lineSet.label == '井口压力') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                            } else if (lineSet.label == '注入时间') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                            } else if (lineSet.label == '日注聚量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                            } else if (lineSet.label == '水聚总量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 3;
                            } else if (lineSet.label == '日配注量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                            } else {
                                return true;
                            }
                            series.data = seriesData;
                            series.showSymbol = false;
                            seriesDataInj.push(series);
                        }
                    })
                }
                let xData = Array.from(xSet);
                // resOption.title = title;
                resOption.legend.data = legendInj;
                resOption.xAxis[0].data = xData;
                resOption.xAxis[1].data = xData;
                resOption.series = seriesDataInj;
                return resOption;
            },
            //表格-展示||隐藏
            tapDevelop(){
                this.isDevelop=!this.isDevelop;
                if(this.isDevelop){
                    this.$nextTick(()=>{
                        let parentDom=document.getElementsByClassName('z-echarts')[0];
                        parentDom.scrollBy({top:520,behavior: 'smooth'});
                    })
                }
            },
            //点击 切换数组顺序
            changeWell(wellId) {
                let wellItem = this.wellOptions.find(item => {
                    return item.wellId == wellId
                });
                if (wellItem) {
                    this.$nextTick(() => {
                        let index = this.wellOptions.indexOf(wellItem);
                        this.wellOptions.splice(index, 1);
                        this.wellOptions.unshift(wellItem);
                    })
                }
            },
            //下载echarts
            doDownLoad() {
                for (let i = 0; i < this.wellOptions.length; i++) {
                    this.$refs['echartDown' + i][0].chartDownLoad(this.wellOptions[i].wellNo + '—井组开发曲线');
                }
                if(isDevelop){
                    exportExcel('#tableData1', '水井对应曲线表');
                    exportExcel('#tableData2', '油井对应曲线表');
                }
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
    .z-main{
        width: 100%;
        height:calc(100% - 101px);
        .z-search{
            height:60px;
            display: flex;
        }
        .z-echarts{
            width:100%;
            height:calc(100% - 60px);
            overflow-y: scroll;
            padding-right:20px;
        }
        #tableData1,#tableData2{
            ::v-deep .el-table__header-wrapper .cell{
                height: auto;
                line-height: 18px;
                white-space: pre;
            }
            ::v-deep .cell:empty{
                &::before {
                    content: '-';
                } 
            }
        } 
    }
</style>