<template>
    <div class="userHomeTab">
        <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  >
            <mu-tab>文章</mu-tab>
            <mu-tab>关注</mu-tab>
            <mu-tab>粉丝</mu-tab>
        </mu-tabs>
        <div class="p20" v-if="active1 === 0">
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <contentItem class="mt20 bb1 pb10" v-for="(item,idx) in (_newsList || [])" :key="idx" :data="item" edit></contentItem>
            </mu-load-more>
        </div>
        <div class="p20" v-if="active1 === 1">
            <mu-list>
                <mu-list-item avatar v-for="(item,idx) in source.records || []" :key="idx">
                <mu-list-item-action avatar>
                <mu-avatar>
                    <img :src="item.target && item.target.avatarImg">
                </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                <mu-list-item-title>{{item.target && (item.target.name || item.target.userName)}} <span style="margin-left:10px;color:#888;font-size:12px;">{{ item.meta.creatAt | formatDate("yyyy-MM-dd hh:mm:ss")}} </span>   </mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                    <mu-button v-if="$store.state.user && ($route.params.id==$store.state.user._id)" round color="secondary" small  @click="unFollowHandle(item.target.id)">取消关注</mu-button>
                </mu-list-item-action>
            </mu-list-item>
            </mu-list>
            <mu-flex justify-content="center" v-if="source.total">
                <mu-pagination raised circle :total="source.total" :current.sync="source.current/1" @change="changeSource"></mu-pagination>
            </mu-flex>
        </div>
        <div class="p20" v-if="active1 === 2">
           <mu-list>
                <mu-list-item avatar v-for="(item,idx) in target.records || []" :key="idx">
                    <mu-list-item-action avatar>
                    <mu-avatar>
                        <img :src="item.source && item.source.avatarImg">
                    </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                    <mu-list-item-title>{{item.source && (item.source.name || item.source.userName)}}</mu-list-item-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        {{item.meta.creatAt | formatDate("yyyy-MM-dd hh:mm:ss")}}
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>  
            <mu-flex justify-content="center" v-if="target.total">
                <mu-pagination raised circle :total="target.total" :current.sync="target.current/1" @change="changeTarget"></mu-pagination> 
            </mu-flex>
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
            source:{},
            target:{}

        };
    },
    mounted(){
        this.getAll()
        
    },
    computed:{
         ...mapState(['_userDetail','_newsList','_newItemObj'])
    },
    components:{
        contentItem
    },
    methods:{
        ...mapActions(['_getMyNewsList','_getUserHome','_getFollowSource','_getFollowTarget']),
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
        },
        unFollowHandle(_id) {
            this.$store.dispatch('_unFollow',{_id:_id})
            .then((res)=>{
                this.getAll();
                this.$emit('ok')
                this.$message({
                    message: '取消成功',
                    type: 'success'
                });
            })
        },
        getAll() {
            this._getMyNewsList({
                pageNo:'1',
                pageSize:10,
                userId:this.$route.params.id
            })

            this._getFollowSource({
                pageNo:'1',
                pageSize:10,
                source:this.$route.params.id
            })
            .then((res)=>{
                if(res && res.code==200){
                    this.source = res.data;
                }
            })

            this._getFollowTarget({
                pageNo:'1',
                pageSize:10,
                target:this.$route.params.id
            })
            .then((res)=>{
                if(res && res.code==200){
                    this.target = res.data;
                }
            })
        },
        changeSource() {
            this._getFollowSource({
                pageNo:this.source.current/1+1,
                pageSize:10,
                source:this.$route.params.id
            })
            .then((res)=>{
                if(res && res.code==200){
                    this.source = res.data;
                }
            })
        },
        changeTarget() {
            this._getFollowTarget({
                pageNo:this.target.current/1+1,
                pageSize:10,
                target:this.$route.params.id
            })
            .then((res)=>{
                if(res && res.code==200){
                    this.target = res.data;
                }
            })
        }
    }
}
</script>
<style lang="less">
    
</style>
