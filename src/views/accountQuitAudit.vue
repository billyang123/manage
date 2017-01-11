<template>
  <div class="founderData" style="padding:20px;">
    <h2>账户退出审核管理</h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userPhone" label="所属账号"></el-table-column>
      <el-table-column prop="insuredName" label="姓名"></el-table-column>
      <el-table-column inline-template label="关系或身份证"><span>{{row.relationshipCode | relationshipCodes(row.insuredIdNumber)}}</span>
      </el-table-column>
      <el-table-column prop="projectName" label="相关社群"></el-table-column>
      <el-table-column inline-template label="可退金额"><span>{{row.availableQuitBalance}}</span>
      </el-table-column>
      <el-table-column inline-template label="申请退款金额"><span>{{row.applyQuitBalance}}</span>
      </el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" width="400" label="操作">
        <span>
          <el-button @click="getMoneyData(row.id)" :plain="true" type="info">查看账单详情</el-button>
          <el-button @click="getQuitReason(row.id)" type="info">查看退出详情</el-button>
          <el-button @click="quitAudit(row.id)" type="danger">审核</el-button>
        </span>
      </el-table-column>
    </el-table>

    <!--弹窗（账单详情）-->
    <div class="community-dialog">
      <el-dialog :title="mdialogtitle" v-model="mdialogVisible" size="tiny">
        <el-form ref="mformDialog" :model="mformDialog">
          <p style="text-align: left;">当前社群余额：{{mformDialog.totalMoney | rewardMoneys}}元</p>
          <p style="text-align: left;">当前可退款金额：{{mformDialog.refundMoney | rewardMoneys}}元</p>
          <p style="text-align: left;">保障扣费金额：{{mformDialog.unrefundMoney | rewardMoneys}}元</p>
          <p style="text-align: left;">实际充值金额：{{mformDialog.allMoney | rewardMoneys}}元</p>
          <el-table :data="mformDialog.MoneyTableData" border style="width: 100%">
            <el-table-column prop="orderType" label="操作类型"></el-table-column>
            <el-table-column inline-template label="金额"><span>{{row.payAmt}}</span></el-table-column>
            <el-table-column prop="createTime" label="操作时间"></el-table-column>
            <el-table-column prop="orderRemark" label="备注"></el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="mdialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!--弹窗（审核）-->
    <div class="community-small-dialog">
      <el-dialog :title="adialogtitle" v-model="adialogVisible" size="tiny">
        <el-form ref="aformDialog" :model="aformDialog">
          <div style="margin-bottom: 20px;">退出计划是否通过？</div>
          <el-button @click="doquitAudit('pass')" type="info">通过</el-button>
          <el-button @click="doquitAudit('nopass')" type="danger">不通过</el-button>
          <el-button @click="adialogVisible = false">取消</el-button>
        </el-form>
      </el-dialog>
    </div>
    <!--弹窗（退出详情）-->
    <div class="community-dialog">
      <el-dialog :title="dialogtitle2" v-model="dialogVisible2" size="tiny">
        <el-form ref="formDialog2" :model="formDialog2" label-width="200px">
          <el-form-item label="所属账号：">
            <div class="textleft">{{formDialog2.userPhone}}</div>
          </el-form-item>
          <el-form-item label="姓名：">
            <div class="textleft">{{formDialog2.insuredName}}</div>
          </el-form-item>
          <el-form-item label="身份证或关系：">
            <div class="textleft">{{formDialog2.relationshipCode | relationshipCodes(formDialog2.insuredIdNumber)}}
            </div>
          </el-form-item>
          <el-form-item label="所在社群：">
            <div class="textleft">{{formDialog2.projectName}}</div>
          </el-form-item>
          <el-form-item label="可退款金额：">
            <div class="textleft">{{formDialog2.availableQuitBalance}}</div>
          </el-form-item>
          <el-form-item label="申请退款金额：">
            <div class="textleft">{{formDialog2.applyQuitBalance}}</div>
          </el-form-item>
          <el-form-item label="申请退出原因：">
            <div class="textleft">{{formDialog2.accountQuitReason}}</div>
          </el-form-item>
          <el-form-item label="审核时间：">
            <div class="textleft">{{formDialog2.auditTime}}</div>
          </el-form-item>
          <el-form-item label="人工退款时间：">
            <div class="textleft">{{formDialog2.quitTime}}</div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="block" style="padding-top:30px;padding-bottom:40px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="[30, 50, 100, 200]" :page-size="currentPageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalElement" v-if="totalPages>1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import api from '../api/api'
  export
  default {
    created() {
      this.getData();
    },
    methods: {
      //数据列表
      getData() {
        let self = this;
        this.ajax(this, {
          url: api.getAccountQuitAllList,
          type: "get",
          data: {
            page: self.currentPage - 1,
            size: self.currentPageSize,
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.tableData = _data.content;
              self.totalElement = _data.totalElements;
              self.totalPages = _data.totalPages;
            }
          }
        })
      },
      //金额明细
      getMoneyData(id){
        let self = this;
        self.mdialogVisible = true;
        self.mdialogtitle = '金额明细';
        this.ajax(this, {
          url: api.getAccountBill,
          type: "get",
          data: {
            id: id
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.mformDialog = {
                MoneyTableData: _data.accountBillList.content,
                totalMoney: _data.availableBalance,
                refundMoney: _data.availableQuitBalance,
                unrefundMoney: _data.totalPay,
                allMoney: _data.totalRecharge
              }
            }
          }
        })
      },
      //审核
      quitAudit(id){
        let self = this;
        self.adialogVisible = true;
        self.adialogtitle = '审核';
        self.listId = id;
      },
      //审核通过（quitAudit:pass 通过，nopass 不通过）
      doquitAudit(type){
        let self = this;
        this.ajax(this, {
          url: api.AccountQuitAudit,
          type: "post",
          data: {
            id: self.listId,
            quitAudit: type
          },
          success: function (data) {
            self.getData();
            self.adialogVisible = false;
          }
        });
      },
      //退出详情
      getQuitReason(id){
        let self = this;
        self.dialogVisible2 = true;
        self.dialogtitle2 = '退出详情';
        this.ajax(this, {
          url: api.getAccountQuitInfo,
          type: "get",
          data: {
            id: id
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.formDialog2 = {
                userPhone: _data.userPhone,
                insuredName: _data.insuredName,
                insuredIdNumber: _data.insuredIdNumber,
                relationshipCode: _data.relationshipCode,
                projectName: _data.projectName,
                availableQuitBalance: _data.availableQuitBalance,
                applyQuitBalance: _data.applyQuitBalance,
                accountQuitReason: _data.accountQuitReason,
                auditTime: _data.auditTime,
                quitTime: _data.quitTime
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
      }
    },
    filters: {
      relationshipCodes: function (val, Id) {
        if (val == 'SELF') {
          return Id;
        } else if (val == 'MATE') {
          return '老婆';
        } else if (val == 'PARENTS') {
          return '父母';
        } else if (val == 'CHILDRENS') {
          return '孩子';
        } else if (val == 'GRANDCHILD') {
          return '孙子/孙女';
        } else if (val == 'GRANDPARENTS') {
          return '祖父母/外租母';
        }
      },
      rewardMoneys: function (val) {
        return val * 100 / 10000;
      },
      accountStatuss: function (val) {
        if (val == 0) {
          return '未生效';
        } else if (val == 1) {
          return '生效中';
        } else if (val == 2) {
          return '余额告急';
        } else if (val == 3) {
          return '已失效';
        } else if (val == 4) {
          return '未启用';
        } else if (val == 5) {
          return '待认领';
        } else if (val == 6) {
          return '已退出';
        }
      },
      quitAudits: function (val) {
        if (val == 'pass') {
          return '审核通过';
        } else if (val == 'nopass') {
          return '审核不通过';
        } else if (val == 'auditing') {
          return '审核中';
        } else if (val == 'quit') {
          return '退出';
        }
      }
    },
    data() {
      return {
        tableData: [],
        listId:'',
        mdialogVisible: false,
        mdialogtitle: '',
        mformDialog: {
          MoneyTableData: [],
          totalMoney: '',
          refundMoney: '',
          unrefundMoney: '',
          allMoney: '',
        },
        adialogVisible: false,
        adialogtitle: '',
        aformDialog: {},
        dialogVisible2: false,
        dialogtitle2: '',
        formDialog2: {},
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
      }
    },
  }
</script>

<style>
  .community-head {
    width: 100%;
    overflow: hidden;
    text-align: right;
    line-height: 50px;
    margin-bottom: 10px;
  }

  .community-head span.text {
    margin-right: 10px;
  }

  .community-head span em {
    font-style: normal;
    font-weight: bold;
  }

  .community-small-dialog .el-dialog--tiny {
    width: 30%;
  }

  .community-big-dialog .el-dialog--tiny {
    width: 80%;
  }

  .community-dialog .el-dialog--tiny {
    width: 60%;
  }

  .community-dialog .el-form-item {
    margin-bottom: 10px;
  }

  .textleft {
    text-align: left;
  }
</style>
