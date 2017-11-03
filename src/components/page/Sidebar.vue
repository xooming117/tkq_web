<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-arrow-left',
                        index: 'index',
                        title: '返回瓶子范'
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'setpinfo',
                        title: '修改个人资料'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'setpwd',
                        title: '修改密码',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'setpid',
                        title: 'PID管理'
                    },
                    {
                        icon: 'el-icon-share',
                        index: 'likes',
                        title: '收藏'
                    },
                    {
                        icon: 'el-icon-share',
                        index: 'logout',
                        title: '退出'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 240px;
        left: 0;
        top: 0px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
