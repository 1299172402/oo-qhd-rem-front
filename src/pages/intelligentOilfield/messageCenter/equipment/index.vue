<!-- 后台——设备维护 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <!-- 设备系统列表 -->
        <el-form-item v-show="activeName === 'first'" label="系统名称">
          <el-input
            v-model="queryParams.systemName"
            placeholder="请输入系统名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="系统编号">
          <el-input
            v-model="queryParams.systemCode"
            placeholder="请输入系统编号"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="系统平台">
          <el-select
            v-model="queryParams.terraceId"
            placeholder="请选择系统平台"
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
        <!-- 设备名称列表 -->
        <el-form-item v-show="activeName === 'second'" label="设备名称">
          <el-input
            v-model="queryParams.equipmentType"
            placeholder="请输入设备名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="设备编号">
          <el-input
            v-model="queryParams.equipmentCode"
            placeholder="请输入设备编号"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="设备所属平台">
          <el-select
            v-model="queryParams.terraceId"
            placeholder="请选择设备所属平台"
            clearable
            style="width: 240px"
            @change="changeTerrace2"
          >
            <el-option
              v-for="(item, index2) in systemPlatformList"
              :key="index2"
              :label="item.terraceName"
              :value="item.terraceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="设备所属系统">
          <el-select
            v-model="queryParams.systemId"
            placeholder="请选择设备所属系统"
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
        <!-- 平台链路列表 -->
        <el-form-item v-show="activeName === 'third'" label="父级平台">
          <el-select
            v-model="queryParams.parentName"
            style="width: 240px"
            placeholder="请选择父级平台"
            clearable
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="dict in dict.type.sys_parent_platform"
              :key="dict.value"
              :label="dict.label"
              :value="dict.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="activeName === 'third'" label="平台名称">
          <el-input
            v-model="queryParams.terraceName"
            placeholder="请输入平台名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'third'" label="平台编码">
          <el-input
            v-model="queryParams.terraceCode"
            placeholder="请输入平台编码"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <!-- 云端链路列表 -->
        <el-form-item v-show="activeName === 'fourth'" label="链路起点">
          <el-input
            v-model="queryParams.startDescribe"
            clearable
            style="width: 300px"
            placeholder="请输入链路起点"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'fourth'" label="链路终点">
          <el-input
            v-model="queryParams.endDescribe"
            clearable
            style="width: 300px"
            placeholder="请输入链路终点"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'fourth'" label="链路类型">
          <el-select
            v-model="queryParams.linkType"
            placeholder="请选择链路类型"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          >
            <el-option
              v-for="(item, index2) in linkTypeList"
              :key="index2"
              :label="item.typeLabel"
              :value="item.typeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttonArea">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <page-panel-new header-title="设备维护列表">
      <el-row class="mbBottom">
        <el-col :span="24">
          <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="handleClick">
            <el-tab-pane label="设备系统列表" name="first" />
            <el-tab-pane label="设备名称列表" name="second" />
            <el-tab-pane label="平台链路列表" name="third" />
            <el-tab-pane label="云端链路列表" name="fourth" />
          </el-tabs>
        </el-col>
        <el-col :span="16">
          <el-button
            v-hasPermi="['system:equipment:add']"
            type="primary"
            @click="handleAdd"
          >
            新增
          </el-button>
        </el-col>
        <el-col v-if="activeName === 'first' || activeName === 'second'" :span="8" style="text-align: right; float: right">
          <el-button
            v-hasPermi="['system:equipment:import']"
            class="commonBtn"
            @click="importTemplate"
          >
            导入模板
          </el-button>
          <el-button
            v-hasPermi="['system:equipment:import']"
            type="primary"
            @click="handleImport"
          >
            导入
          </el-button>
          <el-button
            v-hasPermi="['system:equipment:export']"
            type="primary"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
      <!-- 设备系统列表 -->
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
          prop="systemCode"
          label="系统编号"
          width="300"
          align="center"
        />
        <el-table-column
          prop="terraceName"
          label="系统平台"
          width="300"
          align="center"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="165"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设备名称列表 -->
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
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column
          prop="equipmentType"
          label="设备名称"
          width="300"
          align="center"
        />
        <el-table-column
          prop="equipmentCode"
          label="设备编号"
          width="300"
          align="center"
        />
        <el-table-column
          prop="terraceName"
          label="设备所属平台"
          width="200"
          align="center"
        />
        <el-table-column
          prop="systemName"
          label="设备所属系统"
          width="300"
          align="center"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 平台链路列表 -->
      <el-table
        v-show="activeName === 'third'"
        :data="platformLinkList"
        height="calc(100% - 154px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px','text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column
          prop="parentName"
          label="父级平台"
          width="80"
          align="center"
        />
        <el-table-column
          prop="terraceName"
          label="平台名称"
          width="250"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="terraceCode"
          label="平台编码"
          width="200"
          align="center"
        />
        <el-table-column
          prop="terraceUrl"
          label="跳转链接"
          width="250"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="remark"
          label="备注"
          width="300"
          align="center"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 云端链路列表 -->
      <el-table
        v-show="activeName === 'fourth'"
        :data="cloudLinkList"
        height="calc(100% - 154px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px','text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column
          prop="startDescribe"
          label="链路起点"
          width="180"
          align="center"
        />
        <el-table-column
          prop="endDescribe"
          label="链路终点"
          width="180"
          align="center"
        />
        <el-table-column
          prop="linkType"
          label="链路类型"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ linkTypeList?.find(item=>item.typeValue === scope.row.linkType).typeLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="linkUrl"
          label="跳转链接"
          width="300"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="remark"
          label="备注"
          width="300"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="200"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:equipment:edit']"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:equipment:remove']"
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
      :width="activeName === 'fourth' ? '700px' : '600px'"
      append-to-body
      :close-on-click-modal="false"
    >
      <!-- 设备系统列表 -->
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
              <el-select v-model="addSysForm.terraceId" placeholder="请选择所属平台" style="width: 300px">
                <el-option
                  v-for="item in systemPlatformList"
                  :key="item.terraceId"
                  :label="item.terraceName"
                  :value="item.terraceId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统编号" prop="systemCode">
              <el-input v-model="addSysForm.systemCode" style="width: 300px" placeholder="请输入系统编号" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 设备名称列表 -->
      <el-form
        v-show="activeName === 'second'"
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
            <el-form-item label="设备所属平台" prop="terraceId">
              <el-select
                v-model="addEquForm.terraceId"
                placeholder="请选择设备所属平台"
                style="width: 300px"
                @change="changeTerrace"
              >
                <el-option
                  v-for="item in systemPlatformList"
                  :key="item.terraceId"
                  :label="item.terraceName"
                  :value="item.terraceId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备所属系统" prop="systemId">
              <el-select
                v-model="addEquForm.systemId"
                placeholder="请选择设备所属系统"
                style="width: 300px"
                @change="changeSystem"
              >
                <el-option
                  v-for="(item) in deviceSysList"
                  :key="item.systemId"
                  :label="item.systemName"
                  :value="item.systemId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备编号" prop="equipmentCode">
              <el-input v-model="addEquForm.equipmentCode" style="width: 300px" placeholder="请输入设备编号" />
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
      <!-- 平台链路列表 -->
      <el-form
        v-show="activeName === 'third'"
        ref="addPlatformForm"
        :model="addPlatformForm"
        :rules="platRules"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="平台名称" prop="terraceName">
              <el-input v-model="addPlatformForm.terraceName" style="width: 300px" placeholder="请输入平台名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="父级平台" prop="parentName">
              <el-select
                v-model="addPlatformForm.parentName"
                style="width: 300px"
                placeholder="请选择父级平台"
              >
                <el-option
                  v-for="dict in dict.type.sys_parent_platform"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台编码" prop="terraceCode">
              <el-input v-model="addPlatformForm.terraceCode" style="width: 300px" placeholder="请输入平台编码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="addPlatformForm.remark" style="width: 300px" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台链接">
              <el-input v-model="addPlatformForm.terraceUrl" style="width: 300px" placeholder="请输入平台链接" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 云端链路列表 -->
      <el-form
        v-show="activeName === 'fourth'"
        ref="addCloudForm"
        :model="addCloudForm"
        :rules="cloudRules"
        label-width="90px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="链路起点" prop="startDescribe">
              <el-input v-model="addCloudForm.startDescribe" placeholder="请输入链路起点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="起点编码" prop="startPoint">
              <el-input v-model="addCloudForm.startPoint" placeholder="请输入起点编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链路终点" prop="endDescribe">
              <el-input v-model="addCloudForm.endDescribe" placeholder="请输入链路终点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终点编码" prop="endPoint">
              <el-input v-model="addCloudForm.endPoint" placeholder="请输入终点编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链路类型" prop="linkType">
              <el-select
                v-model="addCloudForm.linkType"
                placeholder="请选择链路类型"
                clearable
                style="width: 230px"
                @keyup.enter.native="handleQuery"
              >
                <el-option
                  v-for="(item, index2) in linkTypeList"
                  :key="index2"
                  :label="item.typeLabel"
                  :value="item.typeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="addCloudForm.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台链接">
              <el-input v-model="addCloudForm.linkUrl" placeholder="请输入平台链接" />
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
        :http-request="httpRequest"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        action=""
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
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的设备数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
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

