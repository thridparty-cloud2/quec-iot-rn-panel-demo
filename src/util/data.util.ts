import {EmitterSubscription} from 'react-native'
import _ from 'lodash'
import {Null, Type} from '../types'
import RegexUtils from './regex.util'

export const DataUtils = {
    /**
     * 移除监听事件
     * @param listener
     */
    removeListener(listener: EmitterSubscription | Null) {
        if (listener) {
            listener.remove()
            listener = undefined
        }
    },
    /**
     * 判断参数是否为空
     * @param obj any
     * @returns boolean
     */
    isNull(obj: any) {
        return obj === undefined || obj === null
    },
    /**
     * 判断参数是否为空 (深层判断)
     * @param obj any
     */
    isNullDeep(obj: any) {
        return (
            this.isNull(obj) ||
            ['{}', '[]', '"null"', '"undefined"'].includes(JSON.stringify(obj))
        )
    },
    /**
     * 判断是否是空字符串
     * @param val
     */
    isEmpty(obj: any) {
        return this.isNull(obj) || obj === '' || JSON.stringify(obj) === '""'
    },

    /**
     * 判断 值 的类型
     * @param obj
     * @returns
     */
    typeOfValue(obj: any): Type {
        const v = Object.prototype.toString.call(obj)
        const type = v.split(' ')[1].split(']')[0].toLowerCase()
        return type as Type
    },

    /**
     * 四舍五入数值
     * @param val
     * @param precision 精度位数
     * @param sup 是否自动补零
     */
    getRound(
        val: number | string,
        precision: number,
        sup: boolean = false,
    ): string | number {
        let nextVal = Number(val)
        let value =
            nextVal > 0
                ? _.round(nextVal, precision)
                : -_.round(-nextVal, precision)
        return sup ? value.toFixed(precision) : value
    },

    /**
     * 处理数字,如果参数是 NaN, 自定义返回
     */
    handlerNumberVal<T = any>(val: any, final?: T): T {
        let nextNumber: any = Number(val)
        nextNumber = Number.isNaN(nextNumber) ? final : nextNumber
        return nextNumber
    },

    /**
     * 一定是数字
     */
    trueNumber(val: any, final: number = 0): number {
        return this.handlerNumberVal(val, final)
    },

    /**
     * 是否为数字
     * @param value
     */
    isLikeNumber(value: any): boolean {
        return !this.isEmpty(value) && RegexUtils.checkNumber(value)
    },
}
