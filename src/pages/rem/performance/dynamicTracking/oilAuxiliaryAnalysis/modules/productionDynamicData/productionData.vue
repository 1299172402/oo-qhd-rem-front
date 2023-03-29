<!-- 生产数据 -->
<template>
    <div class="z-main">
        <div class="z-search">
            <span>日期：</span>
            <el-date-picker v-model="selectData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"/>
            <el-select v-model="selectValue" placeholder="请选择" @change="selectChange" style="margin-left:20px;">
                <el-option label="分配" value="分配"></el-option>
                <el-option label="计量" value="计量"></el-option>
            </el-select>
        </div> 
        <div class="z-echarts">
            <Echarts ref="echartDown" :chart-data="option" height="100%"></Echarts>
        </div>   
    </div>
</template>

<script>
    import Echarts from "@/components/rem/tools/Echarts/index.vue";
    import {produceData} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import FileSaver from 'file-saver';
    export default {
        components: {
            Echarts
        },
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        data() {
            return {
                selectData: [],
                selectValue:'分配',
                option: {
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
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    toolbox: {
                        show: true,
                        itemSize: 20,
                        feature: {
                            saveAsImage: {
                                name: '生产动态资料-生产数据曲线图',
                                pixelRatio: 15,
                                backgroundColor: '#022644',
                                iconStyle:{
                                    borderColor:'#979797',
                                },
                                emphasis:{
                                    iconStyle:{
                                        color:'rgba(0,0,0,0)'
                                    }, 
                                }
                            }
                        }
                    },
                    grid: [
                        {
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
                                lineStyle: {
                                    color: '#8FA4CC'
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
                                lineStyle: {
                                    color: "#8FA4CC",
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: "流\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#ff8e08',
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
                            name: "折\n算\n基\n准\n面\n流\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fe10f6',
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
                                show: false,
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
                            name: "油\n压\n︵\nM\nP\na\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#ccb71f',
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
                            name: "泵\n频\n率\n︵\nH\nz\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#0d66fd',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            // scale: true,
                            max: 50,
                            min: 0,
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
                            name: "含\n水\n︵\n%\n︶",
                            nameLocation: "center",
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#0206f7',
                                fontSize: 14,
                            },
                            // scale: true,
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
                            name: "气\n油\n比\n︵\n方\n/\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#9dce2f',
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            // scale: true,
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
                            name: "生\n产\n时\n间\n︵\nH\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color:'#fb6112',
                                fontSize: 14,
                            },
                            position: 'right',
                            // scale: true,
                            max: 24,
                            min: 0,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                //  show: false,
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
                            name: "井\n口\n温\n度\n︵\n℃\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#5a9df2',
                                fontSize: 14,
                            },
                            position: 'right',
                            offset: 80,
                            // scale: true,
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
                            name: "日\n产\n油\n︵\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color:'#018000',
                                fontSize: 14,
                            },
                            // scale: true,
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
                            name: "日\n产\n液\n︵\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color:'#f300f1',
                                fontSize: 14,
                            },
                            position: 'left',
                            offset: 80,
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
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
                            name: "日\n产\n气\n︵\n万\n方\n︶",
                            nameLocation: "center",
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color:'#f90d03',
                                fontSize: 14,
                            },
                            position: 'right',
                            // scale: true,
                            minInterval: 0.1,
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
                        /*{
                          gridIndex: 2,
                          name: "动\n液\n面\n︵\nm\n︶",
                          nameLocation: "center",
                          nameRotate: 0,
                          nameGap: 50,
                          nameTextStyle: {
                            color: "#fff",
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
        },
                          axisLine: {
                            //   show: false,
                            lineStyle: {
                              color: "#979797",
                            },
                          },
                          splitLine: {
                            show: false,
                          },
                        },*/
                    ],
                    series: []
                },
            }
        },
        mounted() {
            let year = new Date().getFullYear();
            this.selectData = [new Date(year + '-01-01').format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            this.doSearch();
        },
        methods: {
            //执行搜索
            doSearch() {
                let startDate = this.selectData[0];
                let endDate = this.selectData[1];
                let request = {
                    beginDate: startDate,
                    endDate: endDate,
                    ogfId: this.oilFeildId,
                    platformId: this.platformId,
                    wellId: this.wellId,
                };
                produceData(request).then((res) => {
                    let seriesData = [];
                    let legendData = [];
                    if (res.data.code == 200) {
                        let chartDataS = res.data.data.charts;
                        //获取x轴数据信息
                        let xSet = new Set();
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (!chartDataS[i].linearDataSets) {
                                continue;
                            }
                            let chartData = chartDataS[i].linearDataSets[0];
                            let chartDatalabel = chartData.label;
                            legendData.push(chartDatalabel);
                            let series = {};
                            let lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            if (lineName == '流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                                series.itemStyle={color:'#ff8e08'}
                            } else if (lineName == '油压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                                series.itemStyle={color:'#ccb71f'}
                            } else if (lineName == '泵频率') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 3;
                                series.itemStyle={color:'#0d66fd'}
                            } else if (lineName == '折算基准面流压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                                series.itemStyle={color:'#fe10f6'}
                            } else if (lineName == '含水') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 4;
                                series.itemStyle={color:'#0206f7'}
                            } else if (lineName == '井口温度') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 7;
                                series.itemStyle={color:'#5a9df2'}
                            } else if (lineName == '气油比') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                                series.itemStyle={color:'#9dce2f'}
                            } else if (lineName == '生产时间') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 6;
                                series.itemStyle={color:'#fb6112'}
                            } else  if (lineName == '日产液量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                                series.itemStyle={color:'#f300f1'}
                            } else if (lineName == '日产油量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                                series.itemStyle={color:'#018000'}
                            } else if (lineName == '日产气量') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 10;
                                series.itemStyle={color:'#f90d03'}
                            } else if (lineName == '日产油') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 8;
                                series.itemStyle={color:'#018000'}
                            } else if (lineName == '日产液') {
                                series.xAxisIndex = 2;
                                series.yAxisIndex = 9;
                                series.itemStyle={color:'#f300f1'}
                            } else  {
                                continue;
                            }
                            //折线数据
                            let lineData = chartData.linearData;
                            let pointData = [];
                            for (let i = 0; i < lineData.length; i++) {
                                let point = [];
                                point.push(lineData[i].label);
                                xSet.add(lineData[i].label);
                                point.push(lineData[i].value);
                                pointData.push(point);
                            }
                            series.data = pointData;
                            series.showSymbol = false;
                            seriesData.push(series);
                        }
                        let xData = Array.from(xSet).sort();
                        this.option.xAxis[0].data = xData;
                        this.option.xAxis[1].data = xData;
                        this.option.xAxis[2].data = xData;
                        this.option.series = seriesData;
                        console.log('生产数据echart配置',this.option)
                    }
                })
            },
            getLinearCharts(linearChart) {
                let series = {};
                let lineName = linearChart.label;
                series.type = 'line';
                series.name = lineName;
                //数据所属图像
                if (lineName == '动液面') {
                    series.xAxisIndex = 3;
                    series.yAxisIndex = 3;
                } else if (lineName == '含水') {
                    series.xAxisIndex = 2;
                    series.yAxisIndex = 2;
                } else if (lineName == '日产油') {
                    series.xAxisIndex = 1;
                    series.yAxisIndex = 1;
                } else if (lineName == '日产液') {
                    series.xAxisIndex = 0;
                    series.yAxisIndex = 0;
                }
                //折线数据
                let lineData = linearChart.linearData;
                let seriesData = [];
                for (let i = 0; i < lineData.length; i++) {
                    let point = [];
                    point.push(lineData[i].label);
                    point.push(lineData[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //分配，计量change
            selectChange(){},
            //下载echarts
            doDownLoad() {
                let res = this.$refs['echartDown'].chart.getDataURL({
                    type: 'png',
                    pixelRatio: 14,
                    backgroundColor: '#022644'
                })
                console.log(res,88);
                let fileName = '777生产数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                FileSaver.saveAs(res,fileName);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        padding-top:20px;
        display:flex;
        flex-direction: column;
        .z-search{
            height:60px;
        }
        .z-echarts{
            // background:#000;
            width: 100%;
            flex:1;
        }
    }
</style>