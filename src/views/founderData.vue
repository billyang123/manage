<template>
    <div class="founderData" style="padding:20px;">
        <h2>话题数据汇总</h2>
        <el-table :data="tableData" border height="700" style="width: 100%">
          <el-table-column label="总数">
            <el-table-column label="创始人头像" width="120" inline-template>
              <span><img :src="row.founderHeadImg" style="width:80px; height:80px;border-radius:100%"></span>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80" inline-template>
            <span>{{row.type==1?'视频':'音频'}}</span>
            </el-table-column>
            <el-table-column prop="founderTitle" label="话题标题">
            </el-table-column>
          </el-table-column>
            <el-table-column :label="founderData.enjoyNumber+''">
              <el-table-column prop="enjoyNumber" label="播放次数" width="180">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="founderData.clickNumber+''">
              <el-table-column prop="clickNumber" label="点击次数" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="founderData.shareNumber+''">
              <el-table-column prop="shareNumber" label="分享次数" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="founderData.shareClickNumber+''">
              <el-table-column prop="shareClickNumber" label="从分享进入次数" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="founderData.praiseNumber+''">
              <el-table-column prop="praiseNumber" label="点赞数量" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="founderData.commentNumber+''">
              <el-table-column prop="commentNumber" label="评论数量" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
            </el-table-column>
        </el-table>
        <div class="block" style="padding-top:30px;padding-bottom:40px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[30, 50, 100, 200]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
          </el-pagination>
        </div>
    </div>
</template>
<style>

</style>
<script>
import api from '../api/api'

export
default {
    created() {
        this.getUserData();
    },

    methods:{
        //话题列表
        getUserData() {
            let self=this;
            this.ajax(this,{
              url:api.getFounderDataLook,
              type:"get",
              data:{
                page:self.currentPage-1,
                size:self.currentPageSize
              },
              success:function(data){
                let _data = data.body.data.founderInteractions;
                    if(data.body.data){
                       self.tableData = _data.content
                      self.totalElement = _data.totalElements
                      self.totalPages = _data.totalPages
                      self.founderData=data.body.data
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
        }
    },
    data() {
        return {
            founderData:{},
            tableData: [],
            currentPage:1,
            currentPageSize:30,
            totalElement:1,
            totalPages:1
        }
    },

}
</script>
<style>
  .founderData .cell{text-align:center}
</style>
