import {DeviceModel} from '@quec/panel-device-kit'
import Loading from '../components/loading'

declare global {
    type Nullable<T> = T | null
    type Recordable<T = any> = Record<string, T>

    function loading(timeoutCallback?: Function): void

    function loadingTime(
        message?: string,
        time?: number,
        timeoutCallback?: Function,
    ): void

    function loadingDismiss(callback?: Function): void

    function toast(message: string): void

    function selectChannel(mode?: number): void
    function breakChannel(): void
    // function selectBLE(): void;
    // function selectWIFI(): void;
    // function selectWS(): void;

    function handlerFailedSendCmd(): void

    function updateValueAfterSendCmd(): void

    var props: {device: DeviceModel; [keys: string]: any}

    var device: DeviceModel | Readonly<DeviceModel>

    var loadingRef: Loading | null

    /**
     *  SaaS http 响应类
     */
    type HttpSaaSResponseType<T> = {
        //响应码
        code: number
        //响应数据
        data?: T
        //提示消息
        msg: string
    }
    /**
     * saas 列表请求响应类
     */
    type HttpSaaSListResponseType<T> = {
        //消息状态码
        code: number
        //消息内容
        msg: string
        //列表数据
        rows: T[]
        //总记录数
        total: number
    }
    /**
     *  PaaS http 响应类
     */
    type HttpPaaSResponseType<T> = {
        code: string | number
        extMsg: any
        msg: string
        data: T
    }
}
export {}
