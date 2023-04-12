<!-- 页面通用面板 -->
<template>
  <div
    class="g-w100 panelBox"
    :class="isMax ? 'maxPage' : 'minPage'"
    :style="{background: $store.state.setting.mode === 'dark' ? isMax ? '#032a3b !important' : 'transparent' : '#FFFFFF'}"
  >
    <div class="headerStyle g-row-flex-V">
      <div style="width: 70%;">
        {{ headerTitle }}
      </div>
      <div v-if="showBtn" style="width: 30%;text-align: right">
        <el-tooltip
          class="item"
          effect="dark"
          :content="isMax ? '最小化' : '最大化'"
          placement="bottom"
        >
          <svg-icon
            :icon-class="isMax?'no-expand-white':'expand-white'"
            class="panelIconClass"
            @clickIcon="maximizeCom"
          />
        </el-tooltip>
      </div>
    </div>
    <div style="padding: 20px;height: calc(100% - 32px)" class="g-w100">
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
.maxPage {
  position: fixed;
  z-index: 999 !important;
  top: 0 !important;
  left: 0 !important;
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
  margin-right: 20px;
  fill: currentcolor

}
</style>