import {SET_BASEINFO,SET_LOGIN_IN,SET_LOGIN_OUT} from '../mutation-types'

const state = {
  status:false,
  userLoginName:'',
  userRealName:'',
  userWorkNo:'',
  userNickName:'',
  userPhone:''
}
// actions
const mutations = {
  [SET_BASEINFO] (state, data) {
    try {
      state.userRealName = data.userRealName
      state.userWorkNo = data.userWorkNo
      state.userLoginName = data.userLoginName
      state.userPhone = data.userPhone
      state.status = data.status
    } catch (err) {
      console.log(err)
    }
  },
  [SET_LOGIN_IN] (state, data) {
    try {
      state.status = true
    } catch (err) {
      console.log(err)
    }
  }
  [SET_LOGIN_OUT] (state) {
    state.status = false
  }
}
export default {
  state,
  mutations
}
