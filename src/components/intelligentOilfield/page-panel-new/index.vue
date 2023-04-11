<!-- 新的页面通用面板 -->
<template>
  <div
    class="panelBox"
    :class="isMax ? 'maxPage' : 'minPage'"
    :style="{background: $store.state.setting.mode === 'dark' ? isMax ? '#032a3b !important' : 'transparent' : '#FFFFFF'}"
  >
    <div
      v-if="showBtn"
      class="divBox"
      style="width: 100%;text-align: right"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :content="isMax ? '最小化' : '最大化'"
        placement="bottom"
      >
        <svg-icon
          :icon-class="isMax?'no-expand':'expand'"
          class="panelIconClass"
          @clickIcon="maximizeCom"
        />
      </el-tooltip>
    </div>
    <div style="padding: 20px;height: calc(100%);" class="g-w100" :style="{height: isMax ? 'calc(100%  - 31px)' : '100%'}">
      <slot />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    headerTitle: {
      type: String,
      default: "默认header"
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMax: false
    };
  },
  methods: {
    maximizeCom() {
      this.isMax = !this.isMax;
    }
  }
};
</script>
<style scoped>
.divBox {
  background-image: var(--logo-bg) !important;
  background-size: 100% 100% !important;
}

.maxPage {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  margin: 0;
}

.minPage {
  position: relative;
  margin: 20px 0 0;
}

.panelIconClass {
  width: 16px !important;
  height: 17px !important;
  cursor: pointer;
  color: #fff;
  margin-right: 10px;
  margin-top: 10px;
  fill: currentcolor;
}
</style>