<template>
    <div class="box" @mouseenter="show = true" @mouseleave="show = false">
        <el-collapse-transition>
            <div v-show="show||remHome || showFlag ||  warningShowFlag ">
                <div class="transition-box">
                    <div class="transition-box-content" :style="{'background-image':`url(${currentList.imgUrl})` }">
                        <div v-show="warningShowFlag" class="mcBox" style="">

                        </div>
                    </div>
                    <div v-if="warningShowFlag">
                        <button class="detailLinkBtn" @click="confirm()">确认</button>
                        <button class="detailLinkBtn" @click="linkRoute()">分析</button>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <p class="textBox" :style="currentList.boxStyle.pWidth">
            {{ currentList.boxText }}
            <span class="btnGo"></span>
        </p>
        <el-collapse-transition>
            <div v-show="show || showFlag || warningShowFlag" :style="currentList.boxStyle.bottomMargin">
                <div class="transition-box-bottom">
                    <div class="pad">
                        <div>
                            <p v-show="!content" :key="index" v-for="(item,index) in currentList.boxBottomText">
                                <span @click="linkTo(item.url)">{{ item.name ? item.name : item }}</span>
                                <span v-if="currentList.boxBottomContent" class="btnContent" @click="btnContent(index)">{{ currentList.boxBottomContent[index].length > 0 ? '>>' : '' }}</span>
                                <span v-else class="btnBack" @click="btnBack"></span>
                            </p>
                        </div>
                        <div>
                            <p v-show="content" :key="index" v-for="(item,index) in selectObj[selectIndex]">
                                <span style="cursor: pointer" @click="linkTo(item.url)">{{ item.name ? item.name : item }}</span>
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
    props: {
        currentList: {
            type: Object,
            default: () => {
            }
        },
        remHome: false,
        showFlag: {
            type: Boolean,
            default: false
        }
    },
    created() {
        console.log(this.currentList.imgUrl);
    },
    computed:{
        getWarningShowFlag(){
            return this.currentList.warningShowFlag
        }
    },
    watch:{
        getWarningShowFlag:{
            handler(Nval){
                this.warningShowFlag = true
            }
        }
    },
    data() {
        return {
            warningShowFlag:this.currentList.warningShowFlag,
            show: false,
            content: false,
            selectIndex: 0,
            selectObj: this.currentList.boxBottomContent ? this.currentList.boxBottomContent : []
        }
    },
    methods: {
        btnBack: function () {
            if (this.currentList.boxBottomContent) {
                this.content = !this.content
            } else {
                this.show = false
            }
        },
        btnContent: function (index) {
            this.selectIndex = index
            this.content = !this.content
        },
        linkTo: function (url) {
            if (!url) return
            window.open(url, '_blank');
        },
        confirm(){
            this.warningShowFlag = false
        },
    }
}
</script>

<style lang="less" scoped>
.box {
    color: #e6d6d6;
    width: 100%;
    height: 100%;

    .transition-box {
        background-image: url("@/assets/linkage/linkageBlock.png");
        background-size: 100% 100%;
        width: 14vw;
        height: 10vw;
        text-align: center;
        color: #fff;
        box-sizing: border-box;

        .transition-box-content {
            //width: 100%;
            //height: 100%;
            //img{
            display: inline-block !important;
            width: 45%;
            height: 50%;
            margin: 1.6vw 0 0 0.5vw !important;
            background-size: cover !important;
            //}
        }
    }

    .textBox {
        background: radial-gradient(ellipse at center, #0d0171d6, #009eccf2);
        height: 11%;
        position: absolute;
        top: 60%;
        text-align: center;
        line-height: 1.8vw;
        border-radius: 20px;
        font-size: 0.8vw;
        margin-left: 2vw;
        z-index: 8;

        .btnGo {
            background-image: url("@/assets/linkage/btn.png");
            background-size: 100% 100%;
            width: 1.4vw;
            height: 1.4vw;
            display: block;
            position: absolute;
            top: 0.15vw;
            right: 0.3vw;
            cursor: pointer;
        }
    }

    .transition-box-bottom {
        background-image: url("@/assets/linkage/linkageMessage.png");
        background-size: 100% 100%;
        width: 75%;
        height: auto;
        margin: 2vw 0 0 2vw;
        text-align: center;
        font-size: 0.8vw;

        .pad {
            padding: 1.5vw 0 0.7vw 0;

            p {
                margin: 0.4vw 0;
            }

            .btnBack {
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

            .btnContent {
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

.detailLinkBtn {
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}

.mcBox{
    animation:mcBox 1s linear infinite;
    background:rgba(255,0,0,0.56);height:100%;width:100%;
    //left: 20%;top:10%;
    //border-radius: 60px;
}

@keyframes mcBox{
    0%{
        opacity:0;
    }
    100% {
        opacity: 1;
    }
}
</style>


