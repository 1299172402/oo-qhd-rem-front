<!--压力测试-->
<template>
  <pagePanel headerTitle="压力数据">
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
      <el-table-column type="index" label="序号" align="center"> </el-table-column>
      <el-table-column prop="borepipeName" label="井管" align="center" width="140px"> </el-table-column>
      <el-table-column prop="wellInterceptType" label="试井项目解析类型" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="interpDate" label="解释时间" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.interpDate | dateTimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="midMD"
        :render-header="renderHeader"
        label="油层中部斜深 (m)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="midTVD"
        :render-header="renderHeader"
        label="油层中部垂深 (m)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="midTemperature"
        :render-header="renderHeader"
        label="油层中部温度 (℃)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="midFlowPressure"
        :render-header="renderHeader"
        label="油层中部流压 (MPa)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="midStaticPressure"
        :render-header="renderHeader"
        label="油层中部静压 (MPa)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="baseLevelAltitude"
        :render-header="renderHeader"
        label="基准面海拔 (m)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="baseLevelTemperature"
        :render-header="renderHeader"
        label="基准面温度 (℃)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="baseStaticPressure"
        :render-header="renderHeader"
        label="基准面静压 (MPa)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="baseFlowPressure"
        :render-header="renderHeader"
        label="基准面流压 (MPa)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reduceTemperature"
        :render-header="renderHeader"
        label="折算温度梯度 (℃/m)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reducePressure"
        :render-header="renderHeader"
        label="折算压力梯度 (MPa/m)"
        min-width="110"
        align="center"
      ></el-table-column>
      <el-table-column prop="remark" min-width="200" label="备注" align="center"></el-table-column>
    </el-table>
  </pagePanel>
</template>

<script>
import { pressure } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
import { exportExcel } from '@/lib/exportExcel.js';
export default {
  filters: {
    /**
     * hwh
     * 处理事件格式
     * @param val
     * @returns {string|*}
     */
    dateTimeFormat(val) {
      if (val) {
        return new Date(val).format('yyyy-MM-dd');
      } else {
        return '-';
      }
    },
  },
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
      tableData: [],
    };
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 根据父组件传递过来的参数进行查询
     */
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      pressure(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.pressureTest;
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad() {
      let fileName = '压力测试';
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      exportExcel('#tableData', fileName);
    },

    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader(h, { column }) {
      let header = column.label.split(' ');
      return [h('p', [h('p', {}, header[0]), h('span', {}, header[1])])];
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before {
  content: '-';
}
::v-deep .el-table__body-wrapper {
  width:500px
}
</style>
