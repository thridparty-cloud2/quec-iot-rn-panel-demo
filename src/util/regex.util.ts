/**
 * 正则方法类
 */
export default class RegexUtils {
    /**
     * 检验是否为数字
     * @param value
     */
    static checkNumber(value: number | string): boolean {
        const reg = /^-?\d+(\.\d+)?(e-?\d+)?$/
        if (reg.test(value.toString())) {
            return true
        }
        return false
    }

    /**
     * 检查整数
     * @param number 数字
     * @returns {boolean} 校验结果
     */
    static checkInteger(number: number | string) {
        if (number.toString().search('-') !== -1) {
            if (number.toString().length >= 2) {
                if (number.toString().substring(0, 2) === '-0') {
                    return false
                }
            }
        } else {
            if (number.toString().length >= 2) {
                if (number.toString().substring(0, 1) === '0') {
                    return false
                }
            }
        }
        let regex = /^-?\d+$/
        return regex.test(number.toString())
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkDecimal(decimal: number | string) {
        let regex = /^-?\d+\.?\d*$/
        return regex.test(decimal.toString())
    }

    /**
     *检查设备名称是否合法
     * @param name
     */
    static checkDeviceName(name: string) {
        let regex = /^[\u4e00-\u9fa5A-Za-z0-9~!@#$%^&*_-]*$/
        return regex.test(name)
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkFloatDecimal(decimal: string | number) {
        if (decimal.toString().search('-') !== -1) {
            if (decimal.toString().length >= 3) {
                if (
                    decimal.toString().substr(1, 1) === '0' &&
                    decimal.toString().substr(2, 1) !== '.'
                ) {
                    return false
                }
            }
        } else {
            if (decimal.toString().length >= 2) {
                if (
                    decimal.toString().substr(0, 1) === '0' &&
                    decimal.toString().substr(1, 1) !== '.'
                ) {
                    return false
                }
            }
        }
        let regex = /^-?\d+\.?\d{0,7}$/
        return regex.test(decimal.toString())
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkDoubleDecimal(decimal: number | string) {
        if (decimal.toString().search('-') !== -1) {
            if (decimal.toString().length >= 3) {
                if (
                    decimal.toString().substr(1, 1) === '0' &&
                    decimal.toString().substr(2, 1) !== '.'
                ) {
                    return false
                }
            }
        } else {
            if (decimal.toString().length >= 2) {
                if (
                    decimal.toString().substr(0, 1) === '0' &&
                    decimal.toString().substr(1, 1) !== '.'
                ) {
                    return false
                }
            }
        }
        let regex = /^-?\d+\.?\d{0,15}$/
        return regex.test(decimal.toString())
    }
}
