<!-- 水井动态分析 - 井组辅助分析 -->
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
          <el-button icon="el-icon-edit-outline" size="mini" @click="redact" class="commonBtn">下载</el-button>
          <el-button icon="el-icon-document-checked" size="mini" @click="save" class="commonBtn">上传文档</el-button>
          <el-button icon="el-icon-s-platform" size="mini" @click="dialogVisible = true" class="commonBtn"
            >检索</el-button
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
          :dataList="dataListcc"
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
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
import sedimentaryMap from '@/pages/rem/performance/wellGroup/groupAssistance/sedimentaryMap/index.vue';
import seismicAttribute from '@/pages/rem/performance/wellGroup/groupAssistance/seismicAttribute/index.vue';
import topplaneStructure from '@/pages/rem/performance/wellGroup/groupAssistance/topplaneStructure/index.vue';
import effectiveThickness from '@/pages/rem/performance/wellGroup/groupAssistance/effectiveThickness/index.vue';
import groupConnection from '@/pages/rem/performance/wellGroup/groupAssistance/groupConnection/index.vue';
import developmentCurve from '@/pages/rem/performance/wellGroup/groupAssistance/developmentCurve/index.vue';
import permeabilityDistribution from '@/pages/rem/performance/wellGroup/groupAssistance/permeabilityDistribution/index.vue';
import wellProfile from '@/pages/rem/performance/wellGroup/groupAssistance/wellProfile/index.vue';

import {fetchOilFields,wellGroups,fetchFields} from '@/api/oilDeposit/rem-02/primaryinfo.js';

export default {
  components: {
    verticalSwitchButton,
    sedimentaryMap,
    seismicAttribute,
    topplaneStructure,effectiveThickness,groupConnection,permeabilityDistribution,wellProfile,developmentCurve
  },
  name: 'Notice',
  dicts: ['sys_normal_disable'],
  data() {
    return {
      dialogVisible: false, //运行计算展示弹窗
      tableshow:true,
      oilfield: [],
      oilFields:[],
      deptSelect: [],
      wellGroups:[],
      platforms:[],
      currentTab: '',
      transfer:'',
      dataListmain: [
        { name: '储层资料', src: '', isChecked: false },
        { name: '动态资料', src: '', isChecked: true },
      ],
      dataList: [
        { name: '井组开发区线', src: 'developmentCurve', isChecked: false },
        { name: '注采对应曲线', src: '', isChecked: false },
        { name: '示踪剂', src: '', isChecked: false },
        { name: '措施效果', src: '', isChecked: false },
      ],
      dataListcc: [
        { name: '小层顶面构造图', src: 'topplaneStructure', isChecked: false },
        { name: '地震属性图', src: 'seismicAttribute', isChecked: false },
        { name: '沉积相图', src: 'sedimentaryMap', isChecked: false },
        { name: '有效厚度图', src: 'effectiveThickness', isChecked: false },
        { name: '渗透率分布图', src: 'permeabilityDistribution', isChecked: false },
        { name: '井组联通图', src: 'groupConnection', isChecked: false },
        { name: '连井刨面图', src: 'wellProfile', isChecked: false },
      ],
      addform: {
        noticeContent: '',
        noticeType: '',
        radio: '',
        sendTime: '',
        deptIds: [],
      },
      // 表格数据
      noticeList: [
        {
          name: '油田一期',
          one: '',
          two: '',
          three: '',
          index: 0,
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田二期',
          index: 1,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田三期',
          index: 2,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田四期',
          index: 3,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
      ],
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
    this.getList();
    // this.choiceDepts(); // 获取组织机构
  },
  methods: {
    getList(){
    fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data.oilFields;
          if (this.oilFields.length == 0) {
            this.selectOilField = "";
          } else {
            this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
          }
        }
      });
      this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
      const requestPlat = {
        oilFieldId: this.selectOilField,
      };
       fetchFields(requestPlat).then((res) => {
        if (res.data.code == 200) {
          this.deptSelect = res.data.data.fields;
          // this.selectPlatform = requestPlat.oilFieldId;
          // console.log(res,'区块----------------')
        }
      });
      let requestWellGroups = {oilFieldId: 'F35E226D47CE4B09B497B852D774D122'};
      wellGroups(requestWellGroups).then((res) => {
          console.log(res,'井组----------------')
        // if (res.data.code == 200) {
        //   // this.deptSelect = res.data.data.fields;
        //   // this.selectPlatform = requestPlat.oilFieldId;
        
        // }
      });
    },
    selectBtn(item) {
      if (item.name === '储层资料') {
        this.tableshow = false;
        this.currentTab = this.transfer
      } else {
        this.tableshow = true;
        this.currentTab = ''
      }
    },
    selectjt(item) {
      this.currentTab = item.src;
      this.transfer = this.currentTab
    },
    // 编辑
    /**
     *  选中表格事件
     * @param ids 选中的表格单行内容，携带index与判断条件
     */
    handleCurrentChange(val) {
      this.ids = [];
      this.ids = val;
      console.log(this.ids);
    },
    /**
     *  编辑
     * @param noticeList 表格数据data
     */
    redact() {
      let arr = [];
      this.noticeList.map((n) => {
        if (n.state == '1') {
          arr.push(n);
        }
      });
      if (arr.length >= 1) {
        this.$message.warning('同时只能编辑一个油田！');
      } else {
        this.noticeList[this.ids.index].state = '1';
        this.savelist = this.noticeList[this.ids.index];
      }
    },
    // 保存
    save() {
      if (this.savelist) {
        this.noticeList[this.savelist.index].state = '0';
        this.$message.warning('修改成功');
        this.savelist = [];
      }
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
