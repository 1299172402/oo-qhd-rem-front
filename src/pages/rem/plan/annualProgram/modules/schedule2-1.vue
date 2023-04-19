<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表2-1 2019年秦皇岛32-6/渤中作业公司探明地质储量动用情况"
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
        <el-table-column prop="operationarea" label="作业公司" align="center" width="100"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" width="100"></el-table-column>
        <el-table-column prop="provedreserves" label="探明地质储量(10⁴t)" align="center" width="160"></el-table-column>
        <el-table-column
          prop="useprovengeologicalreserves"
          label="动用探明地质储量(10⁴t)"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column label="未动用探明地质储量(10⁴t)" align="center">
          <el-table-column prop="reservesengineering1" label="工程" align="center" width="100"></el-table-column>
          <el-table-column prop="reservesheavyoil" label="稠油" align="center" width="100"></el-table-column>
          <el-table-column prop="reservesthreelow" label="三低" align="center" width="100"></el-table-column>
          <el-table-column prop="reservesother" label="其他" align="center" width="100"></el-table-column>
          <el-table-column prop="reservessubtotal" label="小计" align="center" width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="未动用探明地质储量规划/计划动用(10⁴t)" align="center">
          <el-table-column prop="plansengineering" label="工程" align="center" width="100"></el-table-column>
          <el-table-column prop="plansheavyoil" label="稠油" align="center" width="100"></el-table-column>
          <el-table-column prop="plansthreelow" label="三低" align="center" width="100"></el-table-column>
          <el-table-column prop="plansother" label="其他" align="center" width="100"></el-table-column>
          <el-table-column prop="planssubtotal" label="小计" align="center" width="100"></el-table-column>
        </el-table-column>
        <el-table-column prop="plannedusage" label="规划/计划动用方式" align="center" width="200"></el-table-column>
        <el-table-column prop="remainingunused" label="剩余未动用主要原因" align="center" width="240"></el-table-column>
      </el-table>
    </info-window>
  </el-container>
</template>
  <script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      spanArrOne: [],
      pos: '',
      tableData: [
        {
          oilField: 'QHD32-6',
          provedreserves: '18756.486',
          operationarea: '秦皇岛',
          useprovengeologicalreserves: '14291.1',
          reservesthreelow: '4465.386',
          reservessubtotal: '4465.386',
          plansthreelow: '886.833',
          planssubtotal: '886.833',
          plannedusage: '后期低产低效井侧钻',
          remainingunused: '非主力砂体薄、差、小、散',
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
      if (columnIndex >= 0 && columnIndex < 4) {
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

.image {
  width: 100px;
  display: block;
}
::v-deep .el-table .cell:empty::before {
  content: '-';
}
</style>