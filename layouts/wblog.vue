<template>
    <div>
        <nav-header />
            <Row type="flex" justify="space-between" style="min-width:1200px;">
            <Col span="3">
                <nav-left class="navleft"></nav-left>
            </Col>
            <Col span="21" class="routerView">
                <nuxt/>
            </Col>
            </Row>
    </div>
</template>
<script>
import NavHeader from '~/components/wblog/NavHeader.vue';
import NavLeft from '~/components/wblog/NavLeft.vue';
export default {
    components:{
        NavHeader,
        NavLeft
    },
    head() {
		return {
			title:`${this.$store.state.username}的博客`,
			meta:[
				{hid:'description',name:'description',content:'李磊个人博客，关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'李磊,互联网,自媒体,李磊博客,新鲜科技,科技博客，个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'lilei'}
			]
		}
	}
}
</script>
<style lang="less">
    
</style>