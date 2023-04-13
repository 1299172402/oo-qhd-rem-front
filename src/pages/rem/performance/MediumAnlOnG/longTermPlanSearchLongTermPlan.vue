<!--中长期规划管理-->
<template>
  <el-container class="layout">
    <el-header height="auto">
      <header-search class="g-w100 g-h100">
        <div class="py-5" style="margin-top: 10px; margin-bottom: 10px">
          <span>油田：</span>
          <el-select v-model="selectOilField" disabled>
            <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
          <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="searchForOilField">
            搜索
          </el-button>
        </div>
      </header-search>
    </el-header>
    <el-main>
      <pagePanelNew style="height: 100%; margin-top: -10px">
        <span class="tableTitle">{{ oilFieldName }} 中长期计划表</span>
        <div style="margin: 20px 0 10px"></div>
        <el-table :data="tableDataLS" height="calc(100% - 110px)" highlight style="width: 100%">
          <el-table-column prop="theYear" align="center" label="年份"></el-table-column>
          <el-table-column prop="baseProduct" align="center" label="基础产量(10⁴m³)"></el-table-column>
          <el-table-column prop="newJustWellNum" align="center" label="新增调整井井数(口)"></el-table-column>
          <el-table-column prop="oldWellProduct" align="center" label="调整井滚动产量(10⁴m³)"></el-table-column>
          <el-table-column prop="oilWellIncNum" align="center" label="油井增产措施井次(口)"></el-table-column>
          <el-table-column prop="measureProduct" align="center" label="措施产量(10⁴m³)"></el-table-column>
          <el-table-column prop="chemicalWellNum" align="center" label="化学驱井次(口)"></el-table-column>
          <el-table-column prop="chemicalProduct" align="center" label="化学驱产量(10⁴m³)"></el-table-column>
          <el-table-column prop="productAll" align="center" label="产量合计(10⁴m³)"></el-table-column>
        </el-table>
      </pagePanelNew>
    </el-main>
  </el-container>
