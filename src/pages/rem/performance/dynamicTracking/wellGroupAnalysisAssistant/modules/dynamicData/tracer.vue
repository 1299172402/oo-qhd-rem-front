<!--示踪剂-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-radio-group v-model="selectPosition">
                <el-radio v-for="(item,index) in position" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </div>
        <div class="z-container">
            <div class="v1">
                <pagePanel headerTitle="示踪剂结果" class="z-pagePanel" style="margin-right:20px;" show-btn>
                    <el-image :src="imageFirst">
                        <div slot="error"></div>
                    </el-image>
                </pagePanel>
                <pagePanel headerTitle="示踪剂报告" class="z-pagePanel" style="margin-right:20px;" show-btn>
                    <iframe :src="imageSecond?(imageSecond+'#toolbar=0'):''" style="width: 100%;height: 100%;" v-if="imageSecond"></iframe>
                </pagePanel>
            </div>
            <div class="v2">
                <pagePanel headerTitle="示踪剂信息" class="z-pagePanel" show-btn>
                    <el-image :src="imageThird"><div slot="error"></div></el-image>
                </pagePanel>
            </div>
        </div>
    </div>
</template>

<script>
    import { tracer } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import { downFile } from "@/lib/remBase64Download.js";
    export default {
        props: {
            //油田id
            oilFieldId: {},
            //区块id
            blockId: {},
            //层系id
            layerId: {},
            //井组id
            wellGroupId: {}
        },
        data() {
            return {
                //示踪剂信息
                imageFirst: '',
                //示踪剂报告
                imageSecond: '',
                //示踪剂结果
                imageThird: '',
                //单选按钮对应信息
                position: [
                    {label: '示踪剂结果',value: 'TRACER_RESULTS',}, 
                    {label: '示踪剂报告',value: 'TRACER_REPORT',}, 
                    {label: '示踪剂信息',value: 'TRACER_INFORMATION',}
                ],
                //单选按钮选中项
                selectPosition: '',
            };
        },
        watch: {
            selectPosition(val) {
                this.$emit('childPara', this.selectPosition);
            }
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    fieldLayerId: this.layerId,
                    wellGroupId: this.wellGroupId,
                };
                tracer(request).then((res) => {
                    if (res.data.code == 200) {
                        let first = res.data.data.tracePic;
                        let firstType = res.data.data.tracePicType;
                        let second = res.data.data.report;
                        let secondType = res.data.data.reportType;
                        let third = res.data.data.information;
                        let thirdType = res.data.data.informationType;
                        if (first){
                            this.imageFirst = 'data:' + firstType + ';base64,' + first;
                        }else{
                            this.imageFirst = '';
                        }
                        if (second) {
                            this.imageSecond = 'data:' + secondType + ';base64,' + second;
                        } else {
                            this.imageSecond = '';
                        }
                        if (third){
                            this.imageThird = 'data:' + thirdType + ';base64,' + third;
                        }else{
                            this.imageThird = '';
                        }
                    }
                });
            },
            //下载
            doDownLoad(){
                if (this.imageFirst) downFile(this.imageFirst, fileName + '示踪剂结果');
                if (this.imageSecond) downFile(this.imageSecond, fileName + '示踪剂报告');
                if (this.imageThird) downFile(this.imageThird, fileName + '示踪剂信息');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 101px);
        .z-search{
            height:60px;
            display: flex;
            align-items: center;
        }
        .z-container{
            width:100%;
            height:calc(100% - 60px);
            overflow-y: scroll;
            .v1{
                height: 600px;
                display: flex;
                margin-bottom:20px;
            }
            .v2{
                margin-right:20px;
                height:600px;
                overflow: auto;
            }
            .z-pagePanel{
                flex:1;
                margin-top:0!important;
                height: 100%;
                overflow: auto;
            }
        }
    }
</style>