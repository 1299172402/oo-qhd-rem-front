<template>
  <el-container class="layout">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="附表18 秦皇岛32-6/渤中作业公司示范油田概况"
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
        <el-table-column prop="oilField" label="示范油田" align="center" width="120"></el-table-column>
        <el-table-column
          prop="kfjd"
          label="开发阶段（在生产、在建设、开发评价）"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column label="开发现状" align="center">
          <el-table-column prop="dydzcl" :label="'动用地质储量\n(10⁴t)'" align="center" width="140"></el-table-column>
          <el-table-column prop="bdcsl" :label="'当前标定采收率\n(%)'" align="center" width="140"></el-table-column>
          <el-table-column prop="sycl" :label="'2019年石油产量\n(10⁴t)'" align="center" width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="示范工程简况" align="center">
          <el-table-column
            prop="sfnr"
            label="重点示范内容（综合调整、二次加密、稠油热采、低渗压裂、注气开发等"
            align="center"
            width="340"
          ></el-table-column>
          <el-table-column
            prop="gfdycl"
            :label="'规划动用地质储量\n(10⁴t)'"
            align="center"
            width="140"
          ></el-table-column>
          <el-table-column prop="kccl" :label="'增加石油可采储量\n(10⁴t)'" align="center" width="140"></el-table-column>
          <el-table-column prop="cslfd" :label="'提高采收率幅度\n(%)'" align="center" width="140"></el-table-column>
          <el-table-column prop="ssjs" :label="'规划实施井数\n(口)'" align="center" width="140"></el-table-column>
          <el-table-column prop="gfcn" :label="'高峰产能\n(10⁴t)'" align="center" width="140"></el-table-column>
          <el-table-column prop="kftz" :label="'预计开发投资\n(亿元)'" align="center" width="140"></el-table-column>
          <el-table-column prop="ssnf" label="规划实施年份" align="center" width="140"></el-table-column>
        </el-table-column>
        <el-table-column prop="csjk" label="配套措施简况" align="center" width="440"></el-table-column>
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
          dydzcl: "15879",
          bdcsl: "36.8",
          sycl: "233.03196095",
          sfnr: "海上大型河流相稠油油田“双特高”期稳油控水关键技术示范",
          gfdycl: "16864.37",
          cslfd: "6.25",
          gfcn: "233.46",
          kftz: "11.92",
          ssnf: "2020",
          csjk: "1、2020年完成H平台内挂改造、2021年完成G平台内挂改造，2020-2030年通过内、外挂和低效井侧钻实施调整井128口；2、转注30口，年调驱井次8~10口；3、2021年8月完成扩容改造；4、2026年开始实施化学驱",
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
</style>