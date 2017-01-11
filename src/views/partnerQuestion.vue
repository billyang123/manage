<template>
  <div class="founder" style="padding:20px">
    <h2>问题管理</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="handleAdd">新增问题
    </el-button>
    <el-table :data="tableData" border height="700" style="width: 100%">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="question" label="问题内容"></el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" label="操作">
          <span>
              <el-button @click="handleChange(row)" :plain="true" type="info">编辑</el-button>
              <el-button @click="handleDel(row.id,$index,row)" :plain="true" type="info">删除</el-button>
          </span>
      </el-table-column>
    </el-table>
    <div class="block" style="padding-top:30px;padding-bottom:40px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="[30, 50, 100, 200]" :page-size="currentPageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
      </el-pagination>
    </div>
    <!--弹窗-->
    <div class="aw-dialog">
      <el-dialog :title="dialogtitle" v-model="dialogVisible" size="tiny">
        <el-form ref="formDialog" :model="formDialog" label-width="200px" :rules="rules">
          <el-form-item label="问题内容" prop="questionText">
            <el-input v-model="formDialog.questionText"></el-input>
          </el-form-item>
          <el-form-item v-for="(row, index) in formDialog.questionTableData" :label="'答案' + index"
                        :prop="'questionTableData.'+index+'.answerOption'"
                        :rules="{required: true, message: '答案不能为空', trigger: 'blur'}">
            <span class="radioss">
            <el-radio class="radio" style="float:left; margin-right: 20px;" v-model="formDialog.questionradio"
                      :label="row.answerCode"></el-radio></span>
            <span class="q-input"><el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                                            v-model="row.answerOption"></el-input></span>

            <el-button @click.prevent="awDel(row)">删除</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="awAdd()">新增答案</el-button>
            <el-button type="primary" @click="handleSure(UPUrl)" :disabled="btnBl">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import api from '../api/api'
  export
  default {
    created() {
      this.getUserData();
    },
    methods: {
      //重置
      handleReset(){
        this.$refs.formDialog && this.$refs.formDialog.resetFields();
      },
      //确认
      handleSure(sureUrl) {
        if (this.formDialog.questionTableData.length >= 2) {
          var self = this;
          var formData = {
            question: this.formDialog.questionText,
            answerCode: this.formDialog.questionradio,
            optionList: JSON.stringify(this.formDialog.questionTableData)
          }
          if (this.formDialog.id) {
            formData['id'] = this.formDialog.id;
          }
          this.$refs.formDialog.validate((valid) => {
              if (valid) {
                self.btnBl = true;
                self.ajax(this, {
                  url: sureUrl,
                  type: "post",
                  data: formData,
                  success: function (data) {
                    self.getUserData();
                    self.dialogVisible = false;
                    $Message({
                      type: 'success',
                      message: '添加或修改成功!'
                    });
                  },
                  complete: function () {
                    self.btnBl = false;
                  }
                })
              } else {
                return false
              }
            }
          )
        } else {
          $Message({
            type: 'error',
            message: '答案不能少于2个'
          });
        }
      },
      //修改
      handleChange(row) {
        this.dialogVisible = true;
        this.dialogtitle = '修改问题';
        this.UPUrl = api.getPartnerQuestionUpdata;
        this.formDialog = {
          questionText: row.question,
          questionTableData: row.optionList,
          questionradio: row.answerCode,
          id: row.id
        }
      },
      //新增
      handleAdd() {
        this.dialogVisible = true
        this.dialogtitle = '添加问题'
        this.UPUrl = api.getPartnerQuestionAdd;
        this.formDialog = {
          questionText: '',
          questionTableData: [],
          questionradio: '',
        }
      },
      //删除
      handleDel(id, index, row) {
        var self = this;
        $MsgBox.confirm('此操作将永久删除该问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.ajax(this, {
            url: api.getPartnerQuestionDel,
            type: "post",
            data: {
              id: id
            },
            success: function (data) {
              self.getUserData();
              $Message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          $Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新增答案
      awAdd() {
        this.dialogVisible = true
        this.dialogtitle = '添加问题'
        if (this.formDialog.questionTableData.length > 0) {
          var max = this.formDialog.questionTableData[0].id;
          var num = parseInt(this.formDialog.questionTableData[0].answerCode);
          for (var i = 0; i < this.formDialog.questionTableData.length; i++) {
            if (max <= this.formDialog.questionTableData[i].id) {
              max = this.formDialog.questionTableData[i].id + 1;
            }
            if (num <= parseInt(this.formDialog.questionTableData[i].answerCode)) {
              num = parseInt(this.formDialog.questionTableData[i].answerCode) + 1;
            }
          }
        } else {
          max = 1;
          num = 0;
        }
        this.formDialog.questionTableData.push({
          "id": '',
          "testQuestionId": 1,
          "answerCode": "" + num,
          "answerOption": "",
          "status": "online"
        });
      },
      //删除答案
      awDel(item) {
        this.dialogVisible = true
        this.dialogtitle = '添加问题'
        if (item.answerCode != this.formDialog.questionradio) {
          if (this.formDialog.questionTableData.length > 2) {
            var index = this.formDialog.questionTableData.indexOf(item)
            if (index !== -1) {
              this.formDialog.questionTableData.splice(index, 1)
            }
          } else {
            $Message({
              type: 'error',
              message: '答案不能少于2个'
            });
          }
        } else {
          $Message({
            type: 'error',
            message: '正确答案不能删除'
          });
        }
      },
      //问题列表
      getUserData() {
        let self = this;
        this.ajax(this, {
          url: api.getPartnerQuestion,
          type: "get",
          data: {
            page: self.currentPage - 1,
            size: self.currentPageSize
          },
          success: function (data) {
            let _data = data.body.data;
            if (_data) {
              self.tableData = _data.content
              self.totalElement = _data.totalElements
              self.totalPages = _data.totalPages
            }
          }
        })
      },

      handleSizeChange(val) {
        this.currentPageSize = val;
        this.currentPage = 1;
        this.getUserData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserData();
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogtitle: '',
        UPUrl: '',
        btnBl: false,
        formDialog: {
          questionText: '',
          questionTableData: {},
          questionradio: '',
        },
        rules: {
          questionText: [{
            required: true,
            message: '请输入问题内容',
            trigger: 'blur,change'
          },],
        },
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
        tableData: []
      }
    }
  }
</script>
<style>
  .nomargin .el-form-item__content {
    margin: 0 !important;
  }

  .aw-dialog .q-input .el-textarea {
    width: 400px;
    float: left;
    margin-right: 20px;
  }

  .radioss .el-radio__label {
    display: none;
  }
</style>
