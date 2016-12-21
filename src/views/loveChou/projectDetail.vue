<template>
 <div class="projectDetail">
 	<h2>{{detail.fundraiseProjectTitle}}</h2>
 	<div class="options">
		<router-link to="/fundProject" style="margin-right:15px;">
	      	<el-button size="small">
		      		返回列表
	      	</el-button>
	    </router-link>


		<el-button size="small" @click="showChangeHandle('editProject')" :plain="true" type="info">编辑</el-button>
		<router-link :to="'/projectTrends/'+id+'?name='+detail.fundraiseProjectTitle+'&fundraiseUserInfoId='+detail.fundraiseUserInfoId+'&fundraiseProjectId='+detail.id">
	      	<el-button size="small" :plain="true" type="info">动态</el-button>
	    </router-link>
	    <el-button size="small" :plain="true" type="info" @click="showChangeHandle('commit')">评论维护</el-button>
	    <router-link :to="'/remitApplyList/'+id+'?name='+detail.fundraiseProjectTitle+'&fundraiseUserInfoId='+detail.fundraiseUserInfoId+'&fundraiseProjectId='+detail.id">
	      	<el-button size="small" :plain="true" type="info">
		      		打款纪录
	      	</el-button>
	    </router-link>
	</div>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">申请资料</span>
		</div>
		<div class="object-list">
			<el-row :gutter="20">
				<el-col :span="6">
					<p><span class="title">患者姓名：</span><span class="con">{{detail.patientName}}</span></p>
				</el-col>
				<el-col :span="18">
					<p><span class="title">申请筹款金额：</span><span class="con">{{detail.fundraiseApplyTargetAmount}}元</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">筹款原因：</span><span class="con">{{detail.fundraiseReson}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<p><span class="title">联系人姓名：</span><span class="con">{{detail.linkmanName}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">联系人电话：</span><span class="con">{{detail.linkmanPhone}}</span></p>
				</el-col>
				<el-col :span="6">
					<p style="height: 20px;"><span class="title" style="width:120px;">申请人头像：</span><img :src="detail.userHeadimgurl" alt="" style="width:50px;height:50px;position:relative;top:-14px;border-radius:100%;"/></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title" style="width:120px;">申请人昵称：</span><span class="con">{{detail.userNickname}}</span></p>
				</el-col>
			</el-row>
		</div>
	</el-card>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">上线资料</span>
		</div>
		<div class="object-list">
			<el-row :gutter="20">
				<el-col :span="6">
					<p><span class="title" style="width:120px;">项目名称：</span><span class="con">{{detail.fundraiseProjectTitle}}</span></p>
				</el-col>
				<el-col :span="18">
					<p><span class="title" >患者姓名(线上显示)：</span><span class="con">{{detail.acturalPatientName}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<p><span class="title">目标筹款金额：</span><span class="con">{{detail.fundraiseTargetAmount}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">已筹款金额：</span><span class="con">{{detail.fundraiseAcquiredAmount}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">累计打款金额：</span><span class="con">{{detail.fundraiseRemitAmount}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">

				<el-col :span="9">
					<p><span class="title">筹款开始时间：</span><span class="con">{{detail.fundraiseStartTime}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">筹款持续时间(天数)：</span><span class="con">{{detail.fundraiseProjectDuration}}</span></p>
				</el-col>
				<el-col :span="9">
					<p><span class="title">筹款结束时间：</span><span class="con">{{detail.fundraiseEndTime}}</span></p>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">项目简介：</span><span class="con">{{detail.fundraiseProjectDesc}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">项目详情：</span></p>
					<div class="con" style="padding:0 20px;" v-html="detail.detail"></div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">分享标题：</span><span class="con">{{detail.shareTitle}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">分享副标题：</span><span class="con">{{detail.shareContent}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<p><span class="title">封面图片：</span><img v-if="detail.fundraiseProjectImgurl" :src="detail.fundraiseProjectImgurl" alt="" style="width:50px;height:50px;position:relative;"/></p>
				</el-col>
			</el-row>
			<el-col :span="6">
					<p>
						<span class="title">项目图片：</span>
						<span class="img-center" v-for="item in detail.fundraiseProjectResources" :style="{backgroundImage:'url('+item.resourceUrl+')',width:'50px',height:'50px',position:'relative',marginRight:'5px'}"></span>
						<!-- <img v-for="item in detail.fundraiseProjectResources" :src="item.resourceUrl" alt="" style="width:50px;height:50px;position:relative;margin-right:5px;"/> -->
					</p>
			</el-col>
		</div>
	</el-card>
	<el-card class="box-card">
		<div class="object-list">
			<el-row :gutter="20">
				<el-col :span="8">
					<p><span class="title">项目状态：</span><span class="con">{{status[detail.status]}}</span></p>
				</el-col>
				<el-col :span="8">
					<p><span class="title">完成原因：</span><span class="con">{{finishReason[detail.finishReason]?finishReason[detail.finishReason]:''}}</span></p>
				</el-col>
				<el-col :span="8">
					<p><span class="title">审核意见：</span><span class="con">{{detail.suggestion}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8">
					<p><span class="title">创建时间：</span><span class="con">{{detail.createTime}}</span></p>
				</el-col>
				<el-col :span="8">
					<p><span class="title">审核时间：</span><span class="con">{{detail.approveTime}}</span></p>
				</el-col>
				<el-col :span="8">
					<p><span class="title">操作时间：</span><span class="con">{{detail.operateTime}}</span></p>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="6">
					<p><span class="title">分享次数：</span><span class="con">{{detail.fundraiseShareCount}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">分享进入次数：</span><span class="con">{{detail.fundraiseShareOpenCount}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">捐款次数：</span><span class="con">{{detail.fundraiseDonationCount}}</span></p>
				</el-col>
				<el-col :span="6">
					<p><span class="title">点击捐款次数：</span><span class="con">{{detail.fundraiseDonationClickCount}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<p><span class="title">评论数（包括回复）：</span><span class="con">{{detail.fundraiseCommentCount}}</span></p>
				</el-col>
				<el-col :span="12">
					<p><span class="title">打开次数：</span><span class="con">{{detail.openCount}}</span></p>
				</el-col>
			</el-row>
		</div>
	</el-card>
	<!-- 发起人昵称，目标金额，项目标题，项目详情，患者名字，图片列表，分享主标题、副标题，封面图，筹款时间 -->
	<el-dialog title="编辑项目" v-model="editProject.visible" size="large">
	  <el-form :model="editProject.form" :rules="editProject.rules" ref="editProject">
	    <el-form-item label="项目名称" label-width="150px" prop="fundraiseProjectTitle">
	      <el-input type="text" v-model="editProject.form.fundraiseProjectTitle"></el-input>
	    </el-form-item>
	    <el-form-item label="患者姓名(线上显示)" label-width="150px" prop="acturalPatientName">
	      <el-input type="text" v-model="editProject.form.acturalPatientName" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="目标筹款金额(元)" label-width="150px" prop="fundraiseTargetAmount">
	      <el-input type="text" v-model.number="editProject.form.fundraiseTargetAmount" auto-complete="off"></el-input>
	    </el-form-item>

	    <el-form-item label="筹款持续时间(天数)" label-width="150px" prop="fundraiseProjectDuration">

	      <el-input type="text" v-model.number="editProject.form.fundraiseProjectDuration" auto-complete="off"></el-input>
	    </el-form-item>

	      <!-- <el-input type="text" v-model="editProject.form.fundraiseStartTime" auto-complete="off"></el-input> -->

	    <!--</el-form-item>-->
	    <el-form-item label="项目简介" label-width="150px" prop="fundraiseProjectDesc">
	      <el-input type="textarea" v-model="editProject.form.fundraiseProjectDesc" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="项目详情" label-width="150px" prop="detail">
	    	<!-- <vue-html-editor name="html-editor" :model.sync="editProject.form.detail"></vue-html-editor> -->
	      <!-- <el-input type="textarea" v-model="editProject.form.detail" auto-complete="off"></el-input> -->
			<!-- <vue-html5-editor :content="editProject.form.detail" :height="80"></vue-html5-editor> -->
	      	<!-- <vue-html5-editor :content="editProject.form.detail" :height="80"></vue-html5-editor> -->
	      	<!-- <el-input type="textarea" v-model="editProject.form.detail" auto-complete="off"></el-input> -->


	      	<quill-editor ref="myTextEditor"
	              v-model="editProject.form.detail"
	              :config="editorOption">
			</quill-editor>



			<!-- <quill-editor ref="myTextEditor"
	              v-model="editProject.form.detail"
	              :config="editorOption"
	              @blur="onEditorBlur"
	              @focus="onEditorFocus"
	              @ready="onEditorReady"
	              >
			</quill-editor> -->
	    </el-form-item>
	    <el-form-item label="分享标题" label-width="150px" prop="shareTitle">
	      <el-input type="text" v-model="editProject.form.shareTitle" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="分享副标题" label-width="150px" prop="shareContent">
	      <el-input type="textarea" v-model="editProject.form.shareContent" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="封面图片地址" label-width="150px">
			<ul class="img-list" style="padding:10px 0;">
				<li>
					<div class="img-box" :style="{backgroundImage:'url('+imgkey+'!160x160)'}"></div>
				</li>
			</ul>
			<div class="uploadTarget">
				<el-upload
				:show-upload-list="false"
			  :action="uploadUrl"
			  :data="{platform:'fundraise'}"
			  :on-success="handleKeyUpSuccess" ref="keyUpload">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,且不能超过10M</div>
				</el-upload>
			</div>
	      	<!-- <el-input type="textarea" v-model="editProject.form.fundraiseImgKey" auto-complete="off"></el-input> -->
	    </el-form-item>
	    <el-form-item label="图片列表" label-width="150px">
			<!-- <el-input type="text" v-model="editProject.form.fundraiseProjectResources" auto-complete="off"></el-input> -->
		    <ul class="img-list">
		      	<li v-for="(item,index) in imgList" v-dragging="{ item: item, list: imgList, group: 'item' }" :key="item.resourceUrl">
                <div class="img-box" :style="{backgroundImage:'url('+item.resourceUrl+'!160x160)'}">
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
		      	:show-upload-list="showUploadList"
		      	:before-upload="beforeUpload"
				  :action="uploadUrl"
				  :data="{platform:'fundraise'}"
				  :on-success="handleUpSuccess" ref="listUpload">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,且不能超过10M</div>
				</el-upload>
			</div>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="editProject.visible = false">取 消</el-button>
	    <el-button type="primary" @click="postMyEdit('editProject')" :disabled="editProject.disabled">保存</el-button>
	  </div>
	</el-dialog>
	<el-dialog title="评论维护" v-model="commit.visible">
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

  		var myNumber = (rule, value, callback) => {
	        if (!value) {
	          return callback(new Error('不能为空或不能为0'));
	        }
	        setTimeout(() => {
	          if (!Number.isInteger(value)) {
	            callback(new Error('请输入数字'));
	          } else {
	          	callback();
	          }
	        }, 1000);
	    };
  		return {
  		  editor: null,
  		  loggedEvent:"",
  			editorOption:{},
  			id:1,
  			uploadUrl:api.fund_image,
  			imgkey:"",
  			imgList:[],
  			status:{
  				"new":"申请中",
  				"reject":"审核不通过",
  				"approved":"审核通过",
  				"view":"预览",
  				"process":"筹款中",
  				"finish":"筹款完成"
  			},
  			commitList:[
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
					acturalPatientName:[
						{ required: true, message: '请填写患者姓名(线上显示)', trigger: 'change,blur' }
					],
					fundraiseTargetAmount:[
						{validator:myNumber,trigger: 'change,blur'}
						//{ required: true, message: '请填写目标筹款金额', trigger: 'change,blur' }
					],
					fundraiseAcquiredAmount:[
						{validator:myNumber,trigger: 'change,blur'}
						//{ required: true, message: '请填写筹款金额', trigger: 'change,blur' }
					],
					fundraiseRemitAmount:[
						{validator:myNumber,trigger: 'change,blur'}
						//{ required: true, message: '请填写累计打款款金额', trigger: 'change,blur' }
					],
					fundraiseProjectDuration:[
						{validator:myNumber,trigger: 'change,blur'}
						//{ required: true, message: '请正确填写筹款持续时间(天数)', trigger: 'change,blur' }
					],
					fundraiseEndTime:[
						{ required: true, message: '请填写筹款结束时间', trigger: 'change,blur' }
					],

					fundraiseProjectDesc:[
						{ required: true, message: '请填写项目简介', trigger: 'change,blur' }
					],

					detail:[
						{ required: true, message: '请填写项目详情', trigger: 'change,blur' }
					],
					shareTitle:[
						{ required: true, message: '请填写分享副标题', trigger: 'change,blur' }
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
            "acturalPatientName":"",
            "linkmanName": "meixi",
            "linkmanPhone": "12345678901",
            "userNickname": "小熊",
            "userHeadimgurl": "",
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
            "fundraiseEndTime": "",
            "fundraiseProjectImgurl": "",
            "operateTime": "2016-12-12 10:29:30",
            "shareTitle": "分享标题",
            "shareContent": "分享内容",
           "fundraiseImgKey":"",
            "detail": "明细",
            "fundraiseProjectResources":[]
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
		        "userHeadimgurl": "",
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
		        "fundraiseProjectImgurl": "",
		        "operateTime": "2016-12-12 10:29:30",
		        "shareTitle": "分享标题",
		        "shareContent": "分享内容",
		        "detail": "明细",
		        "fundraiseImgKey":"",
		        "fundraiseProjectResources":[]
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
		        },
		     showUploadList:false
  		}
  	},
    methods: {
    	beforeUpload(res){
    		this.showUploadList = true;
    	},
    	handleKeyUpSuccess(res){
    		this.showUploadList = false;
    		this.$refs.keyUpload.clearFiles();
    		this.imgkey = res.data;
    	},
    	handleUpSuccess(res){
    		this.$refs.listUpload.clearFiles();
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
	    	console.log(this.imgList)
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
    		if(type=="commit"){
    			this.getCommitList()
    		}
    		if(type=="doPayMoney"){
    			this.getPayList();
    		}
    		if(type = "editProject"){
    			this.$refs.editProject && this.$refs.editProject.resetFields();
    			//this.editProject.form = this.detail;
    			for(let item in this.detail){
    			    this.editProject.form[item] = this.detail[item]
    			}
    			console.log(this.editProject.form.acturalPatientName)

    			//this.editProject.form.fundraiseEndTime = this.editProject.form.fundraiseEndTime || (new Date()).format('yyyy-MM-dd HH:mm:ss');
    			this.editProject.form.fundraiseProjectDuration = this.editProject.form.fundraiseProjectDuration || 15;
	    		this.imgList = this.detail.fundraiseProjectResources;
	    		this.imgkey = this.detail.fundraiseProjectImgurl;
	    		this.editProject.form.acturalPatientName = !this.editProject.form.acturalPatientName?this.editProject.form.patientName:this.editProject.form.acturalPatientName;
	    		//this.editProject.form.detail.replace(/\r\n/g,"<br/>")
	    		//this.editProject.form.fundraiseTargetAmount = this.editProject.form.fundraiseTargetAmount
	    		//this.editProject.form.fundraiseRemitAmount = this.editProject.form.fundraiseRemitAmount+""
	    		//this.editProject.form.fundraiseProjectDuration = this.editProject.form.fundraiseProjectDuration+""
    			//console.log(this.editProject.form.detail.replace(/\r\n/g,"<br/>"))
    		}
    		this[type].visible = true;
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

					_this.detail = res.body.data;
					if(!res.body.data.shareTitle){
					   _this.detail.shareTitle = '【17爱心筹】'
					}

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

    	postMyEdit(_form,cbName){
    		var _this = this;


    		if(_form == "editProject"){
    			this[_form].form.fundraiseProjectImgurl = this.imgkey;
    			this[_form].form.fundraiseProjectResources = this.imgList;
    			this[_form].form.fundraiseStartTime = (new Date(this[_form].form.fundraiseStartTime)).format('yyyy-MM-dd hh:mm:ss')
    			//this.editProject.form.detail = this.compiledMarkdown(this.editProject.form.detail);
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
    						_this[_form].visible = false;
    						_this[cbName] && _this[cbName](res);
    						_this.$refs[_form].resetFields();
    						_this.getDetail()
    						_this.imgList=[];
    						$Message({
	                            type: 'success',
	                            message: "保存成功！"
	                        });
    					},
    					complete:(res) => {
    						_this[_form].disabled = false;

    					}
    				})
    			}
    		})
    	}
    },
    created(){
    	this.id = this.$route.params.id;
    	this.getDetail();
    },
    mounted () {
    this.$dragging.$on('dragged', ({ value }) => {

    })
  },

}
</script>
<style  lang="less">
	.projectDetail {
		padding: 20px;
		.box-card {
			margin-bottom: 20px;
		}
		.options {
			margin-bottom: 20px;
		}
	}
	.object-list {
		border:1px solid #ddd;
		.el-col {
			border-right:1px solid #ddd;
			&:last-child {
				border-right: 0;
			}
		}
		p {
			text-align: left;
			position: relative;
			display: flex;
		}
		.el-row {
			border-bottom: 1px solid #eee;
		}
		.title {
			font-weight: bold;
			display: block;
			white-space: nowrap;
    		padding-left: 20px;
		}
		.con {
			display: inline-block;
			text-align: left;
		}
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
		    background-repeat: no-repeat;
		    background-position: center;
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
	.el-upload__btn-delete {
		display: none !important;
	}
	.el-time-spinner {
		display: flex !important;
    	width: 100% !important;
    	position: relative !important;
    	overflow: hidden !important;
    	.el-time-spinner__wrapper {
    		width: 100% !important;
    	}
	}
	.img-center {
		display: inline-block;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}
	.ql-toolbar {
		text-align: left;
	}
	.ql-tooltip.ql-editing {
		z-index: 9999;
	}
	.ql-snow .ql-out-bottom, .ql-snow .ql-out-top {
		visibility: inherit;
	}
  .ql-align-justify{text-indent: 2em}
  .el-col-24 div.con p{text-indent: 2em}
</style>
