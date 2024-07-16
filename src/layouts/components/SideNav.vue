<template>
  <div :class="sideNavCls">
    <t-menu
      width="232px"
      :class="menuCls"
      :theme="theme"
      :value="active"
      :collapsed="collapsed"
      :expanded.sync="expanded"
      :expand-type="showLogo ? 'popup' : 'normal'"
    >
      <template #logo>
        <span v-if="showLogo" :class="`${prefix}-side-nav-logo-wrapper`">
          <!-- <component :is="getLogo" :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`" /> -->
          <!-- 最好是logo+文字的svg！！！！，样式文件index.less -->
          <component :is="getLogo" :class="`${prefix}-side-nav-logo-t-logo`" />
          <!-- <myLogo :class="`${prefix}-side-nav-logo-t-logo`"></myLogo> -->
        </span>
        <span
          v-if="!collapsed && showLogo"
          style="font-size: 16px;"
          :style="{ color: formData.mode == 'light' ? '#000' : '#fff' }"
        >智能油田管理系统</span>
      </template>
      <menu-search v-if="!isCompact" style="margin-bottom: 10px;" />
      <menu-content :nav-data="menu" />
      <template #operations />
    </t-menu>
    <div :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { prefix } from "@/config/global";
import { ClassName } from "@/interface";
import myLogo from "@/assets/logo.svg";
// import LogoFull from '@/assets/assets-logo-full.svg';

import MenuContent from "./MenuContent.vue";
import pgk from "../../../package.json";
import routeHighLight from "@/utils/routerMapping/routeHighLight.js";
import MenuSearch from "./MenuSearch.vue";

const MIN_POINT = 992 - 1;

export default Vue.extend({
  name: "SideNav",
  components: {
    MenuContent,
    MenuSearch
  },
  props: {
    menu: Array,
    showLogo: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: true
    },
    layout: String,
    headerHeight: {
      type: String,
      default: "64px"
    },
    theme: {
      type: String,
      default: "light"
    },
    isCompact: {
      type: Boolean,
      default: false
    },
    maxLevel: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      prefix,
      pgk,
      formData: this.$store.state.setting,
      expanded: []
    };
  },
  computed: {
    iconName(): string {
      return this.$store.state.setting.isSidebarCompact ? "menu-fold" : "menu-unfold";
    },
    collapsed(): boolean {
      return this.$store.state.setting.isSidebarCompact;
    },
    sideNavCls(): Array<ClassName> {
      return [
        `${this.prefix}-sidebar-layout`,
        {
          [`${this.prefix}-sidebar-compact`]: this.isCompact
        }
      ];
    },
    menuCls(): Array<ClassName> {
      return [
        `${this.prefix}-side-nav`,
        {
          [`${this.prefix}-side-nav-no-logo`]: !this.showLogo,
          [`${this.prefix}-side-nav-no-fixed`]: !this.isFixed,
          [`${this.prefix}-side-nav-mix-fixed`]: this.layout === "mix" && this.isFixed
        }
      ];
    },
    layoutCls(): Array<ClassName> {
      return [`${this.prefix}-side-nav-${this.layout}`, `${this.prefix}-sidebar-layout`];
    },
    active(): string {
      if (!this.$route.path) {
        return "";
      }
      let path = this.$route.path;
      if (routeHighLight[this.$route.name]) {
        path = this.$router.resolve({ name: routeHighLight[this.$route.name] })?.route?.path || path;
      }
      return path
        .split("/")
        .filter((_item: string, index: number) => index <= this.maxLevel && index > 0)
        .map((item: string) => `/${item}`)
        .join("");
    },
    getLogo() {
      //   if (this.collapsed) {
      return myLogo;
      //   }
      //   return LogoFull;
    }
  },
  watch: {
    active: {
      handler(val) {
        if (!val) return;
        const parts = val.split("/").filter(Boolean).slice(0, -1);
        const expandedSet = new Set();
        parts.reduce((prev, curr) => {
          const path = `${prev}/${curr}`;
          expandedSet.add(path);
          return path;
        }, "");
        this.expanded = Array.from(new Set([...this.expanded, ...expandedSet]));
      }
    }
  },
  mounted() {
    this.autoCollapsed();

    window.onresize = () => {
      this.autoCollapsed();
    };
  },
  methods: {
    changeCollapsed(): void {
      this.$store.commit("setting/toggleSidebarCompact");
    },
    autoCollapsed(): void {
      const isCompact = window.innerWidth <= MIN_POINT;
      this.$store.commit("setting/showSidebarCompact", isCompact);
    },
    handleNav(url: string) {
      this.$router.push(url);
    }
  }
});
</script>