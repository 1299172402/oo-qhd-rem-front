<!-- 基本信息 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="井网图">
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    // var date = new Date();
    // var months = date.getMonth() + 1;
    // var m = '0' + (months - 1);
    // var y = date.getFullYear();
    // if (months == 1) {
    //   y--;
    //   m = '12';
    // }
    // this.queryData.month = y + '-' + m.substr(m.length - 2, 2); //获取当前月拼接方法
    // this.getList();
    // this.getData();
  },
  methods: {
  passValue(val){
      console.log(val)
    }
    // getList() {
    //   fetchOilFields().then((res) => {
    //     if (res.data.code == 200) {
    //       this.oilFields = res.data.data.oilFields;
    //       if (this.oilFields.length == 0) {
    //         this.oilField = '';
    //       } else {
    //         this.oilField = '3FC9A818F5BC43B88270DB80BBB3018F';
    //       }
    //       this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
    //       const requestPlat = {
    //         oilFieldId: this.selectOilField,
    //       };
    //       fetchPlatforms(requestPlat).then((res) => {
    //         if (res.data.code == 200) {
    //           this.platforms = res.data.data.platform;
    //         }
    //       });
    //     }
    //   });
    // },
    // // 下载
    // getData() {
    //   getBreakdownOfFailure(this.queryData).then((res) => {
    //     if (res.data.code == 200) {
    //       this.noticeList = [res.data.data];
    //       this.datalist = res.data.data.breakdownOfFailuresListVo;
    //     } else {
    //       this.$message.error('系统错误请重新尝试或联系运维人员！');
    //     }
    //   });
    // },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
