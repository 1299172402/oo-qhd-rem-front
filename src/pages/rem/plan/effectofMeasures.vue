<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="width: 100%; height: calc(100% - 143px)">
      <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
        <el-form-item label="日期：">
          <el-date-picker v-model="queryParams.endTime" value-format="yyyy-MM-dd" type="date" placeholder="年/月/日">
          </el-date-picker>
        </el-form-item>
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
        <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search" style="margin-left: 10px"
          >搜索</el-button
        >
      </el-form>
    </headerSearch>
    <div>
      <verticalSwitchButton
        @selectBtn="selectBtn"
        :dataList="dataList"
        buttonWidth="120px"
        buttonHeight="30px"
        style="width: 9%; padding-top: 20px"
        btnDirection="row"
      ></verticalSwitchButton>
    </div>
    <components ref="modal" style="margin-top: -15px; height: 730px" :infodata="1" :is="currentTab" />
  </div>
</template>
<script>
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import personnelplan from "@/pages/rem/plan/personnelplan.vue";
import operationplan from "@/pages/rem/plan/operationplan.vue";
import planmessage from "@/pages/rem/plan/planmessage.vue";
import { getOilFieldList, queryProductList } from "@/api/rem/workcompanydesignate";
import {
  fetchOilFields,
  fetchPlatforms,
  uploadFile,
  ljpmImgUploadFile,
  fetchProductionWells,
  fetchProductionWellsByPlatform,
  getLjpmWells,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
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
        { name: "人员计划", value: "personnelplan", isChecked: true },
        { name: "现场作业计划", value: "operationplan", isChecked: false },
        { name: "措施计划情况", value: "planmessage", isChecked: false },
      ],
      currentTab: "personnelplan",
      infodata: this.queryParams,
      queryParams: { endTime: "", selectPlatform: "", selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F" },
      oilFields: [],
      platforms: [],
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
    this.getserch();
  },
  methods: {
    selectBtn(item) {
      this.currentTab = item.value;
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
            //判断联通状态
            if (res.data.code == 200) {
              this.platform = res.data.data.platform;
              if (this.platform.length == 0) {
                this.selectPlatform = "";
              } else {
                this.selectPlatform = this.platform[0].platFormId;
                this.queryParams.selectPlatform = "3FC9A818F5BC43B88270DB80BBB3018F";

                this.$refs.modal.show(this.queryParams);
              }
            }
          });
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
        }
      });
    },
    doChangePT() {},
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
