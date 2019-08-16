import api from '@/api'
var Qs = require('qs');
export default {
    name:'news',
    namespaced:true,
    state:() => ({
        news:{},
        comment : {},
    }),
    actions : {
        getNews({commit},data){
            return api.instance({
                method:'get',
                url:`admin/getNews?_id=${data._id}`
            })
            .then((res)=>{
                if(res.code==200){
                    if(res.data){
                        commit('setNews',res.data)
                    }else{
                        commit('setNews',{})
                    }
                }
                return res
            })
        },
        getNewsTwo({commit},data){
            return api.instance({
                method:'get',
                url:`admin/getNewsTwo?_id=${data._id}`
            })
            .then((res)=>{
                if(res.code==200){
                    if(res.data){
                        commit('setNews',res.data)
                    }else{
                        commit('setNews',{})
                    }
                }
                return res
            })
        },
        _getCommentReply({commit},data) {
            return api.instance({
                method:'get',
                url:`/admin/commentReply?_id=${data._id}&index=${data.index}`
            })
        },
        getComment({commit},data) {
            if(!data.sortType){
                data.sortType = 'asc'
            }
            
            return api.instance({
                method:'get',
                url:`/admin/comment?article=${data._id}&current=${data.pageNo}&sortType=${data.sortType}`
            })
            .then((res)=>{
                if(res.code==200){
                    if(res.data){
                        commit('getComment',res.data)
                    }else{
                        commit('getComment',{})
                    }
                }
                return res
            })
        },
        articleLike({commit},data) {
            return api.instance({
                method:'post',
                url:`/article/like`,
                data:data
            })
            .then((res)=>{
                if(res.status==200){
                   
                }
                return res
            })
        },
        //评论
        _comment({commit,dispatch},data) {
            return api.instance({
                method:'post',
                url:`/admin/comment`,
                data:data
            })
            
        },
        //回复评论
        _commentReply({commit,dispatch},data) {
            return api.instance({
                method:'post',
                url:`/admin/commentReply`,
                data:data
            })
            
        },
        //点赞
        _articleLike({commit,dispatch},data){
            return api.instance({
                method:'get',
                url:`/admin/articleThumbsUp?_id=${data._id}`,
            })
        },
        //评论点赞
        _commentThumbsUp({commit,dispatch},data) {
            return api.instance({
                method:'get',
                url:`/admin/commentThumbsUp?_id=${data._id}`,
            })
        }
    },
    mutations:{
        setNews(state,data) {
            state.news = data;
        },
        getComment(state,data) {
            state.comment = data;
        },
        _updateCommentReply(state,data){
            state.comment.records[data.idx].childCommentList= state.comment.records[data.idx].childCommentList.concat(data.data)
            console.log(state.comment)

        }
    }
}