<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100" style="height: auto">
            <el-form :model="params" :inline="true" style="margin-top: 18px">
                <el-form-item label="油田：">
                    <el-select v-model="params.ogfId" disabled>
                        <el-option
                            v-for="item in params.ogfList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="params.blockId" disabled>
                        <el-option
                            v-for="item in params.blockList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井别：">
                    <el-select v-model="params.wellCategory" class="f2" filterable disabled>
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
                <el-form-item label="时间">
                    <el-date-picker
                        v-model="params.value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        style="margin-left: 20px"
                        @click="doSearch"
                        disabled
                    >检索
                    </el-button>
                </el-form-item>
            </el-form>
        </headerSearch>


        <pagePanel
            headerTitle="单井劈产剖面"
            v-if="params.wellCategory == '01'"
            style="position: relative; margin-top: 20px;height: 100%;"
        >
            <el-button type="primary" @click="back" style="position: absolute; right: 50px; top: 50px">返回</el-button>
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
                        :key="key"
                        style="margin-top: 20px; display: flex; justify-content: space-between;"
                        v-for="(item, key) in data"
                        v-show="dataIs"
                    >
                        <div style="padding-top: 100px;width: 6%;">
                            <div class="step" style="width: 100%;">{{ key }}</div>
                        </div>
                        <div style="width: 46%;">
                            <pagePanelNew style="margin-bottom: 20px; height: 400px ;width: 100%;">
                                <el-table highlight :data="item" height="340" style="width: 100%;">
                                    <el-table-column width="150" prop="wellName" align="center"
                                                     label="井号"></el-table-column>
                                    <el-table-column prop="intervNo" label="层段" align="center"></el-table-column>
                                    <el-table-column width="100" prop="stateDate" align="center"
                                                     label="时间"></el-table-column>
                                    <el-table-column prop="openState" label="状态" align="center">
                                        <template slot-scope="scope">{{ scope.row.openState == true?'打开':"关闭" }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="vertCoeffi" align="center"
                                                     label="劈分系数"></el-table-column>
                                    <el-table-column prop="remark" align="center" label="备注"></el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>

                        <div style="width: 46%;">

                            <pagePanelNew style="width: 550px; height: 400px;width: 100%;">
                                <Echart :chart-data="getEchart(item)" style="height:90%"></Echart>
                            </pagePanelNew>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </pagePanel>
        <pagePanel
            headerTitle="单井劈产剖面"
            v-if="params.wellCategory == '02'"
            style="position: relative; margin-top: 20px;height: 100%;"
            align="center"
        >
            <el-button type="primary" @click="back" style="position: absolute; right: 50px; top: 50px">返回</el-button>
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
                        :key="key"
                        style="margin-top: 20px; display: flex; justify-content: space-between;"
                        v-for="(item, key) in data1"
                        v-show="!dataIs"
                    >
                        <div style="width: 49%;">
                            <pagePanelNew style="margin-bottom: 20px; height: 400px ;width: 100%;">
                                <el-table highlight :data="item" height="340" style="width: 100%;">
                                    <el-table-column width="150" prop="wellName" align="center"
                                                     label="井号"></el-table-column>
                                    <el-table-column prop="intervNo" label="层段" align="center"></el-table-column>
                                    <el-table-column prop="openState" label="状态" align="center">
                                        <template slot-scope="scope">{{ scope.row.openState == true?'打开':"关闭" }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="vertCoeffi" align="center"
                                                     label="劈分系数"></el-table-column>
                                    <el-table-column prop="remark" align="center" label="备注"></el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>
                        <div style="width: 49%;">
                            <pagePanelNew style="width: 550px; height: 400px;width: 100%;">
                                <Echart :chart-data="getEchart1(item)" style="height: 90%;"></Echart>
                            </pagePanelNew>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </pagePanel>


    </div>
</template>
<script>

    import Echart from "@/components/tools/Echarts/index.vue";
    import {LineChart} from 'echarts/charts';
    import {GridComponent, LegendComponent, TooltipComponent} from 'echarts/components';
    import {CanvasRenderer} from 'echarts/renderers';
    import * as echarts from 'echarts/core';
    import horizontalSwitchBtn from '@/components/intelligentOilfield/horizontal-switch-button/index.vue';
    import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
    import chartsComponents from '@/components/intelligentOilfield/echarts-com/index.vue';
    import marquee from '@/components/intelligentOilfield/marquee-window/index.vue';

    echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);

    export default {
        components: {
            Echart,
            horizontalSwitchBtn,
            chartsComponents,
            marquee,
            verticalSwitchButton,
        },
        data() {
            return {
                dataIs: true,
                well: [],
                wellId: undefined, //井号
                //井别下拉框
                wellCategoryList: [
                    {id: "01", name: "油井"},
                    {id: "02", name: "水井"},
                ],
                data: {
                },
                data1: {
                    show: []
                },
                tData: [

                    {
                        "airPermeability": 2535.986,
                        "injProdRatio": 0,
                        "injRatio": null,
                        "intervId": null,
                        "intervNo": "P4",
                        "layerId": null,
                        "layerName": null,
                        "oilProd": 0,
                        "oilRatio": "0.0",
                        "openState": false,
                        "ratio": null,
                        "remark": "地层系数",
                        "stateDate": "2022-11-21",
                        "thicknessEffe": 7.3,
                        "vertCoeffi": 0,
                        "waterLayerData": null,
                        "waterProd": 0,
                        "wellId": "DA0269628E74490ABDE198E7D1DBF3EA",
                        "wellName": "QHD32-6-C1"
                    },
                    {
                        "airPermeability": 1535.986,
                        "injProdRatio": 0,
                        "injRatio": null,
                        "intervId": null,
                        "intervNo": "P4",
                        "layerId": null,
                        "layerName": null,
                        "oilProd": 0,
                        "oilRatio": "0.0",
                        "openState": false,
                        "ratio": null,
                        "remark": "地层系数",
                        "stateDate": "2022-11-21",
                        "thicknessEffe": 7.3,
                        "vertCoeffi": 0,
                        "waterLayerData": null,
                        "waterProd": 0,
                        "wellId": "DA0269628E74490ABDE198E7D1DBF3EA",
                        "wellName": "QHD32-6-C1"
                    },
                    {
                        "airPermeability": 2235.986,
                        "injProdRatio": 0,
                        "injRatio": null,
                        "intervId": null,
                        "intervNo": "P4",
                        "layerId": null,
                        "layerName": null,
                        "oilProd": 0,
                        "oilRatio": "0.0",
                        "openState": false,
                        "ratio": null,
                        "remark": "地层系数",
                        "stateDate": "2022-11-21",
                        "thicknessEffe": 7.3,
                        "vertCoeffi": 0,
                        "waterLayerData": null,
                        "waterProd": 0,
                        "wellId": "DA0269628E74490ABDE198E7D1DBF3EA",
                        "wellName": "QHD32-6-C1"
                    }, {
                        "airPermeability": 225.986,
                        "injProdRatio": 0,
                        "injRatio": null,
                        "intervId": null,
                        "intervNo": "P4",
                        "layerId": null,
                        "layerName": null,
                        "oilProd": 0,
                        "oilRatio": "0.0",
                        "openState": false,
                        "ratio": null,
                        "remark": "地层系数",
                        "stateDate": "2022-11-21",
                        "thicknessEffe": 7.3,
                        "vertCoeffi": 0,
                        "waterLayerData": null,
                        "waterProd": 0,
                        "wellId": "DA0269628E74490ABDE198E7D1DBF3EA",
                        "wellName": "QHD32-6-C1"
                    }
                ],
                params: {
                    ogfId: null,
                    blockId: null,
                    ogfList: [],
                    blockList: [],
                    value: ['0', '1'],
                    wellCategory: '01',
                },
            };
        },
        created() {
            this.queryChopSection();
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
                    ogfId: this.params.ogfId,
                    wellId: this.wellId,
                }
                var res =this.tData
                if (this.params.wellCategory === '02') {
                    this.data1.show = res
                    res.forEach((item) => {
                        this.data.show.push(item)
                    })
                } else if (this.params.wellCategory === '01') {
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
               
                /*      getChopSection(params).then((res) => {
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
                      })*/
            },
            /**
             * 图表
             */
            getEchart(items) {
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
                            data: items.map((item) => item.intervNo).reverse(),
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
            getEchart1(items) {
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
                            data: items.map((item) => item.intervNo).reverse(),
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


    .app-container {
        height: 100%;
    }

    ::v-deep .upload-demo {
        .el-upload {
            margin-top: 0;
            border: none;
        }
    }

    ::v-deep .el-upload {
        border: 0px;
        border-radius: 0px;
    }

    ::v-deep .el-upload-list {
        display: none;
    }

</style>
