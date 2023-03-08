<template>
  <!-- 授权用户 -->
  <el-dialog
    :close-on-click-modal="false"
    title="选择租户"
    :visible.sync="visible"
    width="1000px"
    top="5vh"
    append-to-body
  >
    <el-table
      ref="table"
      :data="userList"
      max-height="400px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
      />
      <el-table-column
        label="租户编号"
        prop="tenantKey"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="租户名称"
        prop="tenantName"
        align="center"
        :show-overflow-tooltip="true"
      />
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close" @click="cancelBtn">
        取 消
      </el-button>
      <el-button icon="el-icon-check" type="primary" @click="handleOk">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { listTenant } from "@/api/intelligentOilfield/messaging";

export default {
  name: "SelectTenant",
  props: {
    // 已选择的租户信息
    tenantsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      grantedTenants: [],
      userList: []
    };
  },
  methods: {
    /** 显示弹框 */
    show() {
      this.getList();
      this.visible = true;
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.grantedTenants = selection;
    },
    /** 查询表数据 */
    getList() {
      listTenant().then((res) => {
        if (res.status === 200) {
          this.userList = res.data.data;
          // 租户列表过滤已选过的数据
          if (this.tenantsData && this.tenantsData.length > 0) {
            this.userList = this.userList.filter((item) => this.tenantsData.map((v) => v.tenantKey).indexOf(item.tenantKey) === -1);
          }
        }
      });
    },
    /** 确定按钮 */
    handleOk() {
      this.$emit("ok", this.grantedTenants);
      this.visible = false;
    },
    /** 取消按钮 */
    cancelBtn() {
      this.visible = false;
    }
  }
};
</script>