<!-- 后台——数据权限管理 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" style="max-width: 1700px;">
      <el-form-item label="应用名称" prop="appId">
        <el-select
          v-model="queryParams.appId"
          placeholder="请选择"
          clearable
          size="small"
          style="width: 240px"
          @change="gettableList(queryParams.appId)"
        >
          <el-option
            v-for="(item, index) in appSelect"
            :key="index"
            :label="item.appName"
            :value="item.appId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表筛选" prop="tableId">
        <el-select
          v-model="queryParams.tableId"
          placeholder="请选择"
          clearable
          size="small"
          style="width: 240px"
          @change="getfieldsList(queryParams.tableId)"
        >
          <el-option
            v-for="(item, index) in ulSelect"
            :key="index"
            :label="item.tableName"
            :value="item.tableId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段筛选" prop="fieldId">
        <el-select v-model="queryParams.fieldId" placeholder="请选择" style="width: 100%" clearable>
          <el-option
            v-for="(item, index) in fieldSelect"
            :key="index"
            :label="item.fieldName"
            :value="item.fieldId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色筛选" prop="roleId">
        <el-select v-model="queryParams.roleId" placeholder="请选择" clearable size="small" style="width: 240px">
          <el-option
            v-for="(item, index) in addtableRole"
            :key="index"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限筛选" prop="authKey">
        <el-select v-model="queryParams.authKey" placeholder="请选择" clearable size="small" style="width: 240px">
          <el-option
            v-for="(item, index) in addtablePer"
            :key="index"
            :label="item.perName"
            :value="item.perName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择" clearable size="small" style="width: 240px">
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" class="commonBtn">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['system:role:add']"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div
      class="footerBox"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
        height: 'calc(100% - 195px)',
      }"
    >
      <div class="headerStyle">数据权限列表</div>
      <el-table :data="dataperList" @selection-change="handleSelectionChange" height="calc(100% - 45px)">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column label="应用名称" prop="appName" :show-overflow-tooltip="true" width="120" />
        <el-table-column label="表名" prop="tableName" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="字段" prop="fieldNames" width="200" />
        <el-table-column label="角色" prop="roleNames" width="150" />
        <el-table-column label="状态" align="center" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="权限" prop="authKey" width="150" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="消息状态" width="100">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope" v-if="scope.row.roleId !== 1">
            <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['system:role:edit']"
              >修改</el-button
            >
            <el-button size="mini" type="text" @click="handleDelete(scope.row)" v-hasPermi="['system:role:remove']"
              >删除</el-button
            >
            <!-- <el-button size="mini" type="text" @click="handleDataScope(scope.row)" v-hasPermi="['system:role:edit']"
              >数据权限</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="addform" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用选择" prop="appId">
              <el-select v-model="addform.appId" placeholder="请选择应用" @change="gettableList(addform.appId)">
                <el-option
                  v-for="(item, index) in appSelect"
                  :key="index"
                  :label="item.appName"
                  :value="item.appId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列表选择" prop="tableId">
              <el-select v-model="addform.tableId" placeholder="请选择列表" @change="getfieldsList(addform.tableId)">
                <el-option
                  v-for="(item, index) in ulSelect"
                  :key="index"
                  :label="item.tableName"
                  :value="item.tableId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="字段选择" prop="fieldIds">
              <el-select v-model="addform.fieldIds" placeholder="请选择字段" style="width: 100%" multiple>
                <el-option
                  v-for="(item, index) in fieldSelect"
                  :key="index"
                  :label="item.fieldName"
                  :value="item.fieldId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="授权角色" prop="roleIds">
              <el-table
                :data="addtableRole"
                ref="addTable"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange2"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" label="序号" width="50"> </el-table-column>
                <el-table-column prop="roleName" label="角色名称"> </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授权权限" prop="authKey">
              <el-table
                :data="addtablePer"
                ref="multipleTable"
                style="width: 100%"
                class="pertable"
                border
                @selection-change="handleSelectionChange3"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" label="序号" width="50"> </el-table-column>
                <el-table-column prop="perName" label="权限名称"> </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-if="this.title == '新增数据权限' ? 1 : 0">确 定</el-button>
        <el-button type="primary" @click="editForm" v-else>确 定</el-button>
        <el-button @click="cancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  dataPerList,
  appList,
  tableList,
  fieldsList,
  adddataPer,
  deldataPer,
  getdataPer,
  updatePer,
  changeDataStatus,
} from '@/api/system/dataper';
import { listRole } from '@/api/system/role';

