<template>
  <div class="app-container" style="height: 100%">
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
      histogram: {
        textStyle: {
          fontSize: 0,
        },
        xAxis: {
          nameTextStyle: {
            color: "#c0c3cd",
            padding: [0, 0, -10, 0],
            fontSize: 14,
          },
          axisLabel: {
            color: "#8BA0C4",
            fontWeight: 400,
            fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
            fontSize: 20,
          },
          axisTick: {
            lineStyle: {
              color: "#0B1535",
              width: 1,
            },
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#384267",
              width: 1,
              type: "dashed",
            },
            show: true,
          },
          data: ["0-2", "2-5", "5-10", "10以上"],
          type: "category",
        },
        yAxis: {
          name: "变化量(口)",
          type: "value",

          nameTextStyle: {
            color: "#c0c3cd",
            padding: [0, 0, -10, 0],
            fontSize: 14,
          },
          axisLabel: {
            margin: 20,
            color: "#8BA0C4",
            fontWeight: 400,
            fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
            fontSize: 20,
          },
          axisTick: {
            lineStyle: {
              color: "#384267",
              width: 1,
            },
            show: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#384267",
              type: "line",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "line",
            },
            show: false,
          },
        },
        series: [
          {
            data: [22.0, 21.3, 19, 19],
            type: "bar",
            barMaxWidth: "auto",
            barWidth: 35,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00BFFF",
                  },
                  {
                    offset: 1,
                    color: "#54FF9F",
                  },
                ],
              },
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
              position: [30, 10],
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
