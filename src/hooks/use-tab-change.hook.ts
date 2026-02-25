import {checkoutEmptyPanel, getDeviceListStore} from '@quec/panel-device-kit'
import {QLog} from '@quec/panel-sdk/utils'
import {useEffect} from 'react'
import {EmitterSubscription, NativeEventEmitter, NativeModules} from 'react-native'

// TODO 此方法是为了兜底APP在（在我的-设备管理删除所有设备后）无法跳到托底面板而做的情况

/**
 * 事件类型---设备在线状态
 * @type {string}
 */
export const EVENT_TYPE_TABBAR_SELECTED = 'QuecTabBarSelected'

export type Null = undefined | null

const eventEmitter: any = new NativeEventEmitter(NativeModules.QuecRNTabModule)
let onDeviceTabbarSelectedListener: EmitterSubscription | Null

export const useInitTabbarSelectedEvent = () => {
  const listIsEmpty = getDeviceListStore()?.(state => state.listIsEmpty) ?? null

  useEffect(() => {
    removeListener(onDeviceTabbarSelectedListener)
    onDeviceTabbarSelectedListener = eventEmitter.addListener(
      EVENT_TYPE_TABBAR_SELECTED,
      (event: {selected: number}) => {
        QLog.info(EVENT_TYPE_TABBAR_SELECTED, ' event => ' + objToStr(event))
        if (event.selected === 0) {
          // 检查当前设备是否还有效，否则去设备列表第一个，如果设备列表为空跳托底面板

          if (listIsEmpty) {
            QLog.info(' 设备为空 ', '所以切换托底面板')

            checkoutEmptyPanel()
          }
        }
      },
    )

    // 移除监听事件
    return () => {
      removeListener(onDeviceTabbarSelectedListener)
      onDeviceTabbarSelectedListener = null
    }
  }, [listIsEmpty])
}

const removeListener = (listener: EmitterSubscription | Null) => {
  if (listener) {
    listener.remove()
    listener = undefined
  }
}
export const objToStr = (obj: any): string => {
  if (obj instanceof Error) {
    return obj.stack || obj.message || 'Unknown Error'
  }

  if (typeof obj === 'object') {
    try {
      return JSON.stringify(obj, getCircularReplacer(), 2)
    } catch {
      return '[Cannot stringify object]'
    }
  }

  if (typeof obj === 'undefined') {
    return 'undefined'
  }

  if (obj === null) {
    return 'null'
  }

  return String(obj)
}
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]'
      }
      seen.add(value)
    }
    return value
  }
}
