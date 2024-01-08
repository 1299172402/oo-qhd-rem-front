<!-- 基础数据维护 - 水平段维护 -->
<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <div style="display: flex; flex-direction: row; height: 100%">
      <!-- <div style="height: 100%">
        <tree-multiple-selection :level="'5'" @childinfo="childinfo" />
      </div> 
          margin-left: 15px;-->
      <div style="display: flex; flex-direction: column; height: calc(100%); flex: 1; right: 0; overflow: hidden">
        <header-search class="g-w100 g-h100" style="height: auto">
          <div class="g-row-flex-V g-w100 g-h100">
            <div>
              <el-form :inline="true">
                <el-form-item label="油田：">
                  <el-select v-model="queryData.ogfId" @change="choicepla">
                    <el-option
                      v-for="(item, index) in oilFields"
                      :key="index"
                      :label="item.ogfName"
                      :value="item.ogfId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="平台：" prop="pt">
                  <el-select v-model="queryData.pt" @change="onPlatfromChange">
                    <el-option
                      v-for="item in platforms"
                      :key="item.platformId"
                      :label="item.platformCode"
                      :value="item.platformId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                  <!-- @change="changewell" -->
                  <el-select v-model="queryData.wellId">
                    <el-option
                      v-for="(item, index) in wells"
                      :key="item.wellId"
                      :label="item.wellName"
                      :value="item.wellId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="selectcw()" icon="el-icon-search">搜索 </el-button>
                  <el-button class="commonBtn" @click="refresh()" icon="el-icon-refresh">重置 </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </header-search>

        <pagePanel headerTitle="水平段维护" style="height: calc(100% - 80px)" class="g-w100" :show-btn="true">
          <div style="margin-top: 5%">
            <div class="alltitle">{{ wellName }}</div>
            <div class="boxall" style="height: 500px; width: 900px; margin: auto">
              <div style="margin-left: 4%; margin-top: 100px">
                <el-form
                  :model="djclForm"
                  style="width: 800px; padding-top: 20px"
                  ref="djclForm"
                  label-width="110px"
                  class="demo-ruleForm"
                >
                  <el-row>
                    <el-col :span="10" style="padding-top: 30px">
                      <el-form-item label="水平段长度" prop="kzcl">
                        <el-input v-model="djclForm.horizonIntervalLen" type="number" :disabled="edit"
                          ><i slot="suffix">m</i></el-input
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="10" style="padding-top: 30px">
                      <el-form-item label="水平段砂岩长度" prop="kzmj">
                        <el-input v-model="djclForm.horizonSandstoneLen" type="number" :disabled="edit">
                          <i slot="suffix">m</i>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24" align="right" style="padding-top: 85px; padding-right: 68px">
                      <el-button type="primary" @click="redact" icon="el-icon-edit">编辑 </el-button>
                      <el-button type="primary" @click="save">保存</el-button>
                      <!-- <el-button type="primary" icon="el-icon-search">运行计算</el-button> -->
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="boxfoot"></div>
            </div>
          </div>
        </pagePanel>
      </div>
    </div>
  </div>
</template>
<script>
import { getHorizonSection, saveOrUpdateHorizonSection } from "@/api/rem/welldetailedevaluationresult";
import { QueryOgfDetail, QueryPlatformDetail, QueryWellDetail, userListByUserNames } from "@/api/basic/master";
import treeMultipleSelection from "@/pages/rem/basic/components/index.vue";

