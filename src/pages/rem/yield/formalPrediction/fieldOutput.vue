<!-- 产量形势预测 - 油田预测产量 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :inline="true" style="margin-top: 18px">
        <el-form-item label="滚动预测：" prop="deptId">
          <el-select
            v-model="ForecastOutputForm1.selectRollingPrediction"
            placeholder="请选择"
            style="width: 200px"
            class="f1"
          >
            <el-option
              v-for="item in ForecastOutputForm1.unitRollingPrediction"
              :key="item.source_ID"
              :label="item.source_NAME"
              :value="item.source_ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="noticeContent">
          <el-date-picker
            v-model="ForecastOutputForm1.queryDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产量单位选择：" prop="createBy">
          <el-select
            v-model="ForecastOutputForm1.selectUnitOfProduction"
            placeholder="请选择"
            style="width: 100px"
            class="f1"
          >
            <el-option
              v-for="item in ForecastOutputForm1.unitOfProduction"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchinfo" icon="el-icon-search">检索</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanel headerTitle="油田产量影响因素">
      <div style="float: right; line-height: 30px; padding-right: 20px">
        <el-button size="mini"  type="primary" @click="saveEditRow">保存修改</el-button>
      </div>
      <el-table
        :data="InfluenceFactorForm.tableData"
        highlight
        style="font-size: 15px; font-weight: 500"
        :cell-style="{ padding: '10px' }"
      >
        <el-table-column v-if="InfluenceFactorForm.show" prop="ogfId"> </el-table-column>
        <el-table-column prop="ogfNo" label="油田" align="center"> </el-table-column>
        <el-table-column prop="queryInitialProd" label="日产量(m³)" align="center">
          <template slot-scope="scope">
            {{ scope.row.queryInitialProd }}
          </template>
        </el-table-column>
        <el-table-column prop="initialProd" label="修正日产量(m³)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.initialProd" :min="0" :precision="4"></el-input-number>
            <!--<span v-show="!scope.row.isUpdate">
                        {{ scope.row.degressionOfYear }}
                    </span>
                    <el-input v-show="scope.row.isUpdate" v-model="InfluenceFactorForm.editRow.degressionOfYear"></el-input>-->
          </template>
        </el-table-column>
        <el-table-column prop="degressionOfYear" label="年递减率(%)" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.degressionOfYear"
              :min="-100"
              :max="100"
              :precision="4"
            ></el-input-number>
            <!--<span v-show="!scope.row.isUpdate">
                        {{ scope.row.degressionOfYear }}
                    </span>
                    <el-input v-show="scope.row.isUpdate" v-model="InfluenceFactorForm.editRow.degressionOfYear"></el-input>-->
          </template>
        </el-table-column>
        <el-table-column prop="rateOfHour" label="生产时率(%)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.rateOfHour" :min="0" :max="100" :precision="4"></el-input-number>
            <!--<span v-show="!scope.row.isUpdate">
                        {{ scope.row.rateOfHour }}
                    </span>
                    <el-input v-show="scope.row.isUpdate" v-model="InfluenceFactorForm.editRow.rateOfHour"></el-input>-->
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" width="150" align="center" fixed="right" v-if="InfluenceFactorForm.canUpdateInfo">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.isUpdate && InfluenceFactorForm.canUpdateInfo" type="text" @click="editRowMethod(scope.row, scope.$index)">编辑</el-button>
                        <el-button v-show="scope.row.isUpdate && InfluenceFactorForm.canUpdateInfo" type="text" @click="cancelEditRow(scope.row)">取消</el-button>
                        <el-button v-show="scope.row.isUpdate && InfluenceFactorForm.canUpdateInfo" type="text" @click="saveEditRow(scope.row,scope.$index)">保存</el-button>
                    </template>
                </el-table-column>-->
      </el-table>
    </pagePanel>
    <pagePanel headerTitle="油田预测产量">
      <div style="float: right; line-height: 30px; padding-right: 20px">
        <el-button size="mini"  type="primary" @click="doDownLoad(3)">下载</el-button>
      </div>
      <el-table
        id="ForecastProductionTable"
        :data="ForecastOutputForm1.ForecastProductionTableData"
        highlight
        style="font-size: 15px; font-weight: 500"
        :cell-style="{ padding: '25px' }"
      >
        <el-table-column label="油田" align="center">
          <template>
            <span> 预测年产量(/{{ unitName }}) </span>
          </template>
        </el-table-column>

        <el-table-column prop="qhd326" label="QHD32-6" align="center"> </el-table-column>
        <el-table-column prop="cfd64" label="CFD6-4" align="center"> </el-table-column>
        <el-table-column prop="nb352" label="NB35-2" align="center"> </el-table-column>
        <el-table-column prop="bz32" label="BZ3-2" align="center"> </el-table-column>
        <el-table-column prop="qhd331" label="QHD33-1" align="center"> </el-table-column>
        <el-table-column prop="qhd331s" label="QHD33-1S" align="center"> </el-table-column>
        <el-table-column prop="work" label="作业公司" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
    <pagePanel headerTitle="油田剩余水平" >
      <el-table
        id="ResidualLevelTable"
        :data="ForecastOutputForm2.ResidualLevelTableData"
        highlight
        style="width: 100%; font-size: 15px; font-weight: 500"
        :cell-style="{ padding: '25px' }"
      >
        <el-table-column label="油田" align="center">
          <template slot-scope="scope">
            <span v-show="scope.$index == 0"> 分公司奋斗，后续需日产(/{{ unitName }}) </span>
            <span v-show="scope.$index == 1"> 分公司考核，后续需日产(/{{ unitName }}) </span>
          </template>
        </el-table-column>
        <el-table-column prop="qhd326" label="QHD32-6" align="center"> </el-table-column>
        <el-table-column prop="cfd64" label="CFD6-4" align="center"> </el-table-column>
        <el-table-column prop="nb352" label="NB35-2" align="center"> </el-table-column>
        <el-table-column prop="bz32" label="BZ3-2" align="center"> </el-table-column>
        <el-table-column prop="qhd331" label="QHD33-1" align="center"> </el-table-column>
        <el-table-column prop="qhd331s" label="QHD33-1S" align="center"> </el-table-column>
        <el-table-column prop="work" label="作业公司" align="center"> </el-table-column>
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
      ForecastOutputForm1: {
        selectRollingPrediction: "",
        unitRollingPrediction: [],
        queryDate: new Date().addDays(-1).format('yyyy-MM-dd'),
        selectUnitOfProduction: "",
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
      },
      InfluenceFactorForm: {
        tableData: [],
      },
      ForecastOutputForm1: {
        ResidualLevelTableData: [],
      },
      ForecastOutputForm2: {
        ResidualLevelTableData: [],
      },
    };
  },
  methods: {
    searchinfo() {},
    saveEditRow() {},
  },
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
