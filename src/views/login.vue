<template>
	<div class="login-main" :style="{height:wh+'px'}">
		<div class="login-title">
			<img src="https://s1.yiqihuzhu.com/www/assets/pc/images/logo.png" alt="17互助后台管理">
			<span>后台管理</span>
			<!-- <h2>后台管理</h2> -->
		</div>
		<div class="login-content">
			<h2 class="title">登录</h2>
			<el-form ref="form" :model="form" label-width="90px" :rules="rules" >
			  <el-form-item label="登录邮箱" prop="username">
			    <el-input v-model="form.username" auto-complete="on"></el-input>
			  </el-form-item>
			  <el-form-item label="登录密码" prop="password">
			    <el-input v-model="form.password" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="checkcode" class="checkcode">
			    <el-input v-model="form.checkcode"></el-input>
			    <el-button @click="sendCode(form.username)" :disabled="dissendCodeBtn">{{codeTxt}}</el-button>
			  </el-form-item>
			  <div class="btn">
			    <el-button type="primary" @click="onSubmit">立即登录</el-button>
			  </div>
			</el-form>
		</div>
	</div>
</template>
<script>
import api from '../api/api'
export default {
  name: 'login',
  data() {
	  return {
	  	wh:window.innerHeight,
	  	codeTxt:'发送验证码',
	  	time:60,
	  	interval:null,
	  	userName:'',
	  	dissendCodeBtn:false,
	    form: {
	      username: '',
	      password: '',
	      checkcode:''
	    },
	    rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            //{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          checkcode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
	  }
	},
	components:{

	},
	created(){
		
	},
	methods: {
		setTime(){
			var _this = this;
			this.interval = setInterval(function(){
				_this.time--;
				_this.codeTxt = _this.time+"秒后重发";
				if(_this.time <=0){
					_this.dissendCodeBtn = false;
					_this.codeTxt = '发送验证码';
					_this.time = 60;
					_this.interval && clearInterval(_this.interval);
				}
			},1000)
		},
		sendCode(item){
			var _this = this;
			this.dissendCodeBtn = true;
			this.$http.post(api.getCode, {
				name: this.form.username,
				password: this.form.password
			},{
				emulateJSON: true,
				headers:{
					"Content-Type":"application/x-www-form-urlencoded"
				}
			}).then((response) => {
				if(response.body.status == 0){
					_this.setTime();
				}else{
					_this.dissendCodeBtn = false;
					$MsgBox.alert(response.body.msg)
				}
			}, (response) => {
			// error callback
			});
			//console.log(item);
		},
		ready: function() {
	        this.userName = sessionStorage.getItem('userName')
	    },
	    onSubmit() {
	    	this.login();
	    },
		login() {

			var _this = this;
			var _formData = {
				name:_this.form.username,
				password:_this.form.password,
				code:_this.form.checkcode
			}
			this.$refs.form.validate((valid) => {
	          if (valid) {
	            _this.$http.post(api.doLogin, _formData,{
					emulateJSON: true,
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
				}).then((response) => {
					if(response.body.status == 0){
						sessionStorage.setItem('userId', 10001)
                    	sessionStorage.setItem('userName', _this.form.username)
                    	sessionStorage.setItem('creatorName', response.body.data.user.userRealName)
                    	localStorage.setItem("menu",response.body.data.resources);
						_this.$router.push('/')
					}else{
						$MsgBox.alert(response.body.msg)
					}
				}, (response) => {
				// error callback
				});
	          } else {
	            //console.log('error submit!!');
	            return false;
	          }
	        });
		}
	}
}
</script>
<style>
	#app,html,body {
		height: 100%;
	}
	.login-title {
		padding: 50px;
		color: #fff;
	}
	.title {
		text-align: center;
	}
	.login-main {
		padding: 1px;
		width: 100%;
		height: 100%;
		background-image: url(http://7xv0yi.com2.z0.glb.clouddn.com/bj_zhuce.jpg);
		background-size: cover;
		background-repeat: repeat-y;
	}
	.checkcode .el-input {
		width: 290px;
		float: left;
	}
	.checkcode .el-button {
		width: 100px;
		float: left;
		margin-left: 20px;
		text-align: center;
	}
	.btn {
		margin-left: 0 !important;
	}
	.login-content {
		width: 500px;
		margin: 20px auto;
		padding: 20px 30px 20px 20px;
		background-color: #EFF2F7;
		background-color: rgba(255, 255, 255, 0.76);
	}
</style>
