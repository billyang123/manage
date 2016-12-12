<template>
 <div class="fundAppList">
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    
	    <el-table-column
	      prop="userNickname"
	      label="申请人昵称"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="patientName"
	      label="患者姓名"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseProjectTitle"
	      label="项目标题">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseProjectDuration"
	      label="筹款持续时间(天数)">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseHelpCount"
	      label="当前帮助人数">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseTargetAmount"
	      label="目标筹款金额">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseAcquiredAmount"
	      label="累计打款金额">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseDonationCount"
	      label="捐款次数">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseStartTime"
	      label="筹款开始时间">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseEndTime"
	      label="筹款结束时间">
	    </el-table-column>
	    <el-table-column
	      prop="fundraiseImgKey"
	      label="筹款图片key">
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="状态">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作">
	      <div>
	      	<el-button size="small" @click="showChangeHandle">审核</el-button>
	      </div>
	    </el-table-column>
	  </el-table>
	  <!-- Form -->
	<el-dialog title="审核" v-model="dialogFormVisible" size="tiny">
	  <el-form :model="statusForm" :rules="rules" ref="fundAppListForm">
	    <el-form-item label="理由" label-width="80px" prop="textarea">
	      <el-input type="textarea" v-model="statusForm.textarea" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="changeStatus('yes')" :disabled="disabled.yes">审核通过</el-button>
	    <el-button type="primary" @click="changeStatus('no')" :disabled="disabled.no">审核不通过</el-button>
	  </div>
	</el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"fundAppList",
  	data(){
  		return {
  			disabled:{
  				yes:false,
  				no:false
  			},
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:""
  			},
  			tableData:[
  				{
  					userNickname:"小虎",
  					createTime:"2016-12-12",
  					patientName:"患者姓名1",
  					fundraiseProjectTitle:"项目标题",
  					fundraiseProjectDuration:'筹款持续时间(天数)',
  					fundraiseHelpCount:'当前帮助人数',
  					fundraiseTargetAmount:'目标筹款金额',
  					fundraiseAcquiredAmount:'已获筹款金额',
  					fundraiseRemitAmount:'累计打款金额',
  					fundraiseDonationCount:'捐款次数',
  					fundraiseStartTime:'筹款开始时间',
  					fundraiseEndTime:'筹款结束时间',
  					fundraiseImgKey:'筹款图片key',
  					status:"状态"
  				}
  			],
  			rules:{
	    		textarea:[
	    			{ required: true, message: '请填写理由', trigger: 'change,blur' }
	    		]
	    	}
  		}
  	},
    methods: {
    	showChangeHandle(e){
    		this.dialogFormVisible = true;
    	},
    	changeStatus(type){
    		var _this = this;
    		this.$refs.fundAppListForm.validate((valid) => {
    			if(valid){
    				_this.disabled[type] = true;
    				_this.ajax(_this,{
    					url:"#",
    					type:"post",
    					success:(res) => {
    						_this.dialogFormVisible = false;
    					},
    					complete:(res) => {
    						_this.disabled[type] = false;
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