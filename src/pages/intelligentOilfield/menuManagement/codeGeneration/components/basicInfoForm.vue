<template>
  <el-form
    ref="basicInfoForm"
    :model="currentInfo"
    :rules="rules"
    label-width="150px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="表名称" prop="tableName">
          <el-input v-model="currentInfo.tableName" placeholder="请输入仓库名称" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="表描述" prop="tableComment">
          <el-input v-model="currentInfo.tableComment" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实体类名称" prop="className">
          <el-input v-model="currentInfo.className" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="作者" prop="functionAuthor">
          <el-input v-model="currentInfo.functionAuthor" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="currentInfo.remark" type="textarea" :rows="3" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentInfo: this.info,
      rules: {
        tableName: [
          { required: true, message: "请输入表名称", trigger: "blur" }
        ],
        tableComment: [
          { required: true, message: "请输入表描述", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请输入实体类名称", trigger: "blur" }
        ],
        functionAuthor: [
          { required: true, message: "请输入作者", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    info: {
      handler(newVal) {
        this.currentInfo = newVal;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>