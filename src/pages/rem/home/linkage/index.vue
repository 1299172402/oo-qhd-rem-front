<template>
    <div class="app-container">

        <div style="margin-top: 20px; height: 200px;">
            <el-collapse-transition>
                <div v-show="show">
                    <div class="transition-box">

                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <p @mouseover="show = !show" class="textBox">注水设备能力</p>
        <div style="margin-top: 20px; height: 200px;">
            <el-collapse-transition>
                <div v-show="show">
                    <div class="transition-box-bottom">

                    </div>
                </div>
            </el-collapse-transition>
        </div>

    </div>
</template>

<script>


export default {
    data: () => ({
        show: true
    })
}
</script>

<style lang="less" scoped>
.transition-box {
    margin-bottom: 10px;
    width: 300px;
    height: 200px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.transition-box-bottom {
    margin-bottom: 10px;
    width: 300px;
    height: 30px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-left: 50px;
}
.textBox{
    background: linear-gradient(rgba(30, 71, 206, 0.9), rgba(27, 121, 229, 0.6), rgba(29, 150, 215, 0.6), rgba(30, 71, 206, 0.9));
    width: 160px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 20px;
}
</style>


