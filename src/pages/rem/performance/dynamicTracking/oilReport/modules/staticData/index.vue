<!-- 基本信息 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="单井基本信息" style="height: calc(100% - 101px);" show-btn>
        <el-table
            id="tableData"
            :data="tableData"
            :border="false"
            :row-style="{ height: '0px' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;"
            height="100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="wellNo" label="井号" width="130"></el-table-column>
            <el-table-column prop="fieldName" label="区块"></el-table-column>
            <el-table-column prop="horizontalLength" :label="`水平段长度\n (m)`"></el-table-column>
            <el-table-column prop="completeType" label="完井方式"></el-table-column>
            <el-table-column prop="boreType" label="管柱类型"></el-table-column>
            <el-table-column prop="kb" :label="`补心海拔\n (m)`"></el-table-column>
            <el-table-column prop="baseLevelDepth" :label="`基准面深度\n (m)`"></el-table-column>
            <el-table-column label="投产时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.productionDate | formatTime }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="pumpTvd" :label="`泵挂垂深\n (m)`"></el-table-column>
            <el-table-column prop="displacement" :label="`泵排量\n (m³)`"></el-table-column>
            <el-table-column prop="pumpHead" :label="`泵扬程\n (m)`"></el-table-column>
        </el-table>
    </pagePanel>
  </div>
</template>

<script>
import { wellBaseInfo } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  filters: {
    formatTime(val) {
      if (val) {
        return new Date(val).format("yyyy-MM-dd");
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      tableData: [],
      oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
      //选择平台
      platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
      //选择井号
      wellId: "09D30C16BD1D4F759D53F74941701307",
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
      passValue(val) {
      this.oilFeildId = val.ogfId;
      this.platform = val.assetCode;
      this.wellId = val.selectWellId;
      this.doSearch();
    },
    //根据父组件传递过来的参数进行查询
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      wellBaseInfo(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.wellBaseInfo;
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "单井基本信息表";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      exportExcel("#tableData", fileName);
    },
       renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    },
  },
};
</script>
<style scoped lang="scss">
#tableData {
  // ::v-deep .el-table__header-wrapper .cell{
  //     height: auto;
  //     line-height: 18px;
  // }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
