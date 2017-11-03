<template>
    <div class="login-wrap">
    </div>
</template>

<script>
export default {
    beforeMount() {
        const self = this;
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$store.commit('SETLOGIN','')
            this.$store.commit('SETTOKEN','')
            this.$store.commit('SETRETOKEN','')
            console.log(this.$store)
            self.$router.push('/index');
            this.$message({
                type: 'success',
                message: '退出成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消退出'
            });
            self.$router.push('/person');
        });

    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>