<template>
    <div class="founderMessage" style="padding-top:20px">
        <h2 style="padding-top:40px;color:#1D8CE0;font-size:30px;padding:0;margin:0;">创始人留言</h2>
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
                            <el-col :span="4" :offset="8">
                                <div class="grid-content bg-purple-light">
                                    <el-button type="primary" :disabled="item.messageStatus==0?false:true" @click="handleCheck(item.id,item.messageStatus)">{{item.messageStatus==0?'采纳':'已采纳'}}</el-button>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElement">
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
            this.$http.get(api.getFounderMessage + '?page=' + (this.currentPage - 1) + '&size=' + this.currentPageSize).then((data) => {
                console.log(data)
                if (data.body.status == 0) {
                    var _data = data.body.data;
                    self.founderMessage = _data.content
                    self.totalElement = data.body.data.totalElements
                }
            })
        },
        handleSizeChange(val) {
            this.currentPageSize = val;
            this.currentPage = 0;
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
            $MsgBox.confirm('此操作将同意审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$http.post(api.getFounderMessageCheck, {
                    messageId: id,
                    status: messageStatus
                }, {
                    emulateJSON: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then((data) => {
                    if (data.body.status == 0) {
                        self.getUserData();
                        $Message({
                            type: 'success',
                            message: '审核成功!'
                        });
                    } else {
                        $MsgBox.alert(data.body.msg)
                    }
                }, (response) => {
                    // error callback
                });
            }).
            catch (() => {
                $Message({
                    type: 'info',
                    message: '已取消审核'
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
                self.$http.post(api.getFounderMessageDel, {
                    messageId: id
                }, {
                    emulateJSON: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then((data) => {
                    if (data.body.status == 0) {
                        console.log(data)
                        self.getUserData();
                        $Message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        $MsgBox.alert(data.body.msg)
                    }
                }, (response) => {
                    // error callback
                });
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
            currentPageSize: 10,
            totalElement: 40,
            activeName: 'first',
            founderMessage: [],
            messageBl: false
        }
    },

}
</script>
