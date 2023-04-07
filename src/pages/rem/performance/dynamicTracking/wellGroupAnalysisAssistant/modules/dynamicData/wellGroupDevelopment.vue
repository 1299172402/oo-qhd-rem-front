<!--井组开发曲线-->
<template>
  <el-container class="mt-2">
    <el-main>
      <div>
        <el-row>
          <div class="fl" title="井组开发曲线">
            <span>日期</span>
            <el-date-picker
                v-model="selectData"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <Echart ref="echartDown" :chart-data="option" style="height: 700px"></Echart
            >
          </div>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {wellGroupDevLineCharts,} from '@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js';
import FileSaver from "file-saver";

export default {
  components: {
    Echart,
  },
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {}
  },
  data() {
    return {
      //选择时间
      selectData: [new Date('2021-01-01').format('yyyy-MM-dd'), new Date('2021-03-01').format('yyyy-MM-dd')],
      src:"static/img/wellGroupAnalysisAssistant/permeabilityDistribution.png",
      option: {
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          textStyle: {
            color: '#8FA4CC',
            fontSize: 14,
          },
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              pixelRatio: 15,//值越大分辨率越高,下载的图片越清晰
              backgroundColor: '#022644'
            }
          }
        },
        grid: [
          {left: "10%", top: "6%", width: "80%", height: "24%"},
          {left: "10%", top: "36%", width: "80%", height: "24%"},
          {left: "10%", top: "64%", width: "80%", height: "24%"},
        ],
        xAxis: [{
          gridIndex: 0,
          type: "category",
          data: [
            "2018-01",
            "2018-04",
            "2018-06",
            "2018-10",
            "2019-01",
            "2019-04",
            "2019-06",
            "2019-10",
            "2020-01",
            "2020-04",
            "2020-06",
            "2020-10",
          ],
          textStyle: {
            fontSize: 14,
          },
          axisLabel: {
            show: false,
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
          {
            gridIndex: 1,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: "rgba(255,255,255,.16)",
              },
            },
          },
          {
            gridIndex: 2,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              //show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [{
          gridIndex: 0,
          name: "油\n气\n井\n总\n井\n数\n︵\n口\n︶",
          nameLocation: "center",
          nameRotate: 0,
          nameGap: 50,
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          minInterval: 1,
          scale: true,
          axisLabel: {
            show: true,
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //show: false,
            lineStyle: {
              color: "#979797",
            },
          },
          splitLine: {
            show: false,
          },
        },
          {
            gridIndex: 0,
            name: "油\n气\n井\n开\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            minInterval: 1,
            offset: 80,
            position: 'left',
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              // show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 0,
            name: "水\n井\n总\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            minInterval: 1,
            position: 'right',
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 0,
            name: "水\n井\n开\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            minInterval: 1,
            position: 'right',
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //   show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name: "日\n产\n液\n︵\n方\n︶",
            nameLocation: "center",
            nameGap: 50,
            nameRotate: 0,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name: "日\n产\n油\n︵\n方\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: 'left',
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name: "含\n水\n率\n︵\n%\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: 'right',
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name: "注\n采\n比",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name: "累\n积\n注\n采\n比",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            offset: 80,
            position: 'left',
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name: "气\n油\n比\n︵\n方\n/\n方\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: 'right',
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name: "日\n注\n水\n︵\n方\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: 'right',
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
        ]
      },
    };
  },
  mounted() {
    let year = new Date().getFullYear();
    this.selectData = [new Date(year+'-01-01').format('yyyy-MM-dd'),new Date().format('yyyy-MM-dd')];
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /*
     * authm: huangwenhui
     * description: 根据信息生成Echarts图
     * yMessage y轴信息
     * xMessage x轴信息
     * dataMessage 数据信息
     */
    generateEcharts(yMessage, xMessage, dataMessage) {
      //图例模块
      let legend = {
        data: [yMessage],
        left: "4%",
        textStyle: {
          color: "#8FA4CC",
          fontSize: 14,
        },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 6,
        itemGap: 14,
      };
      //提示框
      let tooltip = {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      };
      //x轴信息
      let xAxis = {
        type: "category",
        data: xMessage,
        axisLabel: {
          show: true,
          color: "#8FA4CC",
          textStyle: {
            fontSize: 14,
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.16)",
          },
        },
      };
      //y轴信息
      let yAxis = {
        name: yMessage,
        nameLocation: "center",
        nameRotate: 0,
        nameTextStyle: {
          color: "#fff",
        },
        axisLabel: {
          show: false,
          color: "#8FA4CC",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#979797",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.16)",
            type: "dashed",
          },
        },
      };
      //数据信息
      let series = {
        name: yMessage,
        type: "line",
        data: dataMessage,
        label: {
          show: false,
          color: "#fff",
          fontSize: 14,
        },
        lineStyle: {
          color: "#24DEFF",
        },
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          color: "#24DEFF",
          borderColor: "rgba(255,255,255,0.32)",
          borderWidth: 2,
          borderType: "solid",
        },
      };
      //Echarts 对象
      let option = {
        legend: legend,
        tooltip: tooltip,
        xAxis: xAxis,
        yAxis: yAxis,
        series: series,
      };
      return option;
    },
    /**
     * hwh
     * 根据条件搜索
     * 生成相应的图形
     */
    doSearch() {
      let beginDate = this.selectData[0];
      let endDate = this.selectData[1];
      let request = {
        beginDate: beginDate,
        endDate: endDate,
        fieldId: this.blockId,
        fieldLayerId: this.layerId,
        oilFieldId: this.oilFieldId,
        wellGroupId: this.wellGroupId,
      }
      wellGroupDevLineCharts(request).then((res) => {
        let seriesData = [];
//        let legendData = [];
        let  xSet = new Set();
        if (res.data.code == 0) {
          let lineCharts = res.data.data.charts;
          lineCharts.forEach((chart, index) => {
            let line = chart.linearDataSets;
            line.forEach((chartData,index)=>{
              let series = {};
              let lineName = chartData.label;
              series.type = 'line';
              series.name = lineName;
              let chartDatalabel = chartData.label;
              //数据所属图像
              if (chartDatalabel == '日产液') {
                series.xAxisIndex = 1;
                series.yAxisIndex = 4;
              } else if (chartDatalabel == '日产油') {
                series.xAxisIndex = 1;
                series.yAxisIndex = 5;
              } else if (chartDatalabel == '含水率') {
                series.xAxisIndex = 1;
                series.yAxisIndex = 6;
              } else if (chartDatalabel == '注入量') {
                series.xAxisIndex = 2;
                series.yAxisIndex = 10;
              } else if (chartDatalabel == '注采比') {
                series.xAxisIndex = 2;
                series.yAxisIndex = 7;
              } else if (chartDatalabel == '气油比') {
                series.xAxisIndex = 2;
                series.yAxisIndex = 9;
              } else if (chartDatalabel == '油井总井数') {
                series.xAxisIndex = 0;
                series.yAxisIndex = 0;
              } else if (chartDatalabel == '油井开井数') {
                series.xAxisIndex = 0;
                series.yAxisIndex = 1;
              } else if (chartDatalabel == '水井总井数') {
                series.xAxisIndex = 0;
                series.yAxisIndex = 2;
              } else if (chartDatalabel == '水井开井数') {
                series.xAxisIndex = 0;
                series.yAxisIndex = 3;
              } else if (chartDatalabel == '日注水') {
                series.xAxisIndex = 2;
                series.yAxisIndex = 10;
              } else{
                return true;
              }

              //折线数据
              let lineData = chartData.linearData;
              let pointData=[];
              for (let i = 0; i < lineData.length; i++) {
                let point=[];
                point.push(lineData[i].label);
                xSet.add(lineData[i].label);
                point.push(lineData[i].value);
                pointData.push(point);
              }
              series.data=pointData;
              series.showSymbol = false;
              seriesData.push(series);
            })
          })
        }
        let xData = Array.from(xSet).sort();
        this.option.xAxis[0].data = xData;
        this.option.xAxis[1].data = xData;
        this.option.xAxis[2].data = xData;
        this.option.series = seriesData;
      });
    },
    //获得产液量折线数据解析
    getCylLine(linear) {
      let xData = [];
      let seriesDataAll = [];
      let linearDataAll = linear.linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        //let label = item.label.split('-');
        point.push(item.label);
        xSet.add(item.label);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[0].data = xData;
      this.option.series[0].data = seriesDataAll;
    },
    //获得产油量折线数据解析
    getColLine(linear) {
      let xData = [];
      let seriesDataAll = [];
      let linearDataAll = linear.linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        //let label = item.label.split('-');
        point.push(item.label);
        xSet.add(item.label);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[1].data = xData;
      this.option.series[1].data = seriesDataAll;
    },
    //获得含水率折线数据解析
    getHslLine(linear) {
      let xData = [];
      let seriesDataAll = [];
      let linearDataAll = linear.linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        //let label = item.label.split('-');
        point.push(item.label);
        xSet.add(item.label);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[2].data = xData;
      this.option.series[2].data = seriesDataAll;
    },
    //获得注水量折线数据解析
    getZslLine(linear) {
      let xData = [];
      let seriesDataAll = [];
      let linearDataAll = linear.linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        //let label = item.label.split('-');
        point.push(item.label);
        xSet.add(item.label);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[3].data = xData;
      this.option.series[3].data = seriesDataAll;
    },
    //获得注采比折线数据解析
    getZcbLine(linear) {
      let xData = [];
      let seriesDataAll = [];
      let linearDataAll = linear.linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        //let label = item.label.split('-');
        point.push(item.label);
        xSet.add(item.label);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[4].data = xData;
      this.option.series[4].data = seriesDataAll;
    },
    /**
     * hwh
     * 下载echarts
     */
    doDownLoad(){
      let  res = this.$refs['echartDown'].chart.getDataURL(
          {
            type: 'png',
            pixelRatio: 14,
            backgroundColor: '#022644'
          }
      )
      let fileName = '井组开发曲线';
      if(this.wellGroupName){
        fileName = this.wellGroupName + fileName;
      }
      FileSaver.saveAs(res,fileName);
    }

  },
};
</script>

<style lang="scss" scoped>
</style>