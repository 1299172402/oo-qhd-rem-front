<template>
  <div class="menu menuColor">
    <!--隐藏菜单-->
    <div class="ensconce" style="cursor: pointer">
      <h2>
        <img v-if="$store.state.setting.mode === 'dark'" src="@/assets/treeSelectDark2.png" alt="" />
        <img v-else src="@/assets/treeSelectWhite2.png" alt="" />
        <div class="navClass">目标导航</div>
      </h2>
    </div>
    <!--显示菜单-->
    <div class="open openColor" :class="$store.state.setting.mode === 'dark' ? 'open' : 'open-white'">
      <div class="navH navHColor" style="cursor: pointer">
        <div style="font-size: 14px; font-weight: 500">目标导航</div>
        <span>
          <img v-if="$store.state.setting.mode === 'dark'" class="obscure" src="@/assets/treeSelectDark1.png" alt="" />
          <img v-else class="obscure" src="@/assets/treeSelectWhite1.png" alt="" />
        </span>
      </div>
      <div class="navBox">
        <!-- :data="deptOptions" -->
        <el-tree
          ref="tree"
          :props="{ isLeaf: 'isLeaf' }"
          lazy
          :load="loadNode"
          node-key="value"
          show-checkbox
          accordion
          :expand-on-click-node="false"
          :default-expand-all="false"
          :check-strictly="true"
          :default-checked-keys="defaultCheckedKeys"
          @check="handleCheck"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { keys } from "lodash";
import {
  fetchFields,
  fetchOilFields,
  fetchPlatforms,
  fetchProductionWells,
  fetchProductionWellsByPlatform,
  fetchInjectionWells,
  fetchInjectionWellsByPlatform,
  selectWellGroup,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, QueryPlatformDetail, QueryWellDetail } from "@/api/rem/marster.js";
// import { wellGroupList } from "@/api/rem/wellgroupinformaintenance";

