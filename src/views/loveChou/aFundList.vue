<template>
 <div class="aFundList" style="padding:20px">
   <h2>申请款项列表</h2>
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="fundraiseProjectTitle"
	      label="项目名称">
	    </el-table-column>
	    <el-table-column
	      prop="acturalPatientName"
	      label="患者姓名"
	      width="140">
	    </el-table-column>
	    <el-table-column
	      prop="applyAmount"
	      label="申请筹款金额"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      prop="remitAmount"
	      label="累计打款金额"
        width="160">
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
        width="160">
        <span>{{aFundListStatus[row.status]}}</span>
	    </el-table-column>
	  </el-table>
	  <!-- Form -->
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
  	name:"aFundList",
  	data(){
  		return {
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:""
  			},
  			tableData:[],
  			page:{
  			  currentPage:1,
  		    currentPageSize:30,
  		    totalPages:1,
  		    totalElement:1,
  			},
  			aFundListStatus:{
  			  "new":"申请中",
  			  "success":"打款成功",
  			  "fail":"申请失败"
  			}
  		}
  	},
    methods: {
      getData(){
        let self=this;
            this.ajax(this,{
              url:api.fundGetFundRemitTotalList,
              type:"get",
              data:{
                page:self.page.currentPage-1,
                size:self.page.currentPageSize
              },
              success:function(data){
                let _data = data.body.data;
                if(_data){
                    self.tableData = _data.content
                    self.page.totalElement = _data.totalElements
                    self.page.totalPages = _data.totalPages
                }

              }
            })
      },
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
    },
    created() {
        this.getData();
    }
}
</script>
<style>
	.aFundList .cell{
	  text-align:center
	}
</style>
