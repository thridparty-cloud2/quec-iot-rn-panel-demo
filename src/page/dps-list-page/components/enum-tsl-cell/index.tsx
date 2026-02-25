import React, {memo} from 'react'
import {Text, View} from 'react-native'
import {EnumTSLModel, SUBTYPE_R} from '@quec/panel-model-kit'
import {useStyles} from './style'

interface EnumTslProps {
  tsl: EnumTSLModel
}

const EnumTslCell: React.FC<EnumTslProps> = ({tsl}) => {
  const styles = useStyles()
  const isReadonly = tsl.subType === SUBTYPE_R
  const currentVal = String(tsl.attributeValue ?? '')
  const options = tsl.specs?.filter((s: any) => s.dataType === 'ENUM') ?? []
  const currentLabel = tsl.valueName?.[currentVal] ?? currentVal

  return (
    <View style={styles.card}>
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

      {/* 当前值 */}
      <Text style={styles.currentValue}>{currentLabel}</Text>

      {/* 选项列表 */}
      <View style={styles.optionGrid}>
        {options.map((opt: any) => {
          const isActive = String(opt.value) === currentVal
          return (
            <View key={opt.value} style={[styles.optionChip, isActive && styles.optionChipActive]}>
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {opt.name}
              </Text>
            </View>
          )
        })}
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>选项数: {options.length}</Text>
        <Text style={styles.footerText}>ID: {tsl.id}</Text>
      </View>
    </View>
  )
}

export default memo(EnumTslCell)
