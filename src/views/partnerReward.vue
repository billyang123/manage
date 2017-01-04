<template>
  <div class="founderData" style="padding:20px;">
    <h2>奖励分析</h2>
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
      <el-table-column prop="userPhone" label="合伙人账号">
      </el-table-column>
      <el-table-column inline-template label="奖励类型">
        <span>{{row.rewardType | rewardTypes}}</span>
      </el-table-column>
      <el-table-column prop="rewardFromUserPhone" label="被邀请人ID">
      </el-table-column>
      <el-table-column inline-template label="奖励金额">
        <span>{{row.rewardMoney | rewardMoneys}}</span>
      </el-table-column>
      <el-table-column prop="rewardProjectName" label="所属社群">
      </el-table-column>
      <el-table-column prop="rewardTime" label="奖励时间">
      </el-table-column>
      <el-table-column prop="grantTime" label="操作时间">
      </el-table-column>
      <el-table-column inline-template label="奖励是否发放">
        <span>{{row.rewardStatus | rewardStatuss}}</span>
      </el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" label="操作">
          <span v-if="row.rewardStatus == 'exception'">
              <el-button @click="handleChange(row.id)" :plain="true" type="info">人工发放</el-button>
          </span>
      </el-table-column>
    </el-table>
    <div class="block" style="padding-top:30px;padding-bottom:40px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="[30, 50, 100, 200]" :page-size="currentPageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
      </el-pagination>
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
          url: api.getPartnerdRewardData,
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
      handleChange(id){
        let self = this;
        this.ajax(this, {
          url: api.getPartnerdRewardUpdate,
          type: "post",
          data: {
            id: id
          },
          success: function (data) {
            self.getUserData();
          }
        });
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
        let url = '/manage/partner/exportPartnerAwardData?startDate=' + self.sdate + '&endDate=' + self.edate + '&userPhone=' + self.partnerName;
        window.open(url);
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
    filters: {
      rewardTypes: function (val) {
        if (val == 'invitation') {
          return '邀请奖励';
        } else if (val == 'family') {
          return '添加家庭账户奖励';
        } else if (val == 'agency') {
          return '代理续费奖励';
        } else if (val == 'mystery') {
          return '神秘奖励';
        }
      },
      rewardMoneys: function (val) {
        return parseFloat(val) / 100;
      },
      rewardStatuss: function (val) {
        if (val == 'auto') {
          return '已自动发放';
        } else if (val == 'manual') {
          return '已人工发放';
        } else if (val == 'exception') {
          return '异常未发放';
        }
      }
    },
    data() {
      return {
        founderData: {},
        tableData: [],
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
        startDate: '',
        endDate: '',
        partnerName: '',
        rewardTypes: '',
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
</style>
