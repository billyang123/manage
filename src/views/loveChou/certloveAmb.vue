<template>
 <div class="certloveAmb" style="padding:20px">
   <h2>会员信息查询</h2>
   <div class="certloveAmbSearch">
     <el-form :inline="true" class="demo-form-inline" :rules="rules" :model="form" ref="form">
       <el-form-item prop="phoneInput">
         <el-input
           placeholder="请输入查询手机号"
           v-model.number="form.phoneInput" :maxlength="11">
         </el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="onSearch" :disabled="btnBl">查询</el-button>
       </el-form-item>
     </el-form>
   </div>
   <div class="volunteerList" v-if="dataBl">
     <el-table
       :data="tableData"
       border
       style="width: 100%">
       <el-table-column
         prop="userNickname"
         label="用户昵称"
         width="260">
       </el-table-column>
       <el-table-column
         prop="userPhone"
         label="用户手机号"
         width="200">
       </el-table-column>
       <el-table-column
         inline-template
         prop="userHeadimgurl"
         label="用户头像"
         width="100">
         <span><img :src="row.userHeadimgurl" style="width:80px;height:80px; border-radius:100%"></span>
       </el-table-column>
       <el-table-column
         prop="userCreateTime"
         label="用户创建时间"
         width="200">
       </el-table-column>
       <el-table-column
         inline-template
         prop="userVolunteerFlag"
         label="爱心大使标记">
         <span>{{Volunteer[row.userVolunteerFlag]}}</span>
       </el-table-column>
       <el-table-column
         inline-template
         label="操作"
         width="160">
         <div>
           <div v-if="resultBl">
             <el-button :plain="true" type="info" @click="handleSubmit('adopt',row.userPhone)" v-if="row.userVolunteerFlag=='normal'">认证</el-button>
             <!--<el-button :plain="true" type="danger" @click="handleSubmit('reject',row.userPhone)" v-if="row.userVolunteerFlag=='normal'">不认证</el-button>-->
           </div>
           <el-button :plain="true" type="danger" @click="handleRemove(row.id,'normal')" v-if="row.userVolunteerFlag=='volunteer'">撤销认证</el-button>
           <el-button :plain="true" type="danger" @click="handleRemove(row.id,'normal')" v-if="result=='adopt'">撤销认证</el-button>
         </div>
       </el-table-column>
     </el-table>
   </div>

 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"fundProject",
  	data(){
  	  var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正确手机号'));
          } else {
          let _val=value+'';
            if (_val.length != 11) {
              callback(new Error('请输入正确手机号'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
  		return {
  		  result:'',
  		  resultBl:true,
  		  form:{
  		    phoneInput:''
  		  },
  		  rules: {
  		     phoneInput: [
            { validator: checkAge, trigger: 'blur,change' }
          ]
          //phoneInput: [
          //{required: true, message: '请输入查询手机号', trigger: 'blur,change'},
          //{type: 'number', message: '请输入正确手机号', trigger: 'blur,change'}
          //]
        },
        tableData:[],
        Volunteer:{
          "normal":"不是志愿者",
          "volunteer":"志愿者"
        },
        dataBl:false,
        btnBl:false

  		}
  	},
    methods: {
      onSearch(){
        var self = this;
        self.btnBl = true;
        self.$refs.form.validate((valid)=>{
          if(valid){
            self.ajax(self,{
            url:api.fundGetVolunteerInfo,
            type:"post",
            data:{
              volunteerPhone:self.form.phoneInput
            },
            success:function(response){

              let _data = response.body.data;
              if(_data){
                 self.tableData = _data
                  self.dataBl=true;
                 //self.page.totalElement = _data.totalElements
                 //self.page.totalPages = _data.totalPages
              }
           },
           complete:function(){
              self.btnBl = false;
           }
            })
          }else{
            self.btnBl = false;
             return false
          }
        })

      },
      //认证和不认证
      handleSubmit(status,phone){
        var self = this;
        self.ajax(self,{
            url:api.fundApproveVolunteer,
            type:"post",
            data:{
              volunteerPhone:phone,
              applyStatus:status
            },
            success:function(response){
              let _data = response.body.data;
              self.result = _data;
              self.resultBl = false
              if(_data){
                 //self.tableData = _data
              }
           },
            })
      },
      //撤销认证
      handleRemove(volunteerId,flag){
        var self = this;
        self.ajax(self,{
            url:api.fundCancleVolunteer,
            type:"post",
            data:{
              id:volunteerId,
              userVolunteerFlag:flag
            },
            success:function(response){
              let _data = response.body.data;

              if(_data){
                 self.result = _data;
                 self.resultBl = true;
                 self.tableData[0].userVolunteerFlag = "normal";
              }
           },
            })
      }
    }
}
</script>
<style>
	.certloveAmb .cell {text-align:center}
</style>
