<template>
    <div style="height: 100%">
        <div tabindex="0" style="height: 100%">
            <!--    <div v-if="this.modelBasicInfo.modelStep == 0 "-->
            <!--              style="position: absolute; top: 210px; left: 40px;width: 740px; height: 100% !important;">-->
            <!--      <el-empty :image="require('@/icons/svg/data.png')" :image-size="250" description="暂无数据，请上传模型后查看"></el-empty>-->
            <!--    </div>-->
            <!--选择框-->
            <el-select class="radioselect" v-model="falutName" :popper-append-to-body="false"
                       @change="changeSelectImage($event, item)" size="small"
                       style="position: absolute;top: 43px;left: 20px;">
                <el-option v-for="item in options" :key="item.modelLayerId" :label="item.modelLayerName" :value="item.modelLayerId">
                </el-option>
            </el-select>
            <!--   轮播按钮   -->
            <el-row style="float: right ">
                <el-image :src="require('@/icons/svg/u2079.png')" style="height:20px" @click="loopShow2(0)"></el-image>
                <el-image :src="require('@/icons/svg/u2082.png')" style="height:20px;margin-left: 10px;" @click="clickBtnPre()"></el-image>
                <el-image :src="require('@/icons/svg/u2077.png')" style="height:20px;margin-left: 10px;" @click="stop"></el-image>
                <el-image :src="require('@/icons/svg/u2080.png')" style="height:20px;margin-left: 10px;" @click="loop"></el-image>
                <el-image :src="require('@/icons/svg/u2081.png')" style="height:20px;margin-left: 10px;" @click="clickBtnNext()"></el-image>
                <el-image :src="require('@/icons/svg/u2078.png')" style="height:20px;margin-left: 10px;" @click="loopShow(timechange[1])"></el-image>
            </el-row>
            <!--修改文字轮播版-->
            <el-row v-show="showfont" style="font-size: 14px;line-height: 20px; width:300px;margin-top: 35px">
                <div v-for="(step, index) in timestep2" :key="index" style="color: white;font-size: 14px;"
                     v-show="index === num">
                    ({{ num + 1 }}) {{ step }}
                </div>
            </el-row>
            <!--   展示图片   -->
            <el-row v-show="showPicture" style="margin-top: 5px;width: 100%;height: 100% ">
                <el-carousel style="height: 100%"
                             arrow="never"  indicator-position="none" ref="carousel" trigger="click" :autoplay="autoplay"
                             @change="changeItem" >
                    <el-carousel-item  v-for="(pic, index) in stepList" :key="index" style="height: 100%">
                        <el-image :src="pic.imageUrl"style="height: 100%" ></el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-row>

            <!--        动图时间步-->
            <el-row v-show="showfont3" style="font-size: 14px;line-height: 20px; width:300px;margin-top: 15px">
                <div v-for="(step, index) in timestep2" :key="index" style="color: white;font-size: 14px"
                     v-show="index === pid" ref="changStep">
                    ({{ pid + 1 }}) {{ step }}
                </div>
            </el-row>
            <!--    base64动图测试-->
            <el-row v-show="showGif" ref="carouselGif" style="margin-top: 5px;width: 100%;height: 480px !important;">
                <el-image style="width: 100%;height: 100%" :src="img1"></el-image>
            </el-row>
            <el-row style="text-align: center;">
                <el-button type="text" class="radionpv" style="color: white; font-size: 14px;line-height:0px"
                           @click="beforeOptimization(b = 1)">历史阶段</el-button>
                <el-button type="text" class="radionpv" style="margin-left:70px;color: white; font-size: 14px;line-height:0px"
                           @click="afterOptimization(a = 0)">预测阶段</el-button>
            </el-row>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import { GetModelLayerList, GetModelImageList, } from "@/api/rem/dispenseModel.js";
