<template>
  <div>
    <!-- <t-popup @visible-change="handleVisibleChange">
      <t-card
        slot="content"
        :bordered="false"
        style="overflow-x: hidden; min-width: 400px;"
      >
        <t-input v-model="deptSearchValue" clearable placeholder="请输入部门关键字" />
        <t-tree
          style="height: 300px; overflow-y: scroll;"
          :keys="{ label: 'departName', value: 'id' }"
          :data="departTree"
          activable
          :actived="selectedDepIds"
          :filter="deptFilter"
          expand-all
          class="tree"
          @click="onDepSelect($event, 'click')"
        />
      </t-card>
      <div>
        <t-icon
          :style="{display: selectModule !== 2 ? 'inline-block' : 'none'}"
          class="icon-show"
          :type="iconType === true ? 'left' : 'right'"
        />
        <span class="icon-text">(点击查看单位)</span>
      </div>
    </t-popup> -->
    <t-card
      :bordered="false"
      style="height: 330px; overflow: hidden;"
    >
      <div style="display: flex;">
        <t-select
          :value="selectModule"
          style="width: 70px; display: inline-block;"
          :default-value="1"
          @change="value => selectModule = value"
        >
          <t-option :value="1" label="人员" />
          <!-- <t-option :value="2" label="最近" /> -->
        </t-select>
        <t-input
          v-model="queryParam.nickName"
          :style="{display: selectModule !== 2 ? 'inline-block': 'none', width: '250px', marginBottom: '15px', marginLeft: '10px' }"
          placeholder="请输入用户名"
          clearable
          type="search"
          @change="queryUserByName"
          @search="queryUserByName"
        />
        <!-- <span v-if="canBreakScope" style="float: right;">
              <span style="height: 48px; float: right; margin-left: 20px; margin-top: -25px;">
                <span style={{display: this.selectModule !== 2 ? "inline-block" : "none", height: "50%", width: "100%", float: "left"}}>所有</span>
                <span style={{display: this.selectModule !== 2 ? "inline-block" : "none", height: "50%", float: "left"}}>
                  <t-switch v-model="switchOn" style="width: 55px;" />
                </span>
              </span>
            </span> -->
      </div>
      <t-table
        ref="table"
        size="small"
        row-key="userId"
        :columns="columns"
        :data="dataSource"
        :selected-row-keys="selectedRowKeys"
        :pagination="selectModule === 1 ? ipagination : null"
        :loading="loading"
        @change="handleTableChange"
        @select-change="onSelectChange"
      >
        <template #deptName="{ row }">
          <span>{{ row.dept?.deptName }}</span>
        </template>
      </t-table>
    </t-card>
  </div>
</template>
<script>
import Vue from "vue";
// import BInput from "../common/BInput";
import store from "@/store";
import { getUserList, getRecentList } from "./api/api";
import { filterObj } from "../utils";

