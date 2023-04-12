<template>
  <el-container class="layout">
    <el-header height="auto">
      <header-search class="g-w100 g-h100">
        <div class="py-5 overflow-hidden" style="margin-top: 10px; margin-bottom: -5px">
          <div class="fl">
            <span>油田：</span>
            <el-select v-model="selectOilField" disabled @change="getFetchFields">
              <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
              </el-option>
            </el-select>
            <span class="QU" style="margin-left: 20px">区块：</span>
            <el-select v-model="selectBlock">
              <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId">
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              搜索
            </el-button>
          </div>
          <div class="fr overflow-hidden">
            <!-- <el-radio-group v-model="radio1">
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_capacity',
                  params: { oilFieldId: selectOilField, fieldId: selectBlock, canDownload: canDownload },
                }"
              >
                <el-button class="commonBtn" label="产能类" style="margin-right: -20px"> 产能类 </el-button>
              </router-link>
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_reserves',
                  params: { oilFieldId: selectOilField, fieldId: selectBlock, canDownload: canDownload },
                }"
              >
              </router-link>

              <el-button class="commonBtn" label="含水类" style="margin-right: 10px"> 含水类 </el-button>

              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_Decreasing',
                  params: { oilFieldId: selectOilField, fieldId: selectBlock, canDownload: canDownload },
                }"
              >
              </router-link>
            </el-radio-group> -->

            <vertical-switch-button
              :data-list="dataList1"
              button-width="120px"
              button-height="40px"
              style="width: 9%"
              btn-direction="row"
              @selectBtn="selectBtn"
            />
          </div>
        </div>
      </header-search>
    </el-header>
    <el-main>
      <!-- <pagePanelNew style="height: 100%; margin-top: 0px"> -->
      <div class="dom" style="margin-top: 0px">
        <el-row :gutter="20" style="margin-top: -20px">
          <el-col :span="12">
            <pagePanel headerTitle="含水上升率" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <Echart :chart-data="rateOfWaterCutRise" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
          <el-col :span="12">
            <pagePanel headerTitle="水驱指数" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <Echart :chart-data="recoveryDegree" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
        </el-row>
        <el-row class="mt-5" :gutter="20">
          <el-col :span="12">
            <pagePanel headerTitle="存水率" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <Echart :chart-data="waterRate" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
          <el-col :span="12">
            <pagePanel headerTitle="指标评价结果表" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <div>
                <el-table :data="tableData" highlight style="margin-top: 10px" height="260">
                  <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                  <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                  <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                  <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                  <el-table-column label="理论值" align="center">
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.theoryValue"
                        :controls="false"
                        style="width: 80px"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column label="与理论值对比差值" align="center">
                    <template slot-scope="scope">
                      <span>{{
                        (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="result" label="结论" align="center"></el-table-column>
                </el-table></div
            ></pagePanel>
          </el-col>
        </el-row>
      </div>
      <!-- </pagePanelNew> -->
    </el-main>
  </el-container>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchFields, fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {
  waterContainRaiseChart,
  waterIndicatorChart,
  waterSotreRateChart,
  indicatorResult,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
export default {
  components: {
    Echart,
    verticalSwitchButton,
  },
  filters: {
    toFixNumberFour(val) {
      return val.toFixed(4);
    },
  },
  data() {
    return {
      dataList1: [
        { name: "产能类", key: "developmentEffectEvaluation_capacity", isChecked: false },
        { name: "储量类", key: "developmentEffectEvaluation_reserves", isChecked: false },
        { name: "含水类", key: "developmentEffectEvaluation_water", isChecked: true },
        { name: "递减类", key: "developmentEffectEvaluation_Decreasing", isChecked: false },
      ],
      //油田
      oilField: [],
      //油田名字
      oilFieldName: "",
      //油田选中值
      selectOilField: "",
      //区块
      block: [],
      //区块选中值
      selectBlock: "",
      radio1: "含水类",
      //查询参数
      queryParams: {},
      page: 1,
      pageSize: 10,
      //油田列表
      oilFieldList: [
        {
          value: "QHD32-6",
          label: "秦皇岛32-6油田",
        },
      ],
      //区域列表
      areaList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "区块1",
          label: "区块1",
        },
      ],
      //含水上升率
      rateOfWaterCutRise: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 0,
          type: "inside",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "含水上升率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
          data: [
            /*"油田1", "油田2", "Ⅰ期", "Ⅱ期", "理论曲线"*/
          ],
        },
        xAxis: {
          name: "含水率(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          //min:90,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        yAxis: {
          name: "含水上升率(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 35,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
        series: [],
      },
      //采出程度
      recoveryDegree: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
          data: ["累计水驱指数", "累积注采比", "月水驱指数"],
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "水驱指数",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "采出程度(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          //max: 60,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        yAxis: [
          {
            name: "累计水驱指数，累积注采比(%)",
            nameLocation: "center",
            nameTextStyle: { color: "#8FA4CC" },
            nameGap: 35,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: "#8FA4CC",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#8FA4CC",
              },
            },
          },
          {
            name: "阶段水驱指数(%)",
            nameLocation: "center",
            nameTextStyle: { color: "#8FA4CC" },
            nameGap: 35,
            type: "value",
            axisLabel: {
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
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
        series: [],
      },
      //存水率
      waterRate: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "存水率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "采出程度(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        yAxis: {
          name: "存水率(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 35,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
        series: [],
      },
      //指标评价结果表
      tableData: [],
      canDownload: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    selectBtn(item) {
      this.$router.push({
        name: item.key,
        params: { oilFieldId: this.selectOilField, fieldId: this.selectBlock, canDownload: this.canDownload },
      });
    },
    /**
     * hwh
     * 设置页面初始化
     * @returns {Promise<void>}
     */
    async initData() {
      this.canDownload = this.$route.params.canDownload;
      this.downPower(this.canDownload);
      //调用油田接口
      await fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilField = res.data.data.oilFields;
          if (this.oilField.length == 0) {
            this.selectOilField = "";
          } else {
            this.selectOilField = this.oilField[0].oilFieldId;
          }
        }
      });
      let oilFieldId = this.$route.params.oilFieldId;
      if (oilFieldId == undefined) {
        //设置默认油田
        this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
      } else {
        this.selectOilField = oilFieldId;
      }
      let requestFields = {
        oilFieldId: this.selectOilField,
      };
      //获得区块信息
      await fetchFields(requestFields).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          //区块全部为油田的id。
          this.selectBlock = this.selectOilField;
        }
      });
      let fieldId = this.$route.params.fieldId;
      if (fieldId) {
        this.selectBlock = fieldId;
      }
      this.doSearch();
    },
    doSearch() {
      this.getWaterContainRaiseChart(this.selectOilField, this.selectBlock);
      this.getWaterIndicatorChart(this.selectOilField, this.selectBlock);
      this.getWaterSotreRateChart(this.selectOilField, this.selectBlock);
      this.getIndicatorResult(this.selectOilField, this.selectBlock);
    },
    /**
     * hwh
     * 获得区块信息
     * @param oilFieldId
     */
    getFetchFields(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      fetchFields(request).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          //区块全部为油田的id。
          this.selectBlock = oilFieldId;
        }
      });
    },
    /**
     * hwh
     * 含水上升率
     * @param oilFieldId 油田id
     * @param fieldId 区块id
     */
    getWaterContainRaiseChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      waterContainRaiseChart(request).then((res) => {
        if (res.data.code == 200) {
          let legendData = [];
          let seriesData = [];
          let lineCharts = res.data.data.chart.lineChartDataSets;
          lineCharts.forEach((item, index) => {
            legendData.push(item.label);
            seriesData.push(this.waterContainRaiseLine(item));
          });
          this.rateOfWaterCutRise.legend.data = legendData;
          this.rateOfWaterCutRise.series = seriesData;
        }
      });
    },
    /**
     * hwh
     * 含水率上升折线解析
     * @param lineChart
     * @returns {{}}
     */
    waterContainRaiseLine(lineChart) {
      let series = {};
      series.type = "line";
      series.smooth = true;
      series.name = lineChart.label;
      series.symbol = "none";
      if (lineChart.label == "含水上升率") {
        series.type = "scatter";
        series.symbol = "circle";
        series.symbolSize = 8;
      }
      let seriesData = [];
      let lineData = lineChart.numberPoints;
      lineData.forEach((item, index) => {
        let point = [];
        point.push(item.x);
        point.push(item.y);
        seriesData.push(point);
      });
      //seriesData.sort();
      series.data = seriesData;
      return series;
    },
    /**
     * hwh
     * 驱水指数
     * @param oilFieldId
     * @param fieldId
     */
    getWaterIndicatorChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      waterIndicatorChart(request).then((res) => {
        if (res.data.code == 200) {
          let legendData = [];
          let seriesData = [];
          let lineChartS = res.data.data.chart.lineChartDataSets;
          lineChartS.forEach((item, index) => {
            legendData.push(item.label);
            seriesData.push(this.waterIndicatorLine(item));
          });
          this.recoveryDegree.legend.data = legendData;
          this.recoveryDegree.series = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  驱水指数折线解析
     * @param lineChart
     * @returns {{}}
     */
    waterIndicatorLine(lineChart) {
      let series = {};
      series.type = "line";
      series.symbol = "none";
      series.name = lineChart.label;
      let label = lineChart.label;
      if (label == "累计水驱指数" || label == "累计注采比") {
        series.yAxisIndex = 0;
      } else if (label == "月水驱指数") {
        series.yAxisIndex = 1;
      }
      let lineData = lineChart.numberPoints;
      let seriesData = [];
      lineData.forEach((item, index) => {
        let point = [];
        point.push(item.x);
        point.push(item.y);
        seriesData.push(point);
      });
      series.data = seriesData;
      return series;
    },
    /**
     *  hwh
     *  存水率
     * @param oilFieldId
     * @param fieldId
     */
    getWaterSotreRateChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      waterSotreRateChart(request).then((res) => {
        if (res.data.code == 200) {
          let legendData = [];
          let seriesData = [];
          let lineCharts = res.data.data.chart.lineChartDataSets;
          lineCharts.forEach((item, index) => {
            if (item.label == "阶段存水率" || item.label == "累计存水率") {
              legendData.push(item.label);
            } else {
              legendData.push("Rm=" + item.label);
            }

            seriesData.push(this.waterSotreRateLine(item));
          });
          this.waterRate.legend.data = legendData;
          this.waterRate.series = seriesData;
        }
      });
    },
    /**
     * hwh
     * 存水率折线数据解析
     * @param lineChart
     */
    waterSotreRateLine(lineChart) {
      let series = {};
      series.type = "line";
      series.smooth = true;
      let label = lineChart.label;
      if (lineChart.label == "阶段存水率" || lineChart.label == "累计存水率") {
        label = lineChart.label;
      } else {
        label = "Rm=" + label;
      }
      series.name = label;
      series.symbol = "none";
      let lineData = lineChart.numberPoints;
      let seriesData = [];
      lineData.forEach((item, index) => {
        let point = [];
        point.push(item.x);
        point.push(item.y);
        seriesData.push(point);
      });
      series.data = seriesData;
      return series;
    },
    /**
     * hwh
     *  指标评价结果
     * @param oilFieldId
     * @param fieldId
     */
    getIndicatorResult(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      indicatorResult(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.indicatorEvaluationResults;
        }
      });
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.rateOfWaterCutRise.toolbox.show = flag;
      this.recoveryDegree.toolbox.show = flag;
      this.waterRate.toolbox.show = flag;
    },
  },
};
</script>
<style lang="scss" scoped>
.QU {
  padding-left: 10px;
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}
.basicTable {
  height: auto;
  // padding-bottom: 10px;
}
.el-card {
  //border-width: 1px 0;
  //border-radius: 0;
  border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
  color: #00d6ea;
  font-weight: bold;
  background: rgba(143, 164, 204, 0.16);

  ::v-deep .el-card__body {
    padding: 0;
    line-height: 40px;
  }
}
::v-deep .el-table .cell:empty::before {
  content: "-";
}
::v-deep .el-radio-button__inner {
  background-color: #031527;
  color: #02c8d3;
  border: 1px solid #00cbdd;
  background: transparent;
}
.py-5 {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #00d6ea;
}
</style>
