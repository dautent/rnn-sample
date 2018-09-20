import {persist} from 'mobx-persist'
import {observable} from 'mobx'

class TokenModel {
  @persist @observable public accessToken: string = ''
  @persist @observable public refreshToken: string = ''
  @persist @observable public expiresIn: number = 0
  @persist @observable public saveTime: number = 0

  public saveInfo(accessToken: string, refreshToken: string, expiresIn: number, saveTime: number): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresIn = expiresIn
    this.saveTime = saveTime
  }

  public resetInfo(): void {
    this.accessToken = ''
    this.refreshToken = ''
    this.expiresIn = 0
    this.saveTime = 0
  }

  /**
   * 判断accessToken是否过期
   * return true表示过期，false表示没过期
   */
  public isInvalid = (): boolean => {
    const nowTime = new Date().getTime()
    const diffTime = Math.ceil((nowTime - this.saveTime) / 1000)
    console.log(`diffTime：${diffTime}`)
    return diffTime > this.expiresIn
  }
}

export default TokenModel
