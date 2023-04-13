 <template>
  <el-container class="layout">
    <el-header height="auto">
      <header-search class="g-w100 g-h100">
        <div class="py-5 overflow-hidden" style="margin-top: 10px; margin-bottom: -5px">
          <div class="fl">
            <span>油田：</span>
            <el-select v-model="selectOilField" disabled @change="getFetchFields">
              <el-option
                v-for="item in oilField"
                :key="item.oilFieldId"
                :label="item.name"
                :value="item.oilFieldId"
                style="color: #fff"
              >
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
                <el-radio-button label="产能类"></el-radio-button>
              </router-link>
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_reserves',
                  params: { oilFieldId: selectOilField, fieldId: selectBlock, canDownload: canDownload },
                }"
              >
                <el-radio-button label="储量类"></el-radio-button>
              </router-link>
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_water',
                  params: { oilFieldId: selectOilField, fieldId: selectBlock, canDownload: canDownload },
                }"
              >
                <el-radio-button label="含水类"></el-radio-button>
              </router-link>
              <el-radio-button label="递减类"></el-radio-button>
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
      <pagePanelNew style="height: 100%; margin-top: 0px">
        <div class="dom" style="margin-top: 0px">
          <el-row :gutter="20" style="margin-top: -20px">
            <el-col :span="12">
              <pagePanel headerTitle="自然递减率" style="width: 100%; height: 380px" :isShowMaxBtn="true">
                <Echart :chart-data="naturalDeclineRate" style="height: 100%"></Echart>
              </pagePanel>
            </el-col>
            <el-col :span="12">
              <pagePanel headerTitle="综合递减率" style="width: 100%; height: 380px" :isShowMaxBtn="true">
                <Echart :chart-data="comprehensiveDeclineRate" style="height: 100%"></Echart
              ></pagePanel>
            </el-col>
          </el-row>
          <el-row class="mt-5" :gutter="20">
            <el-col :span="12">
              <pagePanel headerTitle="总递减率" style="width: 100%; height: 380px" :isShowMaxBtn="true">
                <Echart :chart-data="totalDeclineRate" style="height: 100%"></Echart>
              </pagePanel>
            </el-col>
            <el-col :span="12">
              <pagePanel headerTitle="产量标定法" style="width: 100%; height: 380px" :isShowMaxBtn="true">
                <Echart :chart-data="yieldCalibrationMethod" style="height: 100%"></Echart>
              </pagePanel>
            </el-col>
          </el-row>
          <el-row class="mt-5" :gutter="20">
            <el-col :span="12">
              <pagePanel headerTitle="指标评价结果表" style="width: 100%; height: 380px" :isShowMaxBtn="true">
                <el-table :data="tableData" highlight style="margin-top: 10px">
                  <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                  <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                  <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                  <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                  <el-table-column prop="result" label="结论" align="center"></el-table-column>
                </el-table>
              </pagePanel>
            </el-col>
          </el-row>
        </div>
      </pagePanelNew>
    </el-main>
  </el-container>
