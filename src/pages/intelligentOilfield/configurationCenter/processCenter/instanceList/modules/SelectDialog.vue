<template>
  <el-dialog
    width="50%"
    :title="`选择${title}`"
    :visible.sync="visibleDialog"
    append-to-body
    @open="getData"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item :label="`请选择${title}`" prop="model">
        <el-select
          v-model="form.model"
          v-bind="$attrs"
          filterable
          :placeholder="`请选择${title}`"
          v-on="$listeners"
          @change="$emit('input', form.model)"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancelBtn" @click="visibleDialog = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleClose">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOptions } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/selectDialog.js";
import { get } from "lodash";

export default {
  name: "SelectDialog",
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    labelProp: {
      type: String,
      default: "label"
    },
    valueProp: {
      type: String,
      default: "value"
    },
    dataPath: {
      type: String,
      default: "data"
    }
  },
  data() {
    return {
      rules: {
        model: [
          { required: true, message: `请选择${this.title}`, trigger: "change" }
        ]
      },
      form: {
        model: null
      },
      options: []
    };
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.form.model = val;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getData() {
      if (!this.url) {
        this.$message.warning("请设置src!");
        return;
      }
      getOptions(this.url)
        .then(res => {
          const data = get(res, this.dataPath, res);
          this.options = data.map(item => {
            item.label = item[this.labelProp];
            item.value = item[this.valueProp];
            return item;
          });
        })
        .catch(() => {
          this.$message.error("选项获取失败!");
          this.visibleDialog = false;
        });
    },
    handleClose() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const node = this.options.find(item => item[this.valueProp] === this.form.model);
          this.$emit("submit", this.form.model, node);
          this.visibleDialog = false;
        }
      });
    }
  }
};
</script>

<style>

</style>