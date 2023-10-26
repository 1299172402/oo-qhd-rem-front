<!-- layout栅格布局：20行12列 -->
<template>
  <div>
    <div v-show="isOperation" class="g-w100 g-h100 boxOpacity" />
    <div v-show="isOperation" class="topHeaderBtn">
      <el-button type="primary" :disabled="isDisableReset" @click="resetItem">
        重置
      </el-button>
      <el-button type="primary" @click="saveItem">
        保存
      </el-button>
      <el-button class="commonBtn" @click="cancelItem">
        取消
      </el-button>
    </div>
    <grid-layout
      :class="$store.getters['user/getIsMax'] ? 'fullWindow' : 'smallWindow'"
      :style="{ position: $store.getters['user/getIsMax'] ? 'absolute' : 'relative' }"
      :layout.sync="currentLayout"
      :col-num="colNum"
      :row-height="singleHeight"
      :max-row="3"
      :margin="[10, 10]"
      :is-draggable="isOperation"
      :is-resizable="isOperation"
      :is-mirrored="false"
      :vertical-compact="true"
      :auto-size="false"
      :use-css-transforms="true"
      :responsive="false"
      @layout-updated="layoutUpdatedEvent"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item
        v-for="item in currentLayout"
        :key="item.i"
        :ref="'grid' + item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :style="{
          display:
            currentOpertTitle === ''
              ? 'block'
              : item.name === currentOpertTitle && $store.getters['user/getIsMax']
                ? 'block'
                : !$store.getters['user/getIsMax']
                  ? 'block'
                  : 'none',
        }"
        drag-allow-from=".vue-draggable-handle"
        drag-ignore-from=".no-drag"
        @resized="resizedEvent"
      >
        <div v-show="isOperation" class="g-w100 g-h100 bb">
          <svg-icon
            v-show="isOperation"
            icon-class="dark-operate"
            style="position: absolute;bottom: 0; right: 0; opacity: 1; fill: green; font-size: 22px;"
          />
        </div>
        <div style="position: relative;z-index: 1;">
          <div class="operateBtn g-row-flex">
            <i v-show="isOperation" class="el-icon-rank vue-draggable-handle" style="margin: 0 0 0 10px;" />
          </div>
        </div>
        <component :is="getContent(item.name)" :current-resize-list="currentResizeList" class="no-drag" />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import demoIndex from "@/pages/intelligentOilfield/demo/demo.vue";
