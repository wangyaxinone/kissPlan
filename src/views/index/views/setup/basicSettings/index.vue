<template>
    <div class="basicSettings">
        <div style="text-align:center;">
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl+'/admin/uploadFile'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.avatarImg" :src="form.avatarImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;">
            
            <el-form-item label="用户昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择" style="width:100%;">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.dictValue"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {config} from "@/api"
import api from '@/api'
export default {
    name:'basicSettings',
    data(){
        return {
            uploadUrl:config.client.baseURL,
            form:{
                avatarImg:this.$store.state.user && this.$store.state.user.avatarImg,
                name:this.$store.state.user && this.$store.state.user.name,
                email:this.$store.state.user && this.$store.state.user.email,
                phone:this.$store.state.user && this.$store.state.user.phone,
                sex:this.$store.state.user && this.$store.state.user.sex,
                _id:this.$store.state.user && this.$store.state.user._id,
            },
            options:[]
        }
    },
    computed:{
    },
    components:{
    },
    mounted(){
        this.getSex();
    },
    methods:{
        onSubmit(){
            return api.instance({
                method:'put',
                url:'/user/putUser',
                data:this.form
            })
            .then((res)=>{
                if(res && res.code==200){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    debugger
                    var user = JSON.parse(window.localStorage.getItem('user'));
                    user.avatarImg = this.form.avatarImg;
                    user.name = this.form.name;
                    user.email = this.form.email;
                    user.phone = this.form.phone;
                    user.sex = this.form.sex;
                    window.localStorage.setItem('user',JSON.stringify(user));
                    this.$store.commit('setUser')
                }else{
                    this.$message({
                        message: '修改失败',
                        type: 'warning'
                    });
                }
            })
        },
        getSex() {
            return api.instance({
                method:'get',
                url:'/admin/getDict?code=sex',
                hasLoading:false,
            })
            .then((res)=>{
                if(res.code==200){
                    this.options = res.data;
                }
            })
            
        },
        handleAvatarSuccess(res, file) {
            this.form.avatarImg = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>
<style lang="less">
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 100px;
        width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
