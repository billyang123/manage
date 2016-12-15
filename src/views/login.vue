<template>
	<div class="login-main">
		<div class="login-content">
			<h2 class="title">登录</h2>
			<el-form ref="form" :model="form" label-width="120px" :rules="rules" >
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
import api_test from '../api/api_test'
export default {
  name: 'login',
  data() {
	  return {
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
		particlesJS('particles-js', {
		  particles: {
		    color: '#fff',
		    shape: 'circle', // "circle", "edge" or "triangle"
		    opacity: 1,
		    size: 4,
		    size_random: true,
		    nb: 150,
		    line_linked: {
		      enable_auto: true,
		      distance: 100,
		      color: '#fff',
		      opacity: 1,
		      width: 1,
		      condensed_mode: {
		        enable: false,
		        rotateX: 600,
		        rotateY: 600
		      }
		    },
		    anim: {
		      enable: true,
		      speed: 1
		    }
		  },
		  interactivity: {
		    enable: true,
		    mouse: {
		      distance: 300
		    },
		    detect_on: 'canvas', // "canvas" or "window"
		    mode: 'grab',
		    line_linked: {
		      opacity: .5
		    },
		    events: {
		      onclick: {
		        enable: true,
		        mode: 'push', // "push" or "remove"
		        nb: 4
		      }
		    }
		  },
		  /* Retina Display Support */
		  retina_detect: true
		});
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
	.title {
		text-align: center;
	}
	.login-main {
		padding: 1px;
		width: 100%;
		height: 100%;
	}
	.checkcode .el-input {
		width: 200px;
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
		margin: 100px auto;
		padding: 20px;
		background-color: #EFF2F7;
	}
</style>
