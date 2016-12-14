<template>
	<div class="main">
		<TopHeader></TopHeader>

		<div class="page-content">
			<div class="SubNav-box">
				<SubNav></SubNav>
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
  methods:{
    checkLogin(){
      let userName = sessionStorage.getItem('userName');
      return userName?true:false;
    }
  },
  mounted(){
    // if(!this.checkLogin()){
    //   return this.$router.push("/login");
    // }
  },
  components: {
    TopHeader,SubNav
  }
}
</script>
<style>

	.SubNav-box {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 200px;
		height: 100%;
		background-color: #324057;

	}
	.page-content {
		padding-left: 200px;
		position: relative;
		height: 100%;
		bottom: 0;
	}
	.content {
		background-color: #fff;
		min-height: 500px;


	}
</style>
