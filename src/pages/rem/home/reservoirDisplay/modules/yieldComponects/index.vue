<template>
  <div class="app-container" style="width: 100%; height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="产量构成详情"
          :is-show-max-btn="true"
      >
        <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
        <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
    </info-window>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["当年累计产量", "滚动预测", "分公司奋斗", "分公司考核"],
          align: "right",
          bottom: 'bottom',
          textStyle: {
            color: "",
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "8%",
          top:'10%',
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["基础井", "措施井", "调整井", "开发井"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#a9a8a8",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a9a8a8",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name:'当年累产油量(10m⁴m³)',
             nameLocation: "center",
             nameTextStyle: {
              padding: [0, 0, 20, 0], // 上、右、下、左
            },
            axisLabel: {
              formatter: "{value} ",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#a9a8a8",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#a9a8a8",
              },
            },
          },
        ],
        series: [
          {
            name: "当年累计产量",
            type: "bar",
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                   color: "rgb(3,189,234)", 
                  },
                  {
                    offset: 1,
                     color: "rgb(14,105,233)",
                  },
                ]),
                opacity: 1,
              },
            },
          },
          {
            name: "滚动预测",
            type: "bar",
            data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(0,248,204)",
                  },
                  {
                    offset: 1,
                    color: "rgb(7,122,64)", 
                  },
                ]),
                opacity: 1,
              },
            },
          },
          {
            name: "分公司奋斗",
            type: "bar",
            data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(255,199,87)", 
                  },
                  {
                    offset: 1,
                   color: "rgb(255,114,53)", 
                  },
                ]),
                opacity: 1,
              },
            },
          },

          {
            name: "分公司考核",
            type: "bar",
            data: [56, 45, 56, 48, 65, 52, 55, 68, 72, 68],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(199,59,0)", 
                  },
                  {
                    offset: 1,
                    color: "rgb(177,35,0)", 
                  },
                ]),
                opacity: 1,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$store.state.setting.mode == "dark") {
          this.histogram.legend.textStyle.color = "#fff";
        } else {
          this.histogram.legend.textStyle.color = "#000000";
        }
  },
  methods: {},
  computed: {
    getGlobeTheme(val) {
      return this.$store.state.setting.mode;
    },
  },
  watch: {
    getGlobeTheme: {
      handler(Nval) {
        if (Nval == "dark") {
          this.histogram.legend.textStyle.color = "#fff";
        } else {
          this.histogram.legend.textStyle.color = "#000000";
        }
      },
      deep: true,
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
