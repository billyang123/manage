import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie';
//import Vuex from 'vuex'
import App from './App'

import {
	Button,
	Menu,Submenu,MenuItem,MenuItemGroup,
	Form,Input,Select,Checkbox,Radio,Switch,DatePicker,TimePicker,FormItem,Option,Col,Row,CheckboxGroup,RadioGroup,
  Dialog,
  Table,TableColumn,
  Pagination,
  MessageBox,Message,
  Autocomplete,
  Card,
  Loading,
  Tabs,
  TabPane,
  Tag
}
from 'element-ui'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)
//Vue.use(Vuex)


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
var _MsgBox = MessageBox;
var _Message = Message;
window.$MsgBox = _MsgBox;
window.$Message = _Message;
import index from './views/index.vue'
import login from './views/login.vue'
import usersAdmin from './views/usersAdmin.vue'
import roleAdmin from './views/roleAdmin.vue'
import authAdmin from './views/authAdmin.vue'
import founder from './views/founder.vue'
import founderMessage from './views/founderMessage.vue'
import founderComments from './views/founderComments.vue'



// import autocomplete from './components/autocomplete.vue'
// Vue.component(autocomplete.name, autocomplete)

//Vue.transition('showAll',{});

let router = new VueRouter({
	mode: 'history',
  	base: __dirname,
    routes:[
		{
			path: '/',
			component: index,
      children: [
        {
          path: '',
          component: {
            template: '<div style="padding:20px;"><img src="http://s1.yiqihuzhu.com/www/assets/pc/images/logo.png" alt="17互助"><h1>欢迎进入后台管理</h1></div>'
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
          path:'authAdmin',
          component:authAdmin
        },
        {
          path:'founder',
          component:founder
        },
        {
          path:'founderMessage',
          component:founderMessage
        },
        {
          path:'founderComments',
          component:founderComments
        }
      ]
		},
		{
			path: '/login',
			component: login
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
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

