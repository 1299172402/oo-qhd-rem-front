<template>
  <el-container class="layout">
    <el-container>
      <el-header style="height: 100px">
        <el-row style="margin-top: 10px">
          <!-- 头部内容深化 -->
          <pagePanelNew class="pagePanelNew">
            <div class="fl">
              <!-- 油田 -->
              <span class="f3">油田：</span>
              <el-select v-model="fields" class="f2" style="width: 180px">
                <el-option
                  v-for="item in fieldsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <!-- 区块 -->
              <span class="f3">区块：</span>
              <el-select v-model="block" class="f2" style="width: 180px">
                <el-option
                  v-for="item in blocks"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <!-- 日期 -->
              <span class="f3">日期：</span>
              <el-date-picker
                v-model="dateTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
              <!-- 下拉框 -->
              <el-select v-model="warningTypeSel" class="f3" style="width: 180px">
                <el-option
                  v-for="item in warningTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <!-- 搜索按钮 -->
              <el-button type="primary" class="buttonActive_primary" icon="el-icon-search" style="margin-left: 20px"
                >搜索</el-button
              >
            </div>

          </pagePanelNew>
        </el-row>
      </el-header>
      <el-main>
        <div style="height: 100%; margin-top: 20px">
          <el-row>
            <div style="margin-bottom: 20px">
              <el-button class="button">保存</el-button>
              <el-button @click="closeDiv" class="button">关闭</el-button>
            </div>
            <pagePanel headerTitle="油田（区块） 阈值配置界面" infoWidth="100%" infoHeight="100%" :isShowMaxBtn="true">
              <el-table :data="configure" highlight style="width: 100%">
                <el-table-column prop="classification" align="center" label="分类"> </el-table-column>
                <el-table-column prop="indexName" align="center" label="指标名称"> </el-table-column>
                <el-table-column prop="evaluationCriterion" align="center" label="评价标准"> </el-table-column>
                <el-table-column prop="redIndex" align="center" label="红色指标"> </el-table-column>
                <el-table-column prop="yellowIndex" align="center" label="黄色指标"> </el-table-column>
                <el-table-column prop="greenIndex" align="center" label="绿色指标"> </el-table-column>
              </el-table>
            </pagePanel>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <el-header> </el-header>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      switchNumber: '',
      //预警
      warning: '',
      //搜索输入框
      input: '',
      //预警类型
      warningTypeSel: '',
      //日期
      dateTime: '',
      //预警类型
      warningTypes: [
        {
          name: '全部',
          value: '0',
        },
        {
          name: '预测预警',
          value: '1',
        },
        {
          name: '对比预警',
          value: '2',
        },
      ],
      //配置表格数据
      configure: [
        {
          classification: '核心指标',
          indexName: '日产油水平',
          evaluationCriterion: '(计划值-实际值) /计划值×100%',
          redIndex: '≥0.8',
          yellowIndex: '0.4~0.8',
          greenIndex: '≤0.4',
        },
        {
          classification: '',
          indexName: '自然递减率',
          evaluationCriterion: '实际值-计划值',
          redIndex: '≥1',
          yellowIndex: '0.5~1',
          greenIndex: '≤0.5',
        },
        {
          classification: '重要指标',
          indexName: '单井日产液水平',
          evaluationCriterion: '(计划值-实际值) /计划值×100%',
          redIndex: '≥1',
          yellowIndex: '0.4~0.8',
          greenIndex: '≤0.4',
        },
        {
          classification: '',
          indexName: '含水率',
          evaluationCriterion: '实际值-计划值',
          redIndex: '≥0.1',
          yellowIndex: '0.05~0.1',
          greenIndex: '≤0.05',
        },
        {
          classification: '',
          indexName: '油井开井率',
          evaluationCriterion: '计划值-实际值',
          redIndex: '≥1',
          yellowIndex: '0.5~1',
          greenIndex: '≤0.5',
        },
        {
          classification: '',
          indexName: '水井开井率',
          evaluationCriterion: '实际值-计划值',
          redIndex: '≥1',
          yellowIndex: '0.5~1',
          greenIndex: '≤0.5',
        },
        {
          classification: '',
          indexName: '日注水平',
          evaluationCriterion: '(计划值-实际值) /计划值×100%',
          redIndex: '≥1',
          yellowIndex: '0.5~1',
          greenIndex: '≤0.5',
        },
        {
          classification: '',
          indexName: '注采比',
          evaluationCriterion: '计划值-实际值',
          redIndex: '≥0.1',
          yellowIndex: '0.05~0.1',
          greenIndex: '≤0.05',
        },
        {
          classification: '',
          indexName: '动液面',
          evaluationCriterion: '计划值-实际值',
          redIndex: '≥30',
          yellowIndex: '20~30',
          greenIndex: '≤20',
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().toString(); // 当前时间戳转为字符串
          let curDateYear = new Date().getFullYear(); // 当前时间的年份
          let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为一年前
          let oneYear = new Date(oneYearAgoDate).getTime(); //一年前字符串转为时间戳
          return time.getTime() > Date.now() || time.getTime() < oneYear;
        },
      },
      //表单数据
      increaseAndDecrease: [
        {
          label: '增加',
          value: '增加',
        },
        {
          label: '减少',
          value: '减少',
        },
      ],
      fields: [],
      //油井数据
      fieldsData: [
        {
          name: '秦皇岛32-6',
          value: '秦皇岛32-6',
        },
      ],
      block: [],
      //区块数据
      blocks: [
        {
          name: '南区',
          value: '南区',
        },
        {
          name: '北区',
          value: '北区',
        },
      ],
    };
  },
  created() {
    //数据初始化
    this.dateTime = [new Date().addDays(-30), new Date()];
    this.warningTypeSel = '0';
  },
  //初始化数据
  mounted: function () {
    this.switchNumber = this.$route.query.switchNumber == undefined ? '0' : this.$route.query.switchNumber;
  },
  //方法
  methods: {
    editData(row) {},
    data() {
      return {
        activeName: 'first',
      };
    },
    closeDiv() {
      this.$router.push({
        path: '/developmentWarning',
        query: { radio1: this.radio1, switchNumber: this.switchNumber },
      });
    },
    //查看详情
    detailsClick() {
      this.$router.push({
        path: '/developmentWarningDetails',
        query: { radio1: this.radio1, switchNumber: this.switchNumber },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep :root[theme-mode='dark'] .el-input__inner {
  background-color: #24deff;
}

// ::v-deep .el-row{
//   height: 20px;

// }
// ::v-deep :root[theme-mode='dark'] .el-table .cell {
//   margin-top: 20px;
// }
.pagePanelNew {
  .fl {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .f3 {
      padding-left: 10px;
    }
  }
}
.button {
  color: #24deff;
  border: 1px solid #24deff;
  background-color: #031527;
}
.m1 {
  margin-top: 10px;
}
.roundButton {
  margin-left: 10px;
  // width: 80px;
  // height: 25px;
  font-size: 12px;
}
.hrefSpan {
  color: #24deff;
}
.editbox {
  // width: 45%;
  // height: 80%;
}
</style>
