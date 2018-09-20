import {observable, action} from 'mobx'
import axios from 'axios'
import {persist} from 'mobx-persist'
import {Api} from '../Constants'
import {auth} from './AuthStore'

class HomeStore {
  @persist @observable accountInfo = auth.tokenModel.expiresIn

  @action.bound
  async getAccountInfo() {
    const result = await axios({method: 'get', url: Api.AccountInfo})
    this.accountInfo = result.data.name
  }

  resetInfo() {
    this.accountInfo = 0
  }
}

const home = new HomeStore()
export {
  home,
  HomeStore
}
