<template>
  <div>
    <img lazy style="width: 100%; height: 600px" :src="url" />
  </div>
</template>

<script>
import img from "@/pages/rem/performance/wellGroup/groupAssistance/img/小层顶面结构图.webp";

export default {
  data() {
    return {
      url: img,
    };
  },
};
</script>

<style></style>
