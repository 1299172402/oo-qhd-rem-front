<template>
  <div class="app-container">
    <Echart :chart-data="histogram" height="100%"></Echart>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import { LineChart } from "echarts/charts";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      chartHeight: "150px",
      tableHeight: 280,
      histogram: {
        tooltip: {
          show: true,
        },
        legend: {
          left: "left",
          padding: [5, 100],
          icon: "rect",
          itemWidth: 12,
          itemHeight: 10,
          itemGap: 40,
          data: ["月度计划产量", "月度实际产量"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 14,
          },
        },
        grid: {
          top: 30,
          left: 40,
          right: 10,
          bottom: 30,
        },
        xAxis: [
          {
            type: "category",
            data: [
                
            ],
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            label: {
              interval: 0,
              rotate: 40,
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        series: [
          {
            name: "月度计划产量",
            type: "bar",
            barWidth: "12",
            data: [],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
            /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
          },
          {
            name: "月度实际产量",
            type: "bar",
            barWidth: "12",
            data: [],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#F5BE43",
                },
                {
                  offset: 1,
                  color: "#FF7135",
                },
              ]),
            },
            /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
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
