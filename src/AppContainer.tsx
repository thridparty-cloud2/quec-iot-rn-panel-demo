import React, {memo, useEffect} from 'react'
import {LogBox, View} from 'react-native'
import Toast from 'react-native-toast-next'
import {
  deviceKitParamsManager,
  useDevice,
  // useDeviceList,
  // useDeviceListRefresh,
  useGetDeviceStatus,
  // useInitDeviceInfoUpdateEvent,
  // useInitDeviceListUpdateEvent,
  useInitUpdateDeviceStateEvent,
} from '@quec/panel-device-kit'
import {modelKitParamsManager, useInitDpsModel, useInitUpdateDPSEvent} from '@quec/panel-model-kit'

import Loading from './components/loading'
import {useInitEvent} from './hooks'
import {useConstructor} from './hooks/use-constructor.hook'
import AppRouter from './router'
import {setup} from './setup'
import {useTheme} from './style/themes'

LogBox.ignoreLogs(['Setting a timer'])

const AppContainer = memo(() => {
  // initModel - 请求设备产品物模型
  const initModel = useInitDpsModel()
  // 设备列表
  /**
   *   const deviceList = useDeviceList()
   */
  // 设备信息
  const device = useDevice()
  // getDeviceState - 主动请求设备状态的方法
  const getDeviceState = useGetDeviceStatus()
  const theme = useTheme()

  // 初始化逻辑 (全局方法的初始化 以及 数据的初始化)
  useConstructor(async () => {
    setup()
    // 初始化设备在线状态
    getDeviceState()
  })

  useEffect(() => {
    if (device) {
      initModel(device)
    }
  }, [initModel, device])

  // 注册监听事件
  //      监听返回键点击
  useInitEvent()
  //      监听设备状态更新
  useInitUpdateDeviceStateEvent()
  //      监听设备物模型上行
  useInitUpdateDPSEvent({})
  // 设备列表面板监听事件
  /**
   * // 监听设备信息更新(设备列表面板-更换设备)
   * useInitDeviceInfoUpdateEvent(() => {
   *      refreshDeviceList()
   *   });
   * // 监听设备列表信息更新(设备列表面板-设备列表更新)
   * useInitDeviceListUpdateEvent({enableAutoCheckoutDevice: true})
   * // 兜底 IOS APP 在（在我的-设备管理删除所有设备后）无法跳到托底面板
   * useInitTabbarSelectedEvent()
   */

  // 插件附加管理器,给各个库提供loading和toast
  modelKitParamsManager.registerCallbacks({
    loadingCallback: global.loading,
    loadingDismissCallback: global.loadingDismiss,
    tipCallback: global.toast,
  })
  deviceKitParamsManager.registerCallbacks({
    loadingCallback: global.loading,
    loadingDismissCallback: global.loadingDismiss,
    tipCallback: global.toast,
  })

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background.primary}}>
      <AppRouter />
      <Toast visibilityTime={2000} />
      <Loading
        progressColor="#c4c4c4"
        loadingStyle={{backgroundColor: 'rgba(0,0,0,.7)'}}
        textStyle={{
          color: 'white',
          fontSize: 14,
        }}
      />
    </View>
  )
})

export default AppContainer
