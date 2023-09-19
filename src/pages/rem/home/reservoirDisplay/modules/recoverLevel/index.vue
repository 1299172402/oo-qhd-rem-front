<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="采出程度与含水率关系图"
        :is-show-max-btn="true"
    >
        <el-button class="buttonActive_primary detailLinkBtn"  type="primary" @click="linkroute('/developStatus/developmentEffectEvaluation')">详细</el-button>
        <el-button class="buttonActive_primary detailLinkBtn"  type="primary"  style="right:110px"  @click="downEcharts">下载</el-button>
        <Echart ref="echartChart" :chart-data="relationship" width="100%" height="100%"></Echart>
    </info-window>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { outputDegree, outputDegreeTongChart } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';

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
        relationship: {
            grid:{
                top: "5%",
                right: "5%",
                bottom:"25%",
                left: "12%",
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                confine: true
            },
            legend: {
                bottom: 0,
                textStyle: {
                    color: '#24DEFF'
                },
                data: [

                ],
                itemGap: 5
            },
            xAxis: {
                name: '地质储量采出程度(%)',
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#8FA4CC'
                },
                nameGap: 30,
                type: 'value',
                axisLabel: {
                    color: '#8FA4CC'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                }
            },
            yAxis: {
                name: '综合含水率(%)',
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#8FA4CC'
                },
                max:100,
                min:0,
                nameGap: 30,
                type: 'value',
                axisLabel: {
                    color: '#8FA4CC'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                }
            },
            color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
            series: []
        },

    };
  },
  mounted() {
      this.getOutputDegreeTongChart()
  },
  methods: {
      linkroute(name) {
          this.$router.push({
              path: name,
              query:{ link:'evaluation',page:'/reservoirDisplay/oilexhibition' }
          });
      },
      downEcharts(){
          this.$refs.echartChart.chartDownLoad( '采出程度与含水率关系图');
      },
      //采出程度与含水率关系图
      getOutputDegreeTongChart(oilFieldId, fieldId) {
          let request = {
              oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
              fieldId: "3FC9A818F5BC43B88270DB80BBB3018F"
          };
          let legendData = [];
          let seriesData = [];
          outputDegree(request).then((res) => {
              if (res.data.code == 200) {
                  let lineChart = res.data.data.chart.lineChartDataSets;
                  lineChart.forEach((item, index) => {
                      legendData.push(item.label);
                      seriesData.push(this.outputDegreeLine(item));
                  });
              } else {
                  legendData = [];
                  seriesData = [];
              }
          });

          outputDegreeTongChart(request).then((res) => {
              if (res.data.code == 200) {
                  let lineChart = res.data.data.chart.lineChartDataSets;
                  lineChart.forEach((item, index) => {
                      legendData.push('Rm=' + item.label);
                      seriesData.push(this.outputDegreeTongChart(item));
                  });
              } else {
                  legendData = [];
                  seriesData = [];
              }
          });
          this.relationship.yAxis.min = null;
          this.relationship.yAxis.max = null;
          this.relationship.legend.data = legendData;
          this.relationship.series = seriesData;
      },
      //采出程度折线解析
      outputDegreeLine(lineChart) {
          let series = {};
          series.type = 'scatter';
          series.symbolSize = 4;
          /* series.symbol = 'none';*/
          series.name = lineChart.label;
          series.label = {
              show: false,
              position: 'top',
              color: '#00D9EA'
          };
          let seriesData = [];
          let lineData = lineChart.numberPoints;
          lineData.forEach((item, index) => {
              let point = [];
              point.push(item.x);
              point.push(item.y);
              seriesData.push(point);
          });
          series.data = seriesData;
          return series;
      },
      //采出程度童氏图折线解析
      outputDegreeTongChart(lineChart) {
          let series = {};
          series.name = 'Rm=' + lineChart.label;
          series.type = 'line';
          series.symbol = 'none';
          /* series.symbolSize=3;*/
          series.smooth = true;
          let seriesData = [];
          let lineData = lineChart.numberPoints;
          lineData.forEach((item, index) => {
              let point = [];
              point.push(item.x);
              point.push(item.y);
              seriesData.push(point);
          });
          series.data = seriesData;
          return series;
      },
  },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            handler(Nval) {
                if (Nval == "dark") {
                    this.relationship.legend.textStyle.color = "#fff";
                } else {
                    this.relationship.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate: true
        },
    },
};
</script>
<style lang="scss" scoped>
.detailLinkBtn {
position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
