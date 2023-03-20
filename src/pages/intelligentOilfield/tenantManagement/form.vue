<template>
  <form-section submit-text="" @save="handleOk">
    <div class="tenant-form">
      <el-form
        ref="Form"
        :model="model"
        :rules="rules"
        label-width="240px"
      >
        <el-form-item label="租户code：" prop="tenantCode">
          <el-input v-model="model.tenantCode" :title="model.tenantCode" placeholder="请输入租户code" />
        </el-form-item>
        <el-form-item label="租户名称：" prop="tenantName">
          <el-input v-model="model.tenantName" :title="model.tenantName" placeholder="请输入租户名称" />
        </el-form-item>
        <el-form-item label="分配组织机构：" prop="deptId">
          <treeselect
            v-model="model.deptId"
            :options="deptOptions"
            :show-count="true"
            placeholder="请选择所属机构"
          />
        </el-form-item>
        <el-form-item label="租户状态：" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio v-for="dict in dict.type.sys_app_status" :key="dict.value" :label="dict.value">
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租户应用授权：">
          <application-choose :table-data="tableData" @selected="handleSelected" />
          <application-table :table-data="tableData" @update-data="handleTableData" />
        </el-form-item>
      </el-form>
    </div>
  </form-section>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import ApplicationChoose from "@/components/intelligentOilfield/ChooseApps/index.vue";
import ApplicationTable from "./components/applicationTable.vue";
import FormSection from "@/components/intelligentOilfield/FormSection.vue";
import { FormMixins } from "@/components/mixins/BytzFormMixins";

import { treeselect } from "@/api/intelligentOilfield/system/dept";
import { findById, updateTenant, addTenant } from "@/api/intelligentOilfield/system/applicationCenter/tenant";

export default {
  name: "TenantForm",
  components: {
    FormSection,
    ApplicationChoose,
    ApplicationTable,
    Treeselect
  },
  mixins: [FormMixins],
  dicts: ["sys_app_status"],
  data() {
    return {
      tableData: [],
      model: {
        tenantCode: undefined,
        tenantName: undefined,
        deptId: undefined,
        status: undefined,
        appList: []
      },
      fn: {
        findById
      },
      deptOptions: [],
      rules: {
        tenantCode: [{ required: true, message: "请输入租户code", trigger: "blur" }],
        tenantName: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
        deptId: [{ required: true, message: "请输入分配组织机构", trigger: "change" }],
        status: [{ required: true, message: "请输入租户状态", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.getTreeselect();
    this.fn.save = this.$route.params.id ? updateTenant : addTenant;    
  },
  activated() {
    if(this.$route.params.id === undefined){
      this.$refs.Form.resetFields();
    }    
    this.getTreeselect();
    this.fn.save = this.$route.params.id ? updateTenant : addTenant;
  },
  methods: {
    /**
     * 已选应用处理
     */
    handleSelected(selectApplication) {
      this.tableData = selectApplication;
      this.tableData.map((item) => {
        this.model.appList.forEach((v) => {
          if (item.appId === v.appId) {
            item.sourceRole = v.sourceRole;
          }
        });
        return item;
      });
    },
    /**
     * appList数据处理
     */
    getSaveModel() {
      this.model.appList = this.tableData;
      this.model.appList.forEach((item) => {
        item.tenantId = this.$route.params.id;
      });
      return this.model;
    },
    /**
     * findById 结果返回
     */
    getFindModel(re) {
      this.tableData = re.data.data.appList;
      return re.data.data;
    },
    handleTableData(val) {
      this.tableData = val;
    },
    /**
     * 查询部门下拉树结构`  
     */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data.data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.tenant-form {
  width: 50%;
}
</style>