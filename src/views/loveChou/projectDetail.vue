<template>
 <div class="projectDetail">
 	<h2>{{detail.fundraiseProjectTitle}}</h2>
 	<div class="options">
		<router-link to="/fundProject">
	      	<el-button size="small">
		      		返回列表
	      	</el-button>
	    </router-link>
		<el-button size="small" :plain="true" type="info" @click="showChangeHandle('commit')">评论维护</el-button>
		<el-button size="small" @click="showChangeHandle('editProject')" :plain="true" type="info">编辑</el-button>
		<router-link :to="'/projectTrends/'+id+'?name='+detail.fundraiseProjectTitle+'&fundraiseUserInfoId='+detail.fundraiseUserInfoId+'&fundraiseProjectId='+detail.id">
	      	<el-button size="small" :plain="true" type="info">动态</el-button>
	    </router-link>
	    <router-link :to="'/remitApplyList/'+id+'?name='+detail.fundraiseProjectTitle+'&fundraiseUserInfoId='+detail.fundraiseUserInfoId+'&fundraiseProjectId='+detail.id">
	      	<el-button size="small" :plain="true" type="info">
		      		打款纪录
	      	</el-button>
	    </router-link>
	</div>
	<ul class="object-list">

		<li><span class="title">患者姓名：</span><span class="con">{{detail.patientName}}</span></li>
		<li><span class="title">申请人昵称：</span><span class="con">{{detail.userNickname}}</span></li>
		<li><span class="title">申请人头像：</span><img :src="detail.userHeadimgurl" alt="" style="width:50px;height:50px;"/></li>
		<li><span class="title">状态：</span>{{status[detail.status]}}</li>
		<li><span class="title">创建时间：</span><span class="con">{{detail.createTime}}</span></li>
		<li><span class="title">审核时间：</span><span class="con">{{detail.approveTime}}</span></li>
		<li><span class="title">筹款原因：</span><span class="con">{{detail.fundraiseReson}}</span></li>
		<li><span class="title">审核意见：</span><span class="con">{{detail.suggestion}}</span></li>
		<li><span class="title">筹款持续时间(天数)：</span><span class="con">{{detail.fundraiseProjectDuration}}</span></li>
		<li><span class="title">当前帮助人数：</span><span class="con">{{detail.fundraiseHelpCount}}</span></li>
		<li><span class="title">目标筹款金额：</span><span class="con">{{detail.fundraiseTargetAmount}}</span></li>
		<li><span class="title">已获筹款金额：</span><span class="con">{{detail.fundraiseAcquiredAmount}}</span></li>
		<li><span class="title">累计打款金额：</span><span class="con">{{detail.fundraiseRemitAmount}}</span></li>
		<li><span class="title">分享次数：</span><span class="con">{{detail.fundraiseShareCount}}</span></li>
		<li><span class="title">点击捐款次数：</span><span class="con">{{detail.fundraiseShareOpenCount}}</span></li>
		<li><span class="title">点击捐款次数：</span><span class="con">{{detail.fundraiseDonationClickCount}}</span></li>
		<li><span class="title">评论数（包括回复）：</span><span class="con">{{detail.fundraiseCommentCount}}</span></li>
		<li><span class="title">捐款次数：</span><span class="con">{{detail.fundraiseDonationCount}}</span></li>
		<li><span class="title">打开次数：</span><span class="con">{{detail.openCount}}</span></li>
		<li><span class="title">完成原因：</span>{{finishReason[detail.finishReason]?finishReason[detail.finishReason]:''}}</li>
		<li><span class="title">筹款开始时间：</span><span class="con">{{detail.fundraiseStartTime}}</span></li>
		<li><span class="title">筹款结束时间：</span><span class="con">{{detail.fundraiseEndTime}}</span></li>
		<li><span class="title">封面图片：</span><img :src="detail.fundraiseProjectImgurl" alt="" style="width:50px;height:50px;"/></li>
		<li><span class="title">列表页图片：</span><img v-for="item in detail.fundraiseProjectResources" :src="item.resourceUrl" alt="" style="width:50px;height:50px;margin-right:5px"/></li>
		<li><span class="title">操作时间：</span><span class="con">{{detail.operateTime}}</span></li>
		<li><span class="title">分享标题：</span><span class="con">{{detail.shareTitle}}</span></li>
		<li><span class="title">操作时间：</span><span class="con">{{detail.shareContent}}</span></li>
		<li><span class="title">项目描述：</span><span class="con">{{detail.fundraiseProjectDesc}}</span></li>
		<li><span class="title">详情描述：</span><span class="con">{{detail.detail}}</span></li>
	</ul>
	<!-- 发起人昵称，目标金额，项目标题，项目详情，患者名字，图片列表，分享主标题、副标题，封面图，筹款时间 -->
	<el-dialog title="编辑项目" v-model="editProject.visible">
	  <el-form :model="editProject.form" :rules="editProject.rules" ref="editProject">
	    <el-form-item label="筹款项目名称" label-width="150px" prop="fundraiseProjectTitle">
	      <el-input type="text" v-model="editProject.form.fundraiseProjectTitle" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="目标金额" label-width="150px" prop="fundraiseApplyTargetAmount">
	      <el-input type="text" v-model.number="editProject.form.fundraiseApplyTargetAmount" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="筹款原因" label-width="150px" prop="fundraiseReson">
	      <el-input type="textarea" v-model="editProject.form.fundraiseReson" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="患者姓名" label-width="150px" prop="patientName">
	      <el-input type="text" v-model="editProject.form.patientName" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="患者实际姓名" label-width="150px" prop="acturalPatientName">
	      <el-input type="text" v-model="editProject.form.acturalPatientName" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="联系人姓名" label-width="150px" prop="linkmanName">
	      <el-input type="text" v-model="editProject.form.linkmanName" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="联系人电话" label-width="150px" prop="linkmanPhone">
	      <el-input type="text" v-model.number="editProject.form.linkmanPhone" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="申请人昵称" label-width="150px" prop="userNickname">
	      <el-input type="text" v-model="editProject.form.userNickname" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="筹款开始时间" label-width="150px" >
	    	<div style="text-align:left;">
			  	<el-date-picker
			      v-model="editProject.form.fundraiseStartTime"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择日期时间"
			      align="right"
			      :picker-options="pickerOptions">
			    </el-date-picker>
		    </div>
	      <!-- <el-input type="text" v-model="editProject.form.fundraiseStartTime" auto-complete="off"></el-input> -->
	    </el-form-item>
	    <el-form-item label="筹款持续时间(天数)" label-width="150px" prop="fundraiseProjectDuration">
	      	
	      <el-input type="text" v-model.number="editProject.form.fundraiseProjectDuration" auto-complete="off"></el-input>
	    </el-form-item>

	    <el-form-item label="分享标题" label-width="150px" prop="shareTitle">
	      <el-input type="text" v-model="editProject.form.shareTitle" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="分享内容" label-width="150px" prop="shareContent">
	      <el-input type="textarea" v-model="editProject.form.shareContent" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="筹款项目描述" label-width="150px" prop="fundraiseProjectDesc">
	      <el-input type="textarea" v-model="editProject.form.fundraiseProjectDesc" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="详情描述" label-width="150px" prop="detail">
	      <el-input type="textarea" v-model="editProject.form.detail" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="封面图片地址" label-width="150px">
			<ul class="img-list" style="padding:10px 0;">
				<li>
					<div class="img-box" :style="{backgroundImage:'url('+imgkey+'!128x128)'}"></div>
				</li>
			</ul>
			<div class="uploadTarget">
				<el-upload
				:show-upload-list="false"
			  :action="uploadUrl"
			  :data="{platform:'fundraise'}"
			  :on-success="handleKeyUpSuccess">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
	      	<!-- <el-input type="textarea" v-model="editProject.form.fundraiseImgKey" auto-complete="off"></el-input> -->
	    </el-form-item>
	    <el-form-item label="图片列表" label-width="150px">
			<!-- <el-input type="text" v-model="editProject.form.fundraiseProjectResources" auto-complete="off"></el-input> -->
		    <ul class="img-list">
		      	<li v-for="(item,index) in imgList">
		      		<div class="img-box" :style="{backgroundImage:'url('+item.resourceUrl+'!128x128)'}">
		      			<i class="del-img el-icon-circle-cross" @click="removeImg(index)"></i>
		      		</div>
					<div>
				      	<el-radio class="radio" v-model="item.status" label="visible">显示</el-radio>
				      	<el-radio class="radio" v-model="item.status" label="invisible">隐藏</el-radio>
				    </div>
		      	</li>
		      </ul>
		      <div class="uploadTarget">
		      	<el-upload
		      	:show-upload-list="false"
				  :action="uploadUrl"
				  :data="{platform:'fundraise'}"
				  :on-success="handleUpSuccess">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
	    </el-form-item>  
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="editProject.visible = false">取 消</el-button>
	    <el-button type="primary" @click="postMyEdit('editProject')" :disabled="editProject.disabled">保存</el-button>
	  </div>
	</el-dialog>
	<el-dialog title="评论维护" v-model="commit.visible" size="large">
		<el-table
		    :data="commitList"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="createTime"
		      label="时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="donateUserNickName"
		      label="评论者"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="likeCount"
		      label="点赞数"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="message"
		      label="评论内容"
		      width="400">
		    </el-table-column>
		    <el-table-column
		    	inline-template
		      label="操作">
		      <div>
		      	<el-button size="small" type="danger" @click="deleteCommit(row.id)">删除</el-button>
		      </div>
		    </el-table-column>
		  </el-table>
		  <div class="pagination-box">
			  <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="commit.page"
			      :page-sizes="[20, 40, 60, 80]"
			      :page-size="commit.size"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="commit.total">
			  </el-pagination>
			</div>
	</el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"projectDetail",
  	data(){
  		return {
  			id:1,
  			uploadUrl:api.fund_image,
  			imgkey:"",
  			imgList:[],
  			status:{
  				"new":"申请中",
  				"reject":"审核不通过",
  				"pass":"审核通过",
  				"view":"预览",
  				"process":"筹款中",
  				"finish":"筹款完成"
  			},
  			commitList:[
  				{
  					name:"",
  					reName:"",
  					time:"",
  					content:""
  				}
  			],
  			payMoney:{
  				disabled:false,
  				visible:false,
  				url:"#",
  				form:{
  					money:"",
  					time:""
  				}
  			},
  			commit:{
  				disabled:false,
  				visible:false,
  				size:20,
  				page:1,
  				total:2
  			},
  			finishReason:{
  				expires :"到期",
  				attain:"达到筹款目标",
  				stop:"强制关闭"
  			},
  			
  			editProject:{
  				disabled:false,
  				visible:false,
  				url:api.fund_maintainProject,
  				upfileUrl:api.fund_image,
  				rules:{
  					fundraiseProjectTitle:[
  						{ required: true, message: '请填写项目标题', trigger: 'change,blur' }
  					],
  					fundraiseApplyTargetAmount:[
  						{ type: 'number', message: '请填写目标金额', trigger: 'change,blur' }
  					],
  					fundraiseReson:[
  						{ required: true, message: '请填写筹款原因', trigger: 'change,blur' }
  					],
  					patientName:[
  						{ required: true, message: '请填写患者姓名', trigger: 'change,blur' }
  					],
  					linkmanName:[
  						{ required: true, message: '请填写联系人姓名', trigger: 'change,blur' }
  					],
  					linkmanPhone:[
  						{ type: 'number', message: '请填写联系人电话', trigger: 'change,blur' }
  					],
  					userNickname:[
  						{ required: true, message: '请填写昵称', trigger: 'change,blur' }
  					],
  					fundraiseProjectDuration:[
  						{ type: 'number', message: '请正确填写筹款持续时间(天数)', trigger: 'change,blur' }
  					],
  					shareTitle:[
  						{ required: true, message: '请填写分享标题', trigger: 'change,blur' }
  					],
  					shareContent:[
  						{ required: true, message: '请填写分享内容', trigger: 'change,blur' }
  					],
  					fundraiseProjectDesc:[
  						{ required: true, message: '请填写筹款项目描述', trigger: 'change,blur' }
  					],
  					detail:[
  						{ required: true, message: '请填写详情描述', trigger: 'change,blur' }
  					]
  				},
  				form:{
  					"id": 1,
			        "fundraiseUserInfoId": 1,
			        "fundraiseApplyTargetAmount": 200,
			        "fundraiseReson": "缺钱",
			        "patientName": "japanese",
			        "linkmanName": "meixi",
			        "linkmanPhone": "12345678901",
			        "userNickname": "小熊",
			        "userHeadimgurl": " tt",
			        "status": "view",
			        "suggestion": "好感人",
			        "createTime": "2016-12-11 21:04",
			        "approveTime": "2016-12-11 21:04",
			        "fundraiseProjectTitle": " need help",
			        "fundraiseProjectDesc": " 筹款项目描述",
			        "fundraiseProjectDuration": 60,
			        "fundraiseHelpCount": 200,
			        "fundraiseTargetAmount": 2000,
			        "fundraiseAcquiredAmount": 200,
			        "fundraiseRemitAmount": 200,
			        "fundraiseShareCount": 10069,
			        "fundraiseShareOpenCount": 10085,
			        "fundraiseDonationClickCount": 111,
			        "fundraiseCommentCount": 200,
			        "fundraiseDonationCount": 200,
			        "openCount": 200,
			        "finishReason": "attain",
			        "weight": 1,
			        "fundraiseStartTime": "2016-12-12 10:29:30",
			        "fundraiseEndTime": "2016-12-12 10:29:30",
			        "fundraiseProjectImgurl": "2016-12-12 10:29:30",
			        "operateTime": "2016-12-12 10:29:30",
			        "shareTitle": "分享标题",
			        "shareContent": "分享内容",
			       "fundraiseImgKey":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbLwibUW5iaUK0Xdb7gpFc0WS4HpeYw6T1qNoD4DVvsBbicY5pia7tNW38WrzvnALyHv4nOCGeFKfZBw/0",
			        "detail": "明细",
			        "fundraiseProjectResources":[{"fundraisePatientStateId":1,"resourceType":"image","status":"visible","resourceUrl":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbLwibUW5iaUK0Xdb7gpFc0WS4HpeYw6T1qNoD4DVvsBbicY5pia7tNW38WrzvnALyHv4nOCGeFKfZBw/0"}]
  				}
  			},
  			detail:{
		        "id": 1,
		        "fundraiseUserInfoId": 1,
		        "fundraiseApplyTargetAmount": 200,
		        "fundraiseReson": "缺钱",
		        "patientName": "japanese",
		        "linkmanName": "meixi",
		        "linkmanPhone": "12345678901",
		        "userNickname": "小熊",
		        "userHeadimgurl": " tt",
		        "status": "view",
		        "suggestion": "好感人",
		        "createTime": "2016-12-11 21:04",
		        "approveTime": "2016-12-11 21:04",
		        "fundraiseProjectTitle": " need help",
		        "fundraiseProjectDesc": " 筹款项目描述",
		        "fundraiseProjectDuration": 60,
		        "fundraiseHelpCount": 200,
		        "fundraiseTargetAmount": 2000,
		        "fundraiseAcquiredAmount": 200,
		        "fundraiseRemitAmount": 200,
		        "fundraiseShareCount": 10069,
		        "fundraiseShareOpenCount": 10085,
		        "fundraiseDonationClickCount": 111,
		        "fundraiseCommentCount": 200,
		        "fundraiseDonationCount": 200,
		        "openCount": 200,
		        "finishReason": "attain",
		        "weight": 1,
		        "fundraiseStartTime": (new Date()).format('yyyy-MM-dd hh:mm:ss'),
		        "fundraiseEndTime": "2016-12-12 10:29:30",
		        "fundraiseProjectImgurl": "2016-12-12 10:29:30",
		        "operateTime": "2016-12-12 10:29:30",
		        "shareTitle": "分享标题",
		        "shareContent": "分享内容",
		        "detail": "明细",
		        "fundraiseImgKey":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbLwibUW5iaUK0Xdb7gpFc0WS4HpeYw6T1qNoD4DVvsBbicY5pia7tNW38WrzvnALyHv4nOCGeFKfZBw/0",
		        "fundraiseProjectResources":[{"fundraisePatientStateId":1,"resourceType":"image","status":"visible","resourceUrl":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbLwibUW5iaUK0Xdb7gpFc0WS4HpeYw6T1qNoD4DVvsBbicY5pia7tNW38WrzvnALyHv4nOCGeFKfZBw/0"}]
		      },
		      pickerOptions: {

		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        }
  		}
  	},
    methods: {
    	handleKeyUpSuccess(res){
    		this.imgkey = res.data;
    	},
    	handleUpSuccess(res){
	    	console.log(res)
	    	this.addImg(res.data)
	    },
	    addImg(url){
	    	this.imgList.push({
				resourceType:"image",
				status:"visible",
				resourceUrl:url
			});
		
	    },
	    removeImg(idx){
	    	this.imgList.splice(idx,1);
	    },
    	handleSizeChange(val){
    		this.commit.size = val;
    		this.getCommitList();
    	},
    	handleCurrentChange(val){
    		this.commit.page = val;
    		this.getCommitList();
    	},
    	showChangeHandle(type){
    		this[type].visible = true;
    		if(type=="commit"){
    			this.getCommitList()
    		}
    		if(type=="doPayMoney"){
    			this.getPayList();
    		}
    		if(type = "editProject"){
    			this.editProject.form = this.detail;
    			this.editProject.form.fundraiseStartTime = this.editProject.form.fundraiseStartTime || (new Date()).format('yyyy-MM-dd hh:mm:ss');
    			this.editProject.form.fundraiseProjectDuration = this.editProject.form.fundraiseProjectDuration || "15";
	    		this.imgList = this.detail.fundraiseProjectResources;
	    		this.imgkey = this.detail.fundraiseProjectImgurl;
    		}
    	},
    	deleteCommit(id){
    		var _this = this;
    		$MsgBox.confirm("此操作将删除该评论, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.ajax(this,{
                    url:api.fund_deleteMessage,
                    type:"post",
                    data:{
                        id:id
                    },
                    success:function(data){
                    	// _this.commit.visible = false;
                      	_this.getCommitList()
                        $Message({
                            type: 'success',
                            message: "删除评论成功！"
                        });
                    }
                  })


            }).catch (() => {
                
            });
    	},
    	getCommitList(){
    		//获取评论列表
    		var _this = this;
    		this.ajax(this,{
				url:api.fund_getFunDonationList,
				type:"get",
				data:{
					id:this.id,
					size:this.commit.size,
					page:this.commit.page-1
				},
				success:(res) => {
					console.log(res)
					_this.commitList = res.body.data.content;
					_this.commit.total = res.body.data.totalElements
				},
				complete:(res) => {
					
				}
			})
    	},
    	getDetail(){
    		var _this = this;
    		this.ajax(this,{
				url:api.fund_getFundraiseProjectById,
				type:"get",
				data:{
					id:this.id
				},
				success:(res) => {
					console.log(res)
					_this.detail = res.body.data;
					console.log(_this.detail.fundraiseUserInfoId)
				},
				complete:(res) => {
					
				}
			})
    	},
    	getPayList(){
    		///fund_getRemitApplyByFundIdList
    		this.ajax(this,{
				url:api.fund_getRemitApplyByFundIdList,
				type:"get",
				data:{
					id:this.id
				},
				success:(res) => {
					console.log(res)
					_this.detail = res.body.data;
				},
				complete:(res) => {
					
				}
			})
    	},
    	doPayMoney(){
    		var _this = this;
    		this.ajax(this,{
				url:api.fund_fundraiseRemitApplyList,
				type:"get",
				data:{
					id:this.id
				},
				success:(res) => {
					console.log(res)
					_this.detail = res.body.data;
				},
				complete:(res) => {
					
				}
			})
    	},
    	getformData(data){
    		var result = {};
    		for (var idx in data) {
    			result[idx] = data[idx]
    		}
    		var reso = data.fundraiseProjectResources;
    		var strArr = [];
    		for (var i = 0; i < reso.length; i++) {
    			strArr.push(reso[i].resourceUrl)
    		}
    		result.fundraiseProjectResources = strArr.join(',');
    		return result;
    	},
    	pick(e){
    		console.log(e)
    	},
    	postMyEdit(_form,cbName){
    		var _this = this;
 
    		
    		if(_form == "editProject"){
    			this[_form].form.fundraiseProjectImgurl = this.imgkey;
    			this[_form].form.fundraiseProjectResources = this.imgList;
    			this[_form].form.fundraiseStartTime = (new Date(this[_form].form.fundraiseStartTime)).format('yyyy-MM-dd hh:mm:ss')
    			
    			//console.log(this[_form].form.fundraiseStartTime)
    		}
    		//this[_form].form.fundraiseProjectImgurl = this.imgkey;

    		this.$refs[_form].validate((valid) => {
    			if(valid){
    				_this[_form].disabled = true;
    				_this.ajax(_this,{
    					url:_this[_form].url,
    					type:"post",
    					data:_this.getformData(this[_form].form),
    					success:(res) => {
    						_this[cbName] && _this[cbName](res);
    						_this.$refs[_form].resetFields();
    						_this.getDetail()
    						$Message({
	                            type: 'success',
	                            message: "保存成功！"
	                        });
    					},
    					complete:(res) => {
    						_this[_form].disabled = false;
    						_this[_form].visible = false;
    					}
    				})
    			}
    		})
    	}
    },
    created(){
    	this.id = this.$route.params.id;
    	this.getDetail();
    }
}
</script>
<style  lang="less">
	.projectDetail {
		padding: 20px;
	}
	.object-list li {
		/*float: left;*/
		padding: 10px 0;
		display: -webkit-flex; /* Safari */
  		display: flex;
  		justify-content: flex-start;
  		align-items:center;
  		border-bottom: 1px solid #eee;
	}
	.object-list li.col-50 {
		width: 50%;

	}
	.object-list li .title {
		font-weight: bold;
		display: inline-block;
		width: 200px;
		text-align: right;
	}
	.object-list li .con {
		display: inline-block;
		max-width: 800px;
		text-align: left;
	}
	.projectDetail .options {
		text-align: right;
	}
	.projectDetail .el-upload {
		text-align: left;
	}
	.object-list {
		text-align: left;
		overflow: hidden;
	}
	.uploadTarget {
		text-align: left;
	}
	.img-list {
		overflow: hidden;
		list-style: none;
		margin: 0;
		padding: 0;
		.img-box {
			width: 128px;
			height: 128px;
			background-size: contain;
			position: relative;
		}
		.del-img {
			position: absolute;
			top: 5px;
			right: 5px;
			font-size: 24px;
			cursor: pointer;
			color: #b90e25;
		}
		li {
			float: left;
			width: 128px;
			margin-right: 10px;
			margin-bottom: 10px;
			border: 1px solid #ddd;
			border-radius: 4px;
			&:hover {
				border: 1px solid #b90e25;
			}
		}
	}
</style>