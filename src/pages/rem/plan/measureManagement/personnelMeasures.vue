<template>
  <div class="app-container" style="height: 100%">

    <div style="height: calc(100% - 100px);">
      <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="selectBtn(activeName)">
        <el-tab-pane :label="item.name" :name="item.value" v-for="(item, index) in dataList" :key="index" />
      </el-tabs>
      <components ref="modal" style="margin-top: -23px; height: 100%" :infodata="1" :is="currentTab" />
    </div>
  </div>
</template>
<script>
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import operationplan from "./components/operationplan.vue";
import personnelplan from "./components/personnelplan.vue";
import { getOilFieldList, queryProductList } from "@/api/rem/workcompanydesignate.js";  
import {
  fetchPlatforms,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
export default {
  components: {
    verticalSwitchButton,
    operationplan,personnelplan,
  },
  data() {
    return {
      dataList: [
          { name: "人员计划", value: "personnelplan", isChecked: false },
        { name: "现场作业计划", value: "operationplan", isChecked: false },
      ],
      currentTab: "operationplan",
      infodata: this.queryParams,
      oilFields: [],
      platforms: [],
      platform:[],
      activeName: "operationplan",
        date:'',
    }
  },
  mounted() {

      if(this.$route.query.page){
          this.activeName = 'planmessage' 
          this.currentTab = 'planmessage'
          this.queryParams.endTime = this.$route.query.currentDate
          this.date = this.queryParams.endTime
      }else if(this.$route.query.routeName){
          this.activeName = 'personnelplan'
          this.currentTab = 'personnelplan'
      }
  },
  methods: {
    selectBtn(item) {
      this.currentTab = item;
    },
    // 搜索按钮
    retrieval() {
      this.$refs.modal.show(this.queryParams);
    },
      reset(){
        this.queryParams.endTime =   this.date
      },
      returnrouter() {
          this.$router.go(-1);
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
