<template>
	<div class="mytable myAuthMian">
		<h2>基础配置 - 权限管理</h2>
		<el-row :gutter="20">
		  <el-col :span="4">
			<h3>角色</h3>
		  	<div class="grid-content bg-purple">
		  		<el-menu mode="vertical" default-active="1" class="roleVerMenu" @select="handleSelect">
			        <el-menu-item :index="index" v-for="(item,index) in roles">{{item.roleName}}</el-menu-item>
			    </el-menu>
		  	</div>
		  </el-col>
		  <el-col :span="20">
		  	<h3>权限</h3>
		  	<div class="grid-content bg-purple">
		  		<el-checkbox-group v-model="checkList" @change="handleSelectionChange">
		          <el-checkbox :label="item" v-for="(item,index) in allCheckList"></el-checkbox>
		        </el-checkbox-group>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
import api from '../api/api'
import api_test from '../api/api_test'
  export default {
  	name:"authAdmin",
  	created(){
  		
  	},
    methods: {
    	handleSelect(index){
    		console.log(index)
    	},
    	handleSelectionChange(val){

    	},
    	getRoles(){
    		var _this = this;
    		this.$http.post(api.getRoles, {
	          row:100,
	          page: 1
	        },{emulateJSON: true,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((response) => {
	          if(response.body.status == 0){
	              var data = response.body.data;
	              _this.roles = data.content;
	          }else{
	            MessageBox.alert(response.body.msg)
	          }
	        }, (response) => {
	        // error callback
	        });
    	},
    	getAllResouce(){
    		var _this = this;
    		this.$http.post(api.getAllResouce, {
	          row:100,
	          page: 1
	        },{emulateJSON: true,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((response) => {
	          if(response.body.status == 0){
	              var data = response.body.data;
	              _this.roles = data.content;
	          }else{
	            $MsgBox.alert(response.body.msg)
	          }
	        }, (response) => {
	        // error callback
	        });
    	}
    },
    mounted(){
    	this.getRoles();
    },
    data() {
      return {
      	roles:[],
      	checkList:[],
      	allCheckList:["1","2"]
      }
    }
  }
</script>
<style>
	.myAuthMian .el-table tbody .el-table_1_column_1 .cell{
		padding: 0;
	}
	.roleVerMenu {


	}
</style>