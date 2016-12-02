<template>
	<div class="mytable">
		<h2>基础配置 - 用户管理</h2>
		<div class="block addbtn">
			<el-button type="primary" @click="handleAdd({})">添加新用户</el-button>
		</div>
		<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      fixed
	      prop="userWorkNo"
	      label="用户工号"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="userRealName"
	      label="真实姓名"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="userNickName"
	      label="用户昵称"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="userLoginName"
	      label="用户邮箱"
	      width="260">
	    </el-table-column>
	    <el-table-column
	      prop="userPassword"
	      label="用户密码"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      prop="userPhone"
	      label="用户手机"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      inline-template
	      :context="_self"
	      fixed="right"
	      label="操作"
	      width="100" type="index">
	      <span>
	        <el-button @click="handleUpdate(row)" type="text" size="small">修改</el-button>
	        <el-button @click="handleDel(row.id)" type="text" size="small">删除</el-button>
	      </span>
	    </el-table-column>
	  </el-table>
	  <div class="blobk" style="margin:20px 0;">
	  	<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[20, 40, 60, 80]"
	      :page-size="pgSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	   </el-pagination>
	  </div>

	  <el-dialog ref="userdialog" :title="dialogtitle" v-model="dialogFormVisible" >
		  <el-form ref="userForm" :model="userForm" :rules="rules">
		  	<el-form-item label="用户昵称" :label-width="formLabelWidth">
		    	<el-input v-model="userForm.userNickName" placeholder="请输入用户昵称" auto-complete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="userRealName">
		    	<el-input v-model="userForm.userRealName" placeholder="请输入真实姓名" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户工号" :label-width="formLabelWidth" prop="userWorkNo">
		      <el-input v-model="userForm.userWorkNo" auto-complete="off" placeholder="请输入用户工号"></el-input>
		    </el-form-item>
		    <el-form-item label="用户邮箱" :label-width="formLabelWidth" prop="userLoginName">
		    	<el-input v-model="userForm.userLoginName" placeholder="请输入用户邮箱" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户密码" :label-width="formLabelWidth" prop="userPassword">
		    	<el-input v-model="userForm.userPassword" placeholder="请输入用户密码" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户手机" :label-width="formLabelWidth" prop="userPhone">
		    	<el-input v-model="userForm.userPhone" placeholder="请输入用户手机" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="upUser(curUserId)">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
import api from '../api/api'
import api_test from '../api/api_test'
export default {
  	name:"adminUsers",
  	created(){
  		var _this = this;
  		console.log(this.$refs)
  		console.log(api_test.getUsers().list)
  		this.getUsers();
  		//console.log(MessageBox.alert("sadassad"))
  	},
    methods: {
    	
    	handleReset(cb) {
	        this.$refs.userForm && this.$refs.userForm.resetFields();
	    },
    	upUser(id){
    		var _this = this;
    		this.dialogFormVisible = false;

    		var formdata = {
    			userLoginName:this.userForm.userLoginName,
				userPassword:this.userForm.userPassword,
				userRealName:this.userForm.userRealName,
				userWorkNo:this.userForm.userWorkNo,
				userNickName:this.userForm.userNickName,
				userPhone:this.userForm.userPhone
    		}
    		if (id) {
    			formdata["id"] = id;
    		}
    		this.$refs.userForm.validate((valid) => {
	          if (valid) {
	            _this.$http.post(api.upUser, formdata,{
	            	emulateJSON: true,
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
	            }).then((response) => {
					if(response.body.status == 0){
						$Message({
				            type: 'success',
				            message: '添加成功!'
				        });
					}else{
						$MsgBox.alert(response.body.msg)
					}
				}, (response) => {
				// error callback
				});
	          } else {
	            //console.log('error submit!!');
	            return false;
	          }
	        });
    	},
    	getUsers(){
    		var _this = this;
    		console.log({size:this.pgSize,currentPage: this.currentPage})
    		this.$http.post(api.getUsers, {row:this.pgSize,page: this.currentPage},{
    			emulateJSON: true,
				headers:{
					"Content-Type":"application/x-www-form-urlencoded"
				}
    		}).then((response) => {
    			if(response.body.status == 0){
    				var data = response.body.data;
					_this.tableData = data.content;
					_this.total = data.totalElements;
				}else{
					$MsgBox.alert(response.body.msg)
				}
			}, (response) => {
				// error callback
			});
    	},
		handleUpdate(row) {
			this.curUserId = row.id;
			this.dialogtitle = "修改用户"
			this.dialogFormVisible = true
			this.handleReset();
			this.userForm = {
				userLoginName:row.userLoginName,
				userPassword:row.userPassword,
				userRealName:row.userRealName,
				userWorkNo:row.userWorkNo,
				userNickName:row.userNickName,
				userPhone:row.userPhone
			};
			//this.handleReset();
		},
		handleAdd(row){
			this.curUserId = "";
			this.dialogtitle = "添加新用户"
			this.dialogFormVisible = true
			this.handleReset();
			this.userForm = {
				userLoginName:'',
				userPassword:'',
				userRealName:'',
				userWorkNo:'',
				userNickName:'',
				userPhone:''
			};
			//this.handleReset();
		},
		handleDel(id){
			var _this = this;
			$MsgBox.confirm('此操作将删除该改用户, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	_this.$http.post(api.deleteUser, {
					id:id
				},{
	            	emulateJSON: true,
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
	            }).then((response) => {
					if(response.body.status == 0){
						_this.getUsers();
						$Message({
				            type: 'success',
				            message: '删除成功!'
				        });
					}else{
						$MsgBox.alert(response.body.msg)
					}
				}, (response) => {
				// error callback
				});
	        
	        }).catch(() => {
	          $Message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		handleSizeChange(val) {
			this.pgSize = val;
			this.currentPage = 1;
			this.getUsers();
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getUsers();
			console.log(`当前页: ${val}`);
		}
    },
    data() {
    	var checkPhone = (rule, value, callback)=>{
    		if (!value) {
	          return callback(new Error('手机号码不能为空'));
	        }
    		if(!(/^1[34578]\d{9}$/.test(value))){ 
		        return callback(new Error('请输入正确的手机号码'));
		    } 
    	}
      return {
      	dialogtitle:"添加用户",
      	dialogFormVisible: false,
      	userForm:{
			userLoginName:'',
			userPassword:'',
			userRealName:'',
			userWorkNo:'',
			userNickName:'',
			userPhone:''
      	},
      	curUserId:"",
      	pgSize:20,
      	total:40,
      	currentPage: 1,
        tableData: [],
        formLabelWidth: '120px',
        rules: {
          
          userRealName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur,change' }
          ],
          userWorkNo: [
            { required: true, message: '请输入用户工号', trigger: 'blur,change' }
          ],
          userLoginName: [
            { required: true, message: '请输入用户邮箱', trigger: 'blur,change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          userPassword:[
          	{ required: true, message: '请输入用户密码', trigger: 'blur,change' }
          ],
          userPhone:[
          	{ required: true, message: '请输入手机号', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ]
        }
      }
    }
  }
</script>
<style>
	.addbtn {
		margin-bottom: 20px;
		text-align: right;
	}
	.mytable {
		padding: 20px;
	}
</style>