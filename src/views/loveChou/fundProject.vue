<template>
 <div class="fundAppList">
 	<h2>项目列表</h2>
	  <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    
	    <el-table-column
	      prop="fundraiseProjectTitle"
	      label="项目标题"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="userNickname"
	      label="申请人昵称"
	      width="150">
	    </el-table-column>

	    <el-table-column
	      prop="fundraiseProjectDesc"
	      label="项目描述"
	      width="500">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      prop="status"
	      label="状态"
	      width="200">
			<span>{{status[row.status]}}</span>
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      label="操作">
	      <div>
	      	<!-- <el-button size="small" @click="showChangeHandle('payMoney')">打款</el-button> -->
	      	<el-button size="small" v-if="row.status == 'view'" @click="changeStatus('unOnline',row)" :plain="true" type="info">取消预览</el-button>
	      	<el-button size="small" v-if="row.status == 'approved'" @click="changeStatus('online',row)" :plain="true" type="info">在线预览</el-button>
	      	<el-button size="small" @click="changeStatus('publish',row)" :plain="true" type="info" v-if="row.status == 'view'">发布筹款</el-button>
	      	<el-button size="small" @click="showChangeHandle('forceClose',row)" v-if="row.status != 'finish'" :plain="true" type="info">强制关闭</el-button>
	      	<!-- <el-button size="small" @click="showChangeHandle('commit')">评论维护1</el-button> -->
	      	<router-link :to="'/projectDetail/'+row.id">
	      	<el-button size="small">
		      		查看详情
	      	</el-button>
	      	</router-link>
	      </div>
	    </el-table-column>
	  </el-table>
	  <div class="pagination-box">
		  <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page"
		      :page-sizes="[20, 40, 60, 80]"
		      :page-size="size"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		  </el-pagination>
	  </div>
	  
	<el-dialog :title="'强制关闭'+forceClose.name" v-model="forceClose.visible">
	  	<el-form :model="forceClose.form" ref="forceClose">
	  		<el-form-item label="理由" label-width="50px" prop="finishReason">
		      <el-input type="textarea" v-model="forceClose.form.finishReason" auto-complete="off"></el-input>
		    </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  	<el-button @click="forceClose.visible = false">取 消</el-button>
		    <el-button type="primary" @click="postMyEdit('forceClose','fCloseBack')" :disabled="forceClose.disabled">确定</el-button>
		</div>
	</el-dialog>
 </div>
</template>
<script>
import api from '../../api/api'
 export default {
  	name:"fundProject",
  	data(){
  		return {
  			page:1,
  			size:20,
  			total:2,
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
  			
  			onlineTxt:{
  				on:"在线预览",
  				off:"取消预览",
  				url:"#"
  			},
  			commit:{
  				disabled:false,
  				visible:false,
  				url:"#"
  			},
  			online:false,
  			unOnline:false,
  			publish:{
  				status:false
  			},
  			forceClose:{
  				disabled:false,
  				visible:false,
  				status:false,
  				name:"",
  				form:{
  					id:1,
  					finishReason:''
  				},
  				url:api.fund_closeFundraise
  			},
  			curProject:{
  				fundraiseProjectTitle:"项目标题",
  				fundraiseProjectDesc:"项目描述"
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
  			tableData:[
  				{
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
		            "createTime": "2016-12-12 09:20:13",
		            "approveTime": "2016-12-12 09:20:13",
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
		            "fundraiseStartTime": "2016-12-12 09:20:13",
		            "fundraiseEndTime": "2016-12-12 09:20:13",
		            "fundraiseProjectImgurl": " tt",
		            "operateTime": "2016-12-12 09:20:13",
		            "shareTitle": "分享标题",
		            "shareContent": "分享内容",
		            "detail": "详细内容"
		        }
  			]

  		}
  	},
    methods: {
    	showChangeHandle(type,row){
    		this[type].visible = true;
    		this.curProject = row;
    		if(type == "editProject"){
    			this[type].form = row;
    		}
    		if(type == "forceClose"){
    			this.forceClose.form.id = row.id
    			this[type].name = row.fundraiseProjectTitle;
    		}
    	},
    	handleSizeChange(val){
    		this.size = val;
    		this.getObjectList();
    	},
    	handleCurrentChange(val){
    		this.page = val;
    		this.getObjectList();
    	},
    	changeStatus(type,row){
    		let txt = "";
    		let _url = "";
    		let success_txt = ""
    		this.curProject = row;
    		let _this = this;
    		switch(type){
    			case "unOnline":
    				txt = '此操作将取消在线预览该项目, 是否继续?';
					_url = api.fund_cancelPublishPreview;
					success_txt = '取消在线预览该项目成功'
    			break;
    			case "online":
    				txt = '此操作将可在线预览该项目, 是否继续?';
					_url = api.fund_publishPreview
					success_txt = '设置在线预览该项目成功'
				break;
    			case "publish":
    				txt = '此操作将发布改筹款项目, 是否继续?';
    				success_txt = '发布改筹款项目成功'
    				_url = api.fund_publishFundraise
    			break;
    			default:break;
    		}
    		_this.ajax(_this,{
				url:_url,
				type:"post",
				data:{
					id:row.id
				},
				success:(res) => {
					_this.getObjectList()
                    $Message({
                        type: 'success',
                        message: success_txt
                    });
				},
				complete:(res) => {
					
				}
			})
    // 		$MsgBox.confirm(txt, '提示', {
    //             confirmButtonText: '确定',
    //             cancelButtonText: '取消',
    //             type: 'warning'
    //         }).then(() => {
    //         	console.log("changeStatus",url)
    //         	_this.ajax(_this,{
				// 	url:_url,
				// 	type:"post",
				// 	data:{
				// 		id:row.id
				// 	},
				// 	success:(res) => {
				// 		_this.getObjectList()
    //                     $Message({
    //                         type: 'success',
    //                         message: success_txt
    //                     });
				// 	},
				// 	complete:(res) => {
						
				// 	}
				// })

    //         }).catch (() => {
                
    //         });
            // this[type].status = !this[type].status;
    	},
    	getObjectList(){
    		var _this = this;
    		this.ajax(this,{
				url:api.fund_getFundraiseProjectList,
				type:"get",
				data:{
					page:this.page-1,
					size:this.size
				},
				success:(res) => {
					_this.tableData = res.body.data.content;
					_this.total = res.body.data.totalElements
				},
				complete:(res) => {
					
				}
			})
    	},
    	postMyEdit(_form,cbName){
    		var _this = this;
    		console.log(this.$refs[_form] )
    		this.$refs[_form].validate((valid) => {
    			if(valid){
    				_this[_form].disabled = true;
    				_this.ajax(_this,{
    					url:_this[_form].url,
    					type:"post",
    					data:_this[_form].form,
    					success:(res) => {
    						_this.getObjectList();
    						_this[cbName] && _this[cbName](res);
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
    	this.getObjectList();
    }
}
</script>
<style>
	.pagination-box {
		padding: 10px;
	}
	.fundAppList {
		padding: 20px;
	}
</style>