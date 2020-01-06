<template>
    <div class="register">
        <div class="container">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login">
                <el-form-item label="用户名:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <span style="color:white">还没有账号</span>
                    <nuxt-link to="/register">去注册</nuxt-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import CryptoJS from "crypto-js";

export default {
    
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            error:'',
            ruleForm: {
                name:'',
                pass: '',
            },
            rules: {
                name: [
                    { validator: checkName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
               
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/bloguser/signin',{
                username:window.encodeURIComponent(this.ruleForm.name),
                password: CryptoJS.MD5(this.ruleForm.pass).toString()
            }).then( ({status,data}) => {
                if(status===200){
                    if(data&&data.code===0){
                        location.href = '/'
                    } else {
                        alert(data.msg)
                    }
                } else {
                    alert('服务器出错，请重试或与管理员联系（邮箱：15528022618@163.com）')
                }
            })
          } else {
            alert('请正确填写表单！！！')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="less">
    .register {
        background-image: url('~static/images/login.jpeg');
        height: 100vh;
        .container {
            width: 360px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-140%,-50%);
            .login {
                width: 340px;
                margin: 0 auto;
                .el-form-item__label {
                    color: white !important;
                }
            }
        }
    }
</style>