<template>
    <div class="newsAutor">
        <div class="mt20 newsTargetDetail">
            <mu-avatar size="45" style="vertical-align: middle;margin-right:5px;cursor:pointer;float:left;">
                <img :src="data.user && data.user.avatarImg"  @click="$router.push(`/userHome/${data._id}`)">
            </mu-avatar>
            <div style="margin-left:50px;height:50px;">
                <div style="padding:0 10px;">
                    <span class="name " @click="$router.push(`/userHome/${data._id}`)" style="cursor:pointer;">{{data.user && (data.user.name || data.user.userName)}}</span>
                    <mu-tooltip content="更新达人">
                        <i class="iconfont icon-bi"></i>
                    </mu-tooltip>
                    
                </div>
                <div style="padding:0 10px;" class="new-t-t-y-p-x">
                    <span>{{(data.meta && data.meta.updateAt) | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                    <span>字数 {{data.content&& data.content.length | MoneyFormat(true)}}</span>
                    <span>阅读 {{(data.redNum || 0) | MoneyFormat(true)}}</span>
                    <span>评论 {{(comment.total || 0) | MoneyFormat(true)}}</span>
                    <span>喜欢 {{(data.articleThumbsUp.length || 0 )| MoneyFormat(true)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'newsAutor',
    data(){
        return {}
    },
    props:['data','comment'],
}
</script>
<style lang="less">
    .newsAutor{
        .newsTargetDetail{
            .name{
                font-size: 16px;
                margin-right:10px;
            }
            .new-t-t-y-p-x{
                span{
                    font-size: 12px;
                    color:#aaa;
                    margin-right:5px; 
                }
            }
        }
    }
</style>
