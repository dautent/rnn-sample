import axios from 'axios'
import {Toast} from 'antd-mobile-rn'
import DeviceStorage from '../Helper/Utils/DeviceStorage'
import TokenModel from '../Models/TokenModel'
import {auth} from '../Stores/AuthStore'
import Api from '../Constants/Api'

// 拦截请求
axios.interceptors.request.use(async (config) => {
  Toast.loading('加载中', 0)
  // 1.拿出authToken
  const {accessToken, isInvalid} = auth.tokenModel
  if (accessToken) {
    /*if (isInvalid) {
      // 2.如果过期了，将请求参数保存，获取新的token，然后保存新的token，然后重新进行请求
      auth.resetToken()
      const user = {username: '13020051580', password: '111111'}
      const response = await axios({url: Api.AccountInfo, method: 'post', data: user})
      const result = response.data
      if (result && result.access_token) {
        this.tokenModel.saveInfo(result.access_token, result.refresh_token, result.expires_in, new Date().getTime())
        DeviceStorage.setItem('access_token', result.access_token)
      }
    }*/

    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json'
  }

  return config
})

// 拦截响应
axios.interceptors.response.use(config => {
  Toast.hide()
  return config
})

axios.defaults.baseURL = 'http://39.107.251.215:8889'
axios.defaults.timeout = 2500
