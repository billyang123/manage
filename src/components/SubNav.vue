<template>
  	<el-menu default-active="1" theme="dark" class="el-menu-vertical-subnav">

	  <el-submenu index="1">
	    <template slot="title"><i class="el-icon-menu"></i>基础配置</template>
	    <el-menu-item-group>
	    <template slot="title" class="mtt">配置一</template>
	      <el-menu-item index="1-1"><router-link to="/usersAdmin">用户管理</router-link></el-menu-item>
	      <el-menu-item index="1-2"><router-link to="/roleAdmin">角色管理</router-link></el-menu-item>
	      <el-menu-item index="1-3"><router-link to="/authAdmin">权限管理</router-link></el-menu-item>
	    </el-menu-item-group>
	  </el-submenu>
	</el-menu>
</template>
<script>
export default {
	data(){
		return {
			menuList:[]
		}
	},
	methods: {
		menuSelect(index){
			this.$router.push(index);
		},
		loadMenu(){
			let menuStr = localStorage.getItem("menu");
			this.menuList = JSON.parse(menuStr);
			console.log(this.menuList)
		}
	},
	mounted() {
      this.loadMenu();
    }
}
</script>
<style>
	.el-menu-vertical-subnav {
		text-align: left;
	}
	.el-menu-vertical-subnav .el-menu-item a {
		color: #c0ccda;
		text-decoration: none;
		display: block;
	}
</style>