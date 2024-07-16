<template>
  <!-- 如果考虑编辑和查看公用一个页面，可使用改组件实现区分显示效果 -->
  <el-form-item
    v-if="visible"
    :ref="myProp"
    :rules="myRules"
    :required="needRequired"
    :prop="myProp"
    :name="myProp"
    v-bind="$attrs"
    :class="{'enroll-item': true, 'enroll-item-view': !canEdit, 'form-layout--edit': canEdit, 'form-disable--bgc-gray': !canEdit , 'label-colon': needColon}"
  >
    <template #label>
      <slot name="label" />
    </template>
    <slot v-if="canEdit || alwaysShow" />
    <template v-else>
      <span v-if="(myViewValue || myViewValue === 0) && !customView" :class="viewClass" class="view-item">
        <template v-if="format">{{ myViewValue | moment(format) }}</template>
        <template v-else-if="isMoney">{{ (myViewValue || viewValue) | money }}</template>
        <template v-else>{{ myViewValue }}</template>
      </span>
      <slot name="view" />
    </template>
  </el-form-item>
</template>

<script>
import { emitterMixin } from "./mixin.js";

export default {
  name: "ProcessFormItem",
  mixins: [emitterMixin],
  props: {
    infos: {
      type: Object,
      default: () => ({})
    },
    parentName: {
      type: String,
      default: "ProcessFormItemParent"
    },
    // 是编辑时显示编辑该字段
    isEdit: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    // 与流程平台配置字段属性一致
    name: {
      type: String,
      required: true
    },
    // 内部的 prop 先取 prop 传参，否则默认 name
    prop: {
      type: String,
      default: undefined
    },
    // 传 true 时永远显示默认插槽，否则显示传入的值
    alwaysShow: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: undefined
    },
    viewValue: {
      type: [Number, String, Object],
      default: ""
    },
    format: {
      type: String,
      default: ""
    },
    viewClass: {
      type: String,
      default: ""
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    isUpload: {
      type: Boolean,
      default: false
    },
    isMoney: {
      type: Boolean,
      default: false
    },
    // 标题label后面是否需要冒号
    needColon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      myViewValue: undefined,
      visible: true
    };
  },
  computed: {
    /**
     * 查看时候是否显示自定义内容
     */
    customView: function() {
      return !!this.$slots.view;
    },
    /**
     * 是否是编辑该节点
     */
    canEdit: function() {
      if (this.auditAction === "claim") {
        return false;
      }
      return this.isEdit || (this.editableFormField[`${this.auditAction}Visible`] && this.editableFormField[`${this.auditAction}Enable`]);
    },
    /**
     * 必填相关的 prop
     */
    myProp: function() {
      return this.prop || this.name;
    },
    needRequired: function() {
      // 如果是编辑页面，走 isRequired
      // 否则走 editableFormFields 的配置
      if (this.isEdit) {
        return this.isRequired;
      }
      return !!this.editableFormField[`${this.auditAction}Required`];
    },
    /**
     * 校验规则
     */
    myRules: function() {
      // eslint-disable-next-line no-nested-ternary
      return this.rules ? this.rules : this.needRequired ? [{ required: true, message: (this.isSelect ? "请选择" : this.isUpload ? "请上传" : "请输入") + (this.$attrs.label ? this.$attrs.label : ""), trigger: ["blur", "change"] }] : [];
    },
    /**
     * 当前可编辑字段的配置，如果 fieldName 属性没值则表示非编辑页面不编辑
     */
    editableFormField: function() {
      return (this.infos.editableFormFields || []).find(v => v.fieldName === this.name) || {};
    },
    /**
     * 审批行为
     */
    auditAction: function() {
      const action = this.infos.outsideAuditModel?.action?.toLocaleLowerCase();
      if (action) {
        if (action === "finish" || action === "terminate") {
          return `${action}Process`;
        }
        return action;
      }
      return "None";
    }
  },
  watch: {
    /**
     * 可编辑字段配置，判断是否可见
     */
    editableFormField: function(val) {
      this.$refs[this.myProp]?.clearValidate();
      if (JSON.stringify(val) !== "{}") {
        this.visible = val[`${this.auditAction}Visible`];
      }
    }
  },
  mounted() {
    // 向parentName进行注册
    this.dispatch(this.parentName, "enrollItem.add", [this]);
    let defaultFirstComponent = null;
    // 如果输入控件是 Upload ，则获取插槽中的上传节点，并为其绑定事件
    if (this.isUpload) {
      defaultFirstComponent = this.$slots.default.find(item => item?.tag?.endsWith("UploadFile"));
      this.handleUploadFile(defaultFirstComponent.child);
    } else {
      // 如果输入控件是 inputNumber ，监听事件
      defaultFirstComponent = this.$slots.default?.[0];
      if (defaultFirstComponent?.tag?.endsWith("ElInputNumber")) {
        this.handleInputNumber(defaultFirstComponent.child);
      }
    }
  },
  methods: {
    setViewValue: function(value) {
      // 优先取 props 中传入的参数
      this.myViewValue = this.viewValue || value;
    },
    /**
     * 如果数字输入框有内容修改，清除校验结果，因为该控件不是实时赋值
     */
    handleInputNumber: function() {
      this.$refs[this.myProp].$on("el.form.change", () => {
        this.$refs[this.myProp].clearValidate();
      });
    },
    /**
     * 如果是上传组件，则在组件上绑定事件，检测数据变化
     */
    handleUploadFile(childNode) {
      childNode?.$on("change", () => {
        this.$refs[this.myProp].validate("change");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.label-colon ::v-deep .el-form-item__label::after {
  content: ":";
  display: inline-block;
  margin-left: 1px;
}
</style>