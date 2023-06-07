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
      <el-form
        ref="postFormRef"
        :model="postForm"
        :rules="postRules"
        label-width="80px"
      >
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
        <el-button type="primary" @click="submitPostForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="postCancel">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <el-form
      ref="formRef"
      :model="tempUser"
      :rules="rules"
      label-width="80px"
      class="userInfo"
    >
      <div class="headerinfo" style="margin-bottom: 30px">
        账号
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户姓名" prop="nickName">
            <el-input
              v-model="tempUser.nickName"
              disabled
              placeholder="暂无数据"
              maxlength="30"
              @input="refreshSelect"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户账号" prop="userName">
            <el-input
              v-model="tempUser.userName"
              disabled
              placeholder="暂无数据"
              maxlength="30"
              @input="refreshSelect"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账号类型" prop="userType">
            <el-input
              v-model="tempUser.userType"
              disabled
              placeholder="暂无数据"
              maxlength="11"
              @input="refreshSelect"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号邮箱" prop="email">
            <el-input
              v-model="tempUser.email"
              disabled
              placeholder="暂无数据"
              maxlength="50"
              @input="refreshSelect"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户手机" prop="phonenumber">
            <el-input
              v-model="tempUser.phonenumber"
              disabled
              placeholder="暂无数据"
              maxlength="11"
              @input="refreshSelect"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证" prop="idCard">
            <div>
              <el-input
                v-model="convertIdCard"
                placeholder="暂无数据"
                maxlength="30"
                disabled
              />
              <el-tooltip
                v-if="tempUser.userId === $store.getters['user/userDetail'].user.userId"
                class="item"
                effect="dark"
                content="点击一下小眼睛显示全部"
                placement="bottom"
              >
                <i class="searchStyle el-icon-view" @click="showOrHidden" />
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属机构" prop="deptId">
            <el-input
              v-model="tempUser.deptName"
              disabled
              placeholder="暂无数据"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属租户" prop="deptId">
            <el-input
              v-model="tempUser.tenantName"
              disabled
              placeholder="暂无数据"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="headerinfo" style="margin-bottom: 30px">
        角色与岗位信息
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户角色" prop="roleIds">
            <el-select
              v-model="tempUser.roleIds"
              disabled
              multiple
              class="customSelect"
              placeholder="暂无角色"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户岗位">
            <!-- <el-select
              v-model="tempUser.postIds"
              disabled
              multiple
              class="customSelect"
              placeholder="暂无岗位"
            >
              <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
              />
            </el-select> -->
            <el-select
              v-model="tempUser.tempPostId"
              disabled
              class="customSelect"
              placeholder="暂无岗位"
            >
              <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from "@/api/intelligentOilfield/system/user";
import { treeselect } from "@/api/intelligentOilfield/system/dept";
import { listPost, addPost } from "@/api/intelligentOilfield/system/post";
import returnPaterPage from "@/utils/returnPaterPage";

