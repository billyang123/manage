var domain = 'http://118.178.132.182:10088';
var isDev = true;
var Prefix = isDev?"/api":"";
var api = {
	//登录
	doLogin:"/manage/login",
	getCode:"/manage/verifyUser",
	//用户管理
	upUser:"/manage/user/addUser",
	deleteUser:"/manage/user/deleteUser",
	getUsers:"/manage/user/findAll",

	//用户分配角色
	getRoles:'/manage/findAllByConfirmDelete',
	addRole:'/manage/addRole',
	delRole:'/manage/deleteRole',
	searchPerson:'/manage/user/findAllBylikeQuery',
	findUserRole:'/manage/user/findUserRole',

	resourceByRoleId:'/manage/assignResourceByRoleId',
	setrassignRole:'/manage/user/assignRole',

	getResouce:'/manage/resource/findResourceByRoleId',
	logout:"",

  //创始人说
  getFounderData:'/manage/founder/findTopicList',
  getFounderDel:'/manage/founder/deleteTopic',
  getFounderChange:'/manage/founder/updateTopic',
  getFounderMessage:'/manage/founder/findMessageList',
  getFounderComments:'/manage/founder/findCommentList',
  getFounderMessageDel:'/manage/founder/deleteMessage',
  getFounderMessageCheck:'/manage/founder/approveMessage',
  getFounderCommentsDel:'/manage/founder/deleteComment',
  getFounderCommentsCheck:'/manage/founder/approveComment'

};
for(var index in api){
	api[index] = Prefix+api[index]
}
export default api
