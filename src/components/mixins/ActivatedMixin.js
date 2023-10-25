export default {
  data() {
    return {
      isActivated: false
    };
  },
  activated() {
    if (this.isActivated && this.handlerActivated) {
      this.handlerActivated();
    } else {
      this.isActivated = true;
    }
  }
};