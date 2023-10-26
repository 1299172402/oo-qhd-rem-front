import proxy from "@/config/host";
import { filterObj } from "@/utils/objectOperate";

const env = import.meta.env.MODE || "development";

export const processCenterPrefixApiMixin = {
  data() {
    return {
      prefixApi: proxy[env].processAPI
    };
  }
};
export const ProcessListMixin = {
  // mixins: [ProcessListMixin],
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
  activated() {
    this.loadData();
  },
  methods: {
    handleListResult(res) {
      this.dataSource = res.data;
      this.ipagination.total = res.total;
    },
    /**
     * 重写getQueryParams，处理查询参数，因流程平台根据起步条数来实现分页功能
     */
    getQueryParams() {
      // 获取查询条件
      const param = { ...this.queryParams };
      param[this.sizeStartProp.pageNum] = (this.ipagination.current - this.sizeStartProp.currentSubtract) * this.ipagination.pageSize;
      param[this.sizeStartProp.pageSize] = this.ipagination.pageSize;
      return filterObj({ ...param, ...(this.queryParamsOther || {}) });
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
      this.fn.list(this.getQueryParams()).then(res => {
        this.handleListResult(res);
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * 点击分页重新加载数据
     */
    handlePage(pageInfo) {
      this.$set(this.ipagination, "current", pageInfo.page);
      this.$set(this.ipagination, "pageSize", pageInfo.limit);
      this.loadData();
    },
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