import { GetModelBasicById } from "@/api/rem/dispenseIndex.js";
export default {
    name: "surplusOil",
    //props: ['modelBasicInfo'],
    props: {
        modelBasicInfo: {
            type: Object,
        }
    },
    data() {
        return {
            bannerHeight:'',
            screenWidth:"",
            //剩余有分布
            itempara: '',
            showfont: true,
            showfont2: false,
            showfont3: false,
            showPicture1: false,
            num: 0,
            num1: 0,
            modelLayerId: '',
            modelLayerName: '',
            id: 0,
            img: [],// 图片数组
            img1: '', // 图片路径
            pid: 0,// 默认id 从零开始
            autoplay: false,
            timer: null,
            timerloopShow2: null,
            active: 0,
            item: '',
            stepArry: [],
            stepList: [],
            stepList2: [],
            stepList3: [],
            imgList: [],
            options: [],
            value: '',
            //其他代码
            map: '',
            temp: [],
            stepStep: [],
            showGif: false,
            showPicture: true,
            showStep: true,
            timestep: [],
            timestep2: [],
            timestep3: [],
            timestep4: [],
            mo: '',
            timechange: [],
            showdata: false,
            modelStep: '',
            tt: '',
            falutName: '',
        }
    },
    mounted() {
        // 首次加载时,初始化高度
        this.screenWidth = window.innerWidth
        this.bannerHeight = 600 / 1550 * this.screenWidth
        console.log(this.bannerHeight,'xxxxxxxxxxxxxx');
        // 窗口大小发生改变
        window.onresize = () => {
            this.screenWidth = window.innerWidth
            this.bannerHeight = 600 / 1550 * this.screenWidth
            console.log(this.bannerHeight,'yyyyyy');
        }
        setTimeout(() => {
            this.h();
        }, 1000)
    },
    watch: {
        tt: {
            handler: function (value) {
                if (value != null) {
                    this.run();
                }
            }
        }
    },
    methods: {
        run() {
            if (this.modelBasicInfo.modelStep != 0) {
                Promise.all([
                    this.getModelLayerList(),
                    console.log("2222222")
                ]).then(res => {
                    setTimeout(() => {
                        if (this.modelBasicInfo.modelStep != 0) {
                            this.faultSelect()
                        }
                    }, 1000)
                })
            }
        },
        h() {
            this.tt = this.modelBasicInfo.modelBasicId;
            console.log("h方法里面的id", this.tt)
        },
        isMax(val){
            let imgstyle = document.getElementById('imgstyle')
            if(val==true){
                console.log('max');
                imgstyle.style.height = '500px'
                imgstyle.style.width = '500px'
            }else {
                imgstyle.style.height = '3000px'
                imgstyle.style.width = '3000px'
            }
        },
        //获取小层数据
        getModelLayerList() {
            const param = {
                modelBasicId: this.modelBasicInfo.modelBasicId,
            };
            GetModelLayerList(param).then(res => {
                console.log("小型数据", res)
                this.options = res.result.modelLayerList;
                this.mo = this.options[0].modelLayerId;
                this.falutName = res.result.modelLayerList[0].modelLayerName
                console.log("option", this.options)
                console.log("hh", this.options[0].modelLayerId)
            })
            //this.faultSelect();
        },
        //默认显示
        faultSelect() {
            const params = {
                modelLayerId: this.mo,
                modelBasicId: this.modelBasicInfo.modelBasicId,
                isRealData: 2,
            };
            console.log("paramms", params)
            console.log('默认里面', this.mo);
            console.log('默认里面', this.modelBasicInfo.modelBasicId);
            GetModelImageList(params).then(res => {
                console.log("默认zonghhhhhhhhhhhhhhhhhhhhhhhhhhhhh000000000000000000000000000", res);
                //循环一个
                this.stepList = [];
                this.timestep = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.stepList.push(res.result.modelImageList[i])
                }
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.timestep.push(res.result.modelImageList[i].stepToDate)
                }
                this.timestep2 = [];
                //修改时间步格式
                for (let i = 0; i < this.timestep.length; i++) {
                    var dt = new Date(this.timestep[i]);
                    let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                    let year = dt.getFullYear();
                    let month = monthEnglish[dt.getMonth()];
                    let date = dt.getDate();
                    let ttt = ""
                    ttt = date + " " + month + " " + year;
                    this.timestep2.push(ttt)
                }
                console.log("默认图片1总", this.stepList)
                console.log("默认时间步总", this.timestep)
                console.log("默认时间步转化时间总", this.timestep2)
                //循环两张图片
                this.timestep3 = [];
                this.stepList2 = [];
                this.stepList2.push(res.result.modelImageList[0]);
                this.stepList2.push(res.result.modelImageList[res.result.modelImageList.length - 1]);
                this.timestep3.push(res.result.modelImageList[0].stepToDate)
                this.timestep3.push(res.result.modelImageList[res.result.modelImageList.length - 1].stepToDate);
                console.log("timestep3", this.timestep3)
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.timestep4 = [];
                    for (let i = 0; i < this.timestep3.length; i++) {
                        var dt2 = new Date(this.timestep3[i]);
                        let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                        let year = dt2.getFullYear();
                        let month = monthEnglish[dt2.getMonth()];
                        let date = dt2.getDate();
                        let ttt = ""
                        ttt = date + " " + month + " " + year;
                        this.timestep4.push(ttt)
                    }
                    this.timechange = [];
                    this.timechange.push(0);
                    this.timechange.push(this.timestep.length - 1);
                }
                console.log("stepList2", this.stepList2);
                console.log("默认时间步3总timestep3", this.timestep3)
                console.log("默认时间步转化时间总timestep4", this.timestep4)
                console.log("默认经济timechange", this.timechange)
            })
        },

        //各个小层优化前加优化后总数据
        changeSelectImage(item) {
            console.log("优化zong", item)
            this.itempara = item;
            const params = {
                modelLayerId: item,
                modelBasicId: this.modelBasicInfo.modelBasicId,
                isRealData: 2,
            };
            GetModelImageList(params).then(res => {
                console.log("优化zong", res);
                //循环一个
                this.stepList = [];
                this.timestep = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.stepList.push(res.result.modelImageList[i])
                }
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.timestep.push(res.result.modelImageList[i].stepToDate)
                }
                this.timestep2 = [];
                //修改时间步格式
                for (let i = 0; i < this.timestep.length; i++) {
                    var dt = new Date(this.timestep[i]);
                    let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                    let year = dt.getFullYear();
                    let month = monthEnglish[dt.getMonth()];
                    let date = dt.getDate();
                    let ttt = ""
                    ttt = date + " " + month + " " + year;
                    this.timestep2.push(ttt)
                }
                console.log("图片1总", this.stepList)
                console.log("时间步总", this.timestep)
                console.log("时间步转化时间总", this.timestep2)
                //循环两张
                this.timestep3 = [];
                this.stepList2 = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    if (i % 2 == 0) {
                        this.stepList2.push(res.result.modelImageList[i]);
                        this.timestep3.push(res.result.modelImageList[i].stepToDate)
                    }

                    this.timestep4 = [];
                    for (let i = 0; i < this.timestep3.length; i++) {
                        var dt2 = new Date(this.timestep3[i]);
                        let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                        let year = dt2.getFullYear();
                        let month = monthEnglish[dt2.getMonth()];
                        let date = dt2.getDate();
                        let ttt = ""
                        ttt = date + " " + month + " " + year;
                        this.timestep4.push(ttt)
                    }
                    this.timechange = [];
                    this.timechange.push(0);
                    this.timechange.push(this.timestep.length - 1);
                }
                console.log("stepLost2总", this.stepList2);
                console.log("时间步3总", this.timestep3)
                console.log("时间步转化时间总", this.timestep4)
                console.log("总", this.timechange)
            })

        },

        //图片向前循环
        clickBtnPre() {
            //循环一次step
            this.showfont = true;
            //erci
            this.showPicture1 = false
            this.showfont2 = false;
            this.showfont3 = false;
            clearInterval(this.timerGif);
            this.timerGif = null;
            console.log("2222")
            this.showGif = false;
            this.showPicture = true
            this.$refs.carousel.prev()
            console.log("11111")
        },
        //图片向后循环
        clickBtnNext() {
            //循环一次step
            this.showfont = true;
            //erci
            this.showPicture1 = false
            this.showfont2 = false;
            this.showfont3 = false;
            this.$refs.carousel._props.autoplay = false;
            clearInterval(this.timerGif);
            this.timerGif = null;
            console.log("2222")
            this.showGif = false;
            this.showPicture = true

            this.$refs.carousel.next()
        },
        //动图展示
        loop() {
            this.showPicture1 = false;
            this.showPicture = false;
            this.showStep = false;
            this.gif()
            if(this.img1!=null){
                this.showGif = true;
            }
            this.showfont = false;
            this.showfont2 = false;
            this.showfont3 = true;
        },

        //图片相隔一张展示（向右）
        loopShow(e) {
            this.showPicture = true;
            //this.showPicture1 = true;
            this.showfont = true;
            this.showfont2 = false;
            this.showfont3 = false;
            clearInterval(this.timerGif);
            this.timerGif = null;
            this.showGif = false;
            this.$refs.carousel.setActiveItem(e)
            // tab切换的下标
            this.active = e;
            this.num = e;
            console.log("loopshow", e)
        },
        //图片相隔一张展示（向左）
        loopShow2(e) {
            this.showPicture = true;
            //this.showPicture1 = true
            this.showfont = true;
            this.showfont2 = false;
            this.showfont3 = false;
            clearInterval(this.timerGif);
            this.timerGif = null;
            this.showGif = false;
            this.$refs.carousel.setActiveItem(e)
            // tab切换的下标
            this.active = e;
            this.num = e;
            console.log("loopshow1", e)
        },
        changeItem(e) {
            this.active = e
            this.num = e;
            console.log("danxiangnum", this.num)
            console.log("e", e)

        },
        //停止按钮
        stop() {
            this.showGif = false;
            this.showPicture = true
            this.showfont = true
            this.showfont3 = false;
            clearInterval(this.timerGif);
            this.timerGif = null;
            this.$refs.carousel._props.autoplay = false;
            clearInterval(this.timer);
            this.timer = null;
            clearInterval(this.timerloopShow2);
            this.timerloopShow2 = null;
        },
        //优化前
        beforeOptimization(b) {
            console.log("优化前", this.itempara);
            const params = {
                modelLayerId: this.itempara == 0 ? this.mo : this.itempara,
                modelBasicId: this.modelBasicInfo.modelBasicId,
                isRealData: b,
            };
            console.log("modeliiii", params)
            GetModelImageList(params).then(res => {
                console.log("优化前", res);
                //循环一个图片
                this.stepList = [];
                this.timestep = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.stepList.push(res.result.modelImageList[i])
                }
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.timestep.push(res.result.modelImageList[i].stepToDate)
                }
                this.timestep2 = [];
                for (let i = 0; i < this.timestep.length; i++) {
                    var dt = new Date(this.timestep[i]);
                    let monthEnglish = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                    let year = dt.getFullYear();
                    let month = monthEnglish[dt.getMonth()];
                    let date = dt.getDate();
                    let ttt = ""
                    ttt = date + " " + month + " " + year;
                    this.timestep2.push(ttt)
                }
                console.log("图片1qian", this.stepList)
                console.log("时间步qian", this.timestep)
                console.log("时间步转化时间qian", this.timestep2)
                //循环两张图片
                this.timestep3 = [];
                this.stepList2 = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    if (i % 2 == 0) {
                        this.stepList2.push(res.result.modelImageList[i]);
                        this.timestep3.push(res.result.modelImageList[i].stepToDate)
                    }

                    this.timestep4 = [];
                    for (let i = 0; i < this.timestep3.length; i++) {
                        var dt2 = new Date(this.timestep3[i]);
                        let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                        let year = dt2.getFullYear();
                        let month = monthEnglish[dt2.getMonth()];
                        let date = dt2.getDate();
                        let ttt = ""
                        ttt = date + " " + month + " " + year;
                        this.timestep4.push(ttt)
                    }
                    this.timechange = [];
                    this.timechange.push(0);
                    this.timechange.push(this.timestep.length - 1);
                }
                console.log("stepLost2qian", this.stepList2);
                console.log("时间步3qian", this.timestep3)
                console.log("时间步转化时间4qian", this.timestep4)
                console.log("有钱", this.timechange)
            })
        },
        //优化后
        afterOptimization(a) {
            //优化后
            const param = {
                modelLayerId: this.itempara == 0 ? this.mo : this.itempara,
                modelBasicId: this.modelBasicInfo.modelBasicId,
                isRealData: a,
            };
            console.log("", this.itempara)
            console.log(this.itempara)
            GetModelImageList(param).then(res => {
                console.log("优化后", res);
                //循环一个
                this.stepList = [];
                this.timestep = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.stepList.push(res.result.modelImageList[i])
                }
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    this.timestep.push(res.result.modelImageList[i].stepToDate)
                }
                this.timestep2 = [];
                for (let i = 0; i < this.timestep.length; i++) {
                    var dt = new Date(this.timestep[i]);
                    let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                    let year = dt.getFullYear();
                    let month = monthEnglish[dt.getMonth()];
                    let date = dt.getDate();
                    let ttt = ""
                    ttt = date + " " + month + " " + year;
                    this.timestep2.push(ttt)
                }
                console.log("图片1", this.stepList)
                console.log("时间步", this.timestep)
                console.log("时间步转化时间", this.timestep2)
                //循环两张
                this.timestep3 = [];
                this.stepList2 = [];
                for (let i = 0; i < res.result.modelImageList.length; i++) {
                    if (i % 2 == 0) {
                        this.stepList2.push(res.result.modelImageList[i]);
                        this.timestep3.push(res.result.modelImageList[i].stepToDate)
                    }
                    this.timestep4 = [];
                    for (let i = 0; i < this.timestep3.length; i++) {
                        var dt2 = new Date(this.timestep3[i]);
                        let monthEnglish = ["JAN", "FEB", "MA R", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC"]
                        let year = dt2.getFullYear();
                        let month = monthEnglish[dt2.getMonth()];
                        let date = dt2.getDate();
                        let ttt = ""
                        ttt = date + " " + month + " " + year;
                        this.timestep4.push(ttt)
                    }
                    this.timechange = [];
                    this.timechange.push(0);
                    this.timechange.push(this.timestep.length - 1);
                }
                console.log("stepLost2", this.stepList2);
                console.log("时间步3", this.timestep3)
                console.log("时间步转化时间4", this.timestep4)
                console.log("youhou", this.timechange)
            })
        },
        //控制动图
        gif() {
            this.img1 = this.stepList[this.pid].imageUrl;
            console.log("this.img1", this.img1)
            // 页面显示 加载默认图片
            this.timerGif = setInterval(() => {
                // 如果当前图片是最后一张就把id清零 从第一张开始
                if (this.pid === this.stepList.length - 1) {
                    this.pid = 0
                    this.img1 = this.stepList[this.pid].imageUrl
                    console.log("if", this.img1)
                } else {
                    // 如果当前不是最后一张 就切换下一张
                    this.pid += 1
                    this.img1 = this.stepList[this.pid].imageUrl
                    // console.log("else",this.img1)
                }
            }, 1000)
        },
    },

}
</script>

<style lang="scss" scoped>
.radionpv {
    width: 100px;
    height: 30px;
    box-sizing: border-box;
    border-color: rgba(44, 215, 252, 1);
    border-radius: 0px;
}

</style>