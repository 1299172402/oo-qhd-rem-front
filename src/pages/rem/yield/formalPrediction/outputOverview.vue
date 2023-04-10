<!-- 基础数据维护 - 作业公司产量总览 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :inline="true" style="margin-top: 18px">
        <el-form-item label="滚动预测：" prop="deptId">
          <el-select
            v-model="TaskOutputTrackingForm.selectRollingPrediction"
            placeholder="请选择"
            style="width: 200px"
            class="f1"
          >
            <el-option
              v-for="item in TaskOutputTrackingForm.unitRollingPrediction"
              :key="item.source_ID"
              :label="item.source_NAME"
              :value="item.source_ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="noticeContent">
         <el-date-picker
                  v-model="TaskOutputTrackingForm.queryDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="TaskOutputTrackingForm.pickerOptions"
              >
         </el-date-picker>
        </el-form-item>
        <el-form-item label="产量单位选择：" prop="createBy">
           <el-select
                  v-model="TaskOutputTrackingForm.selectUnitOfProduction"
                  placeholder="请选择"
                  style="width:100px;"
                  class="f1"
              >
                <el-option
                    v-for="item in TaskOutputTrackingForm.unitOfProduction"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanel headerTitle="作业公司产量总览" style="height: 650px"
      >
     <el-table id="TaskOutputTrackingTable" :data="TaskOutputTrackingForm.TableData" highlight style="width:100%;" show-summary :summary-method="getSummaries" >
                <el-table-column prop="wellType" label="累产/10⁴m³" align="center">
                </el-table-column>
                <el-table-column prop="branchStruggle" label="分公司奋斗" align="center">
                </el-table-column>
                <el-table-column prop="branchAssessment" label="分公司考核" align="center">
                </el-table-column>
                <el-table-column prop="rollingForecast" label="滚动预测" align="center">
                </el-table-column>
                <el-table-column prop="branchStruggleInventoryTime" label="截至盘库时间分公司奋斗" align="center">
                </el-table-column>
                <el-table-column prop="branchAssessmentInventoryTime" label="截至盘库时间分公司考核" align="center">
                </el-table-column>
                <el-table-column prop="secondQuarterProdPlan" align="center">
                  <template slot="header">
                    <div>当季度产量计划</div>
                    <div>(暂未有目标)</div>
                  </template>
                </el-table-column>
                <el-table-column prop="actualOutputOfInventory" label="盘库实际产量" align="center">
                </el-table-column>
                <el-table-column prop="branchActualSubStruggle" label="实际-分公司奋斗" align="center">
                </el-table-column>
                <el-table-column prop="branchActualSubAssessment" label="实际-分公司考核" align="center">
                </el-table-column>
              </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      queryData: {
        month: "",
      },
      TaskOutputTrackingForm: {
        //跟踪查询日期
        queryDate: new Date().addDays(-1).format('yyyy-MM-dd'),
        //滚动预测选择值
        selectRollingPrediction: "",
        //滚动预测日期下拉
        unitRollingPrediction: [],
        //产量单位选择值
        selectUnitOfProduction: "m",
        //产量跟踪分页信息
        page: 1,
        pageSize: 10,
        total: 0,
        //产量单位
        unitOfProduction: [
          {
            label: "m³",
            value: "m",
          },
          {
            label: "t",
            value: "t",
          },
        ],
        TableData: [],
        pickerOptions: {
          disabledDate(time) {
            // 作业公司产量总览
            var date = new Date();
            var year = date.getFullYear();
            var begin_date = new Date(year, 1, 1);
            var end_date = new Date(year, 12, 0);
            if (time >= begin_date && time <= end_date) {
              return false;
            } else {
              return true;
            }
          }
        }
      },
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
