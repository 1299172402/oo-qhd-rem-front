<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表13 秦皇岛32-6/渤中作业公司石油地质储量动用规划"
      :isShowMaxBtn="true"
      style="margin-top: 10px"
    >
      <el-table
        id="tableData"
        :data="tableData"
        border
        :header-cell-style="{ background: 'transparent', color: '#fff' }"
        :span-method="objectSpanMethodOne"
        highlight
        height="calc(100% - 40px)"
      >
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column
          prop="operationarea"
          label="作业公司"
          align="center"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="oilField"
          label="油田"
          align="center"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column :label="`纳入规划地质储量\n(10⁴t)`" align="center">
          <el-table-column prop="nrghtm" label="探明" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
          <el-table-column prop="nrghhj" label="合计" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column :label="`规划动用地质储量\n(10⁴t)`" align="center">
          <el-table-column prop="ghdytm" label="探明" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
          <el-table-column prop="ghdyhj" label="合计" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column :label="`动用程度\n(%)`" align="center">
          <el-table-column prop="dycdtm" label="探明" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
          <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
          <el-table-column prop="dycdhj" label="合计" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column prop="ghkccl" :label="'规划可采储量\n(10⁴t)'" align="center" width="140"></el-table-column>
        <el-table-column prop="ghcsl" :label="'规划采收率\n(%)'" align="center" width="140"></el-table-column>
        <el-table-column prop="ljcl" :label="'2019年底累积产量\n(10⁴t)'" align="center" width="160"></el-table-column>
        <el-table-column prop="sykccl" :label="'剩余可采储量\n(10⁴t)'" align="center" width="140"></el-table-column>
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
      pos: "",
      tableData: [
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          nrghtm: "18756.486",
          nrghhj: "18756.486",
          ghdytm: "14888.565",
          ghdyhj: "14888.565",
          dycdtm: "71.442",
          dycdhj: "71.442",
          ghkccl: "6188.688",
          ghcsl: "37.413",
          ljcl: "3116.007",
          sykccl: "3072.681",
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
      console.log("zmmm--", data); //从后台获取的数据
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
  content: "-";
}
#tableData {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 18px;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>