export default {
  props: {
    // 树结构类型1：油井，2：水井，3：水井井组，4：井组
    treeType: {
      type: Number,
      default: 1,
    },
    level: {
      type: String,
      default: "5",
    },
    orgId: {
      type: String,
      default: "715AD1CD60484BB59E737CD18A9DE44A",
    },
    start: {
      type: Number,
      default: 4,
    },
    end: {
      type: Number,
      default: 5,
    },
    // 默认选中数据
    defaultCheckedKeys: {
      type: Array,
      default: () => ["715AD1CD60484BB59E737CD18A9DE44A"],
    },
  },
  data() {
    return {
      deptOptions: [],
      selectKeys: [], // 所有选中的数据集合
    };
  },
  watch: {
    defaultCheckedKeys() {
      this.setCheckedKeys([...this.defaultCheckedKeys]);
    },
  },
  async mounted() {
    this.init();
    // await this.getTreeData();
  },
  updated() {
    this.init();
  },
  methods: {
    // 初始化方法
    init() {
      // 隐藏菜单
      const obscure = document.querySelector(".navH");
      const open = document.querySelector(".open");
      const ensconce = document.querySelector(".ensconce");
      let that = this;
      obscure.onclick = () => {
        open.style.marginLeft = "-300px";
        setTimeout(() => {
          ensconce.style.display = "block";
          that.$nextTick(() => {
            that.$emit("change");
          });
        }, 350);
      };
      // 显示菜单
      const showC = document.querySelector(".ensconce");
      showC.onclick = function () {
        open.style.marginLeft = "0px";
        setTimeout(() => {
          ensconce.style.display = "none";
          that.$nextTick(() => {
            that.$emit("change");
          });
        }, 100);
      };
      obscure.onclick();
      //= ==========================================
      /* rem 适应 */
      /* 让文字和标签的大小随着屏幕的尺寸做变话 等比缩放 */
      const html = document.getElementsByTagName("html")[0];
      /* 取到屏幕的宽度 */
      let width = window.innerWidth;
      /* 640 100  320 50 */
      if (width > 1080) {
        width = 1080;
      } else if (width < 320) {
        width = 320;
      }
      const fontSize = (100 / 1080) * width;
      /* 设置fontsize */

      html.style.fontSize = `${fontSize}px`;
      window.onresize = function () {
        const html = document.getElementsByTagName("html")[0];
        /* 取到屏幕的宽度 */
        let width = window.innerWidth;
        if (width > 1080) {
          width = 1080;
        } else if (width < 320) {
          width = 320;
        }
        /* 640 100  320 50 */
        const fontSize = (100 / 1080) * width;
        /* 设置fontsize */
        html.style.fontSize = `${fontSize}px`;
      };
    },
    // 初始化及懒加载树结构数据
    async loadNode(node, resolve) {
      if (node.level === 0) {
        let arr = [];
        await QueryOgfDetail({ operationZoneId: this.orgId }).then((res) => {
          let code = res.data.code;
          if (code == 200) {
            res.data.data.map((item) => {
              arr.push({
                ...item,
                label: item.ogfName,
                value: item.ogfId,
                level: 0,
                // parent: node.parent,
              });
            });
          }
        });
        return resolve(arr);
      }
      if (node.level === 1) {
        let arr = [];
        await QueryReservoirAnalyseUnit({ ogfId: node.data.value }).then((res) => {
          let code = res.data.code;
          if (code == 200 && res.data?.data?.length) {
            res.data.data.map((item) => {
              arr.push({
                ...item,
                label: item.reservoirAnalyseUnitName,
                value: item.reservoirAnalyseUnitId,
                level: 1,
                parent: node,
              });
            });
          }
        });
        return resolve(arr);
      }
      if (node.level === 2) {
        let arr = [];
        if (this.treeType === 3) {
          await selectWellGroup({
            ogfId: node.parent.data.value,
            blockId: node.data.value,
            dateTime: new Date().format("yyyy-MM-dd"),
          }).then((res) => {
            let code = res.data.code;
            if (code == 200) {
              res.data.data.map((item) => {
                if (item.platName != "全部") {
                  arr.push({
                    ...item,
                    label: item.wellGroupName,
                    value: item.wellGroupId,
                    level: 2,
                    parent: node,
                    isLeaf: true,
                  });
                }
              });
            }
          });
        } else if (this.treeType === 4) {
          await selectWellGroup({
            ogfId: node.parent.data.value,
            blockId: node.data.value,
            dateTime: new Date().format("yyyy-MM-dd"),
            // blockId: "YCFXDY8B643EDC9007F96F570600457D",
          }).then((res) => {
            let code = res.data.code;
            if (code == 200) {
              res.data.data.map((item) => {
                if (item.platName != "全部") {
                  arr.push({
                    ...item,
                    label: item.wellGroupName,
                    value: item.wellGroupId,
                    level: 2,
                    parent: node,
                    isLeaf: true,
                  });
                }
              });
            }
          });
        } else {
          await fetchPlatforms({ oilFieldId: node.parent.data.value, selectBlock: node.data.value }).then((res) => {
            if (res.data.code == 200) {
              res.data.data.platform.map((item) => {
                if (item.platName != "全部") {
                  arr.push({
                    ...item,
                    label: item.platName,
                    value: item.platFormId,
                    level: 2,
                    parent: node,
                  });
                }
              });
            }
          });
        }

        return resolve(arr);
      }
      if (node.level === 3) {
        if (this.treeType === 1 || this.treeType === 2) {
          let arr = [];
          // if (node.data.value == node.parent.parent.data.value) {
          //   if (this.treeType === 1) {
          //     await fetchProductionWells({ oilFieldId: node.parent.parent.data.value }).then((res) => {
          //       let code = res.data.code;
          //       if (code == 200) {
          //         res.data.data.productionWells.map((item) => {
          //           arr.push({
          //             ...item,
          //             label: item.wellName,
          //             value: item.wellId,
          //             isLeaf: true,
          //             level: 3,
          //             parent: node,
          //           });
          //         });
          //       }
          //     });
          //   } else {
          //     await fetchInjectionWells({ oilFieldId: node.parent.parent.data.value }).then((res) => {
          //       let code = res.data.code;
          //       if (code == 200) {
          //         res.data.data.injectionWell.map((item) => {
          //           arr.push({
          //             ...item,
          //             label: item.wellName,
          //             value: item.wellId,
          //             isLeaf: true,
          //             level: 3,
          //             parent: node,
          //           });
          //         });
          //       }
          //     });
          //   }
          // } else {
          //   if (this.treeType === 1) {
          //     await fetchProductionWellsByPlatform({ platformId: node.data.value }).then((res) => {
          //       let code = res.data.code;
          //       if (code == 200) {
          //         res.data.data.productionWells.map((item) => {
          //           arr.push({
          //             ...item,
          //             label: item.wellName,
          //             value: item.wellId,
          //             isLeaf: true,
          //             level: 3,
          //             parent: node,
          //           });
          //         });
          //       }
          //     });
          //   } else {
          //     await fetchInjectionWellsByPlatform({ platformId: node.data.value }).then((res) => {
          //       let code = res.data.code;
          //       if (code == 200) {
          //         res.data.data.injectionWell.map((item) => {
          //           arr.push({
          //             ...item,
          //             label: item.wellName,
          //             value: item.wellId,
          //             isLeaf: true,
          //             level: 3,
          //             parent: node,
          //           });
          //         });
          //       }
          //     });
          //   }
          // }
          await QueryWellDetail({
            ogfId: node.parent.parent.data.value,
            platformId: node.data.value == node.parent.parent.data.value ? undefined : node.data.value,
            blockId: node.parent.data.value,
            wellboreType: this.treeType === 1 ? "采油井" : "注水井",
          }).then((res) => {
            if (res.data.code == 200) {
              res.data.data.map((item) => {
                arr.push({
                  ...item,
                  label: item.wellName,
                  value: item.wellId,
                  isLeaf: true,
                  level: 3,
                  parent: node,
                });
              });
            }
          });
          return resolve(arr);
        } else {
          return resolve([]);
        }
      }
      if (node.level > 3) {
        return resolve([]);
      }
    },
    // 获取当前元素的所有父级
    getParentId(list, name, value) {
      for (let i in list) {
        if (list[i][name] == value) {
          return [list[i]];
        }
        if (list[i].children) {
          let node = this.getParentId(list[i].children, name, value);
          if (node !== undefined) {
            return node.concat(list[i]);
          }
        }
      }
    },
    // 节点被点击时的回调事件
    handleCheck(data, checked) {
      // 处理tree交互选中逻辑
      if (data.level == 1) {
        // 区块级选中
        this.$refs.tree.setCheckedKeys([data.parent.data.value, data.value]);
      } else if (data.level == 2) {
        // 平台级选中
        this.$refs.tree.setCheckedKeys([data.parent.parent.data.value, data.parent.data.value, data.value]);
      } else if (data.level == 3) {
        // 井号级选中
        this.$refs.tree.setCheckedKeys([
          data.parent.parent.parent.data.value,
          data.parent.parent.data.value,
          data.parent.data.value,
          data.value,
        ]);
      }
      // 处理tree数据逻辑
      this.resetChecked(data, checked);
    },
    // 节点被点击时数据处理
    resetChecked(data, checked) {
      this.selectKeys = this.$refs.tree.getCheckedKeys(false, true);
      let selectList = {
        // orgId: null,
        ogfId: null, // 油田
        blockId: "", // 区块
        platformId: "", // 平台
        wellId: "", // 井号
        wellGroupId: "", // 井组
      };
      // checked.checkedNodes.map((item) => {
      this.$refs.tree.getCheckedNodes(false, true).map((item) => {
        if (item.level == 0) {
          // 油田
          selectList.ogfId = item.value;
        } else if (item.level == 1) {
          // 区块
          selectList.blockId = item.value;
        } else if (item.level == 2) {
          if (this.treeType === 3 || this.treeType === 4) {
            // 井组
            selectList.wellGroupId = item.value;
          } else {
            // 平台
            selectList.platformId = item.value;
          }
        } else if (item.level == 3) {
          // 井号
          selectList.wellId = item.value;
        }
      });
      this.$emit("getSelectItems", selectList, data);
    },
    // 通过 keys 设置目前勾选的节点
    setCheckedKeys(keys) {
      this.selectKeys = keys;
      this.$refs.tree.setCheckedKeys(keys);
    },
  },
};
</script>

