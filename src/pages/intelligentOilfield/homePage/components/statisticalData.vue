<!-- 统计数据组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <el-dialog
      title="内容设置-统计数据"
      :visible.sync="openDialog"
      width="65%"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
      custom-class="import-dialog"
    >
      <data-transfer
        search-name="指标模块"
        :search-option="searchOption"
        :all-list="allList"
        :selected-list="selectedList"
        :header-name-list="headerNameList"
        @submitForm="submitForm"
        @cancel="cancel"
        @changeData="changeData"
        @changeSource="changeSource"
      />
    </el-dialog>
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="统计数据"
      :header-style="$store.state.setting.mode === 'dark' ? {} : { color: '#0075E9' }"
    >
      <!-- TODO: Maybe change back -->
      <!-- <template #titleContent>
        <div style="width: 100px; cursor: pointer" @click="editContent">
          <i class="el-icon-edit" style="font-size: 14px"><span>编辑内容</span></i>
        </div>
      </template> -->
      <!-- <div id="myBox" style="padding: 20px;" class="g-row-flex g-h100 divBox">
        <div
          v-for="(item, index) in echartsList"
          :key="index"
          class="indexCenter"
          style="font-size: 0; margin: 0 20px 20px 0"
        > -->
      <!-- TODO: Maybe change back -->
      <!-- <iframe
            v-if="!item.indexCode"
            :src="item.indexUrl"
            frameborder="0"
            class="currentIframe"
          /> -->
      <!-- <component
            :is="getComponent(item.indexUrl) "
            v-if="item.uploadingMode === '1'"
          />
          <iframe-index v-else :template-html="item.indexCode" />
        </div>
      </div> -->
      <div id="myBox" class="g-row-flex g-h100 divBox" style="display: block;height: 238px;">
        <el-carousel
          :interval="5000"
          trigger="click"
          :autoplay="false"
          :arrow="echartsLists.length > 1 ? 'always' : 'never'"
        >
          <el-carousel-item v-for="(item, index) in echartsLists" :key="index">
            <div ref="targetElements" :data-index="index" /> <!-- 目标元素，当滚动到该位置时加载子组件 -->
            <div
              v-if="showComponents[index]"
              style="width: 100%; display: flex"
            >
              <div
                v-for="(items, index1) in item"
                :key="index1"
                class="indexCenter"
                style="font-size: 0; margin: 10px 20px 10px 0;"
              >
                <iframe
                  v-if="items.uploadingMode === '1'"
                  :id="'iframe_' + items.indexUrl"
                  v-postTheme="$store.state.setting.mode"
                  :src="addToken(items.indexUrl)"
                  frameborder="0"
                  class="currentIframe"
                />
                <iframe-index v-else :template-html="items.indexCode" />
              </div>
              <!-- TODO: Maybe change back -->
              <!-- <component :is="getComponent(items.indexUrl)" v-if="items.uploadingMode === '1'" /> -->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </info-window>
  </div>
</template>
<script>
// import ComponentsLogin from '@/pages/intelligentOilfield/login/components/components-login.vue';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import dataTransfer from "@/components/intelligentOilfield/data-transfer/index.vue";
import { getHomeList, sureHomeIndex, outHomeIndex, inHomeIndex } from "@/api/intelligentOilfield/system/home";
import iframeIndex from "@/pages/intelligentOilfield/homePage/components/indexCenter/iframeIndex.vue";

import textCom from "@/pages/intelligentOilfield/homePage/components/indexCenter/textCom.vue";
import barChartCom from "@/pages/intelligentOilfield/homePage/components/indexCenter/barChartCom.vue";
import lineChartCom from "@/pages/intelligentOilfield/homePage/components/indexCenter/lineChartCom.vue";
import pieChartCom from "@/pages/intelligentOilfield/homePage/components/indexCenter/pieChartCom.vue";
import textComQHD from "@/pages/intelligentOilfield/homePage/components/indexCenter/textComQHD.vue";
import barChartComQHD from "@/pages/intelligentOilfield/homePage/components/indexCenter/barChartComQHD.vue";
import lineChartComQHD from "@/pages/intelligentOilfield/homePage/components/indexCenter/lineChartComQHD.vue";
import pieChartComQHD from "@/pages/intelligentOilfield/homePage/components/indexCenter/pieChartComQHD.vue";
import { addTokenToUrl } from "@/utils/jumpSupApp.js";

