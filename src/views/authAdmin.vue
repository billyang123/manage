<template>
	<div class="mytable myAuthMian">
		<h2>基础配置 - 权限管理</h2>
		<el-row :gutter="20">
		  <el-col :span="4">
			<h3>角色</h3>
		  	<div class="grid-content bg-purple">
		  		<el-menu mode="vertical" default-active="roles-0" class="roleVerMenu" @select="menuSelect">
			        <el-menu-item :index="'roles-'+item.id" v-for="(item,index) in roles">{{item.roleName}}</el-menu-item>
			    </el-menu>
		  	</div>
		  </el-col>
		  <el-col :span="20">
		  	<h3>权限</h3>
		  	<div class="grid-content bg-purple">
		  		<el-checkbox-group v-model="checkList" @change="handleSelectionChange">
		          <el-checkbox :label="item.resourceName" v-for="(item,index) in allCheckList"></el-checkbox>
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
    methods: {
    	menuSelect(val){
    		console.log(val)
    		this.getAllResouce(val.split("-")[1]);
    	},
    	handleSelectionChange(val){
    		//this.getAllResouce(val.id)
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
    	fiterResouce(data){
    		var _resouce = {};
    		this.checkList = [];
    		for (var i = 0; i < data.length; i++) {
    			if(data[i].checked){
    				this.checkList.push(data[i].resourceName);
    			}
    			_resouce[data[i].resourceName] = data[i];
    		}
    		return _resouce;
    	},
    	getAllResouce(roleId){
    		var _this = this;
    		this.$http.get(api.getResouce+"?roleId="+roleId).then((response) => {
	          if(response.body.status == 0){

	              var data = response.body.data;
	              data = JSON.parse(data);
	              _this.allCheckList = data;
	              _this.fiterResouceData = _this.fiterResouce(data)
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
      	fiterResouceData:{},
      	roles:[],
      	checkList:[],
      	allCheckList:[]
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