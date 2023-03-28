<!-- svg线路网络图 -->
<template>
  <div class="svg-border-view" :style="{left: positionLeft}">
    <div class="svg-container">
      <svg :width="svgWidth" :height="svgHeight" style="background: ;">
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--lightBlueColor)" />
          <stop offset="100%" stop-color="red" />
        </linearGradient>
        <polyline :points="setPoints" style="fill: transparent; stroke-width: 6" :style="{stroke: $store.state.setting.mode==='dark'?'var(--opacityBlueBg)':'rgba(0,96,166,0.3)'}"/>
        <polyline
          :points="setPoints"
          style="
            fill: transparent;
            stroke-dasharray: 0, 20;
            stroke: url(#linear);
            stroke-linecap: round;
            stroke-width: 5;
          "
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // svg宽
    svgWidth: {
      type: String,
      default: '380px',
    },
    // svg高
    svgHeight: {
      type: String,
      default: '60px',
    },
    // 点位
    setPoints: {
      type: String,
      default: '0,20 40,20 40,60',
    },
    positionLeft: {
      type: String,
      default: '140px',
    }
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.svg-border-view {
  position: absolute;
  left: 0px;
  top: 0px;
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
