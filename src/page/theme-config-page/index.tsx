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

/** 颜色色块 + 标签 */
const ColorSwatch = ({
  color,
  label,
  name,
  styles,
}: {
  color: string
  label: string
  name: string
  styles: any
}) => (
  <View style={styles.swatchItem}>
    <View style={[styles.swatchBox, {backgroundColor: color}]} />
    <Text style={styles.swatchLabel} numberOfLines={1}>
      {label}
    </Text>
    <Text style={styles.swatchName} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.swatchHex} numberOfLines={1}>
      {color}
    </Text>
  </View>
)

/** 将 hex 颜色与白色混合，生成浅色变体 */
const lightenColor = (hex: string, ratio = 0.85): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.round(r + (255 - r) * ratio)
  const lg = Math.round(g + (255 - g) * ratio)
  const lb = Math.round(b + (255 - b) * ratio)
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`
}

/** 将 hex 颜色与黑色混合，生成深色变体 */
const darkenColor = (hex: string, ratio = 0.7): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const dr = Math.round(r * (1 - ratio))
  const dg = Math.round(g * (1 - ratio))
  const db = Math.round(b * (1 - ratio))
  return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`
}

export default function ThemeConfigPage() {
  const styles = useStyles()
  const preference: any = useContext(PreferencesContext)
  const isDark = preference?.theme?.dark ?? false
  const colors = preference?.theme?.colors
  const currentBrand = colors?.brand?.primary ?? '#6366F1'
  const [selectedColor, setSelectedColor] = useState(currentBrand)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    preference?.setTheme({
      colors: {
        brand: {
          primary: color,
          primaryLight: isDark ? darkenColor(color) : lightenColor(color),
        },
      },
    })
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

        {/* 主题色选择 */}
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

        {/* ══════ ColorSystem 示例展示 ══════ */}

        {/* 品牌色 Brand */}
        <Text style={styles.sectionTitle}>品牌色 Brand</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.brand?.primary}
              label="主色"
              name="primary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.brand?.primaryLight}
              label="浅色"
              name="primaryLight"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.brand?.secondary}
              label="次要"
              name="secondary"
              styles={styles}
            />
            <ColorSwatch color={colors?.brand?.accent} label="强调" name="accent" styles={styles} />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: colors?.brand?.primary}]}
            activeOpacity={0.8}
          >
            <Text style={{color: colors?.brand?.primaryContrastText, fontWeight: '600'}}>
              主按钮
            </Text>
          </TouchableOpacity>
          <View style={styles.demoRow}>
            <View style={[styles.demoBadge, {backgroundColor: colors?.brand?.primaryLight}]}>
              <Text style={{color: colors?.brand?.primary, fontSize: 12}}>标签</Text>
            </View>
            <View style={[styles.demoBadge, {backgroundColor: colors?.brand?.secondary}]}>
              <Text style={{color: '#FFF', fontSize: 12}}>次要</Text>
            </View>
            <View style={[styles.demoBadge, {backgroundColor: colors?.brand?.accent}]}>
              <Text style={{color: '#FFF', fontSize: 12}}>强调</Text>
            </View>
          </View>
        </View>

        {/* 背景色 Background */}
        <Text style={styles.sectionTitle}>背景色 Background</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.background?.primary}
              label="主背景"
              name="primary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.background?.secondary}
              label="次背景"
              name="secondary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.background?.tertiary}
              label="三级"
              name="tertiary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.background?.surface}
              label="浮层"
              name="surface"
              styles={styles}
            />
          </View>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.background?.inverted}
              label="反色"
              name="inverted"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.background?.input}
              label="输入框"
              name="input"
              styles={styles}
            />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <View style={styles.bgDemoStack}>
            <View style={[styles.bgDemoLayer, {backgroundColor: colors?.background?.primary}]}>
              <Text style={{color: colors?.text?.primary, fontSize: 12}}>主背景 primary</Text>
              <View style={[styles.bgDemoLayer, {backgroundColor: colors?.background?.secondary}]}>
                <Text style={{color: colors?.text?.primary, fontSize: 12}}>卡片 secondary</Text>
                <View style={[styles.bgDemoLayer, {backgroundColor: colors?.background?.tertiary}]}>
                  <Text style={{color: colors?.text?.primary, fontSize: 12}}>区块 tertiary</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.demoInputBox,
              {backgroundColor: colors?.background?.input, borderColor: colors?.border?.default},
            ]}
          >
            <Text style={{color: colors?.text?.placeholder, fontSize: 13}}>输入框背景示例...</Text>
          </View>
        </View>

        {/* 状态色 Status */}
        <Text style={styles.sectionTitle}>状态色 Status</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.status?.success}
              label="成功"
              name="success"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.status?.warning}
              label="警告"
              name="warning"
              styles={styles}
            />
            <ColorSwatch color={colors?.status?.error} label="错误" name="error" styles={styles} />
            <ColorSwatch color={colors?.status?.info} label="信息" name="info" styles={styles} />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <View style={styles.statusDemoRow}>
            <View style={[styles.statusBadge, {backgroundColor: colors?.status?.success + '20'}]}>
              <View style={[styles.statusDot, {backgroundColor: colors?.status?.success}]} />
              <Text style={{color: colors?.status?.success, fontSize: 12, fontWeight: '600'}}>
                成功
              </Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: colors?.status?.warning + '20'}]}>
              <View style={[styles.statusDot, {backgroundColor: colors?.status?.warning}]} />
              <Text style={{color: colors?.status?.warning, fontSize: 12, fontWeight: '600'}}>
                警告
              </Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: colors?.status?.error + '20'}]}>
              <View style={[styles.statusDot, {backgroundColor: colors?.status?.error}]} />
              <Text style={{color: colors?.status?.error, fontSize: 12, fontWeight: '600'}}>
                错误
              </Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: colors?.status?.info + '20'}]}>
              <View style={[styles.statusDot, {backgroundColor: colors?.status?.info}]} />
              <Text style={{color: colors?.status?.info, fontSize: 12, fontWeight: '600'}}>
                信息
              </Text>
            </View>
          </View>
        </View>

        {/* 文字色 Text */}
        <Text style={styles.sectionTitle}>文字色 Text</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.text?.primary}
              label="主要"
              name="primary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.text?.secondary}
              label="次要"
              name="secondary"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.text?.tertiary}
              label="三级"
              name="tertiary"
              styles={styles}
            />
            <ColorSwatch color={colors?.text?.hint} label="提示" name="hint" styles={styles} />
          </View>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.text?.disabled}
              label="禁用"
              name="disabled"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.text?.inverse}
              label="反转"
              name="inverse"
              styles={styles}
            />
            <ColorSwatch color={colors?.text?.link} label="链接" name="link" styles={styles} />
            <ColorSwatch
              color={colors?.text?.placeholder}
              label="占位符"
              name="placeholder"
              styles={styles}
            />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <View style={styles.textDemoList}>
            <Text style={{color: colors?.text?.primary, fontSize: 16, fontWeight: '600'}}>
              主要文字 Primary
            </Text>
            <Text style={{color: colors?.text?.secondary, fontSize: 14}}>
              次要文字 Secondary — 用于说明和描述
            </Text>
            <Text style={{color: colors?.text?.tertiary, fontSize: 13}}>
              三级文字 Tertiary — 辅助信息、时间戳
            </Text>
            <Text style={{color: colors?.text?.hint, fontSize: 12}}>
              提示文字 Hint — 引导用户操作
            </Text>
            <Text style={{color: colors?.text?.disabled, fontSize: 12}}>
              禁用文字 Disabled — 不可操作状态
            </Text>
            <Text style={{color: colors?.text?.link, fontSize: 13}}>链接文字 Link — 点击跳转</Text>
            <View style={[styles.textInverseBox, {backgroundColor: colors?.background?.inverted}]}>
              <Text style={{color: colors?.text?.inverse, fontSize: 13}}>
                反转文字 Inverse — 深色背景
              </Text>
            </View>
          </View>
        </View>

        {/* 边框色 Border */}
        <Text style={styles.sectionTitle}>边框色 Border</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch
              color={colors?.border?.default}
              label="默认"
              name="default"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.border?.strong}
              label="强调"
              name="strong"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.border?.divider}
              label="分割线"
              name="divider"
              styles={styles}
            />
            <ColorSwatch
              color={colors?.border?.dividerLight}
              label="浅分割"
              name="dividerLight"
              styles={styles}
            />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <View style={styles.borderDemoRow}>
            <View style={[styles.borderBox, {borderColor: colors?.border?.default}]}>
              <Text style={{color: colors?.text?.tertiary, fontSize: 11}}>默认</Text>
            </View>
            <View style={[styles.borderBox, {borderColor: colors?.border?.strong, borderWidth: 2}]}>
              <Text style={{color: colors?.text?.tertiary, fontSize: 11}}>强调</Text>
            </View>
          </View>
          <View style={[styles.demoDividerLine, {backgroundColor: colors?.border?.divider}]} />
          <Text style={{color: colors?.text?.tertiary, fontSize: 11, textAlign: 'center'}}>
            ↑ divider
          </Text>
          <View style={[styles.demoDividerLine, {backgroundColor: colors?.border?.dividerLight}]} />
          <Text style={{color: colors?.text?.tertiary, fontSize: 11, textAlign: 'center'}}>
            ↑ dividerLight
          </Text>
        </View>

        {/* 覆盖层 Overlay */}
        <Text style={styles.sectionTitle}>覆盖层 Overlay</Text>
        <View style={styles.card}>
          <View style={styles.swatchRow}>
            <ColorSwatch color={colors?.overlay?.light} label="浅色" name="light" styles={styles} />
            <ColorSwatch
              color={colors?.overlay?.medium}
              label="中等"
              name="medium"
              styles={styles}
            />
            <ColorSwatch color={colors?.overlay?.heavy} label="深色" name="heavy" styles={styles} />
          </View>
          <View style={styles.demoDivider} />
          <Text style={styles.demoLabel}>示例</Text>
          <View style={styles.overlayDemoRow}>
            <View style={styles.overlayDemoBase}>
              <View style={[styles.overlayDemoCover, {backgroundColor: colors?.overlay?.light}]} />
              <Text style={styles.overlayDemoText}>Light</Text>
            </View>
            <View style={styles.overlayDemoBase}>
              <View style={[styles.overlayDemoCover, {backgroundColor: colors?.overlay?.medium}]} />
              <Text style={styles.overlayDemoText}>Medium</Text>
            </View>
            <View style={styles.overlayDemoBase}>
              <View style={[styles.overlayDemoCover, {backgroundColor: colors?.overlay?.heavy}]} />
              <Text style={styles.overlayDemoText}>Heavy</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}
