<template>
  <side-nav
    v-if="showSidebar&&!$store.getters['user/isGroupLogin']"
    :show-logo="showSidebarLogo"
    :layout="setting.layout"
    :is-fixed="setting.isSidebarFixed"
    :menu="sideMenu"
    :theme="mode"
    :is-compact="setting.isSidebarCompact"
    :max-level="setting.splitMenu ? 2 : 3"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import SideNav from "./SideNav.vue";

import { SettingType } from "@/interface";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";

export default Vue.extend({
  name: "LayoutSidebar",
  components: {
    SideNav
  },
  computed: {
    ...mapGetters({
      showSidebar: "setting/showSidebar",
      showSidebarLogo: "setting/showSidebarLogo",
      mode: "setting/mode",
      menuRouters: "permission/routers"
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    isGroupLogin():boolean {
      return localStorage.getItem("isGroupLogin") === "true";
    },
    sideMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      let { menuRouters } = this;
      menuRouters.forEach(el => {
        el.children?.forEach(element => {
          element.children?.forEach(item => {
            // 给三级菜单的最后一项添加属性isThirdRouter
            // 或者给第几级路由加属性，参照https://blog.csdn.net/weixin_44283432/article/details/127553666
            this.$set(item, "isThirdRouter", true);
          });
        });
      });
      if (layout === "mix" && splitMenu) {
        menuRouters.forEach(menu => {
          if (this.$route.path.indexOf(menu.path) === 0) {
            menuRouters = menu.children.map(subMenu => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return menuRouters.filter(v => !v.appId || v.appId === proxy[env].appId);
    }
  }
});
</script>
<style lang="less" scoped></style>