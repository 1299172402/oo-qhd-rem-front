<template>
  <div class="app-container">
    <Echart :chart-data="histogram" width="100%" height="680px"></Echart>
    <!-- :style="{
          background: currentModel == 'dark' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
        }" -->
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
var data = {
  color: ["#F87535", "#177cf1"],
  x: ["2001-10", "2004-02", "2006-06", "2008-06", "2008-10", "2011-02", "2013-06"],
  y: [{ min: null, max: null, name: "(地质储量采油速度（%））" }],
  data: [
    {
      data: ["21", "3", "38", "9", "8.5", "5", "35", "25", "14", "11", "9", "25"],
    },
    {
      data: ["13", "9.3", "9", "17", "8.5", "11.5", "9.3", "9", "17", "8.5", "27.5", "23.666"],
    },
    {
      data: ["23", "12", "19", "7", "18.5", "13.5", "12.3", "19", "7", "28.5", "17.5", "13.666"],
    },
  ],
};
//前端细节区分
var tip = {
  tofiexd: 2, //y轴刻度保留2位数小数
  unit: "%", //y轴刻度单位
};
var type = "line_auto_up_down";
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      currentModel: this.$store.state.setting.mode,
      histogram: {
        title: {
          x: "center",
          top: "5",
          textStyle: { color: "#fff" },
        },
        legend: {
          data: ["地质储量采油速度", "可采储量采油速度", "剩余可采储量采油速度"],
          left: "7%",
          top: "5%",
          textStyle: {
            color: "#666666",
          },
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 25,
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          axisPointer: {
            type: "line",
          },
        },
        legend: {
          show: true,
          bottom: 15,
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            lineStyle: { color: "#fff" },
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: [
          {
            type: "value",
            show: true,
            min: null,
            max: null,
            name: "(单位：xx)",
            splitLine: { show: false },
            axisLine: {
              lineStyle: { color: "#fff" },
            },
          },
          {
            type: "value",
            show: false,
            min: null,
            max: null,
            name: "(单位：xx)",
            splitLine: { show: false },
            axisLine: {
              lineStyle: { color: "#fff" },
            },
          },
        ],
        grid: {
          left: "4%",
          right: "4%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        series: [],
      },
    };
  },
  mounted() {
    //后端传数据源进行处理
    if (data.title) {
      this.histogram.title.text = data.title;
    }
    if (data.color) {
      var arrColor = data.color;
      this.histogram.color = arrColor;
    }
    if (data.x) {
      this.histogram.xAxis.data = data.x;
    }
    //全局处理设置Y轴刻度单位（默认无单位），显示多少位小数(默认0位)
    var sunit = "",
      stofixed = 0;
    //前端控制设置
    if (tip) {
      if (tip.tofiexd) {
        stofixed = tip.tofiexd;
      }
      if (tip.unit) {
        sunit = tip.unit;
      }
    }
    for (var mm = 0; mm < data.y.length; mm++) {
      if (data.y[mm].name) {
        this.histogram.yAxis[mm].name = data.y[mm].name;
      }
      if (data.y[mm].min) {
        this.histogram.yAxis[mm].min = data.y[mm].min;
      }
      if (data.y[mm].max) {
        this.histogram.yAxis[mm].max = data.y[mm].max;
      }

      this.histogram.yAxis[mm].axisLabel = {
        formatter: function (val) {
          if (stofixed == 0) {
            return val + sunit;
          } else {
            return val.toFixed(stofixed) + sunit;
          }
        },
      };
    }
    if (data.y.length > 1) {
      //双Y轴处理
      this.histogram.yAxis[1].show = true;
    }
    //line_auto_up_down标注文字上下自动排序显示类型处理
    if (type == "line_auto_up_down") {
      var arrVal1 = [],
        arrVal2 = [];
      for (var i = 0; i < data.data.length; i++) {
        var val = data.data[i];
        var tmp = {
          name: val.name,
          yAxisIndex: 0,
          type: "line",
          data: [],
          smooth: true, //平滑曲线显示
        };
        for (var j = 0; j < val.data.length; j++) {
          var vval = {
            value: val.data[j],
            label: { show: true },
          };
          tmp.data.push(vval);
        }
        this.histogram.series.push(tmp);
      }

      for (var j = 0; j < data.data[0].data.length; j++) {
        arrVal1.push(data.data[0].data[j]);
        arrVal2.push(data.data[1].data[j]);
      }
      //判断数组大小并进行上下自动显示
      if (arrVal1.length == arrVal2.length) {
        for (var j = 0; j < arrVal1.length; j++) {
          var val0 = this.histogram.series[0].data[j].value;
          var val1 = this.histogram.series[1].data[j].value;
          if (Number(val0) > Number(val1) || Number(val0) == Number(val1)) {
            this.histogram.series[0].data[j].label.position = "top";
            this.histogram.series[1].data[j].label.position = "bottom";
          } else {
            this.histogram.series[0].data[j].label.position = "bottom";
            this.histogram.series[1].data[j].label.position = "top";
          }
        }
      }
    }
  },
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
