<template>
    <div class="founderMessage" style="padding:20px">
        <h2>留言管理</h2>
        <el-table
          :data="founderMessage"
          border
          style="width: 100%">
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="messageContent"
            label="留言内容">
          </el-table-column>
          <el-table-column
            inline-template
            :context="_self"
            fixed="right"
            label="操作"
            width="180">
        <span>
         <el-button :plain="true" type="info" @click="handleCheck(row.id,2)" v-if="row.messageStatus==0">采纳</el-button>
         <el-button :plain="true" type="info" @click="handleCheck(row.id,1)" v-if="row.messageStatus==0">不采纳</el-button>
         <el-button :plain="true" type="info" :disabled="true" @click="handleCheck(row.id,2)" v-if="row.messageStatus==1">不采纳</el-button>
         <el-button :plain="true" type="info" :disabled="true" @click="handleCheck(row.id)" v-if="row.messageStatus==2">已采纳</el-button>
        </span>
          </el-table-column>
        </el-table>





        <!--<el-tabs :active-name="activeName">
            <el-tab-pane label="全部" name="first">
              <el-row>
                <el-col :span="24">
                <div class="founderMessageGroup">
                    <div v-for="item in founderMessage" class="founderMessage_item" style="border-bottom:1px solid #dddddd;padding-bottom:10px;margin-left:50px;margin-right:50px">
                        <el-row justify="center" type="flex">
                            <el-col :span="20">
                                <div class="grid-content bg-purple-dark">
                                    <p style="font-size:16px;color:#333333;text-align:left;line-height:30px;">{{item.messageContent}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <p style="color:#666666">{{item.createTime}}</p>
                                </div>
                            </el-col>
                            <el-col :span="4" :offset="4" v-if="item.messageStatus==0">
                                <div class="grid-content bg-purple-light">
                                    <el-button type="primary" @click="handleCheck(item.id,2)">采纳</el-button>
                                </div>
                            </el-col>
                            <el-col :span="4" v-if="item.messageStatus==0">
                              <div class="grid-content bg-purple-light">
                                <el-button type="primary" @click="handleCheck(item.id,1)">不采纳</el-button>
                              </div>
                            </el-col>
                            <el-col :span="4" :offset="8" v-if="item.messageStatus==1">
                              <div class="grid-content bg-purple-light">
                                <el-button type="primary" :disabled="true" @click="handleCheck(item.id,2)">不采纳</el-button>
                              </div>
                            </el-col>
                            <el-col :span="4" :offset="8" v-if="item.messageStatus==2">
                            <div class="grid-content bg-purple-light">
                              <el-button type="primary" :disabled="true" @click="handleCheck(item.id)">已采纳</el-button>
                            </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">
                                    <el-button type="danger" @click="handleDel(item.id)">删除</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                </el-col>
              </el-row>
            </el-tab-pane>
        </el-tabs>-->
        <div class="block" style="margin-top:20px;padding-bottom:40px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[30, 50, 100, 200]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
            </el-pagination>
        </div>

    </div>
</template>
<script>
import api from '../api/api'
export
default {
    created() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            var self = this;
            this.ajax(this,{
              url:api.getFounderMessage,
              type:"get",
              data:{
                page:self.currentPage-1,
                size:self.currentPageSize
              },
              success:function(data){
                let _data = data.body.data;
                  if(_data){
                    self.founderMessage = _data.content
                    self.totalElement = _data.totalElements
                    self.totalPages = _data.totalPages
                  }
              }
            })

        },
        handleSizeChange(val) {
            this.currentPageSize = val;
            this.currentPage = 1;
            this.getUserData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserData();
        },

        //采纳
        handleCheck(id, messageStatus) {
            var self = this;
            $MsgBox.confirm('此操作将采纳或不采纳, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 self.ajax(self,{
                    url:api.getFounderMessageCheck,
                    type:"post",
                    data:{
                        messageId: id,
                        status:messageStatus
                    },
                    success:function(data){
                      self.getUserData();
                        $Message({
                            type: 'success',
                            message: '成功!'
                        });
                    }
                  })


            }).
            catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //删除
        handleDel(id) {
            var self = this;
            $MsgBox.confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.ajax(self,{
                    url:api.getFounderMessageDel,
                    type:"post",
                    data:{
                        messageId: id,
                    },
                    success:function(data){
                      self.getUserData();
                        $Message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                  })

            }).
            catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消发布'
                });
            });
        },
    },

    data() {
        return {
            msg: 'hello vue',
            currentPage: 1,
            messageStatus:[
              {n:0,t:'未处理',b:false},
              {n:1,t:'未采纳',b:false},
              {n:2,t:'已采纳',b:true}
            ],
            currentPageSize: 30,
            totalElement: 1,
            activeName: 'first',
            founderMessage: [],
            messageBl: false,
            totalPages:1
        }
    },

}
</script>
<style>
  .founderMessage .el-tabs{display:block}
  .founderMessage .cell{text-align:center}
  .founderMessage .el-button+.el-button{margin-left:0}
</style>