export default {
  dicts: ["sys_user_account_type"],
  filters: {
    filterShow(val) {
      return val?.replace(/^(.{0})(?:\d+)(.{4})$/, "\$1**************\$2");
    }
  },
  props: {
    user: {
      type: Object
    },
    // 角色选项
    roleOptions: {
      type: Array,
      default: () => []
    },
    postOptions: {
      type: Array,
      default: () => []
    },
    // 租户信息
    sysTenants: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 身份证输入框是否可见
      isInputDisable: true,
      tempPostOptions: this.postOptions,
      tempUser: {},
      // 添加岗位参数
      postForm: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: "新增岗位",
        // 岗位名称
        postName: "",
        // 岗位编码
        postCode: "",
        // 岗位顺序
        postSort: 0,
        status: "0"
      },
      // 账号类型
      // accountType: [
      //   { label: '集团账号', value: 0 },
      //   { label: '普通账号', value: 1 },
      // ],
      deptOptions: [],
      // 表单校验
      rules: {
        userName: [
          { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        idCard: [
          //   { min: 8, max: 20, message: '用户密码长度必须介于 8 和 20 之间', trigger: 'blur' },
          {
            pattern:
              /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
            message: "请输入正确的身份证号，支持1代（15位）和2代（18位）"
          }
        ]
      },
      // 岗位表单校验
      postRules: {
        postName: [{ required: true, message: "岗位名称不能为空", trigger: "blur" }],
        postCode: [{ required: true, message: "岗位编码不能为空", trigger: "blur" }],
        postSort: [{ required: true, message: "岗位顺序不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    convertIdCard: {
      get() {
        if (this.isInputDisable) {
          return this.tempUser.idCard?.replace(/^(.{0})(?:\d+)(.{4})$/, "\$1**************\$2");
        }
        return this.tempUser.idCard;
      },
      set(val) {
        this.tempUser.idCard = val;
      }
    },
    showroleIds() {
      const arr = [];
      this.tempUser.roleIds.forEach(item => {
        this.roleOptions.filter(item2 => item2.roleId === item).forEach(item3 => arr.push(item3.roleName));
      });
      return arr.join("、");
    },
    showpostIds() {
      const arr = [];
      this.tempUser.postIds.forEach(item => {
        this.postOptions.filter(item2 => item2.postId === item).forEach(item3 => arr.push(item3.postName));
      });
      return arr.join("、");
    }
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
          deptName: newVal.data?.dept !== null ? newVal.data?.dept.deptName : "暂无数据",
          userName: newVal.data?.userName,
          nickName: newVal.data?.nickName,
          phonenumber: newVal.data?.phonenumber,
          email: newVal.data?.email,
          sex: newVal.data?.sex,
          status: "0",
          remark: newVal.data?.remark,
          idCard: newVal.data?.idCard,
          //   postIds: newVal.postIds,
          tempPostId: newVal.postIds?.length === 0 ? [] : String(newVal.postIds?.toLocaleString()),
          postIds: newVal.postIds?.length === 0 ? [] : newVal.postIds?.toLocaleString().split(","),
          roleIds: newVal.roleIds?.length === 0 ? [] : newVal.roleIds?.toLocaleString().split(","),
          //   tempPostId: String(newVal.tempPostId.toLocaleString()), // 临时的用户岗位
          userType: newVal.data?.userType, // 账号类型
          tenantName: newVal.tenants?.length === 0 ? "" : newVal.tenants?.map(item => item.tenantName).toLocaleString()
        };
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getTreeselect();
    this.getPostList();
  },
  methods: {
    // 增加岗位取消按钮
    postCancel() {
      this.postForm.open = false;
      this.postForm.postName = "";
      this.postForm.postCode = "";
      this.postForm.postSort = 0;
    },
    /** 提交增加岗位操作 */
    submitPostForm() {
      this.$refs.postFormRef.validate(valid => {
        if (valid) {
          addPost(this.postForm).then(response => {
            if (response ? response.data.code === 200 : false) {
              this.$modal.msgSuccess("新增成功");
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
        pageSize: 10
      };
      listPost(params).then(response => {
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
      treeselect().then(response => {
        this.deptOptions = response.data.data;
      });
    },
    /** 显示/隐藏身份证操作 */
    showOrHidden() {
      this.isInputDisable = !this.isInputDisable;
    },
    submit() {
      //   this.tempUser.postIds = [];
      //   this.tempUser.postIds.push(this.tempUser.tempPostId);
      this.tempUser.postIds = this.tempUser.tempPostId ? this.tempUser.tempPostId?.split(",") : [];
      this.$refs.formRef.validate(valid => {
        if (valid) {
          updateUser(this.tempUser).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess("修改成功");
              this.$emit("updateList");

              returnPaterPage(this.$route.path, "User");
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
      this.$emit("updateList");
      this.$refs[formRef].resetFields();
    }
  }
};
</script>
<style scoped lang="less">
.searchStyle {
  position: absolute;
  top: 10px;
  right: 8px;
  color: var(--light-blue-color);
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.spanshow {
  display: inline-block;
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-form {
  /deep/ .el-input.is-disabled .el-input__inner {
    color: var(--td-text-color-primary);
  }
}

/deep/ .customSelect {
  max-height: 96px !important;
  width: 100% !important;
}

/deep/ .customSelect .el-select__tags .el-tag.el-tag--info {
  background: var(--select-tag-info) !important;
  border: unset !important;
  color: #83939b;
}

/deep/ .customSelect .el-select__tags {
  max-width: unset !important;
  padding: 0 5px !important;
  max-height: 86px !important;
  overflow: auto !important;
  align-content: flex-start !important;
}

/deep/ .el-tag {
  color: #6f858f
}

/deep/ .customSelect .el-input--suffix {
  max-height: 96px !important;
}

/deep/ .el-select .el-input {
  background: rgba(22, 53, 70, 1) !important;
  border: 1px solid var(--select-input-border) !important;
}

/deep/ .el-select .el-input .el-select__caret {
  color: transparent !important;
}

/deep/ .customSelect .el-input.is-disabled .el-input__inner {
  border: unset !important;
}
</style>