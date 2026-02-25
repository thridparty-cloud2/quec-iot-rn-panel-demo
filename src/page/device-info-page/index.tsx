import React, {useMemo} from 'react'
import {Text, View, ScrollView, Image} from 'react-native'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'
import {useDevice, useDeviceOnline} from '@quec/panel-device-kit'

/** 信息行 */
interface InfoRowProps {
  label: string
  value: string | number | boolean | null | undefined
}
const InfoRow = React.memo(({label, value, styles}: InfoRowProps & {styles: any}) => {
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

/** 卡片分组 */
interface SectionCardProps {
  title: string
  children: React.ReactNode
}
const SectionCard = React.memo(({title, children, styles}: SectionCardProps & {styles: any}) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
))

/** 在线状态徽章 */
const StatusBadge = React.memo(({online, styles}: {online: boolean; styles: any}) => (
  <View style={[styles.statusBadge, online ? styles.statusOnline : styles.statusOffline]}>
    <View style={[styles.statusDot, online ? styles.dotOnline : styles.dotOffline]} />
    <Text style={[styles.statusText, online ? styles.statusTextOnline : styles.statusTextOffline]}>
      {online ? '在线' : '离线'}
    </Text>
  </View>
))

/** 网络类型映射 */
const NETWORK_TYPE_MAP: Record<string, string> = {
  '1': 'Wi-Fi',
  '2': '蜂窝网络',
  '3': 'NB-IoT',
  '5': '蓝牙',
}

/** 访问类型映射 */
const ACCESS_TYPE_MAP: Record<string, string> = {
  '0': '直连设备',
  '1': '网关设备',
  '2': '网关子设备',
}

export default function DeviceInfoPage() {
  const device = useDevice()
  const online = useDeviceOnline()
  const styles = useStyles()

  const networkLabel = useMemo(
    () => NETWORK_TYPE_MAP[device?.networkType ?? ''] ?? device?.networkType ?? '--',
    [device?.networkType],
  )

  const accessLabel = useMemo(
    () => ACCESS_TYPE_MAP[device?.accessType ?? ''] ?? device?.accessType ?? '--',
    [device?.accessType],
  )

  if (!device) {
    return (
      <View style={styles.container}>
        <QuecHeader title="设备信息" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>暂无设备信息</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <QuecHeader title="设备信息" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 设备头部卡片 */}
        <View style={styles.headerCard}>
          {device.logoImage ? (
            <Image source={{uri: device.logoImage}} style={styles.deviceLogo} />
          ) : (
            <View style={styles.deviceLogoPlaceholder}>
              <Text style={styles.deviceLogoEmoji}>📱</Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.deviceName} numberOfLines={1}>
              {device.deviceName}
            </Text>
            <Text style={styles.productName} numberOfLines={1}>
              {device.productName}
            </Text>
            <StatusBadge online={online} styles={styles} />
          </View>
        </View>

        {/* 基本信息 */}
        <SectionCard title="基本信息" styles={styles}>
          <InfoRow label="DeviceKey" value={device.deviceKey} styles={styles} />
          <InfoRow label="ProductKey" value={device.productKey} styles={styles} />
          <InfoRow label="SN" value={device.sn} styles={styles} />
          <InfoRow label="访问类型" value={accessLabel} styles={styles} />
          <InfoRow label="网络类型" value={networkLabel} styles={styles} />
          <InfoRow label="协议" value={device.protocol} styles={styles} />
        </SectionCard>

        {/* 连接状态 */}
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

        {/* 产品信息 */}
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

        {/* 绑定信息 */}
        <SectionCard title="绑定信息" styles={styles}>
          <InfoRow label="绑定用户" value={device.userName} styles={styles} />
          <InfoRow label="用户ID" value={device.uid} styles={styles} />
          <InfoRow label="手机号" value={device.phone} styles={styles} />
          <InfoRow label="绑定状态" value={device.status === 1 ? '正常' : '失效'} styles={styles} />
        </SectionCard>

        {/* 时间信息 */}
        <SectionCard title="时间信息" styles={styles}>
          <InfoRow label="创建时间" value={device.deviceCreateTime} styles={styles} />
          <InfoRow label="绑定时间" value={device.deviceBindTime} styles={styles} />
          <InfoRow label="最后上线" value={device.lastConnTime} styles={styles} />
          <InfoRow label="最后离线" value={device.lastOfflineTime} styles={styles} />
        </SectionCard>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}
