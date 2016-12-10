<template>
	<div class="resource">
		<h2>基础配置 - 资源管理</h2>
		<div class="block addbtn">
			<el-button type="primary" @click="handleAdd()">添加资源</el-button>
		</div>
		<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="resourceSort"
	      label="顺序"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="groupName"
	      label="组名">
	    </el-table-column>
	    <el-table-column
	      prop="resourceName"
	      label="资源名称">
	    </el-table-column>
	    <el-table-column
	      prop="resourceUrl"
	      label="资源路径">
	    </el-table-column>
	    <el-table-column
	      prop="resourceType"
	      label="资源类型"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建时间"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      inline-template
	      :context="_self"
	      fixed="right"
	      label="操作"
	      width="200" type="index">
	      <span>
	        <el-button @click="handleUpdate(row)" :plain="true" type="info">修改</el-button>
	        <el-button @click="handleDel(row.id)" :plain="true" type="danger">删除</el-button>
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
		  <el-form ref="formDialog" :model="formDialog" :rules="rules">
		  	<el-form-item label="数据类型" :label-width="formLabelWidth" prop="resourceType">
          <el-radio-group v-model="formDialog.resourceType">
            <el-radio :label="0+''">菜单</el-radio>
            <el-radio :label="2+''">数据操作</el-radio>
          </el-radio-group>
		    </el-form-item>
		    <el-form-item label="资源名称" :label-width="formLabelWidth" prop="resourceName">
		    	<el-input v-model="formDialog.resourceName" placeholder="请输入资源名称" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="资源路径" :label-width="formLabelWidth" prop="resourceUrl">
		      <el-input v-model="formDialog.resourceUrl" auto-complete="off" placeholder="请输入资源路径"></el-input>
		    </el-form-item>
		    <el-form-item label="父节点ID" :label-width="formLabelWidth" prop="parentId" v-if="formDialog.resourceType==2">
          <el-row>
            <el-col :span="6"><el-input v-model="formDialog.parentId" :value="formDialog.parentId?formDialog.parentId+'':''" :disabled="true" placeholder="点击获取父节点ID" auto-complete="off"></el-input></el-col>
            <el-col :span="6" style="margin-left:20px"><el-input :value="formDialog.groupName?formDialog.groupName+'':''" v-model="formDialog.groupName" :disabled="true" placeholder="点击获取组名" auto-complete="off"></el-input></el-col>
            <el-col :span="6" style="margin-left:20px"><el-button type="primary" @click="handleParentId">点击获取</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="父节点ID" :label-width="formLabelWidth" v-if="formDialog.resourceType==0">
          <el-row>
            <el-col :span="6"><el-input v-model="formDialog.parentId" :disabled="true" placeholder="点击获取父节点ID" auto-complete="off"></el-input></el-col>
            <el-col :span="6" style="margin-left:20px"><el-input v-model="formDialog.groupName" :disabled="true" placeholder="点击获取组名" auto-complete="off"></el-input></el-col>
            <el-col :span="6" style="margin-left:20px"><el-button type="primary" @click="handleParentId">点击获取</el-button></el-col>
          </el-row>
        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleSure" :disabled="dis">确 定</el-button>
		  </div>
		</el-dialog>

    <!--获取父节点ID和组名-->
    <el-dialog title="获取父节点ID和组名(只能选一个)" v-model="dialogParentIdVisible" size="tiny">
      <el-tree
        :data="treeData"
        :props="props"
        :default-expand-all=true
        node-key="id"
        :default-checked-keys="defaultChecked"
        show-checkbox
        @check-change="handleCheckChange" ref="access">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParentIdVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTreeSure">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import api from '../api/api'
