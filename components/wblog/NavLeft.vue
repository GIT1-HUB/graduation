<template>
  <Menu active-name="welcome" :open-names="['1','2','3']" class="menu-left" @on-select="getIndex" style="width:100%;min-height:100vh;min-width:160px">
    <Submenu name="1">
        <template slot="title">
            <Icon class="iconfont" type="ios-construct" />
            控制面板
        </template>
        <MenuItem name="welcome"><Icon type="ios-book" class="iconfont"/>welcome</MenuItem>
        <MenuItem name="article"><Icon type="ios-book" class="iconfont"/>发布文章</MenuItem>
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
  methods: {
    getIndex (val) {
        if(val == 'welcome'){
            this.$router.push('/wblog')
        } else{
            this.$router.push('/wblog/'+val)
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
