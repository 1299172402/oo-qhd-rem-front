<template>
    <div class="box" @mouseenter="show = true" @mouseleave="show = false">
        <el-collapse-transition>
            <div v-show="show||remHome">
                <div class="transition-box">
                    <div class="transition-box-content" :style="{'background-image':`url(${currentList.imgUrl})`}">
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <p  class="textBox" :style="currentList.boxStyle.pWidth">
            {{currentList.boxText}}
            <span class="btnGo"></span>
        </p>
        <el-collapse-transition>
            <div v-show="show" :style="currentList.boxStyle.bottomMargin">
                <div class="transition-box-bottom">
                    <div class="pad">
                        <div>
                            <p v-show="!content" :key="index" v-for="(item,index) in currentList.boxBottomText">
                                <span>{{item}}</span>
                                <span v-if="currentList.boxBottomContent" class="btnContent" @click="btnContent(index)">{{currentList.boxBottomContent[index].length>0?'>>':''}}</span>
                                <span v-else class="btnBack" @click="btnBack"></span>
                            </p>
                        </div>
                        <div>
                            <p v-show="content" :key="index" v-for="(item,index) in selectObj[selectIndex]">
                                <span>{{item}}</span>
                                <span class="btnBack" @click="btnBack"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>


export default {
    props:{
       currentList:{
           type:Object,
           default:()=>{}
       },
       remHome:false 
    },
    data() {
        return {
            show: false,
            content:false,
            selectIndex:0,
            selectObj:this.currentList.boxBottomContent?this.currentList.boxBottomContent:[1]
        }
    },
    methods:{
        btnBack:function(){
            if(this.currentList.boxBottomContent){
                this.content = !this.content
            }else{
                this.show = false
            }
        },
        btnContent:function(index){
            this.selectIndex = index
            this.content = !this.content
        }
    }
}
</script>

<style lang="less" scoped>
.box{
    color: #e6d6d6;
    width: 100%;
    height: 100%;
    .transition-box {
        background-image: url("@/assets/linkage/linkageBlock.png");
        background-size: 100% 100%;
        width: 20vw;
        height: 16vw;
        text-align: center;
        color: #fff;
        box-sizing: border-box;
        .transition-box-content {
            display: inline-block !important;
            width: 45%;
            height: 40%;
            margin-top: 4.5vw!important;
            margin-left: 0.6vw!important;
            background-size: cover!important;
        }
    }
    .textBox{
        background: radial-gradient(ellipse at center, #0d0171d6, #009eccf2);
        height: 11%;
        position: absolute;
        top: 90%;
        text-align: center;
        line-height: 1.8vw;
        border-radius: 20px;
        font-size: 0.8vw;
        margin-left: 5vw;
        z-index: 9999;
        .btnGo{
            background-image: url("@/assets/linkage/btn.png");
            background-size: 100% 100%;
            width: 1.4vw;
            height: 1.4vw;
            display: block;
            position: absolute;
            top: 0.15vw;
            right: 0.3vw;
            cursor:pointer;
        }
    }
    .transition-box-bottom {
        background-image: url("@/assets/linkage/linkageMessage.png");
        background-size: 100% 100%;
        width: 75%;
        height: auto;
        margin-left: 4vw;
        text-align: left;
        font-size: 0.8vw;
        .pad{
            padding: 2vw 0 0.7vw 0;
            p{
                margin: 0.4vw 0;
                padding-left: 1vw;
            }
            .btnBack{
                float: right;
                height: 1vw;
                width: 1vw;
                background: none;
                float: right;
                margin-right: 1vw;
                border: 0;
                background-image: url("@/assets/linkage/s.png");
                background-size: 100% 100%;
                cursor: pointer;
            }
            .btnContent{
                float: right;
                height: 1vw;
                width: 1vw;
                background: none;
                float: right;
                margin-right: 1vw;
                border: 0;
                cursor: pointer;
                color: #51d1de;
                font-weight: 900;
            }
        }
    }
}

</style>


