<!-- 后台——角色管理 -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
            <el-form-item label="指标名称" prop="name">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入指标名称"
                    clearable
                    size="small"
                    style="width: 240px"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="指标模块" prop="status">
                <el-select v-model="queryParams.status" placeholder="请选择" clearable size="small" style="width: 240px">
                    <el-option
                        v-for="dict in dict.type.sys_normal_disable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" class="commonBtn">重置</el-button>
            </el-form-item>
        </el-form>
        <div
            class="footerBox"
            :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
        >
            <div class="headerStyle">数据指标列表</div>
<!--            <el-table :data="dataList"  height="calc(100% - 45px)">-->
            <el-table :data="dataList"  height="calc(100% - 125px)">
                <el-table-column label="序号" type="index" width="120" />
                <el-table-column label="指标ID" prop="key1"  align="center" :show-overflow-tooltip="true"  />
                <el-table-column label="指标名称" prop="key2"  align="center" :show-overflow-tooltip="true" />
                <el-table-column label="指标模块" prop="key3" width="150"  align="center"/>
                <el-table-column label="指标缩略图" align="center" width="150" >
                    <template slot-scope="scope">
                        <span>{{scope.row.key4}}</span>
                    </template>
                </el-table-column>
              
                <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                    <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.key5) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope" v-if="scope.row.roleId !== 1">
                        <el-button size="mini" type="text" @click="handleRole(scope.row)" v-hasPermi="['system:role:edit']">角色权限</el-button>
                        <el-button size="mini" type="text" @click="handleOrganization(scope.row)" v-hasPermi="['system:role:edit']"
                        >组织机构权限</el-button>
                       
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

        <!-- 角色权限配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :close-on-click-modal="false">
            <el-table :data="roleList" @selection-change="handleRoleSelectionChange" :row-key='row => row.roleId' ref="roleTable">
                <el-table-column type="selection" width="55" align="center" :reserve-selection="true"/>
                <el-table-column label="序号" type="index" width="120" />
                <el-table-column label="角色名称" prop="roleName"  align="center" :show-overflow-tooltip="true"  />
            </el-table>
            <pagination
                v-show="roleTotal > 0"
                :total="roleTotal"
                :page.sync="roleQueryParam.pageNum"
                :limit.sync="roleQueryParam.pageSize"
                @pagination="getRoleList"
                :pageSizes="size"
            />
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitRole">确 定</el-button>
                <el-button @click="cancel" class="cancelBtn">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 组织机构权限配置对话框 -->
        <el-dialog :title="title" :visible.sync="openOrganization" width="500px" append-to-body :close-on-click-modal="false">
            <el-tree
                class="tree-border"
                :data="deptList"
                :default-checked-keys="defaultCheckedKeys"
                show-checkbox
                default-expand-all
                ref="dept"
                @check="handleOrganizationSelectionChange"
                node-key="deptId"
                empty-text="加载中，请稍候"
                :props="defaultProps"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitOrganization">确 定</el-button>
                <el-button @click="cancelDataScope" class="cancelBtn">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listRole } from '@/api/system/role';
// import { treeselect as menuTreeselect, roleMenuTreeselect } from '@/api/system/menu';
import { listDept } from '@/api/system/dept';

export default {
  dicts: ['sys_normal_disable'],
  data() {
    return {
      size:[10, 20, 30, 50],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      dataList: [
        {
          key1:'ZHY0291',key2:'产量波动指标',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'产量相关指标',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'产量执行',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'剩余油分布情况',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'油田大事件',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'月度产量情况',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'产量够成情况',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'采油速度',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'采油速度',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
        {
          key1:'ZHY0291',key2:'采油速度',key3:'油藏管理',key4:'_',key5:'2022.11.15 18:36',
        },
                    
      ],
      // 角色列表
      roleList:[],
      // 组织机构列表
      deptList:[],
      defaultCheckedKeys:[200],// 组织机构回显
      // 弹出层标题
      title: '',
      // 是否显示弹出层角色权限
      open: false,
      // 是否显示弹出层（组织机构权限）
      openOrganization: false,
                
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        status: undefined,
      },
      // 角色弹框的分页参数
      roleTotal:0,
      roleQueryParam:{
        pageNum: 1,
        pageSize: 10,
      },
      defaultProps: {
        children: 'children',
        label: 'deptName',
      },
      // 是否展开，默认全部展开
      isExpandAll: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询指标列表 */
    getList() {
      this.loading = true;
      this.total = this.dataList.length
      this.loading = false;
      // listRole(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
      //     this.dataList = response.data.rows;
      //     this.total = response.data.total;
      //     this.loading = false;
      // });
    },
    /** 获取角色权限列表 */ 
    getRoleList(){
      listRole(this.roleQueryParam).then((response) => {
        this.roleTotal = response.data.total;
        this.roleList = response.data.rows;
      });
    },
    /** 打开角色权限弹框 */
    handleRole(){
      this.getRoleList()
      this.title = '角色权限';
      this.open = true
                
      this.$nextTick(() => {
        this.toggleSelection(
          [{
            "searchValue":null,
            "createBy":null,
            "createTime":"2022-12-28 15:07:44",
            "updateBy":null,
            "updateTime":null,
            "remark":null,
            "params":{
            },
            "roleId":103,
            "roleName":"新的角色试试",
            "roleKey":"julia",
            "roleSort":"3",
            "dataScope":"1",
            "menuCheckStrictly":true,
            "deptCheckStrictly":true,
            "status":"0",
            "delFlag":"0",
            "flag":false,
            "menuIds":null,
            "deptIds":null,
            "num":0,
            "admin":false
          }])
      });
    },
    /** 查询组织机构树形数据列表 */
    getOrgTreeData() {
      listDept().then((response) => {
        this.deptList = this.handleTree(response.data.data, 'deptId');
        console.log( this.deptList)
      });
    },
    /** 打开组织机构权限弹框 */
    handleOrganization() {
      this.defaultCheckedKeys = []
      this.getOrgTreeData()
      this.title = '组织机构权限';
      // 设置选中的机构   将deptId放进defaultCheckedKeys这个数组中就可以 如下示例
      // this.defaultCheckedKeys= [200]
      this.openOrganization = true
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openOrganization = false;
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
    /** 角色多选框设置数据选中状态 */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          console.log(row)
          console.log(this.$refs)
          this.$refs.roleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.roleTable.clearSelection();
      }
    },
    /** 角色多选框选中数据 */
    handleRoleSelectionChange(selection) {
      console.log(selection)
    },
    /** 组织机构多选框选中数据 */ 
    handleOrganizationSelectionChange(checkedNodes,currentNode) {
      // 打印的为当前选中的节点
      console.log(currentNode.checkedNodes)
    },
          
    /** 提交按钮 */
    submitRole() {
      console.log(11);       
    },
    /** 提交按钮（数据权限） */
    submitOrganization() {
      console.log(22);       
    }
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
    .el-tree{
        max-height: 370px;
        overflow: scroll;
    }
</style>