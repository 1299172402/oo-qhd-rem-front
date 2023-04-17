<template>
  <router-view v-if="isRouterAlive" :class="[mode]" />
</template>

<script>
import Vue from "vue";
import config from "@/config/style";

export default Vue.extend({
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  computed: {
    mode() {
      return this.$store.getters["setting/mode"];
    }
  },
  mounted() {
    
    this.$store.dispatch("setting/changeTheme", { ...config });
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
});
</script>