<template>
  <div class="app-container" style="height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="单井井底流压"
          :is-show-max-btn="true"
      >
        <el-button  type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute('/injection/indexHome')">详情</el-button>
          <el-button type="primary" class="buttonActive_primary detailLinkBtn"  style="right:110px"  @click="downEcharts">下载</el-button>
          <Echart
              :chart-data="getResidueOilChart()"
              height="100%"
              ref="echartChart"
              style="height: 100%!important;"
          >
          </Echart>
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
import {getResidueOilCondotion} from "@/api/rem/r-intelligentIPA";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      chartHeight: "150px",
      tableHeight: 280,
        ResidueOilRank:[],
        dhFlowingPress:[],
        fluidProdDaily:[]
    };
  },
  mounted() {
      this.getResidueOilChart();
      this.getData()
  },
  methods: {
      linkroute(rname) {
          this.$router.push({path: rname,query: {link:'remHome'}});
      },
      getResidueOilChart() {
          let option = {
              legend: {
                  textStyle: {
                      color: this.$store.state.setting.mode == 'dark'? '#ffffff' : "#000000",
                  },
                  bottom: "10",
              },
              dataZoom: {
                  start: 0,
                  type: "inside",
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              grid: {
                  left: '5%',
                  right: '15%',
                  bottom: '5%',
                  top:'5%',
                  containLabel: true
              },
              xAxis: [{
                  type: 'value',
                  name: '日产液量',
                  nameTextStyle: {
                      color: '#a9a8a8'
                  },
                  axisLine:{
                      show:false
                  },
                  axisTick:{
                      show:false
                  },
                  splitLine:{
                      show:false
                  },
                  interval: 400,
                  axisLabel: {
                      color: '#a9a8a8',
                      textStyle:{
                          color: '#a9a8a8',
                      }
                  }
              }, {
                  type: 'value',
                  name: '井底流压',
                  nameTextStyle: {
                      color: '#a9a8a8'
                  },
                  axisLine:{
                      show:false
                  },
                  axisTick:{
                      show:false
                  },
                  splitLine:{
                      show:false
                  },
                  interval: 400,
                  axisLabel: {
                      color: '#a9a8a8',
                      textStyle:{
                          color: '#a9a8a8',
                      }
                  }
              }],
              yAxis: {
                  type: 'category',
                  data: [],
                  axisLabel: {
                      color: '#a9a8a8',
                      textStyle:{
                          color: '#a9a8a8',
                      }
                  }
              }
          };
          if (!this.ResidueOilRank) {
              return option
          } else {
              option.yAxis.data = this.ResidueOilRank.map(item => item.wellNo)
              option.series = [
                  {
                      name: '井底流压(MPa)',
                      type: 'bar',
                      xAxisIndex: 1,
                      color: 'rgb(9,141,234)',
                      data: this.ResidueOilRank.map(item => Number(item.dhFlowingPress).toFixed(1)),
                  },
                  {
                      name: '日产液量(m³)',
                      type: 'bar',
                      xAxisIndex: 0,
                      color: 'rgb(4,182,131)',
                      data: this.ResidueOilRank.map(item => Math.round(Number(item.fluidProdDaily)))
                  }
              ]
          }
          return option
      },
      downEcharts(){
          this.$refs.echartChart.chartDownLoad( '单井井底流压');
      },
      yemonth() {
          let data = new Date()
          if (data.getMonth() < 10) {
              if(data.getMonth()===0){
                  return data.getFullYear()-1 + '-12'
              }
              if(data.getMonth()===1){
                  return data.getFullYear() + '-01'
              }
              return data.getFullYear() + '-0' + (data.getMonth()-1)
          } else {
              return data.getFullYear() + '-' + (data.getMonth()-1)
          }

      },
      getData(){
          let params = {
              blockId: '83D33B89B0DAB7DFA440BD060746883A',
              yearMonth: this.yemonth(),
          }
          getResidueOilCondotion(params).then(res => {
              try {
                  this.residueOil = res.map(item => {
                      item.dhFlowingPress = item.dhFlowingPress ? Number(item.dhFlowingPress).toFixed(1) : '';
                      item.fluidProdDaily = item.fluidProdDaily ? Math.round(item.fluidProdDaily) : '';
                      return item;
                  });
              } catch (e) {
              }
              const newArray = res.filter(obj => obj.dhFlowingPress !='' && obj.fluidProdDaily !='');
              this.ResidueOilRank = newArray.slice(0, 10);
              this.ResidueOilRank.sort((a, b) => a.dhFlowingPress - b.dhFlowingPress)
          })  
      },
    //图表
    getEchartData(value, unit, valueColor, backColor, centerColor, data) {
      var option = {
        tooltip: {
          trigger: value,
          formatter: unit,
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "75%"],
            color: centerColor,
            label: {
              fontSize: 10,
            },
            data: [
              { value: 0, name: value, label: { color: "white", position: "center" } },
              { value: 1, name: unit, label: { color: "white", position: "inner" } },
            ],
          },
          {
            type: "pie",
            color: [valueColor, backColor],
            radius: ["95%", "85%"],
            labelLine: {
              length: 30,
            },
            label: {
              show: false,
            },
            data: [
              { value: 335, name: "Direct" },
              { value: 102, name: "Others" },
            ],
          },
        ],
      };
      return option;

      // option && myChart.setOption(option);
    },
    //图表
    getEchart(value, unit, valueColor, backColor, centerColor, data) {
      var option = {
        tooltip: {
          trigger: value,
          formatter: unit,
        },
        series: [
          {
            type: "pie",

            selectedMode: "single",
            radius: [0, "75%"],
            color: centerColor,
            label: {
              fontSize: 10,
            },
            data: [
              { value: 0, name: value, label: { color: "white", position: "center" } },
              { value: 1, name: unit, label: { color: "white", position: "inner" } },
            ],
          },
          {
            type: "pie",
            color: [valueColor, backColor, "transparent"],
            radius: ["95%", "85%"],
            startAngle: 180,
            labelLine: {
              length: 30,
            },
            label: {
              show: false,
            },
            data: [
              { value: 9, name: "Others" },
              { value: 1, name: "Direct" },
              { value: 10, name: "528" },
            ],
          },
        ],
      };
      return option;

      // option && myChart.setOption(option);
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
<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
  padding: 10px 5px;
  border-radius: 4px 4px 4px 4px;
  width: 100%;
  background: rgba(143, 164, 204, 0.3);
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}

