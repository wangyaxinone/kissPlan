<template>
    <div class="userHome box mt20">
        <mu-row gutter>
            <mu-col span="12" sm="12" md="8">
                <userHead :data="_userDetail" @ok="ok"></userHead>
                <headDetail :data="_userDetail"></headDetail>
                <userHomeTab class="mt10" :newList="_newsList" ref="userHomeTab"  @ok="ok"></userHomeTab>
            </mu-col>
            <mu-col class="phone_hide" span="12" sm="12" md="4">
                <Advertisement class="mt20"></Advertisement>
                <author  class="mt20"></author>
            </mu-col>
        </mu-row>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('userHome');
import userHead from "./components/userHead.vue"
import headDetail from "./components/headDetail.vue"
import userHomeTab from "./components/userHomeTab.vue"

import Advertisement from "@/components/Advertisement/index.vue"
import download from "@/views/index/views/home/components/download.vue"
import author from "@/views/index/views/home/components/author.vue"
export default {
    name:'userHome',
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['_userDetail','_newsList','_newItemObj'])
    },
    components:{
        userHead,
        headDetail,
        userHomeTab,
        download,
        Advertisement,
        author
    },
    mounted(){
        this.$store.dispatch('userHome/_getUserHome',{
            id:this.$route.params.id
        });
       
    },
    methods:{
        ...mapActions(['_getMyNewsList','_getUserHome']),
        ok(){
            this.$store.dispatch('userHome/_getUserHome',{
                id:this.$route.params.id
            });
            this.$refs['userHomeTab'].getAll()
        }
    }
}
</script>
<style lang="less">
.userHome{
    
}
</style>