<style scoped lang="less">
.menu {
  overflow: hidden;
  height: 100%;
  float: left;
  -webkit-touch-callout: none;
  user-select: none;
  box-shadow: 0 0 10px 0 rgba(144, 147, 153, 0.3);
}

.menu .ensconce {
  /* 隐藏菜单样式 */
  width: 0.3rem;
  height: 100%;
  float: left;
  text-align: center;
  position: relative;
  display: none;
}

.menu .ensconce h2 {
  cursor: pointer;
  font-size: 0.18rem;
  line-height: 0.5rem;
  width: 100%;
  position: absolute;
  top: 34%;
}

.menu .ensconce h2 img {
  width: 52%;
}

.menu .open {
  /* 显示菜单样式 */
  width: 2.6rem;
  height: 100%;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  transition: all 0.8s ease;
}

.menu .open-white {
  width: 2.6rem;
  height: 100%;
  background-color: #fff;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  transition: all 0.8s ease;
}

.menu .open .navH {
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: left;
  font-size: 0.18rem;
  position: relative;
  box-sizing: border-box;
  padding-left: 20px;
}

.menu .open .navH span {
  position: absolute;
  top: 49%;
  right: 0;
  padding: 0 0.15rem;
  cursor: pointer;
  transform: translate(0, -50%);
  display: inline-block;
}

