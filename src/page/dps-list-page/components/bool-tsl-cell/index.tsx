import React, {memo} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {BooleanTSLModel, SUBTYPE_R} from '@quec/panel-model-kit'
import {useStyles} from './style'

interface BoolTslProps {
  tsl: BooleanTSLModel
}

const BoolTslCell: React.FC<BoolTslProps> = ({tsl}) => {
  const styles = useStyles()
  const isReadonly = tsl.subType === SUBTYPE_R
  const val = String(tsl.attributeValue) === 'true'
  const currentValStr = String(val)
  const currentLabel = tsl.valueName?.[currentValStr] ?? (val ? '打开' : '关闭')

  // BOOL 类型一般有两个固定选项: true / false
  const options = tsl.specs?.filter((s: any) => s.dataType === 'BOOL') ?? [
    {value: 'true', name: tsl.valueName?.['true'] ?? '打开'},
    {value: 'false', name: tsl.valueName?.['false'] ?? '关闭'},
  ]

  return (
    <View style={styles.card}>
      {/* 头部：名称 + 类型标签 */}
      <View style={styles.header}>
        <Text style={styles.name}>{tsl.name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>BOOL</Text>
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

      {/* 选项列表 (类似 ENUM 的展现方式) */}
      <View style={styles.optionGrid}>
        {options.map((opt: any) => {
          const isActive = String(opt.value) === currentValStr
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.optionChip, isActive && styles.optionChipActive]}
              activeOpacity={isReadonly ? 1 : 0.7}
              disabled={isReadonly}
            >
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {opt.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ID: {tsl.id}</Text>
        <Text style={styles.footerText}>排序: {tsl.sort}</Text>
      </View>
    </View>
  )
}

export default memo(BoolTslCell)
