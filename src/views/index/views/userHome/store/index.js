import api from '@/api'
var Qs = require('qs');
export default {
    name:'userHome',
    namespaced:true,
    state:() => ({
        _userDetail:{},
        _newsList:[],
        _newItemObj:{}
    }),
    actions : {
        _getUserHome({commit},data){
            return api.instance({
                method:'get',
                url:`/user/userHome?_id=${data.id}`
            })
            .then((res)=>{
                console.log(res.data);
                if(res.code==200){
                    if(res.data){
                        commit('_setUserDetail',res.data)
                    }else{
                        commit('_setUserDetail',{})
                    }
                }
                return res
            })
        },
        _getMyNewsList({commit},data) {
            return api.instance({
                method:'get',
                url:`/user/article?current=${data.pageNo}&size=${data.pageSize}&user=${data.userId}`
            })
            .then((res)=>{
                if(res.code==200){
                    if(res.data){
                        commit('_set_newsList',res.data)
                    }else{
                        commit('_set_newsList',{})
                    }
                }
                return res
            })
        },
        _getFollowSource({commit},data) {
            return api.instance({
                method:'get',
                url:`/admin/follow?current=${data.pageNo}&size=${data.pageSize}&source=${data.source}`
            })
            
        },
        _getFollowTarget({commit},data) {
            return api.instance({
                method:'get',
                url:`/admin/follow?current=${data.pageNo}&size=${data.pageSize}&target=${data.target}`
            })
            
        }
    },
    mutations:{
        _setUserDetail(state,data) {
            state._userDetail = data;
        },
        _set_newsList(state,data) {
            state._newItemObj = data;
            if(data.current>1){
                state._newsList = state._newsList.concat(data.records)
            }else{
                state._newsList = data.records;
            }
        }
    }
}