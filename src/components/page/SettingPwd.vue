<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>　个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="原密码">
                    <el-input v-model="form.oldpwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input v-model="form.repwd"></el-input>
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
                    oldpwd: '',
                    newpwd: '',
                    repwd: ''
                }
            }
        },
        methods: {
            onSubmit() {
                let params = { oldpwd: this.form.oldpwd, 
                    newpwd: this.form.newpwd, repwd: this.form.repwd }
                api.modpwd(params).then(({ data }) => {
                    console.log(data)
                    if (data.code === 200) {
                        this.$message.success('修改成功！');
                    } else {
                        this.$message.success(data.msg);
                    }
                }).catch((e) => {
                    console.log(e)
                    this.$message.success('修改失败！');
                })
            }
        }
}
</script>