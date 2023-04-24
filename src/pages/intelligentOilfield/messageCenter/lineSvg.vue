<!-- svg线路网络图 -->
<template>
  <div class="svg-border-view" :style="{left: positionLeft}" @click="clickLine">
    <div class="svg-container">
      <svg :width="svgWidth" :height="svgHeight">
        <linearGradient
          :id="linearId"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" :stop-color="startColor" />
          <stop offset="100%" :stop-color="endColor" />
        </linearGradient>
        <polyline
          :points="setPoints"
          style="fill: transparent;"
          :style="{stroke: $store.state.setting.mode === 'dark'? 'var(--opacity-blue-bg)' : 'rgba(0,96,166,0.3)', strokeWidth: divStrokeWidth}"
        />
        <polyline
          :points="setPoints"
          :style="{strokeWidth: ballStrokeWidth, stroke: `url(#${linearId})`}"
          style="
            fill: transparent;
            stroke-dasharray: 0, 20;
            stroke-linecap: round;
          "
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 线段唯一id，为了区分不同段的颜色
    linearId: {
      type: String,
      default: "linear"
    },
    // 开始的颜色
    startColor: {
      type: String,
      default: "var(--light-blue-color)"
    },
    // 结束的颜色
    endColor: {
      type: String,
      default: "red"
    },
    // 外侧div宽度
    divStrokeWidth: {
      type: String,
      default: "6"
    },
    // 里面小圆球大小
    ballStrokeWidth: {
      type: String,
      default: "5"
    },
    // svg宽
    svgWidth: {
      type: String,
      default: "380px"
    },
    // svg高
    svgHeight: {
      type: String,
      default: "60px"
    },
    // 点位
    setPoints: {
      type: String,
      default: "0,20 40,20 40,60"
    },
    positionLeft: {
      type: String,
      default: "140px"
    }
  },
  data() {
    return {};
  },
  methods: {
    clickLine() {
      this.$emit("click-line");
    }
  }
};
</script>

<style scoped>
.svg-border-view {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.svg-container {
  position: relative;
}

.svg-container svg {
  position: absolute;
}

.svg-container polyline {
  animation: dash 5000s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -200000;
  }
}
</style>