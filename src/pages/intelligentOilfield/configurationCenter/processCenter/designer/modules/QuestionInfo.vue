<template>
  <span class="question-info">
    <el-tooltip popper-class="tooltip-width-auto" effect="dark" placement="right">
      <i class="cursor--pointer el-icon-question" />
      <div
        slot="content"
        style="white-space: pre-line;"
        :style="{ width: helperData[tip].width + 'px' }"
        :class="helperData[tip].moreUrl ? 'more-con' : ''"
      >
        {{ helperData[tip].content }}
        <span v-if="helperData[tip].moreUrl">
          <el-button type="text" class="more-info" @click="handToPage(helperData[tip].moreUrl)"> 更多信息 </el-button>
        </span>
      </div>
    </el-tooltip>
    {{ label }}
  </span>
</template>
<script>
import { helperData } from "./helper";

export default {
  name: "QuestionInfo",
  props: {
    label: {
      type: String,
      default: undefined
    },
    tip: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      helperData
    };
  },
  methods: {
    /**
     * 路由跳转
     * @params 路由name
     */
    handToPage(moreUrl) {
      window.open(moreUrl, "_blank");
    }
  }
};
</script>
<style scoped lang="less">
.question-info {
  position: relative;
  z-index: 999;
}

.more-con {
  position: relative;
  padding: 0 0 30px;
  box-sizing: border-box;

  .more-info {
    position: absolute;
    right: 0;
    bottom: -10px;
  }
}
</style>