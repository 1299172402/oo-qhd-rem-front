<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form
    ref="form"
    :model="model"
    class="form-auto-create"
    :class="formClass"
    v-bind="$attrs"
  >
    <template v-for="item in items">
      <el-form-item
        v-if="!item.itemSlot"
        :key="item.prop"
        :name="item.prop"
        :prop="item.required ? item.prop : ''"
        :rules="item.required ? item.rules || simpleRequired(item.label) : []"
        :class="item.class"
        :label="item.label"
      >
        <span v-if="item.tip" slot="label">
          <slot name="label" :item="item" />
        </span>
        <span v-if="viewOnly || item.isView" :title="item.translate ? item.translate(model[item.prop]) : model[item.prop]">{{ item.translate ? item.translate(model[item.prop]) : model[item.prop] }}</span>
        <slot v-else-if="item.showSlot && $slots[item.prop]" :name="item.prop" />
        <el-input
          v-else-if="!item.type || item.type === 'textarea'"
          v-model="model[item.prop]"
          :type="item.type"
          :maxlength="item.maxlength"
          :show-word-limit="item.showWordLimit"
          :clearable="item.clearable === false ? false : true"
          :placeholder="item.placeholder || ('请输入' + item.label)"
          :disabled="item.disabled"
        />
        <el-input-number
          v-else-if="item.type === 'number'"
          v-model="model[item.prop]"
          :precision="item.precision"
          :min="item.min"
          :max="item.max"
          controls-position="right"
          :placeholder="item.placeholder || ('请输入' + item.label)"
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="model[item.prop]"
          :multiple="item.multiple"
          :placeholder="item.placeholder || ('请选择' + item.label)"
        >
          <el-option
            v-for="subItem in item.options"
            :key="subItem.value"
            :label="subItem.label"
            :value="subItem.value"
          />
        </el-select>
        <el-radio-group v-else-if="item.type === 'radio'" v-model="model[item.prop]">
          <el-radio
            v-for="subItem in item.options"
            :key="subItem.value"
            :label="subItem.value"
          >
            {{ subItem.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-else>
        <slot :item="item" :name="item.itemSlot" />
      </template>
    </template>
  </el-form>
</template>
<script>
import { scrollToElement } from "@/utils/validate.js";

export default {
  name: "FormAutoCreate",
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => []
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    formClass: {
      type: String,
      default: "form-layout"
    }
  },
  methods: {
    validate(showMessage = true, scrollTo = true) {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("ok");
            resolve(true);
          } else {
            showMessage && this.$message.warning("请将必填项填写完整！");
            scrollTo && scrollToElement();
            reject();
          }
        });
      });
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    simpleRequired(msg = "") {
      return [{ required: true, message: `请输入${msg}`, trigger: ["change"] }];
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .el-input-number {
  min-width: 160px;
  max-width: 220px;
  width: auto;
}
</style>