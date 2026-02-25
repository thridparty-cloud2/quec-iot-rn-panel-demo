import React from 'react'
import {FlatList, View} from 'react-native'
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
import BoolTslCell from './components/bool-tsl-cell'

const TslComponentMap: any = {
  [DATATYPE_INT]: NumberTslCell,
  [DATATYPE_FLOAT]: NumberTslCell,
  [DATATYPE_DOUBLE]: NumberTslCell,
  [DATATYPE_ENUM]: EnumTslCell,
  [DATATYPE_BOOL]: BoolTslCell,
}

export default function DpsListPage() {
  const dpsModel = useDpsModel()
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <QuecHeader />
      <FlatList
        data={Object.values(dpsModel).filter(Boolean)}
        keyExtractor={(item: any) => String(item.code || item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const Component = TslComponentMap[item.dataType]
          if (!Component) {
            return null
          }
          return <Component tsl={item} />
        }}
      />
    </View>
  )
}
