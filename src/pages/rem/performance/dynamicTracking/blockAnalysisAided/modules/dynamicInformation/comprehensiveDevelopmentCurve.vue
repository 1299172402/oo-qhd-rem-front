<!--综合开发曲线-->
<template>
    <div class="z-main">  
        <pagePanel style="height:100%; margin-top: 0;" headerTitle="综合开发曲线" show-btn>
            <div class="positionBtn">
                <el-button type="primary" style="height:30px;" size="mini" @click="dialogVisible = true">选择指标信息</el-button>
            </div>
            <Echart ref="echartDown" :chart-data="option" style="height: 100%"></Echart>
        </pagePanel>
        <el-dialog title="选择查看指标信息" :visible.sync="dialogVisible" width="400px">
            <el-checkbox-group v-model="selectIndexList" style="display: flex;flex-direction: column">
                <el-checkbox v-for="(item, index) in indexList" :key="index" :label="item.label" :value="item.value" style="margin-left: 10px;"></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeIndex">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import { dynamicDataComprehensiveDevelopmentCurve } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
    import * as echarts from 'echarts';
    import FileSaver from 'file-saver';
    export default {
        components: {
            Echart
        },
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                option: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                            start: 0, //滚动条开始位置（共100等份)
                            end: 100, //滚动条结束位置
                        },
                    ],
                    grid: [
                        { x: '180', y: '2%', width: '85%', height: '6%' },
                        { x: '180', y: '10%', width: '85%', height: '7%' },
                        { x: '180', y: '20%', width: '85%', height: '7%' },
                        { x: '180', y: '30%', width: '85%', height: '7%' },
                        { x: '180', y: '40%', width: '85%', height: '7%' },
                        { x: '180', y: '50%', width: '85%', height: '6%' },
                        { x: '180', y: '60%', width: '85%', height: '6%' },
                        { x: '180', y: '70%', width: '85%', height: '6%' },
                        { x: '180', y: '80%', width: '85%', height: '6%' },
                        { x: '180', y: '90%', width: '85%', height: '6%' }
                    ],
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    xAxis: [
                        {
                            // show: false,
                            gridIndex: 0,
                            type: 'category',
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            // show: false,
                            gridIndex: 1,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            // show: false,
                            gridIndex: 2,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color:'#8FA4CC'
                                }
                            }
                        },
                        {
                            // show: false,
                            gridIndex: 3,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            gridIndex: 4,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color:'#8FA4CC'
                                }
                            }
                        },
                        {
                            gridIndex: 5,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            gridIndex: 6,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            gridIndex: 7,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            gridIndex: 8,
                            data: [],
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '年',
                            gridIndex: 9,
                            data: [],
                            axisLabel: {
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: '油井总井数(口)\n\n油井开井数(口)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 0,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            minorTick: {
                                splitNumber: '1'
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '水井总井数(口)\n\n水井开井数(口)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 1,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '油田日产液(m³/d)\n\n油田日产油(m³/d)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 2,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '平均单井日产液(m³/d)\n\n平均单井日产油(m³/d)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 3,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color:'#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '含水率(%)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 4,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '气油比',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 5,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '油田平均日注水(m³/d)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 6,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '地层压降(MPa)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 7,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '月注采比',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 8,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            }
                        },
                        {
                            name: '年产油(10⁴m³)',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            gridIndex: 9,
                            scale: true,
                            interval: 100000000,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                                showMinLabel: true,
                                showMaxLabel: true
                            },
                            axisTick: {
                                show: true,
                                inside: true
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(255,255,255,.16)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            name: '油井总井数(口)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            itemStyle: {
                                color: '#030303',
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '油井开井数(口)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            itemStyle: {
                                color: '#c2272c'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '水井总井数(口)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                color: '#274f97'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '水井开井数(口)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                color: '#9b5497'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '油田日产液(m³/d)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            itemStyle: {
                                color: '#902f2f'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '油田日产油(m³/d)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            itemStyle: {
                                color: '#69b146'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '平均单井日产液(m³/d)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            itemStyle: {
                                color: '#902f2f'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '平均单井日产油(m³/d)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            itemStyle: {
                                color: '#69b146'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '含水率(%)',
                            /*symbol: "circle",
              symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 4,
                            yAxisIndex: 4,
                            itemStyle: {
                                color: 'rgb(0,0,255)'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '气油比',
                            /* symbol: "circle",
                symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 5,
                            yAxisIndex: 5,
                            itemStyle: {
                                color: '#d92c28'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '油田平均日注水(m³/d)',
                            /*symbol: "circle",
                symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 6,
                            yAxisIndex: 6,
                            itemStyle: {
                                color: '#61bcc4'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '地层压降(MPa)',
                            /*symbol: "circle",
                symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 7,
                            yAxisIndex: 7,
                            itemStyle: {
                                color: 'rgba(138, 238, 50, 1)'
                            },
                            data: []
                        },
                        {
                            type: 'line',
                            name: '月注采比',
                            /*symbol: "circle",
                symbolSize: 4,*/
                            symbol: 'none',
                            xAxisIndex: 8,
                            yAxisIndex: 8,
                            itemStyle: {
                                color: 'rgba(53, 120, 2, 1)'
                            },
                            data: []
                        },
                        {
                            type: 'bar',
                            name: '年产油(10⁴m³)',
                            barWidth: 22,
                            /*symbol: "circle",
                symbolSize: 4,*/
                            xAxisIndex: 9,
                            yAxisIndex: 9,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#00D9EA'
                                    },
                                    {
                                        offset: 1,
                                        color: '#0F65EA'
                                    }
                                ])
                            },
                            data: []
                        }
                    ]
                },
                //选中指标列表
                selectIndexList: [],
                //指标数据
                indexList: [
                    {
                        value: 0,
                        label: '油井数量'
                    },
                    {
                        value: 1,
                        label: '水井数量'
                    },
                    {
                        value: 2,
                        label: '油田日产'
                    },
                    {
                        value: 3,
                        label: '平均单井日产'
                    },
                    {
                        value: 4,
                        label: '含水率'
                    },
                    {
                        value: 5,
                        label: '气油比'
                    },
                    {
                        value: 6,
                        label: '平均日注水'
                    },
                    {
                        value: 7,
                        label: '地层压降'
                    },
                    {
                        value: 8,
                        label: '月注采比'
                    },
                    {
                        value: 9,
                        label: '年产油'
                    }
                ],
                //指标参数选择
                dialogVisible: false
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async doSearch() {
                this.$emit('childPara', '');
                //获取参数油田id 平台id 井id
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId
                };
                dynamicDataComprehensiveDevelopmentCurve(request).then((res) => {
                    if (res.data.code == 200) {
                        //油井总井数和油井开井数
                        let proWellCountChart = res.data.data.proWellCountChart;
                        if (proWellCountChart != null) {
                            this.getProWellCountChart(proWellCountChart);
                        }
                        //水井总井数和水井开井数
                        let injWellCountChart = res.data.data.injWellCountChart;
                        if (injWellCountChart != null) {
                            this.getInjWellCountChart(injWellCountChart);
                        }
                        //单元日产液和单元日产油
                        let proUnitLiquidAndOilChart = res.data.data.proUnitLiquidAndOilChart;
                        if (proUnitLiquidAndOilChart != null) {
                            this.getProUnitLiquidAndOilChart(proUnitLiquidAndOilChart);
                        }
                        //平均单井日产液和平均单井日产油
                        let singleProUnitLiquidAndOilChart = res.data.data.singleProUnitLiquidAndOilChart;
                        if (singleProUnitLiquidAndOilChart != null) {
                            this.getSingleProUnitLiquidAndOilChart(singleProUnitLiquidAndOilChart);
                        }
                        //含水率
                        let waterCutChart = res.data.data.waterCutChart;
                        if (waterCutChart != null) {
                            this.getWaterCutChart(waterCutChart);
                        }
                        //气油比
                        let gasOilRateChart = res.data.data.gasOilRateChart;
                        if (gasOilRateChart != null) {
                            this.getGasOilRateChart(gasOilRateChart);
                        }
                        //日注水
                        let injectionDailyChart = res.data.data.injectionDailyChart;
                        if (injectionDailyChart != null) {
                            this.getInjectionDailyChart(injectionDailyChart);
                        }
                        //地层压降
                        let layerPressureChart = res.data.data.layerPressureChart;
                        if (layerPressureChart != null) {
                            this.getLayerPressureChart(layerPressureChart);
                        }
                        //月注采比
                        let proInjectMonthChart = res.data.data.proInjectMonthChart;
                        if (proInjectMonthChart != null) {
                            this.getProInjectMonthChart(proInjectMonthChart);
                        }
                        //年产油
                        let oilYearChart = res.data.data.oilYearChart;
                        if (oilYearChart != null) {
                            this.getOilYearChart(oilYearChart);
                        }
                    }
                });
            },
            //油井总井数和油井开井数
            getProWellCountChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesDataAll = [];
                let seriesDataOpen = [];
                let linearSet = chart.linearDataSets;
                let linearDataAll = linearSet[0].linearData;
                let xSet = new Set();
                linearDataAll.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataAll.push(point);
                });
                let linearDataOpen = linearSet[1].linearData;
                linearDataOpen.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataOpen.push(point);
                });
                xData = Array.from(xSet).sort();
                this.option.xAxis[0].data = xData;
                this.option.series[0].data = seriesDataAll;
                this.option.series[1].data = seriesDataOpen;
            },
            //水井总井数和水井开井数
            getInjWellCountChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesDataAll = [];
                let seriesDataOpen = [];
                let linearSet = chart.linearDataSets;
                let linearDataAll = linearSet[0].linearData;
                let xSet = new Set();
                linearDataAll.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataAll.push(point);
                });
                let linearDataOpen = linearSet[1].linearData;
                linearDataOpen.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataOpen.push(point);
                });
                xData = Array.from(xSet).sort();
                this.option.xAxis[1].data = xData;
                this.option.series[2].data = seriesDataAll;
                this.option.series[3].data = seriesDataOpen;
            },
            //单元日产液和单元日产油
            getProUnitLiquidAndOilChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesDataLiq = [];
                let seriesDataOil = [];
                let linearSet = chart.linearDataSets;
                let linearDataLiq = linearSet[0].linearData;
                let xSet = new Set();
                linearDataLiq.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataLiq.push(point);
                });
                let linearDataOil = linearSet[1].linearData;
                linearDataOil.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataOil.push(point);
                });
                xData = Array.from(xSet).sort();
                this.option.xAxis[2].data = xData;
                this.option.series[4].data = seriesDataLiq;
                this.option.series[5].data = seriesDataOil;
            },
            //平均单井日产液和平均单井日产油
            getSingleProUnitLiquidAndOilChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesDataLiq = [];
                let seriesDataOil = [];
                let linearSet = chart.linearDataSets;
                let linearDataLiq = linearSet[0].linearData;
                let xSet = new Set();
                linearDataLiq.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataLiq.push(point);
                });
                let linearDataOil = linearSet[1].linearData;
                linearDataOil.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    xSet.add(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesDataOil.push(point);
                });
                xData = Array.from(xSet).sort();
                this.option.xAxis[3].data = xData;
                this.option.series[6].data = seriesDataLiq;
                this.option.series[7].data = seriesDataOil;
            },
            //含水率
            getWaterCutChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    xData.push(label[0] + '-' + label[1]);
                    seriesData.push(point);
                });
                this.option.xAxis[4].data = xData;
                this.option.series[8].data = seriesData;
            },
            //气油比
            getGasOilRateChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    xData.push(label[0] + '-' + label[1]);
                    seriesData.push(point);
                });
                this.option.xAxis[5].data = xData;
                this.option.series[9].data = seriesData;
            },
            //日注水
            getInjectionDailyChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    xData.push(label[0] + '-' + label[1]);
                    seriesData.push(point);
                });
                this.option.xAxis[6].data = xData;
                this.option.series[10].data = seriesData;
            },
            //地层压降
            getLayerPressureChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    xData.push(label[0] + '-' + label[1]);
                    seriesData.push(point);
                });
                this.option.xAxis[7].data = xData;
                this.option.series[11].data = seriesData;
            },
            //月注采比
            getProInjectMonthChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    xData.push(label[0] + '-' + label[1]);
                    seriesData.push(point);
                });
                this.option.xAxis[8].data = xData;
                this.option.series[12].data = seriesData;
            },
            //年产油
            getOilYearChart(chart) {
                // 如果没有曲线数据直接返回
                if(!chart?.linearDataSets) return
                let xData = [];
                let seriesData = [];
                let linearData = chart.linearDataSets[0].linearData;
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0]);
                    point.push(item.value);
                    xData.push(label[0]);
                    seriesData.push(point);
                });
                this.option.xAxis[9].data = xData;
                this.option.series[13].data = seriesData;
            },
            //下载echarts
            doDownLoad() {
                let res = this.$refs['echartDown'].chart.getDataURL({
                    type: 'png',
                    pixelRatio: 14,
                    backgroundColor: '#022644'
                });
                let fileName = '综合开发曲线';
                if (this.blockName) {
                    fileName = this.blockName + fileName;
                }
                FileSaver.saveAs(res, fileName);
            },
            //根据查看的指标来生成grid 来改变 显示图内容
            changeIndex() {
                //grid 结果
                let grid = [];
                let iList = this.selectIndexList;
                let height = 0;
                let yValue = 1;
                let num = iList.length;
                if (num) {
                    let hInterval = parseInt(Math.floor(100 / num));
                    let xhY = 1;
                    let xhHeight = hInterval - 4;
                    let yInterval = hInterval;
                    let max = 0;
                    //做了一个布局隐藏效果
                    this.indexList.forEach((item, index) => {
                        let gridDetail = { x: '160', y: '-10%', width: '85%', height: '2%' };

                        if (iList.includes(item.label)) {
                            gridDetail.y = xhY + '%';
                            gridDetail.height = xhHeight + '%';
                            xhY = xhY + yInterval;
                            if (max < item.value) {
                                max = item.value;
                            }
                        }
                        grid.push(gridDetail);
                        this.option.xAxis[index].axisLine.lineStyle = {
                            color: 'rgba(255,255,255,.16)'
                        };
                        this.option.xAxis[index].axisLabel.show = false;
                        this.option.xAxis[index].axisLabel.color = '#fff';
                    });
                    this.option.xAxis[max].axisLine.lineStyle = {
                        color: '#fff'
                    };
                    this.option.xAxis[max].axisLabel.show = true;
                } else {
                    this.indexList.forEach((item, index) => {
                        let gridDetail = { x: '160', y: '-10%', width: '88%', height: '2%' };
                        grid.push(gridDetail);
                    });
                }
                this.option.grid = grid;
                this.dialogVisible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-main{
        height:calc(100% - 101px);
        overflow-y:scroll;
        .positionBtn{
            position: absolute;
            right:56px;
            top:0;
        }
    }
</style>