<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="[...aliveViews,'ThirdLevelView']">
      <router-view v-if="!isRefreshing" :key="$route.path" />
    </keep-alive>
  </transition>
</template>
<script lang="ts">
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      tabRouterList: "tabRouter/tabRouterList",
      isRefreshing: "tabRouter/isRefreshing",
      isUseTabsRouter: "setting/isUseTabsRouter"
    }),
    aliveViews() {
      const list = this.tabRouterList?.filter(route => route.isAlive).map(route => route.name) || [];
      list.push("ThirdLevelView");
      return list;
    }
  }
};
</script>
<style lang="less" scoped>
@import "@/style/variables";

.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>