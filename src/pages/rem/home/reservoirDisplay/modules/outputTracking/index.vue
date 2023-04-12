<template>
  <div class="app-container" style="width: 100%; height: 100%">
    <div class="text" style="width: 15%; height: 10%; margin-left: 5%; text-align: center; padding: 5px 0">
      投产时间：2001-10
    </div>
    <Echart :chart-data="histogram" width="90%" height="65%"></Echart>
    <el-row :gutter="20" style="margin-top:-50px">
      <el-col :span="4">
        <!-- <Echart :chart-data="option"></Echart> -->
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
  value: '',
};
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
            return `
					<div class='slot-chart-tooltip'>
					${d2.marker} <span class='slot-chart-name'>${d2.seriesName}</span>${d2.value}<br>
					${d1.marker} <span class='slot-chart-name'>${d1.seriesName}</span>${d1.value}%<br>
					${d0.marker} <span class='slot-chart-name'>${d0.axisValue} ${d0.seriesName}</span>${d0.value}%<br>
					</div>
				`;
          },
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          containLabel: true,
        },
        legend: {
            textStyle:{
                color:''
            },
          data: [
            {
              name: "计划日常",
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
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "使用率（%）",
            position: "left",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "实例数",
            position: "right",
            scale: true,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "计划日常",
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
      option: {
        title: {
          x: "50%",
          y: "53%",
          textAlign: "center",
          textStyle: {
            rich: {
              num: {
                fontWeight: "500",
                color: "#F8F8FA",
                fontFamily: "D-DIN Exp",
                fontSize: 90,
              },
            },
          },
        },
        series: [
          {
            type: "gauge",
            radius: "90%", // 1行3个
            center: ["50%", "70%"],
            splitNumber: 10,
            // min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            z: 99,
            // 线
            axisLine: {
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]],
              },
              detail: {
                formatter: "{value}",
              },
              data: [
                {
                  value: 50,
                  name: "SCORE",
                },
              ],
            },
            //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 6, //刻度的段落数
              lineStyle: {
                color: "#858A93",
                width: 2, //刻度的宽度
              },
              length: 25, //刻度的长度
            },
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -15, //长度
              lineStyle: {
                color: "#858A93",
                width: 2,
              },
            },
            // //刻度线文字
            axisLabel: {
              show: false,
              color: "#858A93",
              fontSize: 16,
              distance: -30,
            },
            data: [
              {
                value: demoData.value,
                name: "SCORE",
                itemStyle: {
                  color: "#02C3A2",
                },
              },
            ],
            pointer: {
              show: false,
              length: "12%",
              radius: "50%",
              width: 12, //指针粗细
              offsetCenter: [0, -273],
            },
            detail: {
              show: false,
            },
            title: {
              // 仪表盘标题。
              show: false,
            },
          },
          {
            name: demoData.name,
            type: "pie", //渐变环
            radius: ["65%", "77%"],
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: 0,
            color: [
              {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#6FE5FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1C70C6", // 100% 处的颜色
                  },
                ],
              },
              "transparent",
            ],
            hoverAnimation: true,
            legendHoverLink: false,
            z: 10,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 0,
              },
              {
                value: demoData.value,
              },
            ],
          },
          {
            name: "",
            type: "gauge", //粗分割线
            radius: "82%",
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: 0,
            splitNumber: 15,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 60,
              lineStyle: {
                width: 30,
                color: "#26262A",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
          {
            type: "pie", //纯色背景环
            radius: ["65%", "77%"],
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: 0,
            color: "#606672",
            hoverAnimation: true,
            legendHoverLink: false,
            z: 0,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 1,
              },
              {
                value: 1,
              },
            ],
          },
        ],
      },
    };
  },
    computed:{
      getGlobeTheme(val){
          return this.$store.state.setting.mode
      }  
    },
   watch:{
        getGlobeTheme: {
           immediate: true,
            handler(Nval) {
                console.log(Nval)
                if(Nval == 'dark'){
                    this.histogram.legend.textStyle.color = '#ffffff'
                }else {
                    this.histogram.legend.textStyle.color = '#000000'
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
</style>
