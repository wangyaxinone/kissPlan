<template>
    <div class="userHomeTab">
        <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  >
            <mu-tab>文章</mu-tab>
            <mu-tab>关注</mu-tab>
            <mu-tab>粉丝</mu-tab>
        </mu-tabs>
        <div class="p20" v-if="active1 === 0">
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <contentItem class="mt20 bb1 pb10" v-for="(item,idx) in (_newsList || [])" :key="idx" :data="item"></contentItem>
            </mu-load-more>
        </div>
        <div class="p20" v-if="active1 === 1">
           1
        </div>
        <div class="p20" v-if="active1 === 2">
           2    
        </div>
        
    </div>
</template>
<script>
import contentItem from "@/components/contentItem/index.vue"
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('userHome');
export default {
    name:'userHomeTab',
    data () {
        return {
            active1: 0,
            refreshing: false,
            loading: false,
            pageNo:1,
           
        };
    },
    mounted(){
         
        this._getMyNewsList({
            pageNo:'1',
            pageSize:10,
            userId:this.$route.params.id
        })
    },
    computed:{
         ...mapState(['_userDetail','_newsList','_newItemObj'])
    },
    components:{
        contentItem
    },
    methods:{
        ...mapActions(['_getMyNewsList','_getUserHome']),
        load() {
            if(this._newsList.length < this._newItemObj.total && !this.loading){
                this.loading = true;
                this.pageNo = this.pageNo+1;
                this._getMyNewsList({
                    pageNo:this.pageNo,
                    pageSize:this.pSize,
                    userId:this.$route.params.id
                })
                .then(()=>{
                    this.loading = false;
                })
            }
        },
        refresh() {
            this.refreshing = true;
            this.pageNo = 1;
            this._getMyNewsList({
                pageNo:1,
                pageSize:this.pSize,
                userId:this.$route.params.id
            })
            .then(()=>{
                this.refreshing = false;
            })
        }
    }
}
</script>
<style lang="less">
    
</style>
