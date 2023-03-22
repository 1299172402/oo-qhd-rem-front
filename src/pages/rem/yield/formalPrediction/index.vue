<!-- 产量管理- 产量形势预测 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100">
      <verticalSwitchButton
        @selectBtn="selectBtn"
        :dataList="dataList"
        buttonWidth="140px"
        buttonHeight="30px"
        style="width: 10%; padding-top: 25px"
        btnDirection="row"
      ></verticalSwitchButton>
    </headerSearch>
    <pagePanelNew headerTitle="故障井统计表" style="height:100%">
        <components :is="currentTab" />
    </pagePanelNew>
  </div>
</template>

<script>
import fieldOutput from '@/pages/rem/yield/formalPrediction/fieldOutput.vue';
import outputOverview from '@/pages/rem/yield/formalPrediction/outputOverview.vue';
import yieldTracking from '@/pages/rem/yield/formalPrediction/yieldTracking.vue';
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
export default {
  components: {
    verticalSwitchButton,
    fieldOutput,outputOverview,yieldTracking
  },
  data() {
    return {
        currentTab:'',
      dataList: [
        { name: '作业公司产量跟踪', src:'yieldTracking',isChecked: false },
        { name: '油田预测产量',src:'fieldOutput', isChecked: true },
        { name: '作业公司产量总览',src:'outputOverview', isChecked: false },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orgId: undefined,
        oilFieldId: undefined,
        createBy: undefined,
        noticeType: undefined,
      },
    };
  },
  created() {},
  methods: {
    selectBtn(item){
        console.log(item)
        this.currentTab = item.src
    }
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
