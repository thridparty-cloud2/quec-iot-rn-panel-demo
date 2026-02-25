import React from 'react'
import {Text} from 'react-native'
import {View} from 'react-native'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'

export default function ThemeConfigPage() {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <QuecHeader />
      <Text>ThemeConfigPage</Text>
    </View>
  )
}
