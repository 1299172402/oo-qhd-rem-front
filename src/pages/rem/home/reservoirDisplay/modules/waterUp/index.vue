<template>
  <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";

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
                trigger: "axis",
                formatter: function (params, ticket, callback) {
                    var res = params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].seriesType === "line") {
                            res += "<br/>" + params[i].seriesName + " : " + (params[i].value ? params[i].value : "-") + "";
                        } else {
                            res += "<br/>" + params[i].seriesName + " : " + (params[i].value ? params[i].value : "-") + "";
                        }
                    }
                    return res;
                },
            },
            grid: {
                top: "10%",
                left: "5%",
                right: "5%",
                bottom: "8%",
                containLabel: true,
            },
            legend: {
                data: ["含水上升率", "油粘度CP-78", "油粘度CP-260"],
                bottom: "bottom",
                textStyle: {
                    color: "#a9a8a8",
                },
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#a9a8a8",
                        },
                    },
                    // data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
                    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                },
            ],
            yAxis: [
                {
                    name: "含水上升率(%)",
                    nameTextStyle: {
                        color: "#a9a8a8",
                        padding: [0, 0, 20, 0], // 上、右、下、左
                    },
                    type: "value",
                    nameLocation: "center",
                    position: "left",
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#a9a8a8",
                        },
                    },
                    axisLabel: {
                        formatter: "{value} ",
                        textStyle: {
                            color: "#a9a8a8",
                        },
                    },
                },
            ],
            series: [
                {
                    name: "油粘度CP-78",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    label: {
                        normal: {
                            show: false,
                            position: "top",
                        },
                    },
                    lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: "rgba(0,0,0,0.4)",
                            shadowBlur: 10,
                            shadowOffsetY: 10,
                        },
                    },
                    data: [10, 15, 20, 25, 30, 25, 20, 15, 10, 8, 6, 5, 3, 1],
                },
                {
                    name: "油粘度CP-260",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    label: {
                        normal: {
                            show: false,
                            position: "top",
                        },
                    },
                    lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: "rgba(0,0,0,0.4)",
                            shadowBlur: 10,
                            shadowOffsetY: 10,
                        },
                    },
                    markArea: {
                        silent: true,
                        color: "rgba(255, 250, 205, 0.2)",
                        data: [
                            [
                                {
                                    xAxis: "93",
                                },
                                {
                                    xAxis: "130",
                                },
                            ],
                            [
                                {
                                    xAxis: "0",
                                },
                                {
                                    xAxis: "19",
                                },
                            ],
                            [
                                {
                                    xAxis: "148",
                                },
                                {
                                    xAxis: "200",
                                },
                            ],
                        ],
                    },
                    data: [2, 4, 5, 6, 7, 9, 12, 13, 14, 15, 13, 11],
                },
                {
                    name: "含水上升率",
                    data: ["", "", "", "", "", 40, 34, 33, 32, 31, 29, 32, 31, 29],
                    type: "scatter",
                    symbol: "roundRect",
                    symbolSize: [10, 7],
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                            {
                                offset: 0,
                                color: "#7193D1",
                            },
                            {
                                offset: 1,
                                color: "#7193D1",
                            },
                        ]),
                    },
                },

            ],
        },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
