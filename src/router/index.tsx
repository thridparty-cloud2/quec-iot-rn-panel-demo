'use strict'
import {SettingMoreInfoPage, SettingPageConfig} from '@quec/panel-universalsetting-component'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import * as PAGES from '../config/route-page.config'
import AlarmFaultPage from '../page/alarm-fault-page'
import Main from '../page/main-page'
import {isIOS} from '../style/constant'
import {PageRouterImp} from '../types/route'
import type {RootStackParamList} from './router'
import SettingPage from '../page/setting-page'
import WelcomePage from '../page/welcome-page'
import {useTheme} from '../style/themes'
import DeviceInfoPage from '../page/device-info-page'
import ThemeConfigPage from '../page/theme-config-page'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const PageRoutes = {
  AlarmFaultPage: new PageRouterImp(PAGES.PAGE_ALARM_FAULT, AlarmFaultPage, {
    headerShown: true,
  }),
  SettingPage: new PageRouterImp(PAGES.PAGE_SETTING, SettingPage, {
    headerShown: false,
  }),
  SettingMoreInfoPage: new PageRouterImp(
    SettingPageConfig.RN_PAGE_SETTING_MORE_INFO,
    SettingMoreInfoPage,
    {
      headerShown: false,
    },
  ),
  MainPage: new PageRouterImp(PAGES.PAGE_MAIN, Main, {
    headerShown: false,
  }),
  WelcomePage: new PageRouterImp(PAGES.PAGE_WELCOME, WelcomePage, {
    headerShown: false,
  }),
  DeviceInfoPage: new PageRouterImp(PAGES.PAGE_DEVICE_INFO, DeviceInfoPage, {
    headerShown: false,
  }),
  ThemeConfigPage: new PageRouterImp(PAGES.PAGE_THEME_CONFIG, ThemeConfigPage, {
    headerShown: false,
  }),
}

export default function AppContainer() {
  const theme = useTheme()
  const routes: Array<PageRouterImp> = Object.values(PageRoutes)

  const initOptions = {
    headerTransparent: true,
    headerShadowVisible: false,
    screenOrientation: 'portrait',
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    statusBarStyle: 'dark',
    headerShown: false,
  }
  const screenDefaults: any = isIOS
    ? initOptions
    : {
        ...initOptions,
        statusBarTranslucent: true,
        statusBarBackgroundColor: 'transparent',
      }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={PAGES.PAGE_WELCOME}
        // @ts-ignore
        detachInactiveScreens={false}
        screenOptions={() => screenDefaults}
      >
        {routes.map(child => {
          return (
            <Stack.Screen
              key={child.pageName}
              name={child.pageName}
              options={{statusBarStyle: theme.dark ? 'light' : 'dark', ...child.pageOptions}}
            >
              {(props: any) => <child.pageClass {...props} {...(child.pageOptions?.props || {})} />}
            </Stack.Screen>
          )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// 4. 若遇到StatusBar 文字不可见，可以在对应页面修改 statusBarStyle 的值 'dark' | 'light'
/* <Stack.Screen
  name="PortableEnergyStorageRename"
  component={PortableEnergyStorageRename}
  options={{
    headerShown: false,
    statusBarStyle: "dark",
  }}
/>
5. 若遇到状态栏颜色和标题颜色不一致，可以修改该页面的背景色，如下图，
//render 方法部分代码
return (
    <View style={CallerEditStyles.shell}>
      <NavBarRender
        navigation={navigation}
        title={i18n(isAdd ? 'new_add_caller' : 'edit_caller')}
      /> */

// <Stack.Screen
//   name={'MoreHelp'}
//   component={MoreHelp}
//   options={(route, navigation) => ({
//     headerShown: false,
//     statusBarStyle: 'dark',
//   })}
// />
