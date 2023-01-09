<!-- 后台——数据权限管理 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
      <el-form-item label="应用名称" prop="appId">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入"
          clearable
          size="small"
          style="margin-bottom: 10px; height: 40px"
        />
      </el-form-item>
      <el-form-item label="授权用户" prop="appId">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入"
          clearable
          size="small"
          style="margin-bottom: 10px; height: 40px"
        />
      </el-form-item>
      <el-form-item label="状态" prop="appId">
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
      }"
    >
      <div class="headerStyle">应用中心管理</div>
      <div class="content-body">
        <div class="content-box">
          <p class="content-header">安全管理基础信息</p>
          <div class="content_bf">
            <div class="content_body">
              <span>授权角色：</span>
              <span>管理员；用户</span>
            </div>
            <div class="content_footer">
              <p>应用状态：</p>
              <div>
                <el-switch v-model="status" active-value="0" inactive-value="1"></el-switch>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
        <div class="content-box"></div>
      </div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50vw" append-to-body :close-on-click-modal="false">
      <div class="dialog_box">
        <div class="dialog_left">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <div class="headerinfo">基础信息</div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户名称" prop="nickName">
                  <el-input v-model="form.nickName" placeholder="请输入用户名称" maxlength="30" />
                </el-form-item>
              </el-col>
            
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户岗位">
                  <el-select v-model="form.tempPostId" placeholder="请选择用户岗位" @change="changePost">
                    <el-option
                      v-for="item in postOptions"
                      :key="item.postId"
                      :label="item.postName"
                      :value="item.postId"
                      :disabled="item.status == 1"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="headerinfo">账号信息</div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户账号" prop="userName">
                  <el-input v-model="form.userName" placeholder="请输入用户账号" maxlength="30" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户手机" prop="phonenumber">
                  <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户密码" prop="password">
                  <el-input
                    v-model="form.password"
                    placeholder="请输入用户密码"
                    type="password"
                    maxlength="20"
                    show-password
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_right"></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  appList,
  adddataPer,
  deldataPer,
  updatePer,
  changeDataStatus,
} from '@/api/system/dataper';

export default {
  dicts: ['sys_normal_disable'],
  data() {
    return {
      status: 0,
      appList: [],
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
      // 选中数组
      ids: [],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptName: undefined,
        appName: undefined,
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
  },
  methods: {
    /** 查询数据权限列表 */
    getList() {
      this.loading = true;
      appList(this.queryParams).then((response) => {
        this.appList = response.data.rows;
        this.total = response.data.total;
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '组织框架列表';
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
  .content-body {
    width: 100%;
    height: calc(100% - 45px);
    padding-left: 40px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .content-box {
      width: 15%;
      height: 200px;
      border: 1px solid var(--lightBlueColor);
      margin-right: 20px;

      .content-header {
        text-align: center;
        line-height: 32px;
      }
      .content_bf {
        height: calc(100% - 32px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .content_body {
          width: 100%;
          padding-left: 15px;
          line-height: 32px;
        }

        .content_footer {
          display: flex;
          line-height: 32px;
          width: 100%;
          padding-left: 15px;
        }
      }
    }
  }
}
.el-tree {
  max-height: 370px;
  overflow: scroll;
}
.pertable thead .el-table-column--selection .cell {
  display: none;
}
.dialog_box {
  width: 100%;
  display: flex;
}
.dialog_left {
  width: 50%;
  height: 500px;
}
.dialog_right {
  width: 50%;
  height: 500px;
}
</style>