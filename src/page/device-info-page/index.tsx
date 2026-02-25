import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'
import {useDevice} from '@quec/panel-device-kit'
import Header from './components/header'
import InfoSections from './components/info-sections'

export default function DeviceInfoPage() {
  const device = useDevice()
  const styles = useStyles()

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
        <Header />
        <InfoSections />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}
