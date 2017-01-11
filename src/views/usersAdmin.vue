<template>
	<div class="mytable">
		<h2>基础配置 - 用户管理</h2>
		<div class="block addbtn">
			<el-button type="primary" @click="handleAdd({})">添加用户</el-button>
		</div>
		<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="userWorkNo"
	      label="用户工号"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="userRealName"
	      label="真实姓名">
	    </el-table-column>
	    <el-table-column
	      prop="userNickName"
	      label="用户昵称">
	    </el-table-column>
	    <el-table-column
	      prop="userLoginName"
	      label="用户邮箱">
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
	      width="260" type="index">
	      <span>
	        <el-button @click="handleUpdate(row)" :plain="true" type="info">修改</el-button>
	        <el-button @click="handleDel(row.id)" :plain="true" type="info">删除</el-button>
	        <el-button @click="handleRole(row)" :plain="true" type="info">分配角色</el-button>
	      </span>
	    </el-table-column>
	  </el-table>
	  <div class="blobk" style="margin:20px 0;">
	  	<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[30, 50, 100, 200]"
	      :page-size="pgSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total" v-if="totalPages > 1">
	   </el-pagination>
	  </div>

	  <el-dialog ref="userdialog" :title="dialogtitle" v-model="dialogFormVisible" >
		  <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item label="用户工号" :label-width="formLabelWidth" prop="userWorkNo">
          <el-input v-model="userForm.userWorkNo" auto-complete="off" placeholder="请输入用户工号"></el-input>
        </el-form-item>
		    <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="userRealName">
		    	<el-input v-model="userForm.userRealName" placeholder="请输入真实姓名" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="登录邮箱" :label-width="formLabelWidth" prop="userLoginName">
		    	<el-input v-model="userForm.userLoginName" placeholder="请输入登录邮箱" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户密码" :label-width="formLabelWidth" prop="userPassword" v-if="userPasswordVisible">
		    	<el-input v-model="userForm.userPassword" placeholder="请输入用户密码" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户手机" :label-width="formLabelWidth" prop="userPhone">
		    	<el-input v-model="userForm.userPhone" placeholder="请输入用户手机" auto-complete="off"></el-input>
		    </el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="userForm.userNickName" placeholder="请输入用户昵称" auto-complete="off"></el-input>
        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="upUser(curUserId)">确 定</el-button>
		  </div>
		</el-dialog>

    <!--分配角色-->
    <el-dialog title="分配角色" v-model="dialogRoleVisible" size="tiny">
      <el-checkbox-group v-model="checkList" @change="handleSelectionChange">
        <div class="rowList" style="padding-bottom:30px">
          <el-row>
            <el-col :span="8" v-for="role in roleData">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="role.id">{{role.roleName}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </div>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>


	</div>
</template>
<script>
import api from '../api/api'
export default {
  	name:"adminUsers",
  	created(){
  		this.getUsers();
  		//console.log(MessageBox.alert("sadassad"))
  	},
    methods: {

    	handleReset(cb) {
	        this.$refs.userForm && this.$refs.userForm.resetFields();
	    },
    	upUser(id){
    		var _this = this;
    		//this.dialogFormVisible = false;

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
	          	_this.ajax(_this,{
		          url:_this.upUrl,
		          type:"post",
		          data:formdata,
		          success:function(response){
		          _this.dialogFormVisible = false
		          	_this.getUsers();
		            $Message({
			            type: 'success',
			            message: '添加或修改成功!'
			        });
		          }
		        })
	          } else {
	            //console.log('error submit!!');

	            return false;
	          }
	        });
    	},
    	getUsers(){
    		var _this = this;
    		//return console.log(this.ajax)
    		this.ajax(this,{
	          url:api.getUsers,
	          type:"post",
	          data:{
	          	size:this.pgSize,
	          	page:this.currentPage-1
	          },
	          success:function(response){
	            var data = response.body.data;
	                 if(data){
                  _this.tableData = data.content;
                  _this.total = data.totalElements;
                  _this.totalPages = data.totalPages;
	                 }

	          }
	        })
    	},
    	//分配角色
    	handleRole(row){
        this.dialogRoleVisible = true
        var self=this;
         self.checkList.length=0;
            this.ajax(this,{
            url:api.findUserRole,
            type:"post",
            data:{
              id:row.id,
              userNickName:row.userNickName
            },
            success:function(response){
              let roles = response.body.data.roles;
                  self.roleData = roles;
                  self.curPerson=response.body.data;
                  self.curPersonId=response.body.data.id;
                  for(let i=0;i<roles.length;i++){
                    if(roles[i].checked){
                      self.checkList.push(roles[i].id)
                    }
                  }
                  if(self.checkList.length==0){
                    self.checkList.push(' ')
                  }


                  //self.checkList = self.filterCheckList(roles);
            }
          })
    	   },
    	   //角色确认
    	   saveEdit(){
          var self = this;
          this.ajax(this,{
            url:api.saveAssignRole,
            type:"post",
            data:{
              accountId:self.curPersonId,
              roleId:self.selectCheckbox
            },
            success:function(response){
              self.dialogRoleVisible=false;
              $Message({
                  type: 'success',
                  message: '保存用户角色配置成功!'
              });
            }
          })
        },
        handleSelectionChange(val) {
        var _val=val;
        if(val[0]==' '){
          _val.splice(0,1)
        }
        this.selectCheckbox = _val.join(',')
      },
    	//修改用户
      handleUpdate(row) {
        this.curUserId = row.id;
        this.dialogtitle = "修改用户"
        this.upUrl = api.updateUser;
        this.dialogFormVisible = true
        this.userPasswordVisible = false
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
		  //新增用户
      handleAdd(row){
        this.curUserId = "";
        this.dialogtitle = "添加新用户"
        this.upUrl = api.addUser;
        this.dialogFormVisible = true
        this.userPasswordVisible = true
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
		  //删除用户
      handleDel(id){
        var _this = this;
        $MsgBox.confirm('此操作将删除该改用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.ajax(_this,{
                url:api.deleteUser,
                type:"post",
                data:{id:id},
                success:function(response){
                  _this.getUsers();
            $Message({
                    type: 'success',
                    message: '删除成功!'
                });
                }
              })

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

      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUsers();

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
    	// var checkEmail = (rule, value, callback) => {
    	// 	this.ajax({
    	// 		url:'/manage/user/isEmailExist',
    	// 		type:"get",
    	// 		data:{

    	// 		},
    	// 		success:function(res){

    	// 		}
    	// 	})
    	// 	if (value === '') {
	    //       callback(new Error('请输入用户登录邮箱'));
	    //     } else if (value !== this.ruleForm2.pass) {
	    //       callback(new Error('两次输入密码不一致!'));
	    //     } else {
	    //       callback();
	    //     }
    	// }
      return {
      	upUrl:'',
      	dialogtitle:"添加用户",
      	dialogFormVisible: false,
      	userPasswordVisible:false,
      	dialogRoleVisible:false,
      	switchRole:true,
      	selectCheckbox:'',
      	curPersonId:1,
      	userForm:{
        userLoginName:'',
        userPassword:'',
        userRealName:'',
        userWorkNo:'',
        userNickName:'',
        userPhone:''
      	},
      	roleData:[],
      	curUserId:"",
      	pgSize:30,
      	total:10,
      	currentPage: 1,
        tableData: [],
        checkList: [],
        formLabelWidth: '120px',
        totalPages:1,
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
            // {
            // 	validator:checkEmail,trigger:'blur'
            // }
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
	.mytable .cell{text-align:center}
	.mytable .el-button+.el-button{margin-left:0}
	.mytable .el-dialog--tiny{width:60%}
	.mytable .el-checkbox-group{text-align:left}
	.mytable .rowList .el-col-8, .el-col-xs-8{padding-top:10px}

</style>
