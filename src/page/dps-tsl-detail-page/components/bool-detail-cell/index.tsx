import React, {memo, useEffect, useMemo, useState} from 'react'
import {View, Text, TouchableOpacity, Clipboard} from 'react-native'
import {BooleanTSLModel, useTslWriter} from '@quec/panel-model-kit'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import {obsidian} from 'react-syntax-highlighter/styles/hljs'
import {useStyles} from './style'
import {useDpsModel} from '../../../../App'

interface BoolDetailCellProps {
  tsl: BooleanTSLModel
  dpsKey: string
}

const BoolDetailCell: React.FC<BoolDetailCellProps> = ({tsl, dpsKey}) => {
  const dpsModel = useDpsModel()
  const styles = useStyles()
  const tslWriter = useTslWriter()

  // 对于 Bool 型，初始取值转换为字符串 'true' / 'false' 以方便匹配
  const initialValueStr = String(tsl.attributeValue) === 'true' ? 'true' : 'false'
  const [value, setValue] = useState(initialValueStr)
  const [copied, setCopied] = useState(false)

  const cTsl = dpsModel[dpsKey as keyof typeof dpsModel] as BooleanTSLModel

  // value 是 'true' 或者 'false' 字符串，生成发的数据根据这部分走
  const codeStr = useMemo(() => {
    return `import { useTslWriter } from '@quec/panel-model-kit'
import { useDpsModel } from '../../../../App'

const MyComponent = () => {
  const dpsModel = useDpsModel()
  const tslWriter = useTslWriter()

  const handleWrite = () => {
    tslWriter({
      data: dpsModel.${dpsKey},
      value: ${value === 'true' ? true : false},
    })
  }

  return null
}`
  }, [tsl.code, value])

  useEffect(() => {
    if (!cTsl) {
      return
    }
    const valStr = String(cTsl.attributeValue) === 'true' ? 'true' : 'false'
    setValue(valStr)
  }, [cTsl])

  // options 枚举 Bool
  const options = tsl.specs?.filter((s: any) => s.dataType === 'BOOL') ?? [
    {value: 'true', name: tsl.valueName?.['true'] ?? 'true'},
    {value: 'false', name: tsl.valueName?.['false'] ?? 'false'},
  ]

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
            const isActive = String(opt.value) === value
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
              value: value === 'true' ? true : false,
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

export default memo(BoolDetailCell)
