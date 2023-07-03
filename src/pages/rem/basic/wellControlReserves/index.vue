<!-- 基础数据维护 - 井控储量数据界面 -->
<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <div style="display: flex;flex-direction: row; height: 100%;">
      
      <div style=" height: 100%">
        <tree-multiple-selection :level = "'6'" @childinfo = 'childinfo' />
      </div>
      <div
        style="display: flex;flex-direction: column;  height: calc(100%);margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
        <header-search class="g-w100 g-h100" style="height: auto">
          <div class="g-row-flex-V g-w100 g-h100">
            <div style="margin-top: 20px">
              <el-form :inline="true">
                <el-form-item label="作业公司：">
                  <el-select v-model="queryData.orgId" disabled>
                    <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.orgName" :value="item.orgId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="油田：">
                  <el-select v-model="queryData.ogfId" disabled>
                    <el-option
                      v-for="(item, index) in oilFields"
                      :key="index"
                      :label="item.ogfName"
                      :value="item.ogfId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="queryserch()" icon="el-icon-search">搜索</el-button>
                  <el-button class="commonBtn" @click="refresh()" icon="el-icon-refresh">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </header-search>
    
        <pagePanel headerTitle="单井储量信息维护界面" style="height: calc(100% - 100px)" class="g-w100" :show-btn="true">
            <div style="margin-top: 5%">
                <div class="alltitle">{{ wellName }}</div>
                <div class="boxall" style="height: 500px; width: 900px; margin: auto">
                    <div style="margin-left:4%;margin-top:100px">
                        <el-form
                            :model="djclForm"
                            style="width: 800px; padding-top: 20px"
                            ref="djclForm"
                            label-width="110px"
                            class="demo-ruleForm"
                        >
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="层位选择" prop="cw">
                                        <el-select v-model="djclForm.layerId" @change="selectcw" placeholder="" style="width: 100.5%">
                                            <el-option
                                                v-for="item in cwOptions"
                                                :key="item.layerId"
                                                :label="item.layerName"
                                                :value="item.layerId"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;</el-col>
                                <el-col :span="10">
                                    <el-form-item label="有效厚度" prop="cw">
                                        <el-input v-model="djclForm.thicknessEffe" :disabled="edit"> <i slot="suffix">m</i></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="控制储量" prop="kzcl">
                                        <el-input v-model="djclForm.probReservesWell" :disabled="edit"> <i slot="suffix">m³</i></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;</el-col>
                                <el-col :span="10">
                                    <el-form-item label="控制面积" prop="kzmj">
                                        <el-input v-model="djclForm.controlArea" :disabled="edit">
                                            <i slot="suffix">m²</i>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="2">㎡</el-col> -->
                            </el-row>
                            <el-row>
                                <el-col :span="24" align="right" style="padding-top: 20px">
                                    <el-button type="primary" @click="redact" icon="el-icon-edit">编辑</el-button>
                                    <el-button type="primary" @click="save">保存</el-button>
                                    <el-button type="primary" icon="el-icon-search">运行计算</el-button>
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
import {
  fetchOilFields,
  fetchPlatforms,
  fetchInjectionWells,
  fetchInjectionWellsByPlatform,
  fetchProductionWells,
  fetchProductionWellsByPlatform,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { queryLayerList, getOilFieldList } from "@/api/rem/workcompanydesignate";
import { saveControlledReserves, getControlledReserves } from "@/api/rem/welldetailedevaluationresult";
import { 
    queryOperatingCompanyDetail,
    queryOperatorsCheckFieldListsDetail,
    queryListOfOilfieldQueryPlatformsDetail,
    queryPlatformQueryWellListDetail,
    queryOilAndGasFieldQueryPositionDetail
} from "@/api/basic/master";
import treeMultipleSelection from "@/pages/rem/basic/components/index.vue";

export default {
  name:'reserves',
  components: {treeMultipleSelection},
  data() {
    return {
      cwOptions: [],
      edit: true,
      queryData: {
        assetCode: "",
        month: new Date().format("yyyy-MM"),
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        // wellId: "09D30C16BD1D4F759D53F74941701307",
        wellId: "",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A",
        pt: "",
      },
      deptSelect: [], //作业公司
      wells: [],
      platforms: [],
      oilFields: [],
      djclForm: {},
      wellName: "",
    };
  },
  mounted() {
    this.getList();
    this.queryserch();
  },
  methods: {
    getList() {
        //获取作业公司
        queryOperatingCompanyDetail({}).then(res=>{
            this.deptSelect = res.data.data
        })
        //根据作业公司查询油田
        queryOperatorsCheckFieldListsDetail({orgId:this.queryData.orgId}).then(res=>{
            this.oilFields = res.data.data
        })
        //根据油田查询平台列表
        queryListOfOilfieldQueryPlatformsDetail({ogfId:this.queryData.ogfId}).then(res=>{
            this.platforms = res.data.data
        })
    },
    selectcw() {
      let adta = {
        wellId: this.queryData.wellId,
        layerId: this.djclForm.layerId,
      };
      getControlledReserves(adta).then((res) => {
        if (res.data.data) {
          this.djclForm = res.data.data;
        } else {
          this.djclForm = [];
        }
      });
    },
    redact() {
      this.edit = false;
    },
    queryserch() {
        //获取层位
        queryOilAndGasFieldQueryPositionDetail({ogfId:this.queryData.ogfId}).then((res) => {
            this.cwOptions = res.data.data;
        });
    },
    save() {
      this.djclForm.controlArea = Number(this.djclForm.controlArea);
      this.djclForm.probReservesWell = Number(this.djclForm.probReservesWell);
      this.djclForm.thicknessEffe = Number(this.djclForm.thicknessEffe);
      saveControlledReserves({ ...this.djclForm, wellId: this.queryData.wellId }).then((res) => {
        if (res.data.code == 200) {
          this.edit = true;
          this.$message.success("保存成功！");
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
        }
      });
    },

    // 重置仅重置搜索条件与下方查询内容无关
    refresh() {
      this.queryData.pt = "";
      let oilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
      const request = {
        oilFieldId,
      };
      fetchProductionWells(request).then((res) => {
        if (res.data.code == 200) {
          let wellList = res.data.data.productionWells;
          let arr = [];
          wellList.map((n) => {
            if (n.wellName != null) {
              arr.push(n);
            }
          });

          this.wells = [...arr];
          this.wells.unshift({
            wellId: "",
            wellName: "全部",
          });
          this.queryData.wellId = "";
        }
      });
    },
    //通过油田 或 平台 获得井
    getFetchWells(oilFieldId, platformId) {
      this.wells = [];
      if (platformId == "") {
        const request = { oilFieldId };
        fetchProductionWells(request).then((res) => {
          if (res.data.code == 200) {
            let wellData = res.data.data.productionWells || [];
            if (wellData.length) {
              const wellList = wellData.filter((el) => el.wellName);
              this.wells = this.wells.concat(wellList);
            }
          }
          fetchInjectionWells(request).then((res) => {
            if (res.data.code == 200) {
              const waterWellList = res.data.data.injectionWell || [];
              this.wells = this.wells.concat(waterWellList);
              this.wells.unshift({
                wellId: "",
                wellName: "全部",
              });
            }
          });
        });
      } else {
        const request = { platformId };
        fetchProductionWellsByPlatform(request).then((res) => {
          if (res.data.code == 200) {
            let wellData = res.data.data.productionWells || [];
            if (wellData.length) {
              const wellList = wellData.filter((el) => el.wellName);
              this.wells = this.wells.concat(wellList);
            }
          }
          fetchInjectionWellsByPlatform(request).then((res) => {
            if (res.data.code == 200) {
              const waterWellList = res.data.data.injectionWell || [];
              this.wells = this.wells.concat(waterWellList);
              this.wells.unshift({
                wellId: "",
                wellName: "全部",
              });
              this.queryData.wellId = "";
            }
          });
        });
      }
    },
    childinfo(data){
      this.queryData.pt = data[3]?.value
      this.queryData.wellId = data[4]?.value
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
.alltitle {
  color: #fff;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.boxall {
  border: 2px solid rgba(25, 186, 139, 0.17);
  margin-left: 20px;
  background-size: 100% auto;
  position: relative;
  width: 100px;
  height: 100px;
  z-index: 10;
}

.boxall:before,
.boxfoot:before {
  border-left: 10px solid rgb(0,183,255);
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 10px solid rgb(0,183,255);
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
  border-top: 4px solid rgb(0,183,255);
  top: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 4px solid rgb(0,183,255);
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 4px solid rgb(0,183,255);
  right: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 50px;
  height: 50px;
  content: "";
  border-bottom: 4px solid rgb(0,183,255);
  bottom: 0;
}
</style>

