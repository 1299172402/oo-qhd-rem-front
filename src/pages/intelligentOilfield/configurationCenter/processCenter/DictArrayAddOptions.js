export const DictArrayAddOptionsMixin = {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.$on("dictReady", () => {
      this.items.forEach(element => {
        if (element.dict && this.dict?.type[element.dict]) {
          this.$set(element, "options", this.dict.type[element.dict].map(i => ({ label: i.label, value: i.value })));
        }
      });
    });
  }
};