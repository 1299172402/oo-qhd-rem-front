<!--自定义info信息窗-->
<template>
  <div :style="{width: infoWidth,height:infoHeight,boxShadow: $store.state.setting.mode==='dark'?'': '0px 0px 10px 0px rgba(144,147,153,0.3)'}" class="g-w100" :class="isFull? 'maxPage':'minPage'">
    <div class="g-w100 g-h100" style="background: white; position: absolute;z-index: -1" :style="{background: $store.state.setting.mode==='dark'?'rgba(3, 21, 39, 1)':'#fff'}" />
    <!-- TODO: Maybe change back -->
    <!-- <div class="infoHeader g-row-flex-V" :style="{background: $store.state.setting.mode==='dark'?'linear-gradient(to right, rgba(0, 202, 255, 0.4), var(--opacity-blue-bg2))':'linear-gradient(to right, var(--only-light-blue-color), rgba(0, 96, 166, 0.2))',color:$store.state.setting.mode==='dark'?'var(--light-blue-color)':'var(--white-color)'}"> -->
    <div class="infoHeader g-row-flex-V infoHeaderBg" style="color: var(--light-blue-color)">
      <div style="width: 100%" :style="{color: headerStyle.color}">
        {{ headerTitle }}
      </div>
      <el-tooltip
        class="item"
        effect="dark"
        :content="isFull?'最小化':'最大化'"
        placement="bottom"
      >
        <svg-icon
          v-if="isShowMaxBtn"
          :icon-class="$store.state.setting.mode==='dark' ? isFull?'no-expand':'expand' : 'expand-white'"
          class="panelIconClass"
          @clickIcon="maximizeCom"
        />
      </el-tooltip>
      <!-- <div class="titleStyle"> -->
      <slot name="titleContent" />
      <!-- </div> -->
    </div>
    <div class="infoBody" :class="$store.state.setting.mode==='dark'?'infoBody-dark':'infoBody'" :style="{background: $store.state.setting.mode==='dark'?'var(--opacity-blue-bg2)':'var(--white-color)'}">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 是否展示最大化最小化按钮
    isShowMaxBtn: {
      type: Boolean,
      default: false
    },
    // 窗体整体宽度
    infoWidth: {
      type: String,
      default: "680px"
    },
    // 窗体整体高度
    infoHeight: {
      type: String,
      default: "400px"
    },
    // header内容
    headerTitle: {
      type: String,
      default: "生产对象"
    },
    // header样式
    headerStyle: {
      type: Object,
      default: () => ({
        color: "",
        fontSize: "",
        fontWeight: ""
      })
    }
  },
  data() {
    return {
      isFull: false // 当时是否是最大化
    };
  },
  methods: {
    maximizeCom() {
      this.isFull = !this.isFull;
      this.$emit("maximizeCom", this.isFull);
      this.$emit("carouselCom");
      this.$store.commit("user/SETISMAX", !this.$store.getters["user/getIsMax"]);
      this.$bus.$emit("zoomOut", this.headerTitle);
    }
  }
};
</script>
<style scoped>
.panelIconClass {
  width: 16px !important;
  height: 17px !important;
  cursor: pointer;
  color: #fff;
  margin-right: 20px;
}

.infoHeader {
  /* height: 32px;
    line-height: 32px; */
  height: 40px;
  line-height: 40px;
  padding-left: 20px;

  /* border: 1px solid var(--light-blue-color); */
  display: flex;
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;

  /* border: 1px solid #ddd; */
  border-image: linear-gradient(to left, rgba(116, 190, 243, 0), rgba(0, 180, 255, 0.6)) 1 1;
}

.infoBody {
  height: calc(100% - 40px);
  font-size: 16px;

  /* TODO: Maybe change back */

  /* border-bottom: 1px solid var(--light-blue-color);
    border-left: 1px solid var(--light-blue-color);
    border-right: 1px solid var(--light-blue-color); */
  border: 1px solid transparent;
  border-top-color: #ddd;

  /* TODO: Maybe change back */

  /* border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--only-light-blue-color)) 1 1; */
}

.infoBody-dark {
  height: calc(100% - 40px);
  font-size: 16px;
  border: 1px solid #ddd;
  border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
}

.titleStyle {
  font-size: 14px;
  color: white;
  margin-left: 10px;
  width: 83%;
}

.maxPage {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

.minPage {
  position: relative;
}
</style>