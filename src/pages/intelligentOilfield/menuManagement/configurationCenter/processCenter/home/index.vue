<!-- 后台——流程平台首页 -->
<template>
  <!-- 租户查询  -->
  <tenant v-if="processTenantType === 'tenant'" />
  <!-- 应用查询 -->
  <apply v-else />
</template>
<script>
import proxy from "@/config/host";

import Apply from "./apply.vue";
import Tenant from "./tenant.vue";

const env = import.meta.env.MODE;

export default {
  name: "ProcessCenterHome",
  components: {
    Apply,
    Tenant
  },
  data() {
    return {
    };
  },
  computed: {
    processTenantType() {
      return proxy[env].PROCESS_TENANT_TYPE;
    }
  }
};
</script>

<style lang="less" scoped>
</style>