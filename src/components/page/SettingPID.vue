<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>　个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>PID管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="微信推广PID">
                    <el-input v-model="form.wxpid"></el-input>
                </el-form-item>
                <el-form-item label="QQ推广PID">
                    <el-input v-model="form.qqpid"></el-input>
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
        data: () => {
            return {
                form: {
                    wxpid: '',
                    qqpid: '',
                }
            }
        },
        computed: {
            ...mapGetters(['uinfo'])
        },
        methods: {
            onSubmit() {
                let params = {wxpid: this.form.wxpid, qqpid: this.form.qqpid}
                api.update(params).then(({data})=>{
                    console.log(data)
                    if(data.code===200) {
                        this.$message.success('修改PID成功！');
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
                this.form.wxpid = this.uinfo.wxpid
                this.form.qqpid = this.uinfo.qqpid
            }).catch((e) => {
                console.log(e)
            })
        }
    }
</script>