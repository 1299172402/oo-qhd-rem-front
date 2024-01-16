<template>
  <el-container class="layout">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="附表8 秦皇岛32-6/渤中作业公司年自然递减率工程因素分解"
      :is-show-max-btn="true"
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
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="operationarea" label="作业公司" align="center" width="120"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" width="120"></el-table-column>
        <el-table-column prop="years" label="年" align="center"></el-table-column>
        <el-table-column
          prop="annualnaturaldecline"
          label="年自然递减（%）"
          align="center"
          width="140"
        ></el-table-column>
        <el-table-column prop="affectyield" label="影响产量（m³）" align="center" width="140"></el-table-column>
        <el-table-column label="工程因素分解" align="center">
          <el-table-column label="计划内检修" align="center">
            <el-table-column prop="jhnzrdj" label="年自然递减（%）" align="center" width="100"></el-table-column>
            <el-table-column prop="jhnyxcl" label="影响产量（m³）" align="center" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="计划外停产" align="center">
            <el-table-column label="电力系统故障" align="center">
              <el-table-column prop="dlxtzrdj" label="年自然递减（%）" align="center" width="100"></el-table-column>
              <el-table-column prop="dlxtyxcl" label="影响产量（m³）" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column label="仪器仪表" align="center">
              <el-table-column prop="yqybzrdj" label="年自然递减（%）" align="center" width="100"></el-table-column>
              <el-table-column prop="yqybyxcl" label="影响产量（m³）" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column label="流程跑冒" align="center">
              <el-table-column
                prop="string-affectyield"
                label="年自然递减（%）"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="string-affectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="井口装置故障" align="center">
              <el-table-column prop="jkzzzrdj" label="年自然递减（%）" align="center" width="100"></el-table-column>
              <el-table-column prop="jkzzyxcl" label="影响产量（m³）" align="center" width="100"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="其他因素" align="center">
            <el-table-column
              prop="string-affectyield"
              label="年自然递减（%）"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="string-affectyield"
              label="影响产量（m³）"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="note" label="备注" align="center" width="240"></el-table-column>
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
          years: "2017",
          annualnaturaldecline: "0.2",
          affectyield: "5047",
          jhnzrdj: "0.0208",
          jhnyxcl: "515",
          dlxtzrdj: "0.1473",
          dlxtyxcl: "3648",
          yqybzrdj: "0.0188",
          yqybyxcl: "466",
          jkzzzrdj: "0.0169",
          jkzzyxcl: "418",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2018",
          annualnaturaldecline: "0.01",
          affectyield: "297",
          jhnzrdj: "0.0006",
          jhnyxcl: "14",
          dlxtzrdj: "0.0118",
          dlxtyxcl: "280",
          yqybzrdj: "",
          yqybyxcl: "",
          jkzzzrdj: "0.0001",
          jkzzyxcl: "3",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2019",
          annualnaturaldecline: "0.19",
          affectyield: "4589",
          jhnzrdj: "0.1913",
          jhnyxcl: "4568",
          dlxtzrdj: "0.0009",
          dlxtyxcl: "21",
          yqybzrdj: "",
          yqybyxcl: "",
          jkzzzrdj: "",
          jkzzyxcl: "",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2020",
          annualnaturaldecline: "0.45",
          affectyield: "11814",
          jhnzrdj: "0.0325",
          jhnyxcl: "854",
          dlxtzrdj: "0.4166",
          dlxtyxcl: "10960",
          yqybzrdj: "",
          yqybyxcl: "",
          jkzzzrdj: "",
          jkzzyxcl: "",
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
      // console.log("zmmm--", data); //从后台获取的数据
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
::v-deep .el-table .cell:empty::before {
  content: "-";
}
</style>