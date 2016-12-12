<template>
 <div class="fundAppList">
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    
	    <el-table-column
	      prop="fundraiseProjectTitle"
	      label="项目标题"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseProjectDesc"
	      label="项目描述"
	      width="400">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作">
	      <div>
	      	<el-button size="small" @click="showChangeHandle('editProject')">编辑</el-button>
	      	<el-button size="small" @click="showChangeHandle('payMoney')">打款</el-button>
	      	<el-button size="small" @click="changeStatus('online')">{{online?"取消预览":"在线预览"}}</el-button>
	      	<el-button size="small" @click="changeStatus('forceClose')" v-if="!forceClose">强制关闭</el-button>
	      	<el-button size="small" @click="showChangeHandle('commit')">评论维护</el-button>
	      </div>
	    </el-table-column>
	  </el-table>
	  <!-- Form -->
	<el-dialog title="编辑项目" v-model="editProject.visible" size="large">
	  <el-form :model="editProject.form" :rules="editProject.rules" ref="editProject">
	    <el-form-item label="项目标题" label-width="150px" prop="fundraiseProjectTitle">
	      <el-input type="text" v-model="editProject.form.fundraiseProjectTitle" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="项目描述" label-width="150px" prop="fundraiseProjectDesc">
	      <el-input type="textarea" v-model="editProject.form.fundraiseProjectDesc" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="editProject.visible = false">取 消</el-button>
	    <el-button type="primary" @click="postMyEdit('editProject')" :disabled="editProject.disabled">保存</el-button>
	  </div>
	</el-dialog>
	<el-dialog title="打款" v-model="payMoney.visible">
		<div style="text-align: left;padding:0 40px;">
			<p>项目标题:{{curProject.fundraiseProjectTitle}}</p>
	  		<p>项目描述:{{curProject.fundraiseProjectDesc}}</p>
		</div>
	  	<el-form :inline="true" :model="payMoney.form" class="demo-form-inline">
		  <el-form-item>
		    <el-input v-model="payMoney.form.money" placeholder="金额"></el-input>
		  </el-form-item>
		  <el-form-item>
		  	<el-date-picker
		      v-model="payMoney.form.time"
		      type="datetime"
		      placeholder="选择日期时间"
		      align="right"
		      :picker-options="pickerOptions">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="doPayMoney">打款</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="评论维护" v-model="commit.visible" size="large">
		<el-table
		    :data="commitList"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="time"
		      label="时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="评论者"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="reName"
		      label="被评论者"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="content"
		      label="评论内容"
		      width="400">
		    </el-table-column>
		    <el-table-column
		    	inline-template
		      label="操作">
		      <div>
		      	<el-button size="small" type="danger" @click="deletePost('')">删除</el-button>
		      </div>
		    </el-table-column>
		  </el-table>
	</el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"fundProject",
  	data(){
  		return {
  			commitList:[
  				{
  					name:"",
  					reName:"",
  					time:"",
  					content:""
  				}
  			],
  			editProject:{
  				disabled:false,
  				visible:false,
  				form:{
  					fundraiseProjectTitle:"",
  					fundraiseProjectDesc:""
  				},
  				rules:{
  					fundraiseProjectTitle:[
  						{ required: true, message: '请填写项目标题', trigger: 'change,blur' }
  					],
  					fundraiseProjectDesc:[
  						{ required: true, message: '请填写项目描述', trigger: 'change,blur' }
  					]
  				}
  			},
  			payMoney:{
  				disabled:false,
  				visible:false,
  				form:{
  					money:"",
  					time:""
  				}
  			},
  			onlineTxt:{
  				on:"在线预览",
  				off:"取消预览"
  			},
  			commit:{
  				disabled:false,
  				visible:false
  			},
  			online:false,
  			forceClose:false,
  			curProject:{
  				fundraiseProjectTitle:"项目标题",
  				fundraiseProjectDesc:"项目描述"
  			},
  			tableData:[
  				{
  					fundraiseProjectPitle:"项目标题",
  					fundraiseProjectDesc:"项目描述"
  				}
  			],
  			pickerOptions: {
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              picker.$emit('pick', new Date());
	            }
	          }, {
	            text: '昨天',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24);
	              picker.$emit('pick', date);
	            }
	          }, {
	            text: '一周前',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', date);
	            }
	          }]
	        }

  		}
  	},
    methods: {
    	showChangeHandle(type){
    		this[type].visible = true;
    	},
    	doPayMoney(){

    	},
    	changeStatus(type){
    		this[type] = !this[type]
    	},
    	deletePost(url,id,type){
    		console.log(url)
    		$MsgBox.confirm('此操作将删除该'+type+', 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          _this.ajax(this,{
	            url:url,
	            type:"post",
	            data:{
	              id:id
	            },
	            success:function(response){
	              	
	            }
	          })
	        }).catch(() => {
	          
	        });
    	},
    	postMyEdit(_form){
    		var _this = this;
    		console.log(this.$refs[_form] )
    		this.$refs[_form].validate((valid) => {
    			if(valid){
    				_this[_form].disabled = true;
    				_this.ajax(_this,{
    					url:"#",
    					type:"post",
    					data:_this[_form].form,
    					success:(res) => {
    						
    					},
    					complete:(res) => {
    						_this[_form].disabled = false;
    						_this[_form].visible = false;
    					}
    				})
    			}
    		})
    	}
    }
}
</script>
<style>
	.fundAppList {

	}
</style>