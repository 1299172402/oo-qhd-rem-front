<!-- 开发效果评价 -->
<template>
  <div class="app-container">
    <header-search style="height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <div class="fl">
          <span>油田：</span>
          <el-select v-model="selectOilField" @change="getFetchFields">
            <el-option v-for="item in oilField" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
          </el-select>
          <span class="QU" style="margin-left: 20px">区块：</span>
          <el-select v-model="selectBlock"
            ><el-option
              v-for="item in block"
              :key="item.reservoirAnalyseUnitId"
              :label="item.reservoirAnalyseUnitName"
              :value="item.reservoirAnalyseUnitId"
            ></el-option
          ></el-select>
          <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
          <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
          <el-button
            class="commonBtn"
            v-if="$route.query.page"
            style="position: absolute; right: 2%"
            @click="
              $router.push({
                path: $route.query.page,
              })
            "
            >返回</el-button
          >
        </div>
      </div>
    </header-search>
    <page-panel-new style="height: calc(100% - 100px)">
      <el-tabs class="g-pageHeader" v-model="tabsValue" topline @tab-click="handleClick">
        <el-tab-pane
          style="height: auto"
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <div class="tab-view">
            <el-button
              v-for="(module, index) in item.modules"
              :key="index"
              :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'"
              @click="currentModule = module.name"
            >
              {{ module.label }}
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="childContent">
        <evaluation
          v-if="tabsValue == 'evaluation' && selectOilField && selectBlock"
          ref="childComponents"
          :selectOilField="selectOilField"
          :selectBlock="selectBlock"
        ></evaluation>
        <reserves
          v-if="tabsValue == 'reserves'"
          ref="childComponents"
          :selectOilField="selectOilField"
          :selectBlock="selectBlock"
        ></reserves>
        <water
          v-if="tabsValue == 'water'"
          ref="childComponents"
          :selectOilField="selectOilField"
          :selectBlock="selectBlock"
        ></water>
        <decreasing
          v-if="tabsValue == 'decreasing'"
          ref="childComponents"
          :selectOilField="selectOilField"
          :selectBlock="selectBlock"
        ></decreasing>
      </div>
    </page-panel-new>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import evaluation from "./components/evaluation.vue";
import reserves from "./components/reserves.vue";
import water from "./components/water.vue";
import decreasing from "./components/decreasing.vue";
export default {
  components: {
    Echart,
    evaluation,
    reserves,
    water,
    decreasing,
  },
  filters: {
    toFixNumberFour(val) {
      return val.toFixed(4);
    },
  },
  data() {
    return {
      //油田
      oilField: [],
      //区块
      block: [],
      companyId: "",
      //区块选中值
      selectOilField: "",
      selectBlock: "",
      //tabs标签
      tabs: [
        {
          label: "产能类",
          name: "evaluation",
        },
        {
          label: "储量类",
          name: "reserves",
        },
        {
          label: "含水类",
          name: "water",
        },
        {
          label: "递减类",
          name: "decreasing",
        },
      ],
      tabsValue: "evaluation",
      //查询参数
      queryParams: {},
      page: 1,
      pageSize: 10,
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
    };
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.initData();
    },
    //设置页面初始化
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId = res.data.data[0]?.currentTenantBindOrgId
            ? res.data.data[0].currentTenantBindOrgId
            : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilField = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selectOilField = this.oilField[0].ogfId ? this.oilField[0].ogfId : undefined;
          }
        }
      });
      if (this.$route.params.oilFieldId) {
        //设置默认油田
        this.selectOilField = this.$route.params.oilFieldId;
      }
      //获得区块信息
      await QueryReservoirAnalyseUnit({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data;
          this.block.unshift({
            reservoirAnalyseUnitId: this.selectOilField,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          //区块全部为油田的id。
          this.selectBlock = this.selectOilField;
        }
      });
      let fieldId = this.$route.params.fieldId;
      if (fieldId) {
        this.selectBlock = fieldId;
      }
      if (this.$route.query.link) {
        this.tabsValue = this.$route.query.link;
        console.log(this.tabsValue);
        setTimeout(() => {
          this.$refs.childComponents.doSearch();
        }, 1000);
      }
    },
    //获得区块信息
    getFetchFields(oilFieldId) {
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data;
          this.block.unshift({
            reservoirAnalyseUnitId: oilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          //区块全部为油田的id。
          this.selectBlock = oilFieldId;
        }
      });
    },
    //点击标签
    handleClick(item) {
      this.tabsValue = item.name;
    },
    //搜索方法
    doSearch() {
      this.$refs.childComponents.doSearch();
    },
    //获取当前页面的权限内容，并处理其逻辑问题
    getPageAuthMessage() {
      this.downPower(false);
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = "znytglxt";
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({ areaCode: areaCode, loginName: loginName })
        .then((res) => {
          let myList = res.data.dataList;
          if (myList) {
            let pageMes = myList.find((item) => {
              return item.resPvalue == myPath;
            });
            if (pageMes) {
              this.myWidget = pageMes.widgetList;
            }
            if (this.myWidget) {
              for (let indexNum in this.myWidget) {
                try {
                  let myWidgetItem = this.myWidget[indexNum];
                  switch (myWidgetItem.widgetCode) {
                    case "addInfo":
                      this.canAddInfo = true;
                      break;
                    case "updateInfo":
                      this.canUpdateInfo = true;
                      break;
                    case "sendInfo":
                      this.canSendInfo = true;
                      break;
                    case "deleteInfo":
                      this.canDeleteInfo = true;
                      break;
                    case "download":
                      {
                        this.canDownload = true;
                        this.downPower(this.canDownload);
                      }
                      break;
                    case "upload":
                      this.canUpload = true;
                      break;
                    default:
                  }
                } catch (e) {
                  continue;
                }
              }
            }
          }
        })
        .catch((error) => {});
    },
    //下载echarts 隐藏 显示
    downPower(flag) {
      this.productionSpeed.toolbox.show = flag;
      this.recoveryDegree.toolbox.show = flag;
      this.relationship.toolbox.show = flag;
      this.injectionProductionRatio.toolbox.show = flag;
      this.totalFormationPressureDrop.toolbox.show = flag;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  .g-pageHeader {
    height: 40px;
    margin-bottom: 10px;
  }
  .childContent {
    height: calc(100% - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
