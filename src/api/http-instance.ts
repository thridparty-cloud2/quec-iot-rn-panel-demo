import {NativeModules, Platform} from 'react-native'
import * as RNLocalize from 'react-native-localize'
import QuecRNNetworkModule from '@quec/rn-network-module/src/module'

import {
    AREA_NORTH_AMERICA,
    SAAS_URL_NORTH_AMERICA,
    AREA_EUROPE,
    SAAS_URL_EUROPE,
    SAAS_URL_CHINA,
    RequestMethod,
    AcceptLanguage,
    XQTimeZone,
    ContentTypeKey,
    ContentType,
} from './constants'
import {isIos} from '../util'
import i18n from '../i18n/i18n'
import QLog from '../util/q-log.util'

interface HttpConfig {
    path: string
    method: RequestMethod
    params?: any
    httpHeaders?: any
    httpBody?: any
}
type HttpConfigOmitMethod = Omit<HttpConfig, 'method'>

class HttpInstance {
    public request<T extends any = any>(_config: HttpConfig): Promise<T> {
        return new Promise(() => {})
    }

    public get<T extends any = any>(config: HttpConfigOmitMethod) {
        return this.request<T>({...config, method: RequestMethod.GET})
    }
    public post<T extends any = any>(config: HttpConfigOmitMethod) {
        return this.request<T>({...config, method: RequestMethod.POST})
    }
    public put<T extends any = any>(config: HttpConfigOmitMethod) {
        return this.request<T>({...config, method: RequestMethod.PUT})
    }
    public delete<T extends any = any>(config: HttpConfigOmitMethod) {
        return this.request<T>({...config, method: RequestMethod.DELETE})
    }
    public patch<T extends any = any>(config: HttpConfigOmitMethod) {
        return this.request<T>({...config, method: RequestMethod.PATCH})
    }
}

class HttpSaasInstance extends HttpInstance {
    /** 实例 */
    private static instance: HttpSaasInstance
    /** App Area */
    private area: string

    constructor() {
        super()
        this.area = global.props.area
    }

    /**
     * @description 获取实例
     */
    public static getInstance() {
        if (!HttpSaasInstance.instance) {
            HttpSaasInstance.instance = new HttpSaasInstance()
        }
        return HttpSaasInstance.instance
    }

    /**
     * @description 获取 baseUrl
     */
    private getBaseUrl(): string {
        if (this.area === AREA_NORTH_AMERICA) {
            return SAAS_URL_NORTH_AMERICA
        } else if (this.area === AREA_EUROPE) {
            return SAAS_URL_EUROPE
        }
        return SAAS_URL_CHINA
    }

    /**
     * @description 处理 Saas 请求中 Body 的语言
     */
    private convertAcceptLanguage(
        lang: string,
        separator: string = '-',
    ): string {
        const langArr = lang.split('_')
        if (langArr.length >= 2) {
            return `${langArr[0]}${separator}${langArr[1]}`
        }

        return lang.replace(/_/, separator)
    }

    public request<T extends any = any>(config: HttpConfig): Promise<T> {
        let {httpBody, httpHeaders, path, params, method} = config
        const nextPath = this.getBaseUrl() + path

        return new Promise((resolve, reject) => {
            if (httpHeaders === undefined || httpHeaders === null) {
                httpHeaders = {}
            }
            const deviceLanguage =
                Platform.OS === 'ios'
                    ? NativeModules.SettingsManager.settings.AppleLocale ||
                      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
                    : NativeModules.I18nManager.localeIdentifier

            httpHeaders[`${AcceptLanguage}`] =
                this.convertAcceptLanguage(deviceLanguage)

            let timeZone = RNLocalize.getTimeZone()
            httpHeaders[`${XQTimeZone}`] = timeZone

            let nextHttpBody: any
            if (isIos) {
                httpHeaders[ContentTypeKey] = ContentType
                if (method === RequestMethod.POST) {
                    nextHttpBody = params
                } else {
                    nextHttpBody = httpBody
                }
            } else {
                nextHttpBody = httpBody
            }

            QuecRNNetworkModule.apiRequest(
                nextPath,
                method,
                params,
                httpHeaders,
                nextHttpBody,
            )
                .then((res: any) => {
                    if (res.code === 200 || res.code === '200') {
                        resolve(res as T)
                    } else {
                        reject(new Error(i18n('request_error')))
                        QLog.error('_requestSaas error', nextPath)
                        QLog.error('_requestSaas error', res)
                    }
                })
                .catch((error: any) => {
                    reject(new Error(i18n('request_error')))
                    QLog.error('_requestSaas catch error', nextPath)
                    QLog.error('_requestSaas catch error', error)
                })
        })
    }
}

class HttpPaasInstance extends HttpInstance {
    /** 实例 */
    private static instance: HttpPaasInstance

    /**
     * @description 获取实例
     */
    public static getInstance() {
        if (!HttpPaasInstance.instance) {
            HttpPaasInstance.instance = new HttpPaasInstance()
        }
        return HttpPaasInstance.instance
    }

    request<T extends any = any>(config: HttpConfig): Promise<T> {
        const {path, method, params, httpHeaders, httpBody} = config
        return new Promise((resolve, reject) => {
            QuecRNNetworkModule.apiPathRequest(
                path,
                method,
                params,
                httpHeaders,
                httpBody,
            )
                .then((res: any) => {
                    if (res.code === 200 || res.code === '200') {
                        resolve(res as T)
                    } else {
                        reject(new Error(res.msg))
                    }
                })
                .catch((error: any) => {
                    reject(error)
                })
        })
    }
}

export const httpSaasInstance = HttpSaasInstance.getInstance()
export const httpPaasInstance = HttpPaasInstance.getInstance()
