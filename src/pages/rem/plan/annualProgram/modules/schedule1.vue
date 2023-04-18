<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表1 秦皇岛32-6/渤中作业公司开发现状汇总表"
      :isShowMaxBtn="true"
      style="margin-top: 10px"
    >
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: 'transparent', color: '#fff' }"
        :span-method="objectSpanMethodOne"
        highlight
        height="calc(100% - 40px)"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="operationarea" label="作业公司" align="center" min-width="140"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" min-width="120"></el-table-column>
        <el-table-column
          prop="reservoirsType"
          :label="'油藏类型\n（分公司标准）'"
          align="center"
          min-width="160"
        ></el-table-column>
        <el-table-column label="油井总数" align="center">
          <el-table-column prop="proWellCount" label="口" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="油井开井数" align="center">
          <el-table-column prop="proWellOpen" label="口" align="center" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="油井利用率" align="center">
          <el-table-column prop="wellUtilization" label="%" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="生产井时率" align="center">
          <el-table-column prop="productionrate" label="%" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="综合时率" align="center">
          <el-table-column prop="combinedtimerate" label="%" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="注水井总数" align="center">
          <el-table-column prop="waterWellCount" label="口" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="注水井开井数" align="center">
          <el-table-column prop="waterWellOpen" label="口" align="center" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="月产油量" align="center">
          <el-table-column prop="oilproduction" label="10⁴m³" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="日产油水平" align="center">
          <el-table-column prop="dailyoillevel" label="m³/d" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="日产油能力" align="center">
          <el-table-column prop="dailyfuelcapacity" label="m³/d" align="center" min-width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="综合气油比" align="center">
          <el-table-column
            prop="Comprehensivegasoilratio"
            label="m³/d"
            align="center"
            min-width="100"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="综合含水" align="center">
          <el-table-column prop="compressiveWaterCut" label="%" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="动用地质储量" align="center">
          <el-table-column prop="workingreserve" label="10⁴t" align="center" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="采油速度" align="center">
          <el-table-column prop="outputSpeed" label="%" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="采出程度" align="center">
          <el-table-column prop="outputDegree" label="%" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="当前井网标定采收率" align="center">
          <el-table-column prop="Designatedrecoveryfactor" label="%" align="center" min-width="100"></el-table-column>
        </el-table-column>
      </el-table>
    </info-window>
  </el-container>
</template>
  <script>
export default {
  data() {
    return {
      page: 1,
      currentPage: 1,
      //合并
      spanArrOne: [],
      pos: '',
      pageSize: 10,
      tableData: [
        {
          operationarea: '秦皇岛32-6/渤中',
          oilField: 'QHD32-6',
          reservoirsType: '中高渗河流相稠油',
          proWellCount: '266',
          proWellOpen: '249',
          wellUtilization: '93.6',
          productionrate: '96.6',
          combinedtimerate: '92.6',
          waterWellCount: '85',
          waterWellOpen: '85',
          oilproduction: '21.94',
          dailyoillevel: '7079',
          dailyfuelcapacity: '7330',
          Comprehensivegasoilratio: '30',
          compressiveWaterCut: '93.6',
          workingreserve: '15879',
          outputSpeed: '1.47',
          outputDegree: '21.8',
          Designatedrecoveryfactor: '36.8',
        },
      ],
    };
  },
  mounted() {
    this.getSpanArrOne(this.tableData);
  },

  methods: {
    //合并
    objectSpanMethodOne({ row, column, rowIndex, columnIndex }) {
      // columnIndex === xx 找到第xx列，实现合并随机出现的行数
      if (columnIndex >= 0 && columnIndex < 3) {
        if (!this.tableData[rowIndex]) {
          //1列 1行
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
        // console.log(this.tableData[rowIndex].contractNo);
        if (
          this.tableData[rowIndex - 1] &&
          this.tableData[rowIndex].contractNo === this.tableData[rowIndex - 1].contractNo
        ) {
          if (this.tableData[rowIndex][column.property] === this.tableData[rowIndex - 1][column.property]) {
            //0列 0 行
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
        if (
          this.tableData[rowIndex + 1] &&
          this.tableData[rowIndex].contractNo === this.tableData[rowIndex + 1].contractNo
        ) {
          if (this.tableData[rowIndex][column.property] === this.tableData[rowIndex + 1][column.property]) {
            let conutRowSpan = 1,
              countIndex = 1;
            var len = this.tableData.length;
            //往下遍历 重复的列有几个 合并几个
            for (var i = rowIndex; i <= len; i++) {
              //遍历数组
              if (
                this.tableData[rowIndex + countIndex] &&
                this.tableData[rowIndex][column.property] === this.tableData[rowIndex + countIndex][column.property]
              ) {
                countIndex += 1;
                conutRowSpan += 1;
              } else {
                break;
              }
            }
            //2列1行
            return {
              rowspan: conutRowSpan,
              colspan: 1,
            };
          }
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
    },
    // 因为要合并的行数是不固定的，此函数是实现合并随意行数的功能
    getSpanArrOne(data) {
      console.log('zmmm--', data); //从后台获取的数据
      this.spanArrOne = [];
      this.pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArrOne.push(1);
          this.pos = 0;
        } else {
          if (data[i].platform === data[i - 1].platform) {
            // 如果platform相等就累加，并且push 0
            this.spanArrOne[this.pos] += 1;
            this.spanArrOne.push(0);
          } else {
            // 不相等push 1
            this.spanArrOne.push(1);
            this.pos = i;
          }
        }
      }
    },
  },
};
</script>
  <style lang="scss" scoped>
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}

.titleBox {
  margin-top: 15px;
}

.basicTable {
  height: auto;
  // padding-bottom: 10px;
}

.container {
  display: flex;
  flex-direction: column; /* 按照列column(垂直方向)排列*/
}
::v-deep .el-table .cell {
  white-space: pre-line;
}

::v-deep .el-table .cell:empty::before {
  content: '-';
}
</style>