<template>
    <div>
        <div class="img4" v-if="error.statusCode == 404">
            <img src="../static/images/404.jpg" alt="404">
        </div>
        <div class="img5" v-else>
            <img src="../static/images/500.png" alt="500">
        </div>
        <ul class="link">
            <li><nuxt-link to="/">HOME</nuxt-link></li>
            <li><span @click="handleClick">返回上一页</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['error'],
    methods: {
        handleClick() {
            // window.history.go(-1)
            this.$router.go(-1);
        }
    },
}
</script>
<style lang="less" scoped>
    .img4{
        position: absolute;
        left: 25%;
    }
    .img5 {
        position: absolute;
        left: 18%;
    }
    .link {
        position: absolute;
        top: 70%;
        left: 40%;
        font-size: 18px;
    }
    .link li{
        display: inline-block;
        margin-left: 50px;
        span {
            color:#41B883; 
        }
        span:hover {
            color:#57a3f3;
            cursor:pointer
        }
    }
</style>