import {StatusBar, StyleSheet} from 'react-native'
import {getTopInset} from 'rn-iphone-helper'
import {isIOS} from '../../style/constant'
import {secondTitleFontSize} from '../../style/dimens'

const commonHeaderHeight = 38
export const commonIconSize = 28
export const commonIconMargin = 8
const topInset = isIOS ? getTopInset() ?? 0 : StatusBar.currentHeight ?? 0

export const CommonHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // ps: 根据 不同设备的状态栏 来设置不同的高度和 paddingTop
        height: commonHeaderHeight + topInset,
        paddingTop: topInset,
        paddingHorizontal: 15,
    },
    titleText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: secondTitleFontSize,
    },
    rightIcon: {
        width: commonIconSize,
        height: commonIconSize,
        zIndex: 100,
    },
    leftIcon: {
        width: commonIconSize,
        height: commonIconSize,
    },
})
