<template>
    <div class="register">
        <div class="container">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login">
                <el-form-item label="用户名:" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                    <el-input type="code" v-model="ruleForm.code" autocomplete="off" style="width:140px" placeholder="验证码已发送"></el-input>
                    <el-button @click="sendMsg" style="width:93px">{{statusMsg}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <span style="color:white">已有账号</span>
                    <nuxt-link to="/register/login">去登陆</nuxt-link>
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
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            console.log(value)
            const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            if (value === '') {
                callback(new Error('请输入您的邮箱'));
            } else {
                if (reg.test(value)) {
                callback()
                } else {
                callback(new Error('邮箱格式不正确'));
                }
                // callback();
            }
        };
        return {
            statusMsg : "发送验证码",
            error:'',
            ruleForm: {
                name:'',
                pass: '',
                checkPass: '',
                email:''
            },
            rules: {
                name: [
                    { validator: checkName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
      sendMsg: function() {
        const self = this;
        let namePass;
        let emailPass;
        if (self.timerid) {
            return false;
        }
        this.$refs["ruleForm"].validateField("name", valid => {
            namePass = valid;
        });
        self.statusMsg = "";
        if (namePass) {
            return false;
        }
        this.$refs["ruleForm"].validateField("email", valid => {
            emailPass = valid;
        });
        if (!namePass && !emailPass) {
            self.$axios
            .post("/bloguser/verify", {
                username: encodeURIComponent(self.ruleForm.name),
                email: self.ruleForm.email
            })
            .then(({ status, data }) => {
                if (status === 200 && data && data.code === 0) {
                let count = 60;
                self.statusMsg = `${count--}秒`;
                self.timerid = setInterval(function() {
                    self.statusMsg = `${count--}秒`;
                    if (count === 0) {
                        clearInterval(self.timerid);
                        self.statusMsg = '发送验证码'
                    }
                }, 1000);
                } else {
                self.statusMsg = data.msg;
                }
            });
        }
    },
    register: function() {
      let self = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.$axios
            .post("/bloguser/signup", {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pass).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = "/register/login";
                } else {
                  self.error = data.msg;
                  
                }
              } else {
                self.error = `服务器出错，错误码:${status}`;
                console.log(self.error)
              }
              setTimeout(function() {
                self.error = "";
              }, 1500);
            });
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