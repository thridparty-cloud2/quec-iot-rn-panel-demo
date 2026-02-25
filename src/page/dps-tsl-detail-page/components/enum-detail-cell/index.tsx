import React, {memo, useEffect, useMemo, useState} from 'react'
import {View, Text, TouchableOpacity, Clipboard} from 'react-native'
import {EnumTSLModel, useTslWriter} from '@quec/panel-model-kit'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import {obsidian} from 'react-syntax-highlighter/styles/hljs'
import {useStyles} from './style'
import {useDpsModel} from '../../../../App'

interface EnumDetailCellProps {
  tsl: EnumTSLModel
  dpsKey: string
}

const EnumDetailCell: React.FC<EnumDetailCellProps> = ({tsl, dpsKey}) => {
  const dpsModel = useDpsModel()
  const styles = useStyles()
  const tslWriter = useTslWriter()
  const [value, setValue] = useState(tsl.attributeValue)
  const [copied, setCopied] = useState(false)

  const cTsl = dpsModel[dpsKey as keyof typeof dpsModel] as EnumTSLModel

  const codeStr = useMemo(() => {
    return `import { useTslWriter } from '@quec/panel-model-kit'
import { useDpsModel } from '../../../../App'

const MyComponent = () => {
  const dpsModel = useDpsModel()
  const tslWriter = useTslWriter()

  const handleWrite = () => {
    tslWriter({
      data: dpsModel.${dpsKey},
      value: '${value}',
    })
  }

  return null
}`
  }, [tsl.code, value])

  useEffect(() => {
    if (!cTsl) {
      return
    }
    setValue(cTsl.attributeValue)
  }, [cTsl])

  const options = tsl.specs?.filter((s: any) => s.dataType === 'ENUM') ?? []

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
        <View style={[styles.infoRow, styles.infoRowLast]}>
          <Text style={styles.infoLabel}>读写权限 (subType)</Text>
          <Text style={styles.infoValue}>{tsl.subType}</Text>
        </View>
      </View>

      {/* 交互 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>下发测试</Text>

        <View style={styles.optionGrid}>
          {options.map((opt: any) => {
            const isActive = String(opt.value) === String(value)
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.optionChip, isActive && styles.optionChipActive]}
                activeOpacity={0.7}
                onPress={() => setValue(String(opt.value))}
              >
                <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                  {opt.name}
                </Text>
              </TouchableOpacity>
            )
          })}
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

export default memo(EnumDetailCell)
