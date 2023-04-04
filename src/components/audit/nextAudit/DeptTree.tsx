import Vue from "vue";
import { debounce } from "lodash";
import { filterTreeDict, generateList } from "../utils";
import { getDeptTreeData } from "./api/DeptTreeApi";
import "./style/DeptTreeStyle.less";

let deptList = [];
export default Vue.extend({
  name: "DeptTree",
  props: {
    depts: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: true
    },
    // 水务机构类型 0内部机构，1外部机构
    swOrganType: {
      type: String,
      default: ""
    },
    showTag: {
      type: Boolean,
      default: false
    },
    noDepartment: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedDepts: [],
      expandedKeys: [],
      departTree: [],
      searchValue: ""
    };
  },
  computed: {
    filterTreeDict() {
      return this.searchValue ? filterTreeDict(deptList, this.searchValue) : this.departTree;
    },
    checkedKeys() {
      return this.selectedDepts.filter(v => v.key).map(v => v.key);
    },
    currentSelectDept: {
      get() {
        return this.selectedDepts.map(item => ({ label: item.title, value: item.key }));
      },
      set(val: []) {
        if (!val || val.length === 0) {
          this.selectedDepts.length = 0;
        }
        this.selectedDepts = val;
        this.$emit("change", this.selectedDepts);
      }
    }
  },
  watch: {
    /**
     * 初始化传进来的部门信息处理
     */
    depts: {
      handler() {
        this.setInitChange();
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // 生成防抖函数
    this.changeSearchValue = debounce(val => {
      this.searchValue = val;
    }, 500);
    this.getDeptTreeData()
      .then(() => {
        this.$emit("ok");
      });
  },
  methods: {
    handleCheck(checkedKeys) {
      const myCheckedKeys = [];
      if (!this.multiple && checkedKeys.checked && checkedKeys.checked.length > 0) {
        myCheckedKeys.push(...checkedKeys.checked.slice(-1));
      } else {
        myCheckedKeys.push(...(checkedKeys.checked || []));
      }
      this.selectedDepts = deptList.filter(v => (checkedKeys.checked || []).includes(v.key));
      this.$emit("change", this.selectedDepts);
    },
    getDeptTreeData() {
      return getDeptTreeData()
        .then(v => {
          if (this.noDepartment) {
            this.deleteDept(v);
          }
          this.departTree = v;
          deptList = generateList(this.departTree);
          this.setInitChange();
          // 默认展开父节点
          this.expandedKeys = this.departTree.map(item => item.id);
          this.$emit("init-ok");
        });
    },
    /**
     * 触发点击事件
     */
    handleSelect(treeData) {
      this.$emit("change", treeData.node.data.id);
      // if (!this.multiple) {
      //   this.selectedDepts = deptList.filter(v => (selectedKeys || []).includes(v.key));
      //   this.$emit("change", this.selectedDepts);
      // }
    },
    /**
     * 初始化选中的数据
     * 如果父组件传入的部门数据没有orgCode，需要等待deptList有值之后查询完整的对象赋值给已选择的部门数组
     */
    setInitChange() {
      const val = this.depts;
      if (val && val[0] && val[0].orgCode) {
        this.selectedDepts = val;
      } else if (val && deptList && deptList.length > 0) {
        const keys = val.map(v => v.key);
        this.selectedDepts = deptList.filter(v => keys.includes(v.key));
        this.$emit("init-change", this.selectedDepts);
      }
    },
    /**
     * 部门取消选中，同步给父组件
     */
    handleSpliceSeleted(val) {
      this.selectedDepts = this.selectedDepts.filter(v => v.key !== val);
      this.$emit("change", this.selectedDepts);
    },
    /**
     * 去除掉数据中的部门
     * @param arr
     */
    deleteDept(arr = []) {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index]?.children?.[0].orgCategory !== "1") {
          delete arr[index].children;
          arr[index].isLeaf = true;
        } else {
          this.deleteDept(arr[index].children);
        }
      }
    },
    handleDeptChange(val) {
      this.changeSearchValue(val);
    },
    handleTagChange(val = []) {
      this.currentSelectDept = val;
    },
    handleTagInputChange(val) {
      const [first] = val;
      this.searchValue = first;
      if (val.length === 0) {
        this.selectedDepts = val;
        this.$emit("change", this.selectedDepts);
      }
    }
  },
  render() {
    return (
      <t-card bordered={false} class="dept-tree-container">
        {
          !this.showTag
            ? <t-tag-input
              value={this.selectedDepts.map(item => item.deptName)}
              onChange={this.handleTagInputChange}
              onInput={this.handle}
              placeholder="筛选"
            /> : <t-select-input
              style="width: 100%"
              placeholder="部门"
              value={this.currentSelectDept}
              allowInput
              clearable
              multiple
              on-input-change={this.handleDeptChange}
              onClear={() => { this.currentSelectDept = []; }}
              on-tag-change={this.handleTagChange}
            />
        }
        <t-tree
          activable
          hover
          keys={{ label: "label", value: "id" }}
          disableCheck={!this.multiple}
          defaultValue={this.checkedKeys}
          activeMultiple={this.multiple}
          value={this.checkedKeys}
          checkable={this.multiple}
          checked={this.checkedKeys}
          data={this.filterTreeDict}
          onChange={this.handleCheck}
          onClick={this.handleSelect}
        />
      </t-card>
    );
  }
});