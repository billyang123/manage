<template>
 <div class="loveAmbList" style="padding:20px">
   <h2>爱心大使列表</h2>
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="userNickname"
	      label="爱心大使昵称">
	    </el-table-column>
      <el-table-column
        prop="userPhone"
        label="爱心大使手机号">
      </el-table-column>
	    <el-table-column
        inline-template
        prop="userHeadimgurl"
	      label="爱心大使头像">
        <span><img :src="row.userHeadimgurl" style="width:80px;height:80px;border-radius:100%"></span>
	    </el-table-column>
	    <el-table-column
	      prop="userCreateTime"
	      label="创建时间">
	    </el-table-column>
      <el-table-column
        inline-template
        label="操作"
        width="160">
        <div>
          <el-button :plain="true" type="danger" @click="handleRemove(row.id,'normal')">撤销</el-button>
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
  			tableData:[],
  			//分页
  			page:{
  			  currentPage: 1,
          currentPageSize: 30,
          totalElement: 1,
          totalPages:1,
  			}
  		}
  	},
    methods: {
      getData(){
        let self=this;
            this.ajax(this,{
              url:api.fundGetVolunteerList,
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
      handleSizeChange(val) {
        this.page.currentPageSize = val;
        this.page.currentPage = 1;
        this.getData();
        },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getData();
        },
     //撤销认证
      handleRemove(volunteerId,flag){
        var self = this;
        $MsgBox.confirm('此操作将撤销该用户爱心大使, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              self.ajax(self,{
                  url:api.fundCancleVolunteer,
                  type:"post",
                  data:{
                    id:volunteerId,
                    userVolunteerFlag:flag
                  },
                  success:function(response){
                    let _data = response.body.data;
                    if(_data){
                       self.getData();
                    }
                 },
                  })
            }).catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消'
                });
            });
      }
    },
    created(){
      this.getData();
    }
}
</script>
<style>
	.loveAmbList .cell{text-align:center}
</style>
