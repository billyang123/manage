<template>
  <div class="founder">
    <h2 style="padding-top:40px;color:#1D8CE0;font-size:30px">创始人说话题</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="handleAdd">话题上传</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="createTime"
          label="日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="时长"
          width="120">
        </el-table-column>
        <el-table-column
          prop="founderName"
          label="创始人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="founderHeadImg"
          label="创始人头像"
          width="320">
        </el-table-column>
        <el-table-column
          prop="founderTitle"
          label="创始人title"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="互动标题"
          width="120">
        </el-table-column>
        <el-table-column
          prop="contentWord"
          label="文字内容"
          width="420">
        </el-table-column>
        <el-table-column
          prop="contentUrl"
          label="视频或音频URL地址"
          width="220">
        </el-table-column>
        <el-table-column
          prop="coverImageUrl"
          label="视频封面"
          width="220">
        </el-table-column>
        <el-table-column
          prop="indexDisplay"
          label="首页展示"
          width="120">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          fixed="right"
          label="操作"
          width="160">
      <span>
        <el-button @click="handleChange(row)" type="text" size="small">修改</el-button>
        <el-button @click="handleDel(row.id,$index,row)" type="text" size="small">删除</el-button>

        <el-button @click="handleRelease" type="text" size="small" style="color:#FF4949">发布</el-button>

      </span>
        </el-table-column>
      </el-table>
    <div class="block" style="padding-top:30px;padding-bottom:40px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElement">
      </el-pagination>
    </div>

    <div class="fonunder-dialog">
      <el-dialog :title="dialogtitle" v-model="dialogVisible" size="tiny">
        <el-form ref="form" :model="form" label-width="200px" :rules="rules">
          <el-form-item label="上传时间" prop="time">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="视频或音频">
              <el-option label="音频" value="1"></el-option>
              <el-option label="视频" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="音频时间" prop="duration">
            <el-input v-model="form.duration"></el-input>
          </el-form-item>
          <el-form-item label="创始人姓名" prop="founderName">
            <el-input v-model="form.founderName"></el-input>
          </el-form-item>
          <el-form-item label="创始人头像" prop="founderHeadImg">
            <el-input v-model="form.founderHeadImg"></el-input>
          </el-form-item>
          <el-form-item label="创始人title" prop="founderTitle">
            <el-input v-model="form.founderTitle"></el-input>
          </el-form-item>
          <el-form-item label="视频或音频URL地址" prop="contentUrl">
            <el-input v-model="form.contentUrl"></el-input>
          </el-form-item>
          <el-form-item label="视频封面" prop="coverImageUrl">
            <el-input v-model="form.coverImageUrl"></el-input>
          </el-form-item>
          <el-form-item label="首页展示是否展示" prop="indexDisplay">
            <el-radio-group v-model="form.indexDisplay" >
              <el-radio :label="1" >展示</el-radio>
              <el-radio :label="0" >不展示</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSure()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '../api/api'

  export default {
      created(){
      this.getUserData();
      },
    methods: {
      handleSure(){
      var self=this;
      this.dialogVisible=false;

      var formData={
          id:this.form.id,
          type:this.form.type,
          duration:this.form.duration,
          founderName:this.form.founderName,
          founderHeadImg:this.form.founderHeadImg,
          founderTitle:this.form.founderTitle,
          contentUrl:this.form.contentUrl,
          coverImageUrl:this.form.coverImageUrl,
          indexDisplay:this.form.indexDisplay
      }
      console.log(formData)
       self.$http.post(api.getFounderChange, formData,{
	            	emulateJSON: true,
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
	            }).then((data) => {
					if(data.body.status == 0){
					this.getUserData();
					console.log('修改成功'+data)
						$Message({
				            type: 'success',
				            message: '添加或修改成功!'
				        });
					}else{
						$MsgBox.alert(data.body.msg)
					}
				}, (response) => {
				// error callback
				});


      },
      handleChange(row) {
       this.dialogVisible = true
       this.dialogtitle='修改话题'
       this.form = {
          id:row.id,
          time: row.time,
          type:row.type,
          duration:row.duration,
          founderName:row.founderName,
          founderHeadImg:row.founderHeadImg,
          founderTitle:row.founderTitle,
          contentUrl:row.contentUrl,
          coverImageUrl:row.coverImageUrl,
          indexDisplay:row.indexDisplay
        }

      },
      handleAdd(){
        this.dialogVisible = true
        this.dialogtitle='添加话题'
        this.form = {
          id:'',
          time: '',
          type:'',
          duration:'',
          founderName:'',
          founderHeadImg:'',
          founderTitle:'',
          contentUrl:'',
          coverImageUrl:'',
          indexDisplay:''
        }
      },
      handleDel(id,index,row){
      console.log(id,row)
      var self=this;
       $MsgBox.confirm('此操作将永久删除该话题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(api.getFounderDel, {
					topicId:id
				},{
	            emulateJSON: true,
					    headers:{"Content-Type":"application/x-www-form-urlencoded"}
	        }).then((data) => {
					if(data.body.status == 0){
						self.getUserData();
						$Message({
				            type: 'success',
				            message: '删除成功!'
				        });
					}else{
						$MsgBox.alert(data.body.msg)
					}
				}, (response) => {
				// error callback
				});
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消发布'
          });
        });
      },
      handleRelease(){
       $MsgBox.confirm('此操作将发布该话题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $Message({
            type: 'success',
            message: '发布成功!'
          });
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消发布'
          });
        });
      },
      getUserData(){
      var self=this;
      this.$http.get(api.getFounderData+'?page='+this.currentPage+'&size='+this.currentPageSize).then((data) => {
        if(data.body.status == 0){
        var _data=data.body.data;
        self.tableData =_data.content
        self.totalElement=data.body.data.totalElements
        }
      })
      },
       handleSizeChange(val) {
       this.currentPageSize=val;
       this.currentPage=1;
       this.getUserData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserData();
        console.log(this.currentPage);
      }
    },


    data() {
      return {
          dialogVisible: false,
          dialogtitle:'',
          form: {
          id:'',
          time: '',
          type:'',
          duration:'',
          founderName:'',
          founderHeadImg:'',
          founderTitle:'',
          contentUrl:'',
          coverImageUrl:'',
          indexDisplay:''
        },
        rules: {
          type: [
            { required: true, message: '请选择类型', trigger: 'blur,change' }
          ],
          duration: [
            { required: true, message: '请输入音频时间', trigger: 'blur,change' },
          ],
          founderName:[
          	{ required: true, message: '请输入创始人姓名', trigger: 'blur,change' }
          ],
          founderHeadImg:[
          	{ required: true, message: '请输入创始人头像', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ],
          founderTitle:[
          	{ required: true, message: '请输入创始人title', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ],
          founderHeadImg:[
          	{ required: true, message: '请输入视频或音频URL地址', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ],
          contentUrl:[
          	{ required: true, message: '请输入视频封面', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ],
          coverImageUrl:[
          	{ required: true, message: '请输入视频封面', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ],
          indexDisplay:[
          	{ required: true, message: '请选择是否首页展示', trigger: 'blur,change' }
          	//{ validator: checkPhone,trigger: 'blur,change' }
          ]
        },
        currentPage: 1,
        currentPageSize:10,
        totalElement:40,
        tableData: []
      }
    }
  }
</script>
<style>
  .founder .el-dialog--tiny{width:60%}
  .founder .el-form-item__content{margin-left:200px!important}
  .founder .el-table .Release-row {
    background: #c9e5f5;
  }
</style>
