import React, {useMemo, useState} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {useDevice} from '@quec/panel-device-kit'
import {to} from '@quec/panel-sdk/utils'
import {httpSaasInstance, SaasEnv} from '@quec/panel-sdk/request'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import {obsidian} from 'react-syntax-highlighter/styles/hljs'

import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'

/** 请求方式 */
const METHOD_OPTIONS: {label: string; value: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}[] = [
  {label: 'GET', value: 'GET'},
  {label: 'POST', value: 'POST'},
  {label: 'PUT', value: 'PUT'},
  {label: 'DELETE', value: 'DELETE'},
  {label: 'PATCH', value: 'PATCH'},
]
/** 环境列表 */
const ENV_OPTIONS: {label: string; value: SaasEnv; desc: string}[] = [
  {label: 'PROD', value: SaasEnv.PROD, desc: '生产环境'},
  {label: 'UAT', value: SaasEnv.UAT, desc: 'UAT 环境'},
  {label: 'FATB', value: SaasEnv.FATB, desc: 'FATB 环境'},
  {label: 'FAT2', value: SaasEnv.FAT2, desc: 'FAT2 环境'},
  {label: 'FATC', value: SaasEnv.FATC, desc: 'FATC 环境'},
  {label: 'DEV', value: SaasEnv.DEV, desc: '开发环境'},
  {label: 'LOCAL', value: SaasEnv.LOCAL, desc: '本地调试'},
]

const API_PATH = 'v2/aibiz/enduserapi/device/bot/variables/obtain'

export default function HttpRequestPage() {
  const styles = useStyles()
  const device = useDevice()

  const [selectedEnv, setSelectedEnv] = useState<SaasEnv>(SaasEnv.PROD)
  const [reqMethod, setReqMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET')
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const codeStr = useMemo(() => {
    return `import { httpSaasInstance, SaasEnv } from '@quec/panel-sdk/request'
import { to } from '@quec/panel-sdk/utils'
import { useDevice } from '@quec/panel-device-kit'

const handleRequest = async () => {
  const device = useDevice()

  // 1. 初始化环境
  httpSaasInstance.init({ env: SaasEnv.${selectedEnv.toUpperCase()} })

  // 2. 发起请求
  const [err, res] = await to(
    httpSaasInstance.${reqMethod.toLowerCase()}({
      path: 'v2/aibiz/enduserapi/.../obtain',
      params: {
        productKey: device.productKey,
        deviceKey: device.deviceKey,
        endUserId: device.uid,
      },
    }),
  )

  if (err) {
    console.error('请求失败', err.message)
    return
  }
  console.log('请求成功', res)
}`
  }, [selectedEnv, reqMethod])

  const handleEnvChange = (env: SaasEnv) => {
    setSelectedEnv(env)
    httpSaasInstance.init({env})
  }

  const handleRequest = async () => {
    if (!device) {
      global.toast('设备信息为空，无法发起请求')
      return
    }
    httpSaasInstance.init({env: selectedEnv})

    setLoading(true)
    setResponse(null)
    setError(null)

    let reqPromise
    if (reqMethod === 'GET') {
      reqPromise = httpSaasInstance.get({
        path: 'v2/aibiz/enduserapi/device/bot/variables/obtain',
        params: {
          productKey: device.productKey,
          deviceKey: device.deviceKey,
          endUserId: device.uid,
        },
      })
    } else {
      reqPromise = httpSaasInstance[reqMethod.toLowerCase() as 'post' | 'put' | 'delete' | 'patch'](
        {
          path: 'v2/aibiz/enduserapi/device/bot/variables/obtain',
          httpBody: {
            productKey: device.productKey,
            deviceKey: device.deviceKey,
            endUserId: device.uid,
          },
        },
      )
    }

    const [err, res] = await to(reqPromise)

    setLoading(false)

    if (err) {
      setError(err.message || '未知错误')
      global.toast('请求失败')
      return
    }

    setResponse(res)
    global.toast('请求成功')
  }

  const envDesc = ENV_OPTIONS.find(e => e.value === selectedEnv)?.desc ?? ''

  return (
    <View style={styles.container}>
      <QuecHeader title="网络请求" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── API 信息 ── */}
        <Text style={styles.sectionTitle}>请求接口</Text>
        <View style={styles.card}>
          <View style={styles.apiInfoRow}>
            <View style={styles.apiMethodBadge}>
              <Text style={styles.apiMethodText}>{reqMethod}</Text>
            </View>
            <Text style={styles.apiPath} numberOfLines={2}>
              {API_PATH}
            </Text>
          </View>
        </View>

        {/* ── 响应结果 ── */}
        <Text style={styles.sectionTitle}>响应结果</Text>
        <View style={styles.card}>
          {response || error ? (
            <>
              <View style={styles.responseHeader}>
                <Text style={styles.responseTitle}>Response</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: error
                        ? 'rgba(255, 59, 48, 0.12)'
                        : 'rgba(52, 199, 89, 0.12)',
                    },
                  ]}
                >
                  <View
                    style={[styles.statusDot, {backgroundColor: error ? '#FF3B30' : '#34C759'}]}
                  />
                  <Text style={[styles.statusText, {color: error ? '#FF3B30' : '#34C759'}]}>
                    {error ? 'Error' : 'Success'}
                  </Text>
                </View>
              </View>
              <ScrollView
                style={styles.responseBody}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.responseText} selectable>
                  {error ? JSON.stringify({error}, null, 2) : JSON.stringify(response, null, 2)}
                </Text>
              </ScrollView>
            </>
          ) : (
            <View style={styles.emptyResponse}>
              <Text style={styles.emptyText}>点击上方按钮发起请求</Text>
            </View>
          )}
        </View>

        {/* ── 请求方式选择器 ── */}
        <Text style={styles.sectionTitle}>请求方式 Method</Text>
        <View style={styles.card}>
          <View style={styles.envGrid}>
            {METHOD_OPTIONS.map(item => {
              const isActive = item.value === reqMethod
              return (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.envChip, isActive && styles.envChipActive]}
                  activeOpacity={0.7}
                  onPress={() => setReqMethod(item.value)}
                >
                  <Text style={[styles.envChipText, isActive && styles.envChipTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* ── 环境选择器 ── */}
        <Text style={styles.sectionTitle}>环境选择 SaasEnv</Text>
        <View style={styles.card}>
          <View style={styles.envGrid}>
            {ENV_OPTIONS.map(item => {
              const isActive = item.value === selectedEnv
              return (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.envChip, isActive && styles.envChipActive]}
                  activeOpacity={0.7}
                  onPress={() => handleEnvChange(item.value)}
                >
                  <Text style={[styles.envChipText, isActive && styles.envChipTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style={styles.envHint}>
            当前环境: {envDesc} ({selectedEnv})
          </Text>
        </View>

        {/* ── 示例代码 ── */}
        <Text style={styles.sectionTitle}>示例代码</Text>
        <View style={styles.card}>
          <SyntaxHighlighter
            language="javascript"
            style={obsidian}
            highlighter="hljs"
            PreTag={Text}
            CodeTag={Text}
            customStyle={{margin: 0, padding: 12, borderRadius: 8}}
          >
            {codeStr}
          </SyntaxHighlighter>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ── 请求 ── */}
      <View style={styles.floatingButtonWrap}>
        <TouchableOpacity
          style={[styles.requestButton, loading && {opacity: 0.5}]}
          activeOpacity={0.8}
          onPress={handleRequest}
          disabled={loading}
        >
          <Text style={styles.requestButtonText}>{loading ? '请求中...' : '发起请求'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
