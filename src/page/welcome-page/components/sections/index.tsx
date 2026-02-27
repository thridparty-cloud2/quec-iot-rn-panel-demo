import React, {memo, useCallback} from 'react'
import {Text, View, TouchableOpacity, Linking} from 'react-native'
import {RootStackParamList} from '../../../../router/router'
import {
  PAGE_DEVICE_INFO,
  PAGE_DPS_LIST,
  PAGE_HTTP_REQUEST,
  PAGE_THEME_CONFIG,
} from '../../../../config/route-page.config'
import {useStyles} from './style'
import {useNavigation} from '../../../../hooks'

interface SectionsProps {}

interface SectionItem {
  title: string
  desc: string
  icon: string
  route: keyof RootStackParamList
}

const SECTIONS: SectionItem[] = [
  {
    title: '设备信息',
    desc: '设备信息页面示例',
    icon: '💻',
    route: PAGE_DEVICE_INFO,
  },
  {
    title: '主题配置',
    desc: '主题配置页面示例',
    icon: '🌻',
    route: PAGE_THEME_CONFIG,
  },
  {
    title: '物模型',
    desc: '物模型展示与下发示例',
    icon: '♾️',
    route: PAGE_DPS_LIST,
  },
  {
    title: '网络请求',
    desc: '网络请求示例',
    icon: '🌐',
    route: PAGE_HTTP_REQUEST,
  },
]

const DOC_SECTIONS = [
  {
    title: '面板 SDK 开发文档',
    desc: '查阅最新开发文档与 API 参考',
    icon: '📚',
    url: 'https://quec-panel-sdk-docs.vercel.app/guides/create-project.html',
  },
  {
    title: '答疑机器人',
    desc: '飞书问题解答与技术支持',
    icon: '🤖',
    url: 'https://applink.feishu.cn/client/bot/open?appId=cli_a904649e2a381cbd',
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
      <Text style={styles.sectionTitle}>文档资源</Text>
      {DOC_SECTIONS.map(item => (
        <TouchableOpacity
          key={item.url}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(item.url)}
        >
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.cardArrow}>›</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, {marginTop: 24}]}>示例章节</Text>
      {SECTIONS.map(item => (
        <TouchableOpacity
          key={item.route}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => handleNavigate(item.route)}
        >
          <View style={styles.cardIconContainer}>
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
