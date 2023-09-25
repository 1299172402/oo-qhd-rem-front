<template>
  <div class="diff-display-table-container" :style="{'--add-color': addColor, '--delete-color': deleteColor}">
    <div class="diff-left">
      <div>{{ leftTip }}</div>
      <el-table
        :data="list"
        border
        :row-class-name="leftRowClassName"
        :cell-class-name="scope => cellClassName(scope, 'left')"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        >
          <template
            v-if="scope.row.oldItem"
            slot-scope="scope"
          >
            {{ item.formatter && item.formatter(scope.row) || scope.row.oldItem[item.prop] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="diff-right">
      <div>{{ rightTip }}</div>
      <el-table
        :data="list"
        border
        :row-class-name="rightRowClassName"
        :cell-class-name="cellClassName"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        >
          <template
            v-if="scope.row.newItem"
            slot-scope="scope"
          >
            {{ item.formatter && item.formatter(scope.row) || scope.row.newItem[item.prop] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "DiffDisplayTable",
  props: {
    // type 表示类型
    // 删除 delete，红色
    // 新增 add，绿色
    addColor: {
      type: String,
      default: "#d7ecd6"
    },
    deleteColor: {
      type: String,
      default: "#f7e5e5"
    },
    leftRowClassName: {
      type: Function,
      default: ({ row }) => {
        if (row.diffType === "DELETED") {
          return "is-delete";
        }
      }
    },
    rightRowClassName: {
      type: Function,
      default: ({ row }) => {
        if (row.diffType === "NEW") {
          return "is-add";
        }
      }
    },
    cellClassName: {
      type: Function,
      default: ({ row, column }, type) => {
        if (row.diffType === "UPDATED" && row.diffField?.includes(column.property)) {
          if (type === "left") {
            return "is-delete";
          }
          return "is-add";
        }
      }
    },
    leftTip: {
      type: String,
      default: "更新前"
    },
    rightTip: {
      type: String,
      default: "更新后"
    },
    columns: {
      type: Array,
      default: () => [
        {
          prop: "id",
          label: "ID",
          align: "center"
        },
        {
          prop: "name",
          label: "名sdfsdf称",
          align: "left",
          ellipsis: true
        },
        {
          prop: "code",
          label: "编码",
          align: "center"
        },
        {
          prop: "pId",
          label: "父ID",
          align: "center"
        }
      ]
    },
    list: {
      type: Array,
      default: () => [
        {
          id: 1,
          newItem: {
            id: 1,
            name: "姓名1",
            code: "name13sfsdfsfsf3",
            pId: "0"
          },
          oldItem: {
            id: 1,
            name: "姓名11",
            code: "name1sfsdfsfsf33",
            pId: "0"
          },
          diffType: "UPDATED",
          diffField: ["name"]
        },
        {
          id: 2,
          newItem: {
            id: 2,
            name: "姓名2",
            code: "name2",
            pId: "1"
          },
          oldItem: {
            id: 2,
            name: "姓名22sdfsfs舒服舒服",
            code: "name22",
            pId: "1"
          },
          diffType: "UPDATED",
          diffField: ["name", "code"]
        },
        {
          id: 3,
          newItem: null,
          oldItem: {
            id: 3,
            name: "姓名3",
            code: "name3",
            pId: "1"
          },
          diffType: "DELETED"
        },
        {
          id: 4,
          newItem: {
            id: 4,
            name: "姓名4",
            code: "name4",
            pId: "1"
          },
          oldItem: null,
          diffType: "NEW"
        }
      ]
    }
  }
};
</script>
<style scoped lang="less">
.diff-display-table-container {
  display: flex;

  > div {
    flex: 1;

    &.diff-right {
      margin-left: 20px;
    }
  }

  /deep/ table.el-table__body {
    .is-add td,
    .is-add {
      background-color: var(--add-color) !important;
    }

    .is-delete td,
    .is-delete {
      background-color: var(--delete-color) !important;
    }
  }
}

/deep/ td div.cell {
  min-height: 23px;
}

/deep/ .el-table__header th div.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>