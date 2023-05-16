<template>
  <t-popup
    expand-animation
    placement="bottom"
    trigger="click"
    :visible="isNoticeVisible"
    @visible-change="onPopupVisibleChange"
  >
    <template #content>
      <div class="header-msg" @wheel="scrollBarWheel">
        <div class="header-msg-top">
          <p>通知</p>
          <!-- TODO: Maybe change back -->
          <!-- <t-button
            v-if="tableData.length > 0"
            class="clear-btn"
            variant="text"
            theme="primary"
            @click="setRead('all')"
          >
            清空
          </t-button> -->
        </div>
        <div
          v-if="tableData.length > 0"
          ref="listDiv"
          style="height: 400px; overflow-y: scroll"
          :scrollTop="scrollData"
          class="narrow-scrollbar"
          :split="true"
          @scroll="ScrollM"
        >
          <t-list-item
            v-for="(item, index) in tableData"
            :key="index"
            :style="{ background: item.typeColor, color: '#fff' }"
            style="border-bottom: 1px solid #eee"
          >
            <div>
              <p class="msg-content">
                {{ item.alarmContent }}
              </p>
              <p class="msg-type">
                {{ item.levelName }}
              </p>
              <p class="msg-type">
                {{ item.typeName }}
              </p>
            </div>
            <p class="msg-time">
              {{ item.alarmTime }}
            </p>
            <template #action>
              <t-button size="small" variant="outline" @click="sureWarn(item)">
                {{ item.delType === "1" ? "确认" : "处理" }}
              </t-button>
            </template>
          </t-list-item>
        </div>

        <div v-else class="empty-list">
          <img src="../../assets/intelligentOilfield/nothing.png" alt="空">
          <p>暂无通知</p>
        </div>
        <div class="header-msg-bottom">
          <t-button
            class="header-msg-bottom-link"
            variant="text"
            theme="primary"
            @click="goDetail"
          >
            查看全部
          </t-button>
        </div>
      </div>
    </template>
    <t-badge :count="total" :offset="[10, 3]">
      <t-button
        theme="default"
        shape="square"
        variant="text"
        style="background: transparent; border: 0"
        @click="updateData"
      >
        <!-- <notification-icon style="color: var(--white-color);"/> -->
        <svg-icon icon-class="reminder" class="panelIconClass" />
      </t-button>
    </t-badge>
  </t-popup>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
// import { NotificationIcon } from 'tdesign-icons-vue';
import {
  queryAlcAlarmByParam,
  updateAlcAlarmCheckTag,
  popoverRingMessage
} from "@/api/intelligentOilfield/portal/projectionMode";
import { NotificationItem } from "@/interface";
import proxy from "@/config/host";
import jumpSupApp from "@/utils/jumpSupApp.js";

