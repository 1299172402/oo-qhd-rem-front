<template>
  <span>
    <t-button @click="handleOpenDialog">再编辑</t-button>
    <el-dialog :title="title" :visible.sync="myVisible">
      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </template>
      <slot />
    </el-dialog>
  </span>
</template>
<script>
export default {
  name: "EditPopup",
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    myVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    handleOpenDialog() {
      this.$emit("update:visible", true);
    },
    handleOk() {
      this.$emit("ok");
    },
    handleCancel() {
      this.$emit("update:visible", false);
    }
  }
};
</script>