import api from '@/api'
var Qs = require('qs')
export default {
    name:'login',
    namespaced:true,
    state:() => ({
        count : 1
    }),
    actions : {
        userPhoneRepeat({commit},data){
            return api.instance({
                method:'post',
                url:'/user/hasPhone',
                hasLoading:false,
                data:{
                    phone:data.phone,
                }
            })
        },
        userEmilRepeat({commit},data) {
            return api.instance({
                method:'post',
                url:'/user/hasUserName',
                hasLoading:false,
                data:{
                    userName:data.userName,
                }
            })
        },
        _register({commit},data) {
            return api.instance({
                method:'post',
                url:'/user/signUp',
                data:{
                    userName:data.userName,
                    passWord:data.passWord,
                    phone:data.phone,
                }
            })
        }
    },
    mutations:{
        m_setCont: (state,n) => { state.count=n }
    }
}