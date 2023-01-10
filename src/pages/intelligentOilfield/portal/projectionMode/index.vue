<!-- 门户——投影模式 -->
<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="3"
      :row-height="220"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @resized="resizedEvent">
        <!-- <div style="padding: 10px 0 0 10px" v-if="item.i != 2"> {{ item.i }}</div> -->
        <component :is="getContent(item.i)"  :height="item.height" />
      </grid-item>
    </grid-layout>
  </div>
    
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import dataStatistics from './components/dataStatistics.vue';
import individualCenter from './components/individualCenter.vue';
import applicationCenter from './components/applicationCenter.vue';
import kanbanCenter from './components/kanbanCenter.vue';
import videoAnalysisSystem from './components/videoAnalysisSystem.vue';


export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    dataStatistics,
  },

  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 1, i: '0' ,height:''},
        { x: 2, y: 0, w: 1, h: 0.6, i: '1',height:'' },
        { x: 0, y: 2, w: 2, h: 3, i: '2' ,height:''},
        { x: 2, y: 2, w: 1, h: 1, i: '3',height:'' },
        { x: 2, y: 2, w: 1, h: 1.7, i: '4',height:'381' },
      ],
      tempLayOut: [],

    };
  },
  methods: {
    getContent(i) {
      switch (i) {
      case '0':
        return dataStatistics;
      case '1':
        return individualCenter;
      case '2':
        return videoAnalysisSystem;
      case '3':
        return kanbanCenter;
      case '4':
        return applicationCenter;
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
    layoutReadyEvent(newLayout){
      console.log("Ready layout: ", newLayout)
    },

    resizedEvent(i, newH, newW, newHPx, newWPx){
      console.log(`RESIZED i=${  i  }, H=${  newH  }, W=${  newW  }, H(px)=${  newHPx  }, W(px)=${  newWPx}`);
      this.layout[i].height = newHPx
    }
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
<style>
/* .vue-grid-item.vue-grid-placeholder {
  background: red !important;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.vue-grid-item.vue-grid-placeholder {
  background: green !important;
}
.container .vue-grid-item.vue-grid-placeholder {
  background: green;
} */
.vue-grid-item {
  /* background: rgba(71, 135, 240, 0.3) !important; */
}
</style>
