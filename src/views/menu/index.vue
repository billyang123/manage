<template>
 <div class="wxMenu-index">
 	<h2>微信公众号后台－自定义菜单</h2>
 	<div class="add-btn">
 		<el-button type="info" @click="handleAdd">新增菜单方案</el-button>
 	</div>
 	<el-table
      border
      :data="tableData"
      style="width: 100%;text-align:center;">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        inline-template
        width="300"
        label="操作">
        <div>
  	      <el-button type="success" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
          <el-button type="warning" size="small" @click="handlePushPreview(row)" v-if="row.status == 'new' || row.status == 'online' || row.status == 'offline' ">发布预览</el-button>
          <el-button type="warning" size="small" @click="handlePushOnline(row)" v-if="row.status == 'preview'">发布上线</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog title="菜单设置" v-model="eDFVisible">
    	<el-form label-width="50px" class="menuform text-left">
	  		<el-form-item label="标题">
			    <el-input v-model="title"></el-input>
			</el-form-item>
		</el-form>
      <div class="menu-seting clearfix">
	    <div class="menu-preview">
	    	<div class="menu-title">17互助</div>
	    	<div class="menu-box">
				
	    		<div class="menu-item" v-for="(menu,index) in currentMenu" :class="(index+'' == menuIndex)?'current':''">
	    			<a href="javascript:void(0);" class="pre_menu_link" @click="setCurrent(index)">
	    				<i class="el-icon-menu" v-if="menu.sub_button && menu.sub_button.length>0"></i>
	    				<span>{{menu.name}}</span>
	    			</a>
	    			<ul class="sub_pre_menu_box" v-if="index+'' == tabIndex">
	    				<li v-for="(submenu,idx) in menu.sub_button" :class="(index+':'+idx+'' == menuIndex)?'current':''">
		    				<a href="javascript:void(0);" class="pre_menu_link" @click="setCurrent(index,idx)">
		    					<span>{{submenu.name}}</span>
		    				</a>
	    				</li>
	    				<li class="addMenuBox" @click="addSubMenuBox(index)" v-if="!menu.sub_button || (menu.sub_button && menu.sub_button.length < 5)">
	    					<a href="javascript:void(0);" class="pre_menu_link">
	    						<span>＋</span>
	    					</a>
	    				</li>
	    			</ul>
	    		</div>
	    		<div class="menu-item" v-if="currentMenu && currentMenu.length < 3">
	    			<a href="javascript:void(0);" class="pre_menu_link" @click="addMenuBox()">
	    				<span>＋</span>
	    			</a>
	    		</div>
	    	</div>
	    </div>
	    <el-card class="box-card" v-if="menuIndex!=''">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 36px;">{{menuForm.name}}</span>
		    <el-button style="float: right;" type="danger" @click="delMenu">删除菜单</el-button>
		  </div>
		  <div class="text-left" v-if="menuForm.sub_button">已添加子菜单，仅可设置菜单名称。</div>
		  	<el-form :model="menuForm" label-width="120px" class="menuform text-left" :rules="rules" ref="menuForms">
			  <el-form-item label="菜单名称" prop="name">
			  	<el-input v-model="menuForm.name"></el-input>
			    <div class="text-left">字数不超过4个汉字或8个字母</div>
			  </el-form-item>
			  	<div v-if="!menuForm.sub_button || menuForm.sub_button.length==0">
				  <el-form-item label="菜单内容">
				    <el-radio-group v-model="menuForm.type">
				      <el-radio label="click">触发关键字</el-radio>
				      <el-radio label="view">链接</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="请输入链接" v-if="menuForm.type == 'view'">
				  	<el-input v-model="menuForm.url"></el-input>
				  </el-form-item>
				  	<el-form-item label="请输入关键字" v-if="menuForm.type == 'click'">
					  	<el-input v-model="menuForm.key"></el-input>
					</el-form-item>
				</div>
			</el-form>
		</el-card>
	</div>
	<div><el-button type="danger" @click="submitForm('wxReplyeditForm')">保存设置</el-button></div>
    </el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'

