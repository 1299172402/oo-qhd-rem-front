<!--压力测试-->
<template>
    <el-row>
      <span class="tableTitle"> 分层调配数据</span>
      <el-table
          id="tableData"
          highlight
          :data="tableData"
          style="width: 100%"
          height="600"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
            prop="borePipeName"
            label="井号"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            prop="startDate"
            label="开始时间"
            align="center"
            width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.startDate | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="endDate"
            label="结束时间"
            align="center"
            width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.endDate | dateTimeFormat}}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column
            prop="wellTestProjectInterpId"
            label="试井项目标识"
            width="120"
            align="center"
        >
        </el-table-column>-->
       <!-- <el-table-column
            prop="intervalSn"
            label="层段序号"
            align="center"
        >
        </el-table-column>-->
        <el-table-column
            prop="layerName"
            label="解释层位标识"
            min-width="180"
            align="center"
        >
        </el-table-column>
        <!--<el-table-column
            prop="topDepth"
            :render-header="renderHeader"
            label="顶界深度 (m)"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="bottomDepth"
            :render-header="renderHeader"
            label="底界深度 (m)"
            width="100"
            align="center"
        >
        </el-table-column>-->
        <el-table-column
            prop="testedThickness"
            :render-header="renderHeader"
            label="测试厚度 (m)"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="waterNozzleDiameter"
            :render-header="renderHeader"
            label="水嘴直径 (mm)"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="intakeWellHeadPress"
            :render-header="renderHeader"
            label="注入井口压力 (MPa)"
            width="140"
            align="center"
        >
        </el-table-column>

        <!--<el-table-column
            prop="layerDesignDailyInj"
            :render-header="renderHeader"
            label="层日配注入量 (m³/d)"
            width="100"
            align="center"
        >
        </el-table-column>-->
        <!--<el-table-column
        :render-header="renderHeader"
            prop="watermeterInjectionDaily"
            label="水表日注水量 (m³/d)"
            align="center"
        >
        </el-table-column>-->
        <el-table-column
            prop="dailyInj"
            :render-header="renderHeader"
            label="层日注入量 (m³/d)"
            align="center"
            width="140"
        >
        </el-table-column>
        <!--<el-table-column
            prop="deployment"
            label="调配误差"
            align="center"
        >
        </el-table-column>-->
        <el-table-column
            prop="injectivityIndex"
            :render-header="renderHeader"
            label="吸水指数 (m³/(MPa·d))"
            align="center"
            width="140"
        >
        </el-table-column>
        <el-table-column
            prop="startPress"
            :render-header="renderHeader"
            label="启动压力 (MPa)"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="timeInterval"
            :render-header="renderHeader"
            label="时间间隔 (h)"
            width="100"
            align="center"

        >
        </el-table-column>
        <el-table-column
            prop="testResult"
            label="测试结论代码"
            width="200"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="remark"
            min-width="240"
            align="center"
            label="备注">
        </el-table-column>
      </el-table>
    </el-row>
</template>
<style lang="scss" scoped>
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
<script>
import {divLayerTestData} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";

export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {}
  },
  filters: {
    dateTimeFormat(val){
      if(val){
       let rq =  new Date(val).format("yyyy-MM-dd");
       return rq;
      }else{
        return val;
      }
    }
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
      divLayerTestData(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.divLayerTestDatas;
          console.log(this.tableData);
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '分层测试';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      exportExcel('#tableData',fileName);
    },
    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader (h, {column}) {
      let header = column.label.split(' ');
      return [h('p', [
        h('p', {}, header[0]),
        h('span', {}, header[1])
      ])];
    }
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>