<!--试井-->
<template>
    <div class="z-container">
        <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:100%;"></iframe>
    </div>
</template>

<script>
    import { testWellReport } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import { downFile} from "@/lib/remBase64Download.js";
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
                image: '',
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                testWellReport(request).then((res) => {
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
            doDownLoad() {
                let fileName = '试井报告';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                downFile(this.image, fileName);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .z-container{
        height:calc(100% - 101px);
    }
</style>