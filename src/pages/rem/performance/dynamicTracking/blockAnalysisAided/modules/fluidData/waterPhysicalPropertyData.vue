<!--水物性数据-->
<template>
  <NormalCard class="mt-2">
    <el-row>
      <el-table
          id="tableData"
          highlight
          :data="tableData"
          style="width: 100%;"
          height="600"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
            prop="borepipeNo"
            label="井号"
            align="center"
            min-width="160"
        ></el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            prop="sampleId"
            label="流体样品类型"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            prop="fluidPH"
            label="PH值/酸碱度"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            prop="color"
            label="颜色"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            :render-header="renderHeader"
            prop=""
            label="地层水矿化度 (mg/L)  "
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            :render-header="renderHeader"
            prop="anionContent"
            label="阴离子总量 (mg/L)"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            :render-header="renderHeader"
            prop="cationContent"
            label="阳离子总量 (mg/L)"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            :render-header="renderHeader"
            prop="totalAlkalinity"
            label="总碱度 (mmol/L)"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            prop="cumHardness"
            label="总硬度"
            align="center"
            min-width="140"
        >
        </el-table-column>
        <el-table-column
            :render-header="renderHeader"
            prop="resis"
            label="电阻率 (Ωm)"
            align="center"
            min-width="140"
        >
        </el-table-column>
      </el-table>
    </el-row>
  </NormalCard>
</template>

<script>

import {streamingMediaDataWaterPhysicalPropertyData} from "@/api/rem-01/fielddynamicanalysis";
import NormalCard from "@/components/tools/NormalCard";
import {exportExcel} from "@/lib/exportExcel";
export default {
  components: {
    NormalCard,
  },
  props: {
    oilFieldId: {},
    blockId: {},
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch(){
      //置空子组件参数
      this.$emit('childPara', '');
      //获得查询参数
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      }
      //调用接口方法
      await streamingMediaDataWaterPhysicalPropertyData(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData=res.data.data.results;
        } else {
          this.tableData=[];
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '水物性数据';
      if(this.blockName){
        fileName = this.blockName + fileName;
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
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>