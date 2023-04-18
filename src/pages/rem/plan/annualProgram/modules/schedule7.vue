<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表7 秦皇岛32-6/渤中作业公司年自然递减率作业因素分解"
      :isShowMaxBtn="true"
      style="margin-top:10px"
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
        <el-table-column label="作业因素分解" align="center">
          <el-table-column label="有修井机平台举升系统故障" align="center">
            <el-table-column label="故障待修" align="center">
              <el-table-column
                prop="organicmalfunctionsannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="organicmalfunctionsaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="检修作业" align="center">
              <el-table-column
                prop="organicoverhaulingannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="organicoverhaulingaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="检修后产量下降" align="center">
              <el-table-column
                prop="organicyieldannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="organicyieldaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="无修井机平台举升系统故障" align="center">
            <el-table-column label="故障待修" align="center">
              <el-table-column
                prop="inorganicsmalfunctionsannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="inorganicsmalfunctionsaffectyield"
                label="影响产量（m³）"
                width="100"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="检修作业" align="center">
              <el-table-column
                prop="inorganicsoverhaulingannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="inorganicsoverhaulingaffectyield"
                label="影响产量（m³）"
                width="100"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="检修后产量下降" align="center">
              <el-table-column
                prop="inorganicsyieldannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="inorganicsyieldaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="增产作业" align="center">
            <el-table-column label="作业期间损失" align="center">
              <el-table-column
                prop="operationallossannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="operationallossaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="作业后效果变差" align="center">
              <el-table-column
                prop="aftertheworkannualnaturaldecrease"
                label="年自然递减（%）"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="aftertheworkaffectyield"
                label="影响产量（m³）"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="测试" align="center">
            <el-table-column
              prop="testingannualnaturaldecrease"
              label="年自然递减（%）"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="testingaffectyield"
              label="影响产量（m³）"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="其他因素" align="center">
            <el-table-column
              prop="otherannualnaturaldecrease"
              label="年自然递减（%）"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="otheraffectyield"
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
      pos: '',
      tableData: [
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          years: '2017',
          annualnaturaldecline: '0.89',
          affectyield: '21962',
          organicmalfunctionsannualnaturaldecrease: '0.3124',
          organicmalfunctionsaffectyield: '7734',
          organicoverhaulingannualnaturaldecrease: '0.2012',
          inorganicsoverhaulingaffectyield: '4982',
          inorganicsyieldannualnaturaldecrease: '0.1364',
          inorganicsyieldaffectyield: '3378',
          inorganicsmalfunctionsannualnaturaldecrease: '',
          inorganicsmalfunctionsaffectyield: '',
          operationallossannualnaturaldecrease: '0.158',
          operationallossaffectyield: '3912',
          aftertheworkannualnaturaldecrease: '0.0476',
          aftertheworkaffectyield: '1179',
          testingannualnaturaldecrease: '0.0314',
          testingaffectyield: '777',
          otherannualnaturaldecrease: '',
          otheraffectyield: '',
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          years: '2018',
          annualnaturaldecline: '0.91',
          affectyield: '21559',
          organicmalfunctionsannualnaturaldecrease: '0.5327',
          organicmalfunctionsaffectyield: '12649',
          organicoverhaulingannualnaturaldecrease: '0.0307',
          inorganicsoverhaulingaffectyield: '730',
          inorganicsyieldannualnaturaldecrease: '0.1069',
          inorganicsyieldaffectyield: '2537',
          inorganicsmalfunctionsannualnaturaldecrease: '',
          inorganicsmalfunctionsaffectyield: '',
          operationallossannualnaturaldecrease: '0.1017',
          operationallossaffectyield: '2414',
          aftertheworkannualnaturaldecrease: '0.0639',
          aftertheworkaffectyield: '1518',
          testingannualnaturaldecrease: '0.0449',
          testingaffectyield: '1066',
          otherannualnaturaldecrease: '0.0272',
          otheraffectyield: '645',
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          years: '2019',
          annualnaturaldecline: '0.77',
          affectyield: '18317',
          organicmalfunctionsannualnaturaldecrease: '0.5013',
          organicmalfunctionsaffectyield: '11969',
          organicoverhaulingannualnaturaldecrease: '0.0652',
          inorganicsoverhaulingaffectyield: '1557',
          inorganicsyieldannualnaturaldecrease: '0.0277',
          inorganicsyieldaffectyield: '662',
          inorganicsmalfunctionsannualnaturaldecrease: '',
          inorganicsmalfunctionsaffectyield: '',
          operationallossannualnaturaldecrease: '0.0728',
          operationallossaffectyield: '1738',
          aftertheworkannualnaturaldecrease: '0.071',
          aftertheworkaffectyield: '1696',
          testingannualnaturaldecrease: '0.0291',
          testingaffectyield: '695',
          otherannualnaturaldecrease: '',
          otheraffectyield: '',
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          years: '2020',
          annualnaturaldecline: '0.83',
          affectyield: '21940',
          organicmalfunctionsannualnaturaldecrease: '0.356',
          organicmalfunctionsaffectyield: '9365',
          organicoverhaulingannualnaturaldecrease: '0.074',
          inorganicsoverhaulingaffectyield: '1947',
          inorganicsyieldannualnaturaldecrease: '0.1809',
          inorganicsyieldaffectyield: '4759',
          inorganicsmalfunctionsannualnaturaldecrease: '0.0002',
          inorganicsmalfunctionsaffectyield: '6',
          operationallossannualnaturaldecrease: '0.1634',
          operationallossaffectyield: '4298',
          aftertheworkannualnaturaldecrease: '0.0344',
          aftertheworkaffectyield: '904',
          testingannualnaturaldecrease: '0.0226',
          testingaffectyield: '594',
          otherannualnaturaldecrease: '0.0025',
          otheraffectyield: '67',
        },
      ],
    };
  },
  mounted() {
    this.getSpanArrOne(this.tableData);
    this.addLine();
  },
  methods: {
    addLine() {
      //添加行数
      var newValue = {
        operationarea: '说明',
        organicmalfunctionsannualnaturaldecrease: '故障停产至队伍上平台之前',
        organicoverhaulingannualnaturaldecrease: '队伍上平台至启泵生产',
        inorganicsmalfunctionsannualnaturaldecrease: '故障停产至队伍上平台之前',
        inorganicsoverhaulingannualnaturaldecrease: '队伍上平台至启泵生产',
        operationallossannualnaturaldecrease: '停产至复产',
      };
      //添加新的行数
      this.tableData.push(newValue);
    },
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
::v-deep .el-table .cell:empty::before {
  content: '-';
}
</style>