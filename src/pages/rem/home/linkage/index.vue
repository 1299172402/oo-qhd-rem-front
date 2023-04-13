<template>
    <div class="container">
        <div style="position:absolute;left: 32%;">
            <transition name="el-zoom-in-bottom">
                <div v-show="show">
                    <div class="transition-box">
                        <div class="transition-box-content">

                        </div>
                    </div>
                </div>
            </transition>
            <p @mouseover="show = !show" style="position: absolute;top: 250px" class="textBox">注水设备能力</p>
            <transition name="el-zoom-in-top">
                <div v-show="show">
                    <div class="transition-box-bottom">
                        动设备健康管理模型
                    </div>
                </div>
            </transition>

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
.container{
    height: calc(100% - 20px);
    background-image: url("@/assets/linkage/liandong-bg.jpg");
    background-size: 100% 100%;
}
.transition-box {
    background-image: url("@/assets/linkage/linkageBlock.png");
    background-size: 100% 100%;
    margin-bottom: 10px;
    width: 400px;
    height: 300px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.transition-box-content{
    width:40%;
    height: 50%;
    margin-top: 13%;
    background-image: url("@/assets/linkage/linkageContent1.gif");
    background-size: 100% 100%;
}
.transition-box-bottom {
    margin-bottom: 10px;
    background-image: url("@/assets/linkage/linkageMessage.png");
    background-size: 100% 100%;
    width: 300px;
    height: 30px;
    border-radius: 4px;
    text-align: center;
    line-height: 15px;
    font-size: 16px;
    color: #ccc5c5;
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


