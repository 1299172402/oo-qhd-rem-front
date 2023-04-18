<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表4 秦皇岛32-6/渤中作业公司年自然递减率主控因素分析"
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
        <el-table-column prop="operationarea" label="作业公司" align="center" width="100"></el-table-column>

        <el-table-column prop="oilField" label="油田" align="center" width="100"></el-table-column>
        <el-table-column prop="years" label="年" align="center"></el-table-column>
        <el-table-column
          prop="annualnaturaldecline"
          :label="`年自然递减\n（%）`"
          align="center"
          width="140"
        ></el-table-column>
        <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" width="140"></el-table-column>
        <el-table-column label="各主控因素分解" align="center">
          <el-table-column label="地质油藏因素" align="center">
            <el-table-column
              prop="geologyannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="geologyaffectyield"
              :label="`影响产量\n（m³）`"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="井筒因素" align="center">
            <el-table-column
              prop="wellboreannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="wellboreaffectyield"
              :label="`影响产量\n（m³）`"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="作业因素" align="center">
            <el-table-column
              prop="workannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="workaffectyield"
              :label="`影响产量\n（m³）`"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="工程因素" align="center">
            <el-table-column
              prop="projectannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="projectaffectyield"
              :label="`影响产量\n（m³）`"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="生产运行因素" align="center">
            <el-table-column
              prop="productionannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="productionaffectyield"
              :label="`影响产量\n（m³）`"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="其他因素" align="center">
            <el-table-column
              prop="otherannualnaturaldecrease"
              :label="`年自然递减\n（%）`"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="otheraffectyield"
              :label="`影响产量\n（m³）`"
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
          annualnaturaldecline: "14.26",
          affectyield: "353012",
          geologyannualnaturaldecrease: "10.6464",
          geologyaffectyield: "263586",
          wellboreannualnaturaldecrease: "2.463",
          wellboreaffectyield: "60980",
          workannualnaturaldecrease: "0.887",
          workaffectyield: "21962",
          projectannualnaturaldecrease: "0.2038",
          projectaffectyield: "5047",
          productionannualnaturaldecrease: "0.058",
          productionaffectyield: "1437",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2018",
          annualnaturaldecline: "11",
          affectyield: "261081",
          geologyannualnaturaldecrease: "7.1253",
          geologyaffectyield: "169179",
          wellboreannualnaturaldecrease: "2.7206",
          wellboreaffectyield: "64596",
          workannualnaturaldecrease: "0.908",
          workaffectyield: "21559",
          projectannualnaturaldecrease: "0.0125",
          projectaffectyield: "297",
          productionannualnaturaldecrease: "0.2295",
          productionaffectyield: "5450",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2019",
          annualnaturaldecline: "9.07",
          affectyield: "216557",
          geologyannualnaturaldecrease: "5.0635",
          geologyaffectyield: "120901",
          wellboreannualnaturaldecrease: "2.6176",
          wellboreaffectyield: "62501",
          workannualnaturaldecrease: "0.7671",
          workaffectyield: "18317",
          projectannualnaturaldecrease: "0.1922",
          projectaffectyield: "4589",
          productionannualnaturaldecrease: "0.4292",
          productionaffectyield: "10249",
        },
        {
          operationarea: "秦皇岛",
          oilField: "QHD32-6",
          years: "2020",
          annualnaturaldecline: "15",
          affectyield: "394584",
          geologyannualnaturaldecrease: "11.0429",
          geologyaffectyield: "290495",
          wellboreannualnaturaldecrease: "2.4757",
          wellboreaffectyield: "65126",
          workannualnaturaldecrease: "0.834",
          workaffectyield: "21940",
          projectannualnaturaldecrease: "0.4491",
          projectaffectyield: "11814",
          productionannualnaturaldecrease: "0.198",
          productionaffectyield: "5209",
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