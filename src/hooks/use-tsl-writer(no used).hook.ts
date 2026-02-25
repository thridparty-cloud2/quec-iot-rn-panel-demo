import _ from 'lodash'

import {AUTO_CHANNEL, BLE_CHANNEL} from '../config/channel.config'
import {onlineStatus, LOADING_SEND_TIMEOUT} from '../config/device.config'
import i18n from '../i18n/i18n'

type Value = string
type WriteItem = {
  attr: TSLModel
  value: Value
}
interface WriteOptions {
  success?: () => void
  fail?: () => void
}
type Writer = {
  (
    attrOrList: TSLModel | WriteItem[],
    valueOrOptions?: Value | WriteOptions,
    options?: WriteOptions,
  ): void
}
type Options = {
  leading?: boolean
  trailing?: boolean
  wait?: number
}

/** 默认下发成功后的回调 */
export const defaultWriteSuccessCallback = () => {
  global.toast(i18n('succeed_set'))
}
/** 默认下发失败后的回调 */
export const defaultWriteFailCallback = () => {
  global.toast(i18n('failed_set'))
}

/**
 * 下发物模型 hooks
 * @returns TslWriter
 */
export const useTslWriter = ({
  wait = 1000,
  leading = true,
  trailing = false,
}: Options = {}): Writer => {
  const verifyOnlineStatus: boolean = useVerifyOnlineStatus()
  const isBleOnline: boolean = useGetBleOnlineState()

  const writer = _.throttle<Writer>(
    (attrOrList, valueOrOptions, options) => {
      const isMulti = Array.isArray(attrOrList)
      const writeOptions: WriteOptions =
        (isMulti && typeof valueOrOptions === 'object' ? valueOrOptions : options) ||
        ({} as WriteOptions)
      const {success = defaultWriteSuccessCallback, fail = defaultWriteFailCallback} = writeOptions

      QLog.info(
        'useTslWriter',
        'verifyOnlineStatus:' + verifyOnlineStatus + '==isBleOnline:' + isBleOnline,
      )

      if (!verifyOnlineStatus) {
        fail()
        global.toast(i18n('send_cmd_offline'))
        return
      }
      const onSuccessCallback: Function = () => {
        global.loadingDismiss()
        success()
      }
      const onFailCallback: Function = () => {
        global.loadingDismiss()
        fail()
      }
      global.loadingTime(i18n('loading'), LOADING_SEND_TIMEOUT, () => {
        onFailCallback()
      })

      if (isMulti) {
        TSLUtils.multiWriteData(
          attrOrList,
          isBleOnline ? BLE_CHANNEL : AUTO_CHANNEL,
          onSuccessCallback,
          onFailCallback,
        )
      } else {
        TSLUtils.writeData(
          attrOrList,
          valueOrOptions,
          isBleOnline ? BLE_CHANNEL : AUTO_CHANNEL,
          onSuccessCallback,
          onFailCallback,
        )
      }
    },
    wait,
    {
      leading,
      trailing,
    },
  )

  return writer
}

/**
 * 验证目前设备的在线状态
 * @returns boolean
 */
export const useVerifyOnlineStatus = (): boolean => {
  const online = useDeviceOnline()
  return !!online
}

/**
 * 获取设备蓝牙是否在线
 * @returns boolean
 */
export const useGetBleOnlineState = (): boolean => {
  const onlineState = useDeviceOnlineState()
  return !!(onlineState & onlineStatus.BLE_ONLINE)
}
