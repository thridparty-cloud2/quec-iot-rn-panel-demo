/*
 * @Author: newlyn.ma newlyn.ma@quectel.com
 * @Date: 2023-06-09 15:49:44
 * @LastEditors: lucy.li lucy.li@quectel.com
 * @LastEditTime: 2025-01-16 20:07:33
 * @FilePath: \QuecPanelDemo_3\src\router\router.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import {SettingPageConfig} from '@quec/panel-universalsetting-component'
import * as PAGES from '../config/route-page.config'
// NativeStackScreenProps 该类型采用 3 个泛型：
// 我们之前定义的参数列表对象
// 屏幕所属的路由名称
// 导航器的 ID（可选

// useNavigation

// type PageNames = 'Home' | 'BaseRename' | 'BaseMore' | 'BaseRecord' | 'NetworkError' | 'AttrEmpty';
// export type RootStackParamLists <T>=Record<PageNames, T>
export type RootStackParamList = {
  [PAGES.PAGE_SETTING]: {
    device: any
    settingData: any
    panelProcess: boolean
  }
  [SettingPageConfig.RN_PAGE_SETTING_MORE_INFO]: undefined
  [PAGES.PAGE_MAIN]: undefined
  [PAGES.PAGE_ALARM_FAULT]: undefined
  [PAGES.PAGE_MORE_HELP]: {device: any; area: string}
  [PAGES.PAGE_PRODUCT_MANUAL]: undefined
  [PAGES.PAGE_WELCOME]: undefined
  [PAGES.PAGE_DEVICE_INFO]: undefined
    [PAGES.PAGE_THEME_CONFIG]: undefined;
}
