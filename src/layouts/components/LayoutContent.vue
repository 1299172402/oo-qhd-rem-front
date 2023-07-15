<template>
  <t-layout :class="[`${prefix}-layout`]">
    <t-tabs
      v-if="isUseTabsRouter && !$store.getters['user/isGroupLogin'] && !isInIframe"
      theme="card"
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
      @change="handleChangeCurrentTab"
    >
      <t-tab-panel
        v-for="(route, idx) in tabRouterList"
        :key="`${route.path}_${idx}`"
        :value="route.path"
        :removable="!route.isHome"
        @remove="() => handleRemove(route.path, idx)"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :min-column-width="128"
            :popup-props="{
              overlayClassName: 'route-tabs-dropdown',
              onVisibleChange: (visible, ctx) => handleTabMenuClick(visible, ctx, route.path),
              visible: activeTabPath === route.path,
            }"
          >
            <template v-if="!route.isHome">
              <el-tooltip :content="route.title+(route.query?.pathName?'-'+route.query?.pathName:'')">
                <div style="max-width: 400px;text-overflow: ellipsis;overflow: hidden;white-space: pre">
                  {{ route.title+(route.query?.pathName?'-'+route.query?.pathName:'') }}
                </div>
              </el-tooltip>
            </template>
            <home-icon v-else />
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="() => handleRefresh(route.path, idx)">
                  <refresh-icon />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item v-if="idx > 0" @click="() => handleCloseAhead(route.path, idx)">
                  <arrow-left-icon />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="idx < tabRouterList.length - 1"
                  @click="() => handleCloseBehind(route.path, idx)"
                >
                  <arrow-right-icon />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item @click="() => handleCloseOther(route.path, idx)">
                  <close-circle-icon />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <layout-breadcrumb v-if="setting.showBreadcrumb" />
      <common-content />
    </t-content>
    <!-- 组件样例和组件样例2不做footer展示 -->
    <t-footer v-if="showFooter && $router.currentRoute.path !== '/DevelopmentManagement/DemoIndex' && $router.currentRoute.path !== '/DevelopmentManagement/DemoIndex2'" :class="`${prefix}-footer-layout`">
      <layout-footer v-if="!$store.getters['user/isGroupLogin']" />
    </t-footer>
  </t-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { RefreshIcon, ArrowLeftIcon, ArrowRightIcon, HomeIcon, CloseCircleIcon } from "tdesign-icons-vue";

import CommonContent from "./Content.vue";
import LayoutBreadcrumb from "./Breadcrumb.vue";
import LayoutFooter from "./Footer.vue";

import { prefix } from "@/config/global";
import { SettingType } from "@/interface";

export default Vue.extend({
  name: "LayoutContent",
  components: {
    CommonContent,
    LayoutFooter,
    LayoutBreadcrumb,
    RefreshIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
    CloseCircleIcon
  },
  data() {
    return {
      prefix,
      activeTabPath: ""
    };
  },
  computed: {
    ...mapGetters({
      showFooter: "setting/showFooter",
      mode: "setting/mode",
      isUseTabsRouter: "setting/isUseTabsRouter",
      menuRouters: "permission/routers",
      tabRouterList: "tabRouter/tabRouterList"
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    isGroupLogin():boolean {
      return localStorage.getItem("isGroupLogin") === "true";
    },
    isInIframe: function() {
      return window.self !== window.top;
    }
  },
  methods: {
    handleRemove(path: string, routeIdx: number) {
      const nextRouter = this.tabRouterList[routeIdx + 1] || this.tabRouterList[routeIdx - 1];

      this.$store.commit("tabRouter/subtractCurrentTabRouter", { path, routeIdx });
      if (path === this.$router.history?.current?.path) {
        // url带query参数
        const tabRouterItem = this.tabRouterList.find(item => item.path === nextRouter.path) || nextRouter.path;
        this.$router.push({ path: nextRouter.path, query: tabRouterItem.query || {}});
      }
    },
    handleChangeCurrentTab(path: string) {
      const tabRouterItem = this.tabRouterList.find(item => item.path === path) || { path };
      this.$router.push({ path: tabRouterItem.path, query: tabRouterItem.query || {}});
    },
    handleRefresh(currentPath: string, routeIdx: number) {
      this.$store.commit("tabRouter/toggleTabRouterAlive", routeIdx);
      this.$nextTick(() => {
        this.$store.commit("tabRouter/toggleTabRouterAlive", routeIdx);
        this.$router.replace({ path: currentPath, query: { ...this.$route.query }});
      });
      this.activeTabPath = null;
    },
    handleCloseAhead(path: string, routeIdx: number) {
      this.$store.commit("tabRouter/subtractTabRouterAhead", { path, routeIdx });
      this.handleOperationEffect("ahead", routeIdx);
    },
    handleCloseBehind(path: string, routeIdx: number) {
      this.$store.commit("tabRouter/subtractTabRouterBehind", { path, routeIdx });
      this.handleOperationEffect("behind", routeIdx);
    },
    handleCloseOther(path: string, routeIdx: number) {
      this.$store.commit("tabRouter/subtractTabRouterOther", { path, routeIdx });
      this.handleOperationEffect("other", routeIdx);
    },
    handleOperationEffect(type: "other" | "ahead" | "behind", routeIndex: number) {
      const currentPath = this.$router.history?.current?.path;
      const tabRouters = this.tabRouterList;
      const currentIdx = tabRouters.findIndex((i: { path: string }) => i.path === currentPath);
      // 存在三种情况需要刷新当前路由
      // 点击非当前路由的关闭其他、点击非当前路由的关闭左侧且当前路由小于触发路由、点击非当前路由的关闭右侧且当前路由大于触发路由
      const needRefreshRouter =
        (type === "other" && currentIdx !== routeIndex) ||
        (type === "ahead" && currentIdx < routeIndex) ||
        (type === "behind" && currentIdx === -1);
      if (needRefreshRouter) {
        // 解决右键home图标关闭其他标签问题
        let nextRouteIdx;
        switch (type) {
          case "behind":
            nextRouteIdx = tabRouters.length - 1;
            break;
          case "other":
            nextRouteIdx = this.tabRouterList.length - 1;
            break;
          case "ahead":
            nextRouteIdx = 1;
            break;
          default:
            nextRouteIdx = tabRouters.length - 1;
            break;
        }
        // const nextRouteIdx = type === 'behind' ? tabRouters.length - 1 : type === 'other' ? 0 : 1;
        const nextRouter = this.tabRouterList[nextRouteIdx];
        // url带query参数
        const tabRouterItem = this.tabRouterList.find(item => item.path === nextRouter.path) || nextRouter.path;
        this.$router.push({ path: nextRouter.path, query: tabRouterItem.query || {}});
      }

      this.activeTabPath = null;
    },
    handleTabMenuClick(visible: boolean, ctx, path: string) {
      if (ctx?.trigger === "document") this.activeTabPath = null;
      if (visible) this.activeTabPath = path;
    }
  }
});
</script>