<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表11 秦皇岛32-6/渤中作业公司剩余井槽资源情况"
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
        <el-table-column prop="xh" label="序号" align="center"></el-table-column>
        <el-table-column prop="operationarea" label="作业公司" align="center" width="120"></el-table-column>
        <el-table-column prop="oilField" label="油田" align="center" width="120"></el-table-column>
        <el-table-column prop="jkptmc" label="井口平台名称" align="center" width="120"></el-table-column>
        <el-table-column prop="pttcrq" label="平台投产日期" align="center" width="120"></el-table-column>
        <el-table-column label="平台设计寿命" align="center">
          <el-table-column prop="ptsjsm" label="年" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="原平台" align="center">
          <el-table-column prop="yptzjcs" label="总井槽数" align="center" width="120"></el-table-column>
          <el-table-column prop="yptyzjcs" label="已钻井槽数" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="内外挂平台" align="center">
          <el-table-column prop="nwgzjcs" label="总井槽数" align="center" width="120"></el-table-column>
          <el-table-column prop="nwgyzjcs" label="已钻井槽数" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="当前总剩余井槽数" align="center">
          <el-table-column prop="dqsyjcs" label="口" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="十四五规划内外挂井槽数" align="center">
          <el-table-column prop="string-affectyield" label="口" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="十四五规划实施井数" align="center">
          <el-table-column prop="sswssjs" label="口" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="十四五规划外新摸排出潜力井位（2021-2025）" align="center">
          <el-table-column prop="qljw" label="口" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="十四五规划外新摸排出潜力井位内外挂井槽可行性" align="center">
          <el-table-column prop="knwgjcs" label="作业区论证可内外挂井槽数" align="center" width="120"></el-table-column>
          <el-table-column
            prop="string-affectyield"
            label="需要工程校核、测算等需要第三方协助论证"
            align="center"
            width="120"
          ></el-table-column>
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
          jkptmc: 'QHD32-6A',
          pttcrq: '2001-10-08',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '35',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '',
          qljw: '',
          knwgjcs: '0',
          note: '岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件',
        },
        {
          operationarea: '秦皇岛',
          xh: '2',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6B',
          pttcrq: '2001-10-08',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '34',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '1',
          sswssjs: '3',
          qljw: '',
          knwgjcs: '0',
          note: '1个井位因水下落物无法使用。通过栈桥与WHPG平台相连，不具备挂井槽空间',
        },
        {
          operationarea: '秦皇岛',
          xh: '3',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6C',
          pttcrq: '2002-07-01',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '35',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '3',
          qljw: '',
          knwgjcs: '0',
          note: '通过栈桥与WHPH平台相连，不具备挂井槽空间',
        },

        {
          operationarea: '秦皇岛',
          xh: '4',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6D',
          pttcrq: '2002-05-28',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '35',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '3',
          qljw: '',
          knwgjcs: '0',
          note: '岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件',
        },

        {
          operationarea: '秦皇岛',
          xh: '5',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6E',
          pttcrq: '2002-08-10',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '35',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '10',
          qljw: '',
          knwgjcs: '0',
          note: '岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件',
        },

        {
          operationarea: '秦皇岛',
          xh: '6',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6F',
          pttcrq: '2002-08-10',
          ptsjsm: '20',
          yptzjcs: '35',
          yptyzjcs: '35',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '13',
          qljw: '',
          knwgjcs: '0',
          note: '岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件',
        },

        {
          operationarea: '秦皇岛',
          xh: '7',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6G',
          pttcrq: '2014-12-10',
          ptsjsm: '25',
          yptzjcs: '40',
          yptyzjcs: '40',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '8',
          qljw: '8',
          knwgjcs: '8',
          note: '可挂4单筒双井，若有更多需求需要进一步可行研究',
        },

        {
          operationarea: '秦皇岛',
          xh: '8',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6H',
          pttcrq: '2013-11-29',
          ptsjsm: '25',
          yptzjcs: '20',
          yptyzjcs: '20',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '10',
          qljw: '',
          knwgjcs: '10',
          note: '可挂5个单筒双井，2020年计划实施8口井；2021年新增2口井。',
        },

        {
          operationarea: '秦皇岛',
          xh: '9',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6I',
          pttcrq: '2014-08-15',
          ptsjsm: '25',
          yptzjcs: '40',
          yptyzjcs: '40',
          nwgzjcs: '0',
          nwgyzjcs: '0',
          dqsyjcs: '0',
          sswssjs: '8',
          qljw: '',
          knwgjcs: '8',
          note: '南井口区侧有栈桥与扩容项目CEPK平台相连不具备外挂井槽条件。',
        },

        {
          operationarea: '秦皇岛',
          xh: '10',
          oilField: 'QHD32-6',
          jkptmc: 'QHD32-6J',
          pttcrq: '2014-09-05',
          ptsjsm: '25',
          yptzjcs: '40',
          yptyzjcs: '40',
          nwgzjcs: '16',
          nwgyzjcs: '16',
          dqsyjcs: '0',
          sswssjs: '6',
          qljw: '',
          knwgjcs: '8',
          note: '南北两个井口区已经各外挂一排井槽，且岸电及扩容项目有变电站平台和CEPL平台，不具备挂井槽条件',
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
::v-deep .el-table .cell:empty::before {
  content: '-';
}
</style>