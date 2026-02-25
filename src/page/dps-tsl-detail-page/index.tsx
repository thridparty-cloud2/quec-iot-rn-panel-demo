import React from 'react'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'
import {RootStackParamList} from '../../router/router'
import numberDetailCell from './components/number-detail-cell'
import {DATATYPE_DOUBLE, DATATYPE_FLOAT, DATATYPE_INT} from '@quec/panel-model-kit'

const TslDetailComponentMap: any = {
  [DATATYPE_INT]: numberDetailCell,
  [DATATYPE_FLOAT]: numberDetailCell,
  [DATATYPE_DOUBLE]: numberDetailCell,
}

type Props = NativeStackScreenProps<RootStackParamList, 'DpsTslDetailPage'>

export default function DpsTslDetailPage(props: Props) {
  const styles = useStyles()
  const tsl = props.route.params?.tsl
  const dpsKey = props.route.params?.dpsKey

  if (!tsl || !dpsKey) {
    return
  }

  const Component = TslDetailComponentMap[tsl.dataType]

  if (!Component) {
    return
  }

  return (
    <View style={styles.container}>
      <QuecHeader title={tsl.name} />
      <ScrollView>
        <Component tsl={tsl} dpsKey={dpsKey} />
      </ScrollView>
    </View>
  )
}
