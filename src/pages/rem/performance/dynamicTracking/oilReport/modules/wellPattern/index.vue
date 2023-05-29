<!--井网图-->
<template>
    <pagePanel headerTitle="井网图">
        <div class="z-main">
            <div class="z-echarts">
                <el-image :src="image">
                    <div slot="error"></div>
                </el-image>
            </div>
        </div>
    </pagePanel>
</template>

<script>
import {developmentDataWellPattern} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";

export default {
    data() {
        return {
            oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
            platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
            wellId: "09D30C16BD1D4F759D53F74941701307",
            radio: 1,
            image: '',
        };
    },
    mounted() {
        this.doSearch();
    },
    watch: {
        //监听层位信息，给其动态传值
        selectPosition(val) {
            this.$emit('childPara', this.selectPosition);
            this.OnChangeImage();
        }
    },
    methods: {
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            // this.doSearch();
        },

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
    },
};
</script>

<style lang="scss" scoped>
.image-content {
    width: 100%;
    height: calc(100% - 101px);
    overflow-y: scroll;
}
</style>
