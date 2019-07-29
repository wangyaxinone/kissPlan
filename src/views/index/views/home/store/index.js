import api from '@/api'
export default {
    name:'home',
    namespaced:true,
    state:() => ({
        imgs : [],
        newItem:[],
        newItemObj:{}
    }),
    actions : {
        getCarousel({commit},n){
            return api.instance({
                method:'get',
                url:'/admin/getCarousel',
                hasLoading:false,
            })
            .then((res)=>{
                if(res.code==200){
                    console.log(res.data);
                    if(res.data ){
                        commit('setCarousel',res.data)
                    }else{
                        commit('setCarousel',[])
                    }
                }
                return res
            })
            .catch((err)=>{
                console.log(res.data);
            })
        },
        getNewItem({commit},data) {
            return api.instance({
                method:'get',
                hasLoading:false,
                url:`/article?pageNo=${data.pageNo}&pageSize=${data.pageSize}`
            })
            .then((res)=>{
               
                if(res.status==200){
                    if(res.data){
                        commit('setNewItem',res.data)
                    }else{
                        commit('setNewItem',[])
                    }
                }
                return res
            })
        }
    },
    mutations:{
        setCarousel: (state,data) => {
            console.log(data)
            state.imgs=data 
        },
        setNewItem:(state,data)=>{
            state.newItemObj = data;
            if(data.pageNo>1){
                state.newItem = state.newItem.concat(data.list)
            }else{
                state.newItem = data.list;
            }
           
        }
    }
}