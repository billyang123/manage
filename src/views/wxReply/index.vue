<template>
 <div class="wxreply">
 	<h2>关键词自动回复</h2>
 	<div class="text-right add-btn">
 		<el-button type="info" @click="handleAdd">新增关键词回复</el-button>
 	</div>
 	<el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号" inline-template width="80">
        <span>{{$index+1}}</span>
      </el-table-column>
      <el-table-column
        prop="title"
        label="规则名称">
      </el-table-column>
      <el-table-column
        prop="keyword"
        label="关键词"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        inline-template
        width="300"
        label="操作">
        <div>
  	      <el-button type="success" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDel(row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog title="新增关键词回复" v-model="dVisible.wxReplynewForm">
      	<el-form :model="fromData" label-width="120px" ref="wxReplynewForm" :rules="rules">
		  <el-form-item label="规则名称" prop="title">
		    <el-input v-model="fromData.title"></el-input>
		  </el-form-item>
		  <el-form-item label="关键字" prop="keyword">
		    <el-input v-model="fromData.keyword"></el-input>
		  </el-form-item>
		  <el-form-item label="回复内容" prop="content">
		  	<el-input v-model="fromData.content" type="textarea" :rows="6"></el-input>
		    <!-- <quill-editor ref="myTextEditor"
	              v-model="fromData.content"
	              :config="editorOption">
			</quill-editor> -->
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('wxReplynewForm')">提交</el-button>
		  </el-form-item>
		</el-form>
    </el-dialog>
    <el-dialog title="编辑关键词回复" v-model="dVisible.wxReplyeditForm">
      	<el-form :model="editFromData" label-width="120px" ref="wxReplyeditForm" :rules="rules">
		  <el-form-item label="规则名称" prop="title">
		    <el-input v-model="editFromData.title"></el-input>
		  </el-form-item>
		  <el-form-item label="关键字" prop="keyword">
		    <el-input v-model="editFromData.keyword"></el-input>
		  </el-form-item>
		  <el-form-item label="回复内容" prop="content">
		  	<el-input v-model="editFromData.content" type="textarea" :rows="6"></el-input>
		  	<!-- <quill-editor ref="myTextEditor"
	              v-model="editFromData.content"
	              :config="editorOption">
			</quill-editor> -->
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('wxReplyeditForm')">提交发布</el-button>
		  </el-form-item>
		</el-form>
    </el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'

export default {
  	name:"wxMenu-replay",
  	data(){
  		return {
  			editorOption:{},
  			dVisible:{
  				"wxReplynewForm":false,
        		"wxReplyeditForm":false
  			},
  			tableData:[],
  			url:{
  				"wxReplynewForm":api.wx_msgadd,
  				"wxReplyeditForm":api.wx_msgupdate
  			},
  			fromData:{
  				title:"",
  				keyword:"",
  				content:""
  			},
  			editFromData:{
  				id:0,
  				title:"",
  				keyword:"",
  				content:""
  			},
  			rules:{
  				title:[
  					{ required: true, message: '请输入规则名称', trigger: 'blur' }
  				],
  				keyword:[
  					{ required: true, message: '请输入关键字', trigger: 'blur' }
  				],
  				content:[
  					{ required: true, message: '请输入回复内容', trigger: 'blur' }
  				]
  			}
  		}
  	},
    methods: {
    	handleDel(row){
    		var _this = this;
    		$MsgBox.confirm("此操作将删除该关键词回复, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.ajax(_this,{
	  				url:api.wx_msgdelete,
	  				type:"post",
	  				data:{
	  					msgId:row.id
	  				},
	  				success:(res) => {
	  					_this.getMsgList();
	  				},
	  				complete:(res) => {

	  				}
	  			})
            }).catch (() => {

            });
    	},
    	handleEdit(row){

    		this.dVisible.wxReplyeditForm = true;
    		this.editFromData = {
    			msgId:row.id,
  				title:row.title,
  				keyword:row.keyword,
  				content:row.content
  			}
    	},
    	submitForm(formName){
    		var _this = this;
    		var _data = {};
    		if(formName == "wxReplyeditForm"){
    			_data = this.editFromData;
    		}else{
    			_data = this.fromData;
    		}
    		this.$refs[formName].validate((valid) => {
	          if (valid) {
	            _this.ajax(_this,{
	  				url:_this.url[formName],
	  				type:"post",
	  				data:_data,
	  				success:(res) => {
	  					_this.getMsgList();
	  					_this.dVisible[formName] = false;
	  				},
	  				complete:(res) => {

	  				}
	  			})
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
    	},
    	handleAdd(){
    		this.dVisible.wxReplynewForm = true;
    		this.fromData = {
  				title:"",
  				keyword:"",
  				content:"",
  				account:"17HUZHU",
  				type:"text"
  			}
    	},
    	getMsgList(){
        	let _this = this;
    		this.ajax(this,{
  				url:api.wx_msglist,
  				type:"get",
  				data:{
  					account:"17HUZHU",
  					type:"text"
  				},
  				success:(res) => {
  					console.log(res)
  					_this.tableData = res.body.data;
  				},
  				complete:(res) => {

  				}
  			})
    	},
    },
    created(){
    	this.getMsgList();
    },
    mounted () {
    	
  	}
}
</script>
<style lang="less" scoped>
	.add-btn{
		margin-bottom: 20px;
	}
	.text-right {
		text-align: right;
	}
	.wxreply {
		padding: 20px 20px 20px 76px;
	}
</style>
