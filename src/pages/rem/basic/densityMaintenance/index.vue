<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" :inline="true" style="margin-top: 18px">

          <el-button size="mini" @click="getInfo" type="primary">搜索 </el-button>
          <el-button size="mini" class="commonBtn">重置 </el-button>
      </el-form>
    </headerSearch>

    <pagePanel headerTitle="密度信息维护" style="height: calc(100% - 100px)" :is-show-max-btn="true" class="g-w100">
      <div class="btnPosition g-row-flex" style="width: 100%">
        <el-button icon="el-icon-edit-outline" size="mini" @click="redact" type="primary">编辑</el-button>
        <el-button icon="el-icon-document-checked" size="mini" @click="save" type="primary">保存</el-button>
      </div>

      <el-table
        :data="noticeList"
        @current-change="handleCurrentChange"
        highlight-current-row
        height="calc(100% - 45px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: auto; height: 100%; margin-top: 20px"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="油气田" width="130px" prop="ogfName" align="center"></el-table-column>
        <el-table-column label="一月" align="center">
          <el-table-column label="计划" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[0]">{{ scope.row.planDensityValue }}</span>
              <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[0]">{{ scope.row.january }}</span>
              <span v-else> <el-input v-model="scope.row.january" size="small" @change="inputChange(1)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="二月" prop="two" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[1]">{{ scope.row.february }}</span>
              <span v-else>
                <el-input maxlength="10 " @change="inputChange(2)" v-model="scope.row.february" size="small"
              /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="三月" prop="three" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[2]">{{ scope.row.march }}</span>
              <span v-else> <el-input v-model="scope.row.march" size="small" @change="inputChange(3)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="四月" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[3]">{{ scope.row.april }}</span>
              <span v-else> <el-input v-model="scope.row.april" size="small" @change="inputChange(4)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="五月" prop="five" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[4]">{{ scope.row.may }}</span>
              <span v-else> <el-input v-model="scope.row.may" size="small" @change="inputChange(5)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="六月" prop="six" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[5]">{{ scope.row.june }}</span>
              <span v-else> <el-input v-model="scope.row.june" size="small" @change="inputChange(6)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="七月" prop="seven" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[6]">{{ scope.row.july }}</span>
              <span v-else> <el-input v-model="scope.row.july" size="small" @change="inputChange(7)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="八月" prop="eight" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[7]">{{ scope.row.august }}</span>
              <span v-else> <el-input v-model="scope.row.august" size="small" @change="inputChange(8)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="九月" prop="nine" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[8]">{{ scope.row.september }}</span>
              <span v-else> <el-input v-model="scope.row.september" size="small" @change="inputChange(9)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十月" prop="ten" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[9]">{{ scope.row.october }}</span>
              <span v-else> <el-input v-model="scope.row.october" size="small" @change="inputChange(10)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十一月" prop="eleven" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[10]">{{ scope.row.november }}</span>
              <span v-else> <el-input v-model="scope.row.november" size="small" @change="inputChange(11)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十二月" prop="twelve" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[11]">{{ scope.row.december }}</span>
              <span v-else> <el-input v-model="scope.row.december" size="small" @change="inputChange(12)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oilFields: [],
      // 表格数据
      noticeList: [],
      // 是否展开，默认全部展开
      isExpandAll: true,
      ids: [],
      // 保存数组
      savelist: [],
      // 查询参数
      isDisabled: [true, true, true, true, true, true, true, true, true, true, true, true],
    };
  },
  methods: {

    // 编辑
    /**
     *  选中表格事件
     * @param ids 选中的表格单行内容，携带index与判断条件
     */
    handleCurrentChange(val) {
      this.ids = [];
      this.ids = val;
    },
    /**
     *  编辑
     * @param noticeList 表格数据data
     */
    redact() {
      var data = new Date();
      var m = data.getMonth() + 1;
      for (let i = 0; i < m; i++) {
        this.$set(this.isDisabled, i, false);
      }
    },
    // 保存
    save() {
      let densityInfoQueryVo = this.queryParams;
      let densityModelInfo = this.noticeList[0];
      save({ densityModelInfo, densityInfoQueryVo }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("保存成功！");
        }
      });
      for (let i = 0; i < 12; i++) {
        this.$set(this.isDisabled, i, true);
      }
    },
    inputChange(monthNum) {
      let month = this.noticeList[0];
      let monthDen = 0;
      switch (monthNum) {
        case 1:
          monthDen = month.january;
          break;
        case 2:
          monthDen = month.february;
          break;
        case 3:
          monthDen = month.march;
          break;
        case 4:
          monthDen = month.april;
          break;
        case 5:
          monthDen = month.may;
          break;
        case 6:
          monthDen = month.june;
          break;
        case 7:
          monthDen = month.july;
          break;
        case 8:
          monthDen = month.august;
          break;
        case 9:
          monthDen = month.september;
          break;
        case 10:
          monthDen = month.october;
          break;
        case 11:
          monthDen = month.november;
          break;
        case 12:
          monthDen = month.december;
          break;
      }

      switch (monthNum) {
        case 1:
          month.february = monthDen;
        case 2:
          month.march = monthDen;
        case 3:
          month.april = monthDen;
        case 4:
          month.may = monthDen;
        case 5:
          month.june = monthDen;
        case 6:
          month.july = monthDen;
        case 7:
          month.august = monthDen;
        case 8:
          month.september = monthDen;
        case 9:
          month.october = monthDen;
        case 10:
          month.november = monthDen;
        case 11:
          month.december = monthDen;
      }
    },
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
