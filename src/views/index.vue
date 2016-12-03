<template>
	<div class="main">
		<TopHeader></TopHeader>
		<div class="page-content">
			<el-row class="tac" :gutter="20">
				<el-col :span="5">
					<SubNav></SubNav>
				</el-col>
				<el-col :span="19">
					<div class="content">
						<router-view></router-view>
					</div>
				</el-col>
			</el-col>
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
    if(!this.checkLogin()){
      return this.$router.push("/login");
    }
  },
  components: {
    TopHeader,SubNav
  }
}
</script>
<style>
	.content {
		background-color: #fff;
		min-height: 500px;
	}
</style>
