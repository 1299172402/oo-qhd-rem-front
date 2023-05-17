<!--井网图-->
<template>
    <div class="z-main">
        <div class="z-echarts">
            <el-image :src="image">
                <div slot="error"></div>
            </el-image>
        </div>
    </div>
</template>

<script>
    import {developmentDataWellPattern} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    export default {
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                radio: 1,
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
                //获取参数油田id 平台id 井id
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    //layerId:this.selectPosition,
                }
                //获取图片组信息
                await developmentDataWellPattern(request).then((res) => {
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
                developmentDataWellPattern(request).then((res) => {
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
            //单选按钮选中改变事件
            changeRadio() {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            },
            //下载
            doDownLoad() {
                let fileName = '井网图';
                if (this.blockName) {
                    fileName = this.blockName + fileName;
                }
                downFile(this.image, fileName);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 86px);
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;

        .z-echarts {
            width: 100%;
            flex: 1;
            overflow-y: scroll;
            border: 1px solid #ddd;
            border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        }
    }
</style>