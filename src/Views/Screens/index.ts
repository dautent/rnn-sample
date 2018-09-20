import {Navigation} from 'react-native-navigation'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import MineScreen from './MineScreen'
import DetailScreen from './DetailScreen'

// register all Screens of the app (including internal ones)
export default function registerScreens(store: {}, Provider: {}) {
  Navigation.registerComponent('loginScreen', () => LoginScreen, store, Provider)
  Navigation.registerComponent('homeScreen', () => HomeScreen, store, Provider)
  Navigation.registerComponent('mineScreen', () => MineScreen, store, Provider)
  Navigation.registerComponent('detailScreen', () => DetailScreen, store, Provider)
}
