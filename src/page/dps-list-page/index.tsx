import React from 'react'
import {ScrollView, View} from 'react-native'
import {
  DATATYPE_BOOL,
  DATATYPE_DOUBLE,
  DATATYPE_ENUM,
  DATATYPE_FLOAT,
  DATATYPE_INT,
} from '@quec/panel-model-kit'
import QuecHeader from '../../components/quec-header'
import {useStyles} from './style'
import {useDpsModel} from '../../App'
import NumberTslCell from './components/number-tsl-cell'
import EnumTslCell from './components/enum-tsl-cell'

const TslComponentMap: any = {
  [DATATYPE_INT]: NumberTslCell,
  [DATATYPE_FLOAT]: NumberTslCell,
  [DATATYPE_DOUBLE]: NumberTslCell,
  [DATATYPE_ENUM]: EnumTslCell,
  [DATATYPE_BOOL]: EnumTslCell,
}

export default function DpsListPage() {
  const dpsModel = useDpsModel()
  const styles = useStyles()

  console.log('dps', dpsModel.comfort)

  return (
    <View style={styles.container}>
      <QuecHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(dpsModel).map(([, tsl], idx) => {
          if (!tsl) {
            return null
          }
          const Component = TslComponentMap[tsl.dataType]
          if (!Component) {
            return null
          }
          return (
            <View key={idx}>
              <Component tsl={tsl} />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
