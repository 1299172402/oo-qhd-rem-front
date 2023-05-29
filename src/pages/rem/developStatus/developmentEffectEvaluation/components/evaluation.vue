<!-- 产能类 -->
<template>
    <div class="z-main">
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <!-- <pagePanel headerTitle="采油速度" style="height: 370px;margin-top:0;" show-btn></pagePanel> -->
                <info-window infoWidth="100%" infoHeight="370px" headerTitle="采油速度" isShowMaxBtn>
                    <Echart :chart-data="productionSpeed" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="370px" headerTitle="采出程度" isShowMaxBtn>
                    <Echart :chart-data="recoveryDegree" style="height: 100%;"></Echart>
                </info-window>
            </div>
        </div>
        <div class="rowBox" style="margin-top:20px;">
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="采出程度与含水率关系图" isShowMaxBtn>
                    <Echart :chart-data="relationship" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="注采比" isShowMaxBtn>
                    <div class="search">
                        <span>合理注采比：</span>
                        <el-input-number v-model="lineStandOne" :controls="false" style="width: 180px;margin-right:15px;" @change="setFirstLine"></el-input-number>
                        <el-input-number v-model="lineStandTwo" :controls="false" style="width: 180px" @change="setSecondLine"></el-input-number>
                    </div>
                    <Echart :chart-data="injectionProductionRatio" style="height:calc(100% - 45px)"></Echart>
                </info-window>
            </div>
        </div>
        <div class="rowBox" style="margin-top:20px;">
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="360px" headerTitle="地层总压降" isShowMaxBtn>
                    <div class="search">
                        <span>合理地层压力：</span>
                        <el-input-number v-model="lineStandThree" :controls="false" style="width: 180px" @change="setThirdLine"></el-input-number>
                    </div>
                    <Echart :chart-data="totalFormationPressureDrop" style="height:calc(100% - 45px);"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="360px" headerTitle="指标评价结果表" isShowMaxBtn>
                    <div class="search">
                        <span>对标油田：</span>
                        <el-select v-model="fields" style="width:180px;height:30px;margin-right:15px;" disabled>
                            <el-option v-for="item in fieldsData" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        <span>开发阶段：</span>
                        <el-select v-model="fields" style="width: 180px;height:30px;margin-right:20px;">
                            <el-option v-for="item in fieldsData" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        <el-button type="primary" style="min-width: 65px;height:30px;">搜索</el-button>
                        <el-button type="primary" style="min-width: 65px;height:30px;">查看</el-button>
                    </div>
                    <el-table :data="tableData" highlight height="calc(100% - 45px)">
                        <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                        <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                        <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                        <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                        <el-table-column label="理论值" align="center">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.theoryValue" :controls="false" class="el-input-number" style="width: 70px"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="diffTheoryValue" label="与理论值对比差值" align="center">
                            <template slot-scope="scope">
                                <span>{{ (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="diffSimilarOilField" label="与同类型油田比较" align="center" width="80"></el-table-column>
                        <el-table-column prop="result" label="结论" align="center" width="80"></el-table-column>
                    </el-table>
                </info-window>
            </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import Echart from '@/components/tools/Echarts/index.vue';
    import { fetchOilFields, fetchFields } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { outputSpeed, outputDegree, outputDegreeTongChart, injectionProRate, generalPressure, indicatorEveluationResults } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    export default {
        components: {
            Echart,
        },
        props: {
          selectOilField: {
            type: String,
            default: "",
          },
          selectBlock: {
            type: String,
            default: "",
          },
        },
        filters: {
            toFixNumberFour(val) {
                return val.toFixed(4);
            },
        },
        data() {
            return {
                //对标油
                fields: '',
                fieldsData: '',
                //注采比 第一条标线
                lineStandOne: 0.6,
                //注采比 第二条标线
                lineStandTwo: 1,
                //地层总降压 标线
                lineStandThree: 0,
                //查询参数
                queryParams: {},
                page: 1,
                pageSize: 10,
                //采油速度
                productionSpeed: {
                    grid:{
                        x: 120,
                        y: 30,
                        x2: 120,
                        y2: 70,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    dataZoom: {
                        start: 0,
                        type: 'inside'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '采油速度',
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{                                    opacity:0                                }
                            }
                        }
                    },
                    legend: {
                        data: [],
                        x:'center',
                        bottom:10,
                        textStyle: {
                            color: '#24DEFF'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#698398',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine:{
                            show:false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
                    yAxis: [
                        {
                            name: '地质储量采油速度%',
                            nameLocation: 'center',
                            nameTextStyle: {
                                color: '#8FA4CC'
                            },
                            nameGap: 44,
                            type: 'value',
                            minInterval: 0,
                            axisLabel: {
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.3)'
                                }
                            }
                        },
                        {
                            name: '可采、剩余可采采油速度%',
                            nameLocation: 'center',
                            nameTextStyle: {
                                color: '#8FA4CC'
                            },
                            nameGap: 44,
                            type: 'value',
                            minInterval: 0,
                            axisLabel: {
                                color: '#698398'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.3)'
                                }
                            }
                        },
                    ],
                    series: []
                },
                //采出程度
                recoveryDegree: {
                    grid:{
                        top:30,
                        right:120,
                        bottom: 90,
                        left:120,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        x:'center',
                        bottom:10,
                        textStyle: {
                            color: '#24DEFF'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '地质储量采出程度',
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            }
                        }
                    },
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
                    xAxis: {
                        name: '地质储量采出程度(%)',
                        nameLocation: 'center',
                        nameTextStyle: {
                            color: '#8FA4CC'
                        },
                        nameGap: 35,
                        //max: 60,
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.3)'
                            }
                        }
                    },
                    yAxis: {
                        name: '含水率(%)',
                        nameLocation: 'center',
                        nameTextStyle: {
                            color: '#8FA4CC'
                        },
                        nameGap: 44,
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.3)'
                            }
                        }
                    },
                    series: []
                },
                //采出程度与含水率关系图
                relationship: {
                    grid:{
                        top:30,
                        right:120,
                        bottom: 100,
                        left:120,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        confine: true
                    },
                    legend: {
                        x:'center',
                        bottom:0,
                        textStyle: {
                            color: '#24DEFF'
                        },
                        data: [],
                        itemGap: 5
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '采出程度与含水率关系',
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            }
                        }
                    },
                    xAxis: {
                        name: '地质储量采出程度(%)',
                        nameLocation: 'center',
                        nameTextStyle: {
                            color: '#8FA4CC'
                        },
                        nameGap:40,
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    yAxis: {
                        name: '综合含水率(%)',
                        nameLocation: 'center',
                        nameTextStyle: {
                            color: '#8FA4CC'
                        },
                        nameGap: 44,
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
                    series: []
                },
                //注采比
                injectionProductionRatio: {
                    grid:{
                        top:10,
                        right:120,
                        bottom: 80,
                        left:120,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    dataZoom: {
                        start: 0,
                        type: 'inside'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '注采比',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: '#8fa4cc',
                            padding:[10,0,0,0],
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    yAxis: {
                        name: '月度注采比',
                        nameLocation: 'center',
                        nameTextStyle: { color: '#8FA4CC' },
                        nameGap: 44,
                        max: 1.2,
                        interval: 0.2,
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
                    series: [
                        {
                            name: '注采比',
                            data: [],
                            type: 'line',
                            barWidth: '20',
                            markLine: {
                                symbol: 'none',
                                silent: false,
                                data: [
                                    {
                                        yAxis: 0.6
                                    },
                                    {
                                        yAxis: 1
                                    }
                                ],
                                label:{
                                    color:'#8FA4CC'
                                },
                                lineStyle: {
                                    color: 'orange',
                                    type: 'solid'
                                }
                            },

                            showSymbol: false
                        }
                    ]
                },
                //地层总压降
                totalFormationPressureDrop: {
                    grid:{
                        top:10,
                        right:120,
                        bottom: 80,
                        left:120,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['合理地层压力', '压力保持水平'],
                        x:'center',
                        bottom:30,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '地层总压降',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: '#8FA4CC'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.3)'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                 color: 'rgba(143,164,204,.5)'
                            }
                        }
                    },
                    series: [
                        {
                            name: '压力保持水平',
                            data: [
                                /*7, 6, 7, 4, 5*/
                            ],
                            type: 'bar',
                            barWidth: '20',
                            label: {
                                show: true,
                                position: 'top',
                                color: '#00D9EA'
                            },
                            /*symbol: "circle",*/
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
                            markLine: {
                                symbol: 'none',
                                silent: false,
                                data: [
                                    {
                                        yAxis: 0
                                    }
                                ],
                                label:{
                                    color:'#8FA4CC'
                                },
                                lineStyle: {
                                    color: 'orange',
                                    type: 'solid'
                                }
                            }
                        }
                    ]
                },
                //指标评价结果表
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //设置注采比的第一条标线
            setFirstLine() {
                let number = this.lineStandOne;
                this.injectionProductionRatio.series[0].markLine.data[0].yAxis = number;
            },
            //设置注采比的第二条标线
            setSecondLine() {
                let number = this.lineStandTwo;
                this.injectionProductionRatio.series[0].markLine.data[1].yAxis = number;
            },
            //地层总降压的标线
            setThirdLine() {
                let number = this.lineStandThree;
                this.totalFormationPressureDrop.series[0].markLine.data[0].yAxis = number;
            },
            //搜索方法
            doSearch() {
                this.getOutputSpeed(this.selectOilField, this.selectBlock);
                this.getOutputDegree(this.selectOilField, this.selectBlock);
                this.getOutputDegreeTongChart(this.selectOilField, this.selectBlock);
                this.getInjectionProRate(this.selectOilField, this.selectBlock);
                this.getGeneralPressure(this.selectOilField, this.selectBlock);
                this.getIndicatorEveluationResults(this.selectOilField, this.selectBlock);
            },
            //产能类 采油速度
            getOutputSpeed(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                outputSpeed(request).then((res) => {
                    if (res.data.code == 200) {
                        let lineChart = res.data.data.chart.linearDataSets;
                        let legendData = [];
                        let seriesData = [];
                        lineChart.forEach((item, index) => {
                            legendData.push(item.label);
                            seriesData.push(this.outputSpeedLine(item));
                        });
                        this.productionSpeed.legend.data = legendData;
                        this.productionSpeed.series = seriesData;
                    } else {
                        let legendData = [];
                        let seriesData = [];
                        this.productionSpeed.legend.data = legendData;
                        this.productionSpeed.series = seriesData;
                    }
                });
            },
            //采出速度 折线解析
            outputSpeedLine(linearChart) {
                let series = {};
                series.type = 'line';
                let seriesName = linearChart.label;
                series.name = seriesName;
                if (seriesName == '实际年采油速度') {
                    series.yAxisIndex = 0;
                } else if (seriesName == '可采储量采油速度' || seriesName == '剩余可采储量采油速度') {
                    series.yAxisIndex = 1;
                }
                let linearData = linearChart.linearData;
                let seriesData = [];
                linearData.forEach((item, index) => {
                    let point = [];
                    let label = item.label.split('-');
                    point.push(label[0] + '-' + label[1]);
                    point.push(item.value);
                    seriesData.push(point);
                });
                series.data = seriesData;
                series.symbol = 'none';
                return series;
            },
            //采出程度
            getOutputDegree(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                outputDegree(request).then((res) => {
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let lineChart = res.data.data.chart.lineChartDataSets;
                        lineChart.forEach((item, index) => {
                            seriesData.push(this.outputDegreeLine(item));
                        });
                        this.recoveryDegree.series = seriesData;
                    } else {
                        let seriesData = [];
                        this.recoveryDegree.series = seriesData;
                    }
                });
            },
            //采出程度折线解析
            outputDegreeLine(lineChart) {
                let series = {};
                series.type = 'scatter';
                series.symbolSize = 4;
                series.name = lineChart.label;
                series.label = {
                    show: false,
                    position: 'top',
                    color: '#00D9EA'
                };
                let seriesData = [];
                let lineData = lineChart.numberPoints;
                lineData.forEach((item, index) => {
                    let point = [];
                    point.push(item.x);
                    point.push(item.y);
                    seriesData.push(point);
                });
                series.data = seriesData;
                return series;
            },
            //采出程度与含水率关系图
            getOutputDegreeTongChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                let legendData = [];
                let seriesData = [];
                outputDegree(request).then((res) => {
                    if (res.data.code == 200) {
                        let lineChart = res.data.data.chart.lineChartDataSets;
                        lineChart.forEach((item, index) => {
                            legendData.push(item.label);
                            seriesData.push(this.outputDegreeLine(item));
                        });
                    } else {
                        legendData = [];
                        seriesData = [];
                    }
                });

                outputDegreeTongChart(request).then((res) => {
                    if (res.data.code == 200) {
                        let lineChart = res.data.data.chart.lineChartDataSets;
                        lineChart.forEach((item, index) => {
                            legendData.push('Rm=' + item.label);
                            seriesData.push(this.outputDegreeTongChart(item));
                        });
                    } else {
                        legendData = [];
                        seriesData = [];
                    }
                });
                this.relationship.legend.data = legendData;
                this.relationship.series = seriesData;
            },
            //采出程度童氏图折线解析
            outputDegreeTongChart(lineChart) {
                let series = {};
                series.name = 'Rm=' + lineChart.label;
                series.type = 'line';
                series.symbol = 'none';
                /* series.symbolSize=3;*/
                series.smooth = true;
                let seriesData = [];
                let lineData = lineChart.numberPoints;
                lineData.forEach((item, index) => {
                    let point = [];
                    point.push(item.x);
                    point.push(item.y);
                    seriesData.push(point);
                });
                series.data = seriesData;
                return series;
            },
            //注采比
            getInjectionProRate(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                injectionProRate(request).then((res) => {
                    if (res.data.code == 200) {
                        let linearChart = res.data.data.chart.linearDataSets[0].linearData;
                        let seriesData = [];
                        linearChart.forEach((item, index) => {
                            let point = [];
                            let xData = '';
                            let label = item.label.split('-');
                            xData = label[0] + '-' + label[1];
                            point.push(xData);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.injectionProductionRatio.series[0].data = seriesData;
                    } else {
                        let seriesData = [];
                        this.injectionProductionRatio.series[0].data = seriesData;
                    }
                });
            },
            //地层总压降
            getGeneralPressure(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                generalPressure(request).then((res) => {
                    if (res.data.code == 200) {
                        let barChart = res.data.data.chart.barDataSets[0].barDatas;
                        let seriesData = [];
                        barChart.forEach((item, index) => {
                            let point = [];
                            point.push(item.label.substring(0, 4));
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.totalFormationPressureDrop.series[0].data = seriesData;
                    } else {
                        let seriesData = [];
                        this.totalFormationPressureDrop.series[0].data = seriesData;
                    }
                });
            },
            //指标评价结果
            getIndicatorEveluationResults(oilFieldId, fieldId) {
                var request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId
                };
                indicatorEveluationResults(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.indicatorEvaluationResults;
                        // this.tableData = [...res.data.data.indicatorEvaluationResults, ...res.data.data.indicatorEvaluationResults];
                    } else {
                        this.tableData = [];
                    }
                });
            },
            //下载echarts 隐藏 显示
            downPower(flag) {
                this.productionSpeed.toolbox.show = flag;
                this.recoveryDegree.toolbox.show = flag;
                this.relationship.toolbox.show = flag;
                this.injectionProductionRatio.toolbox.show = flag;
                this.totalFormationPressureDrop.toolbox.show = flag;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-main{
        padding-top:8px;
        padding-bottom: 8px;
        .rowBox{
            padding-left:8px;
            display: flex;
            align-items: center;
            .row{
                flex:1;
                width:0;
                .search {
                    padding-left:20px;
                    padding-top:10px;
                    height:40px;
                    margin-bottom:15px;
                    ::v-deep .el-select{
                        .el-input__inner{
                           height:30px;
                        }
                        .el-input__icon{
                           line-height: 30px;;
                        }
                    }
                }
                ::v-deep .el-input-number{
                    width: 80px;
                    height:30px;
                    .el-input__inner{
                        height:30px;
                    }
                }
            }
        }
    }
</style>