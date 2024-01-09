<template>
  <el-container class="layout">
    <info-window
    info-width="100%"
    info-height="100%"
    header-title="附表14 秦皇岛32-6/渤中作业公司优化后全寿命周期规划实施方案"
    :is-show-max-btn="true"
    style="margin-top: 10px"
  >
  <el-table :data="tableData" border :header-cell-style="{background:'transparent',color:'#fff'}"
  :span-method="objectSpanMethodOne" highlight height="calc(100% - 40px)">
<el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
<el-table-column prop="operationarea" label="作业公司" align="center" width="120"></el-table-column>
<el-table-column prop="oilField" label="油田" align="center" width="120"></el-table-column>
<el-table-column prop="annualnaturaldecline" label="主要指标" align="center" width="220"
           ></el-table-column>
<el-table-column prop="2020" label="2020年" align="center" width="120"></el-table-column>
<el-table-column prop="2021" label="2021年" align="center" width="120"></el-table-column>
<el-table-column prop="2022" label="2022年" align="center" width="120"></el-table-column>
<el-table-column prop="2023" label="2023年" align="center" width="120"></el-table-column>
<el-table-column prop="2024" label="2024年" align="center" width="120"></el-table-column>
<el-table-column prop="2025" label="2025年" align="center" width="120"></el-table-column>
<el-table-column prop="2026" label="2026年" align="center" width="120"></el-table-column>
<el-table-column prop="2027" label="2027年" align="center" width="120"></el-table-column>
<el-table-column prop="2028" label="2028年" align="center" width="120"></el-table-column>
<el-table-column prop="2029" label="2029年" align="center" width="120"></el-table-column>
<el-table-column prop="2030" label="2030年" align="center" width="120"></el-table-column>
<el-table-column prop="2031" label="2031年" align="center" width="120"></el-table-column>
<el-table-column prop="2032" label="2032年" align="center" width="120"></el-table-column>
<el-table-column prop="2033" label="2033年" align="center" width="120"></el-table-column>
<el-table-column prop="2034" label="2034年" align="center" width="120"></el-table-column>
<el-table-column prop="2035" label="2035年" align="center" width="120"></el-table-column>
<el-table-column prop="2036" label="2036年" align="center" width="120"></el-table-column>
<el-table-column prop="2037" label="2037年" align="center" width="120"></el-table-column>
<el-table-column prop="2038" label="2038年" align="center" width="120"></el-table-column>
<el-table-column prop="2039" label="2039年" align="center" width="120"></el-table-column>
<el-table-column prop="2040" label="2040年" align="center" width="120"></el-table-column>
<el-table-column prop="2041" label="2041年" align="center" width="120"></el-table-column>
<el-table-column prop="2042" label="2042年" align="center" width="120"></el-table-column>
<el-table-column prop="2043" label="2043年" align="center" width="120"></el-table-column>
<el-table-column prop="2044" label="2044年" align="center" width="120"></el-table-column>
<el-table-column prop="2045" label="2045年" align="center" width="120"></el-table-column>
<el-table-column prop="2046" label="2046年" align="center" width="120"></el-table-column>
<el-table-column prop="2047" label="2047年" align="center" width="120"></el-table-column>
<el-table-column prop="2048" label="2048年" align="center" width="120"></el-table-column>
<el-table-column prop="2049" label="2049年" align="center" width="120"></el-table-column>
<el-table-column prop="2050" label="2050年" align="center" width="120"></el-table-column>
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
          annualnaturaldecline: '基础产量，万吨',
          2020: "211.0053",
          2021: "184.5506",
          2022: "165.4394",
          2023: "152.3113",
          2024: "140.273",
          2025: "114.5129",
          2026: "123.036",
          2027: "115.4051",
          2028: "108.4185",
          2029: "102.156",
          2030: "96.4428",
          2031: "90.3748",
          2032: "80.3998",
          2033: "71.879",
          2034: "65.901",
          2035: "57.1987",
          2036: "49.0097",
          2037: "42.7384",
          2038: "39.2609",
          2039: "35.5549",
          2040: "32.4038",
          2041: "29.4167",
          2042: "26.4631",
          2043: "23.9683",
          2044: "21.7863",
          2045: "19.8753",
          2046: "18.2154",
          2047: "16.7226",
          2048: "15.3863",
          2049: "14.1786",
          2050: "13.1194"
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '化学驱增油量，万吨',
          2020: "",
          2021: "",
          2022: "",
          2023: "",
          2024: "0.06",
          2025: "7.93",
          2026: "14.86",
          2027: "29.46",
          2028: "36.29",
          2029: "44.54",
          2030: "45.65",
          2031: "41.22",
          2032: "32.25",
          2033: "22.84",
          2034: "15.45",
          2035: "8.41",
          2036: "5.4",
          2037: "3",
          2038: "1.46",
          2039: "0.19",
          2040: "",
          2041: "",
          2042: "",
          2043: "",
          2044: "",
          2045: "",
          2046: "",
          2047: "",
          2048: "",
          2049: "",
          2050: ""
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '常规油井增产措施产量，万吨',
          2020: "13.09",
          2021: "12.51",
          2022: "10.72",
          2023: "10.51",
          2024: "9.84",
          2025: "9.22",
          2026: "9.15",
          2027: "9.04",
          2028: "8.9",
          2029: "8.19",
          2030: "8.42",
          2031: "",
          2032: "",
          2033: "",
          2034: "",
          2035: "",
          2036: "",
          2037: "",
          2038: "",
          2039: "",
          2040: "",
          2041: "",
          2042: "",
          2043: "",
          2044: "",
          2045: "",
          2046: "",
          2047: "",
          2048: "",
          2049: "",
          2050: ""
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '调整井产量，万吨',
          2020: "13.32",
          2021: "31.18",
          2022: "35.32",
          2023: "39.1",
          2024: "42.58",
          2025: "45.47",
          2026: "45.96",
          2027: "45.39",
          2028: "45.23",
          2029: "45.18",
          2030: "43.42",
          2031: "32.42",
          2032: "26.95",
          2033: "21.02",
          2034: "17.03",
          2035: "12.89",
          2036: "9.15",
          2037: "6.27",
          2038: "4.16",
          2039: "2.16",
          2040: "0.43",
          2041: "",
          2042: "",
          2043: "",
          2044: "",
          2045: "",
          2046: "",
          2047: "",
          2048: "",
          2049: "",
          2050: ""
        },
        {operationarea: '秦皇岛', oilField: 'QHD32-6', annualnaturaldecline: '综合调整产量，万吨'},
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '天然气产量，万吨',
          2020: "3.44",
          2021: "4.72",
          2022: "4.72",
          2023: "4.15",
          2024: "3.97",
          2025: "3.96",
          2026: "4",
          2027: "4.19",
          2028: "4.23",
          2029: "4.26",
          2030: "4.16",
          2031: "3.6",
          2032: "3.06",
          2033: "2.55",
          2034: "2.09",
          2035: "1.68",
          2036: "1.41",
          2037: "1.19",
          2038: "1.03",
          2039: "0.87",
          2040: "0.75",
          2041: "0.65",
          2042: "0.57",
          2043: "0.51",
          2044: "0.45",
          2045: "0.4",
          2046: "0.37",
          2047: "0.33"
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '产量小计，万吨',
          2020: "240.8553",
          2021: "232.9606",
          2022: "215.8994",
          2023: "206.0713",
          2024: "196.723",
          2025: "181.0929",
          2026: "197.006",
          2027: "203.4851",
          2028: "203.0685",
          2029: "204.326",
          2030: "198.0928",
          2031: "167.6148",
          2032: "142.6598",
          2033: "118.289",
          2034: "100.471",
          2035: "80.1787",
          2036: "64.9697",
          2037: "53.1984",
          2038: "45.9109",
          2039: "38.7749",
          2040: "33.5838",
          2041: "30.0667",
          2042: "27.0331",
          2043: "24.4783",
          2044: "22.2363",
          2045: "20.2753",
          2046: "18.5854",
          2047: "17.0526",
          2048: "15.3863",
          2049: "14.1786",
          2050: "13.1194"
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '优化注水措施工作量，井次',
          2020: "135",
          2021: "175",
          2022: "180",
          2023: "185",
          2024: "190",
          2025: "190",
          2026: "162",
          2027: "136",
          2028: "106",
          2029: "106",
          2030: "106"
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '化学驱工作量，井次',
          2026: "6",
          2027: "29",
          2028: "50",
          2029: "50",
          2030: "54",
          2031: "53",
          2032: "53",
          2033: "50",
          2034: "50"
        },
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '常规油井增产措施工作量，井次',
          2020: "28",
          2021: "38",
          2022: "33",
          2023: "32",
          2024: "29",
          2025: "28",
          2026: "26",
          2027: "25",
          2028: "25",
          2029: "22",
          2030: "23"
        },
        {operationarea: '秦皇岛', oilField: 'QHD32-6', annualnaturaldecline: '剩余ODP井工作量，口'},
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '调整井工作量，口',
          2020: "18",
          2021: "16",
          2022: "15",
          2023: "22",
          2024: "20",
          2025: "13",
          2026: "3",
          2027: "7",
          2028: "7",
          2029: "5",
          2030: "2"
        },
        {operationarea: '秦皇岛', oilField: 'QHD32-6', annualnaturaldecline: '综合调整井工作量，口'},
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '钻完井工作量小计，口',
          2020: "18",
          2021: "16",
          2022: "15",
          2023: "22",
          2024: "20",
          2025: "13",
          2026: "3",
          2027: "7",
          2028: "7",
          2029: "5",
          2030: "2",
          2031: "0",
          2032: "0",
          2033: "0",
          2034: "0",
          2035: "0",
          2036: "0",
          2037: "0",
          2038: "0",
          2039: "0",
          2040: "0",
          2041: "0",
          2042: "0",
          2043: "0",
          2044: "0",
          2045: "0",
          2046: "0",
          2047: "0",
          2048: "0",
          2049: "0",
          2050: "0"
        },
        {operationarea: '秦皇岛', oilField: 'QHD32-6', annualnaturaldecline: '非调整井资本化投资，亿元'},
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '调整井资本化投资，亿元',
          2020: "6.06",
          2021: "5.39",
          2022: "5.05",
          2023: "7.41",
          2024: "6.74",
          2025: "4.38",
          2026: "1.01",
          2027: "2.36",
          2028: "2.36",
          2029: "1.68",
          2030: "0.67"
        },
        {operationarea: '秦皇岛', oilField: 'QHD32-6', annualnaturaldecline: '开发投资，亿元'},
        {
          operationarea: '秦皇岛',
          oilField: 'QHD32-6',
          annualnaturaldecline: '投资小计，亿元',
          2020: "6.06",
          2021: "17.31",
          2022: "5.05",
          2023: "7.41",
          2024: "6.74",
          2025: "4.38",
          2026: "1.01",
          2027: "2.36",
          2028: "2.36",
          2029: "1.68",
          2030: "0.67",
          2031: "0",
          2032: "0",
          2033: "0",
          2034: "0",
          2035: "0",
          2036: "0",
          2037: "0",
          2038: "0",
          2039: "0",
          2040: "0",
          2041: "0",
          2042: "0",
          2043: "0",
          2044: "0",
          2045: "0",
          2046: "0",
          2047: "0",
          2048: "0",
          2049: "0",
          2050: "0"
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
      // console.log("zmmm--", data)//从后台获取的数据
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