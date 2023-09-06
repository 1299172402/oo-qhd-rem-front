<!-- 油田注水量-详情 -->
<template>
    <page-panel-new style="height:100%;margin-top:0;">
        <div class="pageHeader"  style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;margin-left: 0;">
            <span>{{ searchForm.oilFeildName }}注水计划管理</span>
            <el-button type="primary" style="height:30px;" @click="switchToBack">返回</el-button>
        </div>
        <div class="z-main">
            <pagePanel :headerTitle="'老井转注 井次：' +(oldWellCount ? oldWellCount : 0) +'口 注入量：' +(oldInjectionCount ? oldInjectionCount : 0) + 'm³' " style="height:calc(50% - 10px);margin-top:0;" show-btn>
                <!-- <div slot-name="titleContent">
                    <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart(1)">下载</el-button>
                </div> -->
                <Echart ref="echartChart1" :chart-data="oldWellLineChart" height="100%"></Echart>
            </pagePanel>
            <pagePanel :headerTitle="'新井投注 新井：' +(newWellCount ? newWellCount : 0) +'口 注入量：' +(newInjectionCount ? newInjectionCount : 0) +'m³'"  style="height: calc(50% - 10px);"  show-btn>
                <!-- <div slot-name="titleContent">
                    <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart(2)">下载</el-button>
                </div> -->
                <Echart ref="echartChart2" :chart-data="newWellLineChart" height="100%"></Echart>
            </pagePanel>
        </div>
    </page-panel-new>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import {oldToInjectionChart, newToInjectionChart} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    export default {
        components: {
            Echart,
        },
        data() {
            return {
                searchForm:{},
                //老井转注 井数
                oldWellCount: 0,
                //老井转注 注入量
                oldInjectionCount: 0,
                //新井转注 井数
                newWellCount: 0,
                //新井转注 注入量
                newInjectionCount: 0,
                //老井转注 折线图1
                oldWellLineChart: {
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '老井转注 井次：' +(this.oldWellCount ? this.oldWellCount : 0) +'口 注入量：' +(this.oldInjectionCount ? this.oldInjectionCount : 0) + 'm³',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#9A72FF', '#DA835E'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid:{
                        x: 120,
                        y: 50,
                        x2: 120,
                        y2: 100,
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:10,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                            fontSize: 12,
                            interval: function(index, val) {
                                console.log('val',val.substr(-2))
                                if (val.substr(-2) == '01') {
                                    return true
                                } else {
                                    return false;
                                }
                            },
                            rotate: '45'
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
                    yAxis: [
                        {
                            type: 'value',
                            name: '措施井次(口)',
                            nameLocation:'middle',
                            nameGap:80,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                        {
                            type: 'value',
                            name: '注入量(m³)',
                            nameLocation:'middle',
                            nameGap:80,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                    ],
                    series: [],
                },
                //新井投注 折线图2
                newWellLineChart: {
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '新井投注 新井：' +(this.newWellCount ? this.newWellCount : 0) +'口 注入量：' +(this.newInjectionCount ? this.newInjectionCount : 0) +'m³',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#9A72FF', '#DA835E'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid:{
                        x: 120,
                        y: 50,
                        x2: 120,
                        y2: 100,
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:30,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        // name: '时间/日期',
                        // nameTextStyle: {
                        //     color: '#8FA4CC',
                        //     fontSize: 14,
                        // },
                        // nameGap: 30,
                        nameLocation: 'center',
                        type: 'category',
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                            fontSize: 14,
                            interval: function(index, val) {
                                if (val.substr(-2) == '01') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            // rotate: 20,
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
                    yAxis: [
                        {
                            type: 'value',
                            name: '措施井次(口)',
                            nameLocation:'middle',
                            nameGap:80,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                        {
                            type: 'value',
                            name: '注入量(m³)',
                            nameLocation:'middle',
                            nameGap:80,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                    ],
                    series: [],
                },
            };
        },
        mounted() {
            this.searchForm=this.$route.params;
            this.initData();
        },
        methods: {
            async initData() {
                this.getOldToInjectionChart();
                this.getNewToInjectionChart();
            },
            //获得老井转注的折线图
            getOldToInjectionChart() {
                let date=this.searchForm.selectDate[1];
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    oilFieldName: this.searchForm.oilFieldName,
                    year:date.split('-')[0],
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode:this.searchForm.planTypeCode,
                    rollForecastVersion:this.searchForm.rollForecastVersion
                };
                oldToInjectionChart(request).then((res) => {
                    if (res.data.code == 200) {
                        //图例数据
                        let legendData = [];
                        //数据数据
                        let seriesData = [];
                        //获得调数据
                        let chartDataS = res.data.data.chart.linearDataSets;
                        if (chartDataS != null) {
                            for (let i = 0; i < chartDataS.length; i++) {
                                legendData.push(chartDataS[i].label);
                                //调用生成相关折线图数据
                                seriesData.push(this.getLinearSeriesDoubleIndex(chartDataS[i]));
                            }
                        }
                        //图例数据
                        this.oldWellLineChart.legend.data = legendData;
                        this.oldWellLineChart.series = seriesData;
                        //井口次
                        this.oldWellCount = res.data.data.times;
                        //增油量
                        this.oldInjectionCount = res.data.data.injection;
                    }
                });
            },
            //获得新井转注数据
            getNewToInjectionChart() {
                let date=this.searchForm.selectDate[1];
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    oilFieldName: this.searchForm.oilFieldName,
                    year:date.split('-')[0],
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode:this.searchForm.planTypeCode,
                    rollForecastVersion:this.searchForm.rollForecastVersion
                };
                newToInjectionChart(request).then((res) => {
                    if (res.data.code == 200) {
                        //图例数据
                        let legendData = [];
                        //数据数据
                        let seriesData = [];

                        //获得调数据
                        let chartDataS = res.data.data.chart.linearDataSets;
                        if (chartDataS != null) {
                            for (let i = 0; i < chartDataS.length; i++) {
                                legendData.push(chartDataS[i].label);
                                //调用生成相关折线图数据
                                seriesData.push(this.getLinearSeriesDoubleIndex(chartDataS[i]));
                            }
                        }
                        //图例数据
                        this.newWellLineChart.legend.data = legendData;
                        this.newWellLineChart.series = seriesData;

                        //井口次
                        this.newWellCount = res.data.data.times;
                        //增油量
                        this.newInjectionCount = res.data.data.injection;
                    }
                });
            },
            //特殊双y轴特例拼写 series
            getLinearSeriesDoubleIndex(linearChart) {
                let series = {};
                series.name = linearChart.label;
                series.type = 'line';
                series.symbol = 'none';
                let name = linearChart.label;
                if (name == '实际措施井次') {
                    series.yAxisIndex = 0;
                } else if (name == '计划措施井次') {
                    series.yAxisIndex = 0;
                } else if (name == '实际日注入量') {
                    series.yAxisIndex = 1;
                } else if (name == '计划注入量') {
                    series.yAxisIndex = 1;
                } else if (name == '滚动预测') {
                    series.yAxisIndex = 1;
                }
                let seriesData = [];
                let linearData = linearChart.linearData;
                for (let i = 0; i < linearData.length; i++) {
                    let point = [];
                    point.push(linearData[i].label);
                    point.push(linearData[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //返回
            switchToBack() {
                this.$router.go(-1);
            },
            //下载echarts
            downEchart(type) {
                if(type==1){
                    let fileName='老井转注 井次：' +(this.oldWellCount ? this.oldWellCount : 0) +'口 注入量：' +(this.oldInjectionCount ? this.oldInjectionCount : 0) + 'm³';
                    this.$refs.echartChart1.chartDownLoad(fileName);
                }else{
                    let fileName='新井投注 新井：' +(this.newWellCount ? this.newWellCount : 0) +'口 注入量：' +(this.newInjectionCount ? this.newInjectionCount : 0) +'m³';
                    this.$refs.echartChart2.chartDownLoad(fileName);
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width:100%;
        height: calc(100% - 42px);
        
        .rowBox {
            display: flex;
            align-items: center;
            .row {
                flex: 1;
                width:0;
            }
        }
    }
</style>