import { linkList, addLink, editLink, getLinkDetail, removeLink, terraceList, addTerrace, editTerrace, removeTerrace, getTerraceDetail, eqSystemList, addEqSystem, editEqSystem, eqSystemListNoPage, queryEqSystem, getTerrace, removeEqSystem, equipmentList, addEquipment, editEquipment, queryEquipment, removeEquipment, uploadFile1, uploadFile2 } from "@/api/intelligentOilfield/system/equipment";
import proxy from "@/config/host";

export default {
  name: "Equipment",
  dicts: ["sys_pass_status", "sys_parent_platform"],
  data() {
    return {
      linkTypeList: [
        { typeLabel: "节点", typeValue: "POINT" },
        { typeLabel: "链路", typeValue: "LINK" }
      ],
      platformLinkList: [],
      cloudLinkList: [],
      deviceSysList: [],
      currentTitle: "新增设备系统",
      dialogOpen: false,
      addSysForm: {},
      addEquForm: {},
      addPlatformForm: {},
      addCloudForm: {},
      // 表单校验
      rules: {
        systemName: [{ required: true, message: "请输入系统名称" }],
        terraceId: [{ required: true, message: "请选择所属平台" }],
        systemCode: [{ required: true, message: "请输入系统编号" }]
      },
      equRules: {
        equipmentType: [{ required: true, message: "请输入设备名称" }],
        systemId: [{ required: true, message: "请选择设备所属系统" }],
        equipmentCode: [{ required: true, message: "请输入设备编号" }],
        terraceId: [{ required: true, message: "请选择设备所属平台" }]
      },
      platRules: {
        terraceName: [{ required: true, message: "请输入平台名称" }],
        parentName: [{ required: true, message: "请选择父级平台" }],
        terraceCode: [{ required: true, message: "请输入平台编码" }]
      },
      cloudRules: {
        startDescribe: [{ required: true, message: "请输入链路起点" }],
        endDescribe: [{ required: true, message: "请输入链路终点" }],
        startPoint: [{ required: true, message: "请输入起点编码" }],
        endPoint: [{ required: true, message: "请输入终点编码" }],
        linkType: [{ required: true, message: "请选择链路类型" }]
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
        systemId: undefined,
        systemCode: undefined,
        equipmentCode: undefined,
        terraceName: undefined,
        parentName: undefined,
        terraceCode: undefined,
        startDescribe: undefined,
        endDescribe: undefined,
        linkType: undefined
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
    },
    changeTerrace(val) {
      this.addEquForm.systemId = undefined;
      if (val) {
        this.getEqSystemList(val);
      } else {
        this.deviceSysList = [];
      }
    },
    changeSystem() {
      this.$forceUpdate();
    },
    changeTerrace2(val) {
      this.queryParams.systemId = undefined;
      if (val) {
        this.getEqSystemList(val);
      } else {
        this.deviceSysList = [];
      }
    },
    // 根据平台id获取系统
    getEqSystemList(id) {
      eqSystemListNoPage(id).then(response => {
        this.deviceSysList = response.data.data;
        this.$forceUpdate();
      });
    },
    handleUpdate(row) {
      this.resetCurrentFields();
      this.dialogOpen = true;
      if (this.activeName === "first") {
        this.currentTitle = "编辑设备系统";
      } else if (this.activeName === "second") {
        this.currentTitle = "编辑设备列表";
      } else if (this.activeName === "third") {
        this.currentTitle = "编辑平台链路列表";
      } else if (this.activeName === "fourth") {
        this.currentTitle = "编辑云端链路列表";
      }
      if (this.activeName === "first") {
        this.addSysForm.systemId = row.systemId;
        queryEqSystem(this.addSysForm.systemId).then(response => {
          this.addSysForm = response.data.data;
        });
      } else if (this.activeName === "second") {
        this.addEquForm.equipmentId = row.equipmentId;
        queryEquipment(this.addEquForm.equipmentId).then(response => {
          this.addEquForm = response.data.data;
        });
        // 获取平台系统
        this.changeTerrace(row.terraceId);
      } else if (this.activeName === "third") {
        this.addPlatformForm.terraceId = row.terraceId;
        getTerraceDetail(this.addPlatformForm.terraceId).then(response => {
          this.addPlatformForm = response.data.data;
        });
      } else if (this.activeName === "fourth") {
        this.addCloudForm.linkId = row.linkId;
        getLinkDetail(this.addCloudForm.linkId).then(response => {
          this.addCloudForm = response.data.data;
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
      } else if (this.activeName === "second") {
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
      } else if (this.activeName === "third") {
        const { terraceId } = row;
        this.$modal
          .confirm("是否确认删除该平台？")
          .then(() => removeTerrace(terraceId))
          .then(res => {
            if (res ? res.data.code === 200 : false) {
              this.queryParams.pageNum = 1;
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }
          })
          .catch(() => {});
      } else if (this.activeName === "fourth") {
        const { linkId } = row;
        this.$modal
          .confirm("是否确认删除该链路？")
          .then(() => removeLink(linkId))
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
      } else if (this.activeName === "second") { // 设备名称
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
      } else if (this.activeName === "third") { // 平台链路列表
        this.$refs.addPlatformForm.validate(valid => {
          if (valid) {
            if (!this.addPlatformForm.terraceId) { // 新增
              addTerrace(this.addPlatformForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            } else { // 修改
              editTerrace(this.addPlatformForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("修改成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            }
          }
        });
      } else if (this.activeName === "fourth") { // 云端链路列表
        this.$refs.addCloudForm.validate(valid => {
          if (valid) {
            if (!this.addCloudForm.linkId) { // 新增
              addLink(this.addCloudForm).then(response => {
                if (response.data.code === 200) {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogOpen = false;
                  this.getList();
                }
              });
            } else { // 修改
              editLink(this.addCloudForm).then(response => {
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
      this.deviceSysList = [];
      this.dialogOpen = true;
      if (this.activeName === "first") {
        this.currentTitle = "新增设备系统";
      } else if (this.activeName === "second") {
        this.currentTitle = "新增设备列表";
        this.addEquForm = {
          passStatus: "0"
        };
      } else if (this.activeName === "third") {
        this.currentTitle = "新增平台链路列表";
      } else if (this.activeName === "fourth") {
        this.currentTitle = "新增云端链路列表";
      }
    },
    handleClick() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        systemName: undefined,
        terraceId: undefined,
        equipmentType: undefined,
        systemId: undefined,
        systemCode: undefined,
        equipmentCode: undefined,
        terraceName: undefined,
        parentName: undefined,
        terraceCode: undefined,
        startDescribe: undefined,
        endDescribe: undefined,
        linkType: undefined
      };
      this.getList();
      this.resetCurrentFields();
      if (this.activeName === "second") {
        this.getTerrace();
      }
    },
    resetCurrentFields() {
      if (this.activeName === "first") {
        this.resetForm("addSysForm");
      } else if (this.activeName === "second") {
        this.resetForm("addEquForm");
      } else if (this.activeName === "third") {
        this.resetForm("addPlatformForm");
      } else if (this.activeName === "fourth") {
        this.resetForm("addCloudForm");
      }
      this.addSysForm = {};
      this.addEquForm = {};
      this.addPlatformForm = {};
      this.addCloudForm = {};
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        systemName: undefined,
        terraceId: undefined,
        equipmentType: undefined,
        systemId: undefined,
        systemCode: undefined,
        equipmentCode: undefined,
        terraceName: undefined,
        parentName: undefined,
        terraceCode: undefined,
        startDescribe: undefined,
        endDescribe: undefined,
        linkType: undefined
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
      } else if (this.activeName === "second") {
        equipmentList(this.queryParams).then(response => {
          this.equipmentList = response.data.rows;
          this.total = response.data.total;
        });
      } else if (this.activeName === "third") {
        terraceList(this.queryParams).then(response => {
          this.platformLinkList = response.data.rows;
          this.total = response.data.total;
        });
      } else if (this.activeName === "fourth") {
        linkList(this.queryParams).then(response => {
          this.cloudLinkList = response.data.rows;
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
      } else if (this.activeName === "second") {
        this.ids = selection.map(item => item.equipmentId);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      } else if (this.activeName === "third") {
        this.ids = selection.map(item => item.terraceId);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      } else if (this.activeName === "second") {
        this.ids = selection.map(item => item.linkId);
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
      } else if (this.activeName === "second") {
        this.download("system/equipment/importTemplate", {}, `equipment_template_${new Date().getTime()}.xlsx`);
      }
    },
    // 文件上传中处理
    handleFileUploadProgress() {
      this.upload.isUploading = true;
    },
    httpRequest: function(val) {
      const fd = new FormData();
      fd.append("file", val.file, val.file.name);
      if (this.activeName === "first") {
        uploadFile1(this.upload.updateSupport, fd).then(res => {
          this.handleFileSuccess(res);
        });
      } else if (this.activeName === "second") {
        uploadFile2(this.upload.updateSupport, fd).then(res => {
          this.handleFileSuccess(res);
        });
      }
    },
    // 文件上传成功处理
    handleFileSuccess(response) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.data.msg, "导入结果", { dangerouslyUseHTMLString: true });
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
      } else if (this.activeName === "second") {
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