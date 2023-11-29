<template>
    <div class="app-container" id="overviewIndicators" style="height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="秦皇岛32-6油田生产指标总览"
            :is-show-max-btn="true"
        >
            <el-button type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute('IndexHome')">详情</el-button>
            <el-button type="primary" class="buttonActive_primary detailLinkBtn"  style="right:110px"  @click="downlist">下载</el-button>
            <el-row :gutter="20" style="margin-top: 20px;padding: 0 20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield water">
                            <div class="box">
                                <div>{{ oil1 }}</div>
                                <div>(m³)</div>
                            </div>
                        </div>
                        <div class="text">日产油</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield gas">
                            <div class="box">
                                <div>{{Number(oil1two).toFixed(4)}}</div>
                                <div>(10⁴m³)</div>
                            </div>
                        </div>
                        <div class="text">年产油</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield oil">
                            <div class="box">
                                <div>{{ totalOilProduction === null ||totalOilProduction ===undefined ?
                                    Number(0).toFixed(4):
                                    Number(totalOilProduction).toFixed(4) }}</div>
                                <div>(10⁴m³)</div>
                            </div>
                        </div>
                        <div class="text">总累产油</div>
                    </div>
                </el-col>
              
            </el-row>
            <el-row :gutter="20" style="padding: 0 20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(value2, '(%)', 'rgb(59,197,197)',$store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(59,197,197)')"
                        ></Echart>
                        <div class="chartText">生产时率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(value1, '(%)', 'rgb(13,190,124)', $store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(13,190,124)')"
                        ></Echart>
                        <div class="chartText">油井利用率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(value3, '(%)', 'rgb(247,181,0)', $store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(247,181,0)')"></Echart>
                        <div class="chartText">综合时率</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding: 0 20px;">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(mainList[0], '(%)', 'rgb(0, 220, 187)', $store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(0, 220, 187)')"
                        ></Echart>
                        <div class="chartText">自然递减率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(mainList[1], '(%)', 'rgb(0, 150, 215)', $store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(0, 150, 215)')"
                        ></Echart>
                        <div class="chartText">综合递减率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(mainList[2], '(%)', 'rgb(209, 74, 202)',$store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(209, 74, 202)')"
                        ></Echart>
                        <div class="chartText">总递减率</div>
                    </div>
                </el-col>
             
            </el-row>
            <el-row :gutter="20" style="padding: 0 20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(dataList.waterInjectionWellInjection, '(%)', 'rgb(0, 150, 215)',$store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(0, 150, 215)')"
                        ></Echart>
                        <div class="chartText" style="margin-top: 10px">分注井分注率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(infolist, '(%)', 'rgb(227, 123, 93)', $store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(227, 123, 93)')"
                        ></Echart>
                        <div class="chartText" style="margin-top: 10px">层段合格率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(dataList.waterCutIncreaseRate, '(%)', 'rgb(167, 228, 77)',$store.state.setting.mode === 'dark' ?'rgb(1,67,78)':'rgb(255, 255, 255)', 'rgb(66, 144, 34)')"
                        ></Echart>
                        <div class="chartText" style="margin-top: 10px">含水上升率</div>
                    </div>
                </el-col>
            </el-row>
        </info-window>
    </div>
</template>
<script>
import {devPhaseInfos} from "@/api/rem/oilfieldmanageplan.js"
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {productionMetricsOverview,getYieldTracking} from "@/api/rem/reservoirbillboards";
import {dividingLayerQualityRate} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import {getProductionIndex} from "@/api/monthlyReportManagement.js";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
import html2canvas from "html2canvas";
let value = 0;
let name = "";
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    mounted() {
        this.histogram.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.histogram2.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.histogram3.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.getData();
        this.getinfo();
        this.getList();
    },
    computed: {
        getGlobeTheme() {
            return this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        }
    },
    watch: {
        getGlobeTheme: {
            handler(val) {
                this.histogram.series[1].splitLine.lineStyle.color = val
                this.histogram2.series[1].splitLine.lineStyle.color = val
                this.histogram3.series[1].splitLine.lineStyle.color = val
            }
        }
    },
    data() {
        return {
            totalOilProduction:0.0000,
            value1:0,
            value2:0,
            value3:0,
            dataList:'',
            oil1two:'',
            oil1:'',
            mainList:[0,0,0],
            infolist:0, //层段合格率
            histogram: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#29EEF3",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
            histogram2: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#29EEF3",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
            histogram3: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#29EEF3",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
        };
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname,query: {link:'remHome'}});
        },
        downlist(){
                const screenEl = document.getElementById('overviewIndicators');
                if(this.$store.state.setting.mode === 'dark'){
                    screenEl.classList.add('dark-mode');
                }
                this.$nextTick(()=>{
                    html2canvas(screenEl, {
                        useCORS: true,
                        dpi:150,
                        scale:2,
                        height: screenEl.scrollHeight,
                        windowHeight: screenEl.scrollHeight,
                    }).then((canvas) => {
                        canvas.toBlob(blob => {
                            const href = window.URL.createObjectURL(new Blob([blob]))
                            const link = document.createElement('a')
                            link.href = href
                            link.download =  '秦皇岛32-6油田生产指标总览.png'
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        }, 'image/png')
                        if(this.$store.state.setting.mode === 'dark'){
                            screenEl.classList.remove('dark-mode');
                        }
                    })
                })
        },
        getData(){
            // new Date().format('YYYY-MM')
            productionMetricsOverview( { ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",date:'2022-12' + '-01'}).then(res=>{
                this.dataList = res.data.data
                // this.dataList.cumeOilProd = '4493.00'
                // if(!res.data.data.naturalDecline)  res.data.data.naturalDecline = 0
                this.mainList[0]= res.data.data.naturalDecline
                this.mainList[1]= res.data.data.overallDecline
                this.mainList[2]= res.data.data.wholeDeclineRate
                // this.histogram.series[0].data[0].value = res.data.data.naturalDecline
                // this.histogram.series[0].data[1].value = 100 - res.data.data.naturalDecline
                // this.histogram.title.text = "{a|" + res.data.data.naturalDecline + "%}{c|\n" +   "}"
                // if(!res.data.data.overallDecline)  res.data.data.overallDecline = 0
                // this.histogram2.series[0].data[0].value = res.data.data.overallDecline
                // this.histogram2.series[0].data[1].value = 100 - res.data.data.overallDecline
                // this.histogram2.title.text = "{a|" + res.data.data.overallDecline + "%}{c|\n" +   "}"
                // if(!res.data.data.wholeDeclineRate)  res.data.data.wholeDeclineRate = 0
                // this.histogram3.series[0].data[0].value = res.data.data.wholeDeclineRate
                // this.histogram3.series[0].data[1].value = 100 - res.data.data.wholeDeclineRate
                // this.histogram3.title.text = "{a|" + res.data.data.wholeDeclineRate + "%}{c|\n" +   "}"
            })
            getYieldTracking({ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A"}).then(res=>{
                this.oil1two = res.data.data.annualOilProduction,
                this.oil1 =res.data.data.dayOilProduction
            })

            devPhaseInfos({
                fieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
                oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
                type: "1"
            }).then(res=>{
                let devPhaseInfos =res.data.data.devPhaseInfos;
                let sum = 0.0;
                for (let i = 0; i < devPhaseInfos.length; i++) {
                    sum += devPhaseInfos[i].oilSum;
                }
                this.totalOilProduction= sum;
            })
        },
        getList(){
            let date = new Date().format('yyyy-MM-dd')
            let data = {
                endDate:date,
                oilFieldId:"3FC9A818F5BC43B88270DB80BBB3018F",
                year:date,
                platFormId:''
            }
            dividingLayerQualityRate(data).then((res)=>{
                this.infolist = res?.data.data.indicatorContent.detail
                
            })
        },
        getinfo() {
            const currentDate = new Date(); // 获取当前日期
            const currentYear = currentDate.getFullYear(); // 获取当前年份
            const currentMonth = currentDate.getMonth(); // 获取当前月份（注意：月份从0开始，0代表一月，11代表十二月）
            let previousMonth, previousYear;
            if (currentMonth === 0) { // 如果当前月份是一月（0月），则上一个月是去年的十二月（11月）
                previousMonth = 11;
                previousYear = currentYear - 1;
            } else {
                previousMonth = currentMonth - 1;
                previousYear = currentYear;
            }
            const formattedPreviousMonth = (previousMonth + 1).toString().padStart(2, '0');

            const previousMonthDate = `${previousYear}-${formattedPreviousMonth}`;
            let param = {
                month: previousMonthDate,
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
            };
            getProductionIndex(param).then((res) => {
                let wellCountAll = 0,monthProdDurationCountAll = 0,monthProdDduration=0,monthProdDurationCount=0
                res.data.data.forEach(item=>{
                    wellCountAll += item.wellCount
                    monthProdDurationCountAll += item.wellOpenCount
                    monthProdDduration += item.monthProdDduration
                    monthProdDurationCount += item.monthProdDurationCount
                })
                this.value1 = ((monthProdDurationCountAll/wellCountAll * 100)).toFixed(2);
                this.value2 = ((monthProdDduration/monthProdDurationCount/res.data.data[0].days/24)*100).toFixed(2)
                this.value3 = ((this.value1*this.value2)/100).toFixed(2)
            });
        },
        
        //图表
        getEchartData(value, unit, valueColor, backColor, centerColor) {
            var option = {
                series: [
                    {
                        type: "pie",
                        hoverAnimation: false, // 关闭鼠标经过时的动画
                        // selectedMode: "single",
                        radius: [0, "75%"],
                        color: centerColor,
                        label: {
                            fontSize: 16,
                            position: 'outside', // 将位置设置为 'outside'
                        },
                        animation: false,   //去掉动画效果
                        silent: true,    //不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
                        data: [
                            {value: 0, name: value, label: {color: "white", position: "center"}},
                            {value: 1, name: unit, label: {color: "white", position: "inner"}},
                        ],
                    },
                    {
                        type: "pie",
                        hoverAnimation: false, // 关闭鼠标经过时的动画
                        color: [valueColor, backColor],
                        radius: ["95%", "85%"],
                        labelLine: {
                            length: 30,
                        },
                        label: {
                            show: false,
                        },
                        data: [
                            {value: value, name: "Direct"},
                            {value: 100 - Number(value),},
                        ],
                    },
                ],
            };
            return option;
            // option && myChart.setOption(option);
        },

        //图表
        getEchart(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: "pie",
                        // selectedMode: "single",
                        radius: [0, "75%"],
                        color: centerColor,
                        label: {
                            fontSize: 16,
                        },
                        data: [
                            {value: 0, name: value, label: {color:'#29EEF3', position: "center"}},
                            {value: 1, name: unit, label: {color:'#29EEF3', position: "inner"}},
                        ],
                    },
                    {
                        type: "pie",
                        color: [valueColor, backColor, "transparent"],
                        radius: ["95%", "85%"],
                        startAngle: 180,
                        labelLine: {
                            length: 30,
                        },
                        label: {
                            show: false,
                        },
                        data: [
                            {value: value, name: "Others"},
                            {value: 100 - value, name: "Direct"},
                            {value: 100, name: "528"},
                        ],
                    },
                ],
            };
            return option;

            // option && myChart.setOption(option);
        },
    },
};
</script>
<style lang="scss" scoped>
// .f1 {
//   margin: 10px;
// }
.cont {
    & > div {
        margin-top: 20px;
    }
}

