<template>
    <div class="box" @mouseenter="show(true,true)" @mouseleave="show(false,true)">
        <div class="warp" style="overflow:hidden">
            <div class="transition-box">
                <div class="transition-box-content" :style="{'background-image':`url(${currentList.imgUrl})`}">
                </div>
            </div>
            <div v-if="warningShowFlag" style="position: absolute;z-index: 9999;top:80%;left: 45%">
                <button class="detailLinkBtn" @click="confirm(currentList)">确认</button>
                <button class="detailLinkBtn" @click="linkTopage(currentList.analysisUrl,currentList)">分析</button>
            </div>
            <p class="textBox" :style="currentList.boxStyle.pWidth">
                {{ currentList.boxText }}
                <span class="btnGo"></span>
            </p>

            <div :style="showStyle" class="transition-box-bottom bo2">
                <div class="pad">
                    <div>
                        <p v-show="!content" :key="index" v-for="(item,index) in currentList.boxBottomText">
                            <span v-if="item.url" :class="item.warningShowFlag == true?'blink':'' "
                                  style="cursor: pointer" @click="skippage(item.url,item)">{{ item.name }}</span>
                            <span v-if="!item.url" style="pointer-events: none;color:#5a5959;font-weight:bolder">{{
                                    item.name ? item.name : item
                                }}</span>
                            <span v-if="currentList.boxBottomContent" class="btnContent"
                                  @click="btnContent(index)">{{ currentList.boxBottomContent[index].length > 0 ? '>>' : '' }}</span>
                            <span v-else class="btnBack" @click="btnBack"></span>
                        </p>
                    </div>
                    <div>
                        <p v-show="content" :key="index" v-for="(item,index) in selectObj[selectIndex]">
                            <span style="cursor: pointer"
                                  @click="skippage(item.url)">{{ item.name ? item.name : item }}</span>
                            <span class="btnBack" @click="btnBack"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
    },
    watch: {
        currentList: {
            handler(Nval) {
                this.show(Nval.showFlag)
            },
            deep: true
        },
        getWarningShowFlag: {
            handler(Nval) {
                this.warningShowFlag = Nval
                this.show()
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        getWarningShowFlag() {
            return this.currentList.warningShowFlag
        }
    },
    data() {
        return {
            content: false,
            selectIndex: 0,
            warningShowFlag: false,
            showStyle: {
                top: '18vw'
            },
            selectObj: this.currentList.boxBottomContent ? this.currentList.boxBottomContent : [1]
        }
    },
    methods: {
        show: function (flag, mouse) {
            if (this.warningShowFlag == true) {
                this.showStyle.top = -this.currentList.boxBottomText.length * 2 + 11 + 'vw';
            } else {
                if (flag) {
                    this.showStyle.top = -this.currentList.boxBottomText.length * 2 + 11 + 'vw';
                } else {
                    this.showStyle.top = '18vw';
                }
                if (mouse) {
                    this.$emit('stopTimer', flag)
                }
            }
        },
        skippage(page,item) {
            if (!page) return
            if(item.alarmPageCode){
                const data = {
                    authorizedPersonnel:this.$store.getters["user/name"],
                    alarmTime:new Date().format('YYYY-MM-dd'),
                    alarmPageCode:[item.alarmPageCode]
                }
                addLinkageAlarmInfo(data).then(()=>{
                })
                window.open( page + (page.includes("?") ? '&alarmTime=' : '?alarmTime=') + item.alarmTime, '_blank');
            }else{
                window.open(page, '_blank');
            }
        },
        btnBack: function () {
            if (this.currentList.boxBottomContent) {
                this.content = !this.content
            } else {
                this.showStyle.top = '18vw';
                // this.showStyle2.height = '0';
            }
        },
        confirm(currentList) {
            let alarmPageCode = []
            currentList.boxBottomText.map((m) => {
                if (m.warningShowFlag == true) {
                    m.warningShowFlag = false
                    alarmPageCode.push(m.alarmPageCode)
                }
            })
            const data = {
                authorizedPersonnel: this.$store.getters["user/name"],
                alarmTime: new Date().format('YYYY-MM-dd'),
                alarmPageCode: alarmPageCode
            }
            this.$emit('startTimer', currentList)
            // addLinkageAlarmInfo(data).then(() => {
            // }).then(() => {
            // })
            this.warningShowFlag = false
        },
        linkTopage: function (url, currentList) {
            let linkurl = currentList.boxBottomText.find((n) => {
                if (n.warningShowFlag == true) {
                    return n
                }
            })
            const data = {
                authorizedPersonnel: this.$store.getters["user/name"],
                alarmTime: new Date().format('YYYY-MM-dd'),
                alarmPageCode: [linkurl?.alarmPageCode]
            }
            addLinkageAlarmInfo(data).then(() => {
                this.warningShowFlag = false
            }).then(() => {
                if (!url) return
                window.open(linkurl.url, '_parent');
            })
        },
        btnContent: function (index) {
            this.selectIndex = index
            this.content = !this.content
        }
    },
  
}
</script>

<style lang="less" scoped>
.warp {
    position: relative;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-moz-keyframes blink {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-ms-keyframes blink {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-o-keyframes blink {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

/* 定义blink类*/
.blink {
    color: rgb(212, 12, 92);
    font-size: 16px;
    animation: blink 1s linear infinite;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
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

.box {
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
            margin-top: 5vw !important;
            background-size: cover !important;
        }
    }

    .textBox {
        background: radial-gradient(ellipse at center, #0d0171d6, #009eccf2);
        height: 11%;
        position: absolute;
        top: 88%;
        text-align: center;
        line-height: 1.8vw;
        border-radius: 20px;
        font-size: 0.8vw;
        z-index: 9;

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

    .bo1 {
        background-image: url("@/assets/linkage/linkageMessage.png");
        background-size: 100% 100%;
        transition: height 0.5s linear;
        top: 16vw;

        .pad {
            padding: 1.5vw 0 0.7vw 0;
        }
    }

    .bo2 {
        background-image: url("@/assets/linkage/linkageMessagedown.png");
        background-size: 100% 100%;
        transition: top 0.5s linear;

        .pad {
            padding: 0.7vw 0 1.5vw 0;
        }
    }

    .transition-box-bottom {
        width: 90%;
        height: auto;
        margin-left: 1.7vw;
        text-align: left;
        font-size: 0.8vw;
        position: absolute;

        .pad {
            p {
                margin: 0.6vw 0;
                padding-left: 1vw;
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

</style>


