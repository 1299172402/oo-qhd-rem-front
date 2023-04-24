<!-- 后台——设备维护 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px"
      >
        <el-form-item v-show="activeName === 'first'" label="系统名称">
          <el-input
            v-model="queryParams.systemName"
            placeholder="请输入系统名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="系统平台">
          <el-select
            v-model="queryParams.terraceId"
            placeholder="请选择"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index2) in systemPlatformList"
              :key="index2"
              :label="item.terraceName"
              :value="item.terraceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="activeName !== 'first'" label="设备名称">
          <el-input
            v-model="queryParams.equipmentType"
            placeholder="请输入设备名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName !== 'first'" label="设备所属系统">
          <el-select
            v-model="queryParams.systemId"
            placeholder="请选择"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index3) in deviceSysList"
              :key="index3"
              :label="item.systemName"
              :value="item.systemId"
            />
          </el-select>
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
    </header-search>
    <page-panel-new header-title="设备维护列表" style="height: calc(100% - 105px);">
      <el-row style="margin-bottom: 20px">
        <el-col :span="24">
          <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="handleClick">
            <el-tab-pane label="设备系统列表" name="first" />
            <el-tab-pane label="设备名称列表" name="second" />
          </el-tabs>
        </el-col>
        <el-col :span="16">
          <el-button
            v-hasPermi="['system:equipment:add']"
            type="primary"
            size="mini"
            @click="handleAdd"
          >
            新增
          </el-button>
        </el-col>
        <el-col :span="8" style="text-align: right">
          <el-button
            v-hasPermi="['system:equipment:import']"
            type="primary"
            size="mini"
            @click="handleImport"
          >
            导入
          </el-button>
          <el-button
            v-hasPermi="['system:equipment:export']"
            size="mini"
            type="primary"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
      <el-table
        v-show="activeName === 'first'"
        :data="systemList"
        height="calc(100% - 154px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px','text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          prop="systemName"
          label="系统名称"
          width="300"
          align="center"
        />
        <el-table-column
          prop="terraceName"
          label="系统平台"
          width="300"
          align="center"
        />
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
              size="mini"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="activeName === 'second'"
        :data="equipmentList"
        height="calc(100% - 154px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px','text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          prop="equipmentType"
          label="设备名称"
          width="300"
          align="center"
        />
        <el-table-column
          prop="systemName"
          label="设备所属系统"
          width="300"
          align="center"
        />
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
              size="mini"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
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

    <!-- 新增/修改设备系统/设备名称 -->
    <el-dialog
      :title="currentTitle"
      :visible.sync="dialogOpen"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        v-show="activeName === 'first'"
        ref="addSysForm"
        :model="addSysForm"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="系统名称" prop="systemName">
              <el-input v-model="addSysForm.systemName" style="width: 300px" placeholder="请输入系统名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属平台" prop="terraceId">
              <el-select v-model="addSysForm.terraceId" style="width: 300px">
                <el-option
                  v-for="item in systemPlatformList"
                  :key="item.terraceId"
                  :label="item.terraceName"
                  :value="item.terraceId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="activeName !== 'first'"
        ref="addEquForm"
        :model="addEquForm"
        :rules="equRules"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备名称" prop="equipmentType">
              <el-input v-model="addEquForm.equipmentType" style="width: 300px" placeholder="请输入设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备所属系统" prop="systemId">
              <el-select v-model="addEquForm.systemId" style="width: 300px">
                <el-option
                  v-for="(item, index1) in deviceSysList"
                  :key="index1"
                  :label="item.systemName"
                  :value="item.systemId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否监听运行状态" label-width="140px">
              <el-radio-group v-model="addEquForm.passStatus">
                <el-radio v-for="item in dict.type.sys_pass_status" :key="item.value" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancelEdit">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="activeName === 'first' ? '设备系统导入' : '设备名称导入' "
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
        :action="activeName === 'first'? upload.sysUrl + '?updateSupport=' + upload.updateSupport : upload.url + '?updateSupport=' + upload.updateSupport"
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
  </div>
</template>

<script>

import { eqSystemList, addEqSystem, editEqSystem, eqSystemListNoPage, queryEqSystem, getTerrace, removeEqSystem, equipmentList, addEquipment, editEquipment, queryEquipment, removeEquipment } from "@/api/intelligentOilfield/system/equipment";
import proxy from "@/config/host";

