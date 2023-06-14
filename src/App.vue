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
    const firstLoading = document.querySelector("#first-loading");
    if (firstLoading) {
      // 如果本身是iframe，那么就立即关闭动画
      if (window.top !== window) {
        firstLoading.remove();
      } else if (!window.location.href.includes("appIframeView")) {
        // 如果本身不是iframe，且当前页面不是“appIframeView”页面，则在1.5s后关闭动画
        setTimeout(() => {
          firstLoading.remove();
        }, 1500);
      }
    }
    this.$store.dispatch("setting/changeTheme", { ...config });
    window.addEventListener("message",
      event => {
        if (event.data?.type === "iframeLoaded") {
          const firstLoading = document.querySelector("#first-loading");
          if (firstLoading) {
            setTimeout(() => {
              firstLoading.remove();
            }, 500);
          }
        }
        if (event.data?.type === "changeTheme") {
          this.$store.dispatch("setting/changeTheme", { mode: event.data.mode });
        }
      }, false
    );
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