import api_test from '../api/api_test'
export default {
  	name:"adminUsers",
  	created(){
  		this.getUsers();
  		//console.log(MessageBox.alert("sadassad"))
  	},
    methods: {
      handleTreeSure(){
        var self = this;
        self.dialogParentIdVisible = false



      },

      handleCheckChange(data, checked, indeterminate) {
        var self=this
        self.formDialog.groupName = data.nodeName;
        self.formDialog.parentId = data.id;
      },

      handleParentId(){
        var self = this;
        var _url = self.parentIdUrl
        self.ajax(self,{
	          url:_url,
	          type:"get",
	          data:{
	          	id:self.formDialog.id
	          },
	          success:function(response){
	            console.log(response)
	            self.dialogParentIdVisible = true;
	            var data;

	            if(self.addOrChange){
	                 data = JSON.parse(response.body.data);
	                 self.treeData = data
	            }else{
	                 data = JSON.parse(response.body.data.resourceTreeJson);
	                 self.treeData = data
	                 self.defaultChecked = response.body.data.checkedIds;
	                 console.log(self.defaultChecked)
	            }
	           // var data = JSON.parse(response.body.data);
	          //  console.log(data)
           // _this.tableData = data.content;
           // _this.total = data.totalElements;
          //  _this.totalPages = data.totalPages;
	          }
	        })


      },
      //确认
      handleSure(){
        var self = this;
         var _url = self.handleUrl
         self.dis = true;
         var formDialog = {
          resourceType:self.formDialog.resourceType,
          resourceName:self.formDialog.resourceName,
          resourceUrl:self.formDialog.resourceUrl,
          groupName:self.formDialog.groupName,
          parentId:self.formDialog.parentId
         };
         if(self.formDialog.id){
            formDialog['id'] = self.formDialog.id;
         }
          self.ajax(self,{
	          url:_url,
	          type:"post",
	          data:formDialog,
	          success:function(response){
	            self.getUsers()
	            self.dialogFormVisible = false;
	            console.log(response)
	           $Message({
			            type: 'success',
			            message: '添加成功!'
			        });
	          },
	          complete:function(){
	            self.dis = false;
	          }
	        })
      },

    	handleReset(cb) {
	        this.$refs.formDialog && this.$refs.formDialog.resetFields();
	    },
    	getUsers(){
    		var _this = this;
    		//return console.log(this.ajax)
    		this.ajax(this,{
	          url:api.getResourceData,
	          type:"get",
	          data:{
	          	size:this.pgSize,
	          	page:this.currentPage-1
	          },
	          success:function(response){

	            var data = JSON.parse(response.body.data);
	            console.log(data)
            _this.tableData = data.content;
            _this.total = data.totalElements;
            _this.totalPages = data.totalPages;
	          }
	        })
    	},
    	//修改
		handleUpdate(row) {
			this.curUserId = row.id;
			this.dialogtitle = "修改资源";
			this.popUpMsg = "修改成功!"
			this.handleUrl = api.getChangeResource;
			this.parentIdUrl = api.getChangeTree;
			this.dialogFormVisible = true;
			this.addOrChange = false;
			this.handleReset();
			this.formDialog = {
			  id:row.id,
				resourceType:row.resourceType,
				resourceName:row.resourceName,
				resourceUrl:row.resourceUrl,
				groupName:row.groupName,
				parentId:row.parentId
			};
			//this.handleReset();
		},
		//新增资源
		handleAdd(row){
			this.curUserId = "";
			this.dialogtitle = "添加资源"
			this.popUpMsg = "添加成功!"
			this.handleUrl = api.getAddResource
			this.parentIdUrl = api.getResourceTree
			this.dialogFormVisible = true;
			this.addOrChange = true;
			this.handleReset();
			this.formDialog = {
				resourceType:'',
				resourceName:'',
				resourceUrl:'',
				groupName:'',
				parentId:''
			};
			//this.handleReset();
		},
		//删除
		handleDel(_id){
			var _this = this;
			$MsgBox.confirm('此操作将删除该资源, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	_this.ajax(_this,{
		          url:api.getDelResource,
		          type:"post",
		          data:{id:_id},
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
      return {
      	upUrl:'',
      	dialogtitle:"添加用户",
      	treeName:'',
      	popUpMsg:'',
      	treeData:[],
      	handleUrl:'',
      	parentIdUrl:'',
      	dis:false,
      	addOrChange:false,
      	props: {
          label: 'nodeName',
          children: 'children'
        },
        defaultChecked:[],
      	dialogFormVisible: false,
      	dialogParentIdVisible:false,
      	formDialog:{
      	  id:'',
      	  resourceType:'',
      	  resourceName:'',
      	  resourceUrl:'',
      	  groupName:'',
      	  parentId:''
      	},
      	userForm:{
          userLoginName:'',
          userPassword:'',
          userRealName:'',
          userWorkNo:'',
          userNickName:'',
          userPhone:''
      	},
      	curUserId:"",
      	pgSize:30,
      	total:1,
      	currentPage: 1,
        tableData: [],
        formLabelWidth: '120px',
        totalPages:1,
        rules: {

          resourceType: [
            { required: true, message: '请选资源类型', trigger: 'blur,change' }
          ],
          resourceName: [
            { required: true, message: '请输入资源名称', trigger: 'blur,change' }
          ],
          resourceUrl: [
            { required: true, message: '请输入资源路径', trigger: 'blur,change' },
          ],
          parentId: [
            { required: true, message: '请点击获取父节点ID和组名', trigger: 'blur,change' }
          ],
          groupName:[
          	{ required: true, message: '请输入组名', trigger: 'blur,change' }
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
	.resource {
		padding: 20px;
	}
	.resource .el-form-item__content{text-align:left}
	.resource .cell{text-align:center}
	.resource .el-tree-node{ text-align:left}
</style>
