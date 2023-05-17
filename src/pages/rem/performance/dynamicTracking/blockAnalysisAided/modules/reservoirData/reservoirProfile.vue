<!--油藏剖面图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-main">
            <el-image :src="image">
                <div slot="error">
                </div>
            </el-image>
        </div>
    </div>
</template>

<script>
    import {reservoirDataReservoirProfile} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";

    export default {
        props: {
            oilFieldId: {

            },
            blockId: {

            }
        },
        data() {
            return {
                radio: 1,
                src: '../../static/img/blockAnalysisAided/reservoirData/reservoirProfile.png',
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
            };
        },
        watch: {
            //监听层位信息，给其动态传值
            selectPosition(val) {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            }
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async doSearch() {
                this.$emit('childPara', '');
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    //layerId:this.selectPosition,
                }
                //获取图片组信息
                await reservoirDataReservoirProfile(request).then((res) => {
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
            //切换图片
            OnChangeImage() {
                this.image = '';
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    //layerId:this.selectPosition,
                }
                reservoirDataReservoirProfile(request).then((res) => {
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
            //单选按钮选中改变事件
            changeRadio() {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            },
            //下载
            doDownLoad() {
                let fileName = '油藏剖面图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName = (layerMess.layerName ? layerMess.layerName : '') + fileName;
                }
                if (this.blockName) {
                    fileName = this.blockName + fileName;
                }
                downFile(this.image, fileName);
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100%);
        overflow: auto;
        border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
    }
</style>