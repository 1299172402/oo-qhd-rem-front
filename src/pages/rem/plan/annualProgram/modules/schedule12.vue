<template>
  <el-container class="layout">
    <info-window
      infoWidth="100%"
      infoHeight="100%"
      headerTitle="附表12 秦皇岛32-6/渤中作业公司工程设施状况"
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
        <el-table-column prop="kftx" label="开发体系" align="center" width="120"></el-table-column>
        <el-table-column prop="ytq" label="油田群" align="center" width="120"></el-table-column>
        <el-table-column prop="yt" label="油田" align="center" width="120"></el-table-column>
        <el-table-column prop="pt" label="平台" align="center" width="120"></el-table-column>
        <el-table-column prop="cljzly" label="处理的介质来源" align="center" width="240"></el-table-column>
        <el-table-column label="投产时间" align="center">
          <el-table-column prop="tcrq" label="年/月/日" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="设施处理能力" align="center">
          <el-table-column label="最大液处理能力" align="center">
            <el-table-column prop="zdyeclnl" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="最大油处理能力" align="center">
            <el-table-column prop="zdyclnl" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="最大气处理能力" align="center">
            <el-table-column prop="zdqclnl" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="最大水处理能力" align="center">
            <el-table-column prop="zdsclnl" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="2019年12月日均产量" align="center">
          <el-table-column label="日产液" align="center">
            <el-table-column prop="nmrcye" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="日产油" align="center">
            <el-table-column prop="nmrcyou" label="m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="日产气" align="center">
            <el-table-column prop="nmrcq" label="10⁴m³/d" align="center" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="电量" align="center">
          <el-table-column label="设计" align="center">
            <el-table-column prop="dlsj" label="KW" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="当前" align="center">
            <el-table-column prop="dldq" label="KW" align="center" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="qksm"
          label="海管等其他设施情况说明（可合并单元格）"
          align="center"
          width="340"
        ></el-table-column>
        <el-table-column prop="note" label="主要结论" align="center" width="200"></el-table-column>
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
          xh: '1',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6A',
          cljzly: '不处理',
          tcrq: '2001/10/08',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '9292',
          nmrcyou: '585',
          nmrcq: '1.69',
          dlsj: '0',
          dldq: '0',
          qksm: '注水海管：WHPA-WHPB  在用\r混输海管：WHPA-WHPB  封存',
          note: '正常运行',
        },

        {
          xh: '2',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6B',
          cljzly: '不处理',
          tcrq: '2001/10/08',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '7509',
          nmrcyou: '478',
          nmrcq: '1.34',
          dlsj: '0',
          dldq: '0',
          qksm: '注水海管：WHPA-WHPB  在用\r混输海管：WHPA-WHPB  封存',
          note: '正常运行',
        },

        {
          xh: '3',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6C',
          cljzly: '不处理',
          tcrq: '2002/07/01',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '475',
          nmrcyou: '5549',
          nmrcq: '2.43',
          dlsj: '0',
          dldq: '0',
          qksm: 'WHPC至WHPD混输海管（在用，定期通球）\rWHPD至WHPC注水海管（在用，定期通球\rQHD33-1至WHPC混输海管（在用，定期通球）',
          note: '正常运行',
        },

        {
          xh: '4',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6D',
          cljzly: '不处理',
          tcrq: '2002/05/28',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '5135',
          nmrcyou: '618',
          nmrcq: '0.45',
          dlsj: '0',
          dldq: '0',
          qksm: '注水海管：WHPD-WHPC  在用\r混输海管：WHPC-WHPD  封存',
          note: '正常运行',
        },

        {
          xh: '5',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6E',
          cljzly: '不处理',
          tcrq: '2002/08/10',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '12149',
          nmrcyou: '552',
          nmrcq: '0.18',
          dlsj: '0',
          dldq: '0',
          qksm: '1、WHPE到WHPF混输海管（海管已封存）；\r2、WHPF到WHPE注水海管（在用，定期通球）；\r3、WHPE到CEPJ混输海管（在用，定期通球）；\r4、CEPJ到WHPE注水海管（在用，定期通球）。',
          note: '正常运行',
        },

        {
          xh: '6',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6F',
          cljzly: '不处理',
          tcrq: '2002/08/10',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '7830',
          nmrcyou: '431',
          nmrcq: '1.68',
          dlsj: '0',
          dldq: '0',
          qksm: '注水海管：WHPF-WHPE  在用\r混输海管：WHPE-WHPF  封存',
          note: '正常运行',
        },

        {
          xh: '7',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6G',
          cljzly: '不处理',
          tcrq: '2014/12/10',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '16752',
          nmrcyou: '873',
          nmrcq: '1.85',
          dlsj: '0',
          dldq: '0',
          qksm: '注水海管：CEPI-WHPG（在用，定期通球）\r混输海管：WHPG-CEPI（在用，定期通球）',
          note: '正常运行',
        },

        {
          xh: '8',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6H',
          cljzly: '不处理',
          tcrq: '2013/11/29',
          zdyeclnl: '0',
          zdyclnl: '0',
          zdqclnl: '0',
          zdsclnl: '0',
          nmrcye: '479',
          nmrcyou: '5535',
          nmrcq: '1.14',
          dlsj: '0',
          dldq: '0',
          qksm: 'WHPH至CEPI混输海管（在用，定期通球）\rCEPI至WHPH注水海管（在用，定期通球）',
          note: '正常运行',
        },

        {
          xh: '9',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6I',
          cljzly: 'B/C/G/H/I平台产液',
          tcrq: '2013/11/29',
          zdyeclnl: '64605',
          zdyclnl: '10440',
          zdqclnl: '20.59',
          zdsclnl: '48000',
          nmrcye: '17918',
          nmrcyou: '1212',
          nmrcq: '2.5',
          dlsj: '33320',
          dldq: '16710',
          qksm: 'WHPG-CEPI混输海管（在用，定期通球）\rWHPH-CEPI混输海管（在用，定期通球）\rCEPI-WHPA混输海管 （因WHPA平台调整井作业，暂停使用）\rCEPI-WHPD混输海管（在用，定期通球）\rCEPI-WHPA高压注水海管（在用，定期通球）\rCEPI-WHPD高压注水海管（在用，定期通球）\rCEPI-WHPG低压注水海管（在用，定期通球）\rCEPI-WHPH低压注水海管（在用，定期通球）',
          note: '正常运行',
        },

        {
          xh: '10',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: 'QHD32-6J',
          cljzly: 'E和J平台产液',
          tcrq: '2014/09/05',
          zdyeclnl: '65814',
          zdyclnl: '7695',
          zdqclnl: '8.54',
          zdsclnl: '54000',
          nmrcye: '24673',
          nmrcyou: '1612',
          nmrcq: '1.64',
          dlsj: '30720',
          dldq: '22200',
          qksm: '1、WHPE→CEPJ混输海管（在用，定期通球）\r2、CEPJ→WHPF混输海管（在用，定期通球）\r3、CEPJ→WHPE注水海管（在用，定期通球）\r4、CEPJ→WHPF注水海管（在用，定期通球）',
          note: '正常运行',
        },

        {
          xh: '11',
          kftx: '石臼坨开发体系',
          ytq: '石臼坨油气田群',
          yt: 'QHD32-6',
          pt: '渤海世纪',
          cljzly: 'QHD32-6CEPI/J处理至50%后的来液、QHD32-6WHPA/D/F平台产液、QHD33-1/S油田产液',
          tcrq: '2001/10/11',
          zdyeclnl: '35616',
          zdyclnl: '14064',
          zdqclnl: '24.5',
          zdsclnl: '40800',
          nmrcye: '',
          nmrcyou: '',
          nmrcq: '',
          dlsj: '43000',
          dldq: '18230',
          qksm: '注水海管：SPM-WHPA  在用\rSPM-WHPD  在用\rSPM-WHPF  在用\r混输海管：WHPA-SPM  在用\rWHPD-SPM  在用\rWHPF-SPM   在用\r注水海管：SPM-WHPA  在用\rSPM-WHPD  在用\rSPM-WHPF  在用\r混输海管：WHPA-SPM  在用\rWHPD-SPM  在用\rWHPF-SPM   在用',
          note: '正常运行',
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