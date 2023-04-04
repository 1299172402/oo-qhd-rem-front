<!-- 统计数据组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <el-dialog
      title="内容设置-统计数据"
      :visible.sync="openDialog"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
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
    <info-window info-width="100%" info-height="100%" header-title="统计数据">
      <template #titleContent>
        <div style="width: 100px;cursor: pointer" @click="editContent">
          <i class="el-icon-edit" style="font-size: 14px"><span>编辑内容</span></i>
        </div>
      </template>
      <!-- <div
        style="padding: 20px; justify-content: space-between; overflow: scroll; flex-wrap: wrap"
        class="g-row-flex g-h100 divBox"
        id="myBox"
        :style="{ flexWrap: echartsList.length > 5 ? (newWPx <= 938 && newWPx !== 0 ? 'wrap' : 'nowrap') : 'wrap' }"
      >
        <div
          class="indexCenter"
          v-for="(item, index) in echartsList"
          :key="index"
          :style="{
            margin:
              newWPx <= 938 && newWPx !== 0
                ? '0px 0px 10px 0px'
                : index === echartsList.length - 1
                ? '0px'
                : '0px 10px 0px 0px',
          }" -->
      <div
        id="myBox"
        style="padding: 20px; justify-content: space-between; overflow: scroll; flex-wrap: wrap"
        class="g-row-flex g-h100 divBox"
        :style="{ flexWrap: echartsList.length > 5 ? (newWPx <= 938 && newWPx !== 0 ? 'wrap' : 'nowrap') : 'wrap' }"
      >
        <div
          v-for="(item, index) in echartsList"
          :key="index"
          class="indexCenter"
          style="font-size: 0"
          :style="{
            margin:
              newWPx <= 938 && newWPx !== 0
                ? '0px 0px 10px 0px'
                : index === echartsList.length - 1
                  ? '0px'
                  : '0px 10px 0px 0px',
          }"
        >
          <iframe :src="item.indexUrl" frameborder="0" class="currentIframe" />
        </div>
      </div>

      <!-- <component :is="getContent(item.type)" :echartsItem="item" /> -->
      <!-- </div>
      </div> -->
    </info-window>
  </div>
</template>
<script>
// import ComponentsLogin from '@/pages/intelligentOilfield/login/components/components-login.vue';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import dataTransfer from "@/components/intelligentOilfield/data-transfer/index.vue";
import { getHomeList, sureHomeIndex, outHomeIndex, inHomeIndex } from "@/api/intelligentOilfield/system/home";

export default {
  components: {
    dataTransfer
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
    }
  },
  data() {
    return {
      imgList: [],
      imgList1: [],
      mode: "light",
      openDialog: false,
      indicatorSource: "",
      options: [],
      initEchartsList: [], // 模板展示
      echartsList: [], // 当前展示
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
    newWPx: {
      handler(newVal) {
        // console.log('最新宽度', newVal);
        // 最后一行以左边对齐
        if (newVal <= 938 && newVal !== 0) {
          // 兼容IE浏览器
          document.styleSheets[0].addRule("#myBox::after", "display:block");
          // 支持非IE的现代浏览器
          document.styleSheets[0].insertRule("#myBox::after {display: block}", 0);
        } else {
          document.styleSheets[0].addRule("#myBox::after", "display:none");
          document.styleSheets[0].insertRule("#myBox::after {display: none}", 0);
        }
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
    "$store.state.user.tenantId": {
      handler(newValue) {
        if (newValue) {
          this.getDataList();
          this.getAllData();
        }
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
  },
  methods: {
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
            item.indexUrl = `${window.location.origin}/#${item.indexUrl}`;
            this.echartsList.push(item);
            this.storeInitSelectedList.push({
              indexId: item.indexId,
              tenantId: this.$route.query.tenantId
            });
          }
        });
        this.$forceUpdate();
      });
    },
    getOptionsList() {
      // 调取接口：获取下拉来源接口
      const tenantId = this.$route.query.tenantId;
      this.searchOption = [];
      applicationAllList(tenantId).then(response => {
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

<style scoped>
.divBox::after {
  content: "";
  width: 190px;
  display: none;
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
}

.currentIframe {
  transform: scale(1, 1);
  width: 100%;
  height: 100%;
  transform-origin: left top;
  display: block;
}
</style>