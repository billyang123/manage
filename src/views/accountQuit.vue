<template>
  <div class="founderData" style="padding:20px;">
    <h2>账户退出管理</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="getUserData">查询
    </el-button>
    <el-input placeholder="请输入用户账号" style="float:right;margin-bottom:10px;margin-right:10px"
              v-model="partnerName"></el-input>
    <div class="community-head" v-if="IsShow">
      <span class="text"><em>当前账号：</em>{{detail.userPhone}}</span>
      <span class="text"><em>管理员姓名：</em>{{detail.userName}}</span>
      <span class="text"><em>管理员身份证：</em>{{detail.userIdCard}}</span>
      <el-button type="primary" style="margin-right:10px" @click="getQuitList()">查看退出记录</el-button>
    </div>
    <div v-if="IsShow">
      <el-table :data="tableData" border height="700" style="width: 100%">
        <el-table-column prop="insuredName" label="姓名"></el-table-column>
        <el-table-column inline-template label="关系或身份证"><span>{{row.relationshipCode | relationshipCodes(row.insuredIdNumber)}}</span>
        </el-table-column>
        <el-table-column prop="projectName" label="相关社群"></el-table-column>
        <el-table-column inline-template label="社群状态"><span>{{row.accountStatus | accountStatuss}}</span>
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间"></el-table-column>
        <el-table-column inline-template :context="_self" fixed="right" width="400" label="操作">
        <span>
          <i v-if="row.quitAudit=='auditing'"><el-button :disabled="true" type="info">退出审核中</el-button></i>
          <i v-else-if="row.quitAudit=='pass'"><el-button @click="getQuitReason(row.id)" type="info">查看退出详情</el-button></i>
          <i v-else><el-button @click="quitCommunity(row.id)" type="danger">申请退出</el-button></i>
          <el-button @click="getMoneyData(row.id)" :plain="true" type="info">查看账单详情</el-button>
        </span>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗（退出记录）-->
    <div class="community-big-dialog">
      <el-dialog :title="qdialogtitle" v-model="qdialogVisible" size="tiny">
        <el-form ref="qformDialog" :model="qformDialog">
          <el-table :data="qformDialog.QuitTableData" border style="width: 100%">
            <el-table-column prop="userPhone" label="所属账号"></el-table-column>
            <el-table-column prop="insuredName" label="姓名"></el-table-column>
            <el-table-column inline-template label="关系或身份证"><span>{{row.relationshipCode | relationshipCodes(row.insuredIdNumber)}}</span>
            </el-table-column>
            <el-table-column prop="projectName" label="相关社群"></el-table-column>
            <el-table-column inline-template label="申请退款金额"><span>{{row.applyQuitBalance | rewardMoneys}}</span></el-table-column>
            <el-table-column inline-template label="审核结果"><span>{{row.quitAudit | quitAudits}}</span></el-table-column>
            <el-table-column prop="userPhone" label="是否人工退款"></el-table-column>
            <el-table-column inline-template :context="_self" fixed="right" width="200" label="操作">
              <span><el-button @click="getQuitReason(row.id)" :plain="true" type="info">查看退出详情</el-button></span>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qdialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
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
            <el-table-column inline-template label="金额"><span>{{row.payAmt | rewardMoneys}}</span></el-table-column>
            <el-table-column prop="createTime" label="操作时间"></el-table-column>
            <el-table-column prop="orderRemark" label="备注"></el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="mdialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!--弹窗（退出社群）-->
    <div class="community-dialog">
      <el-dialog :title="dialogtitle" v-model="dialogVisible" size="tiny">
        <el-form ref="formDialog" :model="formDialog" label-width="200px" :rules="rules">
          <el-form-item label="所属账号：">
            <div class="textleft">{{formDialog.userPhone}}</div>
          </el-form-item>
          <el-form-item label="姓名：">
            <div class="textleft">{{formDialog.insuredName}}</div>
          </el-form-item>
          <el-form-item label="身份证或关系：">
            <div class="textleft">{{formDialog.relationshipCode | relationshipCodes(formDialog.insuredIdNumber)}}</div>
          </el-form-item>
          <el-form-item label="所在社群：">
            <div class="textleft">{{formDialog.projectName}}</div>
          </el-form-item>
          <el-form-item label="可退款金额：">
            <div class="textleft">{{formDialog.availableQuitBalance}}</div>
          </el-form-item>
          <div style="padding-bottom: 10px;">
            <el-form-item label="申请退款金额：" prop="moneyText">
              <el-input placeholder="请输入申请退款金额" v-model.number="formDialog.moneyText"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="退出原因：" prop="quitTextarea">
            <el-input type="textarea" :rows="6" placeholder="请输入退出原因" v-model="formDialog.quitTextarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="applyQuit" type="danger">申请退出</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
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
            <div class="textleft">{{formDialog2.availableQuitBalance | rewardMoneys}}</div>
          </el-form-item>
          <el-form-item label="申请退款金额：">
            <div class="textleft">{{formDialog2.applyQuitBalance | rewardMoneys}}</div>
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
    },
    methods: {
      //数据列表
      getUserData() {
        let self = this;
        if (self.partnerName == '') {
          $Message({
            type: 'error',
            message: '用户账户不能为空'
          });
          //return false;
        }
        this.ajax(this, {
          url: api.getAccountQuit,
          type: "get",
          data: {
            page: self.currentPage - 1,
            size: self.currentPageSize,
            userPhone: self.partnerName
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.IsShow = true;
              self.tableData = _data.accountQuitList.content;
              self.detail = {
                userPhone: _data.userPhone,
                userName: _data.userTrueName,
                userIdCard: _data.userIdNumber
              };
              self.totalElement = _data.accountQuitList.totalElements;
              self.totalPages = _data.accountQuitList.totalPages;
            }
          }
        })
      },
      //审核记录
      getQuitList(){
        let self = this;
        self.qdialogVisible = true;
        self.qdialogtitle = '退出记录';
        this.ajax(this, {
          url: api.getAccountQuitList,
          type: "get",
          data: {
            userPhone: self.partnerName
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.qformDialog = {
                QuitTableData: _data.content
              }
            }
          }
        })
      },
      //退出社群
      quitCommunity(id){
        let self = this;
        self.dialogVisible = true;
        self.dialogtitle = '退出社群';
        this.ajax(this, {
          url: api.getAccountQuitInfo,
          type: "get",
          data: {
            id: id
          },
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.formDialog = {
                userPhone: _data.userPhone,
                insuredName: _data.insuredName,
                insuredIdNumber: _data.insuredIdNumber,
                relationshipCode: _data.relationshipCode,
                projectName: _data.projectName,
                availableQuitBalance: _data.availableQuitBalance,
                moneyText: '',
                quitTextarea: ''
              };
            }
          }
        });
      },
      //确定退出
      applyQuit(id){
        this.$refs.formDialog.validate((valid) => {
          if (valid) {
            let self = this;
            this.ajax(this, {
              url: api.AccountQuitApply,
              type: "post",
              data: {
                id: id,
                userPhone: self.partnerName,
                insuredName: self.formDialog.insuredName,
                insuredIdNumber: self.formDialog.insuredIdNumber,
                relationshipCode: self.formDialog.relationshipCode,
                projectName: self.formDialog.projectName,
                applyQuitBalance: self.formDialog.moneyText,
                availableQuitBalance: self.formDialog.availableQuitBalance,
                accountQuitReason: self.formDialog.quitTextarea,
              },
              success: function (data) {
                self.dialogVisible = false;
                self.getUserData();
              }
            });
          } else {
            return false
          }
        })
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('申请退款金额不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入非0正整数'));
          } else {
            if (value > this.formDialog.availableQuitBalance) {
              callback(new Error('申请退款金额不能可退款金额'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        detail: {
          userPhone: '',
          userName: '',
          userIdCard: ''
        },
        IsShow: false,
        tableData: [],
        mdialogVisible: false,
        mdialogtitle: '',
        mformDialog: {
          MoneyTableData: [],
          totalMoney: '',
          refundMoney: '',
          unrefundMoney: '',
          allMoney: '',
        },
        qdialogVisible: false,
        qdialogtitle: '',
        qformDialog: {
          QuitTableData: []
        },
        dialogVisible: false,
        dialogtitle: '',
        formDialog: {
          moneyText: '',
          quitTextarea: ''
        },
        dialogVisible2: false,
        dialogtitle2: '',
        formDialog2: {},
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
        startDate: '',
        endDate: '',
        partnerName: '',
        sdate: '',
        edate: '',
        rules: {
          moneyText: [{
            validator: checkAge,
            trigger: 'blur'
          }],
          quitTextarea: [{
            required: true,
            message: '请输入退出社群原因',
            trigger: 'blur,change'
          },]
        },
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