export default {
  components: {
    dataTransfer,
    iframeIndex
  },
  props: {
    // 缩放组件至某一宽度newWPx，目的是换展现形式
    newWPx: {
      type: Number,
      default: 0
    },
    componentItem: {
      type: Object,
      default: () => ({})
    },
    operate: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showComponents: [], // 存储每个子组件是否显示的状态
      imgList: [],
      imgList1: [],
      mode: "light",
      openDialog: false,
      indicatorSource: "",
      options: [],
      initEchartsList: [], // 模板展示
      echartsList: [], // 当前展示
      echartsLists: [],
      storeEchartsList: [], // 存储接口展示
      searchOption: [],
      allList: [],
      selectedList: [],
      storeInitSelectedList: [],
      headerNameList: [
        { id: 0, name: "已选数据", isSelected: true },
        { id: 1, name: "未选数据", isSelected: false }
      ]
    };
  },
  watch: {
    "list": {
      handler(newVal) {
        this.echartsList = [];
        newVal.forEach(item => {
          this.echartsList.push(item);
          if (item.isSelected === "1") {
            // TODO: Maybe change back
            // item.indexUrl = `${window.location.origin}/#${item.indexUrl}`;
            this.storeInitSelectedList.push({
              indexId: item.indexId,
              tenantId: this.$route.query.tenantId
            });
          }
        });
        for (let F = 0; F < this.echartsList.length;) {
          this.echartsLists.push(this.echartsList.slice(F, (F += 6)));
        }
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0 // 目标元素完全可见时触发加载
        };
        this.$nextTick(() => {
          this.echartsLists.forEach((item, index) => {
            const observer = new IntersectionObserver(this.handleIntersect, options);
            const targetElement = this.$refs.targetElements[index];
            if (targetElement) {
              observer.observe(targetElement); // 监听目标元素
            }
          });
        });
        this.$forceUpdate();
      },
      deep: true,
      immediate: true
    },
    "componentItem.content": {
      handler(newVal) {
        this.echartsList = newVal === "default" ? this.echartsList : [];
      },
      deep: true,
      immediate: true
    },
    "componentItem.contentSetting": {
      handler(newVal) {
        if (newVal) {
          this.getAllData("");
          this.openDialog = newVal;
        }
      },
      deep: true,
      immediate: true
    },
    "$store.state.setting.mode": {
      handler(newVal) {
        this.mode = newVal;
      },
      deep: true,
      immediate: true
    },
    operate: {
      handler(newVal) {
        if (newVal === "重置") {
          this.echartsList = JSON.parse(JSON.stringify(this.initEchartsList));
        } else if (newVal === "取消") {
          this.echartsList = JSON.parse(JSON.stringify(this.storeEchartsList));
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getOptionsList();
    this.getAllData();
  },
  methods: {
    handleIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          this.$set(this.showComponents, index, true);
        }
      });
    },
    addToken(url) {
      return addTokenToUrl(url);
    },
    getComponent(e) {
      switch (e) {
        case "/textCom/textComDetail":
          return textCom;
        case "/barChartCom/barChartComDetail":
          return barChartCom;
        case "/lineChartCom/lineChartComDetail":
          return lineChartCom;
        case "/pieChartCom/pieChartComDetail":
          return pieChartCom;
        case "/textComQHD/textComDetailQHD":
          return textComQHD;
        case "/barChartComQHD/barChartComDetailQHD":
          return barChartComQHD;
        case "/lineChartComQHD/lineChartComDetailQHD":
          return lineChartComQHD;
        case "/pieChartComQHD/pieChartComDetailQHD":
          return pieChartComQHD;
        default:
          return textCom;
      }
    },
    editContent() {
      this.openDialog = true;
      this.getAllData("");
    },
    submitForm() {
      // 调取接口
      this.getDataList("");
      this.openDialog = false;
    },
    cancel() {
      // 将数据置为初始状态
      const resultParam = this.storeInitSelectedList;
      sureHomeIndex(resultParam).then(() => {
        this.openDialog = false;
        this.indicatorSource = "";
        this.$emit("change-content-setting", false);
      });
    },
    // 改变数据
    changeData(selectedList, currentItem) {
      const param = {
        indexId: currentItem.indexId,
        tenantId: this.$route.query.tenantId
      };
      // 更新接口
      if (currentItem.isSelected === "0") {
        outHomeIndex(param);
      } else {
        inHomeIndex(param);
      }
    },
    // 改变数据来源
    changeSource(item) {
      this.getAllData(item);
    },

    // 弹窗数据
    getAllData(item) {
      this.allList = [];
      this.selectedList = [];
      const queryParams = {
        indexModule: item || "",
        tenantId: this.$route.query.tenantId
      };

      // 调取接口
      getHomeList(queryParams).then(response => {
        response.data.data.forEach(item => {
          if (item.isSelected === "1") {
            this.selectedList.push({ name: item.indexName, ...item });
          } else {
            this.allList.push({ name: item.indexName, ...item });
          }
        });
      });
    },
    // 获取所有数据来源
    getDataList() {
      this.storeInitSelectedList = [];
      this.echartsList = [];
      const queryParams = {
        indexModule: "",
        tenantId: this.$route.query.tenantId
      };
      // 调取接口
      getHomeList(queryParams).then(response => {
        response.data.data.forEach(item => {
          if (item.isSelected === "1") {
            // TODO: Maybe change back
            // item.indexUrl = `${window.location.origin}/#${item.indexUrl}`;
            this.echartsList.push(item);
            this.storeInitSelectedList.push({
              indexId: item.indexId,
              tenantId: this.$route.query.tenantId
            });
          }
        });
        for (let F = 0; F < this.echartsList.length;) {
          this.echartsLists.push(this.echartsList.slice(F, (F += 6)));
        }
        this.$forceUpdate();
      });
    },
    getOptionsList() {
      // 调取接口：获取下拉来源接口
      // TODO: Maybe change back
      // const tenantId = this.$store.getters["user/tenantId"];
      this.searchOption = [];
      applicationAllList().then(response => {
        response.data.data.forEach(el => {
          this.searchOption.push({
            label: el.appName,
            value: el.appId
          });
        });
      });
    },
    // 选中指标
    selectItem(item) {
      item.isSelected = !item.isSelected;
    }
  }
};
</script>

