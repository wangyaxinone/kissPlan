<template>
	<div id="app" >
	  <router-view class="view"></router-view>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import Cookies from 'js-cookie'
export default {
	name: 'App',
	
	beforeMount(){
		this.setUser();
		this.setKiss_plan_token();
		Cookies.set('x-access-token', window.localStorage.getItem('token') || '');
	},
	methods:{
		...mapMutations(['setUser','setKiss_plan_token'])
	}
}
</script>

<style>
		@import './assets/reset.css';
		@import './assets/main.css';
		@import './assets/fonts/iconfont.css';
		#app{
		
		}
</style>