.m1 {
    margin-top: 10px;
}

.f1 {
    margin-left: 10px;
}
</style>
<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
    padding: 10px 5px;
    border-radius: 4px 4px 4px 4px;
    width: 100%;
    background: rgba(143, 164, 204, 0.3);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
}

.condationRow {
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
    font-size: 14px;
}

.checkBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #387dff;
}

.about1 {
    background: #103986;
    background: rgb(2, 43, 117);
}

.about {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #103986;
    background: rgba(56, 125, 255, 0.5);
}

.noCheckBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: rgba(143, 164, 204, 0.3);
}

::v-deep .editInput {
    width: 100%;
}

::v-deep .title_1 {
    display: inline-block;
    text-align: center;
}

::v-deep .checkButton {
    width: 100%;
    margin-top: 5px;
}

::v-deep .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 0px 0px 0;
    font-size: 14px;
}

::v-deep .cardLeft {
    height: 40px;
    width: 100%;
}

.el-card {
    border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
    color: #00d6ea;
    font-weight: bold;
    background: rgba(143, 164, 204, 0.16);

    ::v-deep .el-card__body {
        padding: 0;
        line-height: 40px;
        text-align: center;
    }
}

::v-deep .screenBtn {
    height: 30px;
    margin-left: 10px;
}

::v-deep .el-radio-group .el-radio-button {
    width: 100%;
    border: none;
}

//选中颜色
::v-deep .test .el-radio-group .el-radio-button.is-active {
    width: 100%;
    background: #387dff;
}

.my-5 {
    & > *:not(span) {
        margin-right: 10px;
    }

    & > span {
        margin-right: 4px;
    }
}

::v-deep .el-table thead.is-group th {
    background: transparent;
}

.yield {
    height: 111px;
    border: 1px solid rgb(32, 112, 224);
    border-radius: 5px;
    text-align: center;

    .box {
        margin-top: 40px;
    }
}

.water {
    background-color: rgb(36, 176, 239);
}

.oil {
    background-color: rgb(25, 120, 227);
}

.gas {
    background-color: rgb(148, 56, 244);
}

.liquid {
    background-color: rgb(24, 121, 228);
}

.text {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}
.dark-mode {
    background-color: #02213a;
}
.chart {
    // margin-top: 10px;
    height: 120px !important;
    border-radius: 5px;
    text-align: center;
    line-height: 120px;
}

.chartText {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.detailLinkBtn {
    position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 22px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