export default {
  	name:"wxMenu-index",

  	data(){
  		var isLegal = (rule, str, callback) => {
  			if (!str) {
	          return callback(new Error('请输入菜单名称'));
	        }
	        setTimeout(() => {
	          if (!/^[a-zA-Z]{1,8}$/.test((str + '').replace(/[\u4e00-\u9fa5]/g, 'aa'))) {
	            callback(new Error('字数不超过4个汉字或8个字母'));
	          } else {
	          	callback();
	          }
	        }, 1000);
		}
  		return {

  			eDFVisible:false,
  			onlineId:null,
  			tableData:[],

  			currentMenu:[],
  			tabIndex:"",
  			menuIndex:"",
  			curTabMenu:{},
  			menuId:"",
  			title:"",
  			menuForm:{
  				name:"",
  				type:"click",
  				title:""
  			},
  			rules:{
  				title:[
  					{ required: true, message: '请输入标题', trigger: 'blur' }
  				],
  				name:[
  					{
  						validator:isLegal
  					}
  				]
  			}
  		}
  	},
    methods: {
    	handleAdd(){
    		this.eDFVisible = true;
    		this.dtype = "add";
    		this.currentMenu = [];
    		this.title = "";

    		this.tabIndex = "";
  			this.menuIndex = "";
  			this.curTabMenu = {};
  			this.menuId = "";	
    	},
    	delMenu(){
    		var _this = this;
    		var arr = this.menuIndex.split(":");
    		$MsgBox.confirm("此操作将删除该菜单, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(arr.length==1){
                	_this.currentMenu.splice(arr[0]*1,1)

                	
                }else{
                	_this.currentMenu[arr[0]*1].sub_button.splice(arr[1]*1,1);
                	if(_this.currentMenu[arr[0]*1].sub_button.length==0){
                		_this.currentMenu[arr[0]*1].type = "view";
                	}
                }
                _this.tabIndex = "";
                _this.menuIndex = "";
            }).catch (() => {

            });
    	},
    	setCurrent(index,curIndex){
    		var _menuIndex = "";
    		if(index || index==0){
    			_menuIndex += index;
    			this.curTabMenu = this.currentMenu[index]
    		}
    		this.tabIndex = _menuIndex;
    		if(curIndex || curIndex==0){
    			_menuIndex += ":"+curIndex;
    			this.curTabMenu = this.currentMenu[index].sub_button[curIndex]
    		}
    		this.menuIndex = _menuIndex;
    		this.menuForm = this.curTabMenu;
    	},
    	addMenuBox(){
    		this.currentMenu.push({
    			name:"菜单名称",
    			sub_button:[],
    			type:"view"
    		})
    	},
    	addSubMenuBox(m){
    		if(!this.currentMenu[m].sub_button){
    			this.$set(this.currentMenu[m],"sub_button",[])
    		}
    		var curArr = this.currentMenu[m].sub_button;
    		curArr.push({
    			name:"菜单名称",
    			type:"view"
    		})
    		this.currentMenu[m] = {
    			name:this.currentMenu[m].name
    		}
    		console.log(this.currentMenu[m],"sub_button",curArr)
    		this.$set(this.currentMenu[m],"sub_button",curArr)

    	},
    	handleEdit(row){
    		this.dtype = "edit";
    		this.curMenu = row;
    		if(row.content == '') {
    			this.currentMenu = [];	
    		}else{
    			var content = JSON.parse(row.content);
    			this.currentMenu = content.button;
    		}
    		this.eDFVisible = true;

    		this.title = this.curMenu.title
    	},
    	submitForm(){
    		var _this = this;
    		var url = api.wx_menuadd;
    		var _data = {
    			button:this.currentMenu
    		};
    		if(this.title == "") this.title = "默认标题";
    		var formData = {
                account:"17HUZHU",
                title:this.title,
                content:JSON.stringify(_data)
            }
    		//return console.log(_data);
    		if(this.dtype == "edit"){
    			url = api.wx_menuupdate;
    			formData.menuId = this.curMenu.id
    		}

    		this.$refs.menuForms.validate((valid) => {
    			if(valid){
    				_this.ajax(_this,{
		                url:url,
		                type:"post",
		                data:formData,
		                success:function(data){
		                  	_this.getList();
		                  	_this.eDFVisible = false;
		                }
		            })
    			}
    		})
    	},
    	handleDel(row){
    		var id = row.id;
    		var _this = this;
    		$MsgBox.confirm("此操作将删除该菜单方案, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.ajax(_this,{
                    url:api.wx_menudelete,
                    type:"post",
                    data:{
                        menuId:id
                    },
                    success:function(data){
                      	_this.getList()
                        $Message({
                            type: 'success',
                            message: "删除菜单方案成功！"
                        });
                    }
                  })


            }).catch (() => {

            });
    	},
    	handlePushOnline(row){
    		let _this = this;
    		$MsgBox.confirm("此操作将发布上线该菜单, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            	_this.ajax(_this,{
	  				url:api.wx_menupublish,
	  				type:"post",
	  				data:{
	  					menuId:row.id
	  				},
	  				success:(res) => {
	  					_this.getList();
	  					$Message({
                            type: 'success',
                            message: "发布上线该菜单成功！"
                        });
	  				},
	  				complete:(res) => {

	  				}
	  			})
            }).catch (() => {

            });
    		
    	},
    	handlePushPreview(row){
    		let _this = this;
    		$MsgBox.confirm("此操将作发布预览该菜单, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            	_this.ajax(_this,{
	  				url:api.wx_menupreview,
	  				type:"post",
	  				data:{
	  					menuId:row.id
	  				},
	  				success:(res) => {
	  					_this.getList()
	  					$Message({
                            type: 'success',
                            message: "发布预览该菜单成功！"
                        });
	  				},
	  				complete:(res) => {

	  				}
	  			})
            }).catch (() => {

            });
    	},
    	getList(){
        	let _this = this;
    		this.ajax(this,{
  				url:api.wx_menulist,
  				type:"get",
  				data:{
  					account:"17HUZHU"
  				},
  				success:(res) => {
  					_this.tableData = res.body.data;
  				},
  				complete:(res) => {

  				}
  			})
    	},
    },
    created(){
    	this.getList();
    	//console.log(this.currentMenu["0"*1].sub_button)
    },
    mounted () {
    	
  	}
}
</script>
<style lang="less" scoped>
	.clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  .clearfix:after {
	      clear: both
	  }
	.wxMenu-index {
		padding: 20px 20px 20px 76px;
	}
	.menu-seting {
		padding-bottom: 20px;
	}
	.box-card {
		padding: 0 20px;
	}
	.menu-preview {
		width: 320px;
		height: 482px;
		position: relative;
		background: #fff url("../../assets/bg_mobile_head_default2968da.png") no-repeat;
		border: 1px solid #eee;
		float: left;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	.menu-title {
		text-align: center;
		height: 54px;
		line-height: 54px;
		padding-top: 15px;
		color: #fff;
	}
	.menu-box {
		// overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		background: url("../../assets/bg_mobile_foot_default2968da.png") no-repeat;
		height: 50px;
		width: 277px;
		padding-left: 43px;
		border-top: 1px solid #d0d0d0;
		display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	}
	.menu-item {
		position: relative;
	    float: left;
	    line-height: 50px;
	    height: 50px;
	    text-align: center;
	    width: 100%;
		 -webkit-flex-shrink: 1;
	    -ms-flex: 0 1 auto;
	    flex-shrink: 1;
	}
	.current>.pre_menu_link {
		border: 1px solid #44b549;
	    line-height: 48px;
	    height: 48px;
	    background-color: #fff;
	    color: #44b549;
	    &:hover {
	    	color: #44b549;
	    }
	}
	.sub_pre_menu_box {
		list-style: none;
		padding: 0;
		margin: 0;
		position: absolute;
	    bottom: 60px;
	    left: 0;
	    width: 100%;
	    border: 1px solid #d0d0d0;
	    background-color: #fff;
	    box-sizing: border-box;
	    .addMenuBox {
			border-bottom: 0;
		}
	    li {
	    	border-bottom: 1px solid #d0d0d0;
	    }
	}
	.menuform {
		padding: 20px;
	}
	.text-left {
		text-align: left;
	}
	.add-btn {
		margin-bottom: 20px;
		text-align: right;
	}
	.el-icon-menu {
		font-size: 12px;
	}
	.pre_menu_link {
		display: block;
	    width: auto;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	    color: #616161;
	    text-decoration: none;
		border-left: 1px solid #e7e7eb;
		&:hover {
			text-decoration: none;
			color: #222;
		}
	}
</style>
<style>
	.el-table th{
		text-align: center;
	}
</style>
