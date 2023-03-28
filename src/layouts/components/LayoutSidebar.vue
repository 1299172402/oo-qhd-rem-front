<template>
  <side-nav
    v-if="showSidebar&&!$store.getters['user/isGroupLogin']"
    :showLogo="showSidebarLogo"
    :layout="setting.layout"
    :isFixed="setting.isSidebarFixed"
    :menu="sideMenu"
    :theme="mode"
    :isCompact="setting.isSidebarCompact"
    :maxLevel="setting.splitMenu ? 2 : 3"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import SideNav from './SideNav.vue';

import { SettingType } from '@/interface';

export default Vue.extend({
  name: 'LayoutSidebar',
  components: {
    SideNav,
  },
  computed: {
    ...mapGetters({
      showSidebar: 'setting/showSidebar',
      showSidebarLogo: 'setting/showSidebarLogo',
      mode: 'setting/mode',
      menuRouters: 'permission/routers',
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    isGroupLogin():boolean {
      return sessionStorage.getItem('isGroupLogin')==='true'
    },
    sideMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      let { menuRouters } = this;
      menuRouters.forEach(el => {
        el.children?.forEach(element => {
          element.children?.forEach(item => {
            // 给三级菜单的最后一项添加属性isThirdRouter
            // 或者给第几级路由加属性，参照https://blog.csdn.net/weixin_44283432/article/details/127553666
            this.$set(item, "isThirdRouter", true)
          });
        });
      });
      if (layout === 'mix' && splitMenu) {
        menuRouters.forEach((menu) => {
          if (this.$route.path.indexOf(menu.path) === 0) {
            menuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return menuRouters;
    },
  },
});
</script>
<style lang="less" scoped></style>
