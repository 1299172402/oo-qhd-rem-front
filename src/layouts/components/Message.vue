<template>
  <t-popup
    expand-animation
    placement="bottom"
    trigger="click"
    :visible="isNoticeVisible"
    @visible-change="onPopupVisibleChange"
  >
    <template #content>
      <div class="header-msg">
        <div class="header-msg-top">
          <p>通知（报警数目：{{ total }}）</p>
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
          style="height: 400px; overflow-y: scroll;"
          class="narrow-scrollbar"
          :split="true"
        >
          <t-list-item
            v-for="(item, index) in tableData"
            :key="index"
            :style="{
              color: item.typeColor,
              borderBottom: $store.state.setting.mode === 'light' ? '1px solid #eee' : '1px solid gray',
            }"
          >
            <div class="g-w100 g-h100" style="padding: 8px 16px;" @click="goDetail">
              <div class="g-row-flex">
                <div class="g-row-flex">
                  <p class="msg-level" :style="{ background: item.typeColor }">
                    {{ item.levelName }}
                  </p>
                  <p class="msg-type" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#000' }">
                    {{ item.typeName }}
                  </p>
                </div>
                <p class="msg-time">
                  {{ item.alarmTime }}
                </p>
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <p class="msg-content" v-html="item.alarmContent" />
            </div>
          </t-list-item>
          <div class="g-row-flex-H">
            {{ tableData.length >= total ? "已全部加载完成" : "加载中..." }}
          </div>
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
    <t-badge
      :count="total"
      :offset="[12, 3]"
    >
      <t-button
        theme="default"
        shape="square"
        variant="text"
        style="background: transparent; border: 0;"
        @click="updateData"
      >
        <!-- <notification-icon style="color: var(--white-color);"/> -->
        <svg-icon
          :icon-class="$store.state.setting.mode === 'light' ? 'notice-new' : 'notice-new-dark'"
          class="panelIconClass"
        />
      </t-button>
    </t-badge>
  </t-popup>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { queryAlcAlarmByParam } from "@/api/intelligentOilfield/portal/projectionMode";
import { NotificationItem } from "@/interface";
import proxy from "@/config/host";
import jumpSupApp from "@/utils/jumpSupApp.js";
import WebSocketMixins from "@/components/mixins/WebSocketMixins.js";

const env = import.meta.env.MODE;
export default Vue.extend({
  components: {
    // NotificationIcon,
  },
  mixins: [WebSocketMixins],
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
      total: 0,
      reconnectCount: 2,
      isCloseAfterReset: true
    };
  },
  computed: {
    ...mapState("notification", ["msgData"]),
    wsUrl() {
      return `${proxy[env].WEB_SOCKET_URL}${this.$store.getters["user/userInfo"]?.userName}`;
    }
  },
  watch: {
    // isNoticeVisible() {
    //   if (this.isNoticeVisible) {
    //     this.getList(true);
    //   } else {
    //     this.tableData = [];
    //   }
    // }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.getList(true);
    this.pollingTime();
  },
  destroyed() {
    window.clearInterval(this.timer);
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll(e) {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight && this.isNoticeVisible) {
        this.queryParams.pageNum += 1;
        const maxPageNum = Math.ceil(this.total / 10);
        if (this.queryParams.pageNum <= maxPageNum) {
          this.getList(false);
        }
      }
    },
    pollingTime() {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(() => {
        setTimeout(() => {
          // 重新调用第一个页的接口
          if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            this.ws.send("{}");
          }
          this.getList(true);
          if (this.$refs.listDiv) this.$refs.listDiv.scrollTop = 0;
        }, 0);
      }, 30000);
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
      this.getList(true);
    },
    getList(firstPage) {
      if (process.env.NODE_ENV === "release") {
        const param = {
          pageNum: 1,
          pageSize: 10
        };
        const currentParam = firstPage ? param : this.queryParams;
        queryAlcAlarmByParam(currentParam, false).then(response => {
          if (response?.data?.rows) {
            const _res = JSON.parse(JSON.stringify(response.data.rows));
            if (firstPage) {
              this.queryParams.pageNum = 1;
              this.tableData = _res;
              this.total = response.data.total;
            } else {
              this.tableData = [...this.tableData, ..._res];
            }
          }
        });
      }
    },
    onPopupVisibleChange(visible: boolean, context) {
      if (!visible) {
        if (this.$refs.listDiv) this.$refs.listDiv.scrollTop = 0;
      }
      if (context.trigger === "trigger-element-click") {
        this.isNoticeVisible = true;
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
    },
    processMessage(message) {
      try {
        const data = JSON.parse(message?.data);
        if (data.type === "alarm_sos") {
          this.getList(true);
          this.isNoticeVisible = true;
          this.$emit("play-audio", true);
        }
      } catch (error) {
        console.error("WebSocket信息无法正确解析");
      }
    }
  }
});
</script>

<style>
.t-badge--circle {
  color: transparent;
  width: 10px;
  height: 11px;
}
</style>
<style lang="less" scoped>
@import "@/style/variables.less";

.t-popup__content {
  padding: 0;

  .header-msg {
    width: 495px;
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
      // TODO: Maybe change back
      // padding: 8px 16px;
      padding: 0;
      border-radius: @border-radius;
      font-size: 14px;
      color: var(--td-text-color-primary);
      line-height: 18px;
      cursor: pointer;

      &:hover {
        transition: background 0.2s ease;
        background: var(--td-bg-color-container-hover);

        .msg-content {
          color: var(--td-brand-color-8);
          font-size: 12px;
          margin-top: 5px;
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
          font-size: 10px;
        }
      }

      .msg-content {
        margin-bottom: 10px;
        font-size: 12px;
        margin-top: 5px;
      }

      .msg-type {
        color: var(--td-text-color-secondary);
        font-size: 10px;
        width: 289px;
      }

      .msg-level {
        color: #fff;
        width: fit-content;
        border-radius: 4px;
        font-size: 10px;
        padding: 1px 10px;
        margin-right: 5px;
        transform: scale(0.83);
      }

      .t-list-item__action {
        button {
          opacity: 0;
          position: absolute;
          right: 24px;
          top: 5px;
        }
      }

      .msg-time {
        transition: all 0.2s ease;
        opacity: 1;
        color: var(--td-text-color-secondary);
        font-size: 10px;
      }
    }
  }
}
</style>