import axios from 'axios'
import Vue from "vue"
var hasLoading,hasMessage;
export function createAPI ({client}){
    var instance = axios.create({
        baseURL: client.baseURL,
        timeout: client.timeout,
        withCredentials:true,
        hasMessage:client.hasMessage,
        hasLoading:client.hasLoading,
    });
    instance.interceptors.request.use(function (config) {
        var token = window.localStorage.getItem('token');
        if(token){
            config.headers['blade-auth'] = token;
        }
        if(config.hasLoading){
            hasLoading = Vue.prototype.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        if(config.hasMessage){
            hasMessage = config.hasMessage
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
    });
    
    // 添加响应拦截器
    instance.interceptors.response.use(
        function (response) {
            if(hasLoading){
                hasLoading.close();
            }
            if (response.data.code >= 200 && response.data.code < 400) {
                return response.data
            }
            if (response.data.code == 401) {
                setTimeout(()=>{
                    window.localStorage.clear();
                    location.href="/login"
                },1000)
            }
            if(hasMessage){
                Vue.prototype.$message({
                    message: response.data.msg,
                    showClose: true,
                    type: 'error'
                });
            }
            return Promise.reject(response)
        }, 
        function (error) {
            if(hasLoading){
                hasLoading.close();
            }
            Vue.prototype.$message({
                message: error.response&& error.response.data&& error.response.data.msg,
                showClose: true,
                type: 'warning'
            });
            return Promise.reject(error.response && error.response.data);
        }
    );
    return {
        instance (cfg){
            return new Promise((resolve,reject) => {
                instance(cfg).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
        
    }
}