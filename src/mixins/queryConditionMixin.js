import {
    getProductionSplit,
    getOgfInfo,
    getblockData,
    getWellData,
} from "@/api/rem/r-intelligentIPA.js";
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
            getOgfInfo().then(({ ogfId }) => {
                this.oilList = ogfId;
            });
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
