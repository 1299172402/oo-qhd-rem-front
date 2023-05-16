<template>
  <div class="app-container" style="height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="分层注入量"
          :is-show-max-btn="true"
      >
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
          <Echart :chart-data="histogram" width="100%" height="100%"></Echart>
      </info-window>
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
          data: ["月注水量(10⁴m³)", "月配注量(10⁴m³)", "产液量(10⁴m³)"],
          bottom: "bottom",
          textStyle: {
            color: "#a9a8a8",
            fontSize: 16,
          },
        },
        grid: {
          left: 20,
          right: 30,
          top: 0,
          bottom: '10%',
          show: false, // 隐藏坐标系网格线
          containLabel: true,
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
              color: "#a9a8a8",
            },
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "#a9a8a8",
              fontSize: 16,
            },
          },
        },
        yAxis: {
          type: "category",
          //   Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ
          data: ["nm1", "nm2", "nm3", "nm4", "nm5"],
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //  改变y轴颜色
            show: false,
            lineStyle: {
              color: "#a9a8a8",
            },
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            //formatter: '{value} m³ ', //  给y轴添加单位
            textStyle: {
              color: "#a9a8a8",
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
                    color: "rgba(85,209,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(45,130,255,1)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [4, 9, 9, 8, 6],
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
                    color: "rgba(0,248,205,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(7,117,59)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [2, 3, 5, 10, 5],
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
                    color: "rgba(255,199,87,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,114,53,1)",
                  },
                ]),

                borderWidth: 0,
              },
            },
            data: [2, 3, 5, 7, 8],
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
