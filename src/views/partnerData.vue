<template>
  <div class="founderData" style="padding:20px;">
    <h2>数据统计</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="getexcel">导出excel
    </el-button>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="getUserData">查询
    </el-button>
    <el-date-picker v-model="endDate" style="float:right;margin-bottom:10px;margin-right:10px" type="date"
                    placeholder="选择结束日期"></el-date-picker>
    <el-date-picker v-model="startDate" style="float:right;margin-bottom:10px;margin-right:10px" type="date"
                    placeholder="选择开始日期"></el-date-picker>

    <el-table :data="tableData" border height="700" style="width: 100%">
      <el-table-column :label="founderData.partnerNewNumberCount+''">
        <el-table-column prop="partnerNewNumber" label="合伙人报名数量"></el-table-column>
      </el-table-column>
      <el-table-column :label="founderData.invitationNumberCount+''">
        <el-table-column prop="invitationNumber" label="邀请新加入用户数"></el-table-column>
      </el-table-column>
      <el-table-column :label="founderData.partnerFamilyNumberCount+''">
        <el-table-column prop="partnerFamilyNumber" label="合伙人新增添加家庭计划数"></el-table-column>
      </el-table-column>
      <el-table-column :label="founderData.rewardAmountCount+''">
        <el-table-column inline-template prop="rewardAmount" label="已发放奖励金额">
          <span>{{row.rewardAmount | rewardAmount}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="总数">
        <el-table-column prop="reportDate" label="创建时间"></el-table-column>
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
          url: api.getPartnerdData,
          type: "get",
          data: {
            page: self.currentPage - 1,
            size: self.currentPageSize,
            startDate: self.sdate,
            endDate: self.edate,
          },
          success: function (data) {
            let _data = data.body.data.partnerDataList;
            if (data.body.data) {
              self.tableData = _data.content
              self.totalElement = _data.totalElements
              self.totalPages = _data.totalPages
              self.founderData = data.body.data
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
        let url = '/manage/partner/exportPartnerData?startDate=' + self.sdate + '&endDate=' + self.edate;
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
      rewardAmount: function (val) {
        return parseFloat(val) / 100;
      },
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
