<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表10 秦皇岛32-6/渤中作业公司井网适应性情况"
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
        <el-table-column prop="xh" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="operationarea" label="作业公司" align="center" width="120"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" width="120"></el-table-column>
        <el-table-column prop="dydzcl" :label="'动用地质储量\n(10⁴t)'" align="center" width="140"></el-table-column>
        <el-table-column
          prop="ljysjzjs"
          :label="'累计油水井总井数\n（含有生产贡献的被侧钻井）\n（口）'"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column prop="dqysjzs" :label="'当前油水井总数\n（口）'" align="center" width="140"></el-table-column>
        <el-table-column label="油井开井数" align="center">
          <el-table-column prop="yjxj" label="小计" align="center" width="100"></el-table-column>
          <el-table-column prop="yjspj" label="其中：水平井" align="center" width="100"></el-table-column>
          <el-table-column prop="yjfcj" label="其中：定向井分采井" align="center" width="100"></el-table-column>
          <el-table-column prop="yjhcj" label="其中：定向井合采井" align="center" width="100"></el-table-column>
        </el-table-column>
        <el-table-column label="水井开井数" align="center">
          <el-table-column prop="sjxj" label="小计" align="center" width="100"></el-table-column>
          <el-table-column prop="sjspj" label="其中：水平井" align="center" width="100"></el-table-column>
          <el-table-column prop="sjfzj" label="其中：定向井分注井" align="center" width="100"></el-table-column>
          <el-table-column prop="sjtzj" label="其中：定向井统注井" align="center" width="100"></el-table-column>
        </el-table-column>
        <el-table-column
          prop="hymj"
          :label="'当前井网控制含油面积\n（k㎡）'"
          align="center"
          width="170"
        ></el-table-column>
        <el-table-column prop="jwmd" :label="'井网密度\n(口/k㎡)'" align="center" width="120"></el-table-column>
        <el-table-column prop="jkcl" :label="'井控储量\n(10⁴t)'" align="center" width="120"></el-table-column>
        <el-table-column prop="ysjsb" label="油水井数比" align="center" width="120"></el-table-column>
        <el-table-column prop="ljzcb" label="累计注采比" align="center" width="120"></el-table-column>
        <el-table-column prop="zcb" label="2020年度注采比" align="center" width="140"></el-table-column>
        <el-table-column prop="ylbcsp" label="压力保持水平（%）" align="center" width="140"></el-table-column>
        <el-table-column label="油井注采受效情况占比（%）" align="center">
          <el-table-column prop="qkzbdx" label="多向" align="center"></el-table-column>
          <el-table-column prop="qkzbsx" label="双向" align="center"></el-table-column>
          <el-table-column prop="qkzbdx1" label="单向" align="center"></el-table-column>
          <el-table-column prop="qkzbbsx" label="不受效" align="center"></el-table-column>
          <el-table-column prop="qkzbwzsj" label="无注水井" align="center"></el-table-column>
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
          xh: '1',
          oilField: 'QHD32-6',
          dydzcl: '15879',
          ljysjzjs: '391',
          dqysjzs: '351',
          yjspj: '180',
          yjfcj: '13',
          yjhcj: '56',
          sjspj: '8',
          sjfzj: '77',
          sjtzj: '0',
          hymj: '43.16',
          jwmd: '7.7',
          jkcl: '40.6',
          ysjsb: '2.9',
          ljzcb: '0.5',
          zcb: '0.7',
          ylbcsp: '95.96',
          qkzbdx: '19.3',
          qkzbsx: '28.9',
          qkzbdx1: '48.6',
          qkzbbsx: '0',
          qkzbwzsj: '3.2',
          note: '油田边、底水丰富，天然能量占比大',
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