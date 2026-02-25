import React, {memo, useMemo} from 'react'
import {Text, View} from 'react-native'
import {useDevice} from '@quec/panel-device-kit'
import {useStyles} from './style'

interface InfoRowProps {
  label: string
  value: string | number | boolean | null | undefined
}
const InfoRow = memo(({label, value, styles}: InfoRowProps & {styles: any}) => {
  const displayValue =
    value === null || value === undefined || value === ''
      ? '--'
      : typeof value === 'boolean'
        ? value
          ? '是'
          : '否'
        : String(value)

  return (
    <View style={styles.infoRow}>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={2}>
          {displayValue}
        </Text>
      </View>
    </View>
  )
})

interface SectionCardProps {
  title: string
  children: React.ReactNode
}
const SectionCard = memo(({title, children, styles}: SectionCardProps & {styles: any}) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
))

const NETWORK_TYPE_MAP: Record<string, string> = {
  '1': 'Wi-Fi',
  '2': '蜂窝网络',
  '3': 'NB-IoT',
  '5': '蓝牙',
}

const ACCESS_TYPE_MAP: Record<string, string> = {
  '0': '直连设备',
  '1': '网关设备',
  '2': '网关子设备',
}

function InfoSections() {
  const device = useDevice()
  const styles = useStyles()

  const networkLabel = useMemo(
    () => NETWORK_TYPE_MAP[device?.networkType ?? ''] ?? device?.networkType ?? '--',
    [device?.networkType],
  )

  const accessLabel = useMemo(
    () => ACCESS_TYPE_MAP[device?.accessType ?? ''] ?? device?.accessType ?? '--',
    [device?.accessType],
  )

  if (!device) return null

  return (
    <>
      <SectionCard title="基本信息" styles={styles}>
        <InfoRow label="DeviceKey" value={device.deviceKey} styles={styles} />
        <InfoRow label="ProductKey" value={device.productKey} styles={styles} />
        <InfoRow label="SN" value={device.sn} styles={styles} />
        <InfoRow label="访问类型" value={accessLabel} styles={styles} />
        <InfoRow label="网络类型" value={networkLabel} styles={styles} />
        <InfoRow label="协议" value={device.protocol} styles={styles} />
      </SectionCard>

      <SectionCard title="连接状态" styles={styles}>
        <InfoRow label="在线状态" value={device.deviceStatus} styles={styles} />
        <InfoRow label="信号强度" value={device.signalStrength} styles={styles} />
        <InfoRow
          label="认证状态"
          value={device.verified === '1' ? '已认证' : '未认证'}
          styles={styles}
        />
        <InfoRow label="设备启用" value={device.enabled} styles={styles} />
      </SectionCard>

      <SectionCard title="产品信息" styles={styles}>
        <InfoRow label="一级分类" value={(device as any).firstItemName} styles={styles} />
        <InfoRow label="二级分类" value={(device as any).secondItemName} styles={styles} />
        <InfoRow
          label="设备类型"
          value={device.deviceType === 1 ? '自有设备' : '分享设备'}
          styles={styles}
        />
        <InfoRow label="是否分享" value={device.isShared} styles={styles} />
      </SectionCard>

      <SectionCard title="绑定信息" styles={styles}>
        <InfoRow label="绑定用户" value={device.userName} styles={styles} />
        <InfoRow label="用户ID" value={device.uid} styles={styles} />
        <InfoRow label="手机号" value={device.phone} styles={styles} />
        <InfoRow label="绑定状态" value={device.status === 1 ? '正常' : '失效'} styles={styles} />
      </SectionCard>

      <SectionCard title="时间信息" styles={styles}>
        <InfoRow label="创建时间" value={device.deviceCreateTime} styles={styles} />
        <InfoRow label="绑定时间" value={device.deviceBindTime} styles={styles} />
        <InfoRow label="最后上线" value={device.lastConnTime} styles={styles} />
        <InfoRow label="最后离线" value={device.lastOfflineTime} styles={styles} />
      </SectionCard>
    </>
  )
}

export default memo(InfoSections)