export default Vue.extend({
  name: "SelectAuditorByDepModalForAudit",
  props: {
    modalWidth: {
      type: Number,
      default: 1250,
      required: false
    },
    multi: {
      type: Boolean,
      default: true,
      required: false
    },
    userIds: {
      type: String,
      default: ""
    },
    canSelf: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 部门查询过滤关键字
      deptSearchValue: "",
      queryParam: {
        nickName: ""
      },
      selectModule: 1,
      cardStyle: "",
      role: "",
      orgCode: "",
      columns: [
        {
          title: "",
          colKey: "id",
          width: 60,
          align: "center",
          type: this.multi ? "multiple" : "single"
        },
        {
          title: "姓名",
          align: "center",
          colKey: "nickName",
          ellipsis: true
        },
        {
          title: "用户账号",
          align: "center",
          colKey: "userName",
          ellipsis: true
        },
        {
          title: "部门",
          align: "center",
          colKey: "deptName",
          cell: "deptName",
          ellipsis: true
        }
      ],
      scrollTrigger: {},
      dataSource: [],
      selectedRowKeys: [],
      selectUserRows: [],
      selectUserIds: [],
      title: "根据部门选择用户",
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: (total, range) => `${range[0]}-${range[1]} 共${total}条`,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      isorter: {
        column: "createTime",
        order: "desc"
      },
      selectedDepIds: [],
      departTree: [],
      departArray: [],
      visible: false,
      mountedDone: 0,
      switchOn: false,
      param: {}, // 暂存查询参数对象，开关触发时用
      // form: this.$form.createForm(this),
      loading: false,
      expandedKeys: [],
      iconType: false
    };
  },
  computed: {
    canBreakScope() {
      return !!this.param?.canBreakScope;
    },
    /**
     * 根据输入关键字过滤部门树
     */
    deptFilter() {
      return this.deptSearchValue ? node => node.data.departName?.includes(this.deptSearchValue) : null;
    }
  },
  watch: {
    userIds: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.clearSelected();
        }
      }
    },
    mountedDone: {
      immediate: true,
      handler(val) {
        if (this.departTree.length !== 0 && this.departTree[0].id && val === 1) {
          this.onDepSelect([this.departTree[0].id]);
          this.selectedDepIds = [this.departTree[0].id];
        }
      }
    },
    switchOn: {
      immediate: true,
      handler() {
        this.deptSearchValue = "";
        if (this.mountedDone === 1) {
          this.switchChange();
        }
      }
    },
    selectModule: {
      immediate: true,
      handler() {
        if (this.selectModule === 2) {
          this.selectRecent();
        } else if (this.mountedDone === 1) {
          this.recoverModule();
        }
      }
    }
  },
  methods: {
    /**
     * 加载挂载值
     */
    loadUserIds() {
      if (this.userIds) {
        // 这里最后加一个 , 的原因是因为无论如何都要使用 in 查询，防止后台进行了模糊匹配，导致查询结果不准确
        this.dataSource.forEach(v => {
          if (this.userIds.search(v.userId) !== -1 && !this.selectedRowKeys.includes(v.userId)) {
            this.selectedRowKeys.push(v.userId);
          }
        });
      }
    },
    initUserNames() {
      if (this.userIds) {
        // 这里最后加一个 , 的原因是因为无论如何都要使用 in 查询，防止后台进行了模糊匹配，导致查询结果不准确
        const values = `${this.userIds.split(",")},`;
        getUserList({
          id: values,
          pageNum: 1,
          pageSize: values.length
        }).then(res => {
          if (res.data.code === 200) {
            const selectedRowKeys = [];
            const realNames = [];
            res.data.rows.forEach(user => {
              realNames.push(user.realname);
              selectedRowKeys.push(user.id);
            });
            this.selectedRowKeys = selectedRowKeys;
            this.$emit("initComp", realNames.join(","));
          }
        });
      } else {
        this.$emit("initComp", "");
      }
    },
    async loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      if (this.selectedDepIds && this.selectedDepIds.length > 0) {
        await this.initQueryUserByDepId(this.selectedDepIds);
      } else {
        this.loading = true;
        const params = this.getQueryParams();// 查询条件
        await getUserList({ ...params }).then(res => {
          if (res.data.code === 200) {
            this.dataSource = res.data.rows;
            this.ipagination.total = res.data.total;
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    // 触发屏幕自适应
    resetScreenSize() {
      const screenWidth = document.body.clientWidth;
      if (screenWidth < 500) {
        this.scrollTrigger = { x: 800 };
      } else {
        this.scrollTrigger = {};
      }
    },
    showModal(queryParam, force) {
      if (!force && this.param === queryParam) {
        return;
      }
      if (queryParam) {
        this.role = queryParam.resourceId;
        this.selectedDepIds = queryParam.applyScope === "ALL" ? [] : [queryParam.applyScope];
        this.mountedDone = 0;
        this.orgCode = queryParam.orgCode;
        this.visible = true;
        this.param = queryParam;
      }
      if (this.selectModule !== 2) {
        this.queryDepartTree(queryParam);
      } else {
        getRecentList().then(res => {
          if (res.data.code === 200) {
            this.dataSource = res.data.recentSelectUsers;
            this.mountedDone = 1;
          } else {
            this.$warning({ title: "失败", content: "查询最近选择审批人失败" });
            this.mountedDone = 1;
          }
        });
      }
      this.loadUserIds();
      // this.form.resetFields();
    },
    getQueryParams() {
      const param = { ...this.queryParam, ...this.isorter };
      param.pageNum = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      return filterObj(param);
    },
    clearSelected() {
      this.selectedRowKeys = [];
      this.selectUserIds = [];
      this.selectedDepIds = [];
    },
    close() {
      this.visible = false;
      this.$emit("close");
      this.$nextTick(() => {
        this.departArray = [];
        this.departTree = [];
      });
    },
    handleTableChange(pagination, filters, sorter) {
      // TODO 筛选
      if (sorter && Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = sorter.order === "ascend" ? "asc" : "desc";
      }

      this.ipagination = {
        ...pagination.pagination,
        total: pagination.total
      };
      this.loadData();
    },
    handleSubmit() {
      this.selectUserIds = this.selectUserRows.map(item => item.userId).join(",");
      this.$emit("ok", this.selectUserRows, this.selectUserIds, !this.multi);
      if (!this.multi) {
        this.close();
      }
    },
    /**
     * 多维数组指定子项扁平化函数
     * @param array 要执行的扁平化数组
     * @param childrenKeys 要参与扁平的子键名数组默认 ['children']
     * @param flattenParent 默认的父数组
     * @param flattenParentKey 被压平后子项父数组存放键名
     * @param light 轻量不显示父级关系的返回结果及多余的子信息，默认不开启
     * @returns {Array}
     */
    arrayChildrenFlatten(array, { childrenKeys, flattenParent, flattenParentKey }, light = false) {
      childrenKeys = childrenKeys || ["children"];
      flattenParent = flattenParent || [];
      flattenParentKey = flattenParentKey || "flattenParent";
      const result = [];
      array.forEach(item => {
        const flattenItem = JSON.parse(JSON.stringify(item));
        if (!light) {
          // 非轻量化数组操作
          flattenItem[flattenParentKey] = flattenParent;
        } else {
          // 轻量化数组操作
          flattenItem[childrenKeys] = [];
        }
        result.push(flattenItem);
        childrenKeys.forEach(key => {
          if (item[key] && Array.isArray(item[key])) {
            const children = this.arrayChildrenFlatten(item[key], {
              childrenKeys,
              flattenParent: [...flattenParent, item],
              flattenParentKey
            }, light);
            result.push(...children);
          }
        });
      });
      return result;
    },
    // 点击树节点,筛选出对应的用户
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDepSelect(selectedDepIds, type) {
    //   if (type && type === "click") {
    //     const deptId = selectedDepIds.node.data.id;
    //     if (this.selectedDepIds.includes(deptId)) {
    //       return;
    //     }
    //     selectedDepIds = [deptId];
    //   }
    //   if (selectedDepIds[0]) {
    //     this.initQueryUserByDepId(selectedDepIds); // 调用方法根据选选择的id查询用户信息
    //     if (this.selectedDepIds[0] !== selectedDepIds[0]) {
    //       this.selectedDepIds = [selectedDepIds[0]];
    //     }
    //   }
      let deptIds = "";
      if (this.param.applyScope) {
        if (this.param.applyScope !== "ALL") {
          deptIds = this.param.applyScope;
        }
      }
      this.initQueryUserByDepId(deptIds); // 调用方法根据选选择的id查询用户信息
      this.loadUserIds();
    },
    onSelectChange(row, { selectedRowData }) {
      this.selectedRowKeys = row;
      this.selectUserRows = selectedRowData;
      this.handleSubmit();
    },
    onSearch() {
      this.loadData(1);
    },
    // 根据选择的id来查询用户信息
    initQueryUserByDepId(selectedDepIds) {
      this.loading = true;
      const params = {
        orgCode: this.orgCode,
        ...this.getQueryParams()
      };
      if (!this.canBreakScope) {
        params.deptId = selectedDepIds.toString();
        params.roleKey = this.role;
      }
      return getUserList(params).then(res => {
        if (res.data.code === 200) {
          this.dataSource = res.data.rows;
          this.$nextTick(() => {
            this.loadUserIds();
          });
          this.ipagination.total = res.data.total;
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * 增加姓名的查询
     */
    queryUserByName(val) {
      if (typeof val === "string") {
        this.queryParam.nickName = val;
      }
      this.loading = true;
      if (this.selectModule === 2) {
        return getRecentList().then(res => {
          if (res.data.code === 200) {
            this.dataSource = res.data.recentSelectUsers;
            this.mountedDone = 1;
          } else {
            this.$warning({ title: "失败", content: "查询最近选择审批人失败" });
            this.mountedDone = 1;
          }
        }).finally(() => {
          this.loading = false;
        });
      }
      const params = {
        orgCode: this.orgCode,
        nickName: this.queryParam.nickName
      };
      if (!this.canBreakScope) {
        params.deptId = this.selectedDepIds?.toString();
        params.roleKey = this.role;
      }
      return getUserList(params).then(res => {
        if (res.data.code === 200) {
          this.dataSource = res.data.rows;
          this.ipagination.total = res.data.total;
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * 全查开关变更
     */
    switchChange() {
      this.departArray = [];
      this.showModal(this.param);
      if (this.selectModule !== 2) {
        this.queryDepartTree(this.param);
      }
      this.$nextTick(() => {
        if (this.selectedRowKeys.length === 0) {
          this.loadUserIds();
        }
      });
    },
    /**
     * 模态框显示时查询部门树
     */
    handleVisibleChange(visible) {
      if (visible && this.departTree.length <= 0) {
        this.queryDepartTree(this.param);
      }
    },
    /**
     * 机构数查询方法及相关数据处理
     */
    queryDepartTree() {
      // const params = {
      //   deptId: queryParam.auditUserSearchCallBackData,
      //   dataScope: queryParam.dataScope,
      //   applyScope: queryParam.applyScope,
      //   relativePerson: queryParam.relativePerson,
      //   unlimit: this.switchOn
      // };
      // querySysTreeList(params).then((res) => {
      //   if (res.success) {
      //     this.departTree = res.result || [];
      //     this.departArray = this.arrayChildrenFlatten(this.departTree, {}, true);
      //     this.mountedDone = 1;
      //     this.onDepSelect([this.departTree[0].id]);
      //     this.selectedDepIds = [this.departTree[0].id];
      //     // 默认展开父节点
      //     this.expandedKeys = this.departTree.map(item => item.id)
      //   }
      // })
      this.onDepSelect();
    },
    /**
     * 查找最近
     */
    selectRecent() {
      // find the recent selected users;
      this.dataSource = [];
      this.showModal();
    },
    /**
     * recover the query module
     */
    recoverModule() {
      // exacute the recoveray
      this.showModal(this.param, true);
    },
    modalFormOk() {
      this.loadData();
    },
    /**
     * 审批节点不能选自己
     */
    getCheckboxProps(row) {
      const { userInfo } = store.getters;
      const props = this.canSelf ? {} : { disabled: userInfo.id === row.userId };
      return { props };
    }
  }
});
</script>
<style scoped lang="less">
::v-deep .t-card .t-card__body {
  height: 100%;
  display: flex;
  flex-direction: column;

  .t-table {
    flex: 1;
    height: 200px;
    max-height: 200px;

    .t-table__content {
      height: calc(100%);
      overflow-y: auto;
    }
  }
}
</style>