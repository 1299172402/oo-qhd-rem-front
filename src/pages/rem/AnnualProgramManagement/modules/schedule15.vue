<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表15 秦皇岛32-6/渤中作业公司提高采收率实施路径"
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
        <el-table-column prop="operationarea" label="作业公司" align="center" width="120"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" width="120"></el-table-column>
        <el-table-column prop="czwt" label="存在问题" align="center" width="340"></el-table-column>
        <el-table-column prop="ghcsl" :label="`规划采收率\n(%)`" align="center" width="120"></el-table-column>
        <el-table-column prop="sslj" label="实施路径" align="center" width="340"></el-table-column>
        <el-table-column
          prop="ztmb"
          :label="`总体目标（油水井数比、阶段注采比、\n压力保持水平、含水上升率、自然递减率等）`"
          align="center"
          width="340"
        ></el-table-column>
        <el-table-column prop="slfd" :label="`提高采收率幅度\n（%）`" align="center" width="140"></el-table-column>
        <el-table-column prop="kccl" :label="`增加石油可采储量\n(10⁴t)`" align="center" width="140"></el-table-column>
        <el-table-column prop="zdcs" label="重大措施" align="center" width="340"></el-table-column>
        <el-table-column prop="csjk" label="配套措施简况" align="center" width="340"></el-table-column>
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
          czwt: "1、油田整体含水高，水驱效率低，油田液处理能力受限，基础产量及措施产量存在风险；2、油田进入特高含水阶段、主力砂体挖潜难度越来越大，目前井网难动用；3、优质主力砂体水驱采收率高，进一步提高采收率难度大",
          sslj: "1、深化优化注水，降低自然递减率，实施扩容改造；2、精细刻画剩余油，深化油田挖潜工作；3、优选潜力井区，开展三次采油",
          ztmb: "十五五”末实现油水井数比降至1.8，阶段注采比1.0，压力保持水平90%，含水上升率控制在0.2%，自然递减率降至10%以内",
          slfd: "6.25",
          kccl: "1034.05",
          zdcs: "1、油井转注41井次；2、2020~2030年增加调整井128口；3、2026年开始实施化学驱，化学驱储量约4500万吨，涉及55个井组",
          csjk: "1、2021年8月完成全油田扩容改造；2、H平台2020-2021年内挂实施10口调整井；其余通过其他平台外挂及低效井逐步实施",
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
::v-deep .el-table .el-table__body-wrapper .cell {
  height: auto;
  line-height: 40px;
}
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