<style scoped lang="less">
.divBox::after {
  content: "";
  width: 190px;
  display: none;
}

.divBox {
  height: 212px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.imgSetting {
  width: 150px;
}

.successIcon {
  color: rgba(127, 127, 127, 1);
  position: absolute;
  font-size: 20px;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.indexCenter {
  border: 1px solid var(--light-blue-color);
  width: 18%;
  min-width: 190px;
  min-height: 116px;
  height: 176px;
}

.currentIframe {
  transform: scale(1, 1);
  width: 100%;
  height: 100%;
  transform-origin: left top;
  display: block;
}

.el-carousel {
  height: 100%;

  ::v-deep .el-carousel__arrow {
    background-color: rgba(144, 144, 144, 0.4);
  }

  ::v-deep .el-carousel__container {
    height: 100% !important;
  }

  ::v-deep.el-carousel__button {
    background-color: #eff0f4;
  }

  ::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
    width: 8px;
    height: 8px;
    background: var(--dot-bg);
    border-radius: 50%;
    opacity: 0.24;
  }

  ::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
    width: 8px;
    height: 8px;
    background: var(--dot-bg);
    border-radius: 50%;
    opacity: 1;
  }
}

.el-carousel__item {
  display: flex;
  align-items: center;
  padding: 0 60px;
  z-index: 0;

  .indexCenter:nth-last-child(1) {
    margin-right: 0 !important;
  }
}
</style>