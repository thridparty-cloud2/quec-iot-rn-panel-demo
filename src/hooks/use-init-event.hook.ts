import {useEffect} from 'react'
import {DeviceEventEmitter} from 'react-native'

import {goBackHome} from '.'
import {EVENT_TYPE_GO_BACK_HOME} from '../config/event-type.config'

/**
 * 注册监听事件
 */
export const useInitEvent = () => {
  useEffect(() => {
    /**
     * 返回 APP 设备列表监听
     */
    const subGoBackHome = DeviceEventEmitter.addListener(EVENT_TYPE_GO_BACK_HOME, goBackHome)

    // 移除监听事件
    return () => {
      subGoBackHome.remove()
    }
  }, [])
}
