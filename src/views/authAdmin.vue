<template>
	<div class="mytable myAuthMian">
		<h2>基础配置 - 权限管理</h2>
		<div class="roleauth-box">
			<div class="role-box">
				<h3>角色</h3>
			  	<div class="roles-content">
			  		<el-menu mode="vertical" ref="roleMenu" :default-active="defaultActive"  class="roleVerMenu" @select="menuSelect">
				        <el-menu-item :index="'roles-'+item.id" v-for="(item,index) in roles">{{item.roleName}}</el-menu-item>
				    </el-menu>
			  	</div>
			</div>
			<div class="auth-box">
				<h3>权限</h3>
			  	<div class="auth-content" v-if="resShow">
			  		<el-checkbox-group v-model="checkList" @change="handleSelectionChange">
			          <el-checkbox :label="item.id" v-for="(item,index) in checkBoxData">{{item.resourceName}}</el-checkbox>
			        </el-checkbox-group>
			  	</div>
			</div>
		</div>
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
    		var _this = this;
    		this.getAllResouce(val.split("-")[1],function(data) {
    			_this.checkBoxData = data;
    			_this.checkList = _this.getChecked(data)
    			_this.resShow = true;
    		});
    	},
    	handleSelectionChange(val){
    		this.multipleSelection = val.join(',')
    	},
    	saveEdit(){
	        var _this = this;
	        this.ajax(this,{
	          url:api.setrassignRole,
	          type:"post",
	          data:{
	          	roleId:this.curRoleId,
	          	resourceId:this.multipleSelection
	          },
	          success:function(response){
	            $Message({
		            type: 'success',
		            message: '保存角色权限配置成功!'
		        });
	          }
	        })
	    },
	    getChecked(d){
	    	var arr = [];
	    	
	    	for (var i = 0; i < d.length; i++) {
				if(d[i].checked){
					arr.push(d[i].id);
				}
			}
			
			return arr;
	    },
    	getRoles(){
    		var _this = this;
    		this.ajax(this,{
	          url:api.getRoles,
	          type:"post",
	          data:{},
	          success:function(response){
	            var data = response.body.data.data;
	              _this.roles = data;
	              _this.getAllResouce(data[0].id,function(d) {
		    			_this.checkBoxData = d;
		    			_this.checkList = _this.getChecked(d)
		    			_this.resShow = true;
		    		});
	          }
	        })
    	},
    	getAllResouce(roleId,callback){
    		var _this = this;
    		this.curRoleId = roleId;
    		//var Loading = $Loading.service({text:"正在拼命加载中..."})

    		this.ajax(this,{
	          url:api.getResouce,
	          type:"get",
	          data:{
	            roleId:roleId
	          },
	          success:function(response){
	            var data = response.body.data;
	              data = JSON.parse(data);
	              callback && callback(data);
	          }
	        })
    	}
    },
    created(){
    	this.getRoles();
    },
    // mounted(){
    // },
    data() {
      return {
      	resShow:false,
      	defaultActive:"roles-1",
      	multipleSelection:'',
      	curRoleId:"",
      	checkBoxData:[],
      	roles:[],
      	checkList:[],
      	allCheckList:[{}]
      }
    }
  }
</script>
<style>
	.myAuthMian .el-table tbody .el-table_1_column_1 .cell{
		padding: 0;
	}
	.myAuthMian .auth-content {
		text-align: right;
	}
	.myAuthMian .el-checkbox {
		margin-bottom: 5px;
	}
	.roleauth-box {
		position: relative;
		overflow: hidden;
	}
	.roles-content {
		text-align: left;
		
	}
	.role-box {
		float: left;
		width: 100px;
		left: 0;
		top: 0;
	}
	.auth-box {
		
	}
</style>