<!--试井报告-->
<template>
    <div class="z-main">
        <page-panel-new style="height: 100%; margin-top: 0;" show-btn>
            <iframe style="height: 100%;width: 100%" :src="url"></iframe>
        </page-panel-new>
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
            url:'',
        };
      },
      mounted() {
        this.doSearch();
      },
      methods: {
        //调用图片
        doSearch(){
            let params = {
                operationId: this.wellId,
                operationType: 'WATERSJBG',
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

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 101px);
        iframe{
            // border: 1px solid #ddd;
            border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        }
    }
</style>