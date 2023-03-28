<template>
  <div>
    <el-button
      v-if="label"
      v-bind="btn"
      :icon="btnIcon"
      :type="btnType"
      plain
      @click="visible = true; $emit('open')"
    >
      {{ label }}
    </el-button>
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :show-close="showClose"
      :visible.sync="visible"
      v-bind="$attrs"
      :title="dialogTitle"
      :top="(bodyScroll || height === '1') ? '80px' : '15vh'"
      :class="{'common-dialog__body--scroll': bodyScroll, 'fix-height': height === '1', 'common-dialog': true, 'view-only': viewOnly}"
      v-on="$listeners"
    >
      <div v-loading="loading">
        <slot />
      </div>
      <span v-if="!noFooter" slot="footer" class="dialog-footer">
        <slot name="footer" />
        <el-button
          v-if="!viewOnly"
          :loading="loading"
          type="primary"
          @click="$emit('ok')"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "CommonDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: "详情"
    },
    label: {
      type: String,
      default: "打开弹窗"
    },
    btn: {
      type: Object,
      default: () => ({
        type: "primary"
      })
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 当弹窗内容过多时传 true，会让弹窗垂直居中，并且内容部分显示滚动条
    bodyScroll: {
      type: Boolean,
      default: false
    },
    // 0 表示自由高度，1 表示固定最大高度
    height: {
      type: String,
      default: "0"
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: ""
    },
    btnIcon: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
<style scoped lang="less">
.common-dialog {
  @max-height: calc(100vh - 300px);
  @max-height--view: calc(100vh - 200px);

  /deep/ .el-dialog__body {
    overflow-y: auto;

    > div {
      height: 100%;
      overflow-y: auto;
    }
  }

  /deep/ .is-fullscreen {
    .el-dialog__body {
      height: calc(100% - 135px);
    }
  }

  &.common-dialog__body--scroll {
    /deep/ .el-dialog__body {
      max-height: @max-height;
    }

    &.view-only /deep/ .el-dialog__body {
      max-height: @max-height--view;
    }
  }

  &.fix-height {
    /* stylelint-disable-next-line no-descending-specificity */
    /deep/ .el-dialog__body {
      height: @max-height;
    }

    &.view-only /deep/ .el-dialog__body {
      height: @max-height--view;
    }
  }

  &.view-only {
    /deep/ .el-dialog__footer {
      padding: 0;
    }
  }
}
</style>