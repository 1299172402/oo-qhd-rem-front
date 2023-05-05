<!-- 应用中心组件 -->
<template>
  <div style="font-size: 20px;margin-top: 20px;" class="g-w100 g-h100">
    <el-dialog
      title="内容设置-应用中心"
      :visible.sync="openDialog"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
    >
      <!-- :before-close="cancel" -->
      <div>
        <!-- TODO: Maybe change back -->
        <!--        <data-transfer-->
      <!--          search-name="应用来源"-->
      <!--          :search-option="dict.type.sys_app_type"-->
      <!--          :all-list="allList"-->
      <!--          :selected-list="selectedList"-->
      <!--          @submitForm="submitForm"-->
      <!--          @cancel="cancel"-->
      <!--          @changeData="changeData"-->
      <!--          @changeSource="changeSource"-->
      <!--        />-->
      <!--      </div>-->
      </div>
    </el-dialog>
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="已授权应用"
      :header-style="$store.state.setting.mode === 'dark'?{}:{color:'#3490D3'}"
    >
      <!-- <template #titleContent>
        <div>
          <el-input
            @change="getInitData(activeName, inputInfo)"
            class="topselect"
            prefix-icon="el-icon-search"
            v-model="inputInfo"
            style="width: 300px"
            placeholder="请输入菜单名称"
          ></el-input>
        </div>
                            </template> -->
      <div>
        <div class="g-row-flex g-h100 divBox" style="display: block;">
          <el-carousel
            :interval="5000"
            trigger="click"
            :autoplay="false"
            :arrow="carouselList.length > 1 ? 'always' : 'never'"
          >
            <el-carousel-item v-for="(item, index) in carouselList" :key="index">
              <div
                v-for="(items, index1) in item"
                :key="index1"
                class="g-column-flex-H"
                style="position: relative; justify-content: center; align-items: center; flex-wrap: wrap; cursor: pointer; width: 6.7%; height: 102px;min-width: 6.6%"
                @click="toClick(items)"
              >
                <img
                  v-if="items.appImg"
                  :src="items.imgUrl ? items.imgUrl : ''"
                  alt=""
                  class="imgSetting"
                  style="width: 40px;height: 40px"
                  @error="imgError(items)"
                >
                <!-- 增加未上传图标显示默认图标+首字母 -->
                <div v-else class="bgImage g-row-flex-HV" style="width: 40px;height: 40px">
                  {{ items.appName[0] }}
                </div>
                <el-tooltip
                  effect="dark"
                  :content="items.appName"
                  placement="top"
                >
                  <span class="textSpan">{{ items.appName }}</span>
                </el-tooltip>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      <!-- <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          class="g-pageHeader myHeader"
          style="position: relative; z-index: 0; height: 30%"
        >
          <el-tab-pane label="开发生产中心" name="1"></el-tab-pane>
          <el-tab-pane label="安全管理中心" name="2"></el-tab-pane>
          <el-tab-pane label="设备设施中心" name="3"></el-tab-pane>
          <el-tab-pane label="通用技术中心" name="4"></el-tab-pane>
                              </el-tabs> -->
        <!-- <circularPanel jumpType="linkPage" modelName="application" :height="componentItem.height" :panels="panels"></circularPanel> -->
      </div>
    </info-window>
  </div>
</template>
<script>
// import circularPanel from '@/components/intelligentOilfield/circular-panel/index.vue';
import { applicationCenterList, batchUpdateApp, updateApp } from "@/api/intelligentOilfield/portal/officeMode";
import { addAccessinfo } from "@/api/intelligentOilfield/system/user";
import jumpSupApp from "@/utils/jumpSupApp.js";

