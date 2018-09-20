import {AsyncStorage} from 'react-native'

export default class DeviceStorage {
  /**
   * 返回对象
   */
  static async get(key) {
    const value = await AsyncStorage.getItem(key)
    return JSON.parse(value)
  }

  static async getObject(key) {
    const value = await AsyncStorage.getItem(key)
    return JSON.parse(value)
  }

  /**
   * [multiGet description]
   * multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
   * @param {[type]} keys key数组
   * @return {[type]} [description]
   */
  static async multiGet(keys) {
    const values = await AsyncStorage.multiGet(keys)
    const result = {}
    values.forEach((value) => {
      let newValue = ''
      try {
        newValue = JSON.parse(value[1])
      } catch (e) {
        [newValue] = value[1]
      }
      result[value[0]] = newValue
    })
    return result
  }

  /**
   * 获取所有keys
   */
  static async keys() {
    return await AsyncStorage.getAllKeys()
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    const item = DeviceStorage.get(key)
    value = typeof value === 'string' ? value : Object.assign({}, item, value)
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 删除
   * @param key
   * @returns {*}
   */
  static removeItem(key) {
    return AsyncStorage.removeItem(key)
  }

  /**
   * 删除
   * @param keys key数组
   * @returns {*}
   */
  static multiRemove(keys) {
    return AsyncStorage.multiRemove(keys)
  }

  /**
   * 清空
   * @returns {*}
   */
  static clear() {
    return AsyncStorage.clear()
  }
}
