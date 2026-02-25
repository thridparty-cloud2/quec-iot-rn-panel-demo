import React, {useMemo} from 'react'
import {View, Text} from 'react-native'
import {useDevice} from '@quec/panel-device-kit'

import QuecHeader, {IconModel} from '../../components/quec-header'
import {PAGE_ALARM_FAULT} from '../../config/route-page.config'
import {useNavigation} from '../../hooks'
import {useThemeImg} from '../../hooks/theme'
import {useStyles} from './styles'

interface MainProps {}

function Main(_props: MainProps) {
  const device = useDevice()
  const navigation = useNavigation()
  const images = useThemeImg()
  const styles = useStyles()

  const rightIcons = useMemo<IconModel[]>(() => {
    return [
      {
        icon: images.alarmFault,
        onClick: () => {
          navigation?.push(PAGE_ALARM_FAULT)
        },
      },
      {
        icon: images.moreSetting,
        onClick: () => {},
      },
    ]
  }, [device, images, navigation])

  return (
    <View style={styles.container}>
      <QuecHeader title={device?.deviceName} rightIcons={rightIcons} />
      <Text style={styles.text}>Blank</Text>
    </View>
  )
}

export default Main
