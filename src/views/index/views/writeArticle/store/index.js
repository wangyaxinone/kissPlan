import api from '@/api'
const Qs = require('qs')
export default {
    name:'writeArticle',
    namespaced:true,
    state:{
        _editorType:'富文本编辑器',
        _mavonEditorQP:false,//markdown编辑器全屏
        _articleType:[],
        _writeArticleMenuType:[
            {
                title:'默认菜单',
                content:'',
                type:0,
                self:false,
                mdContent:'',
                active:true,
            },
        ]
    },
    actions : {
        articleSave({commit,state},config) {
            var data = state._writeArticleMenuType[0];
            return api.instance({
                method:'post',
                url:'/admin/Articles',
                data:data
            })
            .then((res)=>{
                if(res.status==200){
                   
                }
                return res
            })
        },
        _getArticleType({commit}){
            return api.instance({
                method:'get',
                url:'/admin/getDict?code=articleType',
            })
            .then((res)=>{
                commit('_setArticleType',res.data)
                return res.data
            })
        }
    },
    mutations:{
        _setArticleType(state,data){
            state._articleType = data;
        },
        //修改文章
        _setNewsItem(state,data) {
            var arr = [];
            $.extend(true,arr,state._writeArticleMenuType) 
            arr[data.idx]= data
            state._writeArticleMenuType = arr;
        },
        //设置文章选中
        _checkNewsItem(state,idx) {
            var arr = state._writeArticleMenuType;
            if(arr && arr.length>0){
                arr.forEach((item)=>{
                    item.active = false;
                })
            }
            arr[idx].active = true;
            state._writeArticleMenuType = arr;
        },
        _addWriteArticleMenuType(state,type) {
            state._writeArticleMenuType.push({
                name:'新建文章',
            })
        },
        _setEditorType(state,type){
            state._editorType = type;
        },
        _setQPBoll(state,type) {
            state._mavonEditorQP = !state._mavonEditorQP;
        },
        _writeText(state,data) {
            state._writeArticleMenuType.forEach((item)=>{
                if(item.active){
                    item.content = data.content=='<p><br></p>'?'':data.content;
                    item.mdContent =  data.mdContent;
                    item.articleType =  data.articleType;
                }
            })
        }
    }
}