<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
        <el-form-item label="油田：">
          <el-select v-model="queryParams.endTime" disabled>
            <el-option v-for="item in oilFields" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台：">
          <el-select v-model="queryParams.endTime" disabled>
            <el-option v-for="item in oilFields" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井号：">
          <el-select v-model="queryParams.endTime" disabled>
            <el-option v-for="item in oilFields" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="措施事件：">
          <el-select v-model="queryParams.endTime" disabled>
            <el-option v-for="item in oilFields" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-select v-model="queryParams.endTime" disabled>
            <el-date-picker
              v-model="dateTime"
              style="margin-left: 10px"
              type="year"
              placeholder="选择日期"
              value-format="yyyy"
            ></el-date-picker>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="doSearch"
          >检索</el-button
        >
      </el-form>
    </headerSearch>
    <verticalSwitchButton
      @selectBtn="selectBtn"
      :dataList="dataList"
      buttonWidth="120px"
      buttonHeight="30px"
      style="width: 9%; padding-top: 20px"
      btnDirection="row"
    ></verticalSwitchButton>
    <pagePanelNew  class="g-w100">
      <components :is="currentTab" />
    </pagePanelNew>
  </div>
</template>
<script>
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
import personnelplan from '@/pages/rem/plan/personnelplan.vue';
import operationplan from '@/pages/rem/plan/operationplan.vue';
import planmessage from '@/pages/rem/plan/planmessage.vue';
export default {
  components: {
    verticalSwitchButton,personnelplan,operationplan,planmessage
  },
  data() {
    return {
      dataList: [
        { name: '人员计划', value:'personnelplan' ,isChecked: true },
        { name: '现场作业计划',value:'operationplan' , isChecked: false },
        { name: '措施计划情况',value:'planmessage' , isChecked: false },
      ],
      currentTab:'personnelplan',
      queryParams: { endTime: '' },
    };
  },
  mounted() {},
  methods: {
    selectBtn(item){
      this.currentTab = item.value
    }
  },
};
</script>
<style lang="scss" scoped>
// .f1 {
//   margin: 10px;
// }
.cont {
  & > div {
    margin-top: 20px;
  }
}
.m1 {
  margin-top: 10px;
}
.f1 {
  margin-left: 10px;
}
</style>
