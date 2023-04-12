<template>
  <div class="app-container" style="width: 100%; height: 100%">
    <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["当年累计产量", "滚动预测", "分公司奋斗", "分公司考核"],
          align: "right",
          right: 10,
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
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["基础井", "措施井", "调整井", "开发井"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#063374",
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
                color: "#00c7ff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#000",
              },
            },
          },
        ],
        // dataZoom: [
        //   //给x轴设置滚动条
        //   {
        //     start: 0, //默认为0
        //     end: 100 - 1500 / 31, //默认为100
        //     type: "slider",
        //     show: true,
        //     xAxisIndex: [0],
        //     handleSize: 0, //滑动条的 左右2个滑动条的大小
        //     height: 10, //组件高度
        //     left: 50, //左边的距离
        //     right: 40, //右边的距离
        //     bottom: 0, //右边的距离
        //     handleColor: "#ddd", //h滑动图标的颜色
        //     handleStyle: {
        //       borderColor: "#cacaca",
        //       borderWidth: "1",
        //       shadowBlur: 2,
        //       background: "#ddd",
        //       shadowColor: "#ddd",
        //     },
        //     fillerColor: "#808080",
        //     backgroundColor: "#ddd", //两边未选中的滑动条区域的颜色
        //     showDataShadow: false, //是否显示数据阴影 默认auto
        //     showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
        //     handleIcon:
        //       "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
        //     filterMode: "filter",
        //   },
        //   //下面这个属性是里面拖到
        //   {
        //     type: "inside",
        //     show: true,
        //     xAxisIndex: [0],
        //     start: 0, //默认为1
        //     end: 100 - 1500 / 31, //默认为100
        //   },
        // ],
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
                    color: "#008cff",
                  },
                  {
                    offset: 1,
                    color: "#005193",
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
                    color: "#00da9c",
                  },
                  {
                    offset: 1,
                    color: "#007a55",
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
                    color: "#c4e300",
                  },
                  {
                    offset: 1,
                    color: "#728400",
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
                    color: "#c4e300",
                  },
                  {
                    offset: 1,
                    color: "#728400",
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
</style>
