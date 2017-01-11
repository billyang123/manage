var domain = 'http://120.27.144.150:10086';
var isDev = /localhost/.test(window.location.host)?true:false;
var Prefix = isDev?"/api":"";
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
  getFounderDataLook:'/manage/founder/findInteractionData',
  //合伙人
  //问题管理
  getPartnerQuestion:'/manage/partner/questionList',
  getPartnerQuestionAdd:'/manage/partner/addQuestion',
  getPartnerQuestionUpdata:'/manage/partner/updateQuestion',
  getPartnerQuestionDel:'/manage/partner/deleteQuestion',
  //数据统计
  getPartnerdData:'/manage/partner/getPartnerDataList',
  //奖励分析
  getPartnerdRewardData:'/manage/partner/getPartnerAwardList',
  getPartnerdRewardUpdate:'/manage/partner/updatePartnerAward',
  //合伙人管理
  getPartnerd:'/manage/partner/getPartnerListByDateAndAccount',
  getPartnerdStatus:'/manage/partner/setPartnerStatus',
  getPartnerdInvite:'/manage/partner/getInviteList',
  getPartnerdUserInfo:'/manage/partner/getFamilyMemberByUserInfoId',
  //参数设置
  getPartnerdSettingData:'/manage/partner/getPartnerSettingList',
  getPartnerdSetting:'/manage/partner/updatePartnerSetting',

  fundApplicationList:'/manage/fundraise/applicationlist',
  fundApplicationhandle:'/manage/fundraise/applicationhandle',
  fundGetVolunteerApplyList:'/manage/fundraise/getVolunteerApplyList',
  fundGetVolunteerInfo:'/manage/fundraise/getVolunteerInfo',
  fundGetFundraiseProjectDataList:'/manage/fundraise/getFundraiseProjectDataList',
  fundUpdateVolunteerApplyProcesseStatus:'/manage/fundraise/updateVolunteerApplyProcesseStatus',
  fundApproveVolunteer:'/manage/fundraise/approveVolunteer',
  fundGetVolunteerList:'/manage/fundraise/getVolunteerList',
  fundCancleVolunteer:'/manage/fundraise/cancleVolunteer',
  fundGetFundRemitTotalList:'/manage/fundraise/getFundRemitTotalList',
  fundExportVolunteerApplyExcel:'/manage/fundraise/exportVolunteerApplyExcel',
  fund_getFundraiseProjectList:'/manage/fundraise/getFundraiseProjectList',//回去项目列表
  fund_maintainProject:'/manage/fundraise/maintainProject',//修改项目基本信息
  fund_publishPreview:'/manage/fundraise/publishPreview',//上线预览
  fund_cancelPublishPreview:'/manage/fundraise/cancelPublishPreview',//取消预览
  fund_publishFundraise:'/manage/fundraise/publishFundraise',//发布筹款
  fund_closeFundraise:'/manage/fundraise/closeFundraise',//强制关闭
  fund_getFundraiseStateList:'/manage/fundraise/getFundraiseStateList',//获取动态列表
  fund_addFunPatienState:'/manage/fundraise/addFunPatienState',//增加动态
  fund_updateFunPatienState:'/manage/fundraise/updateFunPatienState',//修改动态
  fund_deleteFunPatienState:'/manage/fundraise/deleteFunPatienState',//删除动态
  fund_addFundraiseRemit:'/manage/fundraise/addFundraiseRemit',//添加打款记录（待确认）
  fund_fundraiseRemitApplyList:'/manage/fundraise/fundraiseRemitApplyList',//打款申请列表
  fund_getRemitApplyByFundIdList:"/manage/fundraise/getRemitApplyByFundIdList",//根据项目id获取打款纪录
  fund_updateFundraiseRemit:"/manage/fundraise/updateFundraiseRemit",//修改打款纪录
  fund_getFundraiseProjectById:'/manage/fundraise/getFundraiseProjectById',//根据id获取筹款项目详情

  fund_getFunDonationList:'/manage/fundraise/getFunDonationList',//获取评论列表。参数里面的id是筹款项目的id
  fund_deleteMessage:"/manage/fundraise/deleteMessage",//删除评论"
  fund_image:"/uploadoss/image",//上传图片


  //微信公众号 菜单设置
  wx_menulist:"/manage/baseconfig/menulist",
  wx_menuadd:"/manage/baseconfig/menuadd",
  wx_menuupdate:"/manage/baseconfig/menuupdate",
  wx_menudelete:"/manage/baseconfig/menudelete",
  wx_menupublish:"/manage/baseconfig/menupublish",
  wx_menupreview:"/manage/baseconfig/menupreview",
  //关键词自动回复
  wx_msglist :"/manage/baseconfig/msglist",
  wx_msgdelete :"/manage/baseconfig/msgdelete",
  wx_msgupdate :"/manage/baseconfig/msgupdate",
  wx_msgadd :"/manage/baseconfig/msgadd",
};
for(var index in api){
	api[index] = Prefix+api[index]
}
export default api
