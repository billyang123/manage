import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie';
//import Vuex from 'vuex'
import App from './App'

import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  TimePicker,
  FormItem,
  Option,
  Col,
  Row,
  CheckboxGroup,
  RadioGroup,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  MessageBox,
  Message,
  Autocomplete,
  Card,
  Loading,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Upload
}
  from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import VueDND from 'awe-dnd'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)
//Vue.use(Vuex)
Vue.use(VueQuillEditor)
Vue.use(VueDND)

Vue.component(Button.name, Button)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Radio.name, Radio)
Vue.component(Switch.name, Switch)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimePicker.name, TimePicker)
Vue.component(FormItem.name, FormItem)
Vue.component(Option.name, Option)
Vue.component(Col.name, Col)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Row.name, Row)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Dialog.name, Dialog)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Pagination.name, Pagination)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Message.name, Message)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Card.name, Card)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Tag.name, Tag)
Vue.component(Tree.name, Tree)
Vue.component(Upload.name, Upload)

var _MsgBox = MessageBox;
var _Message = Message;
var _Loading = Loading;
window.$MsgBox = _MsgBox;
window.$Message = _Message;
window.$Loading = _Loading;

import index from './views/index.vue'
import login from './views/login.vue'
import usersAdmin from './views/usersAdmin.vue'
import roleAdmin from './views/roleAdmin.vue'
import resourceAdmin from './views/resourceAdmin.vue'

import founder from './views/founder.vue'
import founderMessage from './views/founderMessage.vue'
import founderComments from './views/founderComments.vue'
import founderReplay from './views/founderReplay.vue'
import founderData from './views/founderData.vue'

import fundAppList from './views/loveChou/fundAppList.vue'
import fundProject from './views/loveChou/fundProject.vue'
import fundShowData from './views/loveChou/fundShowData.vue'
import aFundList from './views/loveChou/aFundList.vue'
import loveAmbAppList from './views/loveChou/loveAmbAppList.vue'
import loveAmbList from './views/loveChou/loveAmbList.vue'
import certloveAmb from './views/loveChou/certloveAmb.vue'
import projectDetail from './views/loveChou/projectDetail.vue'
import projectTrends from './views/loveChou/projectTrends.vue'
import remitApplyList from './views/loveChou/remitApplyList.vue'
//合伙人
import partnerQuestion from './views/partnerQuestion.vue'
import partnerData from './views/partnerData.vue'
import partnerReward from './views/partnerReward.vue'
import partner from './views/partner.vue'
import partnerParameter from './views/partnerParameter.vue'

//账户退出
import accountQuit from './views/accountQuit.vue'
import accountQuitRefund from './views/accountQuitRefund.vue'
import accountQuitAudit from './views/accountQuitAudit.vue'

//公众号菜单设置
import wxMenu from './views/menu/index.vue'
import wxReplay from './views/wxReply/index.vue'
import wxFollow from './views/wxReply/follow.vue'

// import autocomplete from './components/autocomplete.vue'
// Vue.component(autocomplete.name, autocomplete)
import test from './views/test.vue'
//Vue.transition('showAll',{});

// register directives
// Vue.directive('echarts', require('./directives/echarts'));

let router = new VueRouter({
  hashbang: true,
  //mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '',
          component: {
            template: '<div style="padding:20px;"><img src="https://s1.yiqihuzhu.com/www/assets/pc/images/logo.png" alt="17互助"><h1>欢迎进入后台管理</h1></div>'
          }
        },
        {
          path: 'usersAdmin',
          component: usersAdmin
        },
        {
          path: 'roleAdmin',
          component: roleAdmin
        },
        {
          path: 'resourceAdmin',
          component: resourceAdmin
        },
        {
          path: 'founder',
          component: founder
        },
        {
          path: 'founderMessage',
          component: founderMessage
        },
        {
          path: 'founderComments',
          component: founderComments
        },
        {
          path: 'founderReplay',
          component: founderReplay
        },
        {
          path: 'founderData',
          component: founderData
        },
        //筹款申请列表
        {
          path: 'fundAppList',
          component: fundAppList
        },
        //筹款项目维护
        {
          path: 'fundProject',
          component: fundProject
        },
        //申请款项列表
        {
          path: 'aFundList',
          component: aFundList
        },
        //项目详情
        {
          path: 'projectDetail/:id',
          component: projectDetail
        },
        //动态维护
        {
          path: 'projectTrends/:id',
          component: projectTrends
        },
        //打款纪录
        {
          path: 'remitApplyList/:id',
          component: remitApplyList
        },
        //打款项目数据
        {
          path: 'fundShowData',
          component: fundShowData
        },
        //爱心大使申请列表
        {
          path: 'loveAmbAppList',
          component: loveAmbAppList
        },
        //爱心大使列表
        {
          path: 'loveAmbList',
          component: loveAmbList
        },
        //认证爱心大使
        {
          path: 'certloveAmb',
          component: certloveAmb
        },
        //合伙人问题管理
        {
          path: 'partnerQuestion',
          component: partnerQuestion
        },
        //合伙人数据统计
        {
          path: 'partnerData',
          component: partnerData
        },
        //合伙人奖励分析
        {
          path: 'partnerReward',
          component: partnerReward
        },
        //合伙人管理
        {
          path: 'partner',
          component: partner
        },
        //合伙人参数设置
        {
          path: 'partnerParameter',
          component: partnerParameter
        },
        //账户社群管理
        {
          path: 'accountQuit',
          component: accountQuit
        },
        //账户退出打款管理
        {
          path: 'accountQuitRefund',
          component: accountQuitRefund
        },
        //账户退出审核管理
        {
          path: 'accountQuitAudit',
          component: accountQuitAudit
        },
        {
          path: 'wxmenu',
          component: wxMenu
        },
        {
          path: 'wxreplay',
          component: wxReplay
        },
        {
          path: 'wxfollow',
          component: wxFollow
        }
      ]
		},
		{
			path: '/login',
			component: login
		},
    {
      path:'/test',
      component:test
    }
	]
});
// const store = new Vuex.Store({
//   state: {
//     login: false
//   },
//   mutations: {
//     login (state) {
//       	state.login = true
//     },
//     logout(state) {
//     	state.login = false
//     }
//   }
// })
//全局的前置钩子函数，在路由切换开始时调用
// router.beforeEach(function(){
//     window.scrollTo(0,0)
// })
window.router = router;
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
Vue.prototype.ajax = function (_this, options) {
  var _callback = (response) => {
    let status = response.body.status;
    if (status == 0) {

      options.success && options.success(response)
    } else {
      if (status == -2) {
        $MsgBox.alert(response.body.msg, "提示", {
          confirmButtonText: '确定',
          callback: action => {

            _this.$router.push("/login");
          }
        })
      } else {
        $MsgBox.alert(response.body.msg)
      }
      options.error && options.error(response)
    }
    options.complete && options.complete(response)
  }
  var _err = (response) => {
    // error callback
  }
  if (options.type == "post") {
    _this.$http.post(options.url, options.data, {
      emulateJSON: true,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(_callback, _err);
  }
  if (options.type == "get") {
    //console.log(options.type,options.url)
    let arr = [];
    let _url = options.url;
    for (var index in options.data) {
      arr.push(index + "=" + options.data[index]);
    }
    if (arr.length > 0) {
      _url += "?" + arr.join("&");
    }
    _this.$http.get(_url).then(_callback, _err);
  }
}
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

