<template>
    <!--    <div class="box" @mouseenter="show = true" @mouseleave="show = false">-->
    <div class="box" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <el-collapse-transition>
            <div v-show="show || showFlag ||  warningShowFlag ">
                <div class="transition-box">
                    <div class="transition-box-content" :style="{'background-image':`url(${currentList.imgUrl})` }">
                        <div v-show="warningShowFlag" class="mcBox" style="">
                        </div>
                    </div>
                    <div v-if="warningShowFlag">
                        <button class="detailLinkBtn" @click="confirm(currentList)">确认</button>
                        <button class="detailLinkBtn" @click="linkTopage(currentList.analysisUrl,currentList)">分析</button>
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
                        <div >
                            <p v-show="!content" :key="index" v-for="(item,index) in currentList.boxBottomText">
                                <span v-if="item.url" :class= "item.warningShowFlag == true?'blink':'' " style="cursor: pointer" @click="linkTo(item.url,item)">{{ item.name ? item.name : item }}</span>
                                <span v-if="!item.url"  style="pointer-events: none;color:#5a5959;font-weight:bolder">{{ item.name ? item.name : item }}</span>
                                <span v-if="currentList.boxBottomContent" class="btnContent" @click="btnContent(index)">{{ currentList.boxBottomContent[index].length > 0 ? '>>' : '' }}</span>
                                <span  v-else-if="currentList.boxBottomContent" class="btnBack" @click="btnBack"></span>
                            </p>
                        </div>
                        <div>
                            <p v-show="content" :key="index" v-for="(item,index) in selectObj[selectIndex]">
                                <span style="cursor: pointer" @click="linkTo(item.url)">{{ item.name ? item.name : item }}</span>
                                <span v-if="currentList.boxBottomContent" class="btnBack" @click="btnBack"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import {addLinkageAlarmInfo} from "@/api/rem/injectionproductionlinkage";
export default {
    props: {
        currentList: {
            type: Object,
            default: () => {
            }
        },
        showFlag: {
            type: Boolean,
            default: false
        }
    },
    
    computed:{
        getWarningShowFlag(){
            return this.currentList.warningShowFlag
        }
    },
    watch:{
        getWarningShowFlag:{
            handler(Nval){
                this.warningShowFlag = Nval
            }
        }
    },
    data() {
        return {
            warningShowFlag:this.currentList.warningShowFlag,
            show: false,
            content: false,
            selectIndex: 0,
            linkurl:'',
            baseUrl:'',
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
        linkTo: function (url,item) {
            if (!url) return
            if(item.alarmPageCode){
                const data = {
                    authorizedPersonnel:this.$store.getters["user/name"],
                    alarmTime:new Date().format('YYYY-MM-dd'),
                    alarmPageCode:[item.alarmPageCode]
                }
                addLinkageAlarmInfo(data).then(()=>{
                })
                window.open( url + (url.includes("?") ? '&alarmTime=' : '?alarmTime=') + item.alarmTime, '_blank');
            }else{
                window.open(url, '_blank');
            }

        },
        linkTopage: function (url,currentList) {
            if (window.location.origin.includes('test')) {
                this.baseUrl = 'tjioms-test.tjltd.cnooc'
            } else if (window.location.origin.includes('dev') || window.location.origin.includes('808')) {
                this.baseUrl = 'tjioms-dev.tjltd.cnooc'
            }else if (window.location.origin.includes('tpro')) {
                this.baseUrl = 'tjioms-tpro.tjltd.cnooc'
            }
            if(currentList.alarmPageCode =='OSTOPF'){
                    window.open(`https://rem.${this.baseUrl}/#/yield/statisticalTableProduction?page=reservoirDisplay/linkage`, '_blank');
            }
            else{
                console.log(currentList.boxBottomText)
                this.linkurl = currentList.boxBottomText.find((n)=>{
                    if(n.warningShowFlag == true){
                        console.log(n)
                        return n
                    }
                })
                console.log(this.linkurl)
                const data = {
                    authorizedPersonnel:this.$store.getters["user/name"],
                    alarmTime:new Date().format('YYYY-MM-dd'),
                    alarmPageCode:[this.linkurl.alarmPageCode]
                }
                console.log(currentList,linkurl)
                addLinkageAlarmInfo(data).then(()=>{
                    this.warningShowFlag = false
                }).then(()=>{
                    if (!url) return
                    if(currentList.warningurl){
                        window.open(currentList.warningurl, '_blank');
                    }else{
                        window.open(linkurl.url, '_blank'); 
                    }
                })
            }

        },
        confirm(currentList){
            let alarmPageCode = []
            currentList.boxBottomText.map((m)=>{
                if(m.warningShowFlag == true){
                    m.warningShowFlag = false
                    alarmPageCode.push(m.alarmPageCode)
                }
            })
            if(currentList.alarmPageCode.length > 0){
                alarmPageCode.push(...currentList.alarmPageCode)
            }
            const data = {
                authorizedPersonnel:this.$store.getters["user/name"],
                alarmTime:new Date().format('YYYY-MM-dd'),
                alarmPageCode:alarmPageCode
            }
            this.warningShowFlag = false
            this.true = false
            this.$emit('startTimer',currentList)
            addLinkageAlarmInfo(data).then(()=>{
            }).then(()=>{
            })
        },
        mouseenter(){
            this.show = true
            this.$emit('stopTimer')
        },
        mouseleave(){
            this.show = false
            this.$emit('startTimer')
        }
    }
}
</script>

<style lang="less" scoped>
/* 定义keyframe动画，命名为blink */
@keyframes blink{
    0%{opacity: 1;}

    100%{opacity: 0;}
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-moz-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-ms-keyframes blink {
    0% {opacity: 1; }
    100% { opacity: 0;}
}
@-o-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
/* 定义blink类*/
.blink{
    color: rgb(212, 12, 92);
    font-size:16px;
    animation: blink 1s linear infinite;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
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
            margin: 2vw 0 0 0.5vw !important;
            background-size: cover !important;
            //}
        }
    }

    .textBox {
        background: radial-gradient(ellipse at center, #0d0171d6, #009eccf2);
        height: 11%;
        position: absolute;
        top: 9vw;
        text-align: center;
        line-height: 1.7vw;
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
            top: 0.12vw;
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


