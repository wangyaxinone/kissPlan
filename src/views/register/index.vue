<template>
    <div class="login-container">
        <div class="logo" @click="goHome">KissPlan</div>
        <div class="login_box">
            <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
                <mu-tab>登陆</mu-tab>
                <mu-tab>注册</mu-tab>
            </mu-tabs>
            <mu-tooltip :content="userMessage" placement="top" :open="userRepeat">
                <div class="login_input_box mt20">
                    <mu-icon class="toggle-icon iconfont icon" size="25" value=":icon-addressbook"></mu-icon>
                    <input  class="input" id="userName" placeholder="请输入账号" v-model="validateForm.userName" @input="userNameInput" type="text" autocomplete="off">
                
                        <i class="iconfont icon-gantanhao passWordErr" :class="[userErr?'icon-duigoutianchong- colorG':'icon-gantanhao colorR']"></i>
                    
                </div>
            </mu-tooltip>
            <mu-tooltip content="不能为空" placement="top">
                <div class="login_input_box">
                    <mu-icon class="toggle-icon iconfont icon" size="25" value=":icon-lock"></mu-icon>
                    <input autocomplete="new-passWord" class="input"  id="passWord" placeholder="密码长度为6-12之间，只能是字母、数字和下划线" v-model="validateForm.passWord" @input="passWordInput" type="passWord">
                    <i class="iconfont icon-gantanhao passWordErr" :class="[passWordErr?'icon-duigoutianchong- colorG':'icon-gantanhao colorR']"></i>
                </div>
           </mu-tooltip>
           <mu-tooltip :content="phoneMessage" placement="top">
                <div class="login_input_box">
                    <mu-icon class="toggle-icon iconfont icon" size="25" value=":icon-lock"></mu-icon>
                    <input class="input"  id="phone" placeholder="请输入手机号码" v-model="validateForm.phone" @input="phoneInput" type="phone" autocomplete="off">
                    <i class="iconfont icon-gantanhao passWordErr" :class="[phoneErr?'icon-duigoutianchong- colorG':'icon-gantanhao colorR']"></i>
                </div>
           </mu-tooltip>
            <mu-row gutter class="btn_box">
                <mu-col span="24">
                    <mu-button color="success" class="login_button" :disabled="(userErr && passWordErr && phoneErr)?false:true" @click="registerC">注册</mu-button>
                </mu-col>
            </mu-row >
        </div>
    </div>
</template>
<script>
import axios from 'axios'
var Qs = require('qs');
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('register');
import Cookies from 'js-cookie'
export default {
    name:'login',
    data:function(){
        return {
            userRepeat:false,
            active:1,
            userMessage:'不能为空',
            phoneMessage:'不能为空',
            userErr:false,
            passWordErr:false,
            phoneErr:false,
            validateForm:{
                userName:'',
                passWord:'',
                phone:'',
            }
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        ...mapActions(['userEmilRepeat','_register','userPhoneRepeat']),
        registerC() {
            if(this.userErr && this.passWordErr && this.phoneErr){
                this._register(this.validateForm)
                .then((res)=>{
                    if(res && res.code==200){
                        this.$message({
                            message: '注册成功',
                            showClose: true,
                            type: 'success'
                        });
                        this.$store.commit('setUser',res.data)
                        window.localStorage.setItem('user',JSON.stringify(res.data))
                        window.localStorage.setItem('token',res.data.token)
                        Cookies.set('x-access-token', res.data.token);
                        setTimeout(()=>{
                            this.$store.commit('setUser')
                            this.$store.commit('setKiss_plan_token')
                            this.$router.push('/index')
                            // location.href='/index'
                        },1300)
                    }
                })
            }else{
                this.$message({
                    message: '格式有误，或不能为空',
                    showClose: true,
                    type: 'warning'
                });
            }
        },
        goHome() {
            this.$router.push('/')
        },
        userNameInput() {
            var userName = this.validateForm.userName;
            if(userName.trim()){
                this.userEmilRepeat({
                    userName:userName,
                })
                .then((res)=>{
                    if(res && res.code=='200'){
                        this.userErr = true;
                        this.userRepeat = true;
                        this.userMessage = '账号可以注册';
                    }else{
                        this.userErr = false;
                        this.userRepeat = true;
                        this.userMessage = '账号重复';
                    }
                })
            }else{
                this.userErr = false;
                this.userRepeat = false;
                this.userMessage = '不能为空';
            }
        },
        passWordInput() {
            var passWord = this.validateForm.passWord; 
            var reg = /^[\w]{6,12}$/;
            if(new RegExp(reg).test(passWord)){
                this.passWordErr = true;
            }else{
                this.passWordErr = false;
            }
        },
        phoneInput() {
            var phone = this.validateForm.phone; 
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(new RegExp(reg).test(phone)){
                
                this.userPhoneRepeat({
                    phone:this.validateForm.phone
                })
                .then((res)=>{
                    if(res && res.code=='200'){
                        this.phoneErr = true;
                        this.phoneMessage="手机号码可以注册"
                    }else{
                        this.phoneErr = false;
                        this.phoneMessage="手机号码已存在"
                    }
                })
            }else{
                this.phoneErr = false;
                this.phoneMessage="不能为空"
            }
        }
    },
    watch:{
        active(newValue) {
            
            if(newValue==0){
                this.$router.push('/login')
            }else{
                this.$router.push('/register')
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login-container{
        .logo{
            position: fixed;
            top:5%;
            left:5%;
            line-height: 60px;
            height: 60px;
            font-size: 25px;
            cursor: pointer;
            color: #ea6f5a;
            font-weight: bold;
        }
        .login_box{
            background-color: #fff;
            padding:10px 30px 30px 30px;
            border-radius: 5px;
            box-shadow: 0px 3px 13px #666;
            width:350px;
            position: fixed;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .login_title{
                text-align: center;
                font-weight: bold;
                padding:20px;
                color:#333;
                font-size: 20px;
            }
            .login_input_box{
                position: relative;
                
                .icon{
                    position: absolute;
                    top:2px;
                    left:8px;
                }
                .passWordErr{
                    position: absolute;
                    right:15px;
                    top:8px;
                   
                }
                .input{
                    width: 100%;
                    height:40px;
                    padding:5px 5px 5px 35px;
                    margin-bottom:15px;
                    outline: none;
                    border-radius: 5px;
                    border:1px solid #ddd;
                    padding-right:40px;
                    box-sizing: border-box;
                }
            }
            .btn_box{
                margin-left: 0px;
                .login_button{
                    width:100%;
                }
            }
            
        }
        @media (max-width: 768px){
            .login_box{
                width:100vw;
                border-radius: 0px;
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                transform: translate(0%,0%);
                box-shadow: none;
            }
        }
    }
</style>

