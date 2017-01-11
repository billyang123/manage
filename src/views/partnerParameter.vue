<template>
  <div class="founder" style="padding:20px">
    <h2>参数设置</h2>
    <el-button type="primary" style="float:right;margin-bottom:10px;margin-right:10px" @click="handleSure()"
               :disabled="btnBl">保 存
    </el-button>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-table :data="tableData" border height="700" style="width: 100%">
      <el-table-column prop="paramDesc" label="参数名"></el-table-column>
      <el-table-column inline-template label="参数值" prop="paramValue">
        <span>
          <i v-if="!type(row.paramValue)"><el-switch v-model="row.paramValue" on-color="#13ce66"
                                                     off-color="#ff4949"></el-switch></i>
          <i v-if="type(row.paramValue)"><el-input placeholder="请输入内容" v-model.number="row.paramValue"></el-input></i>
        </span>
      </el-table-column>
    </el-table>
    </el-form>
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
      getUserData(){
        let self = this;
        this.ajax(this, {
          url: api.getPartnerdSettingData,
          type: "get",
          data: {},
          success: function (data) {
            let _data = data.body.data;
            if (data.body.data) {
              self.tableData = _data.data;
              for (let i = 0; i < self.tableData.length; i++) {
                if (self.tableData[i].paramValue === 'necessary') {
                  self.tableData[i].paramValue = true
                } else if (self.tableData[i].paramValue === 'ignore') {
                  self.tableData[i].paramValue = false
                }
              }
            }
          }
        })
      },
      handleSure(){
        let self = this;
        let partnerSettingList = self.tableData;
        for (let i = 0; i < partnerSettingList.length; i++) {
          if (partnerSettingList[i].paramValue === true) {
            partnerSettingList[i].paramValue = 'necessary'
          } else if (partnerSettingList[i].paramValue === false) {
            partnerSettingList[i].paramValue = 'ignore'
          }
        }
        this.ajax(this, {
          url: api.getPartnerdSetting,
          type: "post",
          data: {
            partnerSettingList: JSON.stringify(partnerSettingList)
          },
          complete:function(){
            self.getUserData();
          },
        })
      },
      type(val){
        if (val === true || val === false) {
          return false;
        } else {
          return true;
        }
      }

    },
    data() {
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
        btnBl: false,
        currentPage: 1,
        currentPageSize: 30,
        totalElement: 1,
        totalPages: 1,
        tableData: [],
        ruleForm :{},
        rules:{
          paramValue:[
            {validator:myNumber,trigger: 'change,blur'}
          ]
        }
      }
    }
  }
</script>
