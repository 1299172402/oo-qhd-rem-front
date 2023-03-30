<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
        <el-form-item label="日期：">
          <el-date-picker v-model="queryParams.endTime" value-format="yyyy-MM-dd" type="date" placeholder="年/月/日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select v-model="queryParams.selectOilField">
            <el-option
              v-for="item in oilFields"
              :key="item.oilFieldId"
              :label="item.oilFieldName"
              :value="item.oilFieldId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台：">
          <el-select v-model="queryParams.selectPlatform">
            <el-option v-for="item in platforms" :key="item.id" :label="item.platName" :value="item.platFormId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search" style="margin-left: 10px">检索</el-button>
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
    <pagePanelNew class="g-w100">
      <components ref="modal" :infodata="1" :is="currentTab" />
    </pagePanelNew>
  </div>
</template>
<script>
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
import personnelplan from '@/pages/rem/plan/personnelplan.vue';
import operationplan from '@/pages/rem/plan/operationplan.vue';
import planmessage from '@/pages/rem/plan/planmessage.vue';
import { getOilFieldList, queryProductList } from '@/api/rem/workcompanydesignate';
import {
  fetchOilFields,
  fetchPlatforms,
  fetchInjectionWells,
  fetchInjectionWellsByPlatform,
  fetchProductionWells,
  fetchProductionWellsByPlatform,
} from '@/api/oilDeposit/rem-02/primaryinfo.js';
export default {
  components: {
    verticalSwitchButton,
    personnelplan,
    operationplan,
    planmessage,
  },
  data() {
    return {
      dataList: [
        { name: '人员计划', value: 'personnelplan', isChecked: true },
        { name: '现场作业计划', value: 'operationplan', isChecked: false },
        { name: '措施计划情况', value: 'planmessage', isChecked: false },
      ],
      currentTab: 'personnelplan',
      infodata: this.queryParams,
      queryParams: { endTime: '', selectPlatform: '', selectOilField: '' },
      oilFields: [],
      platforms: [],
    };
  },
  mounted() {
    this.getserch();
  },
  methods: {
    selectBtn(item) {
      this.currentTab = item.value;
    },
    // 检索按钮
    retrieval(){
      this.$refs.modal.show(this.queryParams)
    },
    getserch() {
      getOilFieldList({ orgId: '715AD1CD60484BB59E737CD18A9DE44A' }).then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data;
        }
      });
      fetchPlatforms(requestPlat).then((res) => {
        if (res.data.code == 200) {
          this.platforms = res.data.data.platform;
          this.platforms.map((n) => {
            if (n.platName == '全部') {
              n.platFormId = '';
            }
            this.queryData.pt = '';
          });
        }
      });
    },
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
