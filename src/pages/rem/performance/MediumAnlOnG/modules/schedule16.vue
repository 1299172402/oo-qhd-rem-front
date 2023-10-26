<template>
  <el-container class="layout">
    <info-window
    info-width="100%"
    info-height="100%"
    header-title="附表16 秦皇岛32-6/渤中作业公司提高单井产量实施路径"
    :is-show-max-btn="true"
    style="margin-top: 10px"
  >
      
  <el-table :data="tableData" border :header-cell-style="{background:'transparent',color:'#fff'}"
  :span-method="objectSpanMethodOne" highlight height="calc(100% - 40px)">
<el-table-column prop="xh" label="序号" align="center"></el-table-column>
<el-table-column prop="operationarea" label="作业公司" align="center" width="140"></el-table-column>
<el-table-column prop="oilField" label="油田" align="center" width="120" ></el-table-column>
<el-table-column prop="kfjd" label="开发阶段（在生产、在建设、开发评价）" align="center" width="120"></el-table-column>
<el-table-column prop="clsd" label="提高单井产量手段（包括但不限于稠油热采、低渗压裂、注气开发等）" align="center" width="120"></el-table-column>
<el-table-column label="实施井数(口)" align="center">
<el-table-column prop="dxj" label="定向井" align="center"></el-table-column>
<el-table-column prop="spj" label="水平井" align="center"></el-table-column>
<el-table-column prop="ssjsxj" label="小计" align="center"></el-table-column>
</el-table-column>
<el-table-column label="提高单井产量情况" align="center">
<el-table-column prop="pjcl" label="措施前单井平均产量(t/d)" align="center" width="120"></el-table-column>
<el-table-column prop="clyc" label="措施后单井平均产量预测（三个月）(t/d)" align="center" width="120"></el-table-column>
<el-table-column prop="zcps" label="增产倍数" align="center" width="120"></el-table-column>
</el-table-column>
<el-table-column prop="csjk" label="配套措施简况" align="center" width="120"></el-table-column>
<el-table-column label="不做措施产油量预测(10⁴t)" align="center">
<el-table-column prop="b2020" label="2020" align="center"></el-table-column>
<el-table-column prop="b2021" label="2021" align="center"></el-table-column>
<el-table-column prop="b2022" label="2022" align="center"></el-table-column>
<el-table-column prop="b2023" label="2023" align="center"></el-table-column>
<el-table-column prop="b2024" label="2024" align="center"></el-table-column>
<el-table-column prop="b2025" label="2025" align="center"></el-table-column>
<el-table-column prop="b2026" label="2026" align="center"></el-table-column>
<el-table-column prop="b2027" label="2027" align="center"></el-table-column>
<el-table-column prop="b2028" label="2028" align="center"></el-table-column>
<el-table-column prop="b2029" label="2029" align="center"></el-table-column>
<el-table-column prop="b2030" label="2030" align="center"></el-table-column>
</el-table-column>
<el-table-column label="做措施后产油量预测(10⁴t)" align="center">
<el-table-column prop="z2020" label="2020" align="center"></el-table-column>
<el-table-column prop="z2021" label="2021" align="center"></el-table-column>
<el-table-column prop="z2022" label="2022" align="center"></el-table-column>
<el-table-column prop="z2023" label="2023" align="center"></el-table-column>
<el-table-column prop="z2024" label="2024" align="center"></el-table-column>
<el-table-column prop="z2025" label="2025" align="center"></el-table-column>
<el-table-column prop="z2026" label="2026" align="center"></el-table-column>
<el-table-column prop="z2027" label="2027" align="center"></el-table-column>
<el-table-column prop="z2028" label="2028" align="center"></el-table-column>
<el-table-column prop="z2029" label="2029" align="center"></el-table-column>
<el-table-column prop="z2030" label="2030" align="center"></el-table-column>
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
      pageSize: 10,
      spanArrOne: [],
      pos: '',
      tableData: [
        {
          operationarea: '秦皇岛32-6/渤中',
          xh: '1',
          oilField: '秦皇岛32-6',
          kfjd: '在生产',
          clsd: "热采",
          dxj: "1",
          spj: "3",
          ssjsxj: "4",
          pjcl: "12",
          clyc: "12",
          zcps: "1",
          b2020: "200",
          b2021: "210",
          b2022: "220",
          b2023: "230",
          b2024: "240",
          b2025: "250",
          b2026: "260",
          b2027: "270",
          b2028: "280",
          b2029: "290",
          b2030: "300",
          z2020: "250",
          z2021: "280",
          z2022: "310",
          z2023: "340",
          z2024: "370",
          z2025: "400",
          z2026: "430",
          z2027: "460",
          z2028: "490",
          z2029: "520",
          z2030: "550"
        },

        {
          operationarea: '秦皇岛32-6/渤中',
          xh: '2',
          oilField: '秦皇岛32-6',
          kfjd: '在生产',
          clsd: "聚合物",
          dxj: "3",
          spj: "4",
          ssjsxj: "7",
          pjcl: "12",
          clyc: "12",
          zcps: "1",
          b2020: "201",
          b2021: "211",
          b2022: "221",
          b2023: "231",
          b2024: "241",
          b2025: "251",
          b2026: "261",
          b2027: "271",
          b2028: "281",
          b2029: "291",
          b2030: "301",
          z2020: "251",
          z2021: "281",
          z2022: "311",
          z2023: "341",
          z2024: "371",
          z2025: "401",
          z2026: "431",
          z2027: "461",
          z2028: "491",
          z2029: "521",
          z2030: "551"
        },

        {
          operationarea: '秦皇岛32-6/渤中',
          xh: '3',
          oilField: '秦皇岛32-6',
          kfjd: '在生产',
          clsd: "分支井",
          dxj: "0",
          spj: "1",
          ssjsxj: "1",
          pjcl: "12",
          clyc: "12",
          zcps: "1",
          b2020: "202",
          b2021: "212",
          b2022: "222",
          b2023: "232",
          b2024: "242",
          b2025: "252",
          b2026: "262",
          b2027: "272",
          b2028: "282",
          b2029: "292",
          b2030: "302",
          z2020: "252",
          z2021: "282",
          z2022: "312",
          z2023: "342",
          z2024: "372",
          z2025: "402",
          z2026: "432",
          z2027: "462",
          z2028: "492",
          z2029: "522",
          z2030: "552"
        },
      ],
    };
  },
  mounted() {
    this.getSpanArrOne(this.tableData);
  },
  methods: {
    //合并
    objectSpanMethodOne({row, column, rowIndex, columnIndex}) {
      // columnIndex === xx 找到第xx列，实现合并随机出现的行数
      if (columnIndex >= 0 && columnIndex < 3) {
        if (!this.tableData[rowIndex]) {
          //1列 1行
          return {
            rowspan: 1,
            colspan: 1
          };
        }
        // console.log(this.tableData[rowIndex].contractNo);
        if (this.tableData[rowIndex - 1] && this.tableData[rowIndex].contractNo === this.tableData[rowIndex - 1].contractNo) {
          if (this.tableData[rowIndex][column.property] === this.tableData[rowIndex - 1][column.property]) {
            //0列 0 行
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (this.tableData[rowIndex + 1] && this.tableData[rowIndex].contractNo === this.tableData[rowIndex + 1].contractNo) {
          if (this.tableData[rowIndex][column.property] === this.tableData[rowIndex + 1][column.property]) {
            let conutRowSpan = 1,
                countIndex = 1;
            var len = this.tableData.length;
            //往下遍历 重复的列有几个 合并几个
            for (var i = rowIndex; i <= len; i++) {  //遍历数组
              if (this.tableData[rowIndex + countIndex] && this.tableData[rowIndex][column.property] === this.tableData[rowIndex + countIndex][column.property]) {
                countIndex += 1;
                conutRowSpan += 1;
              } else {
                break;
              }
            }
            //2列1行
            return {
              rowspan: conutRowSpan,
              colspan: 1
            };
          }
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    // 因为要合并的行数是不固定的，此函数是实现合并随意行数的功能
    getSpanArrOne(data) {
      console.log("zmmm--", data)//从后台获取的数据
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
  }
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
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>