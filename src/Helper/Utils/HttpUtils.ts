import DeviceStorage from './DeviceStorage'
import {NetInfo} from 'react-native'

const HOST = 'http://39.107.251.215:8889'

const fetchOptionsToken = (type = 'GET', data = '') => (async () => {
  const token = await DeviceStorage.get('token')
  return {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: data ? JSON.stringify(data) : ''
  }
})()

const fetchOptionsNoToken = (type = 'GET', data = '') => ({
  method: type,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: data ? JSON.stringify(data) : ''
})

const handleStatusCode = (result) => {
  // console.log(result)
  if (result.status === 404) {
    console.log('请求的地址不存在')
    return
  }
  if (result.error === 'invalid_token') {
    // Utils.showToast('Token失效，请重新登录')
    return
  }
  if (result.status === 200) {
    return result.json()
  }
}

const handleNetException = (e) => {
  console.log(e)
  console.log('error occur')
  /*NetInfo.isConnected.fetch()
    .done((isConnected) => {
      if (isConnected) {
        Utils.showToast('服务器连接异常')
      } else {
        Utils.showToast('请检查网络连接')
      }
    })*/
}

/*
https://segmentfault.com/q/1010000010466936
export default (async () => {
  let i18n = await new Promise((resolve, reject) => {
    $.ajax({
      success(result) {
        resolve(new VueI18n({message:{en:result.en}}))
      }
    })
  })
  return i18n
})()
*/

const net = (url = '', option) => (async () => {
  try {
    url = HOST + url
    const result = await fetch(url, option)
    return handleStatusCode(result)
  } catch (e) {
    handleNetException(e)
  }
})()

const get = (url = '') => net(url, fetchOptionsToken('GET', ''))
const post = (url = '', data = '') => net(url, fetchOptionsToken('POST', data))

export {HOST, get, post}
