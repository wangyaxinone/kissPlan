<template>
    <div class="comment">
        <div>
            <mu-button style="float:right;" flat :color="active=='asc'?'primary':''" @click="setActive('asc')">按时间正序</mu-button>
            <mu-button style="float:right;" flat :color="active=='desc'?'primary':''" @click="setActive('desc')">按时间倒序</mu-button>
            <h2 class="comment-count">{{data.total}}条评论</h2>
            <div class="comment-box mt10">
                <div v-for="(item,idx) in data.records" :key="'news-'+idx" class="item">
                    <div class="clearfix head">
                        <mu-avatar size="45" style="vertical-align: middle;margin-right:5px;cursor:pointer;float:left;">
                            <img :src="item.from.avatarImg"   @click="$router.push(`/userHome/${item.from._id}`)">
                        </mu-avatar>
                        <div  style="margin-left:50px;">
                            <p class="nickname" @click="$router.push(`/userHome/${item.from._id}`)" style="cursor:pointer">{{item.from.name || item.from.userName}}</p>
                            <p class="floor">{{idx+1}}楼 {{item.meta.creatAt | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
                        </div>
                    </div>
                    <div class="compiled_content" style="padding:10px 0;font-size:16px;word-break: break-word!important;line-height: 1.5;">
                        {{item.comment}}
                    </div>
                    <div>
                        <span  @click="comment(idx,null,item,item)">
                            <mu-icon size="25" value=":icon-message" class="iconfont" style="vertical-align: middle;cursor:pointer;"></mu-icon>
                            <span style="cursor:pointer;">回复</span>
                        </span>
                        <span style="cursor:pointer;margin-left:10px;" @click="commentThumbsUp(item)"  :class="{active:item.isCurrentUserLiked}">
                            <i class="iconfont icon-shoucang_xiantiao" style="font-size:25px;vertical-align: middle;"></i>
                            {{item.commentThumbsUp.length}}
                        </span>
                    </div>
                    <pingLun  ref="pingLun" v-model="content"  @cancel="cancel" :hide_head="true" @ok="ok" v-if="parentIdx==idx && !childIdx && childIdx!==0"></pingLun>
                    <div class="child-content mt20">
                        <div v-for="(child,index) in item.childCommentList" :key="index" class="mt20 childItem">
                            <div class="child-content-text">
                                <span class="nickname" @click="$router.push(`/userHome/${child.from._id}`)" style="cursor:pointer">{{child.from.name || child.from.userName}}</span>:
                                <span class="nickname" @click="$router.push(`/userHome/${child.to._id}`)" style="cursor:pointer">@{{child.to.name || child.to.userName}}</span>:
                                <span v-html="child.commentReply"></span>
                            </div>
                             <div @click="comment(idx,index,child,item)">
                                <mu-icon size="20" value=":icon-message" class="iconfont" style="vertical-align: middle;cursor:pointer;"></mu-icon>
                                <span style="cursor:pointer;">回复</span>
                            </div>
                            <div class="child-content-time">{{child.meta.creatAt | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                            <pingLun ref="pingLun" v-model="content" @cancel="cancel" :hide_head="true" @ok="ok" v-if="parentIdx==idx && childIdx==index"></pingLun>
                        </div>
                        <div v-if="item.childCommentTotle>3 && item.childCommentTotle>item.childCommentList.length" @click="getCommentReply(item,idx)" style="text-align:center;padding:10px;color:#999;cursor:pointer;">
                            <span v-if="item.childCommentList.length<=3">展开{{item.childCommentTotle}}条回复</span>
                            <span v-else>展开更多回复</span>
                        </div>
                    </div>
                </div>
            </div>
            <mu-flex justify-content="center" v-if="data.total">
                <mu-pagination raised circle :total="data.total" :current.sync="current" @change="change"></mu-pagination>
            </mu-flex>
            <div v-else class=" noComment">
                暂无评论,您将成为第一个沙发呦！
            </div>
        </div>
    </div>
</template>
<script>
import pingLun from "@/components/pingLun/index.vue"
export default {
    name:'comment',
    data(){
        return {
            active:'asc',
            current:this.pageNo,
            parentIdx:null,
            childIdx:null,
            content:'',
            pid:undefined,
            toUser:undefined
        }
    },
    props:{
        data:{
            type:Object,
            default(){
                return {}
            }
        },
        pageNo:Number
    },
    components:{
        pingLun
    },
    methods:{
        change() {
            this.$emit('pageChange',this.current)
        },
        setActive(text) {
            this.active = text;
            this.$emit('sortType',text)
        },
        ok(data) {
            this.$emit('comment',{
                content:data.pingLun,
                pid:this.pid,
                toUser:this.toUser
            })
            
        },
        comment(parentIdx,childIdx,item,Pitem) {
            this.parentIdx = parentIdx;
            this.childIdx = childIdx;
            this.pid = Pitem._id;
            this.toUser = Pitem.from._id;
            this.content = ``;
        },
        cancel() {
            this.parentIdx = null;
            this.childIdx = null;
            this.$refs['pingLun'][0].setValue('');
        },
        getCommentReply(item,idx) {
            item.idx = idx;
            this.$emit('commentReply',item)
        },
        commentThumbsUp(item) {
            this.$emit('commentThumbsUp',item)
        }
    },
    watch:{
        pageNo(newValue){
            this.current = newValue;
        }
    }
}
</script>
<style lang="less">
    .comment{
        .comment-count{
            font-szie:16px;
            font-weight: bold;
        }
        .comment-box{
            .item{
                border-bottom:1px solid #ddd;
                margin-bottom:30px;
                .head{
                    .floor{
                        font-size: 12px;
                        color:#999;
                    }
                }
                .child-content{
                    border-left:2px solid #ddd;
                    padding-left:45px;
                    .childItem{
                        border-bottom:2px dotted #ddd;
                        padding-bottom:20px;
                        .child-content-text{
                            .nickname{
                                color:#ff4081;
                                margin-right:10px;
                            }
                        }
                        .child-content-time{
                            font-size: 12px;
                            color:#999;
                        }
                    }
                }
            }
        }
        .mu-pagination-item.mu-button.is-current{
            background-color: #ea6f5a;
        }
        .noComment{
            font-size:18px;
            color:#aaa;
        }
        .active{
            color:#ea6f5a;
        }
    }
</style>

