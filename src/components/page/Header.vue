<template>
    <div class="">
        <el-row type="flex" class="row-bg header">
            <el-col :span="24">
                <div>
                    <el-menu :default-active="onRoutes" unique-opened router class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="index">
                            <span class="hh">瓶子范</span>
                        </el-menu-item>
                        <el-menu-item index="person">个人中心</el-menu-item>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'linxin',
            activeIndex: 1
        }
    },

    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        },
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        },
        handleSelect() {}
    }
}
</script>
<style scoped>

.tags {
    float: left;
    padding: 10px;
    border: 1px soild #1D8CE0;
}

.header {
    width: 100%;
    background: #E5E9F2
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
