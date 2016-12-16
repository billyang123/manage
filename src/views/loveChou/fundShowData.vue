<template>
 <div class="fundShowData" style="padding:20px">
   <h2>筹款项目数据汇总</h2>
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
      <el-table-column label="总数">
        <el-table-column
          prop="patientName"
          label="患者姓名"
          width="180">
        </el-table-column>
        <el-table-column
          inline-template
          prop="status"
          label="状态"
          width="120">
          <span>{{fundraise[row.status]}}</span>
        </el-table-column>
        <el-table-column
          prop="fundraiseTargetAmount"
          label="目标金额"
          width="160">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseAcquiredAmount+''">
        <el-table-column
          prop="fundraiseAcquiredAmount"
          label="已筹金额"
          width="160">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseRemitAmount+''">
        <el-table-column
          prop="fundraiseRemitAmount"
          label="累计打款金额"
          width="180">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseShareCount+''">
        <el-table-column
            prop="fundraiseShareCount"
            label="分享次数"
            width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseShareOpenCount+''">
        <el-table-column
          prop="fundraiseShareOpenCount"
          label="从分享进入次数"
          width="160">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseDonationClickCount+''">
        <el-table-column
          prop="fundraiseDonationClickCount"
          label="点击捐款次数"
          width="160">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseDonationCount+''">
        <el-table-column
          prop="fundraiseDonationCount"
          label="捐款次数"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.fundraiseCommentCount+''">
        <el-table-column
          prop="fundraiseCommentCount"
          label="评论次数(包括回复)"
          width="180">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="totalNumber.openCount+''">
        <el-table-column
          prop="openCount"
          label="打开次数"
          width="180">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="fundraiseStartTime"
        label="筹款开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fundraiseEndTime"
        label="筹款结束时间"
        width="180">
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
          totalPages:1
  		  },
  		  fundraise:{
  		    "new":"申请中",
  		    "reject":"审核不通过",
  		    "approved":"审核通过",
  		    "view":"预览",
  		    "process":"筹款中",
  		    "finish":"筹款完成"
  		  },
  		  finishReason:{
  		    "attain":"达到筹款目标",
  		    "expires":"到期",
  		    "stop":"强制关闭"
  		  },
  		  totalNumber:{
  		    fundraiseHelpCount:'',
  		    fundraiseTargetAmount:'',
  		    fundraiseAcquiredAmount:'',
  		    fundraiseRemitAmount:'',
  		    fundraiseShareCount:'',
  		    fundraiseShareOpenCount:'',
  		    fundraiseDonationClickCount:'',
  		    fundraiseCommentCount:'',
  		    fundraiseDonationCount:'',
  		    openCount:''
  		  },
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:""
  			},
  			tableData:[]
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
    	showChangeHandle(e){
    		this.dialogFormVisible = true;
    	},
    	changeStatus(e){

    	},
    	getData(){
    	  let self=this;
          self.ajax(self,{
            url:api.fundGetFundraiseProjectDataList,
            type:"get",
            data:{
              page:self.page.currentPage-1,
              size:self.page.currentPageSize
            },
            success:function(response){
              let _data = response.body.data;
                  if(_data){
                     self.tableData = _data.fundraiseProjectDataList.content
                     self.totalNumber ={
                        fundraiseHelpCount:_data.fundraiseHelpCount,
                        fundraiseTargetAmount:_data.fundraiseTargetAmount,
                        fundraiseAcquiredAmount:_data.fundraiseAcquiredAmount,
                        fundraiseRemitAmount:_data.fundraiseRemitAmount,
                        fundraiseShareCount:_data.fundraiseShareCount,
                        fundraiseShareOpenCount:_data.fundraiseShareOpenCount,
                        fundraiseDonationClickCount:_data.fundraiseDonationClickCount,
                        fundraiseCommentCount:_data.fundraiseCommentCount,
                        fundraiseDonationCount:_data.fundraiseDonationCount,
                        openCount:_data.openCount
                     }
                    self.page.totalElement = _data.fundraiseProjectDataList.totalElements
                    self.page.totalPages = _data.fundraiseProjectDataList.totalPages
                  }

            }
          })
    	}
    },
    created() {
        this.getData();
    }
}
</script>
<style>
	.fundShowData .cell{text-align:center}
</style>
