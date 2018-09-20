import {create} from 'mobx-persist'
import {AsyncStorage} from 'react-native'
import {counter} from './CounterStore'
import {auth} from './AuthStore'
import {home} from './HomeStore'
import {app} from './AppStore'

const hydrate = create({storage: AsyncStorage})

hydrate('counter', counter)
hydrate('home', home)
hydrate('auth', auth)

export default {
  counter,
  auth,
  home,
  app
}
