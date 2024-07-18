/* eslint-disable */
const WebSocketMixins = () => {
  // 检查浏览器是否支持WebSocket
  if (!window.WebSocket) {
    console.error("当前浏览器暂不支持WebSocket服务!")
    return {};
  }

  return {
    data() {
      return {
        // WebSocket实例
        ws: null,
        // WebSocket连接的URL
        url: "",
        // WebSocket的子协议，可以是协议字符串，也可以是由子协议组成的数组
        wsProtocols: undefined,
        // 是否自动打开WebSocket
        autoOpen: true,
        // 是否自动重连
        isReconnect: true,
        // 是否在服务器关闭后立即重启
        isCloseAfterReset: false,
        // 重连次数
        reconnectCount: 3,
        // 重连间隔
        reconnectInterval: 3000,
        // 定时器对象
        reconnectionInterval: null
      };
    },
    computed: {
      // 若url不需要复杂处理，那么在使用混合时只需配置data中的url即可，若url较为复杂，则可重写wsUrl
      wsUrl() {
        return this.url;
      }
    },
    // wsUrl变动时重载
    watch: {
      wsUrl() {
        this.ws?.close();
        this.ws = null;
        this.initWs();
      }
    },
    mounted() {
      if (this.autoOpen) {
        this.initWs();
      }
    },
    beforeDestroy() {
      this.isCloseAfterReset = false;
      // 清除实例化的WebSocket对象
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      // 清除可能存在的计时器对象
      if(this.reconnectionInterval) {
        clearInterval(this.reconnectionInterval);
        this.reconnectionInterval = null;
      }
    },
    methods: {
      /**
       * 初始化WebSocket连接
       * @returns {Promise} - 返回一个Promise对象，表示WebSocket初始化状态
       */
      initWs() {
        return new Promise((resolve, reject) => {
          if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            reject(new Error("存在已开启的WebSocket服务"));
            return;
          }
          if (!this.wsUrl) {
            reject(new Error("请求地址缺失"));
            return;
          }
          this.ws = new WebSocket(this.wsUrl, this.wsProtocols);
          this.ws.addEventListener("open", event => {
            console.info("WebSocket连接已开启");
            this.ws.addEventListener("message", message => {
              this.processMessage(message);
            });
            this.ws.addEventListener("close", event => {
              console.info(`WebSocket连接已关闭，code: ${event.code}, reason: ${event.reason}`);
              this.webSocketClose(event);
              // 如果需要关闭后重新开启服务且当前无正在重试的计时器，则尝试重新连接
              if (this.isCloseAfterReset && !this.reconnectionInterval) {
                this.reconnectWebSocket();
              }
            });
            this.webSocketOpen();
            resolve(event);
          });
          this.ws.addEventListener("error", event => {
            reject(new Error(`Alarm WebSocket Connection Failed: ${event.message}`));
            this.webSocketError(event);
            // 如果允许自动重连且当前无正在重试的计时器，则尝试重新连接
            if (this.isReconnect && !this.reconnectionInterval) {
              this.reconnectWebSocket();
            }
          });
        });
      },
      /**
       * 重新连接WebSocket
       */
      reconnectWebSocket() {
        let count = 0;
        this.reconnectionInterval = setInterval(async () => {
          count += 1;
          // 达到重连次数限制，停止重连
          if (count > this.reconnectCount) {
            clearInterval(this.reconnectionInterval);
            this.reconnectionInterval = null;
            return;
          }
          console.info(`第${count}尝试连接服务器`);
          try {
            await this.initWs();
            clearInterval(this.reconnectionInterval);
            this.reconnectionInterval = null;
          } catch (e) {
            console.error(e);
          }
        }, this.reconnectInterval);
      },
      /**
       * 手动关闭WebSocket连接
       */
      handleClose() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.close();
          this.ws = null;
        } else {
          console.error("暂无可以关闭的WebSocket");
        }
      },
      /**
       * 处理WebSocket连接关闭后的逻辑，根据业务需求自行重写
       * @param {event} event - 关闭时返回的消息事件对象
       */
      webSocketClose(event) {},
      /**
       * 处理WebSocket连接打开后的逻辑，根据业务需求自行重写
       */
      webSocketOpen() {},
      /**
       * 处理WebSocket连接出现错误的逻辑，根据业务需求自行重写
       * @param {ErrorEvent} error - 接收到的错误消息事件对象
       */
      webSocketError(error) {},
      /**
       * 处理接收到的WebSocket消息，根据业务需求自行重写
       * @param {MessageEvent} message - 接收到的消息事件对象
       */
      processMessage(message) {}
    }
  };
};

export default WebSocketMixins();