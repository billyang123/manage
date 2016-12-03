<template>
    <div class="founderMessage">
      <h2 style="padding-top:40px;color:#1D8CE0;font-size:30px">创始人留言</h2>
      <div class="founderMessageGroup">
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
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 40, 60, 80]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
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
                currentPage1:4
            }
        },

    }
</script>
