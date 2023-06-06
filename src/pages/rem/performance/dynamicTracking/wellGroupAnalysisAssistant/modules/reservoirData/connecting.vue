<!--连井剖面图-->
<template>
    <div class="z-main">
        <page-panel-new style="height:100%;margin-top:0;" show-btn>
            <div class="z-container">
                   <iframe style="height: 100%;width: 100%" :src="imageurl"></iframe>
            </div>
        </page-panel-new>
    </div>
    
</template>

<script>
    import { getSectionWell} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import { downFileList} from "@/lib/remBase64Download.js";
    import {filePreview} from "@/components/upload/utils/file";
    
    export default {
        props: {
            oilFeildId: {},
            platform: {},
            wellId: {},
        },
        data() {
            return {
                imageList: [],
                imageurl:''
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
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    platformId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    wellId: "09D30C16BD1D4F759D53F74941701307",
                };
                this.imageList = [];
                filePreview('9c85e26a546c3bf9345da285b3e098ed').then((res)=>{
                    this.imageurl = res.data.data
                })
                // getSectionWell(request).then((res) => {
                //     if (res.data.code == 200) {
                //         let imgData = res.data.data.data;
                //         let type = res.data.data.type;
                //         let firstParty = "data:" + type + ";base64,";
                //         if (imgData) {
                //             this.imageList.push(firstParty + imgData);
                //         }
                //         let wellIds = res.data.data.wellIds;
                //         if (wellIds != null && wellIds.length > 0) {
                //             wellIds.forEach((item, index) => {
                //                 if (item != this.wellId) {
                //                     console.log(item)
                //                     var queryParam = {
                //                         ogfId: this.oilFeildId,
                //                         platformId: this.platform,
                //                         wellId: item,
                //                     };
                //                     getSectionWell(queryParam).then((res) => {
                //                         if (res.data.code == 200) {
                //                             console.log(res)
                //                             let imgDataChild = res.data.data.data;
                //                             let typeChild = res.data.data.type;
                //                             let firstPartyChild = "data:" + typeChild + ";base64,";
                //                             if (imgDataChild) {
                //                                 this.imageList.push(firstPartyChild + imgDataChild);
                //                             }
                //                         }
                //                     });
                //                 }
                //             });
                //         }
                //     }
                // });
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