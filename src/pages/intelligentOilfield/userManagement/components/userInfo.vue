<template>
  <div>
    <!-- 添加岗位对话框 -->
    <el-dialog
      :title="postForm.title"
      :visible.sync="postForm.open"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="postFormRef" :model="postForm" :rules="postRules" label-width="80px">
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="postForm.postName" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="postForm.postCode" placeholder="请输入编码名称" />
        </el-form-item>
        <el-form-item label="岗位顺序" prop="postSort">
          <el-input-number v-model="postForm.postSort" controls-position="right" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPostForm">确 定</el-button>
        <el-button @click="postCancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
    <el-form ref="formRef" :model="tempUser" :rules="rules" label-width="80px">
      <div class="headerinfo">基础信息</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名称" prop="nickName">
            <el-input v-model="tempUser.nickName" @input="refreshSelect" placeholder="请输入用户名称" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户角色" prop="roleIds">
            <el-select
              v-model="tempUser.roleIds"
              @change="refreshSelect"
              multiple
              placeholder="请选择用户角色"
              collapse-tags
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户岗位">
            <div style="display: flex">
              <el-select v-model="tempUser.tempPostId" placeholder="请选择用户岗位" @change="refreshSelect">
                <el-option
                  v-for="item in tempPostOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
              <el-button type="primary" @click="addPost" style="margin-left: 10px">新增岗位</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构" prop="deptId">
            <treeselect
              v-model="tempUser.deptId"
              :options="deptOptions"
              :show-count="true"
              placeholder="请选择所属机构"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="headerinfo">账号信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户账号" prop="userName">
            <el-input @input="refreshSelect" v-model="tempUser.userName" placeholder="请输入用户账号" maxlength="30" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="账号邮箱" prop="email">
            <el-input @input="refreshSelect" v-model="tempUser.email" placeholder="请输入账号邮箱" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户手机" prop="phonenumber">
            <el-input
              @input="refreshSelect"
              v-model="tempUser.phonenumber"
              placeholder="请输入手机号码"
              maxlength="11"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号类型" prop="userType">
            <el-select v-model="tempUser.userType" placeholder="请选择账号类型" @change="refreshSelect">
              <el-option
                v-for="(item, index) in accountType"
                :key="index"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="用户名称" prop="nickName">
      <el-input v-model="tempUser.nickName" maxlength="30" /> 
    </el-form-item> 
    <el-form-item label="手机号码" prop="phonenumber">
      <el-input v-model="tempUser.phonenumber" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="tempUser.email" maxlength="50" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="tempUser.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
     -->
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button type="danger" size="mini" @click="reset('formRef')" class="cancelBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from '@/api/intelligentOilfield/system/user';
import { treeselect } from '@/api/intelligentOilfield/system/dept';
import Treeselect from '@riophae/vue-treeselect';
import { listPost, addPost } from '@/api/intelligentOilfield/system/post';

export default {
  components: { Treeselect },
  props: {
    user: {
      type: Object,
    },
    // 角色选项
    roleOptions: {
      default: undefined,
    },
    postOptions: {
      default: undefined,
    },
  },
  data() {
    return {
      tempPostOptions: this.postOptions,
      tempUser: {},
      // 添加岗位参数
      postForm: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: '新增岗位',
        // 岗位名称
        postName: '',
        // 岗位编码
        postCode: '',
        // 岗位顺序
        postSort: 0,
        status: '0',
      },
      // 账号类型
      accountType: [
        { label: '集团账号', value: 0 },
        { label: '普通账号', value: 1 },
      ],
      deptOptions: [],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: '用户账号不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' },
        ],

        nickName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
        deptId: [{ required: true, message: '所属机构不能为空', trigger: 'blur' }],
        roleIds: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
        userType: [{ required: true, message: '账号类型不能为空', trigger: 'blur' }],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change'],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          },
        ],
      },
      // 岗位表单校验
      postRules: {
        postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
        postCode: [{ required: true, message: '岗位编码不能为空', trigger: 'blur' }],
        postSort: [{ required: true, message: '岗位顺序不能为空', trigger: 'blur' }],
      },
    };
  },
  // computed: {
  //   tempUser() {
  //     console.log('user===', this.user);
  //     //   return { ...this.user.data, ...this.user};
  //     return {
  //       userId: this.user.data?.userId,
  //       deptId: this.user.data?.deptId,
  //       userName: this.user.data?.userName,
  //       nickName: this.user.data?.nickName,
  //       phonenumber: this.user.data?.phonenumber,
  //       email: this.user.data?.email,
  //       sex: this.user.data?.sex,
  //       status: '0',
  //       remark: this.user.data?.remark,
  //       postIds: this.user.postIds,
  //       roleIds: this.user.roleIds,
  //       tempPostId: this.user.tempPostId, // 临时的用户岗位
  //       userType: this.user.data?.userType, // 账号类型
  //     };
  //   },
  // },
  watch: {
    user: {
      handler(newVal) {
        this.tempUser = {
          userId: newVal.data?.userId,
          deptId: newVal.data?.deptId,
          userName: newVal.data?.userName,
          nickName: newVal.data?.nickName,
          phonenumber: newVal.data?.phonenumber,
          email: newVal.data?.email,
          sex: newVal.data?.sex,
          status: '0',
          remark: newVal.data?.remark,
          postIds: newVal.postIds,
          roleIds: newVal.roleIds.toLocaleString().split(','),
          tempPostId: String(newVal.tempPostId.toLocaleString()), // 临时的用户岗位
          userType: newVal.data?.userType, // 账号类型
        };
        // console.log(this.tempUser);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getTreeselect();
    this.getPostList();
  },
  methods: {
    // 增加岗位取消按钮
    postCancel() {
      this.postForm.open = false;
      this.postForm.postName = '';
      this.postForm.postCode = '';
      this.postForm.postSort = 0;
    },
    /** 提交增加岗位操作 */
    submitPostForm() {
      this.$refs.postFormRef.validate((valid) => {
        if (valid) {
          addPost(this.postForm).then((response) => {
            if (response ? response.data.code === 200 : false) {
              this.$modal.msgSuccess('新增成功');
              this.postCancel();
              this.getPostList();
            }
          });
        }
      });
    },
    /** 获取用户岗位 */
    getPostList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      listPost(params).then((response) => {
        console.log('岗位结果==', response);
        this.tempPostOptions = response.data.rows;
      });
    },
    /** 新增岗位 */
    addPost() {
      this.postForm.open = true;
    },
    // 强制刷新
    refreshSelect() {
      this.$forceUpdate();
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data.data;
      });
    },
    submit() {
      this.tempUser.postIds = [];
      this.tempUser.postIds.push(this.tempUser.tempPostId);
      //   console.log(' this.tempUser',  this.tempUser);
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          updateUser(this.tempUser).then((res) => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess('修改成功');
              this.$emit('updateList');
            }
          });
        }
      });
    },
    // close() {
    //   this.$tab.closePage();
    // },
    // 重置内容
    reset(formRef) {
      this.$emit('updateList');
      this.$refs[formRef].resetFields();
    },
  },
};
</script>
