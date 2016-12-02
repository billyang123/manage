import Vue from 'vue'
import Mock from 'mockjs'
export default {
  getUsers () {
  	let data = Mock.mock({
  		"status":0,
  		"total":100,
		'list|1-20':[
			{
				'id|+1':1,
				'userLoginName':'234652374@qq.com',
				'userPassword':"234344242",
				'userRealName':'yangbinbin',
				'userWorkNo':"10023",
				'userNickName':'yang',
				'userPhone':"17876578876"
			}
		]
	})
    return data
  },
  getCode (cb) {
  	cb(Mock.mock({
		status:0,
		msg:"获取验证码失败！"
	}))
  }
}