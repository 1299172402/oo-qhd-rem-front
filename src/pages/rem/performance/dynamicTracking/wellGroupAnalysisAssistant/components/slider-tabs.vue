<!-- 滑动-tabs标签 -->
<template>
    <div class="main-box-tab">
        <i class="el-icon-arrow-left" @click="previous"></i>
        <div class="main-box-tab-content" ref="tabs">
            <div class="main-box-tab-roll">
                <el-button v-for="(module, indexButton) in tabs" :key="indexButton" :class="tabsName == module.name ? 'el-button--primary' : 'commonBtn'" style="margin-top: 5px;" @click="tapTabs(module.name )">{{ module.label }}</el-button>
            </div>
        </div>
        <i class="el-icon-arrow-right" @click="next"></i>
    </div>
</template>

<script>
export default {
    props:{
        tabs:{
            type:Array,
            default:()=>{
                return []
            }
        },
        currentModule:{
            type:String,
            default:''
        }
    },
    watch:{
        currentModule:function(newValue){
            this.tabsName=newValue;
        }
    },
    data() {
        return {
            tabsWidth:0,//tabs总宽度
            realityWidth:0,//实际宽度
            phaseDifferenceWidth:0,//相差宽度
            tabsName: 'cumulativeOilWaterProduction'
        };
    },
    mounted() {
        this.tabsName=this.currentModule;
    },
    methods: {
        //切换
        tapTabs(name){
            if(this.tabsName!=name){
                this.tabsName=name;
                this.$emit('tabTabs',this.tabsName);
            }
        },
        //往左
        previous() {
            this.translateX(0);
        },
        //往右
        next(){
            this.$nextTick(() => {
                this.realityWidth=0;
                this.tabsWidth = this.$refs.tabs.offsetWidth;
                let dom = this.$refs.tabs.children[0];
                for (let i = 0; i < dom.children.length; i++) {
                    let buttonWidth=dom.children[i].offsetWidth;
                    if(i!==0 || i!==dom.children.length-1){
                        buttonWidth+=20;
                    }
                    this.realityWidth+=buttonWidth;
                }
                this.phaseDifferenceWidth= Math.ceil( this.realityWidth-this.tabsWidth);
                this.translateX(this.phaseDifferenceWidth);
            });
        },
        //位移
        translateX(x) {
            let moveX = x < 0 ? 0 : x;
            this.$refs.tabs.children[0].style.transform = `translateX(-${moveX}px)`;
        }
    }
};
</script>

<style lang="scss" scoped>
    .main-box-tab {
        display: flex;
        align-items: center;
        overflow: hidden;
        .el-icon-arrow-left{
            font-size:20px;
            cursor: pointer;
            color:var(--light-blue-color);
            &::before{
                color:var(--light-blue-color)!important;
            }
        }
        .el-icon-arrow-right{
            font-size:20px;
            cursor: pointer;
            color:var(--light-blue-color);
            &::before{
                color:var(--light-blue-color)!important;
            }
        }
        .main-box-tab-content {
            margin:0 10px;
            overflow: hidden;
            .main-box-tab-roll {
                transition: transform 0.8s;
                display: flex;
                align-items: center;
            }
        }
    }
</style>