export default {
  props: {
    // componentItem.content(解视：default:有默认面板内容 ，newPanel：新创建面板，内容为空)
    // componentItem.contentSetting(解释：内容设置，true:正在设置，false：未设置)
    componentItem: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      panels: [],
      allPanels: [],
      inputInfo: "",
      activeName: "1", // 1，开发生产中心;2，安全管理中心;3，设备设施中心;4，通用支持中心
      openDialog: false,
      allList: [],
      lists: [],
      carouselList: [],
      selectedList: [
        // { id: 4, img: '', name: '其它应用' },
        // { id: 5, img: '', name: '船体管理' },
        // { id: 6, img: '', name: '施工总览' },
      ],
      getNum: 0, // 获取当前获取数据源次数，目的存储第一次获取数据集
      storeInitData: [],
      queryParam: {
        apply: parseInt(this.activeName, 10),
        appName: "",
        appType: ""
      },
      storeSelectedList: [],
      searchOption: []
    };
  },
  watch: {
    "componentItem.content": {
      handler() {
        // this.panels = newVal === 'default' ? this.defaultPanels:[];
        // this.panels = newVal === 'default' ? this.selectedList : [];
      },
      deep: true,
      immediate: true
    },
    "componentItem.contentSetting": {
      handler(newVal) {
        if (newVal) {
          this.openDialog = newVal;
          this.getDataList("");
          this.getNum = 0;
        }
      },
      deep: true,
      immediate: true
    },
    "list": {
      handler(newVal) {
        if (newVal) {
          this.lists = newVal;
          this.carousel();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.getOptionsList();
  },
  created() {
    // this.initData();
    // this.getInitData();
  },
  methods: {
    imgError(item) {
      item.img = new URL("../../../../assets/intelligentOilfield/bgImg.png", import.meta.url).href;
    },
    toClick(item) {
      // 应用中心
      if (item.appType === "0") { // 内部跳转的逻辑
        const paramQuery = {
          appId: item.appId,
          appName: item.appName,
          userId: this.$store.getters["user/userDetail"].user.userId
        };
        addAccessinfo(paramQuery).then(() => {});
        jumpSupApp(item.appPcAccessUrl);
      }
    },
    initData() {
      this.allPanels = [];
    },
    getInitData() {
      this.panels = [];
      // 调用接口,param为传参
      this.queryParam = {
        apply: "",
        appName: this.inputInfo,
        appType: ""
      };
      this.allPanels = [];
      applicationCenterList(this.queryParam).then(response => {
        response.data.data.forEach(el => {
          if (el.isSelected === "1") {
            el.appImg = new URL(`../../../../assets/intelligentOilfield/${el.appImg}`, import.meta.url);
            this.allPanels.push(el);
          }
        });
        this.panels = JSON.parse(JSON.stringify(this.allPanels));
      });
    },
    handleClick() {
      this.getInitData();
    },
    getOptionsList() {
      // 调取接口：获取下拉来源接口
      this.searchOption = [
        {
          value: "1",
          label: "业务应用"
        },
        {
          value: "2",
          label: "油藏管理"
        },
        {
          value: "3",
          label: "普通应用"
        }
      ];
    },
    changeSource(item) {
      this.getDataList(item);
    },
    // 获取所有数据来源
    getDataList(currentAppType) {
      this.allList = [];
      this.selectedList = [];
      this.inputInfo = "";
      this.queryParam = {
        apply: "",
        appName: "",
        appType: currentAppType
      };
      // 调取接口
      applicationCenterList(this.queryParam).then(response => {
        response.data.data.forEach(el => {
          if (el.isSelected === "0") {
            this.allList.push({ appName: el.name } = el);
          } else {
            this.selectedList.push({ appName: el.name } = el);
          }
        });
        if (currentAppType === "" && this.getNum === 0) { // 存储不带分类的已选应用和未选应用
          this.getNum += 1;
          this.storeInitData = JSON.parse(JSON.stringify(this.allList)).concat(JSON.parse(JSON.stringify(this.selectedList)));
        }
      });
    },
    // 改变数据
    changeData(selectedList, currentItem) {
      updateApp(currentItem).then(() => {});
    },
    submitForm() {
      this.openDialog = false;
      this.getInitData("");
      this.$emit("change-content-setting", false);
    },
    cancel() {
      // 将数据置为初始状态
      batchUpdateApp(this.storeInitData).then(() => {
        this.openDialog = false;
        this.$emit("change-content-setting", false);
      });
    },
    carousel() {
      this.carouselList = [];
      for (let i = 0; i < this.lists.length;) {
        this.carouselList.push(this.lists.slice(i, (i += 15)));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.topselect {
  width: 90% !important;

  ::v-deep {
    .el-input__inner {
      height: 30px;
    }

    .el-input__prefix,
    .el-input__suffix {
      height: 30px;
    }

    /* 下面设置右侧按钮居中 */
    .el-input__suffix {
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      align-content: flex-start;
    }

    .el-input__icon {
      line-height: 32px;
    }
  }
}
</style>

<style scoped lang="less">
.el-tabs__item {
  padding: 0 10px;
}

.textSpan {
  font-size: 12px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  color: #909399;
  display: inline-block;
  max-width: 82px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.el-carousel {
  height: 100%;

  ::v-deep .el-carousel__arrow {
    background-color: rgba(144, 144, 144, 0.4);
  }

  ::v-deep .el-carousel__container {
    height: 126px !important;
  }

  ::v-deep.el-carousel__button {
    background-color: #eff0f4;
  }

  ::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
    width: 10px;
    height: 10px;
    background: rgb(144, 144, 144);
    border: 1px solid rgb(144, 144, 144);
    border-radius: 50%;
    opacity: 0.5;
  }

  ::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
    width: 10px;
    height: 10px;
    background: var(--light-blue-color);
    border-radius: 50%;
    opacity: 1;
  }
}

.el-carousel__item {
  display: flex;
  align-items: center;
  padding: 0 60px;
  z-index: 0;
}
</style>