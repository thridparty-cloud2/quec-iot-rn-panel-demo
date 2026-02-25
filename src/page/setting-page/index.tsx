import {PageContainer} from '@quec/panel-business-kit'
import {useDevice} from '@quec/panel-device-kit'
import {getFontStyle, SCREEN_WIDTH} from '@quec/panel-theme-kit-config'
import {
  DeviceNameProductComp,
  DeviceOfflineReminderComp,
  DeviceProductDesComp,
} from '@quec/panel-universalsetting-component'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React, {FC, useMemo} from 'react'
import {ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {useThemeColors, useThemeImg} from '../../hooks/theme'
import i18n from '../../i18n/i18n'
import {RootStackParamList} from '../../router/router'

interface SectionTitleProps {
  title: string
}

const SectionTitle: FC<SectionTitleProps> = ({title}) => {
  const colors = useThemeColors()
  return (
    <View style={{padding: 12, paddingTop: 20, width: '100%'}}>
      <Text style={getFontStyle(14, 400, colors.textColor)}>{title}</Text>
    </View>
  )
}

interface SettingProps {}
const boxStyle: ViewStyle = {
  width: SCREEN_WIDTH / 2 - 24,
  marginLeft: 16,
  marginBottom: 8,
}
const SettingPage: FC<SettingProps> = () => {
  const device = useDevice()
  const colors = useThemeColors()
  const images = useThemeImg()
  const navigation: any = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const isShared = useMemo(() => device?.isShared, [device])

  return (
    <PageContainer
      headerTitle={i18n('quec_setting_page_title')}
      onLeftCallback={() => {
        navigation.pop()
      }}
      hideStatusBar
    >
      <ScrollView
        style={[styles.content, {backgroundColor: colors.bgColor}]}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title={i18n('quec_setting_basic_info')} />
        <DeviceNameProductComp />
        {/* <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <DeviceMoreInfoComp style={boxStyle}></DeviceMoreInfoComp>
                    <DeviceUpdateComp style={boxStyle} />
                    {!isShared && <DeviceShareComp style={boxStyle} />}
                </View> */}
        <SectionTitle title={i18n('quec_setting_device_capacity')} />
        {!isShared && (
          <DeviceOfflineReminderComp arrowSource={images.imgArrowRight} showDivider={false} />
        )}

        <DeviceProductDesComp arrowSource={images.imgArrowRight} showDivider={false} />
        <View style={{height: 100}} />
      </ScrollView>
    </PageContainer>
  )
}

export default SettingPage
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
})
