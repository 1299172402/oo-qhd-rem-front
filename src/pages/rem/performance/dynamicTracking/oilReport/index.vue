<!-- 油藏动态管理-油井辅助分析-油井分析报告 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryData" :inline="true" style="margin-top: 18px">
         <el-form-item label="作业公司：">
          <el-select v-model="queryData.orgId" disabled>
            <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select v-model="queryData.ogfId" disabled>
            <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台：" prop="createBy">
          <el-select v-model="queryData.assetCode" style="width: 220px">
            <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井名：" prop="createBy">
          <el-select v-model="queryData.assetCode" style="width: 220px">
            <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="getData" size="mini" type="primary">检索</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
    <el-row :gutter="20">
      <staticData></staticData>
    </el-row>
    <el-row :gutter="20">
      <homeworkWellHistory></homeworkWellHistory>
    </el-row>
     <el-row :gutter="20">
      <productionData></productionData>
    </el-row>
     <el-row :gutter="20">
     <pressureTest></pressureTest>
    </el-row>
       <el-row :gutter="20">
     <loggingInterpretationResult></loggingInterpretationResult>
    </el-row>
  </div>
</template>

<script>
// import { fetchOilFields, fetchPlatforms } from '@/api/ipm/primaryinfo.js';
// import { getBreakdownOfFailure } from '@/api/ipm/monthlyReportManagement.js';
const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, '$1')]: i[1].default,
    }),
  {},
);
export default {
  components: {
    ...moduleName,
  },
  data() {
    return {
      oilField: '',
      platforms: [], //平台数据
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
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
