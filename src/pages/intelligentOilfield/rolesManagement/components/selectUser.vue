<template>
  <!-- 授权用户 -->
  <el-dialog
    :close-on-click-modal="false"
    title="新增用户"
    :visible.sync="visible"
    width="1000px"
    top="5vh"
    append-to-body
    @close="cancelBtn"
  >
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="所属机构" prop="deptId">
        <treeselect
          v-model="queryParams.deptId"
          style="width: 300px"
          :options="deptOptions"
          :show-count="true"
          placeholder="请选择所属机构"
        >
          <label
            slot="option-label"
            slot-scope="{ node, labelClassName }"
            :class="labelClassName"
            :title="node.label"
          >{{ node.label }}
          </label>
        </treeselect>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          class="commonBtn"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        ref="table"
        :data="userList"
        height="260px"
        :row-key="(row) => row.userId"
        @row-click="clickRow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true" />
        <el-table-column label="用户账号" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column label="用户名称" prop="nickName" :show-overflow-tooltip="true" />
        <el-table-column label="所属机构" prop="dept.deptName" :show-overflow-tooltip="true" />
        <el-table-column label="用户岗位" prop="posts[0].postName" :show-overflow-tooltip="true" />
        <el-table-column label="用户邮箱" prop="email" :show-overflow-tooltip="true" />
        <el-table-column label="用户手机" prop="phonenumber" :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelectUser">
        确 定
      </el-button>
      <el-button class="commonBtn" @click="cancelBtn">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { unallocatedUserList, authUserSelectAll } from "@/api/intelligentOilfield/system/role";
import { treeselect } from "@/api/intelligentOilfield/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  dicts: ["sys_normal_disable"],
  components: {
    Treeselect
  },
  props: {
    // 角色编号
    roleId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      // 选中数组值
      userIds: [],
      // 总条数
      total: 0,
      // 未授权用户数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
        userName: undefined,
        phonenumber: undefined,
        deptId: undefined
      },
      // 部门树选项
      deptOptions: undefined
    };
  },
  mounted() {
    this.getTreeselect();
  },
  methods: {
    cancelBtn() {
      this.visible = false;
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.queryParams.pageNum = 1;
        this.$refs.table.clearSelection();
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data.data;
      });
    },
    // 显示弹框
    show() {
      this.visible = true;
      this.queryParams.roleId = this.roleId;
      this.$nextTick(() => {
        this.getList();
      });
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.userId);
    },
    // 查询表数据
    getList() {
      unallocatedUserList(this.queryParams).then(res => {
        this.userList = res.data.rows;
        this.total = res.data.total;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.$refs.table.clearSelection();
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 选择授权用户操作 */
    handleSelectUser() {
      const { roleId } = this.queryParams;
      const userIds = this.userIds;
      if (userIds === "") {
        this.$modal.msgError("请选择要分配的用户");
        return;
      }
      authUserSelectAll({ roleId, userIds }).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess(res.data.msg);
          //   if (res.code === 200) {
          this.visible = false;
          this.$emit("ok");
          this.resetQuery();
        //   }
        }
      });
    }
  }
};
</script>