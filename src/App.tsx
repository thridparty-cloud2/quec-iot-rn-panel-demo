import {
    //   createDeviceListStore,
    createDeviceStore,
    DeviceModel,
    useSetProps,
} from '@quec/panel-device-kit'
import {createDeviceModelStore, createUseModel} from '@quec/panel-model-kit'
import React, {FC, useEffect} from 'react'
import AppContainer from './AppContainer'

import {setupI18n} from './i18n/helper'
import {setupNativeStyle} from './style/helper'
import {ModelsType} from './types/model'

// 初始化多语言
setupI18n()
// 固定Text的字体大小不跟随手机系统
setupNativeStyle()
// 初始化设备物模型状态管理
const store = createDeviceModelStore()
export const useModel = createUseModel<ModelsType>(store)

// 初始化面板设备状态管理器
createDeviceStore({})
// 设备列表 - 初始化设备列表状态管理器
/**
 * createDeviceListStore()
 */

interface Props {
    device: DeviceModel
    area: string
    familyModeEnabled: boolean
    familyRole: string
}

const App: FC<Props> = props => {
    const setProps = useSetProps()
    global.props = typeof props === 'string' ? JSON.parse(props) : props

    useEffect(() => {
        setProps(props)
        let propsSource = props
        if (typeof propsSource === 'string') {
            propsSource = JSON.parse(propsSource)
        }
        global.props = propsSource
    }, [setProps])

    return <AppContainer />
}

export default App
