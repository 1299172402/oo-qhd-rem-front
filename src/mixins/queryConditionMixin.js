import {
    getProductionSplit,
    getOgfInfo,
    getblockData,
    getWellData,
} from "@/api/rem/r-intelligentIPA.js";
import { fetchFields } from "@/api/rem/primaryinfoqhdrem";
import {queryOperatorsCheckFieldListsDetail, userListByUserNames,QueryBlockDetail} from "@/api/basic/master";
export default {
    data () {
        return {
            //油田下拉框
            oilList: [],
            //区块下拉
            blockList: [],
            //井别下拉
            wellCategoryList: [
                { id: "01", name: "油井" },
                { id: "02", name: "水井" },
            ],
            //井号下拉
            wellList: [],
        };
    },
    mounted () {
        this.queryOilFeild();
        this.queryBlockFeild();
    },
    methods: {
        /**
         * 获取油田
         */
        queryOilFeild () {
            let params = {
                searchKeys:[this.$store.getters["user/userDetail"].user.userName],
            }
            let ogfid
            userListByUserNames(params).then((res)=>{
                var result=res.data.data[0].tenantInfos;
                if (result.length > 1) {
                ogfid = res.data.data[0].tenantInfos[1].deptId;
                } else {
                ogfid = res.data.data[0].tenantInfos[0].deptId;
                }
                queryOperatorsCheckFieldListsDetail({orgId:ogfid}).then((res) => {
                    this.oilList = res.data.data;
                    if (ogfid==='715AD1CD60484BB59E737CD18A9DE44A') {
                        this.queryData.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F'
                    }else {
                        this.queryData.ogfId = this.oilList[0].ogfId ?this.oilList[0].ogfId : undefined
                    }
                });
            })
           
        },
        //改变油田
        changeOil () {
            this.queryData.blockId = "";
            this.queryData.wellId = "";
            this.queryBlockFeild();
        },
        /**
         * 获取区块
         */
        queryBlockFeild () {
            let param = {
                ogfId: this.queryData.ogfId,
            };
            getblockData(param).then((res) => {
                this.blockList = res.blockList;
                this.blockList.forEach(item => {
                    if (item.blockId == this.queryData.blockId) {
                        this.title = item.blockName
                    }
                })
            });
            // let param = {
            //     oilFieldId: this.queryData.ogfId,
            // };
            // fetchFields(param).then((res) => {
            //     this.blockList = res.data.data.fields;
            // });
        },
        /**
         * 改变区块
         */
        changeBlock () {
            this.queryData.wellId = "";
            if (this.queryData.wellCategory) {
                this.queryWellData();
            }
        },
        /**
         * 改变井别
         */
        changeWell () {
            if (this.queryData.blockId) {
                this.queryWellData();
            }
        },
        /**
         * 井号下拉
         */
        queryWellData () {
            let params = {
                blockId: this.queryData.blockId,
                apprndixId: this.queryData.wellCategory,
            };
            getWellData(params).then((res) => {
                this.wellList = res.wellList;
            });
        },
    },
};
