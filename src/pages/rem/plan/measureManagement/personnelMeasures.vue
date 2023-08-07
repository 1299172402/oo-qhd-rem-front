<template>
  <div class="app-container" style="height: 100%">
    <headerSearch class="g-w100 g-h100" style="width: 100%">
      <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
      
        <el-form-item label="油田：">
          <el-select v-model="queryParams.selectOilField" disabled>
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
          <el-select
            v-model="queryParams.selectPlatform"
            style="width: 220px"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in platform"
              :key="item.platFormId"
              :label="item.platName"
              :value="item.platFormId"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="日期：">
          <el-date-picker v-model="queryParams.endTime" value-format="yyyy-MM-dd" type="date" placeholder="年/月/日">
          </el-date-picker>
        </el-form-item>
        <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search" style="margin-left: 10px"
          >搜索</el-button
        >
          <el-button class="commonBtn" @click="reset" icon="el-icon-refresh"> 重置</el-button>
          <el-button style="float: right" type="primary"  @click="returnrouter">返回</el-button>
      </el-form>
    </headerSearch>
    <div style="height: calc(100% - 100px)">
      <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="selectBtn(activeName)">
        <el-tab-pane :label="item.name" :name="item.value" v-for="(item, index) in dataList" :key="index" />
      </el-tabs>
      <components ref="modal" style="margin-top: -15px; height: 100%" :infodata="1" :is="currentTab" />
    </div>
  </div>
</template>
<script>
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import operationplan from "./components/operationplan.vue";
import personnelplan from "./components/personnelplan.vue";
import planmessage from "./components/planmessage.vue";
import { getOilFieldList, queryProductList } from "@/api/rem/workcompanydesignate.js";  
import {
  fetchPlatforms,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
export default {
  components: {
    verticalSwitchButton,
    operationplan,personnelplan,
    planmessage,
  },
  data() {
    return {
      dataList: [
          { name: "人员计划", value: "personnelplan", isChecked: false },
        { name: "现场作业计划", value: "operationplan", isChecked: false },
        { name: "措施计划情况", value: "planmessage", isChecked: false },
      ],
      currentTab: "operationplan",
      infodata: this.queryParams,
      queryParams: { endTime: "", 
      selectPlatform: '',
      selectOilField:"3FC9A818F5BC43B88270DB80BBB3018F"},
      oilFields: [],
      platforms: [],
      platform:[],
      activeName: "operationplan",
        date:'',
    };
  },
  mounted() {
    var data = new Date();
    var y = data.getFullYear();
    var time = data.getTime() - 24 * 60 * 60 * 1000;
    var time = new Date().getTime() - 24 * 60 * 60 * 1000;
    var yesday = new Date(time); // 获取的是前一天日期
    yesday =
      yesday.getFullYear() +
      "-" +
      (yesday.getMonth() > 9 ? yesday.getMonth() + 1 : "0" + (yesday.getMonth() + 1)) +
      "-" +
      (yesday.getDate() > 9 ? yesday.getDate() : "0" + yesday.getDate()); //字符串拼接转格式
    this.queryParams.endTime = yesday;
      this.date = yesday
      if(this.$route.query.page){
          this.activeName = 'planmessage' 
          this.currentTab = 'planmessage'
          this.queryParams.endTime = this.$route.query.currentDate
          this.date = this.queryParams.endTime
      }
    this.getserch();
  },
  methods: {
    selectBtn(item) {
      this.$refs.modal.show(this.queryParams);
      this.currentTab = item;
    },
    // 搜索按钮
    retrieval() {
      this.$refs.modal.show(this.queryParams);
    },
    getserch() {
      getOilFieldList({ orgId: "715AD1CD60484BB59E737CD18A9DE44A" }).then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data;
          let paraPlatForm = {
            oilFieldId: this.queryParams.selectOilField,
          };
          fetchPlatforms(paraPlatForm).then((res) => {
            if (res.data.code == 200) {
              this.platform = res.data.data.platform;
              this.platform.map((n)=>{
                if(n.platName =='全部'){
                  n.platFormId = ''
                }
              })
                this.queryParams.selectPlatform = '';
                this.$refs.modal.show(this.queryParams);
              }
          });
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
            this.queryParams.selectPlatform = '';
            this.$refs.modal.show(this.queryParams);
        }
      });
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
