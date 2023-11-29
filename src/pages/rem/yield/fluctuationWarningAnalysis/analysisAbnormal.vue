<!-- 产量异常归因分析报告 -->
<template>
  <div class="app-container">
    <div class="z-container">
      <pagePanelNew class="pagePanelNew">
        <div class="pagePane-container">
          <div
            class="pageHeader"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
              margin-left: 0;
            "
          >
            <span>{{ oilFieldName }}产量异常归因分析报告</span>
            <el-button type="primary" style="height: 32px" @click="$router.go(-1)">返回</el-button>
          </div>
          <div class="rowBox" style="margin-bottom: 12px">
            <div class="row" style="margin-right: 20px">
              <pagePanel headerTitle="产量异常归因分析" style="width: 100%; height: 320px; margin-top: 0" show-btn>
                <div style="display: flex; justify-content: flex-end">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="downTable('#table1', '产量异常归因分析')"
                    >下载</el-button
                  >
                </div>
                <el-table
                  id="table1"
                  :data="reasonAnalysises"
                  :span-method="objectSpanMethod"
                  border
                  :row-style="{ height: '0px' }"
                  header-cell-class-name="table_header"
                  :cell-style="{ padding: '6px', 'text-align': 'center' }"
                  style="width: 100%"
                  height="calc(100% - 55px)"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                  >>
                  <el-table-column prop="platformName" label="各平台产量下降情况" width="300"></el-table-column>
                  <el-table-column prop="evalDim" label="原因分类情况" width="300"></el-table-column>
                  <el-table-column prop="content" label="异常井情况"></el-table-column>
                </el-table>
              </pagePanel>
            </div>
          </div>
          <el-tabs class="g-pageHeader" v-model="tabsValue" topline @tab-click="handleClick">
            <el-tab-pane
              :label="item.label"
              :name="item.value"
              v-for="(item, index) in tabsList"
              :key="index"
            ></el-tab-pane>
          </el-tabs>
          <div class="rowBox">
            <div class="row" style="margin-right: 20px">
              <pagePanel :headerTitle="tabsName" style="width: 100%; height: 440px; margin-top: 0" show-btn>
                <div style="display: flex; justify-content: flex-end">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="downTable('#table2', tabsName)"
                    >下载</el-button
                  >
                </div>
                <el-table
                  id="table2"
                  :data="tabTableData"
                  border
                  :row-style="{ height: '0px' }"
                  header-cell-class-name="table_header"
                  :cell-style="{ padding: '6px', 'text-align': 'center' }"
                  height="calc(100% - 55px)"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                >
                  <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
                  <el-table-column prop="wellNo" label="井号" min-width="160" fixed> </el-table-column>
                  <el-table-column label="当日生产情况">
                    <el-table-column prop="proTime" :label="`生产时间\n(yyyy-mm-dd)`" min-width="140"></el-table-column>
                    <el-table-column prop="liquidDaily" :label="`日产液量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="oilDaily" :label="`日产油量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="waterCut" :label="`含水率\n(%)`" min-width="100"></el-table-column>
                    <el-table-column prop="pumpPressure" :label="`泵入口压力\n(MPa)`" min-width="110"></el-table-column>
                  </el-table-column>
                  <el-table-column label="昨日生产情况">
                    <el-table-column prop="proTimeYesterday" :label="`生产时间\n(yyyy-mm-dd)`" min-width="140"></el-table-column>
                    <el-table-column prop="liquidDailyYesterday" :label="`日产液量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="oilDailyYesterday" :label="`日产油量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="waterCutYesterday" :label="`含水率\n(%)`" min-width="100"></el-table-column>
                    <el-table-column prop="pumpPressureYesterday" :label="`泵入口压力\n(MPa)`" min-width="110"></el-table-column>
                  </el-table-column>
                  <el-table-column label="差值">
                    <el-table-column prop="liquidDailyDiff" :label="`日产液量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="oilDailyDiff" :label="`日产油量\n(m³)`" min-width="100"></el-table-column>
                    <el-table-column prop="waterCutDiff" :label="`含水率\n(%)`" min-width="100"></el-table-column>
                    <el-table-column prop="pumpPressureDiff" :label="`泵入口压力\n(MPa)`" min-width="110"></el-table-column>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" min-width="200"></el-table-column>
                </el-table>
              </pagePanel>
            </div>
          </div>
        </div>
      </pagePanelNew>
    </div>
  </div>
</template>

<script>
import { reasonAnalysis, reasonAnayLysisReport } from "@/api/oilDeposit/rem-02/outputmanagement.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  name: "analysisAbnormal",
  data() {
    return {
      //区块id
      block: "",
      //油田id
      oilField: "",
      //当前时间
      theDate: "",
      //单位类型
      unitType: "",
      //油田名称
      oilFieldName: "",
      //异常分析原因
      reasonAnalysises: [],
      //tabs页
      tabsList: [],
      tabsValue: "",
      tabsName: "",
      //tab 表格数据
      tabTableData: [],
      //合并后的数据统计
      spanArr: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.block = this.$route.query.block;
      this.oilField = this.$route.query.oilField;
      this.theDate = this.$route.query.theDate;
      this.unitType = this.$route.query.unitType;
      this.oilFieldName = this.$route.query.oilFieldName;
      let request = {
        fieldId: this.block,
        oilFieldId: this.oilField,
        theDate: this.theDate,
        outputUnit: this.unitType,
      };
      await reasonAnalysis(request).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.reasonAnalysises = data.reasonAnalysises;
          this.tabsList = data.type;
          this.tabsValue = this.tabsList[0].value;
          this.tabsName = this.tabsList[0].label;
          this.getSpanArr(this.reasonAnalysises);
          this.getReasonAnayLysisReport();
        }
      });
    },
    //获取归因分析表报告
    getReasonAnayLysisReport() {
      let request = {
        fieldId: this.block,
        oilFieldId: this.oilField,
        theDate: this.theDate,
        outputUnit: this.unitType,
        tabId: this.tabsValue,
      };
      this.tabTableData = [];
      reasonAnayLysisReport(request).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.tabTableData = data.productionStatus;
        }
      });
    },
    //tab点击
    handleClick(tab, event) {
      this.tabsName = tab.label;
      this.getReasonAnayLysisReport();
    },
    //判断表格数据中 技术指标的重复进行合并 获得合并的行信息
    getSpanArr(data) {
      this.spanArr = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].platformName === data[i - 1].platformName) {
            //platformName可以根据你要合并的列更改
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    //表格合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    //下载
    downTable(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .z-container {
    flex: 1;
    height: 0;
    .pagePanelNew {
      height: 100%;
      margin-top: 0;
      .pagePane-container {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .rowBox {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          .row {
            flex: 1;
            width: 0;
            #table1 {
              ::v-deep .el-table__body-wrapper {
                .cell {
                  height: 60px;
                  line-height: inherit;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              }
            }
          }
        }
        .rowBox:last-child {
          margin-bottom: 0;
        }
      }
    }
    ::v-deep .el-table__fixed-header-wrapper,
    ::v-deep .el-table__header-wrapper {
      .cell {
        height: auto !important;
        line-height: 1.6 !important;
        white-space: pre;
      }
    }
  }
}
</style>
