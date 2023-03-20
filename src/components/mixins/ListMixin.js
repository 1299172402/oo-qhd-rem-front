import { postAction, getAction } from "@/api/common/manage";
import dayjs from "dayjs";
import {filterObj} from "../audit/utils";

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

      // 当前实例是否被销毁
      isDestroyed: false,
      // 生成字典映射
      dictMap: {},
      // deleteConfirm
      deleteMessage: "此操作将删除该条数据，是否继续？",
      deleteTitle: "提示",
      deleteConfirmText: '确定',
      deleteCancelText: '取消',
      deleteType: "warning"
    };
  },
  computed: {
    queryParamOther() {
      return {};
    }
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
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
        // this.initDictConfig();
      }
    },
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
      const httpAction = getAction
      return httpAction(this.url.list, params).then((res) => {
        if (this.handleLoadDataRes) {
          res = this.handleLoadDataRes(res.data);
        }
        if (res.data.code === 200) {
          this.dataSource = res.data.rows;
          this.ipagination.total = res.data.total;
        }
        if (res.data.code === 510) {
          this.$message.warning(res.data.message);
        }
        this.loading = false;
      });
    },
    getQueryParams() {
      const queryParam = { ...this.queryParam , ...this.queryParamOther};
      Object.keys(queryParam).forEach(key => {
        // 起始时间
        if (key.endsWith("_flag") && queryParam[key] && queryParam[key].length > 0) {
          queryParam[`${key.slice(0, -5)}Begin`] = dayjs(queryParam[key][0]).startOf("day").format("YYYY-MM-DD HH:mm:ss");
          queryParam[`${key.slice(0, -5)}End`] = dayjs(queryParam[key][1]).endOf("day").format("YYYY-MM-DD HH:mm:ss");
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
      param.pageNum = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      return filterObj(param);
    },
    /**
       * 删除数据
       * @param {*} id 数据id
       */
    handleDelete(id) {
      this.loading = true;
      this.$confirm(this.deleteMessage, this.deleteTitle, {
        confirmButtonText: this.deleteConfirmText,
        cancelButtonText: this.deleteCancelText,
        type: this.deleteType
      }).then(() => {
        postAction(`${this.url.delete}?id=${id}`)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.loadData(1);
            } else {
              this.$message.warning(res.data.msg);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    searchReset() {
      this.queryParam = {};
      this.loadData(1);
    },
    searchQuery() {
      return this.loadData(1);
    },
    handleTableChange(pagination, type = "element") {
      // 分页、排序、筛选变化时触发
      // TODO 筛选
      switch(type) {
      case "element":
        this.ipagination.current = pagination.page;
        this.ipagination.pageSize = pagination.limit;
        break;
      case "tdesign":
        this.ipagination.current = pagination.current;
        this.ipagination.pageSize = pagination.pageSize
        break;
      default:
        break
      }
      this.loadData();
    },
    handleEditToPage(row) {
      if (!this.routerInfo?.edit?.name) {
        this.$message.warning("请先配置routeInfo.edit.name")
      } else {
        this.$router.push({
          name: this.routerInfo?.edit?.name,
          params: this.routerInfo.edit.pararms,
          query: {
            ...this.routerInfo.edit.query,
            action: "edit",
            id: row.id
          }
        })
      }
    },
    handleAuditToPage(processInstanceId, id) {
      if (!this.routerInfo?.view?.name) {
        this.$message.warning("请先配置routeInfo.view.name")
      } else {
        postAction("/system/flow/task/taskIdByInstance", { processInstanceId }).then((res) => {
          if (res.firstTaskId) {
            this.$router.push({
              name: this.routerInfo.view.name,
              params: {
                ...this.routerInfo?.view?.parmas
              },
              query: {
                ...this.routerInfo?.view?.query,
                businessKey: id, // 交接单id
                taskId: res.firstTaskId, // 任务id
                processInstanceId // 流程实例id
              }
            })
          }
        })
      }
    },
    handleAddToPage() {
      if (!this.routerInfo?.edit?.name) {
        this.$message.warning("请先配置routeInfo.edit.name")
      } else {
        this.$router.push({
          name: this.routerInfo?.edit?.name,
          params: this.routerInfo.edit.params,
          query: {
            ...this.routerInfo.edit.query,
            action: "add"
          }
        })
      }
    },
    handleViewToPage({id}) {
      if (!this.routerInfo?.view.name) {
        this.$message.warning("请先配置routeInfo.view.name")
      } else {
        this.$router.push({
          name: this.routerInfo?.view?.name,
          params: this.routerInfo.view.params,
          query: {
            ...this.routerInfo?.view?.query,
            id,
            action: "view"
          }
        })
      }
    }
  }
}

export const ListMixins = {
  data() {
    return {
      loading: false,
      queryParams: {},
      dataSource: [],
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      fn: {},
      sizeStartProp: {
        pageNum: "pageNum",
        pageSize: "pageSize",
        currentSubtract: 0 // 0 表示分页从 1 开始查
      },
      defaultLoad: true
    };
  },
  mounted() {
    if (this.defaultLoad) {
      this.loadData();
    }
  },
  methods: {
    /**
     * 处理查询参数
     */
    getQueryParams() {
      // 获取查询条件
      const param = { ...this.queryParams };
      param[this.sizeStartProp.pageNum] = this.ipagination.current - this.sizeStartProp.currentSubtract;
      param[this.sizeStartProp.pageSize] = this.ipagination.pageSize;
      return filterObj({ ...param, ...(this.queryParamsOther || {}) });
    },
    /**
     * 加载列表页数据
     */
    loadData(args) {
      if (!this.fn.list) {
        this.$message.warning("请设置fn.list函数!");
        return;
      }
      this.loading = true;
      if (args === 1) {
        this.ipagination.current = 1;
      }
      this.fn.list(this.getQueryParams()).then((res) => {
        if (res && res.status === 200) {
          this.handleListResult(res);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    handleListResult(res) {
      this.dataSource = res.data.rows;
      this.ipagination.total = res.data.total;
    },
    /**
     * 查询
     */
    searchQuery() {
      this.loadData(1);
    },
    /**
     * 重置
     */
    searchReset() {
      this.queryParams = {};
      this.loadData();
    },
    /**
     * 点击分页重新加载数据
     */
    handlePage(pageInfo) {
      this.$set(this.ipagination, "current", pageInfo.page);
      this.$set(this.ipagination, "pageSize", pageInfo.limit);
      this.loadData();
    }
  }
};
export const DeleteMixin = {
  methods: {
    handleDelete(id) {
      this.$modal
        .confirm("是否确认删除该数据？")
        .then(() => this.fn.delete(id))
        .then(() => {
          this.$message.success("删除成功！");
          return this.loadData();
        })
        .catch(() => {
          this.$message.warning("已取消删除");
        });
    }
  }
};