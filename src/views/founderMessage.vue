<template>
    <div class="founderMessage" style="padding-top:20px">
      <h2 style="padding-top:40px;color:#1D8CE0;font-size:30px;padding:0;margin:0;">创始人留言</h2>
      <el-tabs :active-name="activeName">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
      <!--<div class="founderMessageGroup">
        <div class="founderMessage_item" style="border-bottom:1px solid #dddddd;padding-bottom:10px;margin-left:50px;margin-right:50px">
          <el-row justify="center" type="flex">
            <el-col :span="20" >
              <div class="grid-content bg-purple-dark">
                <p style="font-size:16px;color:#333333;text-align:left;line-height:30px;">以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
              <p style="color:#666666">2016-12-01</p>
            </div></el-col>
            <el-col :span="4" :offset="8"><div class="grid-content bg-purple-light">
              <el-button type="primary">未采纳</el-button>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
              <el-button type="primary">已采纳</el-button>
            </div></el-col>
          </el-row>
        </div>
        <div class="founderMessage_item" style="border-bottom:1px solid #dddddd;padding-bottom:10px;margin-left:50px;margin-right:50px">
          <el-row justify="center" type="flex">
            <el-col :span="20" >
              <div class="grid-content bg-purple-dark">
                <p style="font-size:16px;color:#333333;text-align:left;line-height:30px;">以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
              <p style="color:#666666">2016-12-01</p>
            </div></el-col>
            <el-col :span="4" :offset="8"><div class="grid-content bg-purple-light">
              <el-button type="primary">未采纳</el-button>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
              <el-button type="primary">已采纳</el-button>
            </div></el-col>
          </el-row>
        </div>
        <div class="founderMessage_item" style="border-bottom:1px solid #dddddd;padding-bottom:10px;margin-left:50px;margin-right:50px">
          <el-row justify="center" type="flex">
            <el-col :span="20" >
              <div class="grid-content bg-purple-dark">
                <p style="font-size:16px;color:#333333;text-align:left;line-height:30px;">以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接以上我们讲到可以直接</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
              <p style="color:#666666">2016-12-01</p>
            </div></el-col>
            <el-col :span="4" :offset="8"><div class="grid-content bg-purple-light">
              <el-button type="primary">未采纳</el-button>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
              <el-button type="primary">已采纳</el-button>
            </div></el-col>
          </el-row>
        </div>
        <div class="block" style="margin-top:20px;padding-bottom:40px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 40, 60, 80]"
            :page-size="currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPageSize">
          </el-pagination>
        </div>
      </div>-->
    </div>
</template>
<script>

    export default{

            methods: {
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
          }
        },

        data(){
            return{
                msg:'hello vue',
                currentPage:1,
                currentPageSize:10,
                totalPageSize:500,
                activeName: 'first'
            }
        },

    }
</script>
