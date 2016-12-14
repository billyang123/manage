<template>
 <div class="fundAppList" style="padding:20px">
   <h2>爱心筹申请列表</h2>
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="patientName"
        label="患者姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="linkmanName"
        label="联系人姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="linkmanPhone"
        label="联系人电话"
        width="160">
      </el-table-column>
	    <el-table-column
	      prop="fundraiseProjectTitle"
	      label="筹款项目标题">
	    </el-table-column>
      <el-table-column
        prop="fundraiseProjectDesc"
        label="筹款项目描述">
      </el-table-column>
	    <el-table-column
	      prop="fundraiseTargetAmount"
	      label="目标筹款金额"
        width="130">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作"
        width="220">
	      <div>
          <el-button :plain="true" type="info" @click="handlePass(row.id)" v-if="row.status=='new'">通过</el-button>
          <el-button :plain="true" type="danger" @click="handleNoPass(row.id)" v-if="row.status=='new'">不通过</el-button>
          <!--<el-button :plain="true" type="danger" @click="handleNoPass(row.id)" v-if="row.status=='reject'" :disabled="true">不通过</el-button>-->
	      </div>
	    </el-table-column>
	  </el-table>
	  <!-- Form -->
	<el-dialog title="爱心筹申请" v-model="dialogFormVisible" size="tiny">
	  <el-form :model="statusForm" :rules="rules" ref="fundAppListForm">
	    <el-form-item label="理由" label-width="80px" prop="textarea">
	      <el-input type="textarea" v-model="statusForm.textarea" auto-complete="off" placeholder="请输入理由"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="handleSure('no')" :disabled="disabled.no">确定</el-button>
	  </div>
	</el-dialog>

   <!--分页-->
   <div class="block" style="padding-top:30px;padding-bottom:40px">
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[30, 50, 100, 200]"
       :page-size="currentPageSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="totalElement"
       v-if="totalPages>1">
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
  		  currentPage:1,
  		  currentPageSize:30,
  		  totalPages:1,
  		  totalElement:1,
  		  tableData:[],
  			disabled:{
  				yes:false,
  				no:false
  			},
  			dialogFormVisible:false,
  			statusForm:{
  				textarea:"",
  				id:""
  			},
  			tableData:[],
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
            this.currentPageSize = val;
            this.currentPage = 1;
            this.getApplicationList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getApplicationList();
        },

      //获取筹款申请列表
      getApplicationList(){
        let self=this;
            self.ajax(self,{
              url:api.fundApplicationList,
              type:"get",
              data:{
                page:self.currentPage-1,
                size:self.currentPageSize,
                applicationStatus:"new"
              },
              success:function(response){
                console.log(response);
                let _data = response.body.data;
                    if(_data){
                       self.tableData = _data.content
                      self.totalElement = _data.totalElements
                      self.totalPages = _data.totalPages
                    }

              }
            })
      },
      //不通过
      handleNoPass(id){
        let self=this;
        this.dialogFormVisible = true;
        console.log(id)
    		this.statusForm={
  				textarea:"",
  				id:id
  			}

      },
      //通过
      handlePass(id){
        let self=this;
        $MsgBox.confirm('此操作将通过该申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
          self.ajax(self,{
            url:api.fundApplicationhandle,
            type:"post",
            data:{
              applicationStatus:"approved",
              applicationId:id,
              suggestion:''
            },
            success:function(response){
            self.$router.push({ path: 'projectDetail/'+id})
            self.getApplicationList()

            }
          })
          }).catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消通过'
                });
            });
      },
      //审核
    	showChangeHandle(id){
    		this.dialogFormVisible = true;
    		this.statusForm={
  				textarea:"",
  				id:id
  			}
    	},
    	//确定
    	handleSure(type){
    		var _this = this;
    		var _data={
  				applicationStatus:"reject",
  				applicationId:_this.statusForm.id,
  				suggestion:_this.statusForm.textarea
  			}
    		this.$refs.fundAppListForm.validate((valid) => {
    			if(valid){
    				_this.disabled[type] = true;
    				_this.ajax(_this,{
    					url:api.fundApplicationhandle,
    					type:"post",
    					data:_data,
    					success:(res) => {
    						_this.dialogFormVisible = false;
    						_this.getApplicationList();
    					},
    					complete:(res) => {
    						_this.disabled[type] = false;
    					}
    				})
    			}else{
             return false
          }
    		})
    	}
    },
    created() {
        this.getApplicationList();
    }
}
</script>
<style>
	.fundAppList {

	}
	.fundAppList .cell{text-align:center}
</style>
