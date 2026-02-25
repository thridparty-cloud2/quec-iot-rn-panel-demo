import React, {memo, useEffect, useMemo, useState} from 'react'
import {View, Text, TouchableOpacity, Clipboard} from 'react-native'
import {NumberTSLModel, useTslWriter} from '@quec/panel-model-kit'
import {Slider} from '@miblanchard/react-native-slider'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import {obsidian} from 'react-syntax-highlighter/styles/hljs'
import {useStyles} from './style'
import {useTheme} from '../../../../style/themes'

interface NumberDetailCellProps {
  tsl: NumberTSLModel
}

const NumberDetailCell: React.FC<NumberDetailCellProps> = ({tsl}) => {
  const styles = useStyles()
  const theme = useTheme()
  const tslWriter = useTslWriter()
  const [value, setValue] = useState(tsl.attributeValue)
  const [copied, setCopied] = useState(false)

  const codeStr = useMemo(() => {
    return `import { useTslWriter } from '@quec/panel-model-kit'
import { useDpsModel } from '../../../../App'

const MyComponent = () => {
  const dpsModel = useDpsModel()
  const tslWriter = useTslWriter()

  const handleWrite = () => {
    tslWriter({
      data: dpsModel['${tsl.code}'],
      value: ${value},
    })
  }

  return null
}`
  }, [tsl.code, value])

  useEffect(() => {
    setValue(tsl.attributeValue)
  }, [tsl.attributeValue])

  return (
    <View style={styles.container}>
      {/* 属性基础信息 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>基础信息</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>名称 (name)</Text>
          <Text style={styles.infoValue}>{tsl.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>标识符 (code)</Text>
          <Text style={[styles.infoValue, styles.infoCode]}>{tsl.code}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>数据类型 (dataType)</Text>
          <Text style={styles.infoValue}>{tsl.dataType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>读写权限 (subType)</Text>
          <Text style={styles.infoValue}>{tsl.subType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>最小值 (min)</Text>
          <Text style={styles.infoValue}>{tsl.min}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>最大值 (max)</Text>
          <Text style={styles.infoValue}>{tsl.max}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>步长 (step)</Text>
          <Text style={styles.infoValue}>{tsl.step}</Text>
        </View>
        <View style={[styles.infoRow, styles.infoRowLast]}>
          <Text style={styles.infoLabel}>单位 (unit)</Text>
          <Text style={styles.infoValue}>{(tsl as any).unit || '无'}</Text>
        </View>
      </View>

      {/* 交互 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>下发测试</Text>
        <View style={styles.testValueContainer}>
          <Text style={styles.testValueText}>
            {value}
            <Text style={styles.testUnitText}>{tsl.unit}</Text>
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            value={value}
            trackClickable={false}
            minimumValue={tsl.min ?? 0}
            maximumValue={tsl.max ?? 100}
            step={tsl.step ?? 1}
            minimumTrackTintColor={theme.colors.brand.primary}
            maximumTrackTintColor={theme.colors.border.dividerLight}
            thumbTintColor="#FFFFFF"
            trackStyle={styles.trackStyle}
            thumbStyle={styles.thumbStyle}
            onValueChange={val => setValue(val[0])}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonPrimary}
          activeOpacity={0.8}
          onPress={() => {
            tslWriter({
              data: tsl,
              value: value,
            })
          }}
        >
          <Text style={styles.buttonText}>确认下发</Text>
        </TouchableOpacity>
      </View>

      {/* 代码示例 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>代码片段示例</Text>
        <View style={styles.codeContainer}>
          <TouchableOpacity
            style={styles.copyButton}
            activeOpacity={0.7}
            onPress={() => {
              Clipboard.setString(codeStr)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            <Text style={styles.copyButtonText}>{copied ? '已复制' : '复制代码'}</Text>
          </TouchableOpacity>
          <SyntaxHighlighter
            language="javascript"
            style={obsidian}
            highlighter="hljs"
            PreTag={Text}
            CodeTag={Text}
            customStyle={{margin: 0, padding: 16, paddingTop: 36, borderRadius: 8}}
          >
            {codeStr}
          </SyntaxHighlighter>
        </View>
      </View>
    </View>
  )
}

export default memo(NumberDetailCell)
