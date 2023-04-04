<template>
  <el-dialog
    width="50%"
    :title="`${isEdit ? '编辑' : '添加'}变量`"
    :visible.sync="visibleDialog"
    append-to-body
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="变量名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入变量名称" />
      </el-form-item>
      <el-form-item :label="`请选择类型`" prop="type">
        <el-select
          v-model="form.type"
          filterable
          :placeholder="`请选择类型`"
          @change="$emit('input', form.model)"
        >
          <el-option
            v-for="dict in dict.type.lc_variable_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="变量值" prop="value">
        <el-date-picker
          v-if="form.type === 'date'"
          v-model="form.value"
          type="datetime"
          placeholder="请选择变量值"
        />
        <el-input v-else v-model="form.value" placeholder="请输入变量值" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close" @click="visibleDialog = false">
        取 消
      </el-button>
      <el-button icon="el-icon-check" type="primary" @click="handleClose">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "AddVariable",
  dicts: ["lc_variable_type"],
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入变量名", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        value: [
          { required: true, message: "请输入变量值", trigger: "blur" }
        ]
      },
      form: {
        name: null,
        type: null,
        value: null
      }
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
        this.form = { ...val };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClose() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.form.type === "date") {
            this.form.value = dayjs(this.form.value).format("YYYY-MM-DDTHH:mm:ssZ");
          }
          this.$emit("submit", this.form);
          this.visibleDialog = false;
        }
      });
    }
  }
};
</script>

<style>

</style>