<!-- 拖拽页面-样例 -->
<template>
  <div class="g-w100 g-h100">
    <el-tabs v-model="activeName" class="g-pageHeader">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    </el-tabs>
    <gridLayout :layout="layout" v-if="activeName==='first'"></gridLayout>
    <gridLayout :layout="layout1" v-else></gridLayout>

  </div>
</template>

<script>

import gridLayout from '@/components/intelligentOilfield/grid-layout/index.vue'

export default {
  components: {
    gridLayout,
  },
  data() {
    return {
      activeName: 'first',
      layout: [
        { x: 0, y: 0, w: 9, h: 8, i: '0',name: '示例组件'},
        { x: 9, y: 0, w: 3, h: 6, i: '1',name: 'XX组件'},
        { x: 0, y: 8, w: 9, h: 12, i:'2',name: 'XX组件'},
        { x: 9, y: 8, w: 3, h: 6, i: '3',name: 'XX组件'},
        { x: 9, y: 14, w: 3, h: 8, i: '4',name: 'XX组件'},
      ],
      layout1: [
        { x: 0, y: 0, w: 6, h: 10, i: '0',name: '示例组件'},
        { x: 6, y: 0, w: 6, h: 10, i: '1',name: 'XX组件'},
      ],
    }
  },
  methods: {},
};
</script>