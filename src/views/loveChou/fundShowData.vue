<template>
 <div class="fundAppList">
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    
	    <el-table-column
	      prop="fundraiseProjectPitle"
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
	      	<el-button size="small">编辑</el-button>
	      	<el-button size="small">打款</el-button>
	      	<el-button size="small">上线预览</el-button>
	      	<el-button size="small">强制关闭</el-button>
	      	<el-button size="small">评论维护</el-button>
	      </div>
	    </el-table-column>
	  </el-table>
	  <!-- Form -->
	<el-dialog title="状态更新" v-model="dialogFormVisible" size="tiny">
	  <el-form :model="statusForm">
	    <el-form-item label="理由" :label-width="150">
	      <el-input type="textarea" v-model="statusForm.textarea" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="changeStatus">审核通过</el-button>
	    <el-button type="primary" @click="changeStatus">审核不通过</el-button>
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
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:""
  			},
  			tableData:[
  				{
  					fundraiseProjectPitle:"项目标题",
  					fundraiseProjectDesc:"项目描述"
  				}
  			]
  		}
  	},
    methods: {
    	showChangeHandle(e){
    		this.dialogFormVisible = true;
    	},
    	changeStatus(e){

    	}
    }
}
</script>
<style>
	.fundAppList {

	}
</style>