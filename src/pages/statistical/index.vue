<!-- 统计样例 -->
<template>
  <div class="g-w100 g-h100">
    <grid-layout :layout="layout" company-name="yourCompany3" />
  </div>
</template>

<script>

import gridLayout from "@/components/intelligentOilfield/grid-layout/index.vue";

export default {
  components: {
    gridLayout
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 5, h: 11, i: "0", name: "系统访问情况" }
        // { x: 5, y: 0, w: 4, h: 11, i: "1", name: "XX组件" },
        // { x: 0, y: 11, w: 9, h: 9, i: "2", name: "XX组件" },
        // { x: 9, y: 0, w: 3, h: 11, i: "3", name: "XX组件" },
        // { x: 9, y: 11, w: 3, h: 9, i: "4", name: "XX组件" }
      ]
    };
  },
  methods: {}
};
</script>