const env = import.meta.env.MODE;
export default Vue.extend({
  components: {
    // NotificationIcon,
  },
  data() {
    return {
      scrollData: 0,
      tableData: [],
      isNoticeVisible: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      timer: null,
      total: 0
    };
  },
  computed: {
    ...mapState("notification", ["msgData"])
  },
  watch: {
    isNoticeVisible() {
      if (this.isNoticeVisible) {
        this.getList(true);
      } else {
        this.tableData = [];
      }
    }
  },
  mounted() {
    // this.initData();
    this.getList(true);
    this.pollingTime();
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  methods: {
    initData() {
      this.tableData = [
        {
          typeName: "测试报警类型",
          sourceName: "测试报警名称",
          alarmContent:
            "测试报警内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长",
          levelName: "一级",
          alarmTime: "2023/2/17 17:25:00",
          type: "我的",
          typeColor: "#E90202"
        },
        {
          typeName: "测试报警类型1",
          sourceName: "测试报警名称1",
          alarmContent: "测试报警内容1",
          levelName: "三级",
          alarmTime: "2023/2/17 17:25:00",
          type: "全部",
          typeColor: "green"
        },
        {
          typeName: "测试报警类型2",
          sourceName: "测试报警名称2",
          alarmContent: "测试报警内容2",
          levelName: "二级",
          alarmTime: "2023/2/17 17:25:00",
          type: "我的",
          typeColor: "#E90202"
        },
        {
          typeName: "测试报警类型2",
          sourceName: "测试报警名称2",
          alarmContent: "测试报警内容2",
          levelName: "二级",
          alarmTime: "2023/2/17 17:25:00",
          type: "我的",
          typeColor: "#E90202"
        },
        {
          typeName: "测试报警类型2",
          sourceName: "测试报警名称2",
          alarmContent: "测试报警内容2",
          levelName: "二级",
          alarmTime: "2023/2/17 17:25:00",
          type: "我的",
          typeColor: "#E90202"
        }
      ];
    },
    ScrollM(e) {
      this.scrollData = e.target.offsetTop;
    },
    pollingTime() {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(() => {
        setTimeout(() => {
          // 重新调用第一个页的接口
          this.getList(true);
          // TODO: Maybe change back
          // 调接口
          popoverRingMessage().then(response => {
            if (response.data.data.hasPopup === "1") {
              // 是否弹窗 0否 1是
              this.isNoticeVisible = true;
              if (response.data.data.hasSound === "1") {
                // 是否响铃 0否 1是
                this.$emit("play-audio", true);
              } else {
                this.$emit("play-audio", false);
              }
            }
          });
        }, 0);
      }, 60000);
    },
    sureWarn(row) {
      if (row.delType === "1") {
        const queryParam = {
          alarmId: row.alarmId
        };
        // 确认接口
        this.$modal.confirm("是否已确定告警内容？").then(() =>
          updateAlcAlarmCheckTag(queryParam).then(() => {
            this.getList(true);
          })
        );
      } else {
        // 处置
        // window.open(row.delUrl, "_blank");
        window.open(`${proxy[env].ALARM_URL}${this.$store.getters["user/token"]}`, "_blank");
      }
    },
    scrollBarWheel(e) {
      e = e || window.event;

      if (e.wheelDelta) {
        // 判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta < 0) {
          this.queryParams.pageNum += 1;
          const maxPageNum = Math.ceil(this.total / 10);

          if (this.queryParams.pageNum <= maxPageNum) {
            this.getList(false);
          }
        }
      } else if (e.detail) {
        // Firefox滑轮事件
        if (e.detail < 0) {
          this.queryParams.pageNum += 1;
          const maxPageNum = Math.ceil(this.total / 10);
          if (this.queryParams.pageNum <= maxPageNum) {
            this.getList(false);
          }
        }
      }
    },
    updateData() {
      this.isNoticeVisible = true;
    },
    getList(firstPage) {
      //  TODO: Maybe change back
      // const _res = [
      //   {
      //     typeName: "测试报警类型",
      //     sourceName: "测试报警名称",
      //     alarmContent:
      //       "测试报警内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长",
      //     levelName: "一级",
      //     alarmTime: "2023/2/17 17:25:00",
      //     type: "我的",
      //     typeColor: "#E90202"
      //   },
      //   {
      //     typeName: "测试报警类型1",
      //     sourceName: "测试报警名称1",
      //     alarmContent: "测试报警内容1",
      //     levelName: "三级",
      //     alarmTime: "2023/2/17 17:25:00",
      //     type: "全部",
      //     typeColor: "green"

      //   },
      //   {
      //     typeName: "测试报警类型2",
      //     sourceName: "测试报警名称2",
      //     alarmContent: "测试报警内容2",
      //     levelName: "二级",
      //     alarmTime: "2023/2/17 17:25:00",
      //     type: "我的",
      //     typeColor: "#E90202"
      //   },
      //   {
      //     typeName: "测试报警类型2",
      //     sourceName: "测试报警名称2",
      //     alarmContent: "测试报警内容2",
      //     levelName: "二级",
      //     alarmTime: "2023/2/17 17:25:00",
      //     type: "我的",
      //     typeColor: "#E90202"
      //   }
      // ];
      // 获取列表
      if (process.env.NODE_ENV !== "development" && window.location.host !== "114.115.233.247:38085") {
        const param = {
          pageNum: 1,
          pageSize: 10
        };
        const currentParam = firstPage ? param : this.queryParams;
        // TODO: Maybe change back
        //   if (firstPage) {
        //     this.tableData = _res;
        //     this.total = 21;
        //   } else {
        //     this.tableData = [...this.tableData, ..._res];
        //   }
        if (this.$refs.listDiv) this.$refs.listDiv.scrollTop = 0;
        queryAlcAlarmByParam(currentParam).then(response => {
          const _res = JSON.parse(JSON.stringify(response.data.rows));
          if (firstPage) {
            this.tableData = _res;
            this.total = response.data.total;
          } else {
            this.tableData = [...this.tableData, ..._res];
          }
        });
      }
    },
    onPopupVisibleChange(visible: boolean, context) {
      if (context.trigger === "trigger-element-click") {
        this.isNoticeVisible = true;
        if (this.$refs.listDiv) this.$refs.listDiv.scrollTop = 0;
        return;
      }
      this.isNoticeVisible = visible;
    },
    goDetail() {
      jumpSupApp(proxy[env].MESSAGE_URL);
      this.isNoticeVisible = false;
    },
    setRead(type: string, item?: NotificationItem) {
      const changeMsg = this.msgData;
      if (type === "all") {
        changeMsg.forEach(e => {
          e.status = false;
        });
      } else {
        changeMsg.forEach(e => {
          if (e.id === item.id) {
            e.status = false;
          }
        });
      }
      this.$store.commit("notification/setMsgData", changeMsg);
    }
  }
});
</script>

