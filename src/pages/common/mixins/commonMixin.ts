export default {
  methods: {
    /**
       * 如果 processDefinitionKey 值为 to_do_integration
       * 则新开窗口，地址为 extendProps.url
       * @param {*} row
       * @returns
       */
    isWindowOpenOther(row) {
      if (row.processDefinitionKey === "to_do_integration") {
        let { url } = row.extendProps;
        if (url) { // 跳转外部链接的话需要拼接token
          const {syToken} = this.$store.getters;
          if (syToken) {
            const location = url.indexOf("?");
            if (location === -1) {
              url = `${url}?token=${syToken}`;
            } else if (location === url.length - 1) {
              url = `${url}token=${syToken}`;
            } else if (location !== url.length - 1) {
              url = `${url}&token=${syToken}`;
            }
          }
          window.open(url, "_blank");
        } else {
          this.$info({
            title: "数据有误",
            content: "该数据需要跳转到外部系统但没有相应的地址，请联系管理员！",
            closable: true
          });
        }
        return true;
      } 
      return false;
        
    }
  }
};