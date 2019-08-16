<template>
    <div class="personalSettings">
        <el-form ref="form" :model="form" :rules="rules" label-width="180px" style="margin-top:20px;">
            
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="form.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="passWord">
                <el-input v-model="form.passWord" type="password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import api from '@/api'
export default {
    name:'userHome',
    data(){
        return {
            form:{},
            rules:{
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                passWord: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
               
            }
        }
    },
    computed:{
    },
    components:{
    },
    mounted(){
      
    },
    methods:{
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.instance({
                        method:'post',
                        url:'/user/resertPassword',
                        data:this.form
                    })
                    .then((res)=>{
                        if(res && res.code==200){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                        this.signOut();
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        signOut() {
            api.instance({
                method:'get',
                url:`/user/signOut`
            })
            .then((res)=>{
                if(res && res.code==200){

                    window.localStorage.clear();
                    location.href = '/login'
                }
            })
        },
    }
}
</script>
<style lang="less">
.setup{
    .setup_left_item{
        padding:10px 20px;
        border-radius:5px;
        margin-bottom:10px;
        cursor:pointer;
        &:hover{
            background-color: #ddd;
        }
        &.actibe{
            background-color: #ddd;
        }
    }
}
</style>
