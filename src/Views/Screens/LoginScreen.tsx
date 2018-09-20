import React, {Component} from 'react'
import {View} from 'react-native'
import {inject, observer} from 'mobx-react'
import {Navigator} from 'react-native-navigation'
import {Button, InputItem, List, WhiteSpace} from 'antd-mobile-rn'
import startTabBasedApp from '../../app'
import {AuthStore} from '../../Stores/AuthStore'
import * as wechat from '../../Helper/Natives/Wechat'

interface Props {
  auth: AuthStore,
  app: Navigator,
}

interface State {
  username: string,
  password: string
}

@inject('auth', 'app') @observer
class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    props.app.navigator = props.navigator
    this._onLogin = this._onLogin.bind(this)
    this._toRegister = this._toRegister.bind(this)
  }

  componentDidMount() {
    this.setState({username: this.props.auth.username})
    // wechat.registerApp('your appid')
  }

  private _toRegister(): void {
  }

  private async _onLogin(): Promise<void> {
    const res = await this.props.auth.login(this.state)
    if (res) {
      startTabBasedApp()
    }
  }

  _wexin = () => {
    wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          alert(' 安装了')
        } else {
          alert('没有安装微信软件，请您安装微信之后再试')
        }
      })
  }

  render() {
    const {username, password} = this.state
    return (
      <View style={{flex: 1}}>
        <WhiteSpace/>
        <WhiteSpace/>
        <List>
          <InputItem
            clear
            onChange={txt => this.setState({'username': txt})}
            value={username}
            placeholder='请输入用户名'/>
          <InputItem
            clear
            type='password'
            onChange={txt => this.setState({'password': txt})}
            value={password}
            placeholder='请输入密码'/>
        </List>
        <WhiteSpace/>
        <Button type='primary' onClick={this._onLogin}>登录</Button>
        <WhiteSpace/>
        <Button type='primary' onClick={this._toRegister}>注册</Button>
        <WhiteSpace/>
        <Button type='primary' onClick={this._wexin}>微信</Button>
      </View>
    )
  }
}

export default LoginScreen
