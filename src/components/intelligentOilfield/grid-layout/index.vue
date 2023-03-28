<!-- layout栅格布局：20行12列 -->
<template>
  <div>
    <div class="g-w100 g-h100 boxOpacity" v-show="isOperation"></div>
    <div class="topHeaderBtn" v-show="isOperation">
      <el-button type="primary" @click="resetItem" :disabled="isDisableReset">重置</el-button>
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
        :ref="'grid' + item.i"
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
          <i v-show="isOperation" class="el-icon-rank vue-draggable-handle" style="margin:0 0 0 10px"></i>
          </div>
        </div>
        <component :currentResizeList="currentResizeList" :is="getContent(item.name)" class="no-drag" />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import demoIndex from '@/pages/intelligentOilfield/demo/demo.vue'
import {queryByPageName,savePage} from '@/api/intelligentOilfield/system/layout'


export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    // 公司名称
    companyName: {
      type: String,
      default: '',
    },
    // 当前显示面板布局
    layout: {
      type: Array,
      default: () => [],
    },
    // 20行
    rowNum: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      isDisableReset: true, // 重置是否被禁用，当接口有重置面板数据时方可点击重置按钮
      pageName: '', // 唯一标识
      currentLayout: JSON.parse(JSON.stringify(this.layout)), // 当前显示面板布局
      colNum: 12, // 12列
      interfaceDataStore: [], // 用于取消，上一次存储，
      initLayOut: [],// 模板面板存储
      isOperation: false, // 是否可拖拽和移动
      singleHeight: (document.body.clientHeight - this.heightFromBottom) / this.rowNum, // 单个行高
      screenWidth: document.body.clientWidth, // 屏幕宽度
      screenHeight: document.body.clientHeight, // 屏幕高度
      heightFromBottom: 350, // 距离底部高度
      currentResizeList: { // 拖拽缩放组件集合
        i: 0,
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
        this.getWidthHeight();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // 拼接唯一标识id，通过“公司名称_路由name”
    this.pageName = `${this.companyName}_${this.$router.app?.$route?.name}`
    queryByPageName(this.pageName).then((res) => {
      if (res ? res.data.code === 200 : false) {
        console.log('查询结果===', res);
        if(res.data.data===null||res.data.data?.pageInfo === null) { // 首次获取面板赋值
          this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout)) // 用户存储上次编辑的面板【取消用】
          this.isDisableReset = true;
          console.log('无数据', this.currentLayout);
        } else { // 非首次，面板从接口获取
          this.currentLayout = [];
          this.currentLayout = JSON.parse(res.data.data?.pageInfo) // 当前显示面板
          this.initLayOut = JSON.parse(res.data.data?.initialPageInfo) // 默认面板【重置用】
          this.isDisableReset = !this.initLayOut;
          this.interfaceDataStore = JSON.parse(res.data.data?.pageInfo) // 用户存储上次编辑的面板【取消用】
          console.log('有数据', this.currentLayout);
        }
      }
    });
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
    this.computeNum();
    window.onresize = () =>
      (() => {
        // 监听页面宽高变化
        this.computeNum();
      })();
  },
  methods: {
    // 保存元素
    saveItem() {
      const queryParamsNew= {
        userId: this.$store.getters['user/userDetail'].user.userId,
        pageInfo: JSON.stringify(this.currentLayout), // 页面json
        pageName: this.pageName,
      }
      savePage(queryParamsNew).then((res) => {
        if (res ? res.data.code === 200 : false) {
          this.isOperation = false;
          this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout))
        }
      });
    },
    getWidthHeight() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.currentLayout.forEach(item => {
            item.height = this.$refs[`grid${item.i}`][0].$el.offsetHeight;
            item.width = this.$refs[`grid${item.i}`][0].$el.offsetWidth;
          })
        })
      }, 300)
    },
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
        // 请将默认面板拷贝给后端，否则重置后的数据可能为空
        this.currentLayout = JSON.parse(JSON.stringify(this.initLayOut));
        this.getWidthHeight();
        const queryParamsNew= {
          userId: this.$store.getters['user/userDetail'].user.userId,
          pageInfo: JSON.stringify(this.initLayOut), // 页面json
          pageName: this.pageName
        }
        savePage(queryParamsNew).then((res) => {
          if (res ? res.data.code === 200 : false) {
            this.isOperation = false;
          }
        });
      }).catch((e)=>{console.log(e);});
    },
    // 取消元素
    cancelItem() {
      this.$confirm('是否取消当前所有操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 面板取消逻辑
        this.currentLayout = JSON.parse(JSON.stringify(this.interfaceDataStore));
        this.getWidthHeight();
        // 关闭编辑窗体
        this.isOperation = false;
      }).catch((e)=>{console.log(e);});
    },
    getContent(i) {
      switch (i) {
      case '示例组件':
        return demoIndex;
        // 增加所需要引入子组件
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
    //   console.log(`RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`);
      this.currentResizeList = { i, newH, newW, newHPx, newWPx }
      this.currentLayout.find(item => item.i === i).height = newHPx;
      this.currentLayout.find(item => item.i === i).width = newWPx;
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