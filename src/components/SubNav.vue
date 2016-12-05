<template>
  	<el-menu :default-active="defaultActive" ref="subnav" theme="dark" class="el-menu-vertical-subnav" @select="menuSelect">

	  <el-submenu :index="'m_'+index" v-for="(submenu, index) in menuList">
	    <template slot="title"><i class="el-icon-menu"></i>{{submenu.nodeName}}</template>
	    <el-menu-item-group>
	    <!-- <template slot="title" class="mtt">配置一</template> -->
	      <el-menu-item :index="menuItem.url" v-for="(menuItem, index) in submenu.children">{{menuItem.nodeName}}</el-menu-item>
	    </el-menu-item-group>
	  </el-submenu>
	</el-menu>
</template>
<script>
export default {
	data(){
		return {
			defaultActive:"",
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
			//console.log(this.menuList[0].children[0].url)
			//this.defaultActive = this.menuList[0].children[0].url
		}
	},
	mounted() {
      this.loadMenu();
      var curPath = this.$router;
      this.defaultActive = curPath.history.current.path;
      this.$refs.subnav.openActiveItemMenus();
      //console.log(curPath.history.current.path)
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