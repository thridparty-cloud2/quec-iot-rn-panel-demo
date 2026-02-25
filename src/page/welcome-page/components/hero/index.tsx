import React, {memo} from 'react'
import {Text, View} from 'react-native'
import {useStyles} from './style'
import pkg from '../../../../../package.json'

interface HeroProps {}

const Hero: React.FC<HeroProps> = _props => {
  const styles = useStyles()

  return (
    <View style={styles.heroSection}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>📱</Text>
      </View>
      <Text style={styles.title}>QuecPanel</Text>
      <Text style={styles.subtitle}>
        移远 React Native 面板示例{'\n'}包含常用页面示例和组件用法
      </Text>
      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>v{pkg.version}</Text>
      </View>
    </View>
  )
}

export default memo(Hero)
