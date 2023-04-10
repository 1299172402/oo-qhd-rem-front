<template>
  <div class="app-container">
    <Echart :chart-data="histogram" width="100%" height="680px"></Echart>
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
        legend: {
          data: ["月注水量(10⁴m³)", "月配注量(10⁴m³)","产液量(10⁴m³)"],
          top: "5%",
          right: "10",
          textStyle: {
            color: "rgba(250,250,250,0.6)",
            fontSize: 16,
          },
        },
        barWidth: 15,
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //  改变x轴颜色
            lineStyle: {
              color: "#3c4654",
            },
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "rgba(250,250,250,0.5)",
              fontSize: 16,
            },
          },
        },
        yAxis: {
          type: "category",
        //   Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ
          data: ["nm1", "nm2", "nm3", "nm4","nm5"],
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //  改变y轴颜色
            lineStyle: {
              color: "#3c4654",
            },
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            //formatter: '{value} m³ ', //  给y轴添加单位
            textStyle: {
              color: "rgba(250,250,250,0.5)",
              fontSize: 16,
            },
          },
        },
        series: [
          {
            type: "bar",
            name: "月注水量(10⁴m³)",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 16,
                    fontWeight: 600,
                  },
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(45,130,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(85,209,255,1)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [19, 29, 39, 81,65],
          },
          {
            type: "bar",
            name: "月配注量(10⁴m³)",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 16,
                    fontWeight: 600,
                  },
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(255,172,52,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,206,93,1)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [12, 23, 35, 100,65],
          },
            {
            type: "bar",
            name: "产液量(10⁴m³)",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 16,
                    fontWeight: 600,
                  },
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(255,172,52,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,206,93,1)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [12, 23, 35, 100,88],
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
