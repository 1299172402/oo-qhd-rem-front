<template>
    <section
      v-loading="loading"
      :class="{'form-section__view-only': isView}"
      :element-loading-text="loadingText"
      class="form-section"
    >
      <el-card class="box-margin" :class="{'form-view-hide-star': isView, 'form-section__main': true, 'no-border': !border}">
        <div class="form-section__content">
          <slot />
        </div>
        <el-row v-if="!isView || $slots.btn" class="submit-btns-box">
          <div class="border-top">
            <el-button v-if="cancelText" icon="el-icon-close" @click="handleCancel" class="cancelBtn">
              {{ cancelText }}
            </el-button>
            <slot name="btn" />
            <template v-if="!isView">
              <el-button
                v-if="saveText"
                icon="el-icon-check"
                type="primary"
                @click="$emit('save', 'save')"
              >
                {{ saveText }}
              </el-button>
              <el-button v-if="submitText && action !== 'AuditEdit'" type="primary" @click="$emit('submit', 'submit')">
                {{ submitText }}
              </el-button>
            </template>
          </div>
        </el-row>
      </el-card>
    </section>
  </template>
<script>
  
export default {
  name: "FormSection",
  props: {
    action: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    saveText: {
      type: String,
      default: "保存"
    },
    submitText: {
      type: String,
      default: "提交"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loadingText: "玩命加载中请稍等...."
    };
  },
  computed: {
    isView() {
      return this.action === "View";
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
      if (window.opener) {
        window.close();
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
  <style scoped lang="less">
  .submit-btns-box {
    margin-top: 20px;
  }
  
  .border-top {
    border-top: 1px solid #E9E9E9;
    display: flex;
    // flex: 1;
    flex-wrap: nowrap;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 0 0;
  }
  
  .form-section__view-only {
    ::v-deep .el-form-item__label::before {
      display: none;
    }
  
    ::v-deep .form-table.el-table .el-form-item {
      &.is-required {
        padding-left: 0;
  
        &::before {
          display: none;
        }
      }
  
      span.view-item {
        margin-left: 0;
        margin-top: 0;
        padding: 0 15px;
      }
    }
  
    ::v-deep th div.table-columns-required::before {
      display: none;
    }
  }
  
  .form-section > .el-card ::v-deep .el-card__body {
    padding: 20px;
  }
  
  .form-section__main {
    overflow: auto;
  }
  
  ::v-deep .el-card.box-margin {
    &.no-border {
      border: none;
    }
  
    .form-view-hide-star {
      margin: 0;
    }
  }
  
  .form-section {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  </style>