import {Navigation} from 'react-native-navigation'
import {Platform} from 'react-native'
import Stores from './Stores/index'
import Provider from './Helper/Utils/MobxRnnProvider'
import registerScreens from './Views/Screens/index'
import DeviceStorage from './Helper/Utils/DeviceStorage'
import './Configs'
import {Screens, Strings} from './Constants'
import {auth} from './Stores/AuthStore'

registerScreens(Stores, Provider)

const startTabBasedApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        ...Screens.tabs.HOME
      },
      {
        ...Screens.tabs.HOME
      },
      {
        ...Screens.tabs.MINE
      }
    ],
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  })
}

const startSingleScreenApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      ...Screens.stacks.LOGIN
    },
    detail: {
      ...Screens.stacks.DETAIL
    }
  })
}
const getToken = async () => {
  console.log(auth.tokenModel.accessToken)
  const token = await DeviceStorage.get(Strings.ACCESS_TOKEN)
  token ? startTabBasedApp() : startSingleScreenApp()
}
// startSingleScreenApp()
getToken()

export default startTabBasedApp
