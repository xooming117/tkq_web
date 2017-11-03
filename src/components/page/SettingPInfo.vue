<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>　个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>修改个人资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="form.qqcode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import api from '../../fetch/api'
    export default {
        data: function(){
            return {
                form: {
                    nickname: '',
                    qqcode: '',
                }
            }
        },
        computed: {
            ...mapGetters(['uinfo'])
        },
        methods: {
            onSubmit() {
                let params = {nickname: this.form.nickname, qqcode: this.form.qqcode}
                api.update(params).then(({data})=>{
                    console.log(data)
                    if(data.code===200) {
                        this.$message.success('修改成功！');
                    } else {
                        this.$message.success(data.msg);
                    }
                }).catch((e)=>{
                    console.log(e)
                    this.$message.success('修改失败！');
                })
            }
        },
        mounted() {
            api.getinfo().then(({ data }) => {
                // console.log('step 3')
                console.log(data)
                if (data.code === 200) {
                    this.$store.commit('SETUINFO', data.data)
                }
            }).
            then(() => {
                this.form.nickname = this.uinfo.nickname
                this.form.qqcode = this.uinfo.qqcode
            }).catch((e) => {
                console.log(e)
            })
        }
    }
</script>