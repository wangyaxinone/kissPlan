<template>
    <div class="asideMenu">
        <el-menu default-active="1" unique-opened class="el-menu-vertical-demo">
            <el-menu-item :index="idx+1+''" v-for="(item,idx) in _writeArticleMenuType" :key="idx" @mouseenter.native="mouseenter(idx)" @mouseleave.native="mouseleave" @click.native="clickNative(idx)">
                <i class="el-icon-document" v-if="hoverIdx!==idx"></i>
                <i class="el-icon-edit"  @click="openSimpleDialog(idx)" v-else></i>
                <span slot="title" style="max-width:179px;display:inline-block;">
                    {{item.title}}
                   
                </span>
                 
            </el-menu-item>
            
        </el-menu>
        <el-dialog :title="dialogTitle" width="760" :visible.sync="openSimple">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="文章类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择活动区域">
                        <el-option :label="item.dictValue" :value="item._id" v-for="(item,index) in _articleType" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="仅自己可见">
                    <el-switch v-model="form.self"></el-switch>
                </el-form-item>
                <div class="tac">
                     <mu-button slot="actions" flat color="default" @click="closeSimpleDialog">取消</mu-button>
                    <mu-button slot="actions" flat color="primary" @click="OkSimpleDialog">确定</mu-button>
                </div>
            
            </el-form>
            
        </el-dialog>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('writeArticle');
export default {
    name:'asideMenu',
    data(){
        return {
            hoverIdx:-1,
            activeIdx:-1,
            openSimple:false,
            form:{
                title:'',
                type:'',
                self:false
            },
            dialogTitle:'修改文章详情',
            nowData:{},
            rules: {
                title:[
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                ],
                type:[
                    { required: true, message: '请输入文章类型', trigger: 'blur' },
                ]
            }
        }
    },
    computed:{
        ...mapState(['_writeArticleMenuType','_articleType']),
        
    },
    mounted(){
        var that = this;
        this.$eventBus.off('dialog')
        this.$eventBus.on('dialog',(data)=>{
            if(data.type==='add'){
                that.dialogTitle = '添加文章';
                this.form = {};
                that.openSimple = !that.openSimple;
            }
        })
       
    },
    methods:{
        ...mapMutations(['_checkNewsItem','_setNewsItem']),
        ...mapActions(['_getArticleType']),
        clickNative(idx) {
            this._checkNewsItem(idx);
        },
        mouseenter(idx) {
            this.hoverIdx = idx;
        },
        mouseleave() {
            this.hoverIdx = -1;
        },
        openSimpleDialog (idx) {
            var that = this;
            this.activeIdx = idx;
            this.dialogTitle = '修改文章详情';
            this.openSimple = true;
            if(this._writeArticleMenuType && this._writeArticleMenuType.length){
                this._writeArticleMenuType.forEach((item)=>{
                    if(item.active){
                        that.nowData = item;
                    }
                })
            }
            this.form = that.nowData
             this._getArticleType()
            .then((data)=>{
                that.form.type = data[0]._id;
            })
        },
        OkSimpleDialog() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    debugger
                    var data = {
                        idx:this.activeIdx,
                    };
                    $.extend(true,data,this.form)
                    this._setNewsItem(data)
                    this.openSimple = false;
                } else {
                    return false;
                }
            });
            
        },
        closeSimpleDialog () {
            this.$refs['form'].resetFields();
            this.openSimple = false;
        },
        //设置新闻详情
        setNewsDetail() {
            this.openSimple = true;
        }
    }
}
</script>
<style lang="less">
    .asideMenu{

    }
</style>
