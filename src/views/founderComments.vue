<template>
    <div class="founderComments">
      <h2 style="padding-top:20px">评论列表</h2>
      <div class="founderSearch" style="padding-top:30px">
        <el-row>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
            <el-col :span="6">
              <el-form-item label="用户昵称：">
                <el-input v-model="formInline.user" placeholder="用户昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评论内容：">
                <el-input v-model="formInline.cont" placeholder="评论内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评论状态：">
                <el-select v-model="formInline.region" placeholder="评论状态">
                  <el-option label="未审核" value="0"></el-option>
                  <el-option label="审核通过" value="1"></el-option>
                  <el-option label="不允许显示" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="fonderBtn" style="padding-top:30px">
        <el-row>
          <span class="wrapper">
            <el-col :span="3">
              <el-button type="info" @click="handleCheck()">审核通过</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="info" @click="handleCheck()">审核不通过</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="danger" @click="handleDel()">删除</el-button>
            </el-col>
          </span>
        </el-row>
      </div>
      <div class="founderTab" style="padding-top:30px;padding-bottom:60px">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            fixed
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            inline-template
            label="评论ID"
            width="120">
            <div>{{ row.id }}</div>
          </el-table-column>
          <el-table-column
            prop="userInfoId"
            label="用户昵称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="messageContent"
            label="评论内容"
            width="420">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="时间"
            width="220">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="状态"
            width="120"
            inline-template>
            <el-tag type="primary">{{row.messageStatus==0?'未审核':'审核通过'}}</el-tag>
          </el-table-column>

        </el-table>
      </div>
      <div class="founderComments_paging" style="padding-bottom:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElement">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import api from '../api/api'

    export default{
     created(){
      this.getUserData();
      },
     methods: {
     //获取列表
     getUserData(){
      var self=this;
      this.$http.get(api.getFounderComments+'?page='+(this.currentPage-1)+'&size='+this.currentPageSize).then((data) => {
        console.log(data)
        if(data.body.status == 0){
        var _data=data.body.data;
        self.tableData =_data.content
        self.totalElement=data.body.data.totalElements
        console.log(self.tableData)
        }
      })
      },
      onSubmit() {
        console.log('submit!');
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //评论选多少条一页
      handleSizeChange(val) {
       this.currentPageSize=val;
       this.currentPage=0;
       this.getUserData();
      },
      //评论当前多少页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserData();
        console.log(`当前页: ${val}`);
        console.log('页'+this.currentPage);
      },
      //审核
      handleCheck(commentsStatus){
      var id='';
      var messageStatus;
      for(var i=0;i<this.multipleSelection.length;i++){
      //id.push(this.multipleSelection[i].id)
      id=this.multipleSelection[i].id;
      console.log(id)
      messageStatus=this.multipleSelection[i].messageStatus;
      }
      var self=this;
       $MsgBox.confirm('此操作将审核该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(api.getFounderCommentsCheck, {
					commentId:id,
					status:commentsStatus
				},{
	            emulateJSON: true,
					    headers:{"Content-Type":"application/x-www-form-urlencoded"}
	        }).then((data) => {
					if(data.body.status == 0){
						self.getUserData();
						$Message({
				            type: 'success',
				            message: '审核成功!'
				        });
					}else{
						$MsgBox.alert(data.body.msg)
					}
				}, (data) => {
				// error callback
				});
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消审核'
          });
        });
      },
      handleDel(){
      var id;
      for(var i=0;i<this.multipleSelection.length;i++){
      console.log(this.multipleSelection[i].id)
      //id.push(this.multipleSelection[i].id)
      id=this.multipleSelection[i].id
      }
      var self=this;
       $MsgBox.confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(api.getFounderCommentsDel, {
					commentId:id
				},{
	            emulateJSON: true,
					    headers:{"Content-Type":"application/x-www-form-urlencoded"}
	        }).then((data) => {
					if(data.body.status == 0){
						self.getUserData();
						$Message({
				            type: 'success',
				            message: '删除成功!'
				        });
					}else{
						$MsgBox.alert(data.body.msg)
					}
				}, (response) => {
				// error callback
				});
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消发布'
          });
        });
      },
    },
    data(){
        return{
           currentPage:0,
           currentPageSize:10,
           totalElement:40,
           formInline: {
           user: '',
           region: '',
           cont:''
           },
          tableData:[],
          multipleSelection: []
        }
    }
 }

</script>
<style>
</style>
