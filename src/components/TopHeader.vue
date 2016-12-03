<template>
  <div class="header">
    <div class="header-menu">
      <el-row :gutter="20">
        <el-col :span="19">
          <h3 class="hd-title">17互助管理后台</h3>
        </el-col>
        <el-col :span="5">
          <el-menu theme="dark" class="el-menu-right" mode="horizontal">
            <el-menu-item index="1"><span @click="logout">退出</span></el-menu-item>
          </el-menu>
        </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopHeader',
  data(){
    return {
      isLogin:false
    }
  },
  methods: {
    logout(){
      var _this = this;
      var id = sessionStorage.getItem('userId')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      _this.$router.push('/login')
      // this.$http.post(api.logout, {userId:id}).then((response) => {
      //   if(response.body.status == 0){
      //     sessionStorage.removeItem('userId')
      //     sessionStorage.removeItem('userName')
      //     _this.$router.push('/login')
      //   }else{
      //     MessageBox.alert(response.body.msg)
      //   }
      // }, (response) => {
      //   // error callback
      // });
    }
  }
}
</script>
<style>
  .hd-title {
    color: #fff;
    height: 60px;
    line-height: 60px;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  .header-menu {
    width: 1140px;
    margin: 0 auto;
  }
  .el-menu-right .el-menu-item{
    float:right; 
  }
  .header {
    background-color: #324057;
    margin-bottom: 20px;
  }
</style>