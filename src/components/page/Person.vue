<template>
    <div>
        <v-sidebar></v-sidebar>
        <div class="content1">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vSidebar
        },
        methods: {
            open() {
                    this.$alert('亲，你还未登录，等', '登录提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                        });
                    }
                    });
                }
        },
        beforeMount() {
            open()
        }
    }
</script>

<style scoped>
.content1{
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 250px;
    right: 0;
    top: 0px;
    bottom:0;
    width: auto;
    padding:0px;
    box-sizing: border-box;
    overflow-y: scroll;
}
</style>