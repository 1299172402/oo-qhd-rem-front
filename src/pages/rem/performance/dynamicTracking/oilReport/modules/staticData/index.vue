<!-- 基本信息 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="单井基本信息">
      <el-table
        id="tableData"
        :data="tableData"
        :border="false"
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width: 100%; padding: 20px 0;height:500px"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      >
        <el-table-column prop="wellNo" label="井号" align="center"> </el-table-column>
        <el-table-column prop="fieldName" label="区块" align="center"> </el-table-column>
        <el-table-column prop="horizontalLength" :render-header="renderHeader" label="水平段长度 (m)" align="center">
        </el-table-column>

        <el-table-column prop="completeType" label="完井方式" align="center"> </el-table-column>
        <el-table-column prop="boreType" label="管柱类型" align="center"> </el-table-column>
        <el-table-column prop="kb" :render-header="renderHeader" label="补心海拔 (m)" align="center"> </el-table-column>
        <el-table-column prop="baseLevelDepth" :render-header="renderHeader" label="基准面深度 (m)" align="center">
        </el-table-column>
        <el-table-column label="投产时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productionDate | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pumpTvd" :render-header="renderHeader" label="泵挂垂深 (m)" align="center">
        </el-table-column>
        <el-table-column prop="displacement" :render-header="renderHeader" label="泵排量 (m³)" align="center">
        </el-table-column>
        <el-table-column prop="pumpHead" :render-header="renderHeader" label="泵扬程 (m)" align="center">
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oilField: '',
      platforms: [], //平台数据
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData:[],
      // 油田下拉框
      oilFields: [],
      platforms: [],
      deptSelect: [
        {
          deptId: '715AD1CD60484BB59E737CD18A9DE44A  ',
          deptName: '秦皇岛32-6渤中作业公司',
        },
      ], //作业公司
      noticeList: [], // 表格数据
      datalist: [], //下方表格数据
      // 显示搜索条件
      queryData: {
        assetCode: '',
        month: '',
        ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
        orgId: '715AD1CD60484BB59E737CD18A9DE44A  ',
      },
    };
  },
  created() {
    // var date = new Date();
    // var months = date.getMonth() + 1;
    // var m = '0' + (months - 1);
    // var y = date.getFullYear();
    // if (months == 1) {
    //   y--;
    //   m = '12';
    // }
    // this.queryData.month = y + '-' + m.substr(m.length - 2, 2); //获取当前月拼接方法
    // this.getList();
    // this.getData();
  },
  methods: {
    // getList() {
    //   fetchOilFields().then((res) => {
    //     if (res.data.code == 200) {
    //       this.oilFields = res.data.data.oilFields;
    //       if (this.oilFields.length == 0) {
    //         this.oilField = '';
    //       } else {
    //         this.oilField = '3FC9A818F5BC43B88270DB80BBB3018F';
    //       }
    //       this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
    //       const requestPlat = {
    //         oilFieldId: this.selectOilField,
    //       };
    //       fetchPlatforms(requestPlat).then((res) => {
    //         if (res.data.code == 200) {
    //           this.platforms = res.data.data.platform;
    //         }
    //       });
    //     }
    //   });
    // },
    // // 下载
    // getData() {
    //   getBreakdownOfFailure(this.queryData).then((res) => {
    //     if (res.data.code == 200) {
    //       this.noticeList = [res.data.data];
    //       this.datalist = res.data.data.breakdownOfFailuresListVo;
    //     } else {
    //       this.$message.error('系统错误请重新尝试或联系运维人员！');
    //     }
    //   });
    // },
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

::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
