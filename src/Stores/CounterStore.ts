import {observable, action} from 'mobx'
import {persist} from 'mobx-persist'

class CounterStore {
  @persist @observable count = 0

  @action.bound increment(): void {
    this.count++
  }

  @action.bound decrement(): void {
    this.count--
  }
}

const counter = new CounterStore()
export {
  counter,
  CounterStore
}
