import React, {JSX, memo, useEffect, useMemo} from 'react'
import {
  DeviceEventEmitter,
  EmitterSubscription,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {EVENT_TYPE_GO_BACK_HOME} from '../../config/event-type.config'
import {goBackHome, useGoBack} from '../../hooks'
import {useThemeImg} from '../../hooks/theme'
import {useStyles, commonIconMargin, commonIconSize} from './style'

interface QuecHeaderProps {
  /** 标题 */
  title?: string | undefined
  /** 左图标路径 */
  leftIcon?: ImageSourcePropType
  /** 右图标集合 */
  rightIcons?: Array<IconModel>
  /** 整体样式 */
  containerStyle?: ViewStyle | ViewStyle[]
  /** 标题文本样式 */
  titleTextStyle?: TextStyle | TextStyle[]
  /** 左图标样式 */
  leftIconStyle?: ImageStyle | ImageStyle[]
  /** 右图标样式 */
  rightIconStyle?: ImageStyle | ImageStyle[]
  /** 左图标点击事件 */
  onLeftCallback?: () => void
  /** 自定义插槽 */
  children?: JSX.Element
}

export interface IconModel {
  icon: ImageSourcePropType // 图标路径
  onClick: Function // 点击事件
  style?: ImageStyle // 图标样式
}

const QuecHeader: React.FC<QuecHeaderProps> = memo(props => {
  const {
    title,
    leftIcon,
    rightIcons,
    containerStyle,
    titleTextStyle,
    leftIconStyle,
    rightIconStyle,
    children,
    onLeftCallback,
  } = props
  const insets = useSafeAreaInsets()
  const images = useThemeImg()
  const goBack = useGoBack(onLeftCallback)
  const CommonHeaderStyle = useStyles()

  // 存在右图标时, 计算对应的 title padding left 值
  // 让 title 视觉居中
  const titlePaddingLeft: number = useMemo<number>(() => {
    if (!rightIcons || rightIcons.length === 0) {
      return 0
    }

    const len = rightIcons.length - 1
    const paddingLeft = len * (commonIconMargin + commonIconSize)

    return paddingLeft
  }, [rightIcons])

  const RightView: React.FC<any> = () => {
    if (children) {
      return children
    }
    if (rightIcons && rightIcons.length > 0) {
      return (
        <>
          {rightIcons.map((i, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  const {onClick} = i
                  if (onClick && typeof onClick === 'function') {
                    onClick()
                  }
                }}
              >
                <Image
                  source={i.icon}
                  style={[
                    CommonHeaderStyle.rightIcon,
                    rightIconStyle,
                    {
                      marginLeft: index === 0 ? 0 : commonIconMargin,
                    },
                    i.style,
                  ]}
                />
              </TouchableOpacity>
            )
          })}
        </>
      )
    }
    return <View style={CommonHeaderStyle.rightIcon} />
  }

  useEffect(() => {
    let subGoBackHome: EmitterSubscription | null
    if (Platform.OS === 'android') {
      subGoBackHome = DeviceEventEmitter.addListener(EVENT_TYPE_GO_BACK_HOME, goBackHome)
    }
    return () => {
      if (Platform.OS === 'android' && subGoBackHome) {
        subGoBackHome.remove()
      }
    }
  }, [goBack])

  return (
    <View
      style={[
        CommonHeaderStyle.container,
        containerStyle,
        {
          height: 38 + insets.top,
          paddingTop: insets.top,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          goBack()
        }}
      >
        <Image
          source={leftIcon || images.back}
          style={[CommonHeaderStyle.leftIcon, leftIconStyle]}
        />
      </TouchableOpacity>
      {/* Title View */}
      <Text
        style={[CommonHeaderStyle.titleText, {paddingLeft: titlePaddingLeft}, titleTextStyle]}
        numberOfLines={1}
        ellipsizeMode={'middle'}
      >
        {title}
      </Text>
      {/* Right View */}
      <RightView />
    </View>
  )
})

export default QuecHeader
