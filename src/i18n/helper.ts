// @ts-ignore
import {setupI18nConfig} from '@quec/rn-language-module/src/i18n'
import {I18nManager} from 'react-native'

export function setupI18n() {
    //设置语言
    setupI18nConfig()

    I18nManager.allowRTL(false)
    I18nManager.forceRTL(false)
    // 保证整个应用在任何语言下都是从左到右显示
}
