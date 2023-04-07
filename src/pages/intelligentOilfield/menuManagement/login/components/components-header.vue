<template>
  <header class="login-header">
    <logo-full-icon class="logo" />
    <div class="operations-container">
      <t-button
        theme="default"
        shape="square"
        variant="text"
        @click="toggleSettingPanel"
      >
        <setting-icon class="icon" />
      </t-button>
    </div>
  </header>
</template>

<script>
import LogoFullIcon from "@/assets/assets-logo-full.svg";
import { SettingIcon } from "tdesign-icons-vue";

export default {
  components: { LogoFullIcon, SettingIcon },
  methods: {
    toggleSettingPanel() {
      this.$store.commit("setting/toggleSettingPanel", true);
    }
  }
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";

.login-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  color: var(--td-text-color-primary);

  .logo {
    width: 188px;
    height: 64px;
  }

  .operations-container {
    display: flex;
    align-items: center;

    .t-button {
      margin-left: 16px;
    }

    .icon {
      height: 20px;
      width: 20px;
      padding: 6px;
      box-sizing: content-box;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>