import {
  DATATYPE_INT,
  DATATYPE_FLOAT,
  DATATYPE_DOUBLE,
  DATATYPE_ENUM,
  DATATYPE_BOOL,
} from '@quec/panel-model-kit'
import TSLModel from '@quec/panel-model-kit/dist/src/type/tsl/TSLModel'
import React, {memo} from 'react'
import {Text, View, TouchableOpacity, Linking} from 'react-native'
import {useStyles} from './style'

interface TipsProps {
  tsl: TSLModel
}

const baseUrl = 'https://quec-panel-sdk-docs.vercel.app/'

const docsLinkMap: any = {
  [DATATYPE_INT]: `${baseUrl}biz-components/model-kit/number.html`,
  [DATATYPE_FLOAT]: `${baseUrl}biz-components/model-kit/number.html`,
  [DATATYPE_DOUBLE]: `${baseUrl}biz-components/model-kit/number.html`,
  [DATATYPE_ENUM]: `${baseUrl}biz-components/model-kit/enum.html`,
  [DATATYPE_BOOL]: `${baseUrl}biz-components/model-kit/boolean.html`,
}

const Tips: React.FC<TipsProps> = props => {
  const {tsl} = props
  const styles = useStyles()
  const link = docsLinkMap[tsl.dataType]

  if (!link) return null

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.7}
        onPress={() => Linking.openURL(link)}
      >
        <View style={styles.leftContent}>
          <Text style={styles.text}>查看 {tsl.dataType} 类型的官方文档</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  )
}

export default memo(Tips)
