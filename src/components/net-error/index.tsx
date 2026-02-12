/*
 *
 * @Author: 李征宇
 * @Date: 2024-09-13 10:31:11
 * @DESCRIPTION
 * 网络错误界面
 */
import React, {FC} from 'react'
import {
    Image,
    ImageRequireSource,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewProps,
    ViewStyle,
} from 'react-native'
import i18n from '../../i18n/i18n'
import {useThemeColors, useThemeImg} from '../../hooks/theme'

interface NetErrorProps extends ViewProps {
    /**
     * 网络错误图标
     */
    icon?: ImageRequireSource
    /**
     * 主提示语
     */
    mainTip?: string
    /**
     * 次要提示语
     */
    subTip?: string
    /**
     * 点击方法
     */
    onClick: Function
    /**
     * 容器样式
     */
    containerStyle?: ViewStyle | ViewStyle[]
    /**
     * 主内容样式
     */
    mainTipStyle?: TextStyle | TextStyle[]
    /**
     * 副内容样式
     */
    subTipStyle?: TextStyle | TextStyle[]
}

export const NetError: FC<NetErrorProps> = ({
    icon,
    mainTip,
    subTip,
    onClick,
    containerStyle,
    mainTipStyle,
    subTipStyle,
}) => {
    const colors = useThemeColors()
    const images = useThemeImg()
    return (
        <TouchableOpacity
            style={[
                styles.containerStyle,
                {backgroundColor: colors.bgColor},
                containerStyle,
            ]}
            onPress={() => {
                onClick()
            }}
        >
            <Image source={icon ?? images.netError} style={styles.iconStyle} />
            <Text
                style={[
                    styles.mainTipStyle,
                    {color: colors.textColor},
                    mainTipStyle,
                ]}
            >
                {mainTip ?? i18n('net_error_page_main_tip')}
            </Text>
            <Text
                style={[
                    styles.subTipStyle,
                    {color: colors.hintTextColor},
                    subTipStyle,
                ]}
            >
                {subTip ?? i18n('net_error_page_sub_tip')}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    /**
     * 正式页面
     */
    containerStyle: {
        flex: 1,
        alignItems: 'center',
    },
    /**
     * 图标样式
     */
    iconStyle: {
        marginTop: '15%',
        width: 240,
        height: 140,
    },
    /**
     * 主提示语的样式
     */
    mainTipStyle: {
        fontSize: 16,
        lineHeight: 22,
        marginTop: 20,
        fontWeight: 'bold',
    },
    /**
     * 次级提示语的样式
     */
    subTipStyle: {
        marginTop: 5,
        fontSize: 12,
    },
})
