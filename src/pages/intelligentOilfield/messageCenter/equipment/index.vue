<!-- 后台——设备维护 -->
<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" size="mini" @click="handleImport" v-hasPermi="['system:user:import']"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button class="commonBtn" size="mini" @click="handleExport" v-hasPermi="['system:user:export']"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <pagePanel headerTitle="设备维护列表">
      <el-table
        :data="equipmentList"
        height="calc(100% - 50px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px','text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
      <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column prop="equipmentName" label="设备名称" width="300" align="center"></el-table-column>
        <el-table-column prop="type" label="设备类型" width="300" align="center"></el-table-column>
        <el-table-column prop="terrace" label="设备平台" width="300" align="center"></el-table-column>
        <el-table-column prop="clusterName" label="是否在Flink集群" align="center"></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </pagePanel>

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
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>

import { equipmentList } from "@/api/intelligentOilfield/system/equipment";
import proxy from '@/config/host';

export default {
  name: 'Equipment',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格数据
      equipmentList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 总条数
      total: 0,
      //选中数组
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
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // headers: { Authorization: `Bearer ${  getToken()}` },
        headers: { Authorization: `Bearer ${this.$store.getters['user/token']}` },
        // 上传的地址
        url: `${proxy.development.API}/system/equipment/importData`,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      equipmentList(this.queryParams).then((response) => {
        response.data.rows.forEach(item => {
          if(item.clusterStatus == 1){
            item.clusterName = '是';
          }else{
            item.clusterName = '否';
          }
        });
        this.equipmentList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.equipmentId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '导入';
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/equipment/importTemplate', {}, `equipment_template_${new Date().getTime()}.xlsx`);
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
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true });
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'system/equipment/export',
        {
          ...this.queryParams,
        },
        `equipment_${new Date().getTime()}.xlsx`,
      );
    },
  },
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