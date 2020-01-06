<template>
    <div>
        <div class="nav">
            <el-row type="flex" class="NavHeader" justify="center">
                <el-col :span="12">
                    <nuxt-link to="/" class="logo"> LiLei's Blog </nuxt-link>
                </el-col>
                <el-col :span="8">
                  <el-menu
                      :default-active="activeIndex"
                      class="el-menu-demo navbar"
                      mode="horizontal"
                      text-color="#fff"
                      @select="handleSelect"
                      active-text-color="#41b883">
                      <!--<el-menu-item index="1">处理中心</el-menu-item>-->
                      <el-menu-item index="index">文章列表</el-menu-item>
                      <!--<el-menu-item index="Backarticle">后端文章</el-menu-item>-->
                      <el-menu-item  index="wblog">写博客</el-menu-item>
                      <!--<el-menu-item index=""><a href="http://docs.brianlee.cn" class="docs" target="_blank">文档中心</a></el-menu-item>-->
                      <el-menu-item index="about">关于我</el-menu-item>
                      <el-menu-item index="register">{{username}}</el-menu-item>
                  </el-menu>
                </el-col>
            </el-row>
        </div>
        <img src="~/static/images/banner.jpg" alt="banner" class="banner_img">
        <Modal
        v-model="modal1"
        title="登录提示"
        ok-text="去登录"
        cancel-text="取消"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>你还没有登录，去登陆</p>
    </Modal>
    </div>
</template>

<script>
export default {
    data() {
      return {
        modal1:false
      };
    },
    props: {
      activeIndex:{
        type:String,
        default:'index'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key == 'wblog'){
          if(this.username == '登录/注册') {
            this.modal1 = true;
            return
          }
        }

        this.$router.push({name:key});
      },
      ok() {
        this.modal1 = false;
        this.$router.push('/register/login');
      },
      cancel() {
        this.modal1 = false;
        return
      }
    },
    computed: {
      username(){
        // return window.encodeURIComponent(this.$store.state.username)
        if(this.$store.state.username == ''){
          return '登录/注册'
        }
        return  this.$store.state.username
      }
    },

}
</script>
<style lang="less">
    @import './../assets/css/Index/NavHeader.less';
</style>
