import React, {memo, useCallback} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {RootStackParamList} from '../../../../router/router'
import {
  PAGE_MAIN,
  PAGE_ALARM_FAULT,
  PAGE_SETTING,
  PAGE_DEVICE_INFO,
  PAGE_THEME_CONFIG,
} from '../../../../config/route-page.config'
import {useStyles} from './style'
import {useNavigation} from '../../../../hooks'

interface SectionsProps {}

interface SectionItem {
  title: string
  desc: string
  icon: string
  color: string
  route: keyof RootStackParamList
}

const SECTIONS: SectionItem[] = [
  {
    title: '主页面（Blank）',
    desc: 'blank blank blank blank',
    icon: '🏠',
    color: '#6366F1',
    route: PAGE_MAIN,
  },
  {
    title: '设备信息',
    desc: '设备信息页面示例',
    icon: '💻',
    color: '#6366F1',
    route: PAGE_DEVICE_INFO,
  },
  {
    title: '主题配置',
    desc: '主题配置页面示例',
    icon: '🌻',
    color: '#6366F1',
    route: PAGE_THEME_CONFIG,
  },
  {
    title: '消息告警',
    desc: '设备消息和故障告警页面示例',
    icon: '🔔',
    color: '#F59E0B',
    route: PAGE_ALARM_FAULT,
  },
  {
    title: '设置页面',
    desc: '通用设置组件和配置管理示例',
    icon: '⚙️',
    color: '#10B981',
    route: PAGE_SETTING,
  },
]

const Sections: React.FC<SectionsProps> = _props => {
  const navigation = useNavigation()
  const styles = useStyles()

  const handleNavigate = useCallback(
    (route: keyof RootStackParamList) => {
      navigation?.push(route as any)
    },
    [navigation],
  )

  return (
    <>
      <Text style={styles.sectionTitle}>示例章节</Text>
      {SECTIONS.map(item => (
        <TouchableOpacity
          key={item.route}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => handleNavigate(item.route)}
        >
          <View style={[styles.cardIconContainer, {backgroundColor: item.color + '18'}]}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.cardArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </>
  )
}

export default memo(Sections)
