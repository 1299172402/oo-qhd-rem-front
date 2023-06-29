<!--井网图-->
<template>
    <div class="image-content">
        <div style="width:100%;height:100%;">
            <iframe style="height: 100%;width: 100%" :src="url"></iframe>
        </div>
    </div>
</template>

<script>
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview} from "@/components/upload/utils/file";
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
                id:'',
                fileName:'',
                url: '',
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let params = {
                    operationId: this.wellId,
                    operationType: 'WATERJWT',
                    readOne: 'one'
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.id = res.data.data[0].fileId;
                            this.fileName = res.data.data[0].filestrId;
                            filePreview(this.id).then((res) => {
                                this.url = res.data.data
                            })
                        }
                    } else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .image-content {
        width: 100%;
        height: calc(100% - 101px);
        overflow-y: scroll;
    }
</style>