import demoIndex2 from "@/pages/intelligentOilfield/demo/demo2.vue";
import systemAccess from "@/pages/statistical/components/systemAccess.vue";
import { queryByPageName, savePage } from "@/api/intelligentOilfield/system/layout";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    // 公司名称
    companyName: {
      type: String,
      default: ""
    },
    // 当前显示面板布局
    layout: {
      type: Array,
      default: () => []
    },
    // 20行
    rowNum: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      currentOpertTitle: "", // 当前操作放大缩小title的name，让其显示隐藏
      isDisableReset: true, // 重置是否被禁用，当接口有重置面板数据时方可点击重置按钮
      pageName: "", // 唯一标识
      currentLayout: JSON.parse(JSON.stringify(this.layout)), // 当前显示面板布局
      colNum: 12, // 12列
      interfaceDataStore: [], // 用于取消，上一次存储，
      initLayOut: [], // 模板面板存储
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
        newWPx: 0
      }
    };
  },
  watch: {
    layout: {
      handler(newVal) {
        this.currentLayout = newVal;
        this.getWidthHeight();
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // 拼接唯一标识id，通过“公司名称_路由name”
    this.pageName = `${this.companyName}_${this.$router.app?.$route?.name}`;
    const tenantId = this.$store.getters["user/tenantId"];
    queryByPageName(this.pageName, tenantId).then(res => {
      if (res ? res.data.code === 200 : false) {
        if (!res.data.data || !res.data.data.pageInfo) { // 首次获取面板赋值
          this.initLayout();
        } else { // 非首次，面板从接口获取
          const currentLayout = JSON.parse(res.data.data.pageInfo); // 当前显示面板
          if (this.isSameSimpleArray(currentLayout.map(v => v.name), this.layout.map(v => v.name))) {
            this.currentLayout = currentLayout;
            this.initLayOut = JSON.parse(res.data.data?.initialPageInfo); // 默认面板【重置用】
            this.isDisableReset = !this.initLayOut;
            this.interfaceDataStore = JSON.parse(res.data.data?.pageInfo); // 用户存储上次编辑的面板【取消用】
          } else {
            this.initLayout();
          }
        }
      }
    });
  },
  beforeDestroy() {
    // 注册的总线事件要在组件销毁时卸载，否则会多次挂载，造成触发一次但多个响应的情况
    this.$bus.$off("emitBus");
    this.$bus.$off("zoomOut");
  },
  mounted() {
    this.$bus.$on("emitBus", () => {
      // 监听是否编辑面板
      this.isOperation = true;
    });
    this.$bus.$on("zoomOut", val => {
      // 监听是放大缩小面板
      this.currentOpertTitle = val;
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
      const queryParamsNew = {
        userId: this.$store.getters["user/userDetail"].user.userId,
        pageInfo: JSON.stringify(this.currentLayout), // 页面json
        pageName: this.pageName,
        tenantId: this.$store.getters["user/tenantId"]
      };
      savePage(queryParamsNew).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.isOperation = false;
          this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout));
        }
      });
    },
    getWidthHeight() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.currentLayout.forEach(item => {
            item.height = this.$refs[`grid${item.i}`][0].$el.offsetHeight;
            item.width = this.$refs[`grid${item.i}`][0].$el.offsetWidth;
          });
        });
      }, 300);
    },
    computeNum() {
      this.screenWidth = document.body.clientWidth * window.devicePixelRatio;
      this.screenHeight = document.body.clientHeight * window.devicePixelRatio;
      this.singleHeight = (this.screenHeight - this.heightFromBottom) / this.rowNum; // 一份元素的高度
    },
    // 重置元素
    resetItem() {
      this.$confirm("是否将面板重置模板设定？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 面板重置并保存
        // 请将默认面板拷贝给后端，否则重置后的数据可能为空
        this.currentLayout = JSON.parse(JSON.stringify(this.initLayOut));
        this.getWidthHeight();
        const queryParamsNew = {
          userId: this.$store.getters["user/userDetail"].user.userId,
          pageInfo: JSON.stringify(this.initLayOut), // 页面json
          pageName: this.pageName
        };
        savePage(queryParamsNew).then(res => {
          if (res ? res.data.code === 200 : false) {
            this.isOperation = false;
          }
        });
      }).catch(() => { });
    },
    // 取消元素
    cancelItem() {
      this.$confirm("是否取消当前所有操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 面板取消逻辑
        this.currentLayout = JSON.parse(JSON.stringify(this.interfaceDataStore));
        this.getWidthHeight();
        this.$bus.$emit("cancelPanel");
        // 关闭编辑窗体
        this.isOperation = false;
      }).catch(() => { });
    },
    getContent(i) {
      switch (i) {
        case "示例组件":
          return demoIndex;
        case "示例组件2":
          return demoIndex2;
        // 增加所需要引入子组件
        case "系统访问情况":
          return systemAccess;
        default:
          break;
      }
    },
    layoutUpdatedEvent(newLayout) {
      this.tempLayOut = newLayout;
    },
    layoutReadyEvent() {
    },

    resizedEvent(i, newH, newW, newHPx, newWPx) {
    //   console.log(`RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`);
      this.currentResizeList = { i, newH, newW, newHPx, newWPx };
      this.currentLayout.find(item => item.i === i).height = newHPx;
      this.currentLayout.find(item => item.i === i).width = newWPx;
    },
    /**
     * 初始化面板，使用传入的参数 layout
     */
    initLayout: function() {
      this.currentLayout = this.layout;
      this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout)); // 用户存储上次编辑的面板【取消用】
      this.isDisableReset = true;
    },
    /**
     * 判断两个简单数组的元素是否相同
     * 需要个数相同并且值相同
     */
    isSameSimpleArray: function(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
.vue-grid-layout {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.fullWindow >>> .vue-grid-item {
  /* 最大化 */
  width: 100vw !important;
  height: 100vh !important;
  transform: translate3d(0, 0, 0) !important;
  z-index: 999;
  position: relative;
}

.smallWindow >>> .vue-grid-item {
  /* 最小化 */
  width: auto;
}

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
  left: 50%;
  transform: translate(-50%);
}
</style>