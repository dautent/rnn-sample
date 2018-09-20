import {observable, action, extendObservable} from 'mobx'
import {persist} from 'mobx-persist'
import axios from 'axios'
import {Toast} from 'antd-mobile-rn'
import DeviceStorage from '../Helper/Utils/DeviceStorage'
import {Api} from '../Constants'
import TokenModel from '../Models/TokenModel'
import {app} from './AppStore'
import {Screens, Strings} from '../Constants'

class AuthStore {
  @persist @observable username = ''
  @persist('object', TokenModel) @observable tokenModel = new TokenModel()
  // @persist('object', TokenModel) @observable tokenModel = extendObservable(new TokenModel(), {})

  @action.bound resetToken(): void {
    DeviceStorage.removeItem(Strings.ACCESS_TOKEN)
    this.tokenModel.resetInfo()
  }

  @action.bound login = async (userinfo): Promise<boolean> => {
    const {username, password} = userinfo
    if (!username || !password) {
      Toast.show('请输入用户名或密码！')
      return false
    }
    const user = {username: '13020051580', password: '111111'}
    const response = await axios({url: Api.Login, method: 'post', data: user})
    // const response = await axios.post(url, { data: user})
    const result = response.data
    if (result && result.access_token) {
      this.tokenModel.saveInfo(result.access_token, result.refresh_token, result.expires_in, new Date().getTime())
      DeviceStorage.setItem(Strings.ACCESS_TOKEN, result.access_token)
      return true
    }
    return false
  }
  @action.bound logout = () => {
    app.navigator.resetTo({...Screens.stacks.LOGIN})
    // TODO clear mobx-persist cache
  }
}

const auth = new AuthStore()
export {
  auth,
  AuthStore
}
