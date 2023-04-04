<template>
  <menu-list
    :show-app-search="false"
    :app-id="$route.params.id"
  />
</template>
<script>

import MenuList from "@/pages/intelligentOilfield/menuManagement/index.vue";

export default {
  components: {
    MenuList
  }
};
</script>