import React, {useContext, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import {PreferencesContext} from '@quec/panel-components-kit'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'

const BRAND_COLORS = [
  {label: '靛蓝', value: '#6366F1'},
  {label: '翠绿', value: '#10B981'},
  {label: '琥珀', value: '#F59E0B'},
  {label: '玫红', value: '#EC4899'},
  {label: '天蓝', value: '#0EA5E9'},
  {label: '珊瑚', value: '#F43F5E'},
  {label: '紫罗兰', value: '#8B5CF6'},
  {label: '橙色', value: '#F97316'},
]

export default function ThemeConfigPage() {
  const styles = useStyles()
  const preference: any = useContext(PreferencesContext)
  const isDark = preference?.theme?.dark ?? false
  const currentBrand = preference?.theme?.colors?.brand?.primary ?? '#6366F1'
  const [selectedColor, setSelectedColor] = useState(currentBrand)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    preference?.setTheme({colors: {brand: {primary: color}}})
  }

  return (
    <View style={styles.container}>
      <QuecHeader title="主题配置" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 当前主题预览 */}
        <View style={styles.previewCard}>
          <View style={[styles.previewCircle, {backgroundColor: currentBrand}]}>
            <Text style={styles.previewEmoji}>{isDark ? '🌙' : '☀️'}</Text>
          </View>
          <Text style={styles.previewTitle}>{isDark ? '深色模式' : '浅色模式'}</Text>
          <Text style={styles.previewSubtitle}>
            主题色：{BRAND_COLORS.find(c => c.value === selectedColor)?.label ?? '自定义'}
          </Text>
        </View>

        {/* 外观模式 */}
        <Text style={styles.sectionTitle}>外观模式</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.modeOption}
            activeOpacity={0.7}
            onPress={() => {
              if (isDark) preference?.toggleDarkMode()
            }}
          >
            <Text style={styles.modeEmoji}>☀️</Text>
            <Text style={styles.modeLabel}>浅色</Text>
            {!isDark && <View style={[styles.modeIndicator, {backgroundColor: currentBrand}]} />}
          </TouchableOpacity>
          <View style={styles.modeDivider} />
          <TouchableOpacity
            style={styles.modeOption}
            activeOpacity={0.7}
            onPress={() => {
              if (!isDark) preference?.toggleDarkMode()
            }}
          >
            <Text style={styles.modeEmoji}>🌙</Text>
            <Text style={styles.modeLabel}>深色</Text>
            {isDark && <View style={[styles.modeIndicator, {backgroundColor: currentBrand}]} />}
          </TouchableOpacity>
        </View>

        {/* 主题色 */}
        <Text style={styles.sectionTitle}>主题色</Text>
        <View style={styles.card}>
          <View style={styles.colorGrid}>
            {BRAND_COLORS.map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.colorItem}
                activeOpacity={0.7}
                onPress={() => handleColorChange(item.value)}
              >
                <View
                  style={[
                    styles.colorCircle,
                    {backgroundColor: item.value},
                    selectedColor === item.value && styles.colorCircleSelected,
                  ]}
                >
                  {selectedColor === item.value && <Text style={styles.colorCheck}>✓</Text>}
                </View>
                <Text style={styles.colorLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 效果预览 */}
        <Text style={styles.sectionTitle}>效果预览</Text>
        <View style={styles.card}>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>品牌主色</Text>
            <View style={[styles.previewSwatch, {backgroundColor: currentBrand}]} />
          </View>
          <View style={styles.previewDivider} />
          <TouchableOpacity
            style={[styles.previewButton, {backgroundColor: currentBrand}]}
            activeOpacity={0.8}
          >
            <Text style={styles.previewButtonText}>示例按钮</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}
