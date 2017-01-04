<template>
  <div class="founderData" style="padding:20px;">
    <h2>合伙人管理</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="getexcel">导出excel
    </el-button>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="getUserData">查询
    </el-button>
    <el-date-picker v-model="endDate" style="float:right;margin-bottom:10px;margin-right:10px" type="date"
                    placeholder="选择结束日期"></el-date-picker>
    <el-date-picker v-model="startDate" style="float:right;margin-bottom:10px;margin-right:10px" type="date"
                    placeholder="选择开始日期"></el-date-picker>
    <el-input placeholder="请输入合伙人账号" style="float:right;margin-bottom:10px;margin-right:10px"
              v-model="partnerName"></el-input>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="userPhone" label="合伙人账号"></el-table-column>
      <el-table-column prop="inviteNumber" label="邀请成功账户数"></el-table-column>
      <el-table-column prop="familyNumber" label="合伙人新增计划数"></el-table-column>
      <el-table-column inline-template label="状态">
        <span>{{row.status | status}}</span>
      </el-table-column>
      <el-table-column prop="applyTime" label="报名时间"></el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" label="操作" width="440px">
          <span>
              <el-button @click="handleChange(row)" :type="color(row.status)">{{row.status | unstatus}}</el-button>
              <el-button @click="getInviteTableData(row.userInfoId,row.userPhone)" :plain="true"
                         type="info">查看邀请详情</el-button>
            <el-button @click="getUserInfoTableData(row.userInfoId,row.userPhone)" :plain="true"
                       type="info">查看添加详情</el-button>
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
    <div class="small-dialog">
      <el-dialog :title="dialogtitle" v-model="dialogVisible" size="tiny">
        <el-form ref="formDialog" :model="formDialog">
          <el-form-item label="合伙人账号">
            <span class="span-input"><el-input v-model="formDialog.phone" :disabled="true"></el-input></span>
          </el-form-item>
          <el-table :data="formDialog.InviteTableData" border style="width: 100%">
            <el-table-column prop="userPhone" label="被邀请人ID"></el-table-column>
            <el-table-column prop="userCreateTime" label="账户注册时间"></el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="big-dialog">
      <el-dialog :title="dialogtitle2" v-model="dialogVisible2" size="tiny">
        <el-form ref="formDialog2" :model="formDialog2">
          <el-form-item label="合伙人账号">
            <span class="span-input">
            <el-input v-model="formDialog2.phone" :disabled="true"></el-input></span>
          </el-form-item>
          <el-table :data="formDialog2.UserInfoTableData" border style="width: 100%">
            <el-table-column prop="insuredName" label="家庭成员姓名"></el-table-column>
            <el-table-column inline-template label="添加关系">
              <span>{{row.relationshipCode| relationshipCode}}</span>
            </el-table-column>
            <el-table-column prop="projectName" label="所在社群"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import api from '../api/api'

  export
  default {
    created() {
      this.getUserData();
    },
    methods: {
      //数据列表
      getUserData() {
        let self = this;
        self.sdate = (new Date(self.startDate)).format('yyyy-MM-dd');
        self.edate = (new Date(self.endDate)).format('yyyy-MM-dd');
        if (self.sdate == 'NaN-aN-aN') {
          self.sdate = '';
        }
        if (self.edate == 'NaN-aN-aN') {
          self.edate = '';
        }
        if (self.sdate != '' && self.edate == '') {
          $Message({
            type: 'error',
            message: '结束时间不能为空'
          });
          return false;
        }
        if (self.sdate == '' && self.edate != '') {
          $Message({
            type: 'error',
            message: '开始时间不能为空'
          });
          return false;
        }
        this.ajax(this, {
          url: api.getPartnerd,
          type: "get",
          data: {
            page: self.currentPage - 1,
            size: self.currentPageSize,
            startDate: self.sdate,
            endDate: self.edate,
            userPhone: self.partnerName
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.tableData = _data.content
              self.totalElement = _data.totalElements
              self.totalPages = _data.totalPages
            }
          }
        })
      },
      //
      getexcel(){
        let self = this;
        if (self.startDate) {
          self.sdate = (new Date(self.startDate)).format('yyyy-MM-dd');
        }
        if (self.startDate) {
          self.edate = (new Date(self.endDate)).format('yyyy-MM-dd');
        }
        let url = '/manage/partner/exportPartnerInfo?startDate=' + self.sdate + '&endDate=' + self.edate + '&userPhone=' + self.partnerName;
        window.open(url);
      },
      //设置异常
      handleChange (row){
        let self = this;
        this.ajax(this, {
          url: api.getPartnerdStatus,
          type: "post",
          data: {
            id: row.id,
            status: row.status
          },
          success: function () {
            self.getUserData();
          }
        })
      },
      //邀请详情
      getInviteTableData(id, phone){
        this.dialogVisible = true
        this.dialogtitle = '邀请详情'
        let self = this;
        this.ajax(this, {
          url: api.getPartnerdInvite,
          type: "get",
          data: {
            id: id,
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.formDialog = {
                InviteTableData: _data, phone: phone,
              }
            }
          }
        })
      },
      //添加详情
      getUserInfoTableData(id, phone){
        this.dialogVisible2 = true
        this.dialogtitle2 = '添加详情'
        let self = this;
        this.ajax(this, {
          url: api.getPartnerdUserInfo,
          type: "get",
          data: {
            id: id
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.formDialog2 = {
                UserInfoTableData: _data,
                phone: phone,
              }
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
      },
      color(val){
        if (val == 'exception') {
          return 'success';
        } else if (val == 'online') {
          return 'danger';
        }
      }
    },
    filters: {
      status: function (val) {
        if (val == 'exception') {
          return '异常';
        } else if (val == 'online') {
          return '正常';
        }
      },
      unstatus: function (val) {
        if (val == 'exception') {
          return '解封';
        } else if (val == 'online') {
          return '设置成异常';
        }
      },
      relationshipCode: function (val) {
        if(val == 'SELF'){
          return '本人';
        } else if (val == 'MATE') {
          return '配偶';
        } else if (val == 'CHILDRENS') {
          return '子女';
        } else if (val == 'PARENTS') {
          return '双方父母';
        } else if (val == 'GRANDCHILD') {
          return '（外)孙子女';
        } else if (val == 'GRANDPARENTS') {
          return '双方(外)祖父母';
        }
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogtitle: '',
        dialogVisible2: false,
        dialogtitle2: '',
        UPUrl: '',
        formDialog: {
          InviteTableData: []
        },
        formDialog2: {
          UserInfoTableData: []
        },
        founderData: {},
        tableData: [],
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
        startDate: '',
        endDate: '',
        partnerName: '',
        sdate: '',
        edate: ''
      }
    },
  }
</script>
<style>
  .founderData .cell {
    text-align: center
  }

  .applyExcel {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
    width: 88px;
    height: 36px;
    color: rgb(255, 255, 255);
    background-color: rgb(32, 160, 255);
    border-color: rgb(32, 160, 255);
    border-radius: 4px;
    text-decoration: initial;
    line-height: 36px;
  }

  .big-dialog .el-dialog--tiny {
    width: 60% !important;
  }

  .span-input .el-input__inner{
    width:300px;
    background-color: #fff !important;
    border: none;
  }
</style>
