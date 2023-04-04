<template>
    <el-row class="mt-2" style="height: 100%;">
        <span>日期</span>
        <el-date-picker
            v-model="selectData"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
        ></el-date-picker>
        <Echarts ref="echartDown" :chart-data="option" :height="echartsHeight"></Echarts>
    </el-row>
</template>
<script>
    import Echarts from '@/components/tools/Echarts/index.vue';
    import { produceData } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
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
                echartsHeight: '600px',
                selectData: [],
                option: {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14
                        },
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '水井曲线对比分析图',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644'
                            }
                        }
                    },
                    grid: [{ left: '14%', top: '8%', width: '74%', height: '42%' }, { left: '14%', top: '52%', width: '74%', height: '42%' }],
                    xAxis: [
                        {
                            gridIndex: 0,
                            type: 'category',
                            data: ['2018-01', '2018-04', '2018-06', '2018-10', '2019-01', '2019-04', '2019-06', '2019-10', '2020-01', '2020-04', '2020-06', '2020-10'],
                            textStyle: {
                                fontSize: 14
                            },
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: 'rgba(255,255,255,.16)'
                                }
                            }
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            data: ['2018-01', '2018-04', '2018-06', '2018-10', '2019-01', '2019-04', '2019-06', '2019-10', '2020-01', '2020-04', '2020-06', '2020-10'],
                            textStyle: {
                                fontSize: 14
                            },
                            axisLabel: {
                                //show: false,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    //color: '#979797'
                                    color: 'rgba(255,255,255,.16)'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: '注\n入\n时\n间\n︵\nh\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            max: 24,
                            min: 0,
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                //show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 0,
                            name: '井\n口\n压\n力\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            position: 'right',
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 0,
                            name: '套\n压\n︵\nM\nP\na\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            position: 'right',
                            offset: 80,
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                //   show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 1,
                            name: '水\n聚\n总\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameGap: 50,
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 1,
                            name: '日\n配\n注\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            position: 'left',
                            offset: 80,
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 1,
                            name: '日\n注\n聚\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            position: 'right',
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                //  show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 1,
                            name: '日\n注\n水\n量\n︵\nm³\n︶',
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameGap: 50,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            position: 'right',
                            offset: 80,
                            // scale: true,
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC'
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: []
                }
            };
        },
        mounted() {
            let year = new Date().getFullYear();
            this.selectData = [new Date(year + '-01-01').format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            let heightP1 = this.$refs.zmain.$el.clientHeight;
            this.$nextTick(() => {
                this.echartsHeight = heightP1 - 40 + 'px';
            });
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
                    wellId: this.wellId
                };
                produceData(request).then((res) => {
                    let seriesData = [];
                    let legendData = [];
                    //获取x轴数据信息
                    let xSet = new Set();
                    if (res.data.code == 0) {
                        let chartDataS = res.data.data.charts;
                        for (let i = 0; i < chartDataS.length; i++) {
                            if (chartDataS[i].linearDataSets == null || chartDataS[i].linearDataSets == undefined) {
                                continue;
                            }
                            let chartData = chartDataS[i].linearDataSets[0];
                            let chartDatalabel = chartData.label;
                            let series = {};
                            let lineName = chartData.label;
                            series.type = 'line';
                            series.name = lineName;
                            legendData.push(series.name);
                            //数据所属图像
                            if (chartDatalabel == '套压') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 2;
                                series.color = '#ba55d3';
                            } else if (chartDatalabel == '日注水量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                                series.color = '#8bc813';
                            } else if (chartDatalabel == '井口压力') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 1;
                                series.color = '#c8b71a';
                            } else if (chartDatalabel == '注入时间') {
                                series.xAxisIndex = 0;
                                series.yAxisIndex = 0;
                                series.color = '#ff631f';
                            } else if (chartDatalabel == '日配注量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 3;
                                series.color = '#be5028';
                            } else if (chartDatalabel == '水聚总量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 3;
                                series.color = '#00ffff';
                            } else if (chartDatalabel == '日注聚量') {
                                series.xAxisIndex = 1;
                                series.yAxisIndex = 5;
                                series.color = '#8b4513';
                            } else {
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
                    }
                    let xData = Array.from(xSet).sort();
                    this.option.xAxis[0].data = xData;
                    this.option.xAxis[1].data = xData;
                    this.option.series = seriesData;
                });
            },
            //干线压力
            getArterialPressureLine(linearChart) {
                let xData = [];
                let yData = [];
                let lineData = linearChart.linearData;
                lineData.forEach((item, index) => {
                    xData.push(item.label);
                    yData.push(item.value);
                });
                this.option.xAxis[0].data = xData;
                this.option.series[0].data = yData;
                this.option.series[0].name = '泵出口压力';
            },
            //套压
            getCasingPressureLine(linearChart) {
                let xData = [];
                let yData = [];
                let lineData = linearChart.linearData;
                lineData.forEach((item, index) => {
                    xData.push(item.label);
                    yData.push(item.value);
                });
                this.option.xAxis[1].data = xData;
                this.option.series[1].data = yData;
                this.option.series[1].name = '套压';
            },
            //油压
            getOilPressureLine(linearChart) {
                let xData = [];
                let yData = [];
                let lineData = linearChart.linearData;
                lineData.forEach((item, index) => {
                    xData.push(item.label);
                    yData.push(item.value);
                });
                this.option.xAxis[2].data = xData;
                this.option.series[2].data = yData;
                this.option.series[2].name = '油压';
            },
            //日注入量
            getInjectionRateLine(linearChart) {
                let xData = [];
                let yData = [];
                let lineData = linearChart.linearData;
                lineData.forEach((item, index) => {
                    xData.push(item.label);
                    yData.push(item.value);
                });
                this.option.xAxis[3].data = xData;
                this.option.series[3].data = yData;
                this.option.series[3].name = '日注入量';
            },

            /*getLinearCharts(linearChart) {
          let series = {};
          let lineName = linearChart.label;
          series.type = 'line';
          //数据所属图像
          if (lineName == '注水量') {
            series.xAxisIndex = 4;
            series.yAxisIndex = 4;
          } else if (lineName == '配注量') {
            series.xAxisIndex = 3;
            series.yAxisIndex = 3;
          } else if (lineName == '套压') {
            series.xAxisIndex = 2;
            series.yAxisIndex = 2;
          } else if (lineName == '注水压力') {
            series.xAxisIndex = 1;
            series.yAxisIndex = 1;
          } else if (lineName == '地层破裂压力') {
            series.xAxisIndex = 0;
            series.yAxisIndex = 0;
          }
          //折线数据
          let lineData = linearChart.linearData;
          let seriesData=[];
          for (let i = 0; i < lineData.length; i++) {
            let point=[];
            point.push(lineData[i].label);
            point.push(lineData[i].value);
            seriesData.push(point);
          }
          series.data=seriesData;
          return series;
        }*/
            //下载echarts
            doDownLoad() {
                let res = this.$refs['echartDown'].chart.getDataURL({
                    type: 'png',
                    pixelRatio: 14,
                    backgroundColor: '#022644'
                });
                let fileName = '生产数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                FileSaver.saveAs(res, fileName);
            }
        }
    };
</script>
