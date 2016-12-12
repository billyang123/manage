<template>
  <div class="header">
    <div class="header-menu">
      <el-row :gutter="20">
        <el-col :span="19">
          <h3 class="hd-title">17互助管理后台</h3>
        </el-col>
        <el-col :span="5">
          <!--<el-menu theme="dark" class="el-menu-right" mode="horizontal">
            <el-menu-item index="1"><span @click="logout">退出</span></el-menu-item>
          </el-menu>-->
          <el-menu theme="dark" class="el-menu-right" mode="horizontal">
            <el-submenu index="2">
              <template slot="title">{{userName}}</template>
              <el-menu-item index="2-1"><span @click="handlePassWord" style="display:block">修改密码</span></el-menu-item>
              <el-menu-item index="2-2"><span @click="logout" style="display:block">退出</span></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
    </div>

    <!--修改密码-->
    <el-dialog title="修改密码" v-model="dialogPassWordVisible" size="tiny">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model.trim="ruleForm2.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.trim="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassWordVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '../api/api'

export default {
  name: 'TopHeader',
  data(){
      var validatePass1 = (rule, value, callback) => {

        if(value === ''){
          callback(new Error('请输入旧密码'));
          return
        }
        if(value.length>18||value.length<6){
          callback(new Error('长度在 6 到 18 个字符'));
        }else{
          if (this.ruleForm2.pass !== '') {
            this.$refs.ruleForm2.validateField('pass');
          }
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {

        if(value === ''){
          callback(new Error('请输入密码'));
          return
        }
        if(value.length>18||value.length<6){
          callback(new Error('长度在 6 到 18 个字符'));
        }else{
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {

        if(value === ''){
          callback(new Error('请再次输入密码'));
          return
        }
        if(value.length>18||value.length<6){
          callback(new Error('长度在 6 到 18 个字符'));
          return
        }
        if(value !== this.ruleForm2.pass){
          callback(new Error('两次输入密码不一致!'));
        }else{
           callback();
        }
      };
    return {
      isLogin:false,
      dialogPassWordVisible:false,
      ruleForm2:{oldPassword:'',pass:'',checkPass:''},
      userName:'',
      rules2: {
        oldPassword: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
      handleSure(ev){
      var self = this;
      this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            self.ajax(self,{
          url:api.changePass,
         type:"post",
         data:{
           oldPassword:self.ruleForm2.oldPassword,
           password: self.ruleForm2.pass,
           confirmPassword:self.ruleForm2.checkPass
          },
         success:function(data){
           self.dialogPassWordVisible = false;
             $Message({
                 type: 'success',
                  message: '修改成功!'
             });

             setTimeout(function(){
              sessionStorage.removeItem('userId')
              sessionStorage.removeItem('userName')
              self.$router.push('/login')
             },1000)
         }
       })

          } else {
            return false;
          }
        });
      //self.ajax(self,{
       //   url:sureUrl,
       //   type:"post",
       //   data:{
       //        passWord: '',
        //       confirmPassWord:''
        //  },
        //  success:function(data){
        //    self.dialogVisible = false;
         //     $Message({
         //         type: 'success',
          //        message: '修改成功!'
         //     });
         // }
       //})
    },
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
    },
    handlePassWord(){
    this.dialogPassWordVisible = true
    this.ruleForm2 = {oldPassword:'',pass:'',checkPass:''}
    },
    getUserName(){
       var creatorName = sessionStorage.getItem('creatorName');
       this.userName=creatorName
    }
  },
  created() {
    this.getUserName();
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
    padding: 0 20px;
  }
  .el-menu-right .el-menu-item{
    float:right;
  }
  .header {
    background-color: #324057;
    margin-bottom: 20px;
  }
  .header .header-menu .el-menu--horizontal .el-submenu{float:right}
</style>
