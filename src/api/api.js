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

	getResouce:'/manage/resource/findResourceByRoleId',
	logout:""
}
for(var index in api){
	api[index] = Prefix+api[index]
}
export default api
