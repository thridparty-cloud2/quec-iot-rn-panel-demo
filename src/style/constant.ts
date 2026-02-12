import {Dimensions, Platform} from 'react-native'
type FontWeightType =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
type FontWeightNumberType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
/**
 * 判断系统是否是IOS
 * @type {boolean}
 */
export const isIOS = Platform.OS === 'ios'
/**
 * 获取屏幕宽度、高度
 */
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
    Dimensions.get('window')