export default {
  name: "Equipment",
  dicts: ["sys_pass_status"],
  data() {
    return {
      deviceSysList: [],
      currentTitle: "新增设备系统",
      dialogOpen: false,
      addSysForm: {},
      addEquForm: {},
      // 表单校验
      rules: {
        systemName: [{ required: true, message: "系统名称不能为空", trigger: "blur" }],
        terraceId: [{ required: true, message: "所属平台不能为空", trigger: "blur" }]
      },
      equRules: {
        equipmentType: [{ required: true, message: "设备名称不能为空", trigger: "blur" }],
        systemId: [{ required: true, message: "设备所属系统不能为空", trigger: "blur" }]
      },
      activeName: "first", // first:设备系统列表；second:设备名称列表
      systemPlatformList: [],
      // 遮罩层
      loading: true,
      // 表格数据
      equipmentList: [],
      systemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        systemName: undefined,
        terraceId: undefined,
        equipmentType: undefined,
        systemId: undefined
      },
      // 表单参数
      form: {},
      // 总条数
      total: 0,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
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
        url: `${proxy.development.API}/system/equipment/importData`,
        sysUrl: `${proxy.development.API}/system/eqSystem/importData`
      }
    };
  },
  created() {
    this.getList();
    this.getTerrace();
  },
  methods: {
    getTerrace() {
      getTerrace().then(response => {
        this.systemPlatformList = response.data.data;
      });
      // 获取设备所属系统下拉来源
      eqSystemListNoPage("").then(response => {
        this.deviceSysList = response.data.data;
      });
    },
    handleUpdate(row) {
      this.resetCurrentFields();
      this.dialogOpen = true;
      this.currentTitle = this.activeName === "first" ? "编辑设备系统" : "编辑设备列表";
      if (this.activeName === "first") {
        this.addSysForm.systemId = row.systemId;
        queryEqSystem(this.addSysForm.systemId).then(response => {
          this.addSysForm = response.data.data;
        });
      } else {
        this.addEquForm.equipmentId = row.equipmentId;
        queryEquipment(this.addEquForm.equipmentId).then(response => {
          this.addEquForm = response.data.data;
        });
      }
    },
    handleDelete(row) {
      if (this.activeName === "first") {
        const { systemId } = row;
        this.$modal
          .confirm("是否确认删除该系统？")
          .then(() => removeEqSystem(systemId))
          .then(res => {
            if (res ? res.data.code === 200 : false) {
              this.queryParams.pageNum = 1;
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }
          })
          .catch(() => {});
      } else {
        const { equipmentId } = row;
        this.$modal
          .confirm("是否确认删除该设备？")
          .then(() => removeEquipment(equipmentId))
          .then(res => {
            if (res ? res.data.code === 200 : false) {
              this.queryParams.pageNum = 1;
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }
          })
          .catch(() => {});
      }
    },
    /** 提交按钮 */
    submitForm() {
      if (this.activeName === "first") { // 设备系统
        this.$refs.addSysForm.validate(valid => {
          if (valid) {
            if (!this.addSysForm.systemId) { // 新增
              addEqSystem(this.addSysForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            } else { // 修改
              editEqSystem(this.addSysForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("修改成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            }
          }
        });
      } else { // 设备名称
        this.$refs.addEquForm.validate(valid => {
          if (valid) {
            if (!this.addEquForm.equipmentId) { // 新增
              addEquipment(this.addEquForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            } else { // 修改
              editEquipment(this.addEquForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("修改成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            }
          }
        });
      }
    },
    /** 取消修改 */
    cancelEdit() {
      this.resetCurrentFields();
      this.dialogOpen = false;
    },
    handleAdd() {
      this.resetCurrentFields();
      this.dialogOpen = true;
      this.currentTitle = this.activeName === "first" ? "新增设备系统" : "新增设备列表";
    },
    handleClick() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        systemName: undefined,
        terraceId: undefined,
        equipmentType: undefined,
        systemId: undefined
      };
      this.getList();
      this.resetCurrentFields();
      if (this.activeName !== "first") {
        this.getTerrace();
      }
    },
    resetCurrentFields() {
      if (this.activeName === "first") {
        this.resetForm("addSysForm");
      } else {
        this.resetForm("addEquForm");
      }
      this.addSysForm = {};
      this.addEquForm = {};
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        systemName: undefined,
        terraceId: undefined,
        equipmentType: undefined,
        systemId: undefined
      };
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 查询列表 */
    getList() {
      if (this.activeName === "first") {
        eqSystemList(this.queryParams).then(response => {
          this.systemList = response.data.rows;
          this.total = response.data.total;
        });
      } else {
        equipmentList(this.queryParams).then(response => {
          this.equipmentList = response.data.rows;
          this.total = response.data.total;
        });
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      if (this.activeName === "first") {
        this.ids = selection.map(item => item.systemId);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      } else {
        this.ids = selection.map(item => item.equipmentId);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      }
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      if (this.activeName === "first") {
        this.download("system/eqSystem/importTemplate", {}, `eqSystem_template_${new Date().getTime()}.xlsx`);
      } else {
        this.download("system/equipment/importTemplate", {}, `equipment_template_${new Date().getTime()}.xlsx`);
      }
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

    /** 导出按钮操作 */
    handleExport() {
      if (this.activeName === "first") {
        this.download(
          "system/eqSystem/export",
          {
            ...this.queryParams
          },
          `equipment_${new Date().getTime()}.xlsx`
        );
      } else {
        this.download(
          "system/equipment/export",
          {
            ...this.queryParams
          },
          `equipment_${new Date().getTime()}.xlsx`
        );
      }
    }
  }
};
</script>
  <style lang="less" scoped>
.app-container {
  height: 100%;

  .footerBox{
    height: calc(100% - 60px);
  }

  .el-table {
    overflow: scroll;
  }
}
</style>