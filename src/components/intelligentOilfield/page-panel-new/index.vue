<<<<<<< HEAD
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
    <div style="padding: 0 20px 20px;height: 100%;" class="g-w100" :style="{height: showBtn ? 'calc(100%  - 32px)' : '100%', padding: showBtn ? '0 20px 20px 20px' : '20px'}">
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
      this.$emit("zoom-out-com", this.isMax);
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
  position: fixed;
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
=======
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
    <div style="padding: 0 20px 20px;height: 100%;" class="g-w100" :style="{height: showBtn ? 'calc(100%  - 32px)' : '100%', padding: showBtn ? '0 20px 20px 20px' : '20px'}">
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
      this.$emit("zoom-out-com", this.isMax);
      this.isMax = !this.isMax;
    }
  }
};
</script>
<style scoped>
.divBox {
  background-image: var(--logo-bg) !important;
  background-size: unset !important;
  background-repeat: no-repeat !important;
  background-position: right top !important;
}

.maxPage {
  position: fixed;
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
>>>>>>> kjSystem
</style>