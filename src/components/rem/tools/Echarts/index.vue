<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import {mapState} from "vuex";
    import resize from './mixins/resize.js'
    export default {
        name: 'EchartsIndex',
        mixins: [resize],
        props: {
            chartData: {
                type: Object,
                default: () => ({})
            },
            otherData: {
                type: Object,
                default: () => ({})
            },
            className: {
                type: String,
                default: "chart"
            },
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "200px"
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            resizeKey: {
                type: Number,
                default: 0
            },
            events: {
                type: Array,
                default () {
                    return [];
                }
            },
            reverse: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: "qhd326-zb"
            },
            resizeRender: {
                type: Boolean,
                default: false
            },
            customKey: {
                type: String,
                default: ""
            },
            // 等待
            loading: Boolean
        },
        data() {
            return {
                chart: null,
                timeOut: 0,
                dbFixed: 0
            };
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions();
                    this.$nextTick(() => {
                        // 解决加载时父元素大小变化问题
                        this.chart.resize()
                    });
                }
            },
            resizeKey: {
                handler(val) {
                    if (this.resizeRender) {
                        this.chart.dispose();
                        this.initChart()
                    } else {
                        this.chart.resize();
                    }
                }
            },
            reverse: {
                handler(val) {
                    console.log('??')
                    this.setOptions();
                    this.$nextTick(() => {
                        // 解决加载时父元素大小变化问题
                        this.chart.resize()
                    });
                }
            },
            loading: {
                handler(val) {
                    if (!this.chart) return
                    if (val) {
                        this.chart.showLoading({
                            color: '#24DEFF', // icon
                            textColor: '#fff',
                            maskColor: 'rgba(36,222,255,0.22)'
                        })
                    } else {
                        this.chart.hideLoading()
                    }
                }
            }
        },
        mounted() {
            this.initChart();
            this.$nextTick(() => {
                this.events.forEach(events => {
                    const event = events.name || events;
                    this.chart.on(event, ev => {
                        if (event == 'click') {
                            clearTimeout(this.dbFixed);
                            this.dbFixed = setTimeout(() => {
                                this.$emit(event, ev);
                            }, 300)
                        } else if (event == 'dblclick') {
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
            setOptions({expectedData,actualData} = {}) {
                if (this.isEmptyObject(this.chartData)) {
                    return
                }
                this.chart.clear();
                if (!this.reverse) {
                    this.chart.setOption(this.chartData);
                } else {
                    this.chart.setOption(this.otherData);
                }
                this.$nextTick(() => {
                    this.events.forEach(events => {
                        const event = events.name || events;
                        this.chart.on(event, ev => {
                            if (event == 'click') {
                                clearTimeout(this.dbFixed);
                                this.dbFixed = setTimeout(() => {
                                    this.$emit(event, ev);
                                }, 300)
                            } else if (event == 'dblclick') {
                                clearTimeout(this.dbFixed);
                                this.$emit(event, ev);
                            } else {
                                this.$emit(event, ev);
                            }
                        });
                    });
                });
            },
            initChart() {
                this.chart = this.$echarts.init(this.$el, this.theme);
                this.setOptions();
            },
            isEmptyObject(value) {
                for (const key in value) {
                    if (hasOwnProperty.call(value, key)) {
                        return false
                    }
                }
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null
        }
    };
</script>
