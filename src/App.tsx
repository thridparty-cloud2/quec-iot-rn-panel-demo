import {
  //   createDeviceListStore,
  createDeviceStore,
  DeviceModel,
  useSetProps,
} from '@quec/panel-device-kit'
import {createDpsModelStore} from '@quec/panel-model-kit'
import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
import {
  deepmergeTheme,
  ThemeProvider,
  PreferencesContext,
  QuecTheme,
  DeepPartial,
} from '@quec/panel-components-kit'
import QuecRNUserModule from '@quec/rn-user-module/src/module'
import {GlobalManager} from '@quec/panel-sdk/managers'

import AppContainer from './AppContainer'
import {setupI18n} from './i18n/helper'
import {modelDefinition} from './types/model'
import {DarkTheme, LightTheme} from './style/themes'

// 初始化多语言
setupI18n()
// 初始化设备物模型状态管理
export const {useDpsModel} = createDpsModelStore(modelDefinition)

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
    let propsSource: any = props
    if (typeof propsSource === 'string') {
      propsSource = JSON.parse(propsSource)
    }
    global.props = propsSource
    GlobalManager.initData({nativeProps: propsSource})
  }, [setProps])

  const [isInit, setIsInit] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [theme, setTheme] = useState(isDarkMode ? DarkTheme : LightTheme)
  const customOverrides = useRef<DeepPartial<QuecTheme>>({})

  useEffect(() => {
    const getNativeAppTheme = async () => {
      try {
        const res = await QuecRNUserModule.getCurrentDisplayMode()
        setIsDarkMode(res.data === 1)
      } catch (error) {
        console.error(error)
      } finally {
        setIsInit(true)
      }
    }

    getNativeAppTheme()
  }, [])

  useEffect(() => {
    const next = deepmergeTheme(isDarkMode ? DarkTheme : LightTheme, customOverrides.current)
    setTheme(next)
  }, [isDarkMode])

  const preference = useMemo(() => {
    return {
      toggleDarkMode: () => setIsDarkMode(old => !old),
      setTheme: (overrides: DeepPartial<QuecTheme>) => {
        customOverrides.current = {...customOverrides.current, ...overrides}
        setTheme(deepmergeTheme(isDarkMode ? DarkTheme : LightTheme, customOverrides.current))
      },
      theme,
    }
  }, [theme])

  if (!isInit) {
    return null
  }

  return (
    <PreferencesContext.Provider value={preference}>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </PreferencesContext.Provider>
  )
}

export default App
