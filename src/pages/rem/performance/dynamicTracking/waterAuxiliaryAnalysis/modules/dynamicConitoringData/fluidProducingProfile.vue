<!--吸水剖面-->
<template>
  <div class="z-main">
    <div class="z-row" style="margin-right: 20px">
      <page-panel headerTitle="吸水剖面测井结果图" style="height: 100%; margin-top: 0" show-btn>
        <div class="z-draw">
          <div class="z-chartHead">
            <div class="sp1">层位</div>
            <div class="sp2">解释井段</div>
            <div class="sp3">绝对吸入量<br />(m³)</div>
            <div class="sp3">相对吸入量<br />(m³)</div>
            <div class="sp3">日总注入量<br />(m³)</div>
            <div class="sp3">注入压力<br />(MPa)</div>
          </div>
          <div class="z-chartBody">
            <div class="z-chartBody-row" v-for="(item, index) in tableData" :key="index">
              <div class="leftBox">{{ item.layerName }}</div>
              <div class="rightBox">
                <!-- v-for="(items,idxs) in item.data" :key="index" -->
                <div class="right-row">
                  <div class="sp2">{{ item.productionInterval }}</div>
                  <div class="sp3">
                    <div class="z_proess">
                      <span class="z_proess_sp1" :style="{ width: getProportion(item.absoluteIntake, 0) + '%' }">
                        <b>{{ item.absoluteIntake }}</b>
                      </span>
                      <span class="z_proess_sp2"></span>
                    </div>
                  </div>
                  <div class="sp3">
                    <div class="z_proess">
                      <span class="z_proess_sp1" :style="{ width: getProportion(item.relativeIntake, 1) + '%' }">
                        <b>{{ item.relativeIntake }}</b>
                      </span>
                      <span class="z_proess_sp2"></span>
                    </div>
                  </div>
                  <div class="sp3">
                    <div class="z_proess">
                      <span class="z_proess_sp1" :style="{ width: getProportion(item.injTotal, 2) + '%' }">
                        <b>{{ item.injTotal }}</b>
                      </span>
                      <span class="z_proess_sp2"></span>
                    </div>
                  </div>
                  <div class="sp3">{{ item.injWhPressure }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </page-panel>
    </div>
    <div class="z-row">
      <page-panel headerTitle="吸水剖面测井结果表" style="height: 100%; margin-top: 0" show-btn>
        <el-table id="tableData" highlight :data="tableData" border style="width: 100%" height="calc(100% - 10px)">
          <el-table-column
            prop="layerName"
            :label="`解释层位名称`"
            align="center"
            min-width="150"
            fixed
          ></el-table-column>
          <el-table-column
            prop="productionInterval"
            label="解释井段"
            align="center"
            min-width="150"
            fixed
          ></el-table-column>
          <el-table-column
            prop="absoluteIntake"
            :label="`绝对吸入量\n(m³)`"
            align="center"
            min-width="130"
          ></el-table-column>
          <el-table-column
            prop="relativeIntake"
            :label="`相对吸入量\n(m³)`"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column prop="injTotal" :label="`日总注入量\n(m³)`" align="center" min-width="100"></el-table-column>
          <el-table-column
            prop="injWhPressure"
            :label="`注入压力\n(MPa)`"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column prop="interpConclusion" :label="`解释结论`" align="center" min-width="80"></el-table-column>
          <el-table-column
            prop="interpDate"
            :label="`解释日期\n(yyyy-mm-dd)`"
            align="center"
            min-width="140"
          ></el-table-column>
        </el-table>
      </page-panel>
    </div>
  </div>
</template>

<script>
import { outProfileLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
    return {
      chartData: [],
      tableData: [],
      absoluteIntakeAllNum: 0,
      relativeIntakeAllNum: 0,
      injTotalAllNum: 0,
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      outProfileLoggingInterpretation(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.injectivityIndexs;
          this.chartData = [];
          if (this.tableData.length) {
            for (let i = 0; i < this.tableData.length; i++) {
              let data = this.tableData[i];
              this.absoluteIntakeAllNum += Math.round(data.absoluteIntake);
              this.relativeIntakeAllNum += Math.round(data.relativeIntake);
              this.injTotalAllNum += Math.round(data.injTotal);
              if (!this.chartData.length) {
                this.chartData.push({
                  layerName: data.layerName,
                  data: [
                    {
                      productionInterval: data.productionInterval,
                      absoluteIntake: data.absoluteIntake,
                      relativeIntake: data.relativeIntake,
                      injTotal: data.injTotal,
                      injWhPressure: data.injWhPressure,
                    },
                  ],
                });
              } else {
                let isHave = false;
                for (let k = 0; k < this.chartData.length; k++) {
                  if (data.layerName == this.chartData[k].layerName) {
                    isHave = true;
                    this.chartData[k].data.push({
                      productionInterval: data.productionInterval,
                      absoluteIntake: data.absoluteIntake,
                      relativeIntake: data.relativeIntake,
                      injTotal: data.injTotal,
                      injWhPressure: data.injWhPressure,
                    });
                    break;
                  }
                }
                if (!isHave) {
                  this.chartData.push({
                    layerName: data.layerName,
                    data: [
                      {
                        productionInterval: data.productionInterval,
                        absoluteIntake: data.absoluteIntake,
                        relativeIntake: data.relativeIntake,
                        injTotal: data.injTotal,
                        injWhPressure: data.injWhPressure,
                      },
                    ],
                  });
                }
              }
            }
          }
        }
      });
    },
    doDownLoad() {
      let fileName = "产液剖面";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      if (this.image) {
        downFile(this.image, fileName);
        exportExcel("#tableData", fileName);
      }
    },
    getProportion(num, index) {
      let allNum = 0;
      if (index == 0) {
        allNum = this.absoluteIntakeAllNum;
      } else if (index == 1) {
        allNum = this.relativeIntakeAllNum;
      } else if (index == 2) {
        allNum = this.injTotalAllNum;
      }
      return (Math.round(num) / allNum) * 100;
    },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  display: flex;
  height: calc(100% - 101px);
  .z-row {
    width: 0;
    flex: 1;
    ::v-deep .el-table__fixed-header-wrapper .cell,
    ::v-deep .el-table__header-wrapper .cell {
      height: auto;
      line-height: 18px;
      white-space: pre;
    }
    ::v-deep .cell:empty {
      &::before {
        content: "-";
      }
    }
    .z-draw {
      height: 100%;
      // background-color: #b4c7e7;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      .z-chartHead {
        height: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        .sp1 {
          width: 120px;
          text-align: center;
        }
        .sp2 {
          width: 100px;
          text-align: center;
        }
        .sp3 {
          flex: 1;
          text-align: center;
        }
      }
      .z-chartBody {
        height: 0;
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: 12px;
        .z-chartBody-row {
          height: auto;
          display: flex;
          .leftBox {
            width: 120px;
            height: inherit;
          }
          .rightBox {
            flex: 1;
            height: inherit;
            .right-row {
              height: 40px;
              display: flex;
              .sp2 {
                width: 100px;
                text-align: center;
              }
              .sp3 {
                flex: 1;
                text-align: center;
                padding: 0 10px;
                .z_proess {
                  width: 100%;
                  height: 16px;
                  border: 1px solid rgba(41, 171, 226, 1);
                  margin-right: 16px;
                  display: flex;
                  align-items: center;
                  padding: 1px;
                  .z_proess_sp1 {
                    cursor: pointer;
                    height: 100%;
                    background: linear-gradient(to right, #2cbdfb 0%, #80e2bf 50%, #befe93 100%);
                    b {
                      font-size: 12px;
                      color: #00223f;
                      letter-spacing: 0;
                      font-weight: 700;
                      position: relative;
                      top: -6px;
                      left: 14px;
                    }
                  }
                  .z_proess_sp2 {
                    flex: 1;
                    height: 100%;
                    background: linear-gradient(to right, #ffc255 0%, #ff9c46 50%, #ff7b39 100%);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