</template>
<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchFields, fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {
  natureDeclineChart,
  composiveDeclineChart,
  targetChart,
  declineIndicatorEveluationResult,
  generalDeclineChart,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
export default {
  components: {
    Echart,
    verticalSwitchButton,
  },
  data() {
    return {
      dataList1: [
        { name: "产能类", key: "developmentEffectEvaluation_capacity", isChecked: false },
        { name: "含水类", key: "developmentEffectEvaluation_water", isChecked: false },
        { name: "储量类", key: "developmentEffectEvaluation_reserves", isChecked: false },
        { name: "递减类", key: "developmentEffectEvaluation_Decreasing", isChecked: true },
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

      radio1: "递减类",
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
      //自然递减率
      naturalDeclineRate: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 80,
          type: "inside",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "自然递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
          /*data: [
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ],*/
          axisLabel: {
            color: "#8FA4CC",
            margin: 20,
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
        yAxis: {
          name: "自然递减率(%)",
          nameTextStyle: { color: "#8FA4CC" },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: {
          data: [
            /*-50, -10, -20, 10, -5, -10, -10, -5, 5, 10, -20, -5*/
          ],
          type: "bar",
          label: {
            show: true,
          },
        },
      },
      //综合递减率
      comprehensiveDeclineRate: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 80,
          type: "inside",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "综合递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
          /*data: [
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ],*/
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
        },
        yAxis: {
          name: "综合递减率(%)",
          nameTextStyle: { color: "#8FA4CC" },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [],
            type: "scatter",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            /*symbol: "none",*/
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#49E1F0",
                },
                {
                  offset: 1,
                  color: "#24DEFF",
                },
              ]),
            },
          },
        ],
      },
      //总递减率
      totalDeclineRate: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "总递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "总递减率(%)",
          nameTextStyle: { color: "#8FA4CC" },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [],
            type: "scatter",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            /* symbol: "circle",*/
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#49E1F0",
                },
                {
                  offset: 1,
                  color: "#24DEFF",
                },
              ]),
            },
          },
        ],
      },
      //产量标定法
      yieldCalibrationMethod: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "产量标定法",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
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
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [],
            type: "scatter",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#49E1F0",
                },
                {
                  offset: 1,
                  color: "#24DEFF",
                },
              ]),
            },
          },
        ],
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
    /**
     * hwh
     * 设置页面初始化
     * @returns {Promise<void>}
     */

    selectBtn(item) {
      this.$router.push({
        name: item.key,
        params: {
          oilFieldId: this.oilFieldId,
          fieldId: this.fieldId,
        },
      });
    },
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
      /*this.getNatureDeclineChart(this.selectOilField, this.selectBlock);
        this.getComposiveDeclineChart(this.selectOilField, this.selectBlock);
        this.getTargetChart(this.selectOilField, this.selectBlock);
        this.getDeclineIndicatorEveluationResult(this.selectBlock);*/
      this.doSearch();
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
     * 搜索方法
     */
    doSearch() {
      this.getNatureDeclineChart(this.selectOilField, this.selectBlock);
      this.getComposiveDeclineChart(this.selectOilField, this.selectBlock);
      this.getTargetChart(this.selectOilField, this.selectBlock);
      this.getDeclineIndicatorEveluationResult(this.selectBlock);
      this.getGeneralDeclineChart(this.selectOilField, this.selectBlock);
    },
    /**
     *  hwh
     *  自然递减率
     * @param oilFieldId
     * @param fieldId
     */
    getNatureDeclineChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      natureDeclineChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let barChartData = res.data.data.chart.barDataSets[0].barDatas;
          /*barChartData.forEach((item, index) => {
              let point = [];
              let label = item.label.split('-');
              point.push(label[0] + '-' + label[1]);
              point.push(item.value);
              seriesData.push(point);
            });*/
          seriesData = this.getBarChartSeries(barChartData);
          //console.log(seriesData);
          this.naturalDeclineRate.series.data = seriesData;
        }
      });
    },
    //柱状图
    getBarChartSeries(barChart) {
      let seriesData = [];
      for (let i = 0; i < barChart.length; i++) {
        let barData = {};
        //值大于等于0
        if (barChart[i].value >= 0) {
          barData.value = barChart[i].value;
          let label = barChart[i].label.split("-");
          barData.value = [label[0] + "-" + label[1], barData.value];
          barData.name = label[0] + "-" + label[1];
          barData.label = {
            show: false,
            /*normal: {
                position: "top",
                color: "#fff",
                fontSize: 14,
              },*/
          };
          barData.itemStyle = {
            color: "#1379F7",
          };
          seriesData.push(barData);
        } else {
          //值小于0
          barData.value = barChart[i].value;
          let label = barChart[i].label.split("-");
          barData.value = [label[0] + "-" + label[1], barData.value];
          barData.name = label[0] + "-" + label[1];
          barData.label = {
            show: false,
            /*normal: {
                position: "bottom",
                color: "#fff",
                fontSize: 14,
              },*/
          };
          barData.itemStyle = {
            color: "#FF7135",
          };
          seriesData.push(barData);
        }
      }
      return seriesData;
    },
    /**
     * hwh
     * 综合递减率
     * @param oilFieldId
     * @param fieldId
     */
    getComposiveDeclineChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      composiveDeclineChart(request).then((res) => {
        if (res.data.code == 200) {
          let lineChart = res.data.data.chart.barDataSets[0].barDatas;
          let seriesData = [];
          lineChart.forEach((item, index) => {
            let point = [];
            let label = item.label.split("-");
            point.push(label[0] + "-" + label[1]);
            point.push(item.value);
            seriesData.push(point);
          });
          this.comprehensiveDeclineRate.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  产量标定法
     * @param oilFieldId
     * @param fieldId
     */
    getTargetChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      targetChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let lineChart = res.data.data.chart.linearDataSets[0].linearData;
          lineChart.forEach((item, index) => {
            let point = [];
            point.push(item.label);
            point.push(item.value);
            seriesData.push(point);
          });
          this.yieldCalibrationMethod.series[0].data = seriesData;
        }
      });
    },
    /**
     * hwh
     * 递减类-指标评价结果
     * @param fieldId 区块id，区块全部id 为油田id
     */
    getDeclineIndicatorEveluationResult(fieldId) {
      let request = {
        oilFieldId: fieldId,
      };
      declineIndicatorEveluationResult(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.indicatorEvaluationResults;
        }
      });
    },
    /**
     * hwh
     * 总递减率折线
     * @param oilFieldId
     * @param fieldId
     */
    getGeneralDeclineChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      generalDeclineChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let lineData = res.data.data.chart.lineChartDataSets[0].numberPoints;
          lineData.forEach((item, index) => {
            let point = [];
            point.push(item.x);
            point.push(item.y);
            seriesData.push(point);
          });
          this.totalDeclineRate.series[0].data = seriesData.sort();
        }
      });
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.naturalDeclineRate.toolbox.show = flag;
      this.comprehensiveDeclineRate.toolbox.show = flag;
      this.totalDeclineRate.toolbox.show = flag;
      this.yieldCalibrationMethod.toolbox.show = flag;
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
}
::v-deep .el-radio-button__inner {
  background-color: #031527;
  color: #02c8d3;
  border: 1px solid #00cbdd;
  background: transparent;
}
.el-card {
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
.py-5 {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #00d6ea;
}
</style>
