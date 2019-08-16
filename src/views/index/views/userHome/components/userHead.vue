<template>
    <div class="userHead">
        <div class="pic">
            <mu-avatar size="60" style="vertical-align: middle;margin-right:5px;cursor:pointer;"  ref="button">
                <img :src="data.avatarImg">
            </mu-avatar>
        </div>
        <div class="userHead_detail">
            <mu-row gutter>
                <mu-col span="6" sm="6" md="6">
                    <h1 class="userHead_detail_name">{{data.name || data.userName}}</h1>
                    <div>
                        
                    </div>
                </mu-col>
                <mu-col span="6" sm="6" md="6" v-if="!$store.state.user || ($route.params.id!=$store.state.user._id)">
                    <div class="btns tar" >
                        <!-- <mu-button round color="success">发简信</mu-button> -->
                        <mu-button v-if="!data.isFollow" round color="success" @click="followHandle($route.params.id)">关注</mu-button>
                        <mu-button v-else round color="secondary"  @click="unFollowHandle($route.params.id)">取消关注</mu-button>
                    </div>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>
<script>
export default {
    name:'userHead',
    data(){
        return {

        }
    },
    computed:{
        showBtns() {
            
        }
    },
    props:['data'],
    methods:{
        followHandle(_id) {
            this.$store.dispatch('_follow',{_id:_id})
            .then((res)=>{
                this.$emit('ok')
                this.$message({
                    message: '关注成功',
                    type: 'success'
                });
            })
        },
        unFollowHandle(_id) {
            this.$store.dispatch('_unFollow',{_id:_id})
            .then((res)=>{
                this.$emit('ok')
                this.$message({
                    message: '取消成功',
                    type: 'success'
                });
            })
        }
    }
}
</script>
<style lang="less">
    .userHead{
        border-bottom:1px solid #ddd;
        padding-bottom:10px;
        .pic{
            width:60px;
            height:60px;
            float: left;
            padding-top:20px;
        }
        .userHead_detail{
            margin-left:70px;
            padding:5px 20px;
            .userHead_detail_name{
            }
            .btns{
                margin-top:18px;
            }
        }
    }
</style>
