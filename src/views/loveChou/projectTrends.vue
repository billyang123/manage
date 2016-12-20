<template>
 <div class="projectTrends">
 	<h2>{{this.projectTitle}}－动态维护</h2>
 	<div class="options">
		<router-link :to="'/projectDetail/'+id">
	      	<el-button size="small">
		      		返回项目详情
	      	</el-button>
	    </router-link>
		<el-button size="small" :plain="true" type="info" @click="showChangeHandle('addTrend')">新增动态</el-button>
	</div>
	<el-table
	    :data="tableData"
	    border
	    style="width: 100%">

	    <el-table-column
	      prop="userHeadimgUrl"
	      label="发布人头像"
	      inline-template
	      width="120">
	      <span>
	      	<img :src="row.userHeadimgUrl" alt="" style="width:50px;height:50px;border-radius:100%;">
	      </span>
	    </el-table-column>
	    <el-table-column
	      prop="userNickName"
	      label="发布人昵称"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="发布时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="content"
	      label="发布内容">
	    </el-table-column>
	    <el-table-column
	    	inline-template
	      prop="status"
	      label="状态"
	      width="150">
			<span>{{row.status=="invisible"?"隐藏":"显示"}}</span>
	    </el-table-column>
	    <el-table-column
	    	inline-template
	    	width="200"
	      label="操作">
	      <div>
	      	<el-button size="small" @click="showChangeHandle('editTrend',row)" :plain="true" type="info">编辑 </el-button>
	      	<el-button size="small" @click="delTrend(row.id)" :plain="true" type="info">删除 </el-button>
	      	<!--
	      	<el-button size="small">
		      		查看详情
	      	</el-button>
	      	</router-link> -->
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
	<el-dialog title="新增动态" v-model="addTrend.visible">
	  <el-form :model="addTrend.form" :rules="addTrend.rules" ref="addTrend">
	    <!-- <el-form-item label="发布人昵称" :label-width="addTrend.labelWidth" prop="userNickName">
	      <el-input type="text" v-model="addTrend.form.userNickName" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="发布人头像地址" :label-width="addTrend.labelWidth" prop="userHeadimgUrl">
	      <el-input type="text" v-model="addTrend.form.userHeadimgUrl" auto-complete="off"></el-input>
	    </el-form-item> -->
	    <el-form-item label="动态显示" :label-width="addTrend.labelWidth" prop="status">
	    	<div style="text-align:left;">
		    	<el-radio class="radio" v-model="addTrend.form.status" label="visible">显示</el-radio>
				<el-radio class="radio" v-model="addTrend.form.status" label="invisible">隐藏</el-radio>
			</div>
	    </el-form-item>
	    <el-form-item label="内容" :label-width="addTrend.labelWidth" prop="content">
	      <el-input type="textarea" v-model="addTrend.form.content" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="动态图片" :label-width="addTrend.labelWidth">
	     	 <ul class="img-list">
		      	<li v-for="(item,index) in imgList">
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
					  :data="uploadKey"
					  :on-success="handleUpSuccess" ref="trendUpload">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
	    </el-form-item>
	  </el-form>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="addTrend.visible = false">取 消</el-button>
		    <el-button type="primary" @click="postMyEdit('addTrend')" :disabled="addTrend.disabled">保存</el-button>
		</div>
	</el-dialog>
	  <el-dialog title="编辑动态" v-model="editTrend.visible">
		  <el-form :model="editTrend.form" :rules="editTrend.rules" ref="editTrend">
		    <el-form-item label="发布人昵称" :label-width="editTrend.labelWidth" prop="userNickName">
		      <el-input type="text" v-model="editTrend.form.userNickName" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="发布人头像地址" :label-width="editTrend.labelWidth" prop="userHeadimgUrl">
		      <el-input type="text" v-model="editTrend.form.userHeadimgUrl" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="动态显示" :label-width="editTrend.labelWidth" prop="status">
		    	<div style="text-align:left;">
			    	<el-radio class="radio" v-model="editTrend.form.status" label="visible">显示</el-radio>
					<el-radio class="radio" v-model="editTrend.form.status" label="invisible">隐藏</el-radio>
				</div>
		    </el-form-item>
		    <el-form-item label="内容" :label-width="editTrend.labelWidth" prop="content">
		      <el-input type="textarea" v-model="editTrend.form.content" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="动态图片" :label-width="editTrend.labelWidth">
		      <ul class="img-list">
		      	<li v-for="(item,index) in imgList" v-dragging="{ item: item, list: imgList, group: 'item' }" :key="item.resourceUrl">
		      		<div class="img-box" :style="{backgroundImage:'url('+item.resourceUrl+'!160x160)'}">
		      			<i class="del-img el-icon-circle-cross" @click="removeImg(index)"></i>
		      		</div>
					<div>
						<el-radio-group v-model="item.status">
							<el-radio class="radio" label="visible">显示</el-radio>
				      		<el-radio class="radio" label="invisible">隐藏</el-radio>

						</el-radio-group>

				    </div>
		      	</li>
		      </ul>
		      <div class="uploadTarget">
			      <el-upload
			      		ref="listUpload"
			      		:show-upload-list="showUploadList"
		      			:before-upload="beforeUpload"
				  		:action="uploadUrl"
				  		:data="{platform:'fundraise'}"
				  		:on-success="handleUpSuccess" :default-file-list="defaultImgList">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
		    </el-form-item>
		</el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="editTrend.visible = false">取 消</el-button>
	    <el-button type="primary" @click="postMyEdit('editTrend')" :disabled="editTrend.disabled">保存</el-button>
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
	          return callback(new Error('不能为空'));
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
  			id:1,
  			page:1,
  			total:2,
  			size:20,
  			labelWidth:'150px',
  			curType:"addTrend",
  			imgList:[],
  			uploadUrl:api.fund_image,
  			uploadKey:{platform:'fundraise'},
  			tableData:[],
  			showUploadList:false,
  			defaultImgList:[],
  			addTrend:{
  				disabled:false,
  				visible:false,
  				labelWidth:'150px',
  				url:api.fund_addFunPatienState,
  				form:{
  					fundraiseUserInfoId:1,
  					fundraiseProjectId:1,
  					userNickName:"",
  					userHeadimgUrl:"",
  					status:'visible',
  					content:"",
  					fundraisePatientStateResource:[]
  				},
  				rules:{
  					userNickName:[
  						 { required: true, message: '请填发布人昵称', trigger: 'change,blur' }
  					],
  					userHeadimgUrl:[
  						 { required: true, message: '请填发布人头像地址', trigger: 'change,blur' }
  					]
  				}
  			},
  			editTrend:{
  				disabled:false,
  				visible:false,
  				labelWidth:'150px',
  				url:api.fund_updateFunPatienState,
  				form:{
  					fundraiseUserInfoId:1,
  					fundraiseProjectId:1,
  					userNickName:"nnn",
  					userHeadimgUrl:"lll",
  					status:"invisible",
  					content:"dddd",
  					fundraisePatientStateResource:[]
  				},
  				rules:{
  					userNickName:[
  						 { required: true, message: '请填发布人昵称', trigger: 'change,blur' }
  					],
  					userHeadimgUrl:[
  						 { required: true, message: '请填发布人头像地址', trigger: 'change,blur' }
  					]
  				}
  			}
  		}
  	},
    methods: {
    	//上传图片
    	beforeUpload(res){
    		this.showUploadList = true;
    		//console.log(this.$refs)
    	},
	    handleUpSuccess(res){
	    	this.showUploadList = false;
	    	this.defaultImgList = [];
	  		this.$refs.listUpload && this.$refs.listUpload.clearFiles();
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
	    	this.imgList.splice(idx,1)
	    },

    	handleSizeChange(val){
    		this.size = val;
    		this.getTrendList();
    	},
    	handleCurrentChange(val){
    		this.page = val;
    		this.getTrendList();
    	},
    	showChangeHandle(type,row){
    		//this.fileList =
    		this.curType = type;
    		this[type].visible = true;
    		//this.fileList = [];
    		if(type=="editTrend"){
    			this[type].form = row;

    			this.imgList = row.fundraisePatientStateResource;
    		}
    		if(type == "addTrend"){
    			this.imgList = [];
    			this[type].form.id = "";
    			this[type].form.fundraiseUserInfoId = this.$route.query.fundraiseUserInfoId;
		        this[type].form.fundraiseProjectId = this.$route.query.fundraiseProjectId;
    		}

    	},
    	getTrendList(){
    		var _this = this;
    		this.ajax(this,{
				url:api.fund_getFundraiseStateList,
				type:"get",
				data:{
					id:this.id,
					page:this.page-1
				},
				success:(res) => {
					_this.tableData = res.body.data.content;
					_this.total = res.body.data.totalElements;
				},
				complete:(res) => {

				}
			})
    	},
  //   	readFile(e) {
		// 	var _this = this;
		// 	 var files = e.target.files || e.dataTransfer.files;
  //     		if (!files.length)
  //       	return;
  //       	var image = new Image();
		// 	var reader = new FileReader();

		// 	reader.onload = (e) => {
		// 		// _this.image = e.target.result;

		// 	};
		// 	reader.readAsDataURL(file);
		// },
    	delTrend(id){
    		var _this = this;
    		$MsgBox.confirm("此操作将删除该动态, 是否继续?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.ajax(_this,{
                    url:api.fund_deleteFunPatienState,
                    type:"post",
                    data:{
                        id:id
                    },
                    success:function(data){
                      	_this.getTrendList()
                        $Message({
                            type: 'success',
                            message: "删除动态成功！"
                        });
                    }
                  })


            }).catch (() => {

            });
    	},
    	getformData(data){
    		var result = {};
    		for (var idx in data) {
    			result[idx] = data[idx]
    		}
    		var reso = data.fundraisePatientStateResource;
    		var strArr = [];
    		for (var i = 0; i < reso.length; i++) {
    			strArr.push(reso[i].resourceUrl)
    		}

    		result.fundraisePatientStateResource = strArr.join(',');
    		console.log(result)
    		return result;
    	},
    	postMyEdit(_form,cbName){
    		var _this = this;

    		this[_form].form.fundraisePatientStateResource = this.imgList;

    		// if(_form == "editProject"){

    		// 	this[_form].form.fundraisePatientStateResource = this.imgList;
    		// }
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
    						_this.imgList = [];
    						_this.getTrendList();
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
    	this.projectTitle = this.$route.query.name
    	//console.log(this.$route)
    	this.getTrendList();
    }
}
</script>
<style lang="less">
	.projectTrends {
		padding: 20px;
		.options {
			padding: 10px;
			text-align: right;
		}
	}
</style>
