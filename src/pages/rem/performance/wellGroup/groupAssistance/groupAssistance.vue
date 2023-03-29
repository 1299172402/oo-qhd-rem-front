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
          <el-button icon="el-icon-edit-outline" size="mini" class="commonBtn">下载</el-button>
          <el-button icon="el-icon-document-checked" size="mini" class="commonBtn">上传文档</el-button>
          <el-button icon="el-icon-s-platform" size="mini" class="commonBtn">检索</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanelNew headerTitle="通知通告列表" style="height: calc(100% - 85%); height: auto">
      <el-tabs class="g-pageHeader" v-model="activeName" topline>
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
          <div class="tab-view">
            <el-button
              v-for="module in item.modules"
              :class="currentTab == module.name ? 'el-button--primary' : 'commonBtn'"
              :key="module.name"
            >
              <div @click="handleClick(module.name)">
                {{ module.label }}
              </div>
            </el-button>
            <!-- <el-radio-group v-model="currentTab" @change="handleClick">
              <el-radio-button
                v-for="module in item.modules"
                :key="module.name"
                :label="module.name"
                class="commonBtn"
              >
                {{ module.label }}
              </el-radio-button>
            </el-radio-group> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </pagePanelNew>
    <pagePanelNew headerTitle="" style="height: calc(100% - 150px)">
      <keep-alive>
        <components :is="currentTab" />
      </keep-alive>
    </pagePanelNew>
  </div>
</template>

<script>
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';

const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, '$1')]: i[1].default,
    }),
  {},
);

export default {
  components: {
    verticalSwitchButton,
    ...moduleName,
  },
  data() {
    return {
      dialogVisible: false, // 运行计算展示弹窗
      oilfield: [],
      oilFields: [],
      deptSelect: [],
      wellGroups: [],
      platforms: [],
      activeName: '',
      currentTab: '',
      transfer: '',
      tabs: [
        {
          label: '储层资料',
          name: 'staticData',
          modules: [
            {
              label: '小层顶面构造图',
              name: 'topplaneStructure',
            },
            {
              label: '地震属性图',
              name: 'seismicAttribute',
            },
            {
              label: '沉积相图',
              name: 'sedimentaryMap',
            },
            {
              label: '有效厚度图',
              name: 'effectiveThickness',
            },
            {
              label: '渗透率分布图',
              name: 'permeability',
            },
            {
              label: '井组连通图',
              name: 'groupConnection',
            },
            {
              label: '连井剖面图',
              name: 'wellProfile',
            },
          ],
        },
        {
          label: '动态资料',
          name: 'productionDynamicData',
          modules: [
            {
              label: '井组配注变化动态',
              name: 'annotationChange',
            },
            {
              label: '井组连通性变化动态',
              name: 'connectivityChange',
            },
            {
              label: '注采井网状况变化',
              name: 'wellChange',
            },
          ],
        },
      ],
      // 是否展开，默认全部展开
      isExpandAll: true,
      deptList: [],
      // 显示搜索条件
      showSearch: true,
      selectOilField: '',
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
  computed: {},
  mounted() {
    this.getbutton();
  },
  methods: {
    getbutton() {
      this.activeName = 'staticData';
      this.currentTab = 'topplaneStructure';
    },
    handleClick(item) {
      this.currentTab = item;
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
.commonBtn {
  height: auto;
  &:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
