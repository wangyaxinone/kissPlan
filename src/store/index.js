import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import api from '@/api'
var Qs = require('qs')
Vue.use(Vuex);
export function createStore(){
    return new Vuex.Store({
        state:{
            user:null,
            token:'',
            theme:'#ea6f5a',
            pageSize:10,
        },
        mutations:{
            setUser (state) {
                var user = window.localStorage.getItem('user')
                if(user){
                    user = JSON.parse(user)
                }
                state.user = user;
            },
            setCurrentUser(state,user) {
                state.user = state.user|| {};
                state.user.user = user;
            },
            setKiss_plan_token(state,kiss_plan_token) {
                state.token = window.localStorage.getItem('token');
            }
        },
        actions:{
            logout({commit},data) {
                return api.instance({
                    method:'get',
                    url:'/logout',
                })
            },
            _follow({commit},data) {
                return api.instance({
                    method:'post',
                    url:'/admin/follow',
                    hasLoading:false,
                    data:{
                        target:data._id,
                    }
                })
            },
        },
        modules
    })
}