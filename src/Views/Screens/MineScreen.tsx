import React, {Component} from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {observer} from 'mobx-react/native'
import {inject} from 'mobx-react'
import {Navigator} from 'react-native-navigation'
import {CounterStore} from '../../Stores/CounterStore'

interface Props {
  counter: CounterStore,
  navigator: Navigator
}

@inject('counter') @observer
class MineScreen extends Component<Props> {
  constructor(props) {
    super(props)
    this.onIncrementPress = this.onIncrementPress.bind(this)
  }

  private onIncrementPress(): void {
    this.props.counter.increment()
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 20}}>
          <Text style={styles.text}>
            <Text style={{fontWeight: '500'}}>Here Too: </Text> {this.props.counter.count}
          </Text>

          <TouchableOpacity onPress={this.onIncrementPress}>
            <Text style={styles.button}>Increment Counter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default MineScreen
