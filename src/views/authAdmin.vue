<template>
	<div class="mytable myAuthMian">
		<h2>基础配置 - 权限管理</h2>
		<el-row :gutter="20">
		  <el-col :span="4">
			<h3>角色</h3>
		  	<div class="grid-content bg-purple">
		  		<el-menu mode="vertical" ref="roleMenu" :default-active="defaultActive"  class="roleVerMenu" @select="menuSelect">
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
		<el-button type="warning" @click="saveEdit">保存角色权限配置</el-button>
	</div>
</template>
<script>
import api from '../api/api'
import api_test from '../api/api_test'
  export default {
  	name:"authAdmin",
    methods: {
    	menuSelect(val){
    		this.getAllResouce(val.split("-")[1]);
    	},
    	handleSelectionChange(val){
    		let arr = [];
    		for (var i = 0; i < val.length; i++) {
    			arr.push(this.fiterResouceData[val[i]].id);
    		}
    		this.multipleSelection = arr.join(',')
    	},
    	saveEdit(){
	        var _this = this;
	        this.$http.post(api.resourceByRoleId, {
	          roleId:this.curRoleId,
	          resourceId:this.multipleSelection
	         },{emulateJSON: true,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((response) => {
	            if(response.body.status == 0){
	                $Message({
			            type: 'success',
			            message: '保存角色权限配置成功!'
			        });
	            }else{
	                $MsgBox.alert(response.body.msg)
	            }
	          }, (response) => {
	            // error callback
	        });
	    },
    	getRoles(){
    		var _this = this;
    		var Loading = $Loading.service({text:"正在拼命加载中..."})
    		this.$http.post(api.getRoles, {
	          row:100,
	          page: 1
	        },{emulateJSON: true,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((response) => {
	          if(response.body.status == 0){
	              var data = response.body.data;
	              _this.roles = data.content;
	              _this.getAllResouce(_this.roles[0].id);
	              _this.getAllResouce(_this.roles[0].id);
	              _this.defaultActive = 'roles-'+_this.roles[0].id;
	          }else{
	            MessageBox.alert(response.body.msg)
	          }
	          Loading.close();
	        }, (response) => {
	        // error callback
	        	Loading.close();
	        });
    	},
    	fiterResouce(data){
    		var _this;
    		var _resouce = {};
    		var _arr = [];
    		for (var i = 0; i < data.length; i++) {
    			if(data[i].checked){
    				_arr.push(data[i].resourceName);
    			}
    			_resouce[data[i].resourceName] = data[i];
    		}
    		this.checkList = _arr;
    		return _resouce;
    	},
    	getAllResouce(roleId){
    		var _this = this;
    		this.curRoleId = roleId;
    		var Loading = $Loading.service({text:"正在拼命加载中..."})
    		this.$http.get(api.getResouce+"?roleId="+roleId).then((response) => {
	          if(response.body.status == 0){

	              var data = response.body.data;
	              data = JSON.parse(data);

	              _this.allCheckList = data;
	              _this.fiterResouceData = _this.fiterResouce(_this.allCheckList)
	          }else{
	            $MsgBox.alert(response.body.msg)
	          }
	          Loading.close();
	        }, (response) => {
	        // error callback
	        	Loading.close();
	        });
    	}
    },
    created(){
    	//this.getRoles();
    },
    mounted(){
    	this.getRoles();
    	//this.getRoles();
    },
    data() {
      return {
      	defaultActive:"roles-1",
      	multipleSelection:'',
      	curRoleId:"",
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