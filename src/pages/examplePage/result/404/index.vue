<template>
  <result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <t-button @click="logoutPage">
      返回登录页
    </t-button>
  </result>
</template>

<script>
import result from "@/components/intelligentOilfield/result/index.vue";

export default {
  name: "Result404",
  components: { result },
  methods: {
    logoutPage() {
      this.$router.replace({ path: "/" });
      this.$store.dispatch("user/logout");
      this.$store.dispatch("permission/restore");
    }
  }
};
</script>