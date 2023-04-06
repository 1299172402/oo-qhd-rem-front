<template>
  <div>
    <el-table :data="table" highlight style="margin-top: 10px;width: 100%; " height="300">
      <el-table-column prop="wellName" label="井号" width="150" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="layerCode" label="层段" width="150" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column
        prop="appendixValueName"
        label="分注类型"
        width="100"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="allocInjDaily"
        label="配注量?(m³/d)"
        width="75"
        :render-header="renderheader"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="工艺可行性" show-overflow-tooltip align="center">
        <el-table-column
          prop="compMaxInjDaily"
          width="225"
          label="工艺单层最大注入量?(m³/d)"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="compProbability"
          width="100"
          label="工艺条件"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.compProbability == 0">
              <i class="redPoint"></i>
            </div>
            <div v-if="scope.row.compProbability == 1">
              <i class="greenPoint"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="地层可行性" show-overflow-tooltip align="center">
        <el-table-column
          prop="absorpPredictIndexYearRoc"
          width="250"
          label="吸水指数近一年变化率"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="needBottomFlowPress"
          label="所需井底流压?(MPa)"
          width="150"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="layersBottomSafePress"
          width="250"
          label="最大安全井底注入压力?(MPa)"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="layerProbability"
          label="地层条件"
          width="100"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.layerProbability == 0">
              <i class="redPoint"></i>
            </div>
            <div v-if="scope.row.layerProbability == 1">
              <i class="greenPoint"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="125" label="地面可行性" show-overflow-tooltip align="center">
        <el-table-column
          prop="needWhInjPress"
          width="150"
          label="所需井口压力?(MPa)"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pumpRatePress"
          width="175"
          label="注水泵额定压力?(MPa)"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="equipmentProbability"
          label="地面条件"
          width="100"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.equipmentProbability == 0">
              <i class="redPoint"></i>
            </div>
            <div v-if="scope.row.equipmentProbability == 1">
              <i class="greenPoint"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="管柱可行性(冲蚀分析)" show-overflow-tooltip align="center">
        <el-table-column
          prop="compstringInnerDiameter"
          label="流道内径?(mm)"
          width="100"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="evalInjDaily"
          label="评估流量?(m³/d)"
          width="100"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="washFlowDaily"
          label="冲蚀流量?(m³/d)"
          width="100"
          :render-header="renderheader"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="compstringProbility"
          width="100"
          label="管柱条件"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.compstringProbility == 0">
              <i class="redPoint"></i>
            </div>
            <div v-if="scope.row.compstringProbility == 1">
              <i class="greenPoint"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="suggestAllocInjDaily"
        label="建议配注量?(m³/d)"
        width="125"
        :render-header="renderheader"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stimSuggest"
        label="措施建议"
        width="100"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="100"
        show-overflow-tooltip
        min-width="20px"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>


export default {
  props: ["table"],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    renderheader (h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('?')[0]),
        h('br'),
        h('span', {}, column.label.split('?')[1])
      ]);
    },
  }
}
</script>

<style lang="scss" scoped>
.greenPoint {
  background-color: springgreen;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  margin-right: 8px;
  border-radius: 50%;
  display: block;
  margin: auto;
}

.redPoint {
  background-color: red;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  margin-right: 8px;
  border-radius: 50%;
  display: block;
  margin: auto;
}
</style>