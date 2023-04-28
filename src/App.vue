<template>
  <router-view v-if="isRouterAlive" :class="[mode]" />
</template>

<script>
import Vue from "vue";
import config from "@/config/style";
import refreshTokenMixin from "@/components/mixins/RefreshTokenMixin.js";
import { TOKEN_NAME, USER_NAME } from "@/config/global";
import proxy from "@/config/host.ts";

const env = import.meta.env.MODE;

export default Vue.extend({
  mixins: [refreshTokenMixin],
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      refreshTokenData: {
        USER_NAME,
        TOKEN_NAME,
        env,
        proxy
      }
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