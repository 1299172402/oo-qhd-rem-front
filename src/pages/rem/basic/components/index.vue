<template>
  <div class="menu menuColor">
    <!--隐藏菜单-->
    <div class="ensconce" style="cursor: pointer">
      <h2>
        <img v-if="$store.state.setting.mode === 'dark'" src="@/assets/treeSelectDark2.png" alt="">
        <img v-else src="@/assets/treeSelectWhite2.png" alt="">
        <div class="navClass">
          目标导航
        </div>
      </h2>
    </div>
    <!--显示菜单-->
    <div class="open openColor" :class="$store.state.setting.mode === 'dark' ? 'open' : 'open-white'">
      <div class="navH navHColor" style="cursor: pointer">
        <div style="font-size: 14px;font-weight: 500;">
          目标导航
        </div>
        <span>
          <img
            v-if="$store.state.setting.mode === 'dark'"
            class="obscure"
            src="@/assets/treeSelectDark1.png"
            alt=""
          >
          <img
            v-else
            class="obscure"
            src="@/assets/treeSelectWhite1.png"
            alt=""
          >
        </span>
      </div>
      <div class="navBox">
        <el-tree
          ref="tree"
          :data="deptOptions"
          node-key="value"
          show-checkbox
          accordion
          :expand-on-click-node="false"
          :default-expand-all="false"
          :check-strictly="false"
          :default-checked-keys="['715AD1CD60484BB59E737CD18A9DE44A','3FC9A818F5BC43B88270DB80BBB3018F']"
          @check="handleCheckChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {getYczcTree} from "@/api/rem/marster.js";

export default {
  props: {
    "level": {
      type: String,
      default: "5"
    },
    "start": {
      type: Number,
      default: 0
    },
    "end": {
      type: Number,
      default: 0
    },
    "arrayData":{
      type:Array,  
    },
      "type":{
          default: 0
      }
  },
  data() {
    return {
      deptOptions:[]
    };
  },
  mounted() {
    this.init();
    this.getTreeData();
  },
  updated() {
    this.init();
  },
  methods: {
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.value,
        label: node.label,
        children: node.children,
      }
    },
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
            that.$emit('change')
          })
        }, 350);
      };
      // 显示菜单
      const showC = document.querySelector(".ensconce");
      showC.onclick = function () {
        open.style.marginLeft = "0px";
        setTimeout(() => {
          ensconce.style.display = "none";
          that.$nextTick(() => {
            that.$emit('change')
          })
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
      const fontSize = 100 / 1080 * width;
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
        const fontSize = 100 / 1080 * width;
        /* 设置fontsize */
        html.style.fontSize = `${fontSize}px`;
      };
    },
    getTreeData() {
      const params = { level: this.level, operationZoneId: "715AD1CD60484BB59E737CD18A9DE44A" };
      if(this.type==1){
            this.deptOptions = this.arrayData;
            this.setDisabledRecursive(this.deptOptions, this.start, this.end);
      }else if (this.type==0){
          getYczcTree(params).then((res)=>{
              this.deptOptions = res.data.data;
              this.setDisabledRecursive( this.deptOptions, this.start, this.end);
          })  
      }
      else if (this.type==3){
          this.deptOptions = this.arrayData;
          this.setDisabledRecursive(this.deptOptions, this.start, this.end)
          this.$nextTick(()=>{
              this.$refs.tree.setCheckedNodes([{
                  value: "83D33B89B0DAB7DFA440BD060746883A",
                  label: '秦皇岛32-6南区'
              }]);
          })
      }
    },
    setDisabledRecursive(options, minLevel = 0, maxLevel = Number.MAX_SAFE_INTEGER) {
      options.forEach((option) => {
        if (option.level < minLevel || option.level > maxLevel) {
          return
        }
        option.disabled = true
        if (option.children) {
          this.setDisabledRecursive(option.children, minLevel, maxLevel)
        }
      })
    },
    handleCheckChange(data, checked) {
      this.resetChecked(data, checked)
    },
    resetChecked(data, checked) {
      let obj = checked.halfCheckedNodes.concat([data])
      this.$emit('childinfo', obj)
      this.$refs.tree.setCheckedNodes([{
        value: data.value,
        label: data.label
      }]);
    }
  }
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

</style>