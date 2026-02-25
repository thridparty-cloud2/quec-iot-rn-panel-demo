import React, {memo} from 'react'
import {View, Text} from 'react-native'
import {NumberTSLModel} from '@quec/panel-model-kit'

interface NumberDetailCellProps {
  tsl: NumberTSLModel
}

const NumberDetailCell: React.FC<NumberDetailCellProps> = ({tsl}) => {
  return (
    <View>
      <Text>{tsl.name}</Text>
    </View>
  )
}

export default memo(NumberDetailCell)
