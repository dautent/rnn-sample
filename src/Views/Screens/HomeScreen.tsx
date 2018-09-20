import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native'
import {WhiteSpace} from 'antd-mobile-rn'
import {observer} from 'mobx-react/native'
import {inject} from 'mobx-react'
import {Navigator} from 'react-native-navigation'
import {AuthStore} from '../../Stores/AuthStore'
import {CounterStore} from '../../Stores/CounterStore'
import {HomeStore} from '../../Stores/HomeStore'
import {Screens} from '../../Constants'

interface Props {
  home: HomeStore,
  counter: CounterStore,
  auth: AuthStore,
  app: Navigator
}

@inject('home', 'counter', 'auth', 'app') @observer
class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props)
    props.app.navigator = props.navigator
    this.onIncrementPress = this.onIncrementPress.bind(this)
    this.onPushPress = this.onPushPress.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.resetToken = this.resetToken.bind(this)
    this.resetInfo = this.resetInfo.bind(this)
  }

  private onIncrementPress(): void {
    this.props.counter.increment()
  }

  private onPushPress(): void {
    this.props.app.navigator.push({...Screens.stacks.DETAIL})
  }

  private getInfo(): void {
    this.props.home.getAccountInfo()
  }

  private resetToken(): void {
    this.props.auth.resetToken()
  }

  private resetInfo(): void {
    this.props.home.resetInfo()
  }

  render() {
    const {home: {accountInfo}, counter: {count}}: Props = this.props
    const tint = 'accountInfo:' + accountInfo
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Same Counter: </Text> {count}
        </Text>

        <TouchableOpacity onPress={this.onIncrementPress}>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPushPress}>
          <Text style={styles.button}>Push Screen</Text>
        </TouchableOpacity>
        <WhiteSpace/>
        <Text>{tint}</Text>
        <Button title='获取账户信息' onPress={this.getInfo}/>
        <WhiteSpace/>
        <Button title='清空token' onPress={this.resetToken}/>
        <WhiteSpace/>
        <Button title='清空info' onPress={this.resetInfo}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
})

export default HomeScreen
