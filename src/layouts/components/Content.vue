<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="aliveViews">
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
        console.log(this.isRefreshing,999)
      console.log(this.tabRouterList?.filter(route => route.isAlive).map(route => route.name),888)
      return this.tabRouterList?.filter(route => route.isAlive).map(route => route.name);
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