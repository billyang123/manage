<template>
 <div class="wxreply">
 	<h2>关注自动回复</h2>
 	<el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="规则名称">
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
  	      <el-button type="success" size="small" @click="handleEdit(row)">编辑</el-button>
        </div>
      </el-table-column>
    </el-table>
   
    <el-dialog title="编辑关注自动回复" v-model="dVisible">
      	<el-form :model="editFromData" label-width="120px" ref="wxReplyeditForm" :rules="rules">
		  <el-form-item label="回复内容" prop="content">
		  	<el-input v-model="editFromData.content" type="textarea"></el-input>
		  	<!-- <quill-editor ref="myTextEditor"
	              v-model="editFromData.content"
	              :config="editorOption">
			</quill-editor> -->
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('wxReplyeditForm')">提交</el-button>
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
  			dVisible:false,
  			tableData:[{
  				"id":3,
  				"title":"关注自动回复",
  				"content":"关注自动回复",
  				"status":"online",
  				"account":"17huzhu",
  				"type":"subscribe",
  				"keyword":"",
  				"createTime":"2017-01-11 11:36:42"
  			}],
  			editFromData:{
  				title:"",
  				keyword:"",
  				content:""
  			},
  			rules:{
  				content:[
  					{ required: true, message: '请输入回复内容', trigger: 'blur' }
  				]
  			}
  		}
  	},
    methods: {
    	
    	handleEdit(row){
    		this.dVisible = true;
    		this.editFromData = {
    			msgId:row.id,
  				title:row.title,
  				keyword:row.keyword,
  				content:row.content
  			}
    	},
    	submitForm(formName){
    		var _this = this;
    		var _data = this.editFromData;
    		this.$refs[formName].validate((valid) => {
	          if (valid) {
	            _this.ajax(_this,{
	  				url:api.wx_msgupdate,
	  				type:"post",
	  				data:_data,
	  				success:(res) => {
	  					_this.getMsgList();
	  					_this.dVisible = false;
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
    	getMsgList(){
        	let _this = this;
    		this.ajax(this,{
  				url:api.wx_msglist,
  				type:"get",
  				data:{
  					account:"17HUZHU",
  					type:"subscribe"
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
