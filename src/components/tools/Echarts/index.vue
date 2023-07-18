<template>
    <div class="chartsBox" ref="chartsBox" :style="{ height: height, width: width }" v-resize="resize">
        <div :class="className" :style="{ height: '100%', width: '100%' }"></div>
        <div class="chartsDownload" v-if="chartData?.toolbox?.show">
            <el-button style="margin-left: 10px; height: 28px; padding: 0px 15px" type="primary" @click="chartDownLoad">下载</el-button>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import { mapState } from "vuex";
    import resize from "./mixins/resize";
    import FileSaver from "file-saver";
    export default {
        mixins: [resize],
        props: {
            chartData: {
                type: Object,
                default: () => ({}),
            },
            otherData: {
                type: Object,
                default: () => ({}),
            },
            className: {
                type: String,
                default: "chart",
            },
            width: {
                type: String,
                default: "100%",
            },
            height: {
                type: String,
                default: "200px",
            },
            autoResize: {
                type: Boolean,
                default: true,
            },
            resizeKey: {
                type: Number,
                default: 0,
            },
            events: {
                type: Array,
                default () {
                    return [];
                },
            },
            reverse: {
                type: Boolean,
                default: false,
            },
            theme: {
                type: String,
                default: "qhd326-zb",
            },
            resizeRender: {
                type: Boolean,
                default: false,
            },
            customKey: {
                type: String,
                default: "",
            },
            // 等待
            loading: Boolean,
        },
        data() {
            return {
                chart: null,
                timeOut: 0,
                dbFixed: 0,
            };
        },
        directives: {
            resize: {
                bind(el, binding) {
                    let width = "",
                        height = "";

                    function isReize() {
                        const style = document.defaultView.getComputedStyle(el);
                        if (width !== style.width || height !== style.height) {
                            binding.value();
                        }
                        width = style.width;
                        height = style.height;
                    }
                    el.__vueSetInterval__ = setInterval(isReize, 0);
                },
                unbind(el) {
                    clearInterval(el.__vueSetInterval__);
                },
            },
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions();
                    this.$nextTick(() => {
                        // 解决加载时父元素大小变化问题
                        this.chart.resize();
                    });
                },
            },
            resizeKey: {
                handler(val) {
                    if (this.resizeRender) {
                        this.chart.dispose();
                        this.initChart();
                    } else {
                        this.chart.resize();
                    }
                },
            },
            reverse: {
                handler(val) {
                    this.setOptions();
                    this.$nextTick(() => {
                        // 解决加载时父元素大小变化问题
                        this.chart.resize();
                    });
                },
            },
            loading: {
                handler(val) {
                    if (!this.chart) return;
                    if (val) {
                        this.chart.showLoading({
                            color: "#24DEFF", // icon
                            textColor: "#fff",
                            maskColor: "rgba(36,222,255,0.22)",
                        });
                    } else {
                        this.chart.hideLoading();
                    }
                },
            },
        },
        mounted() {
            this.initChart(); // 初始化echarts
            /* echarts  事件 */
            this.$nextTick(() => {
                this.events.forEach((events) => {
                    const event = events.name || events;
                    this.chart.on(event, (ev) => {
                        if (event == "click") {
                            clearTimeout(this.dbFixed);
                            this.dbFixed = setTimeout(() => {
                                this.$emit(event, ev);
                            }, 300);
                        } else if (event == "dblclick") {
                            clearTimeout(this.dbFixed);
                            this.$emit(event, ev);
                        } else {
                            this.$emit(event, ev);
                        }
                    });
                });
            });
        },
        methods: {
            resize() {
                this.$nextTick(() => {
                    this.chart.resize();
                });
            },
            setOptions({
                expectedData,
                actualData
            } = {}) {
                if (this.isEmptyObject(this.chartData)) return;
                this.chart.clear();
                if (!this.reverse) {
                    this.chart.setOption(this.chartData);
                } else {
                    this.chart.setOption(this.otherData);
                }
                /* echarts  事件 */
                this.$nextTick(() => {
                    this.events.forEach((events) => {
                        const event = events.name || events;
                        this.chart.on(event, (ev) => {
                            if (event == "click") {
                                clearTimeout(this.dbFixed);
                                this.dbFixed = setTimeout(() => {
                                    this.$emit(event, ev);
                                }, 300);
                            } else if (event == "dblclick") {
                                clearTimeout(this.dbFixed);
                                this.$emit(event, ev);
                            } else if(event=='legendselectchanged'){
                                if(ev.name=='红色预警'|| ev.name =='蓝色预警' || ev.name== '黄色预警'){
                                    this.chart.dispatchAction({
                                        type: 'legendSelect',
                                        name: ev.name
                                    });
                                }
                            } else {
                                this.$emit(event, ev);
                            }
                        });
                    });
                });
            },
            initChart() {
                this.chart = this.$echarts.init(this.$el.querySelector("." + this.className), this.theme);
                this.setOptions();
            },
            isEmptyObject(value) {
                for (const key in value) {
                    if (hasOwnProperty.call(value, key)) {
                        return false;
                    }
                }
            },
            chartDownLoad(fileName) {
                let res = this.chart.getDataURL({
                    type: "png",
                    pixelRatio: 1.5,
                    backgroundColor: "#022644",
                });
                FileSaver.saveAs(res, fileName);
            },
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },
    };
</script>

<style lang="scss" scoped>
    .chartsBox {
        // height: auto;
        // position: relative;
        .chartsDownload {
            position: absolute;
            top: 4px;
            right: 56px;
            z-index: 99;
        }
    }
</style>
