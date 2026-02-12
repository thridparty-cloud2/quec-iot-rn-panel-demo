import Toast from '@quec/react-native-easy-toast'
import React, {memo, useEffect, useRef} from 'react'
import {View} from 'react-native'

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
import {
    modelKitParamsManager,
    useInitUpdateDPSEvent,
    useModelInit,
} from '@quec/panel-model-kit'

import {businessKitManager} from '@quec/panel-business-kit'
import Loading from './components/loading'
import {useInitEvent} from './hooks'
import {useInitTheme} from './hooks/theme'
import {useConstructor} from './hooks/use-constructor.hook'
import i18n from './i18n/i18n'
import AppRouter from './router'
import QLog from './util/q-log.util'

// 初始化loading
const initLoading = () => {
    // 10s后，loading自动消除， 一直存在的loading timeout设置为-1
    global.loading = function (timeoutCallback?: Function) {
        QLog.info('LOADING', 'global.loading===')
        global.loadingRef?.show(i18n('loading'), 10000, timeoutCallback)
    }
    global.loadingTime = function (message, time, timeoutCallback?: Function) {
        QLog.info('LOADING', 'global.loadingTime===')
        global.loadingRef?.show(
            message || i18n('loading'),
            time,
            timeoutCallback,
        )
    }
    global.loadingDismiss = function (callback?: Function) {
        QLog.info('LOADING', 'global.loadingDismiss===')
        global.loadingRef?.dismiss(callback)
    }
}

const AppContainer = memo(() => {
    const toast = useRef<any>(null)

    // initTheme - 请求APP的明暗模式的方法
    const initTheme = useInitTheme()
    // initModel - 请求设备产品物模型
    const initModel = useModelInit()
    // 设备列表
    /**
     *   const deviceList = useDeviceList()
     */
    // 设备信息
    const device = useDevice()
    // getDeviceState - 主动请求设备状态的方法
    const getDeviceState = useGetDeviceStatus()

    // 初始化逻辑 (全局方法的初始化 以及 数据的初始化)
    useConstructor(async () => {
        // global 全局函数设置
        // toast 轻提示
        global.toast = function (message: any) {
            var newMessage = i18n('network_error')
            if (typeof message === 'object') {
                if (
                    message.message !== null &&
                    message.message !== undefined &&
                    message.message.length > 0
                ) {
                    newMessage = message.message
                } else if (
                    message.msg !== null &&
                    message.msg !== undefined &&
                    message.msg.length > 0
                ) {
                    newMessage = message.msg
                } else if (
                    message.message !== null &&
                    message.message !== undefined
                ) {
                    newMessage = JSON.stringify(message)
                }
            } else if (
                typeof message === 'string' ||
                typeof message === 'number'
            ) {
                newMessage = message
            }
            toast.current?.show(newMessage)
        }
        await initTheme()

        initLoading()

        // 全局-下发指令提示
        global.handlerFailedSendCmd = function () {
            global.toast(i18n('failed_set'))
        }
        global.updateValueAfterSendCmd = function () {
            global.toast(i18n('succeed_set'))
        }

        // 初始化设备在线状态
        getDeviceState()
    })

    useEffect(() => {
        // 获取物模型
        if (device) {
            initModel(device.productKey, device.deviceKey)
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
    businessKitManager.registerCallbacks({
        loadingCallback: global.loading,
        loadingDismissCallback: global.loadingDismiss,
        tipCallback: global.toast,
    })

    return (
        <View style={{flex: 1}}>
            <AppRouter />
            <Toast
                ref={toast}
                opacity={0.7}
                position={'center'}
                textStyle={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingStart: 20,
                    paddingEnd: 20,
                }}
            />
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
