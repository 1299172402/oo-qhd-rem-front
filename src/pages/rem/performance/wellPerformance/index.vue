<!-- 水井动态分析 - 水井辅助分析 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" style="margin-top: 18px">
        <el-form-item label="油田：" prop="noticeContent">
          <el-select v-model="selectOilField" class="f2" disabled>
            <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区块：" prop="createBy">
          <el-select v-model="queryParams.cplx" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.name"
              :value="item.fieldId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井组：" prop="createBy">
          <el-select v-model="queryParams.cplx" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in wellGroups"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-edit-outline" size="mini"  class="commonBtn">下载</el-button>
          <el-button icon="el-icon-document-checked" size="mini" class="commonBtn">上传文档</el-button>
          <el-button icon="el-icon-s-platform" size="mini"  class="commonBtn"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanelNew headerTitle="通知通告列表" style="height: calc(100% - 85%); height: auto">
      <el-row style="height: 50px">
        <verticalSwitchButton
          @selectBtn="selectBtn"
          :dataList="dataListmain"
          buttonWidth="120px"
          buttonHeight="30px"
          style="width: 9%; padding: 10px"
          btnDirection="row"
        ></verticalSwitchButton>
      </el-row>
      <el-row style="height: 50px" v-if="tableshow">
        <verticalSwitchButton
          :dataList="dataList"
          @selectBtn="selectjt"
          buttonWidth="120px"
          buttonHeight="30px"
          style="width: 9%; padding: 10px"
          btnDirection="row"
        ></verticalSwitchButton>
      </el-row>
      <el-row style="height: 50px" v-else>
        <verticalSwitchButton
          :dataList="dataList2"
          @selectBtn="selectjt"
          buttonWidth="120px"
          buttonHeight="30px"
          style="width: 9%; padding: 10px"
          btnDirection="row"
        ></verticalSwitchButton>
      </el-row>
    </pagePanelNew>
    <pagePanelNew headerTitle="" style="height: calc(100% - 150px)">
      <components :is="currentTab" />
    </pagePanelNew>
  </div>
</template>

<script>
import { fetchOilFields, wellGroups, fetchFields } from '@/api/oilDeposit/rem-02/primaryinfo.js';
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
import waterInjection from '@/pages/rem/performance/wellPerformance/waterInjection.vue';
export default {
  components: {
    waterInjection,verticalSwitchButton
  },
  name: 'Notice',
  dicts: ['sys_normal_disable'],
  data() {
    return {
      dialogVisible: false, //运行计算展示弹窗
      tableshow: false,
      selectOilField:'',
      oilfield: [],
      oilFields: [],
      deptSelect: [],
      wellGroups: [],
      platforms: [],
      currentTab: 'sedimentaryMap',
      dataListmain: [
        { name: '静态资料', src: '', isChecked: false },
        { name: '生产动态资料', src: '', isChecked: false },
        { name: '动态监测资料', src: '', isChecked: false },
        { name: '钻完井资料', src: '', isChecked: false },
      ],
      dataList: [
        { name: '吸水剖面', src: 'waterInjection', isChecked: true },
        { name: '压降测试', src: '', isChecked: false },
        { name: '试井', src: '', isChecked: false },
        { name: '分配调配', src: '', isChecked: false },
        { name: '试吸水指数', src: '', isChecked: false },
        { name: '示踪剂', src: '', isChecked: false },
      ],
        dataList2: [
        ],
      addform: {
        noticeContent: '',
        noticeType: '',
        radio: '',
        sendTime: '',
        deptIds: [],
      },
      // 是否展开，默认全部展开
      isExpandAll: true,
      deptList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,

      // 选中数组
      ids: [],
      // 保存数组
      savelist: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orgId: undefined,
        oilFieldId: undefined,
        createBy: undefined,
        noticeType: undefined,
      },
    };
  },
  created() {
    // this.choiceDepts(); // 获取组织机构
  },
  methods: {
     selectBtn(item) {
      if (item.name === '静态资料') {
        console.log(item)
        this.tableshow = true;
      }
    },
    selectjt(item) {
      this.currentTab = item.src;
    },

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

.el-tree {
  max-height: 370px;
  overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
