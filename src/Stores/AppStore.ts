import {observable} from 'mobx'

class AppStore {
  @observable navigator = null
}

const app = new AppStore()
export {
  app,
  AppStore
}