.condationRow {
  height: 30px;
  line-height: 30px;
  margin-bottom: 0px;
  font-size: 14px;
}

.checkBtn {
  width: 100px;
  height: 20px;
  text-align: center;
  background: #387dff;
}

.about1 {
  background: #103986;
  background: rgb(2, 43, 117);
}

.about {
  width: 100px;
  height: 20px;
  text-align: center;
  background: #103986;
  background: rgba(56, 125, 255, 0.5);
}

.noCheckBtn {
  width: 100px;
  height: 20px;
  text-align: center;
  background: rgba(143, 164, 204, 0.3);
}

::v-deep .editInput {
  width: 100%;
}

::v-deep .title_1 {
  display: inline-block;
  text-align: center;
}

::v-deep .checkButton {
  width: 100%;
  margin-top: 5px;
}

::v-deep .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 0px 0px 0;
  font-size: 14px;
}

::v-deep .cardLeft {
  height: 40px;
  width: 100%;
}

.el-card {
  border-image: linear-gradient(
      90deg,
      rgba(116, 190, 243, 0),
      rgba(75, 241, 255, 0.5),
      rgba(116, 190, 243, 0)
    )
    1 1;
  color: #00d6ea;
  font-weight: bold;
  background: rgba(143, 164, 204, 0.16);

  ::v-deep .el-card__body {
    padding: 0;
    line-height: 40px;
    text-align: center;
  }
}

::v-deep .screenBtn {
  height: 30px;
  margin-left: 10px;
}

::v-deep .el-radio-group .el-radio-button {
  width: 100%;
  border: none;
}

//选中颜色
::v-deep .test .el-radio-group .el-radio-button.is-active {
  width: 100%;
  background: #387dff;
}

.my-5 {
  & > *:not(span) {
    margin-right: 10px;
  }

  & > span {
    margin-right: 4px;
  }
}

::v-deep .el-table thead.is-group th {
  background: transparent;
}

.yield {
  height: 111px;
  border: 1px solid rgb(32, 112, 224);
  border-radius: 5px;
  text-align: center;

  .box {
    margin-top: 40px;
  }
}

.water {
  background-color: rgb(36, 176, 239);
}

.oil {
  background-color: rgb(25, 120, 227);
}

.gas {
  background-color: rgb(148, 56, 244);
}

.liquid {
  background-color: rgb(24, 121, 228);
}

.text {
  margin-top: 10px;
  height: 42px;
  border: 1px solid rgb(32, 112, 224);
  text-align: center;
  line-height: 42px;
  box-shadow: 0px 0px 15px #66ffff inset;
}

.chart {
  // margin-top: 10px;
  height: 120px !important;
  border-radius: 5px;
  text-align: center;
  line-height: 120px;
}

.chartText {
  margin-top: 10px;
  height: 42px;
  border: 1px solid rgb(32, 112, 224);
  text-align: center;
  line-height: 42px;
  box-shadow: 0px 0px 15px #66ffff inset;
}
.detailLinkBtn {
    position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 22px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>


