<template>
    <div class="app-container" style="width:100%;height:100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="问题井统计"
            :is-show-max-btn="true"
        >
            <button class="detailLinkBtn" @click="linkroute('problemWellStatistics')">详细</button>
            <el-button size="mini" type="primary" style="position: absolute;right:0px;z-index:20" @click="downEcharts">下载</el-button>
            <Echart ref="echartChart" :chart-data="histogram" width="100%" height="100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {queryProblemWellStatis} from "@/api/rem/reservoirbillboards";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
//前端细节区分
var tip = {
    tofiexd: 2, //y轴刻度保留2位数小数
    unit: "%", //y轴刻度单位
};
var type = "line_auto_up_down";
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            currentModel: this.$store.state.setting.mode,
            histogram: {
                color: [
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#35caff",
                        },
                        {
                            offset: 1,
                            color: "#1988fd",
                        },
                    ]),
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#00f2c4",
                        },
                        {
                            offset: 1,
                            color: "#00c086",
                        },
                    ]),
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#ff863e",
                        },
                        {
                            offset: 1,
                            color: "#ffba52",
                        },
                    ])],
                title: {
                    text: "",
                    bottom: 10,
                    left: "center",
                    textStyle: {
                        fontSize: 16,
                    },
                },
                tooltip: {
                    trigger: "item",
                    formatter: " 问题井统计 <br/>{b} : {c}口 <br/> 占比 : {d}% ",
                },
                series: [
                    {
                        type: "pie",
                        radius: ["30%", "48%"],
                        center: ["50%", "50%"],
                        label: {
                            formatter: function (e) {
                                let {
                                    data: {value, name, percent},
                                } = e;
                                return `{x|}{a|${name}}\n{b|${value}口}`;
                            },
                            minMargin: 5,
                            lineHeight: 15,
                            rich: {
                                x: {width: 10, height: 10, backgroundColor: 'inherit', borderRadius: 0},
                                a: {fontSize: 14, color: '#989898', padding: [0, 0, 0, 2]},
                                b: {fontSize: 12, align: 'left', color: '#989898', padding: [8, 0, 0, 18]},
                                c: {fontSize: 12, align: 'left', color: '#666666', padding: [8, 0, 0, 8]},
                            },
                        },
                        data: [
                            {
                                value: "",
                                name: "",
                            },
                            {
                                value: "",
                                name: "",
                            },
                            {
                                value: "",
                                name: "",
                            },
                        ],
                    },
                ],
            }
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname});
        },
        downEcharts(){
            this.$refs.echartChart.chartDownLoad( '问题井统计'); 
        },
        getData() {
            queryProblemWellStatis({
                date: new Date().format('YYYY-MM-DD'),
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
            }).then(res => {
                this.histogram.series[0].data[0].value = res.data.data[0].value
                this.histogram.series[0].data[0].name = res.data.data[0].name
                this.histogram.series[0].data[1].value = res.data.data[1].value
                this.histogram.series[0].data[1].name = res.data.data[1].name
                this.histogram.series[0].data[2].value = res.data.data[2].value
                this.histogram.series[0].data[2].name = res.data.data[2].name
            })
        }
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

.detailLinkBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>
