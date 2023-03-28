<!-- 基础数据维护 - 井控储量数据界面 -->
<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <header-search class="g-w100 g-h100" style="height: auto">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin-top: 20px">
          <el-form :inline="true">
            <el-form-item label="作业公司：">
              <el-select v-model="queryData.orgId" disabled>
                <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.deptName" :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="油田">
              <el-select v-model="queryData.ogfId">
                <el-option
                  v-for="(item, index) in oilFields"
                  :key="index"
                  :label="item.oilFieldName"
                  :value="item.oilFieldId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台" prop="pt">
              <el-select v-model="queryData.pt">
                <el-option v-for="item in platforms" :key="item.id" :label="item.platName" :value="item.platFormId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号">
              <el-select v-model="queryData.wellId">
                <el-option v-for="item in wells" :key="item.id" :label="item.wellName" :value="item.wellId">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="评价时间" prop="pjsj">
              <el-date-picker v-model="queryData.month" type="month" format="yyyy-MM" value-format="yyyy-MM">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="queryserch()" icon="el-icon-search">检索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </header-search>

    <pagePanel headerTitle="单井储量信息维护" style="height: calc(100% - 100px)" class="g-w100">
      <div class="smart-energy-item">
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
                <el-select v-model="djclForm.layerId" placeholder="" style="width: 100.5%">
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
    </pagePanel>
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
} from '@/api/oilDeposit/rem-02/primaryinfo.js';
import { queryLayerList, queryDensityInfo, getOilFieldList } from '@/api/rem/workcompanydesignate';
import { saveWellDetailedEvaluation } from '@/api/rem/welldetailedevaluationresult';
export default {
  components: {},
  data() {
    return {
      cwOptions: [],
      edit: true,
      queryData: {
        assetCode: '',
        month: new Date().format('yyyy-MM'),
        ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
        wellId: '',
        orgId: '715AD1CD60484BB59E737CD18A9DE44A',
      },
      deptSelect: [
        {
          deptId: '715AD1CD60484BB59E737CD18A9DE44A',
          deptName: '秦皇岛32-6渤中作业公司',
        },
      ], //作业公司
      wells: [],
      platforms: [],
      oilFields: [],
      djclForm: {},
    };
  },
  mounted() {
    this.getList();
    this.getData();
    this.queryserch();
  },
  methods: {
    getList() {
      getOilFieldList({ orgId: '715AD1CD60484BB59E737CD18A9DE44A' }).then((res) => {
        if (res.data.code == 200) {
          console.log(res, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
          this.oilFields = res.data.data;
          // if (this.oilFields.length == 0) {
          //   this.selectOilField = "";
          // } else {
          //   this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
          // }
        }
      });
      fetchOilFields().then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.oilFields = res.data.data.oilFields;
          this.queryData.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F';
          const requestPlat = {
            oilFieldId: this.queryData.ogfId,
          };
          fetchPlatforms(requestPlat).then((res) => {
            if (res.data.code == 200) {
              this.platforms = res.data.data.platform;
              this.platforms.map((n)=>{
                if(n.platName == '全部'){
                  n.platFormId = ''
                }
                this.queryData.pt = ''
              })
            }
          });
        }
      });
    },
    redact() {
      this.edit = false;
    },
    queryserch() {
      queryLayerList(this.queryData).then((res) => {
        if (res.data.code == 200) {
          this.cwOptions = res.data.data;
        } else {
          this.$message.error('系统错误请重新尝试或联系运维人员！');
        }
        console.log(this.tableData);
      });
    },
    save() {
      this.edit = true;
      saveWellDetailedEvaluation({ ...this.djclForm, wellId: this.queryData.wellId }).then((res) => {
        if (res.data.code == 200) {
          this.edit = true;
          this.$message.success('保存成功！');
        } else {
          this.$message.error('系统错误请重新尝试或联系运维人员！');
        }
      });
    },
    getData() {
      let oilFieldId = '3FC9A818F5BC43B88270DB80BBB3018F';
      const request = {
        oilFieldId
      };
      fetchProductionWells(request).then((res) => {
        if (res.data.code == 200) {
          let wellList = res.data.data.productionWells;
          let arr = []
          wellList.map((n)=>{
            if(n.wellName !=null){
              arr.push(n)
            }
          })
          this.wells = [...arr];
        }
      });
      // fetchInjectionWells(request).then((res) => {
      //   if (res.data.code == 200) {
      //     const wellList = res.data.data.injectionWell;
      //     this.wells = [...this.wells, ...wellList];
      //   }
      // });
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
    content: '';
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
    content: '';
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
