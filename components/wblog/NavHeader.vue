<template>
    <div>
        <Menu mode="horizontal" theme="light" active-name="1">
            <Row type="flex" justify="center">
                <Col span="23">
                    <div class="nav-left">
                        <nuxt-link to="/" class="logo">
                            Lilei's Blog
                        </nuxt-link>
                    </div>
                    <div class="nav-right">
                        <MenuItem name="1">
                            <Icon type="ios-paper"></Icon>
                            我的博客
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-people"></Icon>
                            待定内容
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="settings"></Icon>
                            待定内容
                        </MenuItem>
                    </div>
                </Col>
            </Row>
        </Menu>
    </div>
</template>
<style lang="less" scope>
    .ivu-col {
        height: 60px;
    }
    .logo {
        font-size:25px;
        font-weight:bold;
        height: 60px;
        float:left;
        color:#41b883;
    }
    .nav-right {
        float:right;
        line-height:58px;
    }
</style>
