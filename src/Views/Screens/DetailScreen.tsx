import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {observer} from 'mobx-react/native'
import {inject} from 'mobx-react'
import {Navigator} from 'react-native-navigation'
import {CounterStore} from '../../Stores/CounterStore'
import {Screens} from '../../Constants'

interface Props {
  counter: CounterStore,
  app: Navigator
}

@inject('counter') @observer
class DetailScreen extends React.Component<Props> {
  public constructor(props) {
    super(props)
    this.onIncrementPress = this.onIncrementPress.bind(this)
    this.onPushPress = this.onPushPress.bind(this)
  }

  private onIncrementPress(): void {
    this.props.counter.increment()
  }

  private onPushPress(): void {
    this.props.app.navigator.push({...Screens.stacks.DETAIL})
  }

  public render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Counter: </Text> {this.props.counter.count}
        </Text>

        <TouchableOpacity onPress={this.onIncrementPress}>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPushPress}>
          <Text style={styles.button}>Push Another</Text>
        </TouchableOpacity>
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

export default DetailScreen
