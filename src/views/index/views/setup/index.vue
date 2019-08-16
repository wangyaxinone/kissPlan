<template>
    <div class="setup box mt20" style="padding-top:40px;">
        <mu-row gutter>
            <mu-col span="4">
                <ul>
                    <li class="setup_left_item" v-for="(item,idx) in list" :key="idx" :class="{actibe:idx==activeIdx}" @click="clickHandle(item,idx)">{{item.label}}</li>
                </ul>
            </mu-col>
            <mu-col span="8">
                <router-view class="view"></router-view>
            </mu-col>
        </mu-row>
    </div>
</template>
<script>

export default {
    name:'userHome',
    data(){
        return {
            activeIdx:0,
            list:[
                {
                    label:'个人资料',
                    icon:'',
                    path:'/setup/basicSettings'
                },
                {
                    label:'修改密码',
                    icon:'',
                    path:'/setup/personalSettings'
                },
            ]
        }
    },
    computed:{
    },
    components:{
    },
    mounted(){
      
    },
    methods:{
        clickHandle(item,idx){
            this.activeIdx = idx;
            this.$router.push(item.path)
        }
    }
}
</script>
<style lang="less">
.setup{
    .setup_left_item{
        padding:10px 20px;
        border-radius:5px;
        margin-bottom:10px;
        cursor:pointer;
        &:hover{
            background-color: #ddd;
        }
        &.actibe{
            background-color: #ddd;
        }
    }
}
</style>
