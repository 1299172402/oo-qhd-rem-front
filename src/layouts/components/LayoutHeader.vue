<template>
  <common-header
    v-if="showHeader"
    :show-logo="showHeaderLogo"
    :theme="mode"
    :layout="setting.layout"
    :is-fixed="setting.isHeaderFixed"
    :menu="headerMenu"
    :is-compact="setting.isSidebarCompact"
    :max-level="setting.splitMenu ? 1 : 3"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import CommonHeader from "./Header.vue";

import { SettingType } from "@/interface";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";

export default Vue.extend({
  name: "LayoutHeader",
  components: {
    CommonHeader
  },
  computed: {
    ...mapGetters({
      showHeader: "setting/showHeader",
      showHeaderLogo: "setting/showHeaderLogo",
      mode: "setting/mode",
      menuRouters: "permission/routers"
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    headerMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      const { menuRouters } = this;
      if (layout === "mix") {
        if (splitMenu) {
          return menuRouters.map(menu => ({
            ...menu,
            children: []
          }));
        }
        return [];
      }
      return menuRouters.filter(v => !v.appId || v.appId === proxy[env].appId);
    }
  }
});
</script>