export default {
  name: "HorizontalMaintenance",
  components: { treeMultipleSelection },
  data() {
    return {
      edit: true,
      queryData: {
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        wellId: "",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A",
        pt: "",
      },
      wells: [],
      platforms: [],
      oilFields: [],
      djclForm: {
        remHorizonSectionId: "",
        horizonIntervalLen: "",
        horizonSandstoneLen: "",
      },
      wellName: "",
    };
  },
  mounted() {
    this.getList();
    this.getData();
  },
  watch: {
    // queryData: {
    //   handler(val) {
    //     let obj = {};
    //     obj = this.wells.find((item) => {
    //       return item.wellId === this.queryData.wellId;
    //     });
    //     this.wellName = obj.wellName;
    //   },
    //   deep: true,
    // },
  },
  methods: {
    getList() {
      //获取作业公司
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      userListByUserNames(params).then((res) => {
        this.queryData.orgId = res.data.data[0]?.currentTenantBindOrgId
          ? res.data.data[0].currentTenantBindOrgId
          : undefined;
      });
      //根据作业公司查询油田
      QueryOgfDetail({ operationZoneId: this.queryData.orgId }).then((res) => {
        this.oilFields = res.data.data;
      });
      //根据油田查询平台列表
      QueryPlatformDetail({ ogfId: this.queryData.ogfId }).then((res) => {
        this.platforms = res.data.data;
      });
    },
    selectcw() {
      this.wellName = this.wells.find((item) => {
        return item.wellId === this.queryData.wellId;
      }).wellName;
      getHorizonSection({
        wellId: this.queryData.wellId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.djclForm.remHorizonSectionId = res.data.data.remHorizonSectionId;
          this.djclForm.horizonIntervalLen = res.data.data.horizonIntervalLen;
          this.djclForm.horizonSandstoneLen = res.data.data.horizonSandstoneLen;
        } else {
          this.djclForm = {
            remHorizonSectionId: "",
            horizonIntervalLen: "",
            horizonSandstoneLen: "",
          };
        }
      });
    },
    choicepla(val) {
      QueryPlatformDetail({ ogfId: val }).then((res) => {
        this.platforms = res.data.data;
        this.queryData.pt = "";
      });
      QueryWellDetail({ ogfId: this.queryData.ogfId }).then((res) => {
        this.wells = res.data.data;
        this.queryData.wellId = this.wells[0].wellId;
      });
    },
    redact() {
      // if (this.djclForm.layerId == "") {
      //   this.$message.error("请选择层位！");
      //   return;
      // } else {
      this.edit = false;
      // }
    },
    save() {
      this.djclForm.horizonIntervalLen = Number(this.djclForm.horizonIntervalLen);
      this.djclForm.horizonSandstoneLen = Number(this.djclForm.horizonSandstoneLen);
      saveOrUpdateHorizonSection({ ...this.djclForm, wellId: this.queryData.wellId }).then((res) => {
        if (res.data.code == 200) {
          this.edit = true;
          this.$message.success("保存成功！");
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
        }
      });
    },
    getData() {
      QueryWellDetail({ ogfId: this.queryData.ogfId }).then((res) => {
        this.wells = res.data.data;
        this.queryData.wellId = this.wells[0].wellId;
        this.selectcw();
      });
    },
    //平台下拉-change
    onPlatfromChange(val) {
      QueryWellDetail({ platformId: val, ogfId: this.queryData.ogfId }).then((res) => {
        this.wells = res.data.data;
        this.queryData.wellId = this.wells[0]?.wellId;
      });
    },
    refresh() {
      if (this.queryData.orgId == "715AD1CD60484BB59E737CD18A9DE44A") {
        this.queryData.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F";
      } else {
        this.queryData.ogfId = this.oilFields[0].ogfId;
      }
      QueryPlatformDetail({ ogfId: this.queryData.ogfId }).then((res) => {
        this.platforms = res.data.data;
        this.queryData.pt = "";
      });
      QueryWellDetail({ ogfId: this.queryData.ogfId }).then((res) => {
        if (res.data.code == 200) {
          this.wells = res.data.data;
          this.queryData.wellId = this.wells[0].wellId;
        }
      });
      this.djclForm = {
        remHorizonSectionId: "",
        horizonIntervalLen: "",
        horizonSandstoneLen: "",
      };
    },
    changewell() {
      this.djclForm = {
        remHorizonSectionId: "",
        horizonIntervalLen: "",
        horizonSandstoneLen: "",
      };
    },
    childinfo(data) {
      this.queryData.ogfId = data[2]?.value || "";
      this.queryData.pt = data[3]?.value || "";
      this.queryData.wellId = data[4]?.value || "";
      // 判断如果当前平台，调用获取平台接口
      let isUpdata1 = this.platforms.map((item) => item.platformId).includes(this.queryData.pt);
      if (!isUpdata1) {
        this.platforms = [];
        QueryPlatformDetail({ ogfId: this.queryData.ogfId }).then((res) => {
          if (res.data.code == 200) {
            this.platforms = res.data.data;
          }
        });
      }
      let isUpdata = this.wells.map((item) => item.wellId).includes(this.queryData.wellId);
      if (!isUpdata) {
        this.wells = [];
        QueryWellDetail({ ogfId: this.queryData.ogfId, platformId: this.queryData.pt || undefined }).then((res) => {
          if (res.data.code == 200) {
            this.wells = res.data.data;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.pageBox {
  color: var(--formText);
  position: relative;
  font-family: PingFangSC-Regular, PingFang SC;
}

/* .smart-energy-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);
} */
.alltitle {
  color: #fff;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.boxall {
  border: 2px solid rgba(25, 186, 139, 0.17);
  /* padding: 0 .2rem .4rem .15rem; */
  margin-left: 20px;
  background-size: 100% auto;
  position: relative;
  width: 100px;
  height: 100px;
  /* margin-bottom: 10px; */
  z-index: 10;
}

.boxall:before,
.boxfoot:before {
  border-left: 10px solid rgb(0, 183, 255);
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 10px solid rgb(0, 183, 255);
  right: 0;
}

.alltitle {
  color: #fff;
  text-align: center;
  line-height: 30px;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.boxall:before,
.boxall:after {
  position: absolute;
  width: 50px;
  height: 50px;
  content: "";
  border-top: 4px solid rgb(0, 183, 255);
  top: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 4px solid rgb(0, 183, 255);
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 4px solid rgb(0, 183, 255);
  right: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 50px;
  height: 50px;
  content: "";
  border-bottom: 4px solid rgb(0, 183, 255);
  bottom: 0;
}
</style>
<style lang="scss" scoped>
.smart-energy-item {
  width: 1000px;
  height: 500px;
  // text-align: center;
  border: 2px solid #5be4e4;
  margin: 50px auto 30px;
  position: relative;
  padding-top: 70px;
  padding-left: 80px;

  &::after {
    content: "";
    width: calc(100% - 20px);
    height: 100%;
    position: absolute;
    left: 12px;
    top: -1px;
    bottom: -1px;
    border-bottom: 2px solid #0e393b;
    border-top: 2px solid #0e393b;
    z-index: -1;
  }

  &::before {
    content: "";
    width: 100%;
    height: calc(100% - 20px);
    position: absolute;
    left: -1px;
    right: -1px;
    top: 12px;
    border-left: 2px solid #0e393b;
    border-right: 2px solid #0e393b;
    z-index: -1;
  }
}
</style>
