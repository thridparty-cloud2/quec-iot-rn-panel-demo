import React, {memo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {NumberTSLModel, SUBTYPE_R} from '@quec/panel-model-kit'
import {useStyles} from './style'
import {useNavigation} from '../../../../hooks'
import {PAGE_DPS_TSL_DETAIL} from '../../../../config/route-page.config'

interface NumberTslProps {
  tsl: NumberTSLModel
  dpsKey: string
}
const NumberTslCell: React.FC<NumberTslProps> = ({tsl, dpsKey}) => {
  const navigation = useNavigation()
  const styles = useStyles()
  const min = tsl.min ?? 0
  const max = tsl.max ?? 100
  const val = Number(tsl.attributeValue) || 0
  const progress = max > min ? Math.max(0, Math.min(1, (val - min) / (max - min))) : 0
  const isReadonly = tsl.subType === SUBTYPE_R

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(PAGE_DPS_TSL_DETAIL, {tsl, dpsKey})
      }}
    >
      {/* 头部：名称 + 类型标签 */}
      <View style={styles.header}>
        <Text style={styles.name}>{tsl.name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{tsl.dataType}</Text>
          </View>
          {isReadonly && (
            <View style={[styles.typeBadge, styles.readonlyBadge]}>
              <Text style={styles.typeBadgeText}>只读</Text>
            </View>
          )}
        </View>
      </View>

      {/* code 名 */}
      <Text style={styles.code}>{tsl.code}</Text>

      {/* 数值展示 */}
      <View style={styles.valueRow}>
        <Text style={styles.value}>
          {val}
          {tsl.unit ? <Text style={styles.unit}> {tsl.unit}</Text> : null}
        </Text>
        <Text style={styles.range}>
          {min} ~ {max}
          {tsl.unit ? ` ${tsl.unit}` : ''}
        </Text>
      </View>

      {/* 进度条 */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>步长: {tsl.step ?? 1}</Text>
        {tsl.decimalCount !== undefined && tsl.decimalCount > 0 && (
          <Text style={styles.footerText}>小数位: {tsl.decimalCount}</Text>
        )}
        <Text style={styles.footerText}>ID: {tsl.id}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(NumberTslCell)