.menu .open .navH span .obscure {
  width: 0.15rem;
}

.menu .open .navBox {
  height: 100%;
  overflow-y: auto;
  padding-left: 0.05rem;
  padding-right: 0.07rem;
  margin-top: 0.1rem;
  padding-bottom: 70px;
}

.menu .open .navBox ul li {
  background-color: #393c4a;
  cursor: pointer;
  margin-bottom: 4px;
}

.menu .open .navBox ul li .obtain {
  background-color: #3889d4;
}

.menu .open .navBox ul li .obtain:hover {
  background-color: #3d8332;
}

.menu .open .navBox ul li h2 {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.15rem;
  padding: 0.15rem 0;
  transition: all 0.6s ease;
}

.menu .open .navBox ul li h2 i {
  position: absolute;
  top: 50%;
  right: 0.15rem;
  border-top: 0.07rem transparent dashed;
  border-left: 0.07rem solid #fff;
  border-right: 0.07rem transparent dashed;
  border-bottom: 0.07rem transparent dashed;
  display: inline-block;
  transition: -ms-transform 0.6s ease;
  transform-origin: 4px 3px;
  transform: translate(0, -50%);
}

.menu .open .navBox ul li h2 .arrowRot {
  transform: rotate(90deg);
}

.menu .open .navBox ul li .secondary {
  overflow: hidden;
  height: 0;
  transition: all 0.6s ease;
}

.menu .open .navBox ul li .secondary h3 {
  padding: 0.1rem 0;
  text-align: center;
  font-size: 0.13rem;
  background-color: #282c3a;
  color: #fff;
  border-bottom: 0.8px solid #42495d;
  transition: all 0.4s ease;
}

.menu .open .navBox ul li .secondary h3:hover {
  background-color: #1acbfc;
}

.menu .open .navBox ul li .secondary .seconFocus {
  background-color: #1acbfc;
  box-shadow: 3px 3px 3px #aa8c51;
}

.navClass {
  font-size: 14px;
  writing-mode: vertical-rl;
  width: 38px;
  margin: 0 auto;
  letter-spacing: 0.5em;
  font-weight: 500;
}

/deep/ .el-tree > .el-tree-node > .el-tree-node__content .el-checkbox {
  display: none;
}
::v-deep .el-checkbox.is-disabled {
  display: none;
}
</style>
