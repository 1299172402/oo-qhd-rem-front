<template>
  <div class="app-container" style="width: 100%; height: 100%">
    <div class="text" style="width: 15%; height: 10%; margin-left: 5%; text-align: center; padding: 5px 0">
      投产时间：2001-10
    </div>
    <Echart :chart-data="histogram" width="100%" height="65%"></Echart>
    <el-row :gutter="20">
      <el-col :span="7">
        <div style="display: flex">
          <Echart :chart-data="option"></Echart>
          <Echart :chart-data="option"></Echart>
        </div>
      </el-col>
      <el-col :span="17">
          <el-row :gutter="10">
              <el-col :span="8" v-for="(item, index) in data" :key="index">
                  <div style="float: left;width: 60px; height: 60px">
                      <svg-icon :icon-class="item.icon" style="width: 100%;height: 100%" />
                  </div>
                  <div style="margin-top: 10px">
                    <div>{{ item.name }}</div>
                    <div>{{ item.value }}</div >
                  </div>
              </el-col>
          </el-row>
      </el-col>
    </el-row>
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
//前端细节区分
var demoData = {
  name: "批次转化率",
  value: "",
};
let dataArr = 6130;
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      histogram: {
        color: ["#00C1DE", "#6F7AF8", "#F5A547", "#3399ff"],
        tooltip: {
          trigger: "axis",

          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(0,0,0,0.25)",
            },
          },
          padding: 12,
          textStyle: {
            color: "rgba(0,0,0,0.65);",
          },
          extraCssText: "box-shadow: 0 2px 4px 0 rgba(169,169,169,0.50); border-radius: 4px",
          formatter: function (param) {
            const d0 = param[0];
            const d1 = param[1];
            const d2 = param[2];
            const d3 = param[3];
            return `
					<div class='slot-chart-tooltip'>
					${d2.marker} <span class='slot-chart-name'>${d2.seriesName}</span>${d2.value}<br>
					${d1.marker} <span class='slot-chart-name'>${d1.seriesName}</span>${d1.value}%<br>
					${d0.marker} <span class='slot-chart-name'>${d0.axisValue} ${d0.seriesName}</span>${d0.value}%<br>
          ${d3.marker} <span class='slot-chart-name'>${d3.axisValue} ${d3.seriesName}</span>${d3.value}%<br>
					</div>
				`;
          },
        },
        grid: {
          left: 20,
          right: 30,
          top: 30,
          bottom: 30,
          show: false, // 隐藏坐标系网格线
          containLabel: true,
        },
        legend: {
           bottom: "bottom",
          textStyle: {
            color: "",
          },
          data: [
            {
              name: "计划日产",
              icon: "circle",
            },
            {
              name: "实际日产",
              icon: "circle",
            },
            {
              name: "实际累产",
              icon: "circle",
            },
            {
              name: "计划累产",
              icon: "circle",
            },
          ],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisLabel: {
              fontSize: 16,
              color: "#a9a8a8",
              margin: 10,
            },
            axisLine: {
              show: false, // 隐藏 x 轴线
            },
            splitLine: {
              show: false, // 隐藏 x 轴分隔线
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "年产 (m³/d)",
             nameTextStyle: {
              padding: [0, 0, 20, 0], // 上、右、下、左
            },
            nameLocation: "center",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value}",
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#a9a8a8",
              },
            },
            splitLine: {
              show: false, // 隐藏 x 轴分隔线
            },
            axisLabel: {
              fontSize: 16,
              color: "#a9a8a8",
              margin: 10,
            },
          },
          {
            type: "value",
            name: "年产(10m⁴m³)",
            position: "right",
              nameTextStyle: {
              padding: [20, 0, 0, 0], // 上、右、下、左
            },
             nameLocation: "center",
            scale: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#a9a8a8",
              },
            },
            splitLine: {
              show: false, // 隐藏 x 轴分隔线
            },
            axisLabel: {
              fontSize: 16,
              color: "#a9a8a8",
              margin: 10,
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "计划日产",
            type: "line",
            yAxisIndex: 0,
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 15.6, 12.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: "实际日产",
            type: "line",
            yAxisIndex: 0,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 15.6, 12.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: "实际累产",
            type: "line",
            yAxisIndex: 1,
            data: [22.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
          {
            name: "计划累产",
            type: "line",
            yAxisIndex: 1,
            data: [12.0, 12.2, 13.3, 14.5, 16.3, 11.2, 22.3, 3.4, 13.0, 13.5, 22.0, 16.2],
          },
        ],
      },
      data: [
        {
          icon: "dayproOil",
          name: "日产油(m³)",
          value: "6160.02",
        },
        {
          icon: "dayproOil",
          name: "与前日日产油差值(m³)",
          value: "17.01",
        },
        {
          icon: "dayproOil",
          name: "累产油(m³)",
          value: "165.87",
        },{
          icon: "dayproOil",
          name: "规划采收率(%)",
          value: "6160.02",
        },
        {
          icon: "dayproOil",
          name: "综合含水率(%)",
          value: "17.01",
        },
        {
          icon: "dayproOil",
          name: "储量(%)",
          value: "165.87",
        },
      ],
      option: {
        series: [
          // 刻度值
          {
            name: "外部刻度",
            type: "gauge",
            radius: "80",
            min: 0,
            max: 10000,

            splitNumber: 5, //刻度数量
            startAngle: 186,
            endAngle: -6,
            axisLine: {
              show: false,
              lineStyle: {
                color: [[1, "rgba(0,0,0,0)"]],
              },
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#FFF",
              fontSize: 9,
              distance: -4, // 动态
            }, //刻度标签。
            axisTick: {
              show: false,
            }, //刻度样式
            splitLine: {
              show: false,
            },
          },
          // 底层
          {
            name: "内部宽线条",
            type: "gauge",
            radius: "44",
            startAngle: 186,
            endAngle: -6,
            axisLine: {
              roundCap: true,
              lineStyle: {
                color: [[1, "#2f7194"]],
                width: 15,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            detail: {
              show: false,
            },
            title: {
              show: false,
            },
          },
          //   间隔条形
          {
            name: "间隔条形",
            type: "gauge",
            radius: "40",
            min: 0,
            max: 10000,

            z: 4,
            splitNumber: 14,
            startAngle: 186,
            endAngle: -6,
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: true,
              length: 12,
              splitNumber: 2,
              distance: -12,
              lineStyle: {
                color: "#2f7698",
                width: 2,
              },
            },
            splitLine: {
              show: false,
            },
            detail: {
              show: false,
            },
            title: {
              show: false,
            },
          },
          // 数据
          {
            name: "内层数据刻度",
            type: "gauge",
            radius: "41",
            z: 3,
            min: 0,
            max: 10000,

            startAngle: 186,
            endAngle: -6,
            // 进度的颜色
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10,
                // color: [[0.2, '#77D97F'],[0.8, '#4285F4'],[1, '#FF7E7F']],
                color: [
                  // [dataArr/10000,'#fff'],
                  [1, "#1c5a73"],
                ],
              },
            },
            progress: {
              show: true,
              roundCap: false,
              width: 11,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: dataArr / 10000 / 6,
                      color: "#ffffff",
                    },
                    {
                      offset: 0.4,
                      color: "#54cae2",
                    },
                    {
                      offset: 0.7,
                      color: "#3690a3",
                    },
                    {
                      offset: 1,
                      color: "#2d7a8b",
                    },
                  ],
                  // global: false // 缺省为 false
                },
                borderColor: "#1b5b76",
                borderWidth: "2",
              },
            },
            tooltip: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            pointer: {
              length: "78%",
              width: 2,
              offsetCenter: [0, "-30%"],
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#ffffff",
                    },
                    {
                      offset: 0.7,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "#2d7a8b",
                    },
                  ],
                  // global: false // 缺省为 false
                },
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 7,
                shadowColor: "#ffffff",
              },
            },
            detail: {
              offsetCenter: ["4%", "-5%"],
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}";
              },
              rich: {
                value: {
                  fontSize: 13,
                  fontWeight: "bolder",
                  color: "#ffffff",
                  textShadowBlur: "12",
                  textShadowColor: "#3ea0b5",
                },
                unit: {
                  fontSize: 18,
                  fontWeight: "bolder",
                  color: "#ffffff",
                  textShadowBlur: "12",
                  textShadowColor: "#3ea0b5",
                },
              },
            },
            data: [
              {
                value: dataArr,
              },
            ],
          },
          // 最外层线
          {
            type: "gauge",
            name: "外层辅助",
            radius: 52,
            startAngle: 188,
            // center: ['50%', '75%'],
            endAngle: -9,
            min: 0,
            max: 10000,
            splitNumber: 5,
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              show: true,
              lineStyle: {
                color: [[1, "#3ea0b5"]],
                width: 3,
                opacity: 0.5,
                shadowColor: "rgba(0,138,255,0.45)",
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
              },
            },

            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          // 最内层线
          {
            name: "最内层线",
            type: "gauge",
            radius: "28",

            startAngle: 192,
            min: 0,
            max: 10000,
            endAngle: -12,
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0,
              },
            },
            axisLabel: {
              show: false,
            },
            // 上面一圈
            itemStyle: {
              color: "#50cbe7",
              shadowColor: "rgba(0,138,255,0.45)",
              shadowBlur: 2,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
            },
            // 刻度指到位置
            progress: {
              roundCap: true,
              show: true,
              roundCap: true,
              width: 3,
            },
            axisLine: {
              roundCap: true,
              show: true,
              lineStyle: {
                color: [[1, "#2e719a"]],
                width: 3,
                opacity: 0.5,
                shadowColor: "rgba(0,138,255,0.45)",
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
              },
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: dataArr,
                // value: data.value
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    getGlobeTheme(val) {
      return this.$store.state.setting.mode;
    },
  },
  watch: {
    getGlobeTheme: {
      immediate: true,
      handler(Nval) {
        console.log(Nval);
        if (Nval == "dark") {
          this.histogram.legend.textStyle.color = "#ffffff";
        } else {
          this.histogram.legend.textStyle.color = "#000000";
        }
      },
      deep: true,
    },
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
.text {
  margin-top: 10px;
  height: 42px;
  border: 1px solid rgb(32, 112, 224);
  text-align: center;
  line-height: 42px;
  box-shadow: 0px 0px 15px #66ffff inset;
}
.xbox {
  display: flex;
  align-items: center;
  height: 200px;
}

.item {
  height: 100%;
  box-sizing: border-box;
}

#item1 {
  width: 30%;
}

.item-group {
  display: flex;
  flex-grow: 1;
}

#item2 {
  flex-basis: 70%;
  margin-right: 20px;
}

#item3 {
  flex-basis: 70%;
}
</style>
