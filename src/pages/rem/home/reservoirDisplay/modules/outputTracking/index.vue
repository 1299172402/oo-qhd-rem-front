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
      <el-col :span="17" style="margin-top: 15px">
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item, index) in data" :key="index">
            <div style="float: left; width: 60px; height: 60px">
              <svg-icon :icon-class="item.icon" style="width: 100%; height: 100%" />
            </div>
            <div style="margin-top: 10px">
              <div>{{ item.name }}</div>
              <div>{{ item.value }}</div>
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
					${d1.marker} <span class='slot-chart-name'>${d1.seriesName}</span>${d1.value}<br>
          ${d0.marker} <span class='slot-chart-name'> ${d0.seriesName}</span>${d0.value}<br>
          ${d3.marker} <span class='slot-chart-name'> ${d3.seriesName}</span>${d3.value}<br>


					</div>
				`;
          },
          // 					${d0.marker} <span class='slot-chart-name'>${d0.axisValue} ${d0.seriesName}</span>${d0.value}<br>
          // ${d3.marker} <span class='slot-chart-name'>${d3.axisValue} ${d3.seriesName}</span>${d3.value}<br>
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
            // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            data: [
              "1月1日",
              "1月2日",
              "1月3日",
              "1月4日",
              "1月5日",
              "1月6日",
              "1月7日",
              "1月8日",
              "1月9日",
              "1月10日",
              "1月11日",
              "1月12日",
              "1月13日",
              "1月14日",
              "1月15日",
              "1月16日",
              "1月17日",
              "1月18日",
              "1月19日",
              "1月20日",
              "1月21日",
              "1月22日",
              "1月23日",
              "1月24日",
              "1月25日",
              "1月26日",
              "1月27日",
              "1月28日",
              "1月29日",
              "1月30日",
              "1月31日",
              "2月1日",
              "2月2日",
              "2月3日",
              "2月4日",
              "2月5日",
              "2月6日",
              "2月7日",
              "2月8日",
              "2月9日",
              "2月10日",
              "2月11日",
              "2月12日",
              "2月13日",
              "2月14日",
              "2月15日",
              "2月16日",
              "2月17日",
              "2月18日",
              "2月19日",
              "2月20日",
              "2月21日",
              "2月22日",
              "2月23日",
              "2月24日",
              "2月25日",
              "2月26日",
              "2月27日",
              "2月28日",
              "3月1日",
              "3月2日",
              "3月3日",
              "3月4日",
              "3月5日",
              "3月6日",
              "3月7日",
              "3月8日",
              "3月9日",
              "3月10日",
              "3月11日",
              "3月12日",
              "3月13日",
              "3月14日",
              "3月15日",
              "3月16日",
              "3月17日",
              "3月18日",
              "3月19日",
              "3月20日",
              "3月21日",
              "3月22日",
              "3月23日",
              "3月24日",
              "3月25日",
              "3月26日",
              "3月27日",
              "3月28日",
              "3月29日",
              "3月30日",
              "3月31日",
              "4月1日",
              "4月2日",
              "4月3日",
              "4月4日",
              "4月5日",
              "4月6日",
              "4月7日",
              "4月8日",
              "4月9日",
              "4月10日",
              "4月11日",
              "4月12日",
              "4月13日",
              "4月14日",
              "4月15日",
              "4月16日",
              "4月17日",
              "4月18日",
              "4月19日",
              "4月20日",
              "4月21日",
              "4月22日",
              "4月23日",
              "4月24日",
              "4月25日",
              "4月26日",
              "4月27日",
              "4月28日",
              "4月29日",
              "4月30日",
              "4月30日",
              "5月1日",
              "5月2日",
              "5月3日",
              "5月4日",
              "5月5日",
              "5月6日",
              "5月7日",
              "5月8日",
              "5月9日",
              "5月10日",
            ],
            axisLabel: {
              fontSize: 16,
              color: "#a9a8a8",
              // margin: 10,
              interval: 30, // 控制每隔多少个标签显示一个标签
              formatter: function (value) {
                return value.substring(0, 2); // 只保留月份部分
              },
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
            name: "日产 (m³/d)",
            nameTextStyle: {
              padding: [0, 0, 40, 0], // 上、右、下、左
            },
            nameLocation: "center",
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
            symbolSize: 0, // 设置点的大小为 0，不会显示出来
            yAxisIndex: 0,
            data: [
              6143, 6059, 6190, 5860, 6157, 6132, 5832, 6031, 5944, 5850, 6084, 6155, 5995, 5986, 6137, 6147, 5834,
              5836, 6092, 6033, 5826, 6099, 5962, 6084, 5952, 6127, 5895, 6108, 5962, 6136, 6167, 6071, 5999, 5887,
              5865, 6176, 5934, 6044, 6149, 6046, 5965, 5902, 6057, 6006, 6032, 5922, 5966, 5813, 6145, 6151, 5806,
              6000, 5976, 6018, 6084, 5952, 6114, 6141, 5881, 5941, 6061, 6125, 6109, 5937, 6012, 5973, 5851, 6049,
              5854, 6060, 5886, 6152, 5998, 6195, 5937, 5937, 6110, 5887, 6119, 5809, 6051, 5898, 6103, 5976, 6162,
              5915, 5871, 6150, 5992, 6028, 6028, 5812, 6174, 5814, 5814, 5940, 6045, 5910, 6184, 5945, 5869, 6196,
              5829, 6177, 5832, 5955, 5932, 6187, 6058, 6152, 5851, 6004, 6051, 5848, 6050, 5810, 6089, 5860, 5801,
              5885, 5907, 6079, 6196, 6114, 6149, 6181, 6092, 5917, 6034, 5942, 5984, 6110, 5958, 6112, 6190, 5956,
              6035, 5872, 6180, 6122, 5896, 5850, 5860, 6037, 5924, 6172, 5839, 5860, 6155, 5862,
            ],
          },
          {
            name: "实际日产",
            type: "line",
            symbolSize: 0, // 设置点的大小为 0，不会显示出来
            yAxisIndex: 0,
            data: [
              6148, 5851, 5867, 5924, 5962, 5891, 6081, 5916, 5859, 6193, 6045, 6102, 5829, 5901, 5935, 5836, 5990,
              6004, 5957, 6092, 6036, 6009, 6131, 5950, 6011, 6113, 6132, 5905, 6138, 6193, 6194, 6168, 6107, 5994,
              5943, 6167, 6143, 6173, 6041, 5937, 6036, 6000, 6075, 6014, 5964, 6005, 6124, 5821, 6103, 5998, 6162,
              6057, 6091, 6033, 5898, 5803, 6121, 6008, 5848, 6184, 5831, 5826, 5928, 6199, 6031, 6069, 5909, 6143,
              6176, 6140, 5868, 6054, 5925, 5985, 5834, 5984, 5886, 5806, 6163, 5908, 5869, 6039, 5997, 6160, 5806,
              6174, 5902, 6035, 5899, 5992, 5810, 5978, 5880, 6198, 5995, 5863, 6114, 6162, 6102, 6091, 6125, 5994,
              5973, 6051, 5832, 6018, 6010, 5916, 5986, 6154, 5904, 6174, 6129, 5978, 6061, 6134, 5938, 6189, 6141,
              6185, 5985, 5989, 5885, 5963, 6147, 5891, 6022, 6145, 6060, 6133, 5806, 5889, 6181, 6152, 6122, 6156,
              6086, 6129, 5953, 6118, 6095, 6074, 6021, 5892, 5921, 6044, 5989, 5845, 6081, 6070,
            ],
          },
          {
            name: "实际累产",
            symbolSize: 0, // 设置点的大小为 0，不会显示出来
            type: "line",
            yAxisIndex: 1,
            data: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
              29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
              55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
              81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
              106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
              127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147,
              148, 149, 150,
            ],
          },
          {
            name: "计划累产",
            type: "line",
            symbolSize: 0, // 设置点的大小为 0，不会显示出来
            yAxisIndex: 1,
            data: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
              29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 40, 41, 42, 43, 44, 45, 46, 47, 48,
              49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
              75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
              101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
              122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
              143, 144, 145, 146, 147, 148, 149, 150,
            ],
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
        },
        {
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
