<template>
  <div v-loading="myLoading" class="form-model">
    <div :class="['form-model__container', isAudit ? 'form-model__container--audit' : '', onlyOne ? '' : 'form-model__container--tabs' ]">
      <slot name="signature">
        <div id="signatureContainer" />
      </slot>
      <!-- onlyOne表示没有分页 -->
      <child :is-half-layout="isHalfLayout">
        <template v-for="slotName of Object.keys($slots || {})" #[slotName]>
          <slot :name="slotName" />
        </template>
      </child>
      <template v-if="!isAudit && !hiddenFooter">
        <div class="form-model__footer">
          <el-button v-if="!(btnHidden && btnHidden.includes('cancel'))" @click="$emit('cancel')">
            {{ footerBtnTitle.cancel }}
          </el-button>
          <el-button v-if="!viewOnly && !change && !(btnHidden && btnHidden.includes('save'))" :type="noAudit?'primary':''" @click="$emit('save', 'save')">
            {{ footerBtnTitle.save }}
          </el-button>
          <el-button v-if="!viewOnly && !noAudit && !(btnHidden && btnHidden.includes('submit'))" type="primary" @click="$emit('submit', 'submit')">
            {{ footerBtnTitle.submit }}
          </el-button>
          <slot v-if="!hiddenFooter" name="footer" />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Child from "./Child.vue";

export default {
  name: "FormModel",
  components: { Child },
  props: {
    title: {
      type: String,
      default: ""
    },
    change: {
      // 控制修改状态底部按钮渲染
      type: Boolean,
      default: false
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isAudit: {
      type: Boolean,
      default: false
    },
    noAudit: {
      type: Boolean,
      default: false
    },
    isHalfLayout: {
      type: Boolean,
      default: false
    },
    onlyOne: {
      type: Boolean,
      default: true
    },
    btnHidden: {
      type: Array,
      default: () => []
    },
    tabs: {
      type: Array,
      default: () => [
        {
          isHalfLayout: true,
          tab: "未定义"
        },
        {
          isHalfLayout: false,
          tab: "未定义"
        }
      ]
    },
    tabsValue: {
      type: String,
      default: "0"
    },
    btnTitle: {
      type: Object,
      default: () => ({
        cancel: "取消",
        save: "保存",
        submit: "提交"
      })
    },
    tip: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    /**
         *获取按钮名称
         */
    footerBtnTitle() {
      return this.getFooterBtnTitle(this.btnTitle);
    },
    myLoading: {
      get() {
        return this.loading;
      },
      set(val) {
        this.$emit("update:loading", val);
      }
    },
    /**
         * 控制tab切换的值
         */
    tabsModel: {
      get() {
        return this.tabsValue;
      },
      set(val) {
        this.$emit("update:tabsValue", val);
        this.$emit("changeTab", val);
      }
    },
    hiddenFooter() {
      return this.$route.query.hiddenFooter === "1";
    }
  },
  methods: {
    /**
         *获取按钮名称
         */
    getFooterBtnTitle(btnTitle) {
      return {
        cancel: btnTitle && btnTitle.cancel || "取消",
        save: btnTitle && btnTitle.save || "保存",
        submit: btnTitle && btnTitle.submit || "提交"
      };
    }
  }
};
</script>
<style scoped lang="less">
@title-height: 26.5px;
@content-padding: 16px;

.form-model {
  height: 100%;
}

.form-model__container {
  position: relative;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 52px;
  padding-top: 10px;

  .form-model__tabs {
    height: calc(100% - @content-padding * 2 + 5px);
  }

  /deep/ .form-model__content {
    overflow-y: auto;
    padding: @content-padding;
    padding-bottom: 0;
    height: 100%;
  }

  /deep/ .form-model__content-half {
    display: flex;
    position: relative;
    padding: @content-padding;
    padding-bottom: 0;
    height: 100%;

    .form-model__content-left {
      width: 50%;
      margin-right: 29px;
      padding-right: 27px;
      border-right: 1px dashed #b2b2b2;
      overflow-y: auto;
      position: relative;
    }

    .form-model__content-right {
      width: 46%;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
  }

  .form-model__footer {
    bottom: 0;
    display: flex;
    position: absolute;
    right: 0;
    left: 0;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    justify-content: flex-end;

    button + button {
      margin-left: 10px;
    }
  }
}

.form-model__container--tabs {
  padding-bottom: 0;
  padding-top: 0;

  .form-model__content,
  .form-model__content-half {
    height: 100%;
    padding-bottom: 52px;
  }
}
</style>