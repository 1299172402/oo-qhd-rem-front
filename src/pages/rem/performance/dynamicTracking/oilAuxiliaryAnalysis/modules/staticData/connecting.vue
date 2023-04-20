<!-- 连井剖面图 -->
<template>
    <div class="z-main">
        <page-panel-new style="height:100%;margin-top:0;" show-btn>
            <div class="z-container">
                <el-carousel :interval="4000" :autoplay="false" indicator-position="none" arrow="hover">
                    <el-carousel-item v-for="(item, index) in imageList" ref="imageCaeousel" :key="index" style="height: 100%; overflow-y: auto;">
                        <el-image :src="item" style="width: 100%;">
                            <div slot="error"></div>
                        </el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </page-panel-new>
    </div>
</template>

<script>
    import {getSectionWell} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {downFileList} from "@/lib/remBase64Download.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {},
        },
        data() {
            return {
                imageList: [],
            };
        },
        mounted() {
            //初始化调用搜索
            this.doSearch();
            //置为不可滚动
            document.addEventListener(
                "click",
                (e) => {
                    if (e.target.classList.contains("el-image__inner")) {
                        var list = this.$refs.imageCaeousel;
                        if (list != null && list.length > 0) {
                            list.forEach((item) => {
                                item.$el.style["overflow-y"] = "hidden";
                            });
                        }
                    }
                },
                false,
            );
            //重新置为可以滚动
            document.addEventListener(
                "click",
                (e) => {
                    if (e.target.classList.contains("el-icon-circle-close")) {
                        var list = this.$refs.imageCaeousel;
                        if (list != null && list.length > 0) {
                            list.forEach((item) => {
                                item.$el.style["overflow-y"] = "auto";
                            });
                        }
                    }
                },
                false,
            );
        },
        methods: {
            //调用图片
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                this.imageList = [];
                getSectionWell(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.type;
                        let firstParty = "data:" + type + ";base64,";
                        if (imgData) {
                            this.imageList.push(firstParty + imgData);
                        }
                        let wellIds = res.data.data.wellIds;
                        if (wellIds != null && wellIds.length > 0) {
                            wellIds.forEach((item, index) => {
                                if (item != this.wellId) {
                                    var queryParam = {
                                        ogfId: this.oilFeildId,
                                        platformId: this.platform,
                                        wellId: item,
                                    };
                                    getSectionWell(queryParam).then((res) => {
                                        if (res.data.code == 200) {
                                            let imgDataChild = res.data.data.data;
                                            let typeChild = res.data.data.type;
                                            let firstPartyChild = "data:" + typeChild + ";base64,";
                                            if (imgDataChild) {
                                                this.imageList.push(firstPartyChild + imgDataChild);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        console.log(this.imageList);
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = "连井剖面图";
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                //批量下载
                downFileList(this.imageList, fileName);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 101px);
        display: flex;
        flex-direction: column;
        .z-container{
            height: 100%; 
            ::v-deep .el-carousel{
                height:100%;
                .el-carousel__container{
                    height:100%;
                }
                .el-carousel__item{
                    overflow-x: hidden!important;
                    overflow-y: scroll!important;
                }
                .el-carousel__arrow{
                    background-color: rgba(31,45,61,.5);
                }
            }
        }
    }
</style>
