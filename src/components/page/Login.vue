<template>
    <div class="login-wrap">
        <div class="ms-title">登　录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">{{ruleForm.tips}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>

//import { mapMutations, mapActions, mapGetters } from 'vuex'
import api from '../../fetch/api'

export default {
    data: function () {
        return {
            ruleForm: {
                username: '',
                password: '',
                tips: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let acc = {
                        account: self.ruleForm.username,
                        password: self.ruleForm.password
                    }
                    api.login(acc).then(({data})=>{
                        this.ruleForm.tips = data.msg
                        if(data.code===200) {
                            this.$store.commit('SETLOGIN','1')
                            console.log(this.$store)
                            this.$store.commit('SETTOKEN',data.token)
                            this.$store.commit('SETRETOKEN',data.retoken)
                            console.log(this.$store)
                        } else {
                            this.$store.commit('SETLOGIN','')
                            this.$store.commit('SETTOKEN','')
                            this.$store.commit('SETRETOKEN','')
                        }
                        this.ruleForm.tips = data.msg

                    }).then(()=>{
                        //console.log('result:'+result)
                        api.getinfo().then(({data})=>{
                            // console.log('step 3')
                            console.log(data)
                            if(data.code===200) {
                                this.$store.commit('SETTOKEN',data.token)
                                this.$store.commit('SETUINFO',data.data)
                            }
                            this.$router.push('/index')
                        })
                    }).catch((e)=>{
                        console.log(e)
                    })   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        this.ruleForm.tips = '欢迎回来 :）'
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>