var domain = 'http://118.178.132.182:10088';
var isDev = /localhost/.test(window.location.host)?true:false;
var Prefix = isDev?"/api":"";
console.log(Prefix)
var api = {
	//登录
	doLogin:"/manage/login",
	getCode:"/manage/verifyUser",

  //修改密码
  changePass:"/manage/user/updatePassword",


	//用户管理
	addUser:"/manage/user/addUser",
	updateUser:"/manage/user/updateUser",
	deleteUser:"/manage/user/deleteUser",
	getUsers:"/manage/user/findAll",

  //资源管理
  getResourceData:"/manage/resource/findResourceList",
  getResourceTree:"/manage/resource/findMenuResourceTree",
  getAddResource:"/manage/resource/addResource",
  getChangeTree:"/manage/resource/findMenuResourceTreeUpdate",
  getChangeResource:"/manage/resource/updateResource",
  getDelResource:"/manage/resource/deleteResource",


	//用户分配角色
	getRoles:'/manage/role/findAllByConfirmDelete',
	addRole:'/manage/role/addRole',
	updateRole:'/manage/role/updateByRoleId',
	delRole:'/manage/role/deleteRole',
	searchPerson:'/manage/user/findAllBylikeQuery',
	findUserRole:'/manage/user/findUserRole',

	saveAssignRole:'/manage/user/assignRole',

	//resourceByRoleId:'/manage/assignResourceByRoleId',
	//保存角色权限配置
	setrassignRole:'/manage/role/assignResourceByRoleId',

	getResouce:'/manage/resource/findResourceByRoleId',
	logout:"",

  //创始人说
  getFounderData:'/manage/founder/findTopicList',
  getFounderDel:'/manage/founder/deleteTopic',
  getFounderOut:'/manage/founder/offlineTopic',
  getFounderChange:'/manage/founder/updateTopic',
  getFounderAdd:'/manage/founder/addTopic',
  getFounderRelease:'/manage/founder/publishTopic',
  getFounderMessage:'/manage/founder/findMessageList',
  getFounderComments:'/manage/founder/findCommentList',
  getFounderMessageDel:'/manage/founder/deleteMessage',
  getFounderMessageCheck:'/manage/founder/approveMessage',
  getFounderCommentsDel:'/manage/founder/deleteComment',
  getFounderCommentsCheck:'/manage/founder/approveComment',
  getFounderReplay:'/manage/founder/findCommentReplyList',
  getFounderReplayDel:'/manage/founder/deleteCommentReply',
  getFounderReplayCheck:'/manage/founder/approveCommentReply',
  getFounderCommentsLook:'/manage/founder/fclistByInteractionId',
  getFounderDataLook:'/manage/founder/findInteractionData'
};
for(var index in api){
	api[index] = Prefix+api[index]
}
export default api
