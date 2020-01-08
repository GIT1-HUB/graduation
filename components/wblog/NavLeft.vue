<template>
  <Menu :active-name="isActive" :open-names="['1','2','3']" class="menu-left" @on-select="getIndex" style="width:100%;min-height:100vh;min-width:160px">
    <Submenu name="1">
        <template slot="title">
            <Icon class="iconfont" type="ios-construct" />
            控制面板
        </template>
        <MenuItem name="welcome"><Icon type="ios-book" class="iconfont"/>welcome</MenuItem>
        <MenuItem name="publishArticle"><Icon type="ios-book" class="iconfont"/>发布文章</MenuItem>
        <MenuItem name="articleList"><Icon class="iconfont" type="md-list" />文章列表</MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon class="iconfont" type="ios-chatbubbles-outline" />
        评论管理
      </template>
      <MenuItem name="comment"><Icon class="iconfont" type="ios-chatbubbles-outline" />评论列表</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  data() {
    return {
      isActive:''
    }
  },
  mounted() {
    this.getActive();
  },
  methods: {
    getIndex (val) {
        this.isActive = val;
        if(val == 'welcome'){
            this.$router.push('/wblog')
        } else{
            this.$router.push('/wblog/'+val)
        }
    },
    getActive() {
      let path = this.$route.path;
      if(path.indexOf('List') != -1){
        this.isActive = 'articleList';
      } else if(path.indexOf('publish') != -1){
        this.isActive = 'publishArticle';
      } else if(path.indexOf('comment') != -1){
        this.isActive = 'comment';
      } else {
        this.isActive = 'welcome';
      }
    }
  }
}
</script>
<style lang="less">
.ivu-menu-item {
  font-weight: bold !important;
  i {
    font-weight: bold;
    font-size: 14px;
  }
}
.iconfont {
  font-weight: bold;
  font-size:14px;
}
</style>
