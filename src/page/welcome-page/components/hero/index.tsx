import React, {memo, useEffect, useState, useCallback} from 'react'
import {Text, View} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated'
import {useStyles} from './style'
import pkg from '../../../../../package.json'

const GREETINGS = [
  '你好',
  'Hi',
  'こんにちは',
  '안녕하세요',
  'Bonjour',
  'Hola',
  'Ciao',
  'Hallo',
  'Olá',
  'Привет',
  'مرحبا',
  'สวัสดี',
  'Xin chào',
  'Merhaba',
  'Namaste',
]

const INTERVAL = 3000
const FADE_DURATION = 500

interface HeroProps {}

const Hero: React.FC<HeroProps> = _props => {
  const styles = useStyles()
  const [index, setIndex] = useState(0)
  const opacity = useSharedValue(1)

  const nextGreeting = useCallback(() => {
    setIndex(prev => (prev + 1) % GREETINGS.length)
    opacity.value = withTiming(1, {
      duration: FADE_DURATION,
      easing: Easing.out(Easing.ease),
    })
  }, [opacity])

  useEffect(() => {
    const timer = setInterval(() => {
      opacity.value = withTiming(
        0,
        {
          duration: FADE_DURATION,
          easing: Easing.in(Easing.ease),
        },
        finished => {
          if (finished) {
            runOnJS(nextGreeting)()
          }
        },
      )
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [opacity, nextGreeting])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={styles.heroSection}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>📱</Text>
      </View>
      <Animated.Text style={[styles.title, animatedStyle]}>{GREETINGS[index]}</Animated.Text>
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
