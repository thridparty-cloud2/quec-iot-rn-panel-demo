/*
 *
 * @Author: 李征宇
 * @Date: 2024-09-13 10:08:48
 * @DESCRIPTION
 * 空白界面
 */

import React, {FC} from 'react'
import {
    Image,
    ImageRequireSource,
    ImageStyle,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native'
import i18n from '../../i18n/i18n'
import {useThemeColors, useThemeImg} from '../../hooks/theme'

interface EmptyViewProps extends ViewProps {
    /**
     * 空页面图标
     */
    emptyIcon?: ImageRequireSource
    /**
     * 空页面提示文字
     */
    emptyText?: string
    /**
     * 整体样式
     */
    containerStyle?: ViewStyle | ViewStyle[]
    /**
     * 空页面图标样式
     */
    emptyIconStyle?: ImageStyle | ImageStyle[]
    /**
     * 空页面文字样式
     */
    emptyTextStyle?: TextStyle | TextStyle[]
}

export const EmptyView: FC<EmptyViewProps> = ({
    emptyIcon,
    emptyText,
    containerStyle,
    emptyIconStyle,
    emptyTextStyle,
}) => {
    const colors = useThemeColors()
    const images = useThemeImg()

    return (
        <View
            style={[
                styles.containerStyle,
                {backgroundColor: colors.bgColor},
                containerStyle,
            ]}
        >
            <Image
                source={emptyIcon ? emptyIcon : images.normalEmpty}
                style={[styles.emptyIconStyle, emptyIconStyle]}
            />
            <Text
                style={[
                    styles.emptyTextStyle,
                    {color: colors.hintTextColor},
                    emptyTextStyle,
                ]}
            >
                {emptyText ?? i18n('nothing')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    /**
     * 整体样式
     */
    containerStyle: {
        flex: 1,
        alignItems: 'center',
    },
    /**
     * 空页面图标样式
     */
    emptyIconStyle: {
        marginTop: 100,
        width: 240,
        height: 140,
    },
    /**
     * 空页面文字样式
     */
    emptyTextStyle: {
        marginTop: 20,
        fontSize: 14,
    },
})
