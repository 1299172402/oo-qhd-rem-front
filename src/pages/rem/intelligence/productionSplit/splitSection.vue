<template>
    <div style="height: 100%">
        <header-search style="height: auto">
            <el-form style="margin: 20px 0 10px 0" :inline="true">
                <el-row>
                    <el-form-item label="油田：">
                        <el-select v-model="params.ogfId.value" disabled>
                            <el-option
                                v-for="item in params.ogfList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区块：">
                        <el-select v-model="params.blockId.value" disabled>
                            <el-option
                                v-for="item in params.blockList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="井别：">
                        <el-select v-model="params.wellCategory" class="f2" style="width: 100px" filterable disabled>
                            <el-option
                                v-for="item  in wellCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="井号：">
                        <el-select v-model="wellId" class="f2" disabled>
                            <el-option
                                v-for="item in params.wellId"
                                :key="item.wellId"
                                :label="item.wellName"
                                :value="item.wellId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间：">
                        <el-date-picker
                            v-model="params.value"
                            type="daterange"
                            range-separator="-"
                            style="width: 250px"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            disabled
                        ></el-date-picker>
                    </el-form-item>
                   
                    <el-button style="float: right" type="primary" @click="back">返回</el-button>
                </el-row>
            </el-form>
        </header-search>
        <page-panel
            header-title="单井劈产剖面"
            v-if="params.wellCategory == '01'"
            style="position: relative; margin-top: 20px;height: calc(100% - 100px);"
        >
            <el-container class="layout">
                <el-header height="auto" align="left">
                    <span>井号：</span>
                    <el-select v-model="wellId" @change="doSearch">
                        <el-option
                            v-for="item in params.wellId"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        ></el-option>
                    </el-select>
                </el-header>
                <el-main>
                    <div
                        v-if="data"
                        style="margin-top: 20px; display: flex; justify-content: space-between;"
                        v-for="(item, key) in data"
                        :key="key"
                    >
                        <div style="padding-top: 100px;width: 6%;">
                            <div class="step" style="width: 100%;">{{ key }}</div>
                        </div>
                        <div style="width: 46%;">
                            <page-panel-new style="margin-bottom: 20px; height: 400px ;width: 100%;">
                                <el-table highlight :data="item" height="340" style="width: 100%;">
                                    <el-table-column width="150" prop="wellName" align="center"
                                                     label="井号"></el-table-column>
                                    <el-table-column prop="intervNo" label="层段" align="center"></el-table-column>
                                    <el-table-column width="100" prop="stateDate" align="center"
                                                     label="时间"></el-table-column>
                                    <el-table-column prop="openState" label="状态" align="center">
                                        <template slot-scope="scope">{{
                                                scope.row.openState == true ? '打开' : "关闭"
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="vertCoeffi" align="center"
                                                     label="劈分系数"></el-table-column>
                                    <el-table-column prop="remark" align="center" label="备注"></el-table-column>
                                </el-table>
                            </page-panel-new>
                        </div>
                        <div style="width: 46%;">
                            <page-panel-new style="width: 550px; height: 400px;width: 100%;">
                                <Echart :chart-data="getEchart(item)" style="height:90%"></Echart>
                            </page-panel-new>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </page-panel>
        <page-panel
            header-title="单井劈产剖面"
            v-if="params.wellCategory == '02'"
            style="position: relative; margin-top: 20px;height: calc(100% - 100px);"
        >
            <el-container class="layout">
                <el-header height="auto" align="left">
                    <span>井号：</span>
                    <el-select v-model="wellId" @change="doSearch">
                        <el-option
                            v-for="item in params.wellId"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        ></el-option>
                    </el-select>
                </el-header>
                <el-main>
                    <div
                        v-if="data1"
                        style="margin-top: 20px; display: flex; justify-content: space-between;"
                        v-for="(item, key) in data1"
                        :key="key"
                    >
                        <div style="width: 49%;">
                            <page-panel-new style="margin-bottom: 20px; height: 400px ;width: 100%;">
                                <el-table highlight :data="item" height="340" style="width: 100%;">
                                    <el-table-column width="150" prop="wellName" align="center"
                                                     label="井号"></el-table-column>
                                    <el-table-column prop="intervNo" label="层段" align="center"></el-table-column>
                                    <el-table-column prop="openState" label="状态" align="center">
                                        <template slot-scope="scope">{{
                                                scope.row.openState == true ? '打开' : "关闭"
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="vertCoeffi" align="center"
                                                     label="劈分系数"></el-table-column>
                                    <el-table-column prop="remark" align="center" label="备注"></el-table-column>
                                </el-table>
                            </page-panel-new>
                        </div>
                        <div style="width: 49%;">
                            <page-panel-new style="width: 550px; height: 400px;width: 100%;">
                                <Echart :chart-data="getEchart1(item)" style="height: 90%;"></Echart>
                            </page-panel-new>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </page-panel>
    </div>
</template>
<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import {getChopSection} from '@/api/rem/r-intelligentIPA.js';
// import { number } from 'echarts/lib/export';


export default {
    components: {
        Echart,
    },
    data() {
        return {
            well: [],
            wellId: undefined, //井号
            //井别下拉框
            wellCategoryList: [
                {id: "01", name: "油井"},
                {id: "02", name: "水井"},
            ],
            data: null,
            data1: {
                show: []
            },
            params: {
                ogfId: null,
                blockId: null,
                ogfList: [],
                blockList: [],
                wellCategory: '',
            },
        };
    },
    mounted() {
        const params = JSON.parse(localStorage.getItem('PRODUCTION_SPLIT'))
        if (params) {
            this.params = {...params, ogfList: [params.ogfId], blockList: [params.blockId]}
            this.well = params.wellId
            this.wellId = params.wellId[0].wellId
        }
        this.queryChopSection();
    },
    methods: {
        // 搜索
        doSearch(qq) {
            this.data = null;
            this.queryChopSection();
        },
        // 返回
        back() {
            this.$router.go(-1);
        },

        /**
         * 获取数据 表格
         */
        queryChopSection() {
            let params = {
                apprndixId: this.params.wellCategory,
                beginTime: this.params.value[0],
                endTime: this.params.value[1],
                ogfId: this.params.ogfId.value,
                wellId: this.wellId,
                blockId: this.params.blockId.value,
            }
            getChopSection(params).then((res) => {
                if (this.params.wellCategory == '02') {
                    this.data1.show = res
                    res.forEach((item) => {
                        this.data.show.push(item)
                    })
                } else if (this.params.wellCategory == '01') {
                    console.log(res)
                    if (!this.data) {
                        this.data = {};
                    }
                    res.forEach((item) => {
                        item.stateDate = item.stateDate.replaceAll('-', '/')
                        item.vertCoeffi = Number(item.vertCoeffi).toFixed(2)
                        if (!this.data[item.stateDate]) {
                            this.data[item.stateDate] = [];
                        }
                        this.data[item.stateDate].push(item);
                        console.log(this.data)
                    });
                }
                ;
            })

        },
        /**
         * 图表
         */
        getEchart(itemsList) {
            const items = [...itemsList].reverse()
            let option = {
                title: {},
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },

                grid: [
                    {left: "4%", top: "8%", width: "13%", height: "85%"},
                    {left: "24%", top: "8%", width: "13%", height: "85%"},
                    {left: "44%", top: "8%", width: "13%", height: "85%"},
                    {left: "64%", top: "8%", width: "13%", height: "85%"},
                    {left: "84%", top: "8%", width: "13%", height: "85%"},
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 1,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 2,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 3,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                        gridIndex: 4,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                ],
                xAxis: [
                    {
                        gridIndex: 0,
                        name: "厚度（m）", //1
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        offset: 0,
                        position: "left",
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
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 1,
                        name: "渗透率（mD）", //4
                        nameLocation: "center",
                        nameGap: 10,
                        nameRotate: 0,
                        nameTextStyle: {
                            color: "#00ccff",
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
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 2,
                        name: "产油量（m³）", //9
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        position: "right",
                        axisLabel: {
                            show: false,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 3,
                        name: "产水量（m³）", //9
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        position: "right",
                        axisLabel: {
                            show: false,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 4,
                        name: "采液强度（m³/（d·m））", //9
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        position: "right",
                        axisLabel: {
                            show: false,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        name: "厚度",
                        yAxisIndex: 0,
                        xAxisIndex: 0,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => item.thicknessEffe),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(214,118,237)"},
                                {offset: 1, color: "rgb(108,82,241)"},
                            ]),
                        },
                    },
                    {
                        type: "bar",
                        name: "渗透率",
                        yAxisIndex: 1,
                        xAxisIndex: 1,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Math.floor(item.airPermeability)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [

                                {offset: 0, color: "rgb(255,203,88)"},
                                {offset: 1, color: "rgb(250,115,55)"},
                            ]),
                        },
                    },

                    {
                        type: "bar",
                        name: "产油量",
                        yAxisIndex: 2,
                        xAxisIndex: 2,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Math.floor(item.oilProd)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(0,249,207)"},
                                {offset: 1, color: "rgb(7,123,65)"},
                            ]),
                        },
                    },
                    {
                        type: "bar",
                        name: "产水量",
                        yAxisIndex: 3,
                        xAxisIndex: 3,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Math.floor(item.waterProd)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(0,213,234)"},
                                {offset: 1, color: "rgb(14,105,233)"},
                            ]),
                        },
                    },

                    {
                        type: "bar",
                        name: "采液强度",
                        yAxisIndex: 4,
                        xAxisIndex: 4,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Number(item.oilRatio).toFixed(2)),

                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(251,255,99)"},
                                {offset: 1, color: "rgb(196,255,126)"},
                            ]),
                        },
                    },
                ],
            };

            return option;
        },
        getEchart1(itemsList) {
            const items = [...itemsList].reverse()
            let option = {
                title: {},
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },

                grid: [
                    {left: "18%", top: "8%", width: "13%", height: "85%"},
                    {left: "38%", top: "8%", width: "13%", height: "85%"},
                    {left: "58%", top: "8%", width: "13%", height: "85%"},
                    {left: "78%", top: "8%", width: "13%", height: "85%"},
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 1,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 2,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    {
                        gridIndex: 3,
                        type: "category",
                        data: items.map((item) => item.intervNo),
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
                ],
                xAxis: [
                    {
                        gridIndex: 0,
                        name: "厚度（m）", //1
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        offset: 0,
                        position: "left",
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
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 1,
                        name: "渗透率（mD）", //4
                        nameLocation: "center",
                        nameGap: 10,
                        nameRotate: 0,
                        nameTextStyle: {
                            color: "#00ccff",
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
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 2,
                        name: "注水量（m³）", //9
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        position: "right",
                        axisLabel: {
                            show: false,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        gridIndex: 3,
                        name: "注水强度（m³/（d·m））", //9
                        nameLocation: "center",
                        nameRotate: 360,
                        nameGap: 10,
                        nameTextStyle: {
                            color: "#00ccff",
                            fontSize: 14,
                        },
                        position: "right",
                        axisLabel: {
                            show: false,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        name: "厚度",
                        yAxisIndex: 0,
                        xAxisIndex: 0,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => item.thicknessEffe),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(214,118,237)"},
                                {offset: 1, color: "rgb(108,82,241)"},
                            ]),
                        },
                    },
                    {
                        type: "bar",
                        name: "渗透率",
                        yAxisIndex: 1,
                        xAxisIndex: 1,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Math.floor(item.airPermeability)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [

                                {offset: 0, color: "rgb(255,203,88)"},
                                {offset: 1, color: "rgb(250,115,55)"},
                            ]),
                        },
                    },

                    {
                        type: "bar",
                        name: "注水量",
                        yAxisIndex: 2,
                        xAxisIndex: 2,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Math.floor(item.injRatio)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(0,249,207)"},
                                {offset: 1, color: "rgb(7,123,65)"},
                            ]),
                        },
                    },
                    {
                        type: "bar",
                        name: "注水强度",
                        yAxisIndex: 3,
                        xAxisIndex: 3,
                        label: {
                            show: true,
                            position: 'right',
                            color: '#66ffff'
                        },
                        data: items.map((item) => Number(item.injProdRatio).toFixed(2)),
                        barWidth: 15,
                        itemStyle: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {offset: 0, color: "rgb(0,213,234)"},
                                {offset: 1, color: "rgb(14,105,233)"},
                            ]),
                        },
                    },
                ],
            };

            return option;
        },
    },
};
</script>
<style lang="scss" scoped>
.step {
    position: relative;
    border: 1px solid #66ffff;
    background: #3399ff;
    height: 30px;
    line-height: 30px;

    &::before {
        content: "";
        width: 1px;
        height: 100px;
        background-color: #00b4ff;
        position: absolute;
        left: 50%;
        top: -80px;
    }

    &::after {
        content: "";
        width: 1px;
        height: 270px;
        background-color: #00b4ff;
        position: absolute;
        left: 50%;
        top: 32px;
    }
}
</style>
