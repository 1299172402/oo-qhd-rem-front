<!--地震剖面图-->
<template>
    <el-container class="mt-2">
        <el-main>
            <el-row style="padding-top: 20px;height:600px;overflow: auto;">
                <el-image :src="image"><div slot="error"></div></el-image>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { seismicPlot } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
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
                radio: 3,
                src: '../../static/img/oilAuxiliaryAnalysis/staticData/seismicProfile.jpg',
                //图片数据
                image: ''
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //调用图片
            doSearch() {
                //let wellId = this.wellId;
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId
                };
                seismicPlot(request).then((res) => {
                    if (res.data.code == 0) {
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
                let fileName = '固井质量测井图';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                downFile(this.image, fileName);
            }
        }
    };
</script>
