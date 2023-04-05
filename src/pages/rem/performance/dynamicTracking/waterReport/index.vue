<!-- 油井分析报告 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryData" :inline="true" style="margin-top: 18px">
        <el-form-item label="作业公司：">
          <el-select v-model="queryData.orgId" disabled>
            <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select v-model="queryData.ogfId" disabled>
            <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台：" prop="createBy">
          <el-select v-model="queryData.assetCode" @change="doChangePT" style="width: 220px">
            <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井名：" prop="createBy">
          <el-select v-model="queryData.selectWellId" style="width: 220px">
            <el-option
              v-for="item in wellData"
              :key="item.wellId"
              :label="item.wellName"
              :value="item.wellId"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="getData" size="mini" type="primary">检索</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
  </div>
</template>

<script>
import {
  fetchOilFields,
  fetchPlatforms,
  fetchProductionWells,
  fetchInjectionWells,
  fetchInjectionWellsByPlatform,
  uploadFile,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, "$1")]: i[1].default,
    }),
  {},
);
export default {
  components: {
    ...moduleName,
  },
  data() {
    return {
      oilField: "",
      platforms: [], //平台数据
      wellData: [],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 油田下拉框
      oilFields: [],
      platforms: [],
      deptSelect: [
        {
          deptId: "715AD1CD60484BB59E737CD18A9DE44A  ",
          deptName: "秦皇岛32-6渤中作业公司",
        },
      ], //作业公司
      noticeList: [], // 表格数据
      datalist: [], //下方表格数据
      // 显示搜索条件
      queryData: {
        assetCode: "",
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A  ",
        selectWellId: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data.oilFields;
          if (this.oilFields.length == 0) {
            this.oilField = "";
          } else {
            this.oilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          }
          this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          const requestPlat = {
            oilFieldId: this.selectOilField,
          };
          fetchPlatforms(requestPlat).then((res) => {
            if (res.data.code == 200) {
              this.platforms = res.data.data.platform;
              this.queryData.assetCode = "3FC9A818F5BC43B88270DB80BBB3018F";
            }
          });
        }
      });
      let request = {
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
      };
      fetchProductionWells(request).then((res) => {
        if (res.data.code == 200) {
          let wellData = res.data.data.productionWells;
          this.wellData = wellData.filter((el) => el.wellName);
          this.queryData.selectWellId = "09D30C16BD1D4F759D53F74941701307";
        }
      });
    },
    getData() {
      for (let i = 0, j = 11; i <= j; i++) {
        const child = this.$refs[`toolchild${i}`];
        child.passValue(this.queryData);
      }
    },
    getFetchProductionWellsByPlatform(platformId) {
      let request = { platformId };
      fetchInjectionWellsByPlatform(request).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data.injectionWell;
        }
      });
    },
    //查询油井信息
    getFetchProductionWells(oilFieldId) {
      let request = { oilFieldId: oilFieldId };
      fetchInjectionWells(request).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data.injectionWell;
        }
      });
    },
    doChangePT(val) {
      this.queryData.selectWellId = "";
      if (this.queryData.ogfId == val) {
        this.getFetchProductionWells(val);
      } else {
        this.getFetchProductionWellsByPlatform(val);
      }
    },
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

::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
::v-deep .el-table__body-wrapper {
  height: calc(100% - 70px) !important;
}
</style>
