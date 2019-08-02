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
                    if(res.data ){
                        commit('setCarousel',res.data)
                    }else{
                        commit('setCarousel',[])
                    }
                }
                return res
            })
            .catch((err)=>{
            })
        },
        getNewItem({commit},data) {
            return api.instance({
                method:'get',
                hasLoading:false,
                url:`admin/Articles?current=${data.pageNo}&size=${data.pageSize}`
            })
            .then((res)=>{
                if(res.code==200){
                    if(res.data && res.data.records && res.data.records.length){
                        commit('setNewItem',res.data)
                    }else{
                        commit('setNewItem',[])
                    }
                }
                return res
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    mutations:{
        setCarousel: (state,data) => {
            state.imgs=data 
        },
        setNewItem:(state,data)=>{
            state.newItemObj = data;
            if(data.current>1){
                state.newItem = state.newItem.concat(data.records)
            }else{
                state.newItem = data.records;
            }
           
        }
    }
}