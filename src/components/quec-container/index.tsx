import React from 'react'
import {
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'

import QuecHeader, {IconModel} from '../quec-header'
import {useThemeColors} from '../../hooks/theme'

interface Props {
    /** 内容视图 */
    children: any
    /** 头部标题 */
    headerTitle?: string

    /** 是否隐藏头部 */
    hideHeader?: boolean

    /** 容器样式 */
    style?: ViewStyle | ViewStyle[]

    /** 自定义头部 */
    renderHeader?: React.ReactNode
    /** 自定义头部右边视图 */
    renderHeaderRightView?: JSX.Element

    /** 左图标路径 */
    leftIcon?: ImageSourcePropType
    /** 右图标路径集合 */
    rightIcons?: Array<IconModel>
    /** 左图标样式 */
    leftIconStyle?: ImageStyle | ImageStyle[]
    /** 右图标样式 */
    rightIconStyle?: ImageStyle | ImageStyle[]
    /** 左图标点击事件 */
    onLeftCallback?: () => void
}

export default function QuecContainer(props: Props) {
    const colors = useThemeColors()
    const {
        children,
        headerTitle,
        hideHeader,
        style,
        renderHeader,
        renderHeaderRightView,
        leftIcon,
        rightIcons,
        leftIconStyle,
        rightIconStyle,
        onLeftCallback,
    } = props

    const headerNode: React.ReactNode = renderHeader ? (
        renderHeader
    ) : (
        <QuecHeader
            title={headerTitle ?? ''}
            leftIcon={leftIcon}
            rightIcons={rightIcons}
            leftIconStyle={leftIconStyle}
            rightIconStyle={rightIconStyle}
            onLeftCallback={onLeftCallback}
        >
            {renderHeaderRightView}
        </QuecHeader>
    )

    return (
        <View
            style={[styles.container, {backgroundColor: colors.bgColor}, style]}
        >
            {!hideHeader && headerNode}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
