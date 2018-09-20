import Images from './Images'

export default {
  tabs: {
    HOME: {
      label: '首页',
      screen: 'homeScreen',
      icon: Images.tabs.home_normal,
      selectedIcon: Images.tabs.home_selected,
      title: 'Screen One',
      navigatorStyle: {}
    },
    MINE: {
      label: '我的',
      screen: 'mineScreen',
      icon: Images.tabs.mine_normal,
      selectedIcon: Images.tabs.mine_selected,
      title: 'Screen Two',
      navigatorStyle: {}
    }
  },
  stacks: {
    LOGIN: {
      screen: 'loginScreen',
      title: '登陆',
      navigatorStyle: {}
    },
    DETAIL: {
      title: 'More',
      screen: 'detailScreen'
    }
  }
}