<style lang="less" scoped>
@import "@/style/variables.less";

.header-msg {
  width: 400px;
  height: 500px;

  .empty-list {
    height: calc(100% - 104px);
    text-align: center;
    padding-top: 135px;
    font-size: 14px;
    color: var(--td-text-color-secondary);

    img {
      width: 63px;
    }

    p {
      margin-top: 30px;
    }
  }

  &-top {
    position: relative;
    height: 56px;
    font-size: 16px;
    color: var(--td-text-color-primary);
    text-align: center;
    line-height: 56px;
    border-bottom: 1px solid var(--td-component-border);

    .clear-btn {
      position: absolute;
      top: 12px;
      right: 24px;
    }
  }

  &-bottom {
    height: 48px;
    align-items: center;
    display: flex;
    justify-content: center;

    &-link {
      text-decoration: none;
      font-size: 14px;
      color: var(--td-brand-color);
      line-height: 48px;
      cursor: pointer;
    }
  }

  .t-list {
    height: calc(100% - 104px);
  }

  .t-list-item {
    overflow: hidden;
    width: 100%;
    padding: 16px 24px;
    border-radius: @border-radius;
    font-size: 14px;
    color: var(--td-text-color-primary);
    line-height: 22px;
    cursor: pointer;

    &:hover {
      transition: background 0.2s ease;
      background: var(--td-bg-color-container-hover);

      .msg-content {
        color: var(--td-brand-color-8);
      }

      .t-list-item__action {
        button {
          bottom: 16px;
          opacity: 1;
        }
      }

      .msg-time {
        bottom: -6px;
        opacity: 0;
      }
    }

    .msg-content {
      margin-bottom: 16px;
    }

    .msg-type {
      color: var(--td-text-color-secondary);
    }

    .t-list-item__action {
      button {
        opacity: 0;
        position: absolute;
        right: 24px;
        bottom: -6px;
      }
    }

    .msg-time {
      transition: all 0.2s ease;
      opacity: 1;
      position: absolute;
      right: 24px;
      bottom: 16px;
      color: var(--td-text-color-secondary);
    }
  }
}
</style>