import React from 'react'
import {Text, View} from 'react-native'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'

export default function HttpRequestPage() {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <QuecHeader />
      <Text style={styles.text}>HttpRequestPage</Text>
    </View>
  )
}
