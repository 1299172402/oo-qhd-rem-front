<!-- 看板中心组件 -->
<template>
  <div style="font-size: 20px;margin: 20px 0;" class="g-w100 g-h100">
    <div id="fullScreen_panorama">
      <bottom-button v-if="linkUrl !== ''" class="bottomBtn" @bigScreenMode="fullExit" />
      <iframe
        v-if="linkUrl !== ''"
        :src="linkUrl"
        frameborder="0"
        class="g-w100 g-h100"
      />
    </div>
    <el-dialog
      title="内容设置-看板中心"
      :visible.sync="openDialog"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        <data-transfer
          search-name="看板来源"
          :search-option="dict.type.sys_app_type"
          :all-list="allList"
          :selected-list="selectedList"
          :header-name-list="headerNameList"
          @submitForm="submitForm"
          @cancel="cancel"
          @changeData="changeData"
          @changeSource="changeSource"
        />
      </div>
    </el-dialog>
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="已授权看板"
      :header-style="$store.state.setting.mode === 'dark'?{}:{color:'#3490D3'}"
    >
      <div class="g-w100 g-h100 g-column-flex">
        <!-- <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          class="g-pageHeader"
          style="position: relative; z-index: 0; height: 15%"
        >
          <el-tab-pane label="专业看板" name="professionalKanban"></el-tab-pane>
          <el-tab-pane label="协同看板" name="collaborativeKanban"></el-tab-pane>
                      </el-tabs> -->
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
                style="position: relative; justify-content: center; align-items: center; flex-wrap: wrap; cursor: pointer; width: 6.6%; height: 102px;min-width: 6.6%"
                @click="toClick(items.boardUrl)"
              >
                <img
                  v-if="items.boardImg"
                  :src="items.boardImg?items.boardImg:''"
                  alt=""
                  class="imgSetting"
                  style="width: 40px"
                  @error="imgError(items)"
                >
                <!-- 增加未上传图标显示默认图标+首字母 -->
                <div v-else class="bgImage g-row-flex-HV" style="width: 40px;height: 40px">
                  {{ items.boardName[0] }}
                </div>
                <el-tooltip
                  effect="dark"
                  :content="items.boardName"
                  placement="top"
                >
                  <span class="textSpan">{{ items.boardName }}</span>
                </el-tooltip>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      <!-- <div class="g-w100 g-row-flex-HV" style="height: 85%;">
        <circularPanel
          @linkIframe="linkIframe"
          :changeNewPx="newWPx"
          :panels="selectedList"
          class="g-w100"
        ></circularPanel>
                      </div> -->
      </div>
    </info-window>
  </div>
</template>
<script>
// import circularPanel from '@/components/intelligentOilfield/circular-panel/index.vue';
import bottomButton from "@/components/intelligentOilfield/bottom-button/index.vue";
import dataTransfer from "@/components/intelligentOilfield/data-transfer/index.vue";

export default {
  dicts: ["sys_app_type"],
  components: {
    // circularPanel,
    bottomButton,
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
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openDialog: false,
      headerNameList: [
        { id: 0, name: "已选看板", isSelected: true },
        { id: 1, name: "未选看板", isSelected: false }
      ],
      linkUrl: "",
      activeName: "professionalKanban",
      selectedList: [],
      allList: [],
      lists: [],
      carouselList: []
    };
  },
  watch: {
    newWPx: {
      handler() {},
      deep: true,
      immediate: true
    },
    "componentItem.contentSetting": {
      handler(newVal) {
        if (newVal) {
          this.openDialog = newVal;
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
  methods: {
    imgError(item) {
      item.img = new URL("../../../../assets/intelligentOilfield/bgImg.png", import.meta.url).href;
    },
    toClick(url) {
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", url);
      a.click();
      a.remove();
    },
    // 改变数据
    // eslint-disable-next-line
    changeData(selectedList, currentItem) {
    },
    // eslint-disable-next-line
    changeSource(item) {
    },
    submitForm() {
      this.openDialog = false;
      this.$emit("change-content-setting", false);
    },
    cancel() {
      // 将数据置为初始状态
      this.openDialog = false;
      this.$emit("change-content-setting", false);
    },
    linkIframe(item) {
      this.linkUrl = item.url;
      this.$nextTick(() => {
        this.fullScreen();
      });
    },
    fullExit() {
      this.linkUrl = "";
      this.$store.commit("user/setProjectionMode", false);
      // var element= document.documentElement;//若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById("fullScreen_panorama");
      // IE ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
        // 写退出全屏后的执行函数
      } else if (element.requestFullScreen) {
        document.exitFullscreen();
        // 写退出全屏后的执行函数
      } else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
        // 写退出全屏后的执行函数
      } else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
        // 写退出全屏后的执行函数
      } else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
        // 写退出全屏后的执行函数
      }
    },
    fullScreen() {
      // var element= document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById("fullScreen_panorama");
      // IE 10及以下ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
        // 写全屏后的执行函数
      } else if (element.requestFXullScreen) {
        element.requestFullScreen();
        // 写全屏后的执行函数
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        // 写全屏后的执行函数
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        // 写全屏后的执行函数
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        // 写全屏后的执行函数
      }
    },
    carousel() {
      for (let i = 0; i < this.lists.length;) {
        this.carouselList.push(this.lists.slice(i, (i += 15)));
      }
    }
  }
};
</script>

<style scoped lang="less">
.bottomBtn {
  position: absolute;
  bottom: 0;
}

.textSpan {
  font-size: 12px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  color: #909399;
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
}
</style>