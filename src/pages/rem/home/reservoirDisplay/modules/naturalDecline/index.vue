<template>
  <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
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
          data: ["自然递减率（正）", "自然递减率（负）"],
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
            data: ['2023-01','2023-02','2023-03','2023-04'],
          },
        ],
        yAxis: [
          {
            name: "地质储量采油速度(%)",
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
            name: "自然递减率（正）",
            type: "line",
            smooth: true,
            // symbol: "none",
            itemStyle: {
              borderWidth: "1px",
              color: "rgb(25,125,243)",
            },

            label: {
              normal: {
                show: false,
                position: "top",
              },
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10,
              },
            },
            data: [10, 15, 20, 25, 30, 25, 20, 15, 10, 8, 6, 5, 3, 1],
          },
          {
            name: "自然递减率（负）",
            type: "line",
            smooth: true,
            // symbol: "true",
            label: {
              normal: {
                show: false,
                position: "top",
              },
            },
            itemStyle: {
              borderWidth: "1px",
              color: "rgb(254,1113,53)",
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
            data: [-2, -4, -5, -6, -7, -9, -12, -13, -14, -15, -13, -11],
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
