import Vue from "vue";
import BInput from "../common/BInput";
import store from "@/store";
import { getUserList, getRecentList } from "./api/api";
import { filterObj } from "../utils";

export default Vue.extend({
  name: "SelectAuditorByDepModalForAudit",
  components: {
    BInput
  },
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
    },
    selectOk: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      queryParam: {
        nickName: ""
      },
      selectModule: 1,
      cardStyle: "",
      role: "",
      orgCode: "",
      columns: [
        { title: "", colKey: "id", width: 60, align: "center", cell: (h, { row }) => <t-radio value={row.userId} onClick={() => { (this as any).onSelectChange(row); }}></t-radio> },
        {
          title: "用户姓名",
          align: "center",
          colKey: "nickName"
        },
        {
          title: "部门",
          align: "center",
          colKey: "deptName",
          cell: (h, { row }) => <div>{row.dept.deptName}</div>
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
    // 计算属性的 getter
    getType() {
      return this.multi === true ? "checkbox" : "radio";
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
          if (this.userIds.search(v.userId) !== -1) {
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
      const that = this as any;
      that.selectedRowKeys = [];
      that.selectUserIds = [];
      that.selectedDepIds = [];
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
      const that = this as any;
      this.getSelectUserRows();
      this.selectOk(that.selectUserRows, that.selectUserIds);
      that.close();
    },
    // 获取选择用户信息
    getSelectUserRows() {
      const { dataSource } = this;
      let userIds = "";
      this.selectUserRows = [];
      for (let i = 0, len = dataSource.length; i < len; i++) {
        if (this.selectedRowKeys.includes(dataSource[i].userId)) {
          this.selectUserRows.push(dataSource[i]);
          userIds = `${userIds},${dataSource[i].userId}`;
        }
      }
      this.selectUserIds = userIds.substring(1);
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
    onDepSelect() {
      // this.orgCode = this.departArray.find(v => v.id === selectedDepIds[0]).orgCode;
      // if (selectedDepIds[0] != null) {
      if (this.param.auditUserSearchCallBackData) {
        this.initQueryUserByDepId(this.param.auditUserSearchCallBackData); // 调用方法根据选选择的id查询用户信息
        // if (this.selectedDepIds[0] !== selectedDepIds[0]) {
        //   this.selectedDepIds = [selectedDepIds[0]];
        // }
      }
      this.loadUserIds();
    },
    onSelectChange(row) {
      this.selectedRowKeys = [row.userId];
      this.selectionRows = [row];
      this.handleSubmit();
    },
    onSearch() {
      this.loadData(1);
    },
    // 根据选择的id来查询用户信息
    initQueryUserByDepId() {
      this.loading = true;
      return getUserList({ roleCode: this.switchOn ? "" : this.role, orgCode: this.orgCode, ...this.getQueryParams() }).then(res => {
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
      return getUserList({ roleCode: this.switchOn ? "" : this.role, orgCode: this.orgCode, nickName: this.queryParam.nickName }).then(res => {
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
  },
  render() {
    // eslint-disable-next-line
    const popupContent = () => (
      <t-card
        bordered={false}
        style="height: 280.5px;overflow-y: auto;overflow-x: hidden;min-width:400px"
      >
        <t-tree
          data={this.departTree}
          selectable
          blockNode={true}
          class="tree"
          expandAction={false}
        >
        </t-tree>
      </t-card>
    );

    return (
      <div>
        {/* <t-popup content={popupContent}>
          <div>
            <t-icon
              style={{display: this.selectModule !== 2 ? "inline-block" : "none"}}
              class="icon-show"
              type={this.iconType === true ? "left" : "right"}
            />
            <span class="icon-text">(点击查看单位)</span>
          </div>
        </t-popup> */}
        <t-card
          bordered={false}
          style="line-height:48px; height: 280px"
        >
          <div style="display: flex">
            <t-select
              value={this.selectModule}
              style="width: 70px; display: inline-block"
              default-value={1}
              onChange={value => { this.selectModule = value; }}
            >
              <t-option value={1} label="人员">
              </t-option>
              {/* <t-option value={2} label="最近">
              </t-option> */}
            </t-select>
            <t-input
              style={{ display: this.selectModule !== 2 ? "inline-block" : "none", width: "250px", marginBottom: "15px", marginLeft: "10px" }}
              placeholder="请输入姓名"
              type="search"
              value={this.queryParam.nickName}
              onChange={this.queryUserByName}
              onSearch={this.queryUserByName}
            >
            </t-input>
            {/* <span style="float: right">
              <span style="height: 48px; float: right; margin-left: 20px; margin-top: -25px">
                <span style={{display: this.selectModule !== 2 ? "inline-block" : "none", height: "50%", width: "100%", float: "left"}}>所有</span>
                <span style={{display: this.selectModule !== 2 ? "inline-block" : "none", height: "50%", float: "left"}}>
                  <t-switch value={this.switchOn} onChange={val => {this.switchOn = val}} style="width: 55px" />
                </span>
              </span>
            </span> */}
          </div>
          <t-table
            ref="table"
            size="small"
            rowKey="userId"
            columns={this.columns}
            data={this.dataSource}
            pagination={this.selectModule === 1 ? this.ipagination : null}
            loading={this.loading}
            onChange={this.handleTableChange}
            style="overflow-y: auto; height: 184px; margin-bottom: 8px"
          >
          </t-table>
        </t-card>
      </div>
    );
  }
});