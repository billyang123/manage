<template>
    <div class="founderMessage" style="padding:20px">
        <h2 style="padding-top:40px;font-size:32px;padding:0;margin:0;">创始人留言</h2>
        <el-tabs :active-name="activeName">
            <el-tab-pane label="全部" name="first">
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
            </el-tab-pane>
            <!-- <el-tab-pane label="已采纳" name="second">22</el-tab-pane>
        <el-tab-pane label="未采纳" name="third">33</el-tab-pane>-->
        </el-tabs>
        <div class="block" style="margin-top:20px;padding-bottom:40px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
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
                    self.founderMessage = _data.content
                    self.totalElement = _data.totalElements
                    self.totalPages = _data.totalPages
              }
            })

        },
        handleSizeChange(val) {
            this.currentPageSize = val;
            this.currentPage = 1;
            this.getUserData();
            console.log(val)
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserData();
        },

        //采纳
        handleCheck(id, messageStatus) {
            console.log(messageStatus)
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
            currentPage: 0,
            messageStatus:[
              {n:0,t:'未处理',b:false},
              {n:1,t:'未采纳',b:false},
              {n:2,t:'已采纳',b:true}
            ],
            currentPageSize: 10,
            totalElement: 40,
            activeName: 'first',
            founderMessage: [],
            messageBl: false,
            totalPages:1
        }
    },

}
</script>
