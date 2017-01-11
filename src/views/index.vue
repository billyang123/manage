<template>
	<div class="main">
		<TopHeader></TopHeader>

		<div class="page-content" :style="{paddingLeft:pd+'px'}">
			<div class="SubNav-box" :style="{left:left+'px',position:pos,top:top+'px',height:wh+'px'}">
				<SubNav></SubNav>
				<div class="menu-icon" @click="showMenu"><i class="el-icon-menu" v-if="left==-200"></i><i class="el-icon-d-arrow-left" v-if="left==0"></i></div>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import TopHeader from '../components/TopHeader'
import SubNav from '../components/SubNav'

export default {
  name: 'index',
  data(){
  	return {
  		left:-200,
  		top:0,
  		pd:0,
  		pos:"absolute",
  		wh:window.innerHeight
  	}
  },
  methods:{
    checkLogin(){
      let userName = sessionStorage.getItem('userName');
      return userName?true:false;
    },
    showMenu(){
    	this.left = this.left==0?-200:0;
    	this.pd = this.pd==0?200:0;
    },
    onhover(){
    	this.op = 1;
    },
    handler(){
    	if(document.body.scrollTop > 100){
			this.pos = "fixed";
			// this.top = 0
		}else{
			this.pos = "absolute";
			// this.top = 100
		}
    }
  },
  mounted(){
  		var _this = this;
//     if(!this.checkLogin()){
//       return this.$router.push("/login");
//     }
    var handler = function (e) {
		_this.handler()
  	}
  	window.onscroll = handler
  },
  components: {
    TopHeader,SubNav
  }
}
</script>
<style>

	.SubNav-box {
		position: fixed;
		top: 100px;
		left: -200px;
		bottom: 0;
		width: 200px;
		height: 100%;
		background-color: #324057;
		transition: left 0.3s;
		z-index: 99;
	}
	.menu-icon {
		position: absolute;
		top: 0;
		right: -56px;
		cursor: pointer;
		background-color: #324057;
		padding: 17px 20px;
		color: #fff;
		transition: opacity 0.3s;
	}
	.page-content {
		position: relative;
		height: 100%;
		bottom: 0;
		transition: padding 0.3s;
	}
	.content {
		background-color: #fff;
		min-height: 500px;
	}
</style>
