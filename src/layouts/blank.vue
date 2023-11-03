<template>
  <div class="myWrapper">
    <keep-alive :include="aliveViews">
      <router-view :key="$route.path + 'ThirdLevelView'" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThirdLevelView",
  computed: {
    ...mapGetters({
      tabRouterList: "tabRouter/tabRouterList"
    }),
    aliveViews() {
      return this.tabRouterList?.filter(route => route.isAlive).map(route => route.name) || [];
    }
  }
};
</script>

<style lang="less" scoped>
.myWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>