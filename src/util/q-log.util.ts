import QuecRNLogModule from '@quec/rn-log-module/src/module'
import packageJson from '../../package.json'

const BASE_TAG = `${packageJson.name || ''}_`
/**
 * log方法类
 */
export default class QLog {
    /**
     * 自动禁用log打印
     */
    static autoDisableLog() {
        // 判断当前环境是否为生产环境
        const isProduction = !__DEV__
        // 定义一个空函数，用于覆盖所有的console方法
        const noop = () => {}
        // 如果是生产环境，将所有console方法覆盖为一个空函数
        if (isProduction) {
            console.log = noop
            console.info = noop
            console.warn = noop
            console.error = noop
            console.debug = noop
            console.trace = noop
        }
    }

    static info(tag: string, message: any) {
        if (typeof message === 'object') {
            message = JSON.stringify(message)
        }
        console.log(BASE_TAG + tag + '===' + message)
        QuecRNLogModule.i(BASE_TAG + tag, message)
    }

    static error(tag: string, message: any) {
        if (typeof message === 'object') {
            message = JSON.stringify(message)
        }
        console.log(BASE_TAG + tag + '===' + message)
        QuecRNLogModule.e(BASE_TAG + tag, message)
    }
}
