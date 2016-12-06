<template>
    <div class="founderComments">
      <h2 style="padding-top:20px;font-size:32px">查看话题评论列表</h2>
      <div class="founderTab" style="padding:30px 30px 60px 30px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="founderName"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            inline-template
            prop="type"
            label="类型"
            width="120">
            <span>{{row.type==1?'视频':'音频'}}</span>
          </el-table-column>
          <el-table-column
            prop="founderTitle"
            label="创始人标题"
            width="320">
          </el-table-column>
          <el-table-column
            prop="title"
            label="互动标题"
            width="320">
          </el-table-column>
          <el-table-column
            prop="contentWord"
            label="文字内容"
            width="520">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="时间"
            width="220">
          </el-table-column>
          <el-table-column
            inline-template
            :context="_self"
            fixed="right"
            label="操作"
            width="140">
          <span>
            <el-button @click="handleClick(row)" type="primary" size="small">查看评论</el-button>
          </span>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="founderComments_paging" style="padding-bottom:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElement" v-if="totalPages>1">
        </el-pagination>
      </div>

      <!--评论回复列表-->
      <div class="founder-comments-replay">
        <el-dialog :title="dialogtitle" v-model="dialogVisible" size="tiny">
            <div class="founderGroup">
              <div class="noComments" v-if="commentsTotalElement==0" style="text-align:center">暂无数据</div>
              <div class="founderItem" v-for="item in founderComment" style="border-bottom:1px solid #dddddd;padding-bottom:30px;margin-bottom:40px">
                <div class="comments">
                  <el-row>
                    <el-col :span="2" :offset="1" style="font-size:18px; color:#20A0FF" >评论：</el-col>
                    <el-col :span="14"><span style="color:#333333;font-weight:600">{{item.nickName}}：</span>{{item.commentContent}}</el-col>
                    <el-col :span="3" :offset="1" v-if="item.status==0"><el-button type="primary" @click="handleCheck(item.id,1)">审核通过</el-button></el-col>
                    <el-col :span="3" v-if="item.status==0"><el-button type="primary" @click="handleCheck(item.id,2)">审核不通过</el-button></el-col>
                    <el-col :span="3" :offset="4" v-if="item.status==1"><el-button type="primary" :disabled="true">已审核通过</el-button></el-col>
                    <el-col :span="3" :offset="4" v-if="item.status==2"><el-button type="primary" :disabled="true">已审核不通过</el-button></el-col>
                  </el-row>
                </div>
                <div class="replay" v-for="(replay,index) in JSON.parse(item.commentReply)">
                  <el-row style="padding-top:10px">
                    <el-col :span="2" :offset="1" style="font-size:18px; color:#20A0FF" v-if="index==0">回复：</el-col>
                    <el-col :span="2" :offset="1" style="font-size:18px; color:#20A0FF; opacity:0" v-if="index!=0">回复：</el-col>
                    <el-col :span="17" :offset="1"><span style="color:#333333;font-weight:600">{{replay.userNickname}}：</span>{{replay.replyContent}}</el-col>
                  </el-row>
                </div>
              </div>
              <div class="founderComments_paging" style="padding-bottom:20px" v-if="commentsCurrentPageSize>1">
                <el-pagination
                  @size-change="handleCommentsSizeChange"
                  @current-change="handleCommentsCurrentChange"
                  :current-page="commentsCurrentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="commentsCurrentPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="commentsTotalElement" v-if="commentsTotalPages>1">
                </el-pagination>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
        let self=this;
        this.ajax(this,{
          url:api.getFounderData,
          type:"get",
          data:{
            page:self.currentPage-1,
            size:self.currentPageSize
          },
          success:function(data){
            let _data = data.body.data;
                self.tableData = _data.content
                self.totalElement = _data.totalElements
                self.totalPages = _data.totalPages
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
      //点击查看
      handleClick(row) {
       this.dialogVisible = true;
       this.dialogtitle = '创始人标题：'+row.founderTitle;
       this.dialogRow=row;
       let self=this;
        this.ajax(this,{
          url:api.getFounderCommentsLook,
          type:"get",
          data:{
            page:self.commentsCurrentPage-1,
            size:self.commentsCurrentPageSize,
            interactionId:row.id
          },
          success:function(data){
            let _data = data.body.data;
            self.founderComment = _data.content
            self.commentsTotalElement = _data.totalElements
            self.commentsTotalPages = _data.totalPages

          }
        })

      },
      //话题选多少条一页
      handleSizeChange(val) {
       this.currentPageSize=val;
       this.currentPage=1;
       this.getUserData();
       console.log(val)
      },
      //话题当前多少页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserData();
      },
      //评论选多少条一页
      handleCommentsSizeChange(val) {
       let row=this.dialogRow;
       this.commentsCurrentPageSize=val;
       this.commentsCurrentPage=1;
       this.handleClick(row);
       console.log(val)
      },
      //评论当前多少页
      handleCommentsCurrentChange(val) {
        let row=this.dialogRow;
        this.commentsCurrentPage = val;
         this.handleClick(row);
      },
      //审核
      handleCheck(id,commentsStatus){
      var self=this;
       $MsgBox.confirm('此操作将审核该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.ajax(self,{
          url:api.getFounderCommentsCheck,
          type:"post",
          data:{
            commentId:id,
            status:commentsStatus
          },
          success:function(data){
            let row=self.dialogRow;
            self.handleClick(row);
            console.log(data)

          }
        })
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消审核'
          });
        });
      }
    },
    data(){
        return{
           currentPage:1,
           currentPageSize:10,
           totalElement:40,
           totalPages:1,
           commentsCurrentPage:1,
           commentsCurrentPageSize:10,
           commentsTotalElement:40,
           commentsTotalPages:1,
           formInline: {
           user: '',
           region: '',
           cont:''
           },
          tableData:[],
          multipleSelection: [],
          dialogVisible: false,
          dialogtitle:'',
          founderComment:[],
          commentRelay:[],
          dialogRow:{}
        }
    }
 }

</script>
<style>
  .founderComments .founderTab .cell{text-align:center}
  .founderComments .el-dialog--tiny{width:60%}
  .founderComments .el-dialog__body{text-align:left}
</style>
