import React from 'react'
import {Text, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'
import {RootStackParamList} from '../../router/router'

type Props = NativeStackScreenProps<RootStackParamList, 'DpsTslDetailPage'>

export default function DpsTslDetailPage(props: Props) {
  const styles = useStyles()
  const tsl = props.route.params?.tsl

  if (!tsl) {
    return
  }

  return (
    <View style={styles.container}>
      <QuecHeader title={tsl.name} />
      <Text>Demo</Text>
    </View>
  )
}
