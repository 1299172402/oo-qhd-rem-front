/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * 高级查询按钮调用 superQuery方法  高级查询组件ref定义为superQueryModal
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 */
import dayjs from "dayjs";
import { filterObj } from "../utils";
import { deleteAction, getAction } from "../process/api/manage";
import { getAction as getActionGlobal } from "../process/api/manageGlobal";

export default {
  data() {
    return {
      format: {
        date: "YYYY-MM-DD"
      },
      // token header
      //   tokenHeader: { "X-Access-Token": Vue.ls.get(ACCESS_TOKEN) },
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: (total, range) => `${range[0]  }-${  range[1]  } 共${  total  }条`,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter: {
        column: "createTime",
        order: "desc"
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false,
      /* 高级查询条件生效状态 */
      superQueryFlag: false,
      /* 高级查询条件 */
      superQueryParams: "",

      /* 正在编辑的记录数据 */
      editingRecord: { },
      /* 是否显示编辑对话框 */
      showModalForm: false,

      modalFormAction: "Add",

      /* 是否关闭全局查询 */
      unGlobal: false,
      // 当前实例是否被销毁
      isDestroyed: false
    };
  },
  computed: {
    queryParamOther() {
      return {};
    }
  },
  created() {
    if (!this.disableMixinCreated) {
      console.log(" -- mixin created -- ");
      const filterId = this.$route.query.id;
      (this.loadData(1, filterId) || Promise.resolve())
        .then(() => {
          const row = this.dataSource.find(v => v.id && v.id === filterId);
          if (filterId && !row) {
            this.loadData();
          } else if(row) {
            this.handleViewToPage(row.id);
          }
        })
      // 初始化字典配置 在自己页面定义
      this.initDictConfig();
    }
  },
  activated() {
    this.loadData();
  },
  destroyed() {
    this.isDestroyed = true;
  },
  methods: {
    loadData(arg, id) {
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!");
        return;
      }
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      const params = this.getQueryParams();// 查询条件
      if (id) {
        params.id = id;
      }
      this.loading = true;
      const httpAction = this.unGlobal ? getAction : getActionGlobal;
      return httpAction(this.url.list, params).then((res) => {
        if (this.handleLoadDataRes) {
          res = this.handleLoadDataRes(res);
        }
        if (res.success && res.result) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
        if (res.code === 510) {
          this.$message.warning(res.message);
        }
        this.loading = false;
      });
    },
    initDictConfig() {
      // console.log("--这是一个假的方法!")
    },
    handleSuperQuery(arg) {
      // 高级查询方法
      if (!arg) {
        this.superQueryParams = "";
        this.superQueryFlag = false;
      } else {
        this.superQueryFlag = true;
        this.superQueryParams = JSON.stringify(arg);
      }
      this.loadData();
    },
    getQueryParams() {
      const queryParam = { ...this.queryParam , ...this.queryParamOther};
      Object.keys(queryParam).forEach(key => {
        // 起始时间
        if (key.endsWith("_flag") && queryParam[key].length > 0) {
          queryParam[`${key.slice(0, -5)  }_begin`] = dayjs(queryParam[key][0]).startOf("day").format("YYYY-MM-DD HH:mm:ss");
          queryParam[`${key.slice(0, -5)  }_end`] = dayjs(queryParam[key][1]).endOf("day").format("YYYY-MM-DD HH:mm:ss");
          delete queryParam[key];
        }
        // 数组转字符串
        if (key.endsWith("_arrayToString") && queryParam[key].length > 0) {
          queryParam[key.slice(0, -("_arrayToString").length)] = queryParam[key].join(",");
          delete queryParam[key];
        }
        // 模糊查询，值前后加*
        if (key.endsWith("_matching") && queryParam[key].length > 0) {
          queryParam[key.slice(0, -("_matching").length)] = `*${   queryParam[key]  }*`;
          delete queryParam[key];
        }
        // 模糊查询，值前后加%
        if (key.endsWith("_fuzzy") && queryParam[key].length > 0) {
          queryParam[key.slice(0, -("_fuzzy").length)] = `%${  queryParam[key]  }%`;
          delete queryParam[key];
        }
      })
      // 获取查询条件
      const sqp = {
        superQueryParams: undefined
      };
      if (this.superQueryParams) {
        sqp.superQueryParams = encodeURI(this.superQueryParams);
      }
      const param = Object.assign(sqp, queryParam, this.isorter, this.filters);
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      return filterObj(param);
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    onClearSelected() {
      this.selectedRowKeys = [];
      this.selectionRows = [];
    },
    onClearSelectedOne(id) {
      const index = this.selectedRowKeys.indexOf(id)
      if (index > -1) {
        this.selectedRowKeys.splice(index, 1);
      }
      const index1 = this.selectionRows.map(row =>row.id).indexOf(id);
      if (index1 > -1) {
        this.selectionRows.splice(index1, 1);
      }
    },
    searchQuery() {
      return this.loadData(1);
    },
    superQuery() {
      this.$refs.superQueryModal.show();
    },
    searchReset() {
      this.queryParam = {};
      this.loadData(1);
    },
    batchDel(idField = "ids") {
      if (!this.url.deleteBatch) {
        this.$message.error("请设置url.deleteBatch属性!");
        return;
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning("请选择一条记录！");
        
      } else {
        let ids = "";
        for (let a = 0; a < this.selectedRowKeys.length; a++) {
          ids += `${this.selectedRowKeys[a]  },`;
        }
        const that = this as any;
        this.$confirm({
          title: "确认删除",
          content: "是否删除选中数据?",
          onOk() {
            that.loading = true;
            if (typeof idField === "object") {
              idField = "ids";
            }
            deleteAction(that.url.deleteBatch, { [idField]: ids }).then((res: any) => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
                if (typeof that.batchDelAfter === "function") that.batchDelAfter(ids);
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.loading = false;
            });
          }
        });
      }
    },
    handleDelete(idInfo) {
      if (!this.url.delete) {
        this.$message.error("请设置url.delete属性!");
        return;
      }
      const that = this as any;
      let idField = "id";
      let id = idInfo;
      if (typeof idInfo === "object") {
        const [first, second]= idInfo;
        id = first;
        idField= second;
      }
      deleteAction(that.url.delete, { [idField]: id }).then((res: any) => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
          that.onClearSelectedOne(id);
          if (typeof this.handleDeleteAfter === "function") this.handleDeleteAfter(id);
        } else {
          that.$message.warning(res.message);
        }
      });
    },
    /**
     * 更改删除和撤销的提示信息
     */
    deleteCancelContent(record,title) {
      if (record.status === "CaoGao" || record.status === "draft") {
        return `是否确认删除该${title}记录？`;
      } 
      return `是否确认撤销该${title}记录？`;
      
    },
    handleDeleteByConfirm(id, title) {
      const _this = this as any;
      _this.$confirm({
        title: "请确认",
        content: title,
        closable: true,
        okText: "确定",
        cancelText: "",
        okType: "danger",
        onOk() {
          _this.handleDelete(id);
        },
        onCancel() {
          _this.$message.warning("已取消");
        },
      });
    },
    handleEdit(record) {
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.action = "Edit";
      this.$refs.modalForm.disableSubmit = false;
      if (typeof this.handleEditAfter === "function") this.handleEditAfter();
      this.$refs.modalForm.edit(record);
    },
    handleEdit2 (record) {
      this.editingRecord = record;
      this.modalFormAction = "edit";
      this.$refs.modalForm.action = "Edit";
      this.showModalForm = true;
    },
    handleAdd() {
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.action = "Add";
      this.$refs.modalForm.disableSubmit = false;
      this.$refs.modalForm.add();
    },
    handleAdd2 () {
      this.editingRecord = { };
      this.modalFormAction = "add";
      this.$refs.modalForm.action = "Add";
      this.showModalForm = true;
    },
    handleView(record, title = "查看") {
      this.$refs.modalForm.title = title;
      this.$refs.modalForm.action = "View";
      this.modalFormAction = "Edit";
      this.showModalForm = true;
      this.$refs.modalForm.edit(record);
    },
    handleTableChange(changeData, filters, sorter) {
      // 分页、排序、筛选变化时触发
      // TODO 筛选
      if (sorter && Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = sorter.order === "ascend" ? "asc" : "desc";
      }
      this.ipagination = changeData.pagination;
      this.loadData();
    },
    handleToggleSearch() {
      this.toggleSearchStatus = !this.toggleSearchStatus;
    },
    modalFormOk () {
      this.showModalForm = false;
      // 新增/修改 成功时，重载列表
      this.loadData();
    },
    modalFormClose () {
      this.showModalForm = false;
    },
    handleDetail(record) {
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "详情";
      this.$refs.modalForm.disableSubmit = true;
    },
    handleDetail2 (record) {
      this.editingRecord = record;
      this.modalFormAction = "view";
      this.showModalForm = true;
    }
  }
}