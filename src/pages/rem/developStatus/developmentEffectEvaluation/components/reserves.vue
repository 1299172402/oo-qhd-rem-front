<!--储量类 -->
<template>
    <div class="z-main">
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <!-- <pagePanel headerTitle="剩余储采比" style="height: 380px;margin-top:0;" show-btn></pagePanel> -->
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="剩余储采比" isShowMaxBtn>
                    <Echart :chart-data="reserveProductionRatio" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="水驱动用程度" isShowMaxBtn>
                    <Echart :chart-data="degreeOfWaterDrive" style="height: 100%"></Echart>
                </info-window>
            </div>
        </div>
        <div class="rowBox" style="margin-top:20px;">
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="水驱控制程度" isShowMaxBtn>
                    <Echart :chart-data="waterDriveControlDegree" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;"></div>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import Echart from "@/components/tools/Echarts/index.vue";
    import { fetchOilFields, fetchFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { reservoirsUseDegreeChart, reservoirsControlDegreeChart,   reservoirsProRateChart,   waterDriveUseDegreeChart,   waterControlDegreeChart,} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    export default {     
        components: {
            Echart
        },
        props: {
            selectOilField: {
                type: String,
                default: "",
            },
            selectBlock: {
                type: String,
                default:"",
            },
        },
        data() {
            return {
                //查询参数
                queryParams: {},
                page: 1,
                pageSize: 10,
                //储量动用程度
                reserveUtilization: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "储量动用程度",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        name: "时间",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "动用程度/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 30,
                        type: "value",
                        max: 120,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "bar",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#00D9EA",
                            },
                            {
                                offset: 1,
                                color: "#0F65EA",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //储量控制程度
                degreeOfReserveControl: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "储量控制程度",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        name: "时间",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "控制程度/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 30,
                        type: "value",
                        max: 120,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "bar",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#00D9EA",
                            },
                            {
                                offset: 1,
                                color: "#0F65EA",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //剩余储采比
                reserveProductionRatio: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "剩余储采比",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        type: "value",
                        name: "可采储量采出程度/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap:34,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "剩余可采储量储采比/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 45,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "scatter",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                    }],
                },
                //水驱动用程度
                degreeOfWaterDrive: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "水驱动用程度",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        name: "时间",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "动用程度/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 30,
                        type: "value",
                        max: 100,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "bar",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#00D9EA",
                            },
                            {
                                offset: 1,
                                color: "#0F65EA",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //水驱控制程度
                waterDriveControlDegree: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "水驱控制程度",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        name: "时间",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "控制程度/%",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 30,
                        type: "value",
                        max: 100,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "bar",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#00D9EA",
                            },
                            {
                                offset: 1,
                                color: "#0F65EA",
                            },
                            ]),
                        },
                    },
                    ],
                },
                canDownload: false,
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async initData() {
                this.canDownload = this.$route.params.canDownload;
                this.downPower(this.canDownload);
                this.doSearch();
            },
            //搜索方法
            doSearch() {
                this.getReservoirsProRateChart(this.selectOilField, this.selectBlock);
                this.getWaterControlDegreeChart(this.selectOilField, this.selectBlock);
                this.getWaterDriveUseDegreeChart(this.selectOilField, this.selectBlock);
            },
            //储采比
            getReservoirsProRateChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                reservoirsProRateChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        // let seriesData = [];
                        // let lineData = res.data.data.chart.lineChartDataSets[0].numberPoints;
                        // lineData.forEach((item, index) =>{
                        //     let point = [];
                        //     point.push(item.x);
                        //     point.push(item.y);
                        //     seriesData.push(point);
                        // });
                        // this.reserveProductionRatio.series[0].data = seriesData;
                        let seriesData = [];
                        let lineData = res.data.data.chart.lineChartDataSets;
                        lineData.forEach((item, index) => {
                            seriesData.push(this.outputDegreeLine(item));
                        });
                        this.reserveProductionRatio.series = seriesData;
                        
                    }
                });
            },
            //储采比折线解析
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
            //水驱动用程度
            getWaterControlDegreeChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                waterControlDegreeChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let barData = res.data.data.chart.barDataSets[0].barDatas;
                        barData.forEach((item, index) =>{
                            let point = [];
                            let label = item.label.split("-");
                            point.push(label[0]);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.waterDriveControlDegree.series[0].data = seriesData;
                    }
                });
            },
            //水驱动用程度
            getWaterDriveUseDegreeChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                waterDriveUseDegreeChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let barData = res.data.data.chart.barDataSets[0].barDatas;
                        barData.forEach((item, index) =>{
                            let point = [];
                            let label = item.label.split("-");
                            point.push(label[0]);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.degreeOfWaterDrive.series[0].data = seriesData;
                    }
                });
            },
            //储量动用程度
            getReservoirsUseDegreeChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                reservoirsUseDegreeChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        //let barChart=res.data.data.chart.barDataSets;
                        let barData = res.data.data.chart.barDataSets[0].barDatas;
                        barData.forEach((item, index) =>{
                            let point = [];
                            let label = item.label.split("-");
                            point.push(label[0]);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.reserveUtilization.series[0].data = seriesData;
                    }
                });
            },
            //储量控制程度
            getReservoirsControlDegreeChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                reservoirsControlDegreeChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        //let barChart=res.data.data.chart.barDataSets;
                        let barData = res.data.data.chart.barDataSets[0].barDatas;
                        barData.forEach((item, index) =>{
                            let point = [];
                            let label = item.label.split("-");
                            point.push(label[0]);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.degreeOfReserveControl.series[0].data = seriesData;
                    }
                });
            },
            //下载echarts 隐藏 显示
            downPower(flag) {
                this.reserveProductionRatio.toolbox.show = flag;
                this.degreeOfWaterDrive.toolbox.show = flag;
                this.waterDriveControlDegree.toolbox.show = flag;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .z-main {
        padding-top:8px;
        padding-bottom: 8px;
        .rowBox {
            padding-left:8px;
            display: flex;
            align-items: center;
            .row {
                flex: 1;
                width:0;
            }
        }
    }
</style>
