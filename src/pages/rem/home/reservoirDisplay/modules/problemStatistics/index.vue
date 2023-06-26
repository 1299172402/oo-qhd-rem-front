<template>
    <div class="app-container" style="width:100%;height:100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="问题井统计"
            :is-show-max-btn="true"
        >
            <button class="detailLinkBtn" @click="linkroute('oilAnalysisReport')">详细</button>
            <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
        </info-window>
        <!-- :style="{
              background: currentModel == 'dark' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
            }" -->
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
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                series: [
                    {
                        name: "问题井统计",
                        type: "pie",
                        radius: ["30%", "60%"],
                        center: ["50%", "50%"],
                        // roseType: "radius",
                        data: [
                            {
                                value: 0,
                                name: "出砂井",
                                label: {
                                    color: "#a9a8a8",
                                },
                                itemStyle: {
                                    color: "#0733F1",
                                    borderColor: "#0733F1",
                                    show: false,
                                },
                            },
                            {
                                value: 0,
                                name: "限液井",
                                label: {
                                    color: "#a9a8a8",
                                },
                                itemStyle: {
                                    color: "#00B0E3",
                                    borderColor: "#00B0E3",
                                },
                            },
                            {
                                value: 0,
                                name: "长停井",
                                label: {
                                    color: "#a9a8a8",
                                },
                                itemStyle: {
                                    color: "#3D61FF",
                                    borderColor: "#3D61FF",
                                },
                            },
                        ],
                        label: {
                            show: false,
                            normal: {
                                formatter: "{b}\n{c}口",
                                show: true,
                                position: "",
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname});
        },
        getData() {
            queryProblemWellStatis({date: new Date().format('YYYY-MM-DD')}).then(res => {
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
