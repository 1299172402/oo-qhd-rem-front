<template>
    <div :class="['H5Box',className]" :style="{width:width,height:height}">
        <!-- <el-button v-if="showFullBtn" class="floatR" icon="el-icon-rank" plain @click="handleFullScreen('innerIframe')">全屏查看</el-button> -->
        <!-- <el-button v-if="className==='znjsSave'" class="floatR znjs_btn" plain style="right: 145px;" @click="saveZNJSData">保存</el-button> -->
        <iframe id="iframe" ref="innerIframe" :src="`${url}?t='${reload}`" frameborder="0" style="width:100%;height:100%;" @load="loadFinish"></iframe>
    </div>
</template>
<script>
    // import checkFullScreen from "@/lib/FullScreen.js";
    // import {debounce} from 'lodash';
    export default {
        name: "H5MajorComponents",
        // mixins: [checkFullScreen],
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "500px"
            },
            className: {
                type: String,
                default: ""
            },
            reload: {
                type: Number,
                default: 0
            },
            showFullBtn: {
                type: Boolean,
                default: false
            },
            url: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                jquery: undefined,
                w: undefined,
                time: new Date().getTime(),
                data: {},
                loadKey: false
            };
        },
        mounted() {
            // console.log("baseUrl", this.baseUrl);
            window.initSampleData = (commonJs, $, w) => {
                this.initSampleData(commonJs, $, w);
            };
            // this.__resizeHandler = debounce(() => {
            //   console.log('window.fView',this.w.fView)
            //   if (this.w.fView) {
            //     console.log('window.fView----',this.w.fView)
            //       this.w.fView.WindowResizeWidth()
            //   }
            // }, 300)
            // window.addEventListener('resize', this.__resizeHandler)
        },
        beforeDestroy() {
            // window.removeEventListener('resize', this.__resizeHandler)
        },
        methods: {
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: null
             * @description: 初始化专业图形
             * @Date: 2020-04-01 14:24:41
             */
            initSampleData(commonJs, $, w) {
                this.jquery = $
                this.w = w
            },
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: null
             * @description: 放大
             * @Date: 2020-04-01 14:25:00
             */
            handlerZoomOut() {
                if (this.w && this.w.fView) {
                    this.w.fView.ZoomOut();
                }
            },
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: null
             * @description: 缩小
             * @Date: 2020-04-01 14:25:00
             */
            handlerZoomIn() {
                if (this.w && this.w.fView) {
                    this.w.fView.ZoomIn();
                }
            },
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: null
             * @description: 全图
             * @Date: 2020-04-01 14:25:00
             */
            handlerZoomHeight() {
                console.log("全图刷新",this.w, this.w.fView)
                if (this.w && this.w.fView) {
                    this.w.fView.ZoomHeight();
                    this.w.fView.ZoomAll();//全图
                    this.w.fCommon.ZoomAll();//全图
                }
            },
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: null
             * @description: 全图
             * @Date: 2020-04-01 14:25:00
             */
             handlerZoomHeight1() {
                console.log("全图刷新1",this.w, this.w.fView)
                if (this.w && this.w.fView) {
                    // this.w.fView.ZoomHeight();
                    this.w.fView.ZoomAll();//全图
                    // this.w.fCommon.ZoomAll();//全图
                }
            },
            /**
             * @author: ddhhh
             * @param {type} {Params}
             * @return: Object
             * @description: 设置数据
             * @Date: 2020-03-25 11:13:26
             */
            setSampleDate(data) {
                // this.data = data;
                console.log(data, this.loadKey)
                if (this.loadKey) {
                    if (this.w && this.w.fView && this.w.fView.RefreshData) {
                        console.log('setSampleDate')
                        // this.w.fCommon.Delete()
                        // this.w.fView.View.Delete()
                        this.w.fView.RefreshData(data, true, true);
                        // this.w.fView.View.ScrollView(this.w.fView.View.HScrollValue, this.w.fView.View.VScrollValue);
                        // this.w.fView.ZoomPicture();
                        // this.w.fView.View.Repaint();
                    }
                    // this.loadKey = false
                } else {
                    this.time = new Date().getTime()
                }
                console.log('index-data', data, this.w)
                // if(this.w && this.w.setProfessionalChart){
                //   this.w.setProfessionalChart(data)
                // }
            },
            setProminentWell(data){
                console.log('子组件',data)
                this.w.fView.SetFrameData(data);
                this.w.fView.View.MakeAviod();//井号避让，根据情况自决定是否选用
                this.w.fView.ZoomAll();//全图
            },
            loadFinish() {
                // alert('加载完成')
                this.loadKey = true;
                this.$emit("load", new Date().getTime());
            },
            /**
             * hwh
             * 下载包括底图内容下载
             */
            downLoadAllPicture() {
                if (this.w && this.w.fView) {
                    this.w.fView.SaveToPngPicture();
                }
            }
        }
    };
</script>
<style scoped>
    .H5Box {
        position: relative;
    }

    .H5Box .floatR {
        position: absolute;
        right: 18px;
        top: -37px;
        /*position:relative;*/
        /*float:right;*/
        /*margin-right:18px;*/
        /*!*margin-top:-37px;*!*/
    }

    .znjs_btn {
        display: none;
    }

    .znjsSave .znjs_btn {
        display: block;
    }
    #iframe{
        /* border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1; */
    }
</style>