export default {
  dicts: ['sys_normal_disable'],
  data() {
    return {
      form: {},
      open: false, // 新增弹框
      title: '', // 弹窗标题
      addtableRole: [],
      addtablePer: [
        { id: 1, perName: '读取' },
        { id: 2, perName: '修改,读取' },
        { id: 3, perName: '无权限' },
      ],
      appSelect: [],
      ulSelect: [],
      fieldSelect: [],
      addform: {
        appId: '',
        tableId: '',
        fieldIds: [],
        roleIds: [],
        authKey: '',
      },
      rules: {
        appId: [{ required: true, message: '应用选中不能为空', trigger: 'blur' }],
        tableId: [{ required: true, message: '列表选择不能为空', trigger: 'blur' }],
        fieldIds: [{ required: true, message: '字段不能为空', trigger: 'blur' }],
        roleIds: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
        authKey: [{ required: true, message: '账号类型不能为空', trigger: 'blur' }],
      },
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      dataperList: [],
      // 选中数组
      ids: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        appId: undefined,
        tableId: undefined,
        fieldId: undefined,
        roleId: undefined,
        authKey: undefined,
        status: undefined,
      },
    };
  },
  created() {
    this.getList();
    this.getListrole(); // 查询角色列表
    this.getappList(); // 查询应用名称列表
  },
  methods: {
    /** 查询数据权限列表 */
    getList() {
      this.loading = true;
      dataPerList(this.queryParams).then((response) => {
        this.dataperList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 查询新增弹框内-应用选择
    getappList() {
      appList().then((res) => {
        if (res.data.code === 200) {
          this.appSelect = res.data.rows;
        }
      });
    },
    // 查询新增弹框内-列表选择
    gettableList(appId) {
      // this.appId = this.addform.appId;
      tableList(appId).then((res) => {
        if (res.data.code === 200) {
          this.ulSelect = res.data.data;
        }
      });
    },
    // 查询新增弹框内-字段选择
    getfieldsList(tableId) {
      // this.tableId = this.addform.tableId;
      fieldsList(tableId).then((res) => {
        if (res.data.code === 200) {
          this.fieldSelect = res.data.data;
        }
      });
    },
    // 查询新增弹框内-授权角色
    getListrole() {
      this.loading = true;
      listRole().then((response) => {
        this.addtableRole = response.data.rows;
        console.log(this.addtableRole);
        this.loading = false;
      });
    },
    // 数据权限状态修改
    handleStatusChange(row) {
      const text = row.status === '0' ? '启用' : '停用';
      this.$modal
        .confirm(`确认要"${text}""${row.appName}"数据权限吗？`)
        .then(() => changeDataStatus(row.dataId, row.status))
        .then((res) => {
          if (res ? res.data.code === 200 : false) {
            this.$modal.msgSuccess(`${text}成功`);
          }
        })
        .catch(() => {
          row.status = row.status === '0' ? '1' : '0';
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.addform = {};
      this.resetForm('addform');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.roleId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 多选框选中数据
    handleSelectionChange2(selection) {
      this.addform.roleIds = selection.map((item) => item.roleId);
      this.multiple = !selection.length;
    },
    // 多选框选中数据
    handleSelectionChange3(selection) {
      // this.perNames = selection.map((item) => item.perName);
      this.addform.authKey = selection[0].perName;
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '新增数据权限';
      this.$refs.multipleTable.clearSelection();
      this.$refs.addTable.clearSelection();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.title = '修改数据权限';
      this.reset();
      const roleId = row.dataId || this.ids;
      getdataPer(roleId).then((response) => {
        this.addform = response.data.data;
        this.open = true;
        this.gettableList(response.data.data.appId);
        this.getfieldsList(response.data.data.tableId);
        // 回显勾选的数据
        const rowids = response.data.data.roleIds;
        this.$nextTick(() => {
          this.addtableRole.forEach((item) => {
            if (rowids.includes(item.roleId)) {
              this.$refs.addTable.toggleRowSelection(item);
            }
          });
        });
        this.$nextTick(() => {
          this.addtablePer.forEach((item) => {
            if (response.data.data.authKey === item.perName) {
              this.$refs.multipleTable.toggleRowSelection(item);
            }
          });
        });
      });
    },
    /** 确认增加按钮 */
    submitForm() {
      // this.$refs.addform.validate((valid) => {
      //   if (valid) {
      //
      adddataPer(this.addform).then((res) => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess('新增成功');
          this.open = false;
          this.getList();
        }
      });
      //   }
      // });
    },
    /** 确认修改按钮 */
    editForm() {
      // this.$refs.addform.validate((valid) => {
      //   if (valid) {
      //
      updatePer(this.addform).then((res) => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess('修改成功');
          this.open = false;
          this.getList();
        }
      });
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const dataIds = row.dataId || this.ids;
      this.$modal
        .confirm(`是否确认删除角色编号为"${row.appName}"的数据项？`)
        .then(() => deldataPer(dataIds))
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
.el-tree {
  max-height: 370px;
  overflow: scroll;
}
.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>