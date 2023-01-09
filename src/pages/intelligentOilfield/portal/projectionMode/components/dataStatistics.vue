<!-- 数据统计组件 -->
<template>
  <div style="font-size: 20px;" class="g-w100 g-h100">
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="数据统计">
        <div style="padding:20px">重要指标</div>
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';

export default {
  components: {
    infoWindow,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
