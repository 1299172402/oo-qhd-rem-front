<template>
  <div class="myWrapper">
    <keep-alive :include="aliveViews">
      <router-view v-if="$route.name === myKidName && !isRefreshing" :key="$route.path + 'ThirdLevelView'" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThirdLevelView",
  data() {
    return {
      myKidName: null
    };
  },
  computed: {
    ...mapGetters({
      tabRouterList: "tabRouter/tabRouterList",
      isRefreshing: "tabRouter/isRefreshing"
    }),
    aliveViews() {
      return this.tabRouterList?.filter(route => route.isAlive).map(route => route.name) || [];
    }
  },
  mounted() {
    this.myKidName = this.$route.name;
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