</template>
<script>
import { fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { searchLongTermPlan } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { getWidgetByAreaUser } from "@/api/oilDeposit/rmm-01/rmm01";
export default {
  data() {
    return {
      //选择油田
      selectOilField: "",
      //油田列表
      oilField: [],
      //油田名称
      oilFieldName: "",
      //默认第一页
      page: 1,
      //一页10条
      pageSize: 10,
      //总数量
      pageCount: 0,

      //中长期计划表数据
      tableData: [],
      //中长期计划表 静态临时、、
      tableDataLS: [
        {
          theYear: "2022",
          baseProduct: "190.78",
          newJustWellNum: "15",
          oldWellProduct: "25.66",
          oilWellIncNum: "33",
          measureProduct: "11.24",
          chemicalWellNum: "-",
          chemicalProduct: "-",
          productAll: "227.68",
        },
        {
          theYear: "2023",
          baseProduct: "172.05",
          newJustWellNum: "16",
          oldWellProduct: "40.58",
          oilWellIncNum: "32",
          measureProduct: "11.02",
          chemicalWellNum: "6",
          chemicalProduct: "-",
          productAll: "223.65",
        },
        {
          theYear: "2024",
          baseProduct: "155.50",
          newJustWellNum: "11",
          oldWellProduct: "49.01",
          oilWellIncNum: "29",
          measureProduct: "10.31",
          chemicalWellNum: "18",
          chemicalProduct: "8.34",
          productAll: "223.17",
        },
        {
          theYear: "2025",
          baseProduct: "139.76",
          newJustWellNum: "13",
          oldWellProduct: "57.79",
          oilWellIncNum: "28",
          measureProduct: "9.66",
          chemicalWellNum: "34",
          chemicalProduct: "20.29",
          productAll: "227.50",
        },
        {
          theYear: "2026",
          baseProduct: "128.44",
          newJustWellNum: "3",
          oldWellProduct: "54.90",
          oilWellIncNum: "26",
          measureProduct: "9.59",
          chemicalWellNum: "50",
          chemicalProduct: "31.00",
          productAll: "223.93",
        },
        {
          theYear: "2027",
          baseProduct: "118.48",
          newJustWellNum: "7",
          oldWellProduct: "52.50",
          oilWellIncNum: "25",
          measureProduct: "9.47",
          chemicalWellNum: "53",
          chemicalProduct: "38.19",
          productAll: "218.64",
        },
        {
          theYear: "2028",
          baseProduct: "106.63",
          newJustWellNum: "7",
          oldWellProduct: "53.68",
          oilWellIncNum: "25",
          measureProduct: "9.33",
          chemicalWellNum: "55",
          chemicalProduct: "46.87",
          productAll: "216.51",
        },
        {
          theYear: "2029",
          baseProduct: "96.05",
          newJustWellNum: "5",
          oldWellProduct: "52.25",
          oilWellIncNum: "22",
          measureProduct: "8.58",
          chemicalWellNum: "54",
          chemicalProduct: "48.05",
          productAll: "204.93",
        },
        {
          theYear: "2030",
          baseProduct: "87.53",
          newJustWellNum: "2",
          oldWellProduct: "49.29",
          oilWellIncNum: "23",
          measureProduct: "8.83",
          chemicalWellNum: "50",
          chemicalProduct: "43.39",
          productAll: "189.03",
        },
        {
          theYear: "2031",
          baseProduct: "82.44",
          newJustWellNum: "-",
          oldWellProduct: "38.12",
          oilWellIncNum: "-",
          measureProduct: "-",
          chemicalWellNum: "50",
          chemicalProduct: "33.94",
          productAll: "154.50",
        },
        {
          theYear: "2032",
          baseProduct: "73.27",
          newJustWellNum: "-",
          oldWellProduct: "24.07",
          oilWellIncNum: "-",
          measureProduct: "-",
          chemicalWellNum: "-",
          chemicalProduct: "24.03",
          productAll: "121.37",
        },
        {
          theYear: "2033",
          baseProduct: "65.59",
          newJustWellNum: "-",
          oldWellProduct: "17.39",
          oilWellIncNum: "-",
          measureProduct: "-",
          chemicalWellNum: "-",
          chemicalProduct: "16.26",
          productAll: "99.24",
        },
        {
          theYear: "2034",
          baseProduct: "60.53",
          newJustWellNum: "-",
          oldWellProduct: "11.12",
          oilWellIncNum: "-",
          measureProduct: "-",
          chemicalWellNum: "-",
          chemicalProduct: "8.85",
          productAll: "80.50",
        },
        {
          theYear: "2035",
          baseProduct: "52.63",
          newJustWellNum: "-",
          oldWellProduct: "8.87",
          oilWellIncNum: "-",
          measureProduct: "-",
          chemicalWellNum: "-",
          chemicalProduct: "5.68",
          productAll: "67.18",
        },
      ],
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
    };
  },
  mounted() {
    this.initData();
    this.getPageAuthMessage();
  },
  methods: {
    /**
     *  hwh
     *  初始化
     */
    async initData() {
      //获取油田信息
      await fetchOilFields().then((res) => {
        this.oilField = res.data.data.oilFields;
        if (this.oilField.length == 0) {
          this.selectOilField = "";
        } else {
          this.selectOilField = this.oilField[0].oilFieldId;
        }
      });
      //设置默认油田
      this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
      //发现油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //油田名称
      this.oilFieldName = oilFieldContent.name;
      //调用中长期规划获取信息数据  油田id 当前页数 页大小
      this.getSearchLongTermPlan(this.selectOilField, this.page, this.pageSize);
    },
    /**
     *  hwh
     *  中长期表格数据获取
     * @param oilFieldId 油田id
     * @param page  当前页数
     * @param pageSize  每页大小
     */
    getSearchLongTermPlan(oilFieldId, page, pageSize) {
      let request = {
        oilFieldId: oilFieldId,
        page: page,
        pageSize: pageSize,
      };
      let _this = this;
      searchLongTermPlan(request).then((res) => {
        //先清空数组；
        _this.tableData = [];
        //判断是否获得成功
        if (res.data.code == "200") {
          _this.tableData = res.data.data.oilTermPlans;
          _this.pageCount = res.data.data.total;
        } else {
          _this.pageCount = 0;
        }
      });
    },
    /**
     *  hwh
     *  改变当前页 跳转下一页
     * @param pageValue 当前页数
     */
    handleChangePage(pageValue) {
      let oilFieldId = this.selectOilField;
      let page = pageValue;
      let pageSize = this.pageSize;
      this.getSearchLongTermPlan(oilFieldId, page, pageSize);
    },
    /**
     *  hwh
     *  改变当前页大小
     * @param rowsValue 当前页大小
     */
    handleChangePageSize(rowsValue) {
      this.pageSize = rowsValue;
      let oilFieldId = this.selectOilField;
      let page = this.page;
      let pageSize = rowsValue;
      this.getSearchLongTermPlan(oilFieldId, page, pageSize);
    },
    /**
     * hwh
     * 根据油田信息修改表格数据
     *
     */
    searchForOilField() {
      let oilFieldId = this.selectOilField;
      let page = 1;
      let pageSize = this.pageSize;
      this.page = page;
      //根据数组获得油田名称
      let oilFieldContent = this.oilField.find((item) => item.oilFieldId == this.selectOilField);
      //修改油田名称
      this.oilFieldName = oilFieldContent.name;
      this.getSearchLongTermPlan(this.selectOilField, page, pageSize);
    },
    /**
     * hwh
     * 获取当前页面的权限内容，并处理其逻辑问题
     */
    getPageAuthMessage() {
      // this.userInfo = VSAuth.getAuthInfo()
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = "znytglxt";
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({ areaCode: areaCode, loginName: loginName }).then((res) => {
        let myList = res.data.dataList;
        if (myList) {
          let pageMes = myList.find((item) => {
            return item.resPvalue == myPath;
          });
          if (pageMes) {
            this.myWidget = pageMes.widgetList;
          }
          if (this.myWidget) {
            for (let indexNum in this.myWidget) {
              try {
                let myWidgetItem = this.myWidget[indexNum];
                switch (myWidgetItem.widgetCode) {
                  case "addInfo":
                    this.canAddInfo = true;
                    break;
                  case "updateInfo":
                    this.canUpdateInfo = true;
                    break;
                  case "sendInfo":
                    this.canSendInfo = true;
                    break;
                  case "deleteInfo":
                    this.canDeleteInfo = true;
                    break;
                  case "download":
                    this.canDownload = true;
                    break;
                  case "upload":
                    this.canUpload = true;
                    break;
                  default:
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.titleBox {
  // hei: ;
  .formBox {
    right: 0;
    bottom: 0;
    width: calc(100% - 200px);
  }
}
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
