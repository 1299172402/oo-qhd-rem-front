<!-- 后台——组织机构管理 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100">
      <el-form label-height="80px" :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
        style="margin-top:20px">
        <el-form-item label="组织机构名称" prop="deptName">
          <el-input v-model="queryParams.deptName" placeholder="请输入组织机构名称" clearable size="small"
            @keyup.enter.native="handleQuery" />
        </el-form-item>
      <!-- <el-form-item label="组织机构ID" prop="deptId">
           <el-input
          v-model="queryParams.deptId"
          placeholder="请输入组织机构ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
                                              </el-form-item> -->
        <el-form-item label="部门状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择部门状态" clearable size="small">
            <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" class="commonBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>

    <pagePanelNew headerTitle="组织机构管理" style="height:calc(100% - 100px);">
        <el-row :gutter="10" class="mb8" style="margin-bottom:20px">
      <el-col :span="1.5">
        <el-button type="primary" size="mini" @click="handleAdd"
          v-hasPermi="['system:dept:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain size="mini" @click="toggleExpandAll"
          class="commonBtn">展开/折叠</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>
      <el-table v-if="refreshTable" :data="deptList" row-key="deptId" :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" height="calc(100% - 63px)"
        :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header" :cell-style="{ padding: '2px' }" style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }" class="tablestyle">
        <el-table-column prop="deptName" label="部门名称" width="260" align="left"></el-table-column>
        <el-table-column prop="orderNum" label="排序" width="220" align="center"></el-table-column>
        <el-table-column prop="type" label="部门类型" width="240" align="center">
          <template slot-scope="scope">
            {{ dict.type.sys_department_type?.find(dict => dict.value == scope.row.type)?.label }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="部门状态" width="220" align="center">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="260">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
              v-hasPermi="['system:dept:edit']">修改</el-button>
            <el-button size="mini" type="text" @click="handleAdd(scope.row)"
              v-hasPermi="['system:dept:add']">新增</el-button>
            <el-button v-if="scope.row.parentId != '0'" size="mini" type="text"
              @click="handleDelete(scope.row)" v-hasPermi="['system:dept:remove']" class="delbutton">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagePanelNew>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24" v-if="form.parentId !== '0'">
            <el-form-item label="上级部门" prop="parentId">
              <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
        <!-- <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
                                                  </el-col> -->
          <el-col :span="12">
            <el-form-item label="部门类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择部门类型" clearable>
                <el-option v-for="dict in dict.type.sys_department_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">{{
                  dict.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        <!-- <el-col :span="24">
            <el-form-item label="是否租户" prop="isTenant">
              <el-radio-group v-model="form.isTenant">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
              </el-col> -->
        <!-- <el-col :span="24" v-if="form.isTenant == '1'">
            <el-form-item label="选择角色" prop="tenantRoleId">
              <el-select size="small" style="width: 100%" v-model="form.tenantRoleId" placeholder="请选择角色" clearable>
                <el-option v-for=" item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
              </el-col> -->
          <el-col :span="24">
            <el-form-item label="是否为平台机构" label-width="120px">
              <el-radio-group v-model="form.isPlatform">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDept, selectDepts, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from '@/api/intelligentOilfield/system/dept';
// import { listRole } from '@/api/intelligentOilfield/system/role';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'Organization',
  dicts: ['sys_normal_disable', 'sys_department_type'],
  components: { Treeselect },
  data() {
    return {
      departmentOptions: [
        { label: '公司', value: '公司' },
        { label: '职能部门', value: '职能部门' },
      ],
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined,
        // deptId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
        deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
        orderNum: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change'],
          },
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          },
        ],
        type: [{ required: true, message: '部门类型不能为空', trigger: 'change' }],
        status: [{ required: true, message: '部门状态不能为空', trigger: 'change' }],
        // isTenant: [{ required: true, message: '是否租户不能为空', trigger: 'change' }],
        tenantRoleId: [{ required: true, message: '选择角色不能为空', trigger: 'change' }],
      },
      roleList: []
    };
  },
  created() {
    this.getList();
    // this.getRoleList()
  },
  methods: {
    /** 获取角色权限列表 */
    // getRoleList() {
    //   listRole({ isTenant: '1' }).then((response) => {
    //     this.roleList = response.data.rows;
    //   });
    // },
    /** 查询部门列表 */
    getList() {
      this.loading = true;
      selectDepts(this.queryParams).then((response) => {
        this.deptList = this.handleTree(response.data.data, 'deptId');
        this.loading = false;
      });
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: '0',
        isPlatform: '0', // "0":是,"1":否
        type: '', // 部门类型
        // isTenant: '0',
        tenantRoleId: undefined
      };
      this.resetForm('form');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.$nextTick(() => {
        this.handleQuery();
      })
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row !== undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = '新增部门';
      listDept().then((response) => {
        this.deptOptions = this.handleTree(response.data.data, 'deptId');
      });

    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getDept(row.deptId).then((response) => {
        this.form = response.data.data;
        this.open = true;
        this.title = '编辑部门';
      });
      listDeptExcludeChild(row.deptId).then((response) => {
        this.deptOptions = this.handleTree(response.data.data, 'deptId');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.deptId !== undefined) {
            updateDept(this.form).then((response) => {
              if (response ? response.data.code === 200 : false) {
                this.$modal.msgSuccess('修改成功');
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDept(this.form).then((response) => {
              if (response ? response.data.code === 200 : false) {
                this.$modal.msgSuccess('新增成功');
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal
        .confirm(`是否确认删除名称为"${row.deptName}"的数据项？（无法删除有下属部门的部门）`)
        .then(() => delDept(row.deptId))
        .then((res) => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess('删除成功');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}
</style>