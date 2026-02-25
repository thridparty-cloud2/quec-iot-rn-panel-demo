import React, {memo} from 'react'
import {Text, View, Image} from 'react-native'
import {useDevice, useDeviceOnline} from '@quec/panel-device-kit'
import {useStyles} from './style'

const StatusBadge = memo(({online, styles}: {online: boolean; styles: any}) => (
  <View style={[styles.statusBadge, online ? styles.statusOnline : styles.statusOffline]}>
    <View style={[styles.statusDot, online ? styles.dotOnline : styles.dotOffline]} />
    <Text style={[styles.statusText, online ? styles.statusTextOnline : styles.statusTextOffline]}>
      {online ? '在线' : '离线'}
    </Text>
  </View>
))

function Header() {
  const device = useDevice()
  const online = useDeviceOnline()
  const styles = useStyles()

  if (!device) return null

  return (
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
  )
}

export default memo(Header)
