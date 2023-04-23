<!--井网图-->
<template>
    <div class="z-container">
        <el-image :src="image" style="width:100%;"><div slot="error"></div></el-image>
    </div>
</template>

<script>
    import { wellNetDiagram } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import { downFile } from '@/lib/remBase64Download.js';
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        data() {
            return {
                image: ''
            };
        },
        mounted() {
            //初始化调用搜索
            this.doSearch();
        },
        methods: {
            //调用图片
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId
                };
                wellNetDiagram(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.type;
                        let firstParty = 'data:' + type + ';base64,';
                        if (imgData) {
                            this.image = firstParty + imgData;
                        } else {
                            this.image = '';
                        }
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '井网图';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                downFile(this.image, fileName);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-container{
        padding-right:20px;
        height:calc(100% - 101px);
        overflow-y: scroll;
    }
</style>
