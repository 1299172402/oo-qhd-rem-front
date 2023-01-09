<!-- 门户——办公模式 -->
<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="220"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[20, 20]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        <!-- <div style="padding: 10px 0 0 10px" v-if="item.i != 2"> {{ item.i }}</div> -->
        <component :is="getContent(item.i)" />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import myToDoList from './components/myToDoList.vue';
import individualCenter from '../projectionMode/components/individualCenter.vue';
import applicationCenter from './components/applicationCenter.vue';
import kanbanCenter from './components/kanbanCenter.vue';
import alarmInformation from './components/alarmInformation.vue';
import quickEntry from './components/quickEntry.vue';

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    myToDoList,
  },

  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 3, h: 0.2, i: '0' },
        { x: 3, y: 0, w: 1, h: 1.2, i: '1' },
        { x: 0, y: 2, w: 3, h: 1.58, i: '2' },
        { x: 3, y: 2, w: 1, h: 1.3, i: '3' },
        { x: 0, y: 3, w: 3, h: 2.3, i: '4' },
        { x: 3, y: 4, w: 1, h: 1.3, i: '5' },
        { x: 3, y: 5, w: 1, h: 1.3, i: '6' },
      ],
      tempLayOut: [],
    };
  },
  methods: {
    getContent(i) {
      switch (i) {
      case '0': // 跑马灯
        return;
      case '1':
        return individualCenter;
      case '2':
        return myToDoList;
      case '3':
        return applicationCenter;
      case '4':
        return alarmInformation;
      case '5':
        return quickEntry;
      case '6':
        return kanbanCenter;
      default:
        break;
      }
    },
    sureLayOut() {
      this.layout = [];
      this.tempLayOut.forEach((el) => {
        this.layout.push({
          x: el.x,
          y: el.y,
          w: el.w,
          h: el.h,
          i: el.i,
        });
      });
      //   console.log('结果: ', this.layout);
    },
    layoutUpdatedEvent(newLayout) {
      this.tempLayOut = newLayout;
    },
  },
};
</script>

<style scoped>
/* 当前页面该组件样式 */
/deep/ .el-button--primary {
  /* background-color: green !important; */
}
/* 类名为myInput的样式 */
.myInput >>> .el-input__inner {
  width: 100px !important;
}
</style>
