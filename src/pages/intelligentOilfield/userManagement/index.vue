<!-- 后台——用户管理 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col
        :span="4"
        :xs="24"
        class="left"
        style="overflow: scroll;"
      >
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 10px; height: 40px"
          />
        </div>
        <div class="head-container" style="overflow: auto;">
          <el-tree
            ref="tree"
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24" class="right">
        <header-search class="g-w100 g-h100">
          <el-form
            v-show="showSearch"
            ref="queryForm"
            :model="queryParams"
            style="margin-top: 20px"
            :inline="true"
            label-width="68px"
          >
            <el-form-item label="用户账号" prop="userName">
              <el-input
                v-model="queryParams.userName"
                placeholder="请输入用户账号"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="用户名" prop="nickName">
              <el-input
                v-model="queryParams.nickName"
                placeholder="请输入用户名"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="用户租户" prop="tenantName">
              <el-select
                v-model="queryParams.tenantName"
                style="width: 240px"
                placeholder="请选择用户租户"
                collapse-tags
                clearable
              >
                <el-option
                  v-for="item in teantOptions"
                  :key="item.tenantId"
                  :label="item.tenantName"
                  :value="item.tenantName"
                />
              </el-select>
            </el-form-item>
            <!-- TODO: Maybe change back -->
            <!-- <el-form-item label="用户角色" prop="roleId">
              <el-select
                v-model="queryParams.roleId"
                style="width: 240px"
                placeholder="请选择用户角色"
                clearable
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="用户岗位" prop="postId">
              <el-select
                v-model="queryParams.postId"
                style="width: 240px"
                placeholder="请选择用户岗位"
                collapse-tags
                clearable
              >
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="所属机构" prop="deptId">
              <treeselect v-model="queryParams.deptId" style="width: 240px" :options="deptOptions" :show-count="true" placeholder="请选择所属机构" />
                    </el-form-item> -->
            <!-- <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in dict.type.sys_normal_disable"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
                  </el-form-item> -->
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                style="height: 40px"
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
        </header-search>

        <!-- v-loading="loading" -->
        <page-panel-new header-title="用户管理" style="height: calc(100% - 106px);">
          <el-row style="margin-bottom: 20px">
            <el-col :span="20">
              <el-button
                v-hasPermi="['system:user:add']"
                type="primary"
                size="mini"
                style="height: 40px"
                @click="handleAdd"
              >
                新增
              </el-button>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-button
                v-hasPermi="['system:user:import']"
                class="commonBtn"
                size="mini"
                @click="handleImport"
              >
                导入
              </el-button>
              <el-button
                v-hasPermi="['system:user:export']"
                class="commonBtn"
                size="mini"
                @click="handleExport"
              >
                导出
              </el-button>
            </el-col>
          </el-row>
          <el-table
            :data="userList"
            height="calc(100% - 108px)"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '2px', 'text-align': 'center' }"
            style="width: 100%; height: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="序号" type="index" width="50" />
            <!-- <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" /> -->
            <el-table-column
              v-if="columns[0].visible"
              key="userName"
              label="用户账号"
              align="center"
              prop="userName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              v-if="columns[4].visible"
              key="nickName"
              label="用户名称"
              align="center"
              prop="nickName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              v-if="columns[1].visible"
              label="用户角色"
              align="center"
              :show-overflow-tooltip="true"
              width="173"
            >
              <template slot-scope="scope">
                <div class="textOverFlow">
                  <span v-for="(item, indexRow) in scope.row.roles" :key="indexRow">
                    {{ item.roleName + (indexRow === scope.row.roles.length - 1 ? '' : '，') }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[2].visible"
              label="用户岗位"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div class="textOverFlow">
                  <span v-for="(item, indexRow) in scope.row.posts" :key="indexRow">
                    {{ item.postName + (indexRow === scope.row.posts.length - 1 ? '' : '，') }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" /> -->
            <el-table-column
              v-if="columns[3].visible"
              key="deptName"
              label="所属机构"
              align="center"
              prop="dept.deptName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              v-if="columns[5].visible"
              key="userTenant"
              label="用户租户"
              align="center"
              prop="tenantName"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.sysTenants.length > 1" style="height: auto;">
                  <p v-for="(item,index) in scope.row.sysTenants" :key="index">
                    {{ item.tenantName }} <br>
                  </p>
                </div>
                <div v-else>
                  {{ scope.row.sysTenants.length === 1 ? scope.row.sysTenants[0].tenantName : "" }}
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" /> -->
            <el-table-column
              v-if="columns[6].visible"
              key="status"
              label="用户状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
                  </el-table-column> -->
            <!-- TODO: Maybe change back -->
            <!-- <el-table-column
              label="账号信息"
              align="center"
              width="160"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['system:user:edit']"
                  size="mini"
                  type="text"
                  @click="seeDetail(scope.row)"
                >
                  查看账号信息
                </el-button>
              </template>
            </el-table-column> -->
            <el-table-column
              label="操作"
              align="center"
              width="280"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['system:user:edit']"
                  size="mini"
                  type="text"
                  @click="seeDetail(scope.row)"
                >
                  查看账号信息
                </el-button>
                <el-button
                  v-hasPermi="['system:user:edit']"
                  size="mini"
                  type="text"
                  @click="handleUpdate(scope.row)"
                >
                  修改
                </el-button>
                <el-button
                  v-if="scope.row.userId !== '1'"
                  v-hasPermi="['system:user:remove']"
                  size="mini"
                  type="text"
                  class="delbutton"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
                <el-dropdown
                  v-hasPermi="['system:user:resetPwd', 'system:user:edit']"
                  size="mini"
                  style="margin-left: 20px;"
                  @command="(command) => handleCommand(command, scope.row)"
                >
                  <span class="el-dropdown-link">更多</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-hasPermi="['system:user:resetPwd']"
                      command="handleResetPwd"
                      icon="el-icon-key"
                    >
                      重置密码
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-hasPermi="['system:user:edit']"
                      command="handleAuthRole"
                      icon="el-icon-circle-check"
                    >
                      分配角色
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-hasPermi="['system:user:appRole']"
                      command="handleAppRole"
                      icon="el-icon-user"
                    >
                      分配应用角色
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
        </page-panel-new>
      </el-col>
    </el-row>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="900px"
      append-to-body
      :close-on-click-modal="false"
      @close="closeDialog('form')"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <div class="headerinfo">
          账号
        </div>
        <el-row type="flex" justify="start" style="margin-top: 30px">
          <el-col :span="8">
            <el-form-item label="用户名称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户账号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户账号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号类型" prop="userType">
              <el-select
                v-model="form.userType"
                placeholder="请选择账号类型"
                clearable
                class="g-w100"
              >
                <el-option
                  v-for="dict in dict.type.sys_user_account_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" style="margin: 15px 0">
          <el-col :span="8">
            <el-form-item label="账号邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入账号邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户手机" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证" prop="idCard">
              <div v-if="form.userId===$store.getters['user/userDetail'].user.userId||title==='新增用户'">
                <el-input
                  v-model="convertIdCard"
                  placeholder="请输入身份证"
                  maxlength="30"
                  :disabled="isInputDisable"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击后可查看或编辑身份证信息"
                  placement="bottom"
                >
                  <i v-if="title!=='新增用户'" class="searchStyle el-icon-view" @click="showOrHidden" />
                </el-tooltip>
              </div>

              <span v-else>{{ form.idCard?form.idCard:'暂无数据' | filterShow }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <el-row type="flex" justify="start">
          <el-col :span="8">
            <el-form-item label="所属机构" prop="deptId">
              <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择所属机构"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="form.userId == undefined" :span="8">
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
          <el-col :span="8">
            <el-form-item v-if="form.userId == undefined" label="确认密码" prop="surePassword">
              <el-input
                v-model="form.surePassword"
                placeholder="请输入确认密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="headerinfo" style="margin-bottom: 30px">
          角色与岗位信息
        </div>
        <el-form-item label="用户角色" prop="roleIds">
          <el-select
            v-model="form.roleIds"
            style="margin-bottom: 20px"
            filterable
            class="customSelect"
            multiple
            placeholder="请选择用户角色"
            clearable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户岗位">
          <el-select
            v-model="form.postIds"
            filterable
            class="customSelect"
            multiple
            placeholder="请选择用户岗位"
            clearable
            @change="changePost"
          >
            <el-option
              v-for="item in postOptions"
              :key="item.postId"
              :label="item.postName"
              :value="item.postId"
              :disabled="item.status == 1"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancel('form')">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改密码（带原密码，确认密码）-暂时不用 -->
    <el-dialog
      title="修改密码"
      :visible.sync="updatePwd.open"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="updatePwdForm"
        :model="updatePwd"
        :rules="pwdRules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前密码" prop="initPwd">
              <el-input
                v-model="updatePwd.initPwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入当前密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="修改密码" prop="updatePwd">
              <el-input
                v-model="updatePwd.updatePwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入修改密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="surePwd">
              <el-input
                v-model="updatePwd.surePwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureUpdatePwd">
          确 定
        </el-button>
        <!-- <el-button @click="upload.open = false" class="cancelBtn">取 消</el-button> -->
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip text-center">
          <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
          >
            下载模板
          </el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="upload.open = false">
          取 消
        </el-button>
      </div>
    </el-dialog>

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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus
} from "@/api/intelligentOilfield/system/user";
import { listPost, addPost } from "@/api/intelligentOilfield/system/post";
// import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/intelligentOilfield/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import proxy from "@/config/host";
import { getCodeImg } from "@/api/intelligentOilfield/login";
import { encryptlogin } from "@/utils/jsencrypt";
import { getInfoByCode } from "@/api/intelligentOilfield/system/applicationCenter/tenant.js";

export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex", "sys_user_account_type"],
  components: { Treeselect },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 5) {
        return `${value.slice(0, 5)}...`;
      }
      return value;
    },
    filterShow(val) {
      return val?.replace(/^(.{0})(?:\d+)(.{4})$/, "\$1**************\$2");
    }
  },
  data() {
    // 确认密码与修改密码一致函数
    const equalToPassword = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      // 身份证输入框是否可见
      isInputDisable: false,
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 租户
      teantOptions: [],
      // 账号类型
      // accountType: [
      //   { label: '集团账号', value: 0 },
      //   { label: '普通账号', value: 1 },
      // ],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 修改密码
      updatePwd: {
        // 是否显示弹出层
        open: false,
        // 当前密码
        initPwd: "",
        // 修改密码
        updatePwd: "",
        // 确认密码
        surePwd: "",
        // 修改密码的row
        updatePwdRow: null
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // headers: { Authorization: `Bearer ${  getToken()}` },
        headers: { Authorization: `Bearer ${this.$store.getters["user/token"]}` },
        // 上传的地址
        url: `${proxy.development.API}/system/user/importData`
      },
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        roleId: undefined,
        postId: undefined,
        nickName: undefined,
        tenantName: undefined
      },
      // 列信息
      columns: [
        { key: 0, label: "用户名称", visible: true },
        { key: 1, label: "用户角色", visible: true },
        { key: 2, label: "用户岗位", visible: true },
        { key: 3, label: "所属机构", visible: true },
        { key: 4, label: "用户名", visible: true },
        { key: 5, label: "租户", visible: true },
        { key: 6, label: "用户状态", visible: true }
      ],
      // 岗位表单校验
      postRules: {
        postName: [{ required: true, message: "岗位名称不能为空", trigger: "blur" }],
        postCode: [{ required: true, message: "岗位编码不能为空", trigger: "blur" }],
        postSort: [{ required: true, message: "岗位顺序不能为空", trigger: "blur" }]
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
        ],
        nickName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          //   { min: 8, max: 20, message: '用户密码长度必须介于 8 和 20 之间', trigger: 'blur' },
          {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F])[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{12,20}$/,
            message: "必须包含大小写字母，数字和特殊字符，且字符在12到20之间"
          }
        ],
        surePassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
        deptId: [{ required: true, message: "所属机构不能为空", trigger: "blur" }],
        roleIds: [{ required: true, message: "用户角色不能为空", trigger: "blur" }],
        userType: [{ required: true, message: "账号类型不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
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
          // { required: true, message: "身份证不能为空", trigger: "blur" },
          //   { min: 8, max: 20, message: '用户密码长度必须介于 8 和 20 之间', trigger: 'blur' },
          {
            pattern:
              /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
            message: "请输入正确的身份证号，支持1代（15位）和2代（18位）"
          }
        ]
      },
      // 密码校验
      pwdRules: {
        initPwd: [{ required: true, message: "当前密码不能为空", trigger: "blur" }],
        updatePwd: [
          { required: true, message: "修改密码不能为空", trigger: "blur" },
          { min: 12, max: 20, message: "密码长度必须介于 12 和 20 之间", trigger: "blur" }
        ],
        surePwd: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    }),
    convertIdCard: {
      get() {
        if (this.isInputDisable) {
          return this.form.idCard?.replace(/^(.{0})(?:\d+)(.{4})$/, "\$1**************\$2");
        }
        return this.form.idCard;
      },
      set(val) {
        this.form.idCard = val;
      }
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getUserDetail();
    this.getPostList();
    this.getTreeselect();
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.data.msg;
    });
  },
  methods: {
    changePost() {
      this.$forceUpdate();
    },
    /** 新增岗位 */
    addPost() {
      this.postForm.open = true;
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      //   console.log('121212', this.addDateRange(this.queryParams, this.dateRange))
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => this.getDeptOptions(response.data.data))
        .then(response => {
          this.deptOptions = response;
          this.getList();
        });
    },
    /**
     * 如果是租户管理员则只能看到对应部门下的数据
     */
    getDeptOptions(data) {
      if (this.userInfo.userName !== "admin" && this.userInfo.isTenantAdmin && this.userInfo.currentTenantCode) {
        return getInfoByCode(this.userInfo.currentTenantCode)
          .then(v => {
            const { deptId } = v.data.data;
            const getCurrentDeptDataByLoop = function(data, deptId) {
              let re;
              for (let i = 0; i < data.length; i++) {
                if (data[i].id === deptId) {
                  re = data[i];
                }
                if (!re && data[i].children?.length > 0) {
                  re = getCurrentDeptDataByLoop(data[i].children, deptId);
                }
                if (re) {
                  break;
                }
              }
              return re;
            };
            const re = getCurrentDeptDataByLoop(data, deptId);
            if (re) {
              this.queryParams.deptId = re.id;
              return [re];
            }
            return [];
          });
      }
      return Promise.resolve(data);
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      const text = row.status === "0" ? "启用" : "停用";
      this.$modal
        .confirm(`确认要"${text}""${row.userName}"用户吗？`)
        .then(() => changeUserStatus(row.userId, row.status))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.$modal.msgSuccess(`${text}成功`);
          }
        })
        .catch(() => {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel(formName) {
      this.open = false;
      this.reset();
      this.$refs[formName].resetFields();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
        tempPostId: undefined, // 临时的用户岗位
        userType: "", // 账号类型
        surePassword: undefined,
        idCard: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.deptId = undefined;
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        case "handleAppRole":
          this.handleAppRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.isInputDisable = false;
      this.getTreeselect();
      getUser().then(response => {
        this.postOptions = response.data.posts;
        this.roleOptions = response.data.roles;
        this.open = true;
        this.title = "新增用户";
        this.form.password = this.initPassword;
      });
    },
    /** 获取用户角色和用户岗位 */
    getUserDetail() {
      getUser().then(response => {
        // this.postOptions = response.data.posts;
        this.roleOptions = response.data.roles;
        this.teantOptions = response.data.tenants;
      });
    },
    /** 获取用户岗位 */
    getPostList() {
      const params = {
        pageNum: 1,
        pageSize: 10
      };
      listPost(params).then(response => {
        this.postOptions = response.data.rows;
      });
    },

    /** 查看账号信息操作 */
    seeDetail(row) {
      const tempUserId = row.userId || this.ids;
      this.$router.push({
        name: "userDetail",
        query: { userId: tempUserId, postName: row.posts[0]?.postName, userName: row.userName, pathName: row.userName },
        params: { userId: tempUserId }
      });
    },
    /** 显示/隐藏身份证操作 */
    showOrHidden() {
      this.isInputDisable = !this.isInputDisable;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isInputDisable = true;
      this.getTreeselect();
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        this.form = response.data.data;
        this.form.idCard = response.data.data.idCard;
        this.postOptions = response.data.posts;
        this.roleOptions = response.data.roles;
        this.form.postIds = response.data.postIds.length === 0 ? [] : response.data.postIds.toLocaleString().split(",");
        // this.form.tempPostId = String(response.data.postIds.toLocaleString());
        this.form.roleIds = response.data.roleIds.length === 0 ? [] : response.data.roleIds.toLocaleString().split(",");
        this.open = true;
        this.title = "编辑用户";
        this.form.password = "";
        // console.log('sdsds', this.form.postIds);
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt(`请输入"${row.userName}"的新密码`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern:
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F])[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{12,20}$/,
        inputErrorMessage: "必须包含大小写字母，数字和特殊字符，且字符在12到20之间"
      })
        .then(({ value }) => {
          // resetUserPwd(row.userId, value).then((res) => {
          //   if (res ? res.data.code === 200 : false) {
          //     this.$modal.msgSuccess(`修改成功，新密码是：${value}`);
          //   }
          // });
          getCodeImg().then(res => {
            const { publicKey } = res.data.publicKey;
            resetUserPwd(row.userId, encryptlogin(value, publicKey), row.userName).then(res => {
              if (res ? res.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
              }
            });
          });
        })
        .catch(() => {});
      // 修改密码（带原密码，确认密码）-暂时不用
      //   this.updatePwd.updatePwdRow = row;
      //   this.updatePwd.open = true;
    },
    /** 修改密码（带原密码，确认密码）-暂时不用  */
    sureUpdatePwd() {
      //   const row = this.updatePwd.updatePwdRow
      //   this.$refs.updatePwdForm.validate((valid) => {
      //     if (valid) {
      //     }
      //   });
    },
    /** 分配角色操作 */
    handleAuthRole(row) {
      const { userId } = row;
      this.$router.push({
        name: "AuthRole/:userId",
        params: { userId },
        query: { pathName: row.userName }
      });
    },
    /** 分配应用角色操作 */
    handleAppRole(row) {
      const { userId } = row;
      this.$router.push({
        name: "AppRole/:id",
        params: { id: userId },
        query: { pathName: row.userName }
      });
    },
    /** 提交按钮 */
    submitForm() {
      //   this.form.postIds = [];
      //   this.form.postIds.push(this.form.tempPostId);
      this.queryParams.pageNum = 1;
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.userId !== undefined) {
            updateUser(this.form).then(res => {
              if (res ? res.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            getCodeImg().then(res => {
              const { publicKey } = res.data.publicKey;
              this.form.password = encryptlogin(this.form.password, publicKey);
              this.form.surePassword = encryptlogin(this.form.surePassword, publicKey);
              addUser(this.form).then(res => {
                if (res ? res.data.code === 200 : false) {
                  this.$modal.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                }
              });
            });
            // addUser(this.form).then((res) => {
            //   if (res ? res.data.code === 200 : false) {
            //     this.$modal.msgSuccess('新增成功');
            //     this.open = false;
            //     this.getList();
            //   }
            // });
          }
        }
      });
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
    // 增加岗位取消按钮
    postCancel() {
      this.postForm.open = false;
      this.postForm.postName = "";
      this.postForm.postCode = "";
      this.postForm.postSort = 0;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$modal
        .confirm(`是否确认删除用户编号为"${userIds}"的数据项？`)
        .then(() => delUser(userIds))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.queryParams.pageNum = 1;
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      //   delete this.queryParams.roleId
      //   delete this.queryParams.postId

      this.download(
        "system/user/export",
        {
          ...this.queryParams
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download("system/user/importTemplate", {}, `user_template_${new Date().getTime()}.xlsx`);
    },
    // 文件上传中处理
    handleFileUploadProgress() {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .customSelect {
  max-height: 96px !important;
  width: 100% !important;
}

/deep/ .customSelect .el-select__tags {
  max-height: 86px !important;
  overflow: auto !important;
  align-content: flex-start !important;
}

/deep/ .customSelect .el-input--suffix {
  max-height: 96px !important;
}

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

.textOverFlow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 173px;
}

.el-dialog__body .el-row {
  display: flex;
  justify-content: space-between;
}

.el-table {
  /deep/ .el-table__body {
    .cell {
      height: unset !important;
      line-height: unset !important;
    }
  }
}
</style>