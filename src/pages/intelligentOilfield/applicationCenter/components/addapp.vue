<!-- 后台——应用中心管理-新增应用 -->
<template>
  <div class="app-container">
     <pagePanel headerTitle="组织框架列表">
      <div class="dialog_box">
        <div class="dialog_left">
          <el-form ref="form" :model="form" :rules="rules" label-width="122px">
            <div class="headerinfo">应用信息</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="应用ID" prop="appId">
                  <el-input v-model="form.appId" placeholder="请输入用户名称" maxlength="30" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用名称" prop="appName">
                  <el-input v-model="form.appName" placeholder="请输入用户名称" maxlength="30" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="应用分类" prop="appType">
                  <el-select v-model="form.appType" placeholder="请选择">
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
              <el-col :span="4">
                <el-form-item label="" class="addwork">
                  <el-button type="primary" @click="addPost">新建分类</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用中心" prop="apply">
                  <el-checkbox-group v-model="form.apply" :max="1">
                    <el-checkbox label="告警中心"></el-checkbox>
                    <el-checkbox label="投影中心"></el-checkbox>
                    <el-checkbox label="看板中心"></el-checkbox>
                    <el-checkbox label="应用中心"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用图标" prop="appImg">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用状态" prop="appStatus">
                  <el-radio-group style="margin: 20px 0" v-model="form.appStatus">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">离线</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="访问类型" prop="accessType">
                  <el-radio-group style="margin: 20px 0" v-model="form.accessType">
                    <el-radio :label="0">PC</el-radio>
                    <el-radio :label="1">移动端APP</el-radio>
                    <el-radio :label="2">移动端H5</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-show="form.accessType === 0 ? 1 : 0">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="访问地址URL" prop="accessUrl">
                    <el-input v-model="form.accessUrl" placeholder="请输入" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-show="form.accessType === 1 ? 1 : 0">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="IOS应用Scheme" prop="iosScheme">
                    <el-input v-model="form.iosScheme" placeholder="请输入" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="安卓应用Scheme" prop="androidScheme">
                    <el-input v-model="form.androidScheme" placeholder="请输入" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-show="form.accessType === 2 ? 1 : 0">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="入口URL" prop="accessUrl">
                    <el-input v-model="form.accessUrl" placeholder="请输入" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="headerinfo">调用API配置</div>
            <div class="apiul">
              <ul>
                <li>应用数据表名查询API地址</li>
                <li>应用数据表字段查询API地址</li>
                <li>应用OauthAPI前缀地址（登出/注销）</li>
                <li>应用日志查询API地址</li>
              </ul>
              <ul class="colorul">
                <li>http://download.oracle.com/javase/7/docs/api/</li>
                <li>http://download.oracle.com/javase/7/docs/api/</li>
                <li>http://download.oracle.com/javase/7/docs/api/</li>
                <li>http://download.oracle.com/javase/7/docs/api/</li>
              </ul>
            </div>
          </el-form>
        </div>
        <div class="dialog_right">
          <div style="height: 50%">
            <div style="display: flex; justify-content: space-between">
              <div class="headerinfo">授权角色</div>
              <el-button size="mini" type="primary" @click="choiceRoles()">选择角色</el-button>
            </div>
            <el-row>
              <el-col :span="24">
                <el-table :data="rolesTable" ref="roleTable" style="width: 100%" border>
                  <el-table-column type="index" label="序号" width="50"> </el-table-column>
                  <el-table-column prop="roleName" label="角色名称"> </el-table-column>
                  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button size="mini" type="text" @click="handleUpdate(scope.row)">查看已授权用户</el-button>
                      <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div style="height: 50%">
            <div style="display: flex; justify-content: space-between">
              <div class="headerinfo">授权组织机构</div>
              <el-button size="mini" type="primary" @click="choiceDepts()">选择机构</el-button>
            </div>
            <el-row>
              <el-col :span="24">
                <el-table :data="deptsTable" ref="organizationTable" style="width: 100%" border>
                  <el-table-column type="index" label="序号" width="50"> </el-table-column>
                  <el-table-column prop="deptName" label="组织机构名称"> </el-table-column>
                  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button size="mini" type="text" @click="handleUpdate(scope.row)">查看已授权用户</el-button>
                      <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div style="text-align: right">
        <el-button type="primary" @click="submitFormadd">保 存</el-button>
        <el-button @click="canceladd" class="cancelBtn">取 消</el-button>
      </div>
    </pagePanel>
    <!-- 选择角色对话框 -->
    <el-dialog :title="title" :visible.sync="choiceRole" width="800px" append-to-body :close-on-click-modal="false">
      <el-table
        :data="roleOptions"
        ref="multipleTable"
        style="width: 100%"
        class="pertable"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"> </el-table-column>
        <el-table-column type="index" label="序号" width="100" align="center"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"> </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="choiceRoles"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelRole" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择机构对话框 -->
    <el-dialog :title="title" :visible.sync="choiceDept" width="800px" append-to-body :close-on-click-modal="false">
      <el-table
        :data="deptList"
        row-key="deptId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-expand-all="isExpandAll"
        @selection-change="handleSelectionChange1"
      >
        <el-table-column type="selection" width="100" align="center"> </el-table-column>
        <el-table-column type="index" label="序号" width="100" align="center"> </el-table-column>
        <el-table-column prop="deptName" label="部门名称" width="500" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormdept">确 定</el-button>
        <el-button @click="canceldept" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新建分类对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="addpost"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="postFormRef" :model="postForm" :rules="postRules" label-width="80px">
        <el-form-item label="分类名称" prop="postName">
          <el-input v-model="postForm.postName" placeholder="请输入分类名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPostForm">确 定</el-button>
        <el-button @click="postCancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import { addApp } from '@/api/intelligentOilfield/system/app';
import { getUser } from '@/api/intelligentOilfield/system/user';
import { listDept } from '@/api/intelligentOilfield/system/dept';

export default {
  name: 'Profile',
  data() {
    return {
      imageUrl: '',
      addtableApp: [{ roleName: 123 }, { roleName: 153 }, { roleName: 12553 }],
      addpost: false,
      title: '',
      appList: [],
      postOptions: [], // 应用分类
      choiceRole: false,
      choiceDept: false,
      rolesTable: [],  // 选择角色表格
      roleOptions: [],  // 选择角色弹框表格
      deptsTable: [],
      deptsOptions: [],
      // 表格树数据
      deptList: [],
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 总条数
      total: 0,
      form: {
        appId: '',
        appName: '',
        appType: '',
        apply: [], // 应用中心，传数字
        appImg: '',
        appStatus: '',
        accessType: '', // 访问类型
        accessUrl: '',
        androidScheme: '',
        iosScheme: '',
        roleIds: [], // 授权角色
        deptIds: [],  // 授权机构
        
      },
      postForm: {postName: ''},
      // 岗位表单校验
      postRules: {
        postName: [{ required: true, message: '输入内容不能为空', trigger: 'blur' }],
      },
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
      rules: {
        roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        roleKey: [{ required: true, message: '权限字符不能为空', trigger: 'blur' }],
        roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }],
      },
    };
  },
  methods: {
    /** 查询组织列表 */
    // gettreeList() {
    //   this.loading = true;
    //   listDept(this.queryParams).then((response) => {
    //     this.deptList = this.handleTree(response.data.data, 'deptId');
    //     this.loading = false;
    //   });
    // },
    // 选择角色
    choiceRoles() {
      this.title = '选择角色';
      this.choiceRole = true;
      getUser().then((response) => {
        this.roleOptions = response.data.roles;
        this.total = response.data.roles.length;
      });
    },
    // 选择机构
    choiceDepts() {
      this.title = '选择组织机构';
      this.choiceDept = true;
      listDept().then((response) => {
        this.deptList = this.handleTree(response.data.data, 'deptId');
      });
    },
    // 多选框选中数据（选择角色）
    handleSelectionChange(selection) {
      this.form.roleIds = selection.map((item) => item.roleId);
      this.rolesTables = selection;
    },
    // 多选框选中数据（选择机构）
    handleSelectionChange1(selection){
      this.form.deptIds = selection.map((item) => item.roleId);
      this.deptsTables = selection;
    },
    // 保存（选择机构）
    submitFormdept(){
      this.choiceDept = false;
      this.deptsTable = this.deptsTables;
    },
    // 新建分类
    addPost() {
      this.addpost = true;
      this.title = '新增分类'
    },
    // 确认（新建分类）
    submitPostForm(){
      console.log("1")
    },
    // 取消（新建分类）
    postCancel(){
      this.addpost = false;
    },
    submitForm() {
      this.choiceRole = false;
      this.rolesTable = this.rolesTables;
    },
    // 取消(选择角色)
    cancelRole() {
      this.choiceRole = false;
    },
    // 取消（选择机构）
    canceldept() {
      this.choiceDept = false;
    },
    // 保存
    submitFormadd() {
      addApp(this.form).then((response) => {
        console.log(response)
        this.$modal.msgSuccess('新增成功');
      });
    },
    // 取消
    canceladd() {
      console.log("1")
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/JPG';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleUpdate(row) {
      console.log(row)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(row)
      // this.$modal
      //   .confirm(`是否确认删除角色编号为"${row.roleId}"的数据项？`)
      //   .then(() => {
          
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
  },
};
</script>
  <style lang="less" scoped>
.app-container {
  height: 100%;
}
.dialog_box {
  width: 100%;
  height: calc(100% - 95px);
  display: flex;
  padding-top: 10px;
}
.dialog_left {
  width: 50%;
  height: 100%;
  overflow: scroll;
  border-right: 1px dashed #6c73fa;
  margin-right: 10px;
  padding-right: 10px;
}
.dialog_right {
  width: 50%;
  height: 100%;
  overflow: scroll;
}
.apiul {
  display: flex;
  width: 100%;
  ul {
    width: 50%;
    li {
      border: 1px solid var(--lightBlueColor);
      padding: 10px;
    }
  }
  li:not(:last-child) {
    border-bottom: none;
  }
  .colorul {
    color: var(--lightBlueColor);
  }
}
</style>