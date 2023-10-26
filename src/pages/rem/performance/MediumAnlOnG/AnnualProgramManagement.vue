<!-- 年度计划管理 -->
<template>
  <el-container class="layout">
    <el-header height="auto"> </el-header>
    <el-container>
      <el-header class="contHeader" height="auto">
        <header-search style="height: 70px">
          <div style="margin-top: 12px">
            <span>油田：</span>
            <el-select v-model="selectOilField" placeholder="请选择" disabled>
              <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
              </el-option>
            </el-select>
            <span style="margin-left: 20px">日期：</span>
            <el-date-picker v-model="selectYear" type="year" format="yyyy" value-format="yyyy" placeholder="选择年">
            </el-date-picker>
            <el-button icon="el-icon-search" type="primary" @click="doSearch" style="margin-left: 20px">搜索</el-button>
            <el-radio-group v-model="pageType" style="margin-left: 10px" @change="changeTab">
              <el-radio-button
                label="原油产量"
                checked
                style="margin-left: 10px"
                size="medium"
                type="primary"
                class="buttonActive_primary"
              ></el-radio-button>
              <el-radio-button
                label="天然气产量"
                style="margin-left: 10px"
                size="medium"
                class="spaceMargin" 
              ></el-radio-button>
              <el-radio-button
                label="油田注水量"
                style="margin-left: 10px"
                size="medium"
                class="spaceMargin"
                type="primary"
              ></el-radio-button>
            </el-radio-group>
            <!-- 头部按钮的切换 -->
            <!-- <vertical-switch-button
              :data-list="dataList1"
              button-width="120px"
              button-height="30px"
              style="width: 9%"
              btn-direction="row"
              @selectBtn="selectBtn"
            /> -->
            <div v-if="pageType == '原油产量'" style="float: right">
              <span style="margin-right: 10px">单位选择：</span>
              <el-select v-model="selectUnitOfProduction" placeholder="请选择" style="width: 100px; margin-right: 10px">
                <el-option v-for="item in unitOfProduction" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button class="commonBtn" @click="doSearch"> 确实 </el-button>
            </div>
          </div>
        </header-search>
      </el-header>
      <el-main>
        <template v-if="pageType == '原油产量'">
          <info-window
            info-width="100%"
            info-height="100%"
            :header-title="oilFieldName + '油田年度计划运行曲线'"
            :is-show-max-btn="true"
            style="margin-top: -20px"
          >
            <div style="text-align: center">
              <el-button class="commonBtn" style="float: right" @click="switchToCrudeOutput"> 详情 </el-button>
            </div>
            <Echart :chart-data="productLineChart" width="94%" height="400px"></Echart>
          </info-window>

          <info-window
            info-width="100%"
            info-height="100%"
            :header-title="oilFieldName + '油田年度计划运行'"
            :is-show-max-btn="true"
            style="margin-top: 10px"
          >
            <template slot="header">
              <div style="float: right; line-height: 30px; padding-right: 20px">
                <el-button size="mini" @click="doDownYYCL" v-show="canDownload">下载</el-button>
              </div>
            </template>
            <el-table id="yyclcsv" highlight :data="runTimeData" style="width: 100%">
              <el-table-column type="index" align="center" label="序号" :index="indexMethodOilProduct">
              </el-table-column>
              <el-table-column prop="theDate" align="center" :label="`时间\n(yyyy-mm-dd)`"> </el-table-column>
              <el-table-column
                prop="oilAudit"
                align="center"
                :label="currentUnitType == 'm' ? '考核日产(m³)' : '考核日产(t)'"
              >
              </el-table-column>
              <el-table-column
                prop="oilReal"
                align="center"
                :label="currentUnitType == 'm' ? '实际日产(m³)' : '实际日产(t)'"
              >
              </el-table-column>
              <el-table-column
                property="sumPlan"
                prop="sumPlan"
                align="center"
                :label="currentUnitType == 'm' ? '计划年累产(10⁴m³)' : '计划年累产(10⁴t)'"
              >
              </el-table-column>
              <el-table-column
                prop="sumReal"
                align="center"
                :label="currentUnitType == 'm' ? '实际年累产(10⁴m³)' : '实际年累产(10⁴t)'"
              >
              </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <pagination
              :total="pageCountOilProduct"
              :page.sync="currentPageOfRuntime"
              :limit.sync="pageSizeOilProduct"
            />
          </info-window>
        </template>
        <template v-else-if="pageType == '天然气产量'">
          <info-window
            info-width="100%"
            info-height="100%"
            :header-title="oilFieldName + '油田天然气产量跟踪'"
            :is-show-max-btn="true"
            style="margin-top: -20px"
          >
            <Echart :chart-data="GasProLineChart" height="400px"></Echart>
          </info-window>
        </template>
        <template v-else>
          <!-- 油田年度计划运行曲线 -->
          <info-window
            info-width="100%"
            info-height="100%"
            :header-title="oilFieldName + '油田年度计划运行曲线'"
            :is-show-max-btn="true"
            style="margin-top: -20px"
          >
            <div style="text-align: center" class="f1">
              <el-button class="commonBtn" style="float: right" @click="switchToOilfieldWater">详情 </el-button>
            </div>
            <Echart :chart-data="OilYearLineChart" width="94%" height="400px"></Echart>
          </info-window>
          <!-- 油田年度计划运行 -->
          <info-window
            info-width="100%"
            info-height="100%"
            :header-title="oilFieldName + '油田年度计划运行'"
            :is-show-max-btn="true"
            style="margin-top: 10px"
          >
            <template slot="header">
              <div style="float: right; line-height: 30px; padding-right: 20px">
                <el-button size="mini" @click="doDownYTZSL" v-show="canDownload">下载</el-button>
              </div>
            </template>
            <el-table id="ytzslcsv" highlight :data="oilYearData" style="width: 100%">
              <el-table-column type="index" align="center" label="序号" :index="indexMethodInjection">
              </el-table-column>
              <el-table-column prop="theDate" align="center" :label="`时间\n(yyyy-mm-dd)`"> </el-table-column>
              <el-table-column prop="injectionDailyReal" align="center" label="实际日注入量(m³)"> </el-table-column>
              <el-table-column prop="injectionDailyPlan" align="center" label="计划日注入量(m³)"> </el-table-column>
              <el-table-column
                property="injectionSumReal"
                align="center"
                label="实际年累注(10⁴m³)"
                :formatter="toPrecise2"
              >
              </el-table-column>
              <el-table-column prop="injectionSumPlan" align="center" label="计划年累注(10⁴m³)"> </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <pagination
              :total="pageCountOilProduct"
              :page.sync="currentPageOfRuntime"
              :limit.sync="pageSizeOilProduct"
            />
          </info-window>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>
  <script>
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {
  searchOilProductionChart,
  searchOilProductionTable,
  searchGasChart,
  searchInjectionTable,
  searchInjectionChart,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import { exportExcel } from "@/lib/exportExcel";
import { getWidgetByAreaUser } from "@/api/oilDeposit/rmm-01/rmm01";
export default {
  components: {
    verticalSwitchButton,
    Echart,
  },
  data() {
    return {
      dataList1: [
        { name: "原油产量", key: "", isChecked: true },
        { name: "天然气产量", key: "", isChecked: false },
        { name: "油田注水量", key: "", isChecked: false },
      ],
      //当前油田名称
      oilFieldName: "",
      //选择页面
      pageType: "原油产量",
      //油田
      oilField: [],
      //油田选中值
      selectOilField: "",
      //年份
      selectYear: new Date().format("yyyy"),
      //产量单位
      unitOfProduction: [
        {
          label: "m³/d",
          value: "m",
        },
        {
          label: "t/d",
          value: "t",
        },
      ],
      //产量单位选择值
      selectUnitOfProduction: "m",
      //当前单位
      currentUnitType: "m",
      //原油产量 当前页
      currentPageOfRuntime: 1,
      //原油产量 每页大小
      pageSizeOilProduct: 10,
      //原油产量 数据总量
      pageCountOilProduct: 0,
      //油田注水量 当前页
      currentPageOfOilYear: 1,
      //油田注水量 每页大小 默认为 10
      pageSizeInjection: 10,
      //油田注水量 总数
      pageCountInjection: 0,
      //原油产量 折线图
      productLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "原油产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          top: "8%",
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
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
          },
        ],
        yAxis: [
          {
            name: "日产m³/d",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            type: "value",
            scale: true,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
          {
            name: "年产10⁴m³",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
        ],
        series: [],
      },
      //油田年度计划运行
      runTimeData: [],
      //折线图
      GasProLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C"],
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
              name: "天然气产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          top: "8%",
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "时间/日",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          nameGap: 55,
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            interval: function (index, val) {
              if (val.substr(-2) == "01") {
                return true;
              } else {
                return false;
              }
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
        },
        yAxis: [
          {
            name: "产气量(10⁴m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
          {
            name: "油当量(折算)(10⁴m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            minInterval: 0.01,
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
        ],
        series: [],
      },
      //折线图
      OilYearLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "油田注水量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          top: "8%",
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            interval: function (index, val) {
              if (val.substr(-2) == "01") {
                return true;
              } else {
                return false;
              }
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
        },
        yAxis: [
          {
            name: "日注水量m³/d",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
          {
            name: "年注水量10⁴m³",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
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
        ],
        series: [],
      },
      //油田年度计划运行
      oilYearData: [],
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
    };
  },
  mounted() {
    this.initData();
    this.getPageAuthMessage();
  },
  methods: {
    selectBtn(item) {
      //发现油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //油田名称
      this.oilFieldName = oilFieldContent.name;
      if (item == "原油产量") {
        this.getSearchOilProductionChart(this.selectOilField, this.selectUnitOfProduction);
        this.getSearchOilProductionTable(
          this.selectOilField,
          this.selectUnitOfProduction,
          this.currentPageOfRuntime,
          this.pageSizeOilProduct,
        );
      } else if (item == "天然气产量") {
        this.getSearchGasChart(this.selectOilField);
      } else if (item == "油田注水量") {
        this.getSearchInjectionChart(this.selectOilField);
        this.getSearchInjectionTable(this.selectOilField, this.currentPageOfOilYear, this.pageSizeInjection);
      }
    },
    //原油产量跳转详情页面
    switchToCrudeOutput() {
      let oilField = this.oilField.find((item) => {
        return item.oilFieldId == this.selectOilField;
      });

      this.$router.push({
        name: "CrudeOutput",
        params: {
          oilFieldId: oilField.oilFieldId,
          oilFieldName: oilField.name,
          unitType: this.selectUnitOfProduction,
          canDownload: this.canDownload,
          selectYear: this.selectYear,
        },
      });
    },
    //油田注水跳转详情页面
    switchToOilfieldWater() {
      let oilField = this.oilField.find((item) => {
        return item.oilFieldId == this.selectOilField;
      });
      this.$router.push({
        name: "OilfieldWaterInjectionManagement",
        params: {
          oilFieldId: oilField.oilFieldId,
          oilFieldName: oilField.name,
          unitType: this.selectUnitOfProduction,
          canDownload: this.canDownload,
          selectYear: this.selectYear,
        },
      });
    },
    /**
     * hwh
     * 初始化信息
     */
    async initData() {
      await fetchOilFields().then((res) => {
        this.oilField = res.data.data.oilFields;
        if (this.oilField.length == 0) {
          this.selectOilField = "";
        } else {
          this.selectOilField = this.oilField[0].oilFieldId;
        }
      });
      //设置默认油田
      this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
      //发现油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //油田名称
      this.oilFieldName = oilFieldContent.name;
      //原油产量 折线图
      this.getSearchOilProductionChart(this.selectOilField, this.selectUnitOfProduction);
      //原油产量 数据表
      this.getSearchOilProductionTable(
        this.selectOilField,
        this.selectUnitOfProduction,
        this.currentPageOfRuntime,
        this.pageSizeOilProduct,
      );
    },
    /**
     *  hwh
     *  Date 2021-03-02
     *  年度计划 原油产量统计图
     * @param oilFieldId 油田id
     * @param unitType  单位选择
     */
    getSearchOilProductionChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      searchOilProductionChart(request).then((res) => {
        //图表数据
        let legendData = [];
        //数据数组
        let seriesData = [];
        //判断当前请求是否成功
        if (res.data.code == 200) {
          let charDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < charDataS.length; i++) {
            //获得每一个折线数据
            let linearChart = charDataS[i];
            //向图例中添加 折线名称
            if (linearChart.label != "实际年产" && linearChart.label != "计划年产") {
              legendData.push(linearChart.label);
            } else if (linearChart.label == "实际年产") {
              legendData.push("实际年累产");
            } else if (linearChart.label == "计划年产") {
              legendData.push("计划年累产");
            }
            //向数据数组中添加 所有折线的信息
            seriesData.push(this.getLinearChartSeriesOilProduct(linearChart));
          }
          //图例数据
          this.productLineChart.legend.data = legendData;
          //各线的数据
          this.productLineChart.series = seriesData;
          if (unitType == "m") {
            this.productLineChart.yAxis[0].name = "日产m³/d";
            this.productLineChart.yAxis[1].name = "年产10⁴m³";
          } else if (unitType == "t") {
            this.productLineChart.yAxis[0].name = "日产t/d";
            this.productLineChart.yAxis[1].name = "年产10⁴t";
          }
        } else {
          //图例数据
          this.productLineChart.legend.data = legendData;
          //各线的数据
          this.productLineChart.series = seriesData;
          if (unitType == "m") {
            this.productLineChart.yAxis[0].name = "日产m³/d";
            this.productLineChart.yAxis[1].name = "年产10⁴m³";
          } else if (unitType == "t") {
            this.productLineChart.yAxis[0].name = "日产t/d";
            this.productLineChart.yAxis[1].name = "年产10⁴t";
          }
        }
      });
    },
    /**
     * hwh
     *  date 2021-03-02
     *  原油产量 折线图数据解析
     * @param linearChart 折线图数据
     */
    getLinearChartSeriesOilProduct(linearChart) {
      // 单折线数据结构
      let series = {};
      series.name = linearChart.label;
      series.type = "line";
      series.symbol = "none";
      let label = linearChart.label;
      if (label == "实际日产") {
        series.yAxisIndex = 0;
      } else if (label == "考核日产") {
        series.yAxisIndex = 0;
      } else if (label == "滚动预测") {
        series.yAxisIndex = 0;
      } else if (label == "实际年产") {
        series.yAxisIndex = 1;
        series.name = "实际年累产";
      } else if (label == "计划年产") {
        series.yAxisIndex = 1;
        series.name = "计划年累产";
      } else if (label == "剩余水平") {
        series.yAxisIndex = 0;
      }
      let seriesData = [];
      let chartData = linearChart.linearData;
      for (let i = 0; i < chartData.length; i++) {
        let point = [];
        //放入带入点
        point.push(chartData[i].label);
        point.push(chartData[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    //原油产量 表格数据获取
    /**
     *  hwh date 2021-03-02
     *  原油产量 表格数据
     * @param oilFieldId
     * @param unitType
     * @param page
     * @param pageSize
     */
    getSearchOilProductionTable(oilFieldId, unitType, page, pageSize) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        page: page,
        pageSize: pageSize,
        year: this.selectYear,
      };
      searchOilProductionTable(request).then((res) => {
        //结果获得成功
        if (res.data.code == 200) {
          //获取数据
          this.runTimeData = res.data.data.oilProduces;
          //获得总数
          this.pageCountOilProduct = res.data.data.total;
          //修改当前单位
          this.currentUnitType = unitType;
        } else {
          //获取数据
          this.runTimeData = [];
          //获得总数
          this.pageCountOilProduct = 0;
        }
      });
    },
    /**
     * hwh
     * 原油产量分页 自定义索引
     *
     */
    indexMethodOilProduct(index) {
      index = index + 1 + (this.currentPageOfRuntime - 1) * this.pageSizeOilProduct;
      return index;
    },
    /**
     *  hwh
     *  原油产量分页 改变当前页数 date 2021-03-02
     * @param pageValue 页数值
     */
    handleOilProductChangePage(pageValue) {
      //this.currentPageOfRuntime=1;
      let oilFieldId = this.selectOilField;
      let unitType = this.currentUnitType;
      let page = pageValue;
      let pageSize = this.pageSizeOilProduct;
      this.getSearchOilProductionTable(oilFieldId, unitType, page, pageSize);
    },
    /**
     *  hwh
     *  原油产量分页改变页大小 date 2021-03-02
     * @param rowsValue 行数
     */
    handleOilProductChangePageSize(rowsValue) {
      this.pageSizeOilProduct = rowsValue;
      let oilFieldId = this.selectOilField;
      let unitType = this.currentUnitType;
      let page = this.currentPageOfRuntime;
      let pageSize = rowsValue;
      this.getSearchOilProductionTable(oilFieldId, unitType, page, pageSize);
    },
    /**
     *  hwh date 2021-03-02
     *  年度计划 天然气统计图
     * @param oilFieldId
     */
    getSearchGasChart(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.selectYear,
      };
      searchGasChart(request).then((res) => {
        //图例中信息
        let legendData = [];
        //折线数据信息
        let seriesData = [];
        //请求成功 获得数据
        if (res.data.code == 200) {
          //获得图表中数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            seriesData.push(this.getLinearChartSeriesGasChart(chartDataS[i]));
          }
          //获得图例结果赋值
          this.GasProLineChart.legend.data = legendData;
          //获得折线数据结果赋值
          this.GasProLineChart.series = seriesData;
        } else {
          //获得图例结果赋值
          this.GasProLineChart.legend.data = legendData;
          //获得折线数据结果赋值
          this.GasProLineChart.series = seriesData;
        }
      });
    },
    /**
     *  hwh date 2021-03-02
     *  天然气统计图 解析折线数据 拼接折线数据
     * @param linearChart 折线数据
     */
    getLinearChartSeriesGasChart(linearChart) {
      let series = {};
      series.name = linearChart.label;
      series.type = "line";
      series.symbol = "none";
      let labelName = linearChart.label;
      if (labelName == "产气量") {
        series.yAxisIndex = 0;
      } else if (labelName == "油当量（折算）") {
        series.yAxisIndex = 1;
      }
      let seriesData = [];
      let lineData = linearChart.linearData;
      for (let i = 0; i < lineData.length; i++) {
        let point = [];
        point.push(lineData[i].label);
        point.push(lineData[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    /**
     *  hwh Date 2021-03-02
     *  年度计划 注水量统计图
     * @param oilFieldId 油田id
     */
    getSearchInjectionChart(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.selectYear,
      };
      searchInjectionChart(request).then((res) => {
        //图例数据集
        let legendData = [];
        //折线数据集
        let seriesData = [];
        let xSet = new Set();
        let xData = [];
        if (res.data.code == 200) {
          let chartDatas = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDatas.length; i++) {
            if (chartDatas[i].label == "滚动预测") {
              legendData.push("预测注水量");
            } else {
              legendData.push(chartDatas[i].label);
            }
            seriesData.push(this.getLinearChartInjectionChart(chartDatas[i], xSet));
          }
          xData = Array.from(xSet).sort();
          this.OilYearLineChart.legend.data = legendData;
          this.OilYearLineChart.series = seriesData;
          this.OilYearLineChart.xAxis.data = xData;
        } else {
          this.OilYearLineChart.legend.data = legendData;
          this.OilYearLineChart.series = seriesData;
          this.OilYearLineChart.xAxis.data = xData;
        }
      });
    },
    /**
     *  hwh date 2021-03-02
     *  年度计划 注水量统计图 折线数据解析
     * @param linearChart 折线数据
     */
    getLinearChartInjectionChart(linearChart, xSet) {
      //结果数据
      let series = {};
      series.name = linearChart.label;
      series.type = "line";
      series.symbol = "none";
      let labelName = linearChart.label;
      //如果滚动预测
      if (labelName == "滚动预测") {
        series.name = "预测注水量";
      }
      if (labelName == "实际日注入量" || labelName == "滚动预测" || labelName == "计划日注入量") {
        series.yAxisIndex = 0;
      } else if (labelName == "实际年累注" || labelName == "计划年累注") {
        series.yAxisIndex = 1;
      }
      let seriesData = [];
      let lineData = linearChart.linearData;
      for (let i = 0; i < lineData.length; i++) {
        let point = [];
        xSet.add(lineData[i].label);
        point.push(lineData[i].label);
        point.push(lineData[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    /**
     *  hwh date 2021-03-02
     *  年度计划 注水量统计表
     * @param oilFieldId 油田id
     */
    getSearchInjectionTable(oilFieldId, page, pageSize) {
      let request = {
        oilFieldId: oilFieldId,
        page: page,
        pageSize: pageSize,
        year: this.selectYear,
      };
      searchInjectionTable(request).then((res) => {
        //成功获取数据
        if (res.data.code == 200) {
          //表格数据赋值
          this.oilYearData = res.data.data.waterInjections;
          //获得总页数
          this.pageCountInjection = res.data.data.total;
        } else {
          //表格数据赋值
          this.oilYearData = [];
          //获得总页数
          this.pageCountInjection = 0;
        }
      });
    },
    /**
     * hwh
     * 原油产量分页 自定义索引
     *
     */
    indexMethodInjection(index) {
      index = index + 1 + (this.currentPageOfOilYear - 1) * this.pageSizeInjection;
      return index;
    },
    /**
     *  hwh
     *  原油产量分页 改变当前页数 date 2021-03-02
     * @param pageValue 页数值
     */
    handleInjectionChangePage(pageValue) {
      let oilFieldId = this.selectOilField;
      let page = pageValue;
      let pageSize = this.pageSizeInjection;
      this.getSearchInjectionTable(oilFieldId, page, pageSize);
    },
    /**
     *  hwh
     *  原油产量分页改变页大小 date 2021-03-02
     * @param rowsValue 行数
     */
    handleInjectionChangePageSize(rowsValue) {
      this.pageSizeInjection = rowsValue;
      let oilFieldId = this.selectOilField;
      let page = this.currentPageOfOilYear;
      let pageSize = rowsValue;
      this.getSearchInjectionTable(oilFieldId, page, pageSize);
    },
    /**
     * hwh
     * 切换tab标签 默认加载相关数据
     * @param val
     */
    changeTab(val) {
      //发现油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //油田名称
      this.oilFieldName = oilFieldContent.name;
      if (val == "原油产量") {
        this.getSearchOilProductionChart(this.selectOilField, this.selectUnitOfProduction);
        this.getSearchOilProductionTable(
          this.selectOilField,
          this.selectUnitOfProduction,
          this.currentPageOfRuntime,
          this.pageSizeOilProduct,
        );
      } else if (val == "天然气产量") {
        this.getSearchGasChart(this.selectOilField);
      } else if (val == "油田注水量") {
        this.getSearchInjectionChart(this.selectOilField);
        this.getSearchInjectionTable(this.selectOilField, this.currentPageOfOilYear, this.pageSizeInjection);
      }
    },
    /**
     * hwh
     * 查询事件
     */
    doSearch() {
      //发现油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //油田名称
      this.oilFieldName = oilFieldContent.name;
      if (this.pageType == "原油产量") {
        this.getSearchOilProductionChart(this.selectOilField, this.selectUnitOfProduction);
        this.getSearchOilProductionTable(
          this.selectOilField,
          this.selectUnitOfProduction,
          this.currentPageOfRuntime,
          this.pageSizeOilProduct,
        );
      } else if (this.pageType == "天然气产量") {
        this.getSearchGasChart(this.selectOilField);
      } else if (this.pageType == "油田注水量") {
        this.getSearchInjectionChart(this.selectOilField);
        this.getSearchInjectionTable(this.selectOilField, this.currentPageOfOilYear, this.pageSizeInjection);
      }
      this.$forceUpdate();
    },
    /**
     * hwh
     * 导出原油产量CSV文件
     */
    doDownYYCL() {
      exportExcel("#yyclcsv", "原油产量");
    },
    /**
     * hwh
     * 导出油田注水量CSV文件
     */
    doDownYTZSL() {
      exportExcel("#ytzslcsv", "油田注水量");
    },
    /**
     * hwh
     * 获取当前页面的权限内容，并处理其逻辑问题
     */
    getPageAuthMessage() {
      //禁止权限内容
      this.downPower(false);
      // this.userInfo = VSAuth.getAuthInfo();
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = "znytglxt";
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({ areaCode: areaCode, loginName: loginName }).then((res) => {
        let myList = res.data.dataList;
        if (myList) {
          let pageMes = myList.find((item) => {
            return item.resPvalue == myPath;
          });
          if (pageMes) {
            this.myWidget = pageMes.widgetList;
          }
          if (this.myWidget) {
            for (let indexNum in this.myWidget) {
              try {
                let myWidgetItem = this.myWidget[indexNum];
                switch (myWidgetItem.widgetCode) {
                  case "addInfo":
                    this.canAddInfo = true;
                    break;
                  case "updateInfo":
                    this.canUpdateInfo = true;
                    break;
                  case "sendInfo":
                    this.canSendInfo = true;
                    break;
                  case "deleteInfo":
                    this.canDeleteInfo = true;
                    break;
                  case "download":
                    {
                      this.canDownload = true;
                      this.downPower(this.canDownload);
                    }
                    break;
                  case "upload":
                    this.canUpload = true;
                    break;
                  default:
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
      });
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.productLineChart.toolbox.show = flag;
      this.GasProLineChart.toolbox.show = flag;
      this.OilYearLineChart.toolbox.show = flag;
    },
    toPrecise2(row, column, cellValue, index) {
      if (
          (row[column.property] || parseFloat(row[column.property]) === 0) &&
          typeof parseFloat(row[column.property]) === "number"
      ) {
          return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
          return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.f1 {
  margin-left: 10px;
  margin-bottom: 10px;
}

.contHeader {
  margin: 20px 0;

  & > *:not(span) {
    vertical-align: top;

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }

  & > span {
    line-height: 32px;
  }
}

.el-main {
  .normal-card:not(:first-child) {
    margin-top: 20px;
  }
}

::v-deep .el-radio-button__inner {
  border: 1px solid #00cbdd;
  color: #00cbdd;
  background-color: #031527;
}

::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #00cbdd;
}

::v-deep .el-input__inner {
  background-color: #164052;
}
</style>