<template>
 <div class="remitApplyList">
 	<h2>{{this.projectTitle}}-打款记录</h2>
 	<div class="options">
		<router-link :to="'/projectDetail/'+id">
	      	<el-button size="small">
		      		返回项目详情
	      	</el-button>
	    </router-link>
		<el-button size="small" :plain="true" type="info" @click="showChangeHandle('addPayRecordList')">新增记录</el-button>
	</div>
	<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    
	   <!--  <el-table-column
	      prop="applyAmount"
	      label="申请金额"
	      width="120">	
	    </el-table-column> -->
	    <el-table-column
	      prop="remitAmount"
	      label="打款金额（元）"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="remitTime"
	      label="打款时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      prop="status"
	      label="状态"
	      width="200">
			<span>{{status[row.status]}}</span>
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作">
	      <div>
	      	<el-button size="small" @click="showChangeHandle('editPayRecordList',row)" :plain="true" type="info">编辑 </el-button>
	      	<!--
	      	<el-button size="small">
		      		查看详情
	      	</el-button>
	      	</router-link> -->
	      </div>
	    </el-table-column>
	</el-table>
	 <div class="pagination-box">
		  <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page"
		      :page-sizes="[20, 40, 60, 80]"
		      :page-size="size"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		  </el-pagination>
	</div>
	<el-dialog title="添加打款记录" v-model="addPayRecordList.visible">
	  	<el-form :model="addPayRecordList.form" class="demo-form-inline" ref="addPayRecordList" :rules="addPayRecordList.rules">
		  <el-form-item label="打款金额（元）" :label-width="addPayRecordList.labelWidth" prop="remitAmount">
		    <el-input v-model.number="addPayRecordList.form.remitAmount"></el-input>
		  </el-form-item>

		  <el-form-item label="打款状态" :label-width="addPayRecordList.labelWidth">
		  	<div class="text-left">
		      	<el-radio class="radio" v-model="addPayRecordList.form.status" label="new">申请中</el-radio>
		      	<el-radio class="radio" v-model="addPayRecordList.form.status" label="success">打款完成</el-radio>
		      	<el-radio class="radio" v-model="addPayRecordList.form.status" label="fail">申请失败</el-radio>
		    </div>
		  </el-form-item>
		  <el-form-item label="打款时间" :label-width="addPayRecordList.labelWidth">
		  	<div class="text-left">
			  	<el-date-picker
			      v-model="addPayRecordList.form.remitTime"
			      type="datetime"
			      placeholder="选择日期时间"
			      align="right"
			      format="yyyy-MM-dd hh:mm:ss"
			      :picker-options="pickerOptions">
			    </el-date-picker>
		    </div>
		  </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="addPayRecordList.visible = false">取 消</el-button>
		    <el-button type="primary" @click="postMyEdit('addPayRecordList')" :disabled="addPayRecordList.disabled">保存</el-button>
		</div>
	</el-dialog>
	<el-dialog title="编辑打款记录" v-model="editPayRecordList.visible">
	  	<el-form :model="editPayRecordList.form" class="demo-form-inline" ref="editPayRecordList" :rules="editPayRecordList.rules">

		  <el-form-item label="打款金额" :label-width="editPayRecordList.labelWidth" prop="remitAmount">
		    <el-input v-model.number="editPayRecordList.form.remitAmount"></el-input>
		  </el-form-item>

		  <el-form-item label="打款状态" :label-width="editPayRecordList.labelWidth">
		  	<div class="text-left">
		  		<el-radio-group v-model="editPayRecordList.form.status">
				   	<el-radio class="radio" :label="'new'">申请中</el-radio>
			      	<el-radio class="radio" :label="'success'">打款完成</el-radio>
			      	<el-radio class="radio" :label="'fail'">申请失败</el-radio>
				</el-radio-group>
		    </div>
		  </el-form-item>
		  <el-form-item label="打款时间" :label-width="editPayRecordList.labelWidth">
		  	<div class="text-left">
			  	<el-date-picker
			      v-model="editPayRecordList.form.remitTime"
			      type="datetime"
			      placeholder="选择日期时间"
			      align="right"
			      :picker-options="pickerOptions">
			    </el-date-picker>
		    </div>
		  </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="editPayRecordList.visible = false">取 消</el-button>
		    <el-button type="primary" @click="postMyEdit('editPayRecordList')" :disabled="editPayRecordList.disabled">保存</el-button>
		</div>
	</el-dialog>
 </div>
</template>
<script>
import api from '../../api/api';
 export default {
  	name:"projectDetail",
  	data(){
  		var myNumber = (rule, value, callback) => {
	        if (!value) {
	          return callback(new Error('不能为空或不能为0'));
	        }
	        setTimeout(() => {
	          if (!Number.isInteger(value)) {
	            callback(new Error('请输入数字'));
	          } else {
	          	callback();
	          }
	        }, 1000);
	    };
  		return {
  			id:1,
  			page:1,
  			total:2,
  			size:20,
  			labelWidth:'150px',
  			status:{"new":"申请中","success":"打款完成","fail":"申请失败"},
  			tableData:[],
  			addPayRecordList:{
  				disabled:false,
  				visible:false,
  				labelWidth:'150px',
  				url:api.fund_addFundraiseRemit,
  				form:{
  					"id": 1,
		            "fundraiseUserInfoId": 1,
		            "fundraiseProjectId": 1,
		            "applyAmount": 0,
		            "remitAmount": "",
		            "createTime": (new Date()).format('yyyy-MM-dd hh:mm:ss'),
		            "remitTime": (new Date()).format('yyyy-MM-dd hh:mm:ss'),
		            "status": "new"
  				},
  				rules:{
		    		remitAmount:[
		    			//{ type: 'number', message: '请输入数字', trigger: 'change,blur' }
		    			{validator:myNumber,trigger: 'change,blur'}
		    		]
		    	}
  			},
  			editPayRecordList:{
  				disabled:false,
  				visible:false,
  				labelWidth:'150px',
  				url:api.fund_updateFundraiseRemit,
  				form:{
  					"id": 1,
		            "fundraiseUserInfoId": 1,
		            "fundraiseProjectId": 1,
		            "applyAmount": 2000,
		            "remitAmount": 2000,
		            "createTime": (new Date()).format('yyyy-MM-dd HH:mm:ss'),
		            "remitTime": (new Date()).format('yyyy-MM-dd HH:mm:ss'),
		            "status": "new"
  				},
  				rules:{
		    		remitAmount:[
		    			{ type: 'number', message: '请输入数字', trigger: 'change,blur' }
		    		]
		    	}
  			},
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
    	handleSizeChange(val){
    		this.size = val;
    		this.getPayList();
    	},
    	handleCurrentChange(val){
    		this.page = val;
    		this.getPayList();
    	},
    	showChangeHandle(type,row){
    		this[type].visible = true;
    		if(type == "editPayRecordList"){
    			this[type].form = row;
    			this[type].form.remitTime = this[type].form.remitTime || (new Date()).format('yyyy-MM-dd HH:mm:ss');
    			//this.editPayRecordList.form.remitAmount = this.editPayRecordList.form.remitAmount+"";
    		}
    		if(type == "addPayRecordList"){
    			this[type].form.id = "";
    			this[type].form.fundraiseUserInfoId = this.$route.query.fundraiseUserInfoId;
		        this[type].form.fundraiseProjectId = this.$route.query.fundraiseProjectId;
		        //this.addPayRecordList.form.remitAmount = this.addPayRecordList.form.remitAmount+"";
    		}
    	},
    	getPayList(){
    		var _this = this;
    		///fund_getRemitApplyByFundIdList
    		this.ajax(this,{
				url:api.fund_getRemitApplyByFundIdList,
				type:"get",
				data:{
					id:this.id,
					page:this.page-1,
					size:this.size
				},
				success:(res) => {
					//console.log(res)
					_this.tableData = res.body.data.content;
					_this.total = res.body.data.totalElements
				},
				complete:(res) => {
					
				}
			})
    	},
    	postMyEdit(_form,cbName){
    		var _this = this;
    		//console.log(this.$refs[_form] )
    		var data = {};
    		
    		data ={
    			"id": this[_form].form.id,
	            "fundraiseUserInfoId": this[_form].form.fundraiseUserInfoId,
	            "fundraiseProjectId": this[_form].form.fundraiseProjectId,
	            "applyAmount": this[_form].form.applyAmount,
	            "remitAmount": this[_form].form.remitAmount,
	            "remitTime":(new Date(this[_form].form.remitTime)).format('yyyy-MM-dd HH:mm:ss'),
	            "status": this[_form].form.status
    		}

    		this.$refs[_form].validate((valid) => {
    			if(valid){
    				_this[_form].disabled = true;
    				_this.ajax(_this,{
    					url:_this[_form].url,
    					type:"post",
    					data:data,
    					success:(res) => {
    						_this[cbName] && _this[cbName](res);
    						$Message({
	                            type: 'success',
	                            message: "保存成功！"
	                        });
    						_this.getPayList();
    					},
    					complete:(res) => {
    						_this[_form].disabled = false;
    						_this[_form].visible = false;
    					}
    				})
    			}
    		})
    	}
    },
    created(){
    	this.id = this.$route.params.id;
    	this.projectTitle = this.$route.query.name
    	this.getPayList();
    }
}
</script>
<style lang="less">
	.remitApplyList {
		padding: 20px;
		.text-left {
			text-align: left;
		}
		.options {
			padding: 10px;
			text-align: right;
		}
		.uploadTarget {
			width: 125px;
			height: 125px;
			border: 1px dashed #ddd;
		}
	}
</style>