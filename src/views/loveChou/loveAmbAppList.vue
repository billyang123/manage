<template>
 <div class="volunteerApplyList" style="padding:20px">
   <h2>爱心大使申请列表</h2>

   <a href="manage/fundraise/exportVolunteerApplyExcel" class="applyExcel" target="_blank">导出excel</a>

   <!--<div class="volunteerApplyListSearch">
     <el-form :inline="true" :model="formInline" class="demo-form-inline">
       <el-form-item>
       <el-select v-model="formInline.region" placeholder="请选择">
         <el-option label="已处理" value="processed"></el-option>
         <el-option label="未处理" value="unprocessed"></el-option>
         <el-option label="全部" value="11"></el-option>
       </el-select>
     </el-form-item>
       <el-form-item>
       <el-button type="primary" @click="onSearch">查询</el-button>
     </el-form-item>
     </el-form>
   </div>-->
	  <el-table
	    :data="tableData"
	    border
      height="700"
	    style="width: 100%">
	    <el-table-column
	      prop="volunteerName"
	      label="申请人昵称">
	    </el-table-column>
      <el-table-column
        prop="volunteerPhone"
        label="申请人手机号">
      </el-table-column>
      <el-table-column
        prop="volunteerWechatAccount"
        label="申请人微信号">
      </el-table-column>
	    <el-table-column
        inline-template
        prop="processeStatus"
	      label="状态"
	      width="180">
        <span>{{fundraise[row.processeStatus]}}</span>
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="申请时间">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作"
        width="120">
	      <div>
          <el-button :plain="true" type="info" @click="handleProcessing(row.id)" v-if="row.processeStatus=='unprocessed'">处理</el-button>
          <el-button :plain="true" type="info" :disabled="true" v-if="row.processeStatus=='processed'">已处理</el-button>
	      </div>
	    </el-table-column>
	  </el-table>
   <!--分页-->
   <div class="block" style="padding-top:30px;padding-bottom:40px">
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="page.currentPage"
       :page-sizes="[30, 50, 100, 200]"
       :page-size="page.currentPageSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="page.totalElement"
       v-if="page.totalPages>1">
     </el-pagination>
   </div>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"fundAppList",
  	data(){
  		return {
  		  //分页
  		  page:{
  		    currentPage: 1,
          currentPageSize: 30,
          totalElement: 1,
          totalPages:1,
          processeStatus:""
  		  },
  		  fundraise:{
  		    "unprocessed":"未处理",
  		    "processed":"已处理",
  		  },
  			disabled:{
  				yes:false,
  				no:false
  			},
  			exportBl:false,
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:""
  			},
  			tableData:[],
  			//搜索数据
  			formInline: {
          region: ''
        },
        value: '',
  			rules:{
	    		textarea:[
	    			{ required: true, message: '请填写理由', trigger: 'change,blur' }
	    		]
	    	}
  		}
  	},
    methods: {
      //分页
      handleSizeChange(val) {
        this.page.currentPageSize = val;
        this.page.currentPage = 1;
        this.getData();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getData();
      },
      onSearch() {
        var self = this;
        console.log(self.formInline.region);
      },
      //导出excel表
      handleExport(){
        var self = this;
        self.exportBl = true;
              self.ajax(self,{
                  url:api.fundExportVolunteerApplyExcel,
                  type:"get",
                  success:function(response){
                    let _data = response.body.data;
                 },
                 complete:function(){
                  self.exportBl = false;
                 }
                  })
      },
      //处理
      handleProcessing(id){
        var self = this;
        $MsgBox.confirm('此操作将处理该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              self.ajax(self,{
                url:api.fundUpdateVolunteerApplyProcesseStatus,
                type:"post",
                data:{
                  id:id
                },
                success:function(response){
                 self.getData()

                }
              })
        }).catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消'
                });
            });
      },
      getData(){
      var self = this;
        self.ajax(self,{
          url:api.fundGetVolunteerApplyList,
          type:"get",
          data:{
            page:self.page.currentPage-1,
            size:self.page.currentPageSize,
            processeStatus:self.page.processeStatus
          },
          success:function(response){
            let _data = response.body.data;
            if(_data){
                self.tableData = _data.content
                self.page.totalElement = _data.totalElements
                self.page.totalPages = _data.totalPages
            }

          }
        })
      },
      //处理
    },
    created() {
      this.getData();
    },
}
</script>
<style>
	.volunteerApplyList .cell {text-align:center}
	.volunteerApplyList .applyExcel{
	  float:right;margin-bottom:10px;margin-right:10px;width:88px;height:36px;
	  color: rgb(255, 255, 255);
    background-color: rgb(32, 160, 255);
    border-color: rgb(32, 160, 255);
    border-radius:4px;
    text-decoration:initial;
    line-height:36px;
	}
</style>
