<template>
  <div class="normal-card" :style="{ width: width, height: height }">
    <div class="normal-card__top">
      <div class="angle">
        <svg height="20" width="20">
          <defs>
            <linearGradient
              id="linearGradient_top_content"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style="stop-color: rgb(0, 72, 122); stop-opacity: 0.16"
              />
              <stop
                offset="100%"
                style="stop-color: rgba(0, 72, 122); stop-opacity: 0.184"
              />
            </linearGradient>
          </defs>
          <polygon
            points="0,20 20,20 20,0"
            fill="url(#linearGradient_top_content)"
          ></polygon>
          <line
            x1="0"
            y1="20"
            x2="20"
            y2="0"
            stroke="rgb(116, 190, 243)"
            stroke-opacity="0.5"
          ></line>
        </svg>
      </div>
      <div class="normal">
        <div v-if="title">{{ title }}</div>
      </div>
      <div class="expand" :class="{ title: title }">
        <div v-if="title"></div>
      </div>
    </div>
    <div class="normal-card__content"></div>
    <div class="normal-card__bottom">
      <div class="normal"></div>
      <div class="angle">
        <svg height="20" width="20">
          <defs>
            <linearGradient
              id="linearGradient_bottom_content"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style="stop-color: rgb(0, 68, 115); stop-opacity: 0.615"
              />
              <stop
                offset="100%"
                style="stop-color: rgb(0, 68, 115); stop-opacity: 0.639"
              />
            </linearGradient>
          </defs>
          <polygon
            points="0,20 0,0 20,0"
            fill="url(#linearGradient_bottom_content)"
          ></polygon>
          <line
            x1="0"
            y1="20"
            x2="20"
            y2="0"
            stroke="rgb(0, 180, 255)"
            stroke-opacity="1"
          ></line>
        </svg>
      </div>
    </div>
    <div v-if="$slots.header" class="headTools">
      <slot name="header"></slot>
    </div>
    <div class="normal-card__inline" :class="{ title: title }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalCard",
  props: {
    title: String,
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "auto",
    },
  },
};
</script>

<style lang="scss" scoped>
$angle-size: 20px;
$expand-size: 12px;
.normal-card {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // padding-bottom: 20px;
  .normal-card__top,
  .normal-card__bottom {
    position: absolute;
    top: 0;
    width: 100%;
    height: $angle-size;
    display: flex;
  }
  .normal-card__bottom {
    top: initial;
    bottom: 0;
  }
  .angle,
  .normal {
    height: 100%;
    box-sizing: border-box;
  }
  .normal-card__top .normal {
    border-top: 1px solid rgba(116, 190, 243, 0.5);
    border-right: 1px solid rgba(116, 190, 243, 0.5);
    background-image: linear-gradient(
      to bottom,
      rgba(0, 72, 122, 0.16),
      rgba(0, 72, 122, 0.184)
    );
    div {
      height: 100%;
      background-image: linear-gradient(
        to right,
        rgba(#0096ff, 0),
        rgba(#00caff, 0.68)
      );
      box-sizing: border-box;
      font-size: 14px;
      line-height: calc(#{$angle-size} + #{$expand-size});
      color: #24deff;
    }
  }
  .normal-card__bottom .normal {
    border-bottom: 1px solid rgba(0, 180, 255, 1);
    border-left: 1px solid rgba(0, 180, 255, 1);
    background-image: linear-gradient(
      to bottom,
      rgba(0, 68, 115, 0.615),
      rgba(0, 68, 115, 0.639)
    );
  }
  .normal-card__top .expand {
    position: absolute;
    width: 100%;
    top: $angle-size;
    left: 0;
    height: $expand-size;
    box-sizing: border-box;
    div {
      width: calc(100% - #{$angle-size});
      margin-left: calc(#{$angle-size} - 1px);
      height: 100%;
      background-image: linear-gradient(
        to right,
        rgba(#0096ff, 0),
        rgba(#00caff, 0.78)
      );
      box-sizing: border-box;
    }
    &.title {
      border-bottom: 1px solid rgba(#00b4ff, 0.6);
    }
  }
  .angle {
    width: $angle-size;
  }
  .normal {
    width: calc(100% - #{$angle-size});
  }
  .normal-card__content {
    position: absolute;
    width: 100%;
    top: 20px;
    height: calc(100% - 2 * #{$angle-size});
    background-image: linear-gradient(
      to bottom,
      rgba(0, 72, 122, 0.184),
      rgba(0, 68, 115, 0.615)
    );
    border-left: 1px solid;
    border-right: 1px solid;
    border-image-source: linear-gradient(
      to bottom,
      rgba(116, 190, 243, 0.5),
      rgba(0, 180, 255, 1)
    );
    border-image-slice: 1;
    box-sizing: border-box;
  }
  .normal-card__inline {
    // position: absolute;
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    // top: 0;
    // left: 0;
    // padding: $expand-size;
    padding: 20px;
    padding-bottom: 12px;
    box-sizing: border-box;
    overflow: hidden;
    &.title {
      padding-top: calc(#{$angle-size} + 2 *#{$expand-size});
    }
  }
  .headTools{
    position: absolute;
    top: 0;
    left: 30px;
    right: 0;
    z-index: 99;
    height: 32px;
  }
}
</style>
