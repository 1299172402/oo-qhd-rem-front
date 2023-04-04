<template lang="">
  <role-list :show-app-search="false" :app-id="$route.params.id" />
</template>
<script>
import RoleList from "@/pages/intelligentOilfield/rolesManagement/index.vue";

export default {
  components: {
    RoleList
  }
};
</script>