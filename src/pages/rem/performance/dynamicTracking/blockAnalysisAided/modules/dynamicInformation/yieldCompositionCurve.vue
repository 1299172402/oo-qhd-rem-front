<!--产量构成曲线-->
<template>
    <div class="z-main">
        <div class="row1">
            <div class="flex-1" style="margin-right:20px;">
                <pagePanel style="height:330px;margin-top:0;" headerTitle="产量构成曲线" show-btn>
                    <Echart ref="echartDown1" :chart-data="option" height="100%"></Echart>
                </pagePanel>
            </div>
            <div class="flex-1">
                <pagePanel style="height:330px;margin-top:0;" headerTitle="措施产量构成曲线" show-btn>
                    <Echart ref="echartDown2" :chart-data="option1" height="100%"></Echart>
                </pagePanel>
            </div>
        </div>
        <div class="row2">
            <div class="flex-1" style="margin-right:20px;">
                <pagePanel style="height:100%;margin-top:0;" headerTitle="产量构成表" show-btn>
                    <el-table id="tableData1" highlight :data="tableDataStruct" height="100%">
                        <el-table-column type="index" label="序号" align="center"></el-table-column>
                        <el-table-column prop="theDate" label="时间" align="center"></el-table-column>
                        <el-table-column prop="baseOutput" :label="`基础产量\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="adjustWells" :label="`调整井\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="newWells" :label="`开发新井\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="measureOutput" :label="`措施产量\n (m³)`" align="center"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
            <div class="flex-1">
                <pagePanel style="height:100%;margin-top:0;" headerTitle="措施产量构成表" show-btn>
                    <el-table id="tableData2" highlight :data="tableDataProduct" height="100%">
                        <el-table-column type="index" label="序号" align="center"></el-table-column>
                        <el-table-column prop="theDate" label="时间" align="center"></el-table-column>
                        <el-table-column prop="acidize" :label="`酸化\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="crushing" :label="`压裂\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="profile" :label="`调剖\n (m³)`" align="center"></el-table-column>
                        <el-table-column prop="sideTrack" :label="`侧钻\n (m³)`" align="center"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import Echart from '@/components/tools/Echarts/index.vue';
import { dynamicDataYieldComponentCurve } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
import { exportExcel } from '@/lib/exportExcel.js';
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
            radio: 1,
            option: {
                grid: [{ x: '5%', y: '20%', width: '90%', height: '65%', containLabel: true }],
                legend: {
                    x:'center',
                    bottom:0,
                    textStyle: {
                        color: '#24DEFF',
                    },
                    data: ['基础产量', '调整井', '开发新井', '措施增产量']
                },
                tooltip: {
                    show:true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: '时间',
                    nameLocation: 'center',
                    nameTextStyle: { color: '#8FA4CC' },
                    nameGap: 25,
                    axisLabel: {
                        color: '#8FA4CC'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color:'#8FA4CC'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color:'#8FA4CC',
                        }
                    }
                },
                yAxis: {
                    splitNumber: 6,
                    //min: 0,
                    name: '产量 (m³)',
                    nameLocation: 'center',
                    nameTextStyle: { color: '#8FA4CC' },
                    nameGap:50,
                    type: 'value',
                    axisLabel: {
                        color: '#8FA4CC'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color:'#8FA4CC'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color:'#8FA4CC'
                        }
                    }
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(60,179,113,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(60,179,113,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(60,179,113,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: '#3CB371',
                        name: '基础产量',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(194,56,188,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(194,56,188,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(194,56,188,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: '#c238bc',
                        name: '调整井',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(255,0,0,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(255,0,0,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(255,0,0,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: 'red',
                        name: '开发新井',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(0,255,255,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,255,255,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(0,255,255,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: 'blue',
                        name: '措施增产量',
                        symbol: 'none'
                    }
                ]
            },
            option1: {
                grid: [{ x: '5%', y: '20%', width: '90%', height: '65%', containLabel: true }],
                legend: {
                    x:'center',
                    bottom:0,
                    textStyle: {
                        color: '#24DEFF'
                    },
                    data: ['酸化日增产油量', '压裂日增产油量', '调剖日增产油量', '侧钻日增产油量']
                },
                tooltip: {
                    show:true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: '时间',
                    nameLocation: 'center',
                    nameTextStyle: { color: '#8FA4CC' },
                    nameGap: 25,
                    axisLabel: {
                        color: '#8FA4CC'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color:'#8FA4CC'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color:'#8FA4CC'
                        }
                    }
                },
                yAxis: {
                    splitNumber: 6,
                    //min: 0,
                    name: '产量 (m³)',
                    nameLocation: 'center',
                    nameTextStyle: { color: '#8FA4CC' },
                    nameGap: 35,
                    type: 'value',
                    axisLabel: {
                        color: '#8FA4CC'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#979797'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#8FA4CC'
                        }
                    }
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(60,179,113,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(60,179,113,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(60,179,113,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: '#3CB371',
                        name: '酸化日增产油量',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(194,56,188,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(194,56,188,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(194,56,188,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: '#c238bc',
                        name: '压裂日增产油量',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(255,0,0,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(255,0,0,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(255,0,0,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: 'red',
                        name: '调剖日增产油量',
                        symbol: 'none'
                    },
                    {
                        data: [],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(0,255,255,.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,255,255,.1)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(0,255,255,.1)',
                                shadowBlur: 10
                            }
                        },
                        smooth: true,
                        color: 'blue',
                        name: '侧钻日增产油量',
                        symbol: 'none'
                    }
                ]
            },
            image: '',
            tableDataStruct: [],
            tableDataProduct: []
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            this.$emit('childPara', '');
            let request = {
                oilFieldId: this.oilFieldId,
                fieldId: this.blockId
                //layerId:this.selectPosition,
            };
            await dynamicDataYieldComponentCurve(request).then((res) => {
                if (res.data.code == 200) {
                    /*let imageData = res.data.data;
          this.image='data:;base64,'+imageData.outputCompositionChart;*/
                    let charts = res.data.data.charts;
                    this.dealChartsData(charts);
                    if (res.data.data.outputComposition) this.tableDataStruct = res.data.data.outputComposition;
                    else {
                        this.tableDataStruct = [];
                    }
                    if (res.data.data.measureOutputComposition) this.tableDataProduct = res.data.data.measureOutputComposition;
                    else this.tableDataProduct = [];
                } else {
                    this.tableDataStruct = [];
                    this.tableDataProduct = [];
                }
            });
        },
        dealChartsData(charts) {
            if (charts) {
                let xSet = new Set();
                charts.forEach((chart, index) => {
                    if (chart.linearDataSets && chart.linearDataSets[0]) {
                        let linear = chart.linearDataSets[0];
                        let labelName = linear.label;
                        let pointData = [];
                        let jtData = linear.linearData;
                        if (jtData) {
                            jtData.forEach((point, index2) => {
                                let pointXY = [];
                                pointXY.push(point.label);
                                xSet.add(point.label);
                                pointXY.push(point.value);
                                pointData.push(pointXY);
                            });
                        }
                        if (labelName == '基础产量') {
                            this.option.series[0].data = pointData;
                        } else if (labelName == '调整井') {
                            this.option.series[1].data = pointData;
                        } else if (labelName == '开发新井') {
                            this.option.series[2].data = pointData;
                        } else if (labelName == '措施产量') {
                            this.option.series[3].data = pointData;
                        } else if (labelName == '酸化日增产油量') {
                            this.option1.series[0].data = pointData;
                        } else if (labelName == '压裂日增产油量') {
                            this.option1.series[1].data = pointData;
                        } else if (labelName == '调剖日增产油量') {
                            this.option1.series[2].data = pointData;
                        } else if (labelName == '侧钻日增产油量') {
                            this.option1.series[3].data = pointData;
                        }
                    }
                });
            }
        },
        //下载echarts
        doDownLoad() {
            let res1 = this.$refs['echartDown1'].chart.getDataURL({
                type: 'png',
                pixelRatio: 14,
                backgroundColor: '#022644'
            });
            let res2 = this.$refs['echartDown2'].chart.getDataURL({
                type: 'png',
                pixelRatio: 14,
                backgroundColor: '#022644'
            });
            let fileName1 = '产量构成曲线';
            let fileName2 = '措施产量构成曲线';
            let fileName3 = '产量构成表';
            let fileName4 = '措施产量构成表';
            if (this.blockName) {
                fileName1 = this.blockName + fileName1;
                fileName2 = this.blockName + fileName2;
                fileName3 = this.blockName + fileName3;
                fileName4 = this.blockName + fileName4;
            }
            FileSaver.saveAs(res1, fileName1);
            FileSaver.saveAs(res2, fileName2);
            exportExcel('#tableData1', fileName3);
            exportExcel('#tableData2', fileName4);
        }
    }
};
</script>

<style scoped lang="scss">
    .z-main{
        height:calc(100% - 101px);
        display: flex;
        flex-direction: column;
        .row1{
            height:350px;
            display: flex;
            // align-items: center;
            .flex-1{
                width:0;
                flex:1;
            }
        }
        .row2{
            flex:1;
            height:0;
            display: flex;
            .flex-1{
                width:0;
                flex:1;
            }
        }
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
</style>
