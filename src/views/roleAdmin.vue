<template>
	<div class="myrole-main">
    <h2>基础配置 - 角色管理</h2>

    <!--<el-card class="box-card consearchbox">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">角色分配</span>
      </div>
      <div class="searchPerson">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入工号或用户名"
          @select="roleHandleSelect"

        ><el-button slot="append" icon="search" @click="searchPerson"></el-button></el-autocomplete>
      </div>
      <div class="person-role-box" v-show="curPerson.userNickName!=''">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">用户名信息</span>
              </div>
              <div class="person-info">
                <div v-if="curPerson.userLoginName"><span :style="spanstyle">登录名：</span>{{curPerson.userLoginName}}</div>
                <div v-if="curPerson.userRealName"><span :style="spanstyle">真实姓名：</span>{{curPerson.userRealName}}</div>
                <div v-if="curPerson.userWorkNo"><span :style="spanstyle">工号：</span>{{curPerson.userWorkNo}}</div>
                <div v-if="curPerson.userNickName"><span :style="spanstyle">昵称：</span>{{curPerson.userNickName}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">用户名角色</span>
              </div>
              <div class="userrole-box">
              <el-checkbox-group v-model="checkList" @change="handleSelectionChange">
                <el-checkbox :label="item.id" v-for="(item,index) in searchRoleCheckData">{{item.roleName}}</el-checkbox>
              </el-checkbox-group>
            </div>

          </el-col>

        </el-row>
      </div>
      <el-button type="warning" @click="saveEdit" v-show="curPerson.userNickName!=''">保存用户角色配置</el-button>
    </el-card>-->

      <div slot="header" class="clearfix" style="margin-bottom:20px">
        <el-button type="primary" style="float: right;" @click="addRole">添加角色</el-button>
        <!-- <el-button type="danger" style="float: right;">批量删除角色</el-button> -->
      </div>
      <el-table
        :data="roleTableData"
        border
        style="width: 100%">
        <el-table-column
          label="角色"
          prop="roleName"
          width="240">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作"
          width="260">
          <span>
            <el-button :plain="true" type="info" @click="updateRole(row)">修改</el-button>
            <el-button :plain="true" type="info" @click="delRole(row.id)">删除</el-button>
            <el-button :plain="true" type="danger" @click="handleAccess(row)">分配权限</el-button>
          </span>
        </el-table-column>
      </el-table>
    <!--分页-->
    <div class="blobk" style="margin:20px 0;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="pgSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog ref="userdialog3" :title="dtitle" v-model="dFVisible" >
      <el-form ref="roleForm" :model="roleForm" :rules="roleFormRules">
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc" type="textarea" placeholder="请输入角色描述" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dFVisible = false">取 消</el-button>
        <el-button type="primary" @click="upRole(roleid)">确 定</el-button>
      </div>
    </el-dialog>

    <!--分配权限-->
    <el-dialog title="分配权限" v-model="dialogAccessVisible" size="tiny">
      <el-tree
        :data="treeData"
        :props="props"
        :default-expand-all=true
        node-key="id"
        :default-checked-keys="defaultChecked"
        show-checkbox
        @check-change="handleCheckChange" ref="access">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAccessVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import api from '../api/api'
import api_test from '../api/api_test'
  export default {
  	name:"roleAdmin",
    data(){
      return {
        treeData: [],
         props: {
          label: 'nodeName',
          children: 'children'
        },
        pgSize:30,
      	total:1,
      	currentPage: 1,
      	totalPages:1,
        spanstyle:'display:inline-block;width:80px;text-align:right;',
        roleTableData:[],
        defaultChecked:[],
        idArray:[],
        searchRoleCheckData:[{}],
        dialogAccessVisible:false,
        restaurants: [],
        selectCheckbox:'',
        multipleSelection:'',
        selectBox:'',
        state: '',
        roleid:'',
        _roleId:'',
        timeout:null,
        multipleSelection:[],
        checkboxValue:[],
        checkList: [],
        accessData:[],
        upUrl:'',
        dtitle:"添加角色",
        dFVisible:false,
        formLabelWidth:'120px',
        filterRoleData:{},
        curPerson:{
          id:0,
          userLoginName: "XXXXXXX@xxxx.com",
          userRealName: "XXX",
          userWorkNo: 0,
          userNickName: ""
        },
        roleForm:{
          roleName:'',
          roleDesc:''
        },
        roleFormRules:{
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur,change' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur,change' }
          ]
        }
      }
    },
    methods: {

      handleChecked(){

      },
      handleCheckChange(data, checked, indeterminate) {
        var self=this
        let _i=self.defaultChecked.indexOf(data.id);
        if(_i!=-1){
         self.defaultChecked.splice(_i,1)
        }
        if(checked){
          self.defaultChecked.push(data.id)
        }
        if(indeterminate){
          self.defaultChecked.push(data.id)
        }else{

        }

      },
      handleNodeClick(data) {

      },
      saveEdit(){
        var _this = this;
        _this.selectBox = _this.defaultChecked.join(',')
        console.log(_this.selectBox)
        this.ajax(this,{
          url:api.setrassignRole,
          type:"post",
          data:{
            roleId:_this._roleId,
            resourceId:_this.selectBox
          },
          success:function(response){
            _this.dialogAccessVisible=false;
            $Message({
                type: 'success',
                message: '保存角色权限配置成功!'
            });
          }
        })
      },
      //分配权限
      handleAccess(row){
      this.dialogAccessVisible=true
      this.handleChecked()
      this._roleId=row.id
      var self=this;
         self.checkList.length=0;
            this.ajax(this,{
            url:api.getResouce,
            type:"get",
            data:{
              roleId:row.id,
            },
            success:function(response){
              let roles = response.body.data;
                  self.accessData = JSON.parse(roles.resourceTreeJson);
                  self.treeData = self.accessData
                   let checkData = self.accessData;
                   self.defaultChecked = roles.checkedIds
            }
          })
      },
      handleSelectionChange(val) {
        var _val=val;
        if(val[0]==' '){
          _val.splice(0,1)
        }
        this.selectCheckbox = _val.join(',')
      },
      searchPerson(){
        if(this.curPerson.userNickName==""){
          return;
        }
        this.roleHandleSelect(this.curPerson)
      },
      roleHandleFocus(val){

      },
      roleHandleSelect(val){
        var _this = this;
        this.curPerson = {
          id:val.id,
          userLoginName: val.userLoginName,
          userRealName: val.userRealName,
          userWorkNo: val.userWorkNo,
          userNickName: val.userNickName
        }
        //
        this.ajax(this,{
          url:api.findUserRole,
          type:"post",
          data:{
            id:val.id,
            userNickName:val.userNickName
          },
          success:function(response){
            let roles = response.body.data.roles;
                _this.searchRoleCheckData = roles;
                _this.checkList = _this.filterCheckList(roles);
          }
        })
      },
      filterCheckList(data){
        let arr = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].checked){
            arr.push(data[i].id);
          }
        }
        return arr;
      },
      handleCheckBoxChange(val){
        this.checkboxValue = val;
      },
      handleSelectionChange(val) {

        this.multipleSelection = val.join(',')
      },
      upRole(id){
        var _this = this;
        var data = {
          roleName:this.roleForm.roleName,
          roleDesc:this.roleForm.roleDesc
        }
        if(id){
          data["id"] = id;
        }
        this.$refs.roleForm.validate((valid) => {
          if(valid){
            _this.ajax(this,{
              url:_this.upUrl,
              type:"post",
              data:data,
              success:function(response){
                _this.loadRoleData();
                $Message({
                    type: 'success',
                    message: _this.dtitle+'成功!'
                });
                _this.dFVisible = false;
              }
            })
          }else{

          }
        })
      },
      addRole(){
        this.dtitle = "添加角色"

        this.upUrl = api.addRole;
        this.dFVisible = true;
        this.$refs.roleForm && this.$refs.roleForm.resetFields();
        this.roleForm.roleName = "";
        this.roleForm.roleDesc = "";
        this.roleid = '';
      },
      updateRole(row){
        this.dtitle = "修改角色"
        this.upUrl = api.updateRole;
        this.dFVisible = true;
        this.$refs.roleForm && this.$refs.roleForm.resetFields();
        this.roleForm.roleName = row.roleName;
        this.roleForm.roleDesc = row.roleDesc;
        this.roleid = row.id;
      },
      delRole(id){
        var _this = this;
        $MsgBox.confirm('此操作将删除该改角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.ajax(this,{
            url:api.delRole,
            type:"post",
            data:{
              id:id
            },
            success:function(response){
              if(response.body.status == 0){
                $Message({
                    type: 'success',
                    message: '删除成功!'
                });
                _this.loadRoleData();
              }else{
                $MsgBox.alert(response.body.msg)
              }
            }
          })
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      querySearchAsync(queryString, cb) {
        this.ajax(this,{
          url:api.searchPerson,
          type:"post",
          data:{
            size:10,
            page: 0,
            userNickName:queryString
          },
          success:function(response){
            let data = response.body.data;
              let restaurants = data.content;
              for (let i = restaurants.length - 1; i >= 0; i--) {
                restaurants[i].value = restaurants[i].userNickName+"(姓名："+restaurants[i].userRealName+")"+"(工号："+restaurants[i].userWorkNo+")"
              }
              //console.log(restaurants)
              //var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
              cb(restaurants);
          }
        })
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      filterRoleData(data){
          var restut = {};
          for (var i = 0; i < data.length; i++) {
            restut[data[i].roleName] = data[i];
            this.searchRoleCheckData[i] = {};
          }
          return restut;
      },
      loadRoleData(){
        var _this = this;
        //var Loading = $Loading.service({text:"正在拼命加载中..."})
        this.ajax(_this,{
          url:api.getRoles,
          type:"post",
          data:{
            size:_this.pgSize,
            page: _this.currentPage-1
          },
          success:function(response){
            var data = response.body.data;
              _this.roleTableData = data.content;
              _this.total = data.totalElements;
				      _this.totalPages = data.totalPages;
              //console.log(response.body.data)
              //_this.filterRoleData = _this.filterRoleData(data);
              //$Loading.close({text:"正在拼命加载中..."})
          }
        })
      },
      handleSizeChange(val) {
        this.pgSize = val;
        this.currentPage = 1;
        this.loadRoleData();

      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadRoleData();

      }
    },
    created() {
      this.loadRoleData();
    },
    component:{

    }
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .myrole-main .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .myrole-main {
    padding: 20px;
  }
  .myrole-main .box-card {
    width: 100%;
  }

  .person-role-box {
    padding: 20px 0;
    text-align: left;
  }
  .person-info {

  }
  .userrole-box {

  }
  .myrole-main .cell{text-align:center}
  .myrole-main .el-button+.el-button{margin-left:0}
  .myrole-main .el-dialog--tiny{width:60%}
  .myrole-main .el-checkbox-group{text-align:left}
  .myrole-main .el-tree-node{ text-align:left}
</style>
