<!-- layout栅格布局：20行12列 -->
<template>
  <div>
    <div class="g-w100 g-h100 boxOpacity" v-show="isOperation"></div>
    <div class="topHeaderBtn" v-show="isOperation">
      <el-button type="primary" @click="resetItem">重置</el-button>
      <el-button type="primary" @click="saveItem">保存</el-button>
      <el-button class="commonBtn" @click="cancelItem">取消</el-button>
    </div>
    <grid-layout
      :layout.sync="currentLayout"
      :col-num="colNum"
      :row-height="singleHeight"
      :max-row="3"
      :margin="[10, 10]"
      :is-draggable="isOperation"
      :is-resizable="isOperation"
      :is-mirrored="false"
      :vertical-compact="true"
      :autoSize="false"
      :verticalCompact="true"
      :use-css-transforms="true"
      :responsive="false"
      @layout-updated="layoutUpdatedEvent"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item
        v-for="item in currentLayout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        drag-allow-from=".vue-draggable-handle"
        drag-ignore-from=".no-drag"
        @resized="resizedEvent"
      >
        <div class="g-w100 g-h100 bb" v-show="isOperation">
          <svg-icon
            v-show="isOperation"
            icon-class="dark-operate"
            style="position: absolute;bottom: 0px; right: 0; opacity: 1; fill: green; font-size: 22px"
          ></svg-icon>
        </div>
        <div style="position: relative;z-index: 1;" >
            <div class="operateBtn g-row-flex">
          <i v-show="isOperation" class="el-icon-rank vue-draggable-handle" :style="{margin: item.isVisConSet?'0 10px': '0 0 0 10px'}"></i>
          </div>
        </div>
        <component :operate="operate" :currentResizeList="currentResizeList" :newWPx="newWPx" :is="getContent(item.name)" :componentItem="item" class="no-drag" @changeContentSetting="changeContentSetting(arguments,item)"  />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import demoIndex from '@/pages/intelligentOilfield/demo/demo.vue'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    layout: {
      type: Array,
      default: () => [],
    },
    // 20行
    rowNum: {
      type: Number,
      default: 20,
    },
    // 门户类型
    portalType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panelType: '',
      currentLayout: this.layout,
      colNum: 12, // 12列
      index: 0,
      interfaceDataStore: [], // 接口面板数据存储
      initLayOut: [],// 模板面板存储
      isOperation: false, // 是否可拖拽和移动
      singleHeight: (document.body.clientHeight - this.heightFromBottom) / this.rowNum,
      screenWidth: document.body.clientWidth, // 屏幕宽度
      screenHeight: document.body.clientHeight, // 屏幕高度
      heightFromBottom: 290,
      newWPx: 0, // 拖动盒子的宽度
      operate: '', // 当前点击的操作,主要区分取消和重置
      currentResizeList: {
        i:0,
        newH: 0,
        newW: 0,
        newHPx: 0,
        newWPx: 0,
      },
    };
  },
  watch: {
    layout: {
      handler(newVal) {
        this.currentLayout = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    // 注册的总线事件要在组件销毁时卸载，否则会多次挂载，造成触发一次但多个响应的情况
    this.$bus.$off('emitBus');
  },
  mounted() {
    this.$bus.$on('emitBus', () => {
      // 监听是否编辑面板
      this.isOperation = true;
    });
    this.index = this.currentLayout.length;
    this.computeNum();
    window.onresize = () =>
      (() => {
        // 监听页面宽高变化
        this.computeNum();
      })();
  },
  methods: {
    computeNum() {
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      this.singleHeight = (this.screenHeight - this.heightFromBottom) / this.rowNum; // 一份元素的高度
    },
    // 重置元素
    resetItem() {
      this.$confirm('是否将面板重置模板设定？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 面板重置并保存
        // this.currentLayout = JSON.parse(JSON.stringify(this.initLayOut));
        // this.saveItem();
        // 内容重置为默认
        this.operate = '重置'
      }).catch((e)=>{console.log(e);});
    },
    submitForm() {
      const storeItem = this.initLayOut.find((item)=>item.name === this.panelType)
      this.currentLayout.push({
        x: storeItem.x,
        y: storeItem.y, // puts it at the bottom
        w: storeItem.w,
        h: storeItem.h,
        i: this.index,
        content: 'newPanel',
        name: this.panelType,
        contentSetting: false,
        isVisConSet: true
      });
      // Increment the counter to ensure key is always unique.
      this.index += 1;
      this.cancel();
    },
    cancel() {
      this.panelType = '';
    },
    saveItem() {
    // 保存元素
      this.isOperation = false;
    },
    // 取消元素
    cancelItem() {
      this.$confirm('是否取消当前所有操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 面板重置
        // this.currentLayout = JSON.parse(JSON.stringify(this.interfaceDataStore));
        // 关闭编辑窗体
        this.isOperation = false;
        this.operate = '取消'
      }).catch((e)=>{console.log(e);});
    },
    changeContentSetting(val,item) {
      // eslint-disable-next-line prefer-destructuring
      item.contentSetting = val[0];
    },
    getContent(i) {
      switch (i) {
      case '示例组件':
        return demoIndex;
      default:
        break;
      }
    },
    layoutUpdatedEvent(newLayout) {
      this.tempLayOut = newLayout;
    },
    layoutReadyEvent(newLayout) {
      console.log('Ready layout: ', newLayout);
    },

    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log(`RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`);
      this.currentLayout[i].height = newHPx;
      this.newWPx = newWPx;
      this.currentResizeList = {i,newH,newW,newHPx,newWPx}
    },
  },
};
</script>

<style scoped>
.aa {
  position: absolute;
  left: 0;
  top: 0;
  color: aliceblue;
}
.bb {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  border: 3px solid rgba(0, 222, 240, 1);
  pointer-events: auto !important;
  z-index: 1;
}
.operateBtn {
  position: absolute;
  top: 10px;
  color: rgba(0, 222, 240, 1);
  cursor: pointer;
  font-size: 22px;
  right: 20px;
}
.boxOpacity {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
}
.topHeaderBtn {
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 800px;
}
</style>