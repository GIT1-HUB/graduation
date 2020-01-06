<template>
    <div>
        <nav-header />
            <Row type="flex" justify="space-between" style="min-width:1200px;">
            <Col span="3">
                <nav-left class="navleft"></nav-left>
            </Col>
            <Col span="21" class="routerView">
                <nuxt />
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
    }
}
</script>
<style lang="less">
    
</style>