import React, {FC, useMemo} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {IconModel} from '../../components/quec-header'
import {PAGE_ALARM_FAULT, PAGE_SETTING} from '../../config/route-page.config'
import {useNavigation} from '../../hooks'

import {PageContainer} from '@quec/panel-business-kit'
import {
    useDevice,
    useDeviceFamily,
    useDeviceProductUrl,
} from '@quec/panel-device-kit'
import {useTslWriter} from '@quec/panel-model-kit'
import {useModel} from '../../App'
import {useThemeColors, useThemeImg} from '../../hooks/theme'

interface MainProps {}

const Main: FC<MainProps> = () => {
    const device = useDevice()
    const productUrl = useDeviceProductUrl()
    const family = useDeviceFamily()
    const colors = useThemeColors()
    const images = useThemeImg()

    const navigation = useNavigation()
    const models = useModel()

    const rightIcons = useMemo<Array<IconModel>>(() => {
        return [
            {
                icon: images.alarmFault,
                onClick: () => {
                    navigation?.push(PAGE_ALARM_FAULT)
                },
            },
            {
                icon: images.moreSetting,
                onClick: () => {
                    if (device) {
                        navigation.navigate(PAGE_SETTING, {
                            device,
                        })
                    }
                },
            },
        ]
    }, [device, images])

    const write = useTslWriter()

    return (
        <PageContainer
            headerTitle={device?.deviceName}
            rightIcons={rightIcons}
            hideStatusBar
        >
            <ScrollView style={styles.container}>
                {/* <View>
                        <Text>耳灯：</Text>
                        <Switch
                            value={
                                models.earlampSwitch?.attributeValue ?? false
                            }
                            onValueChange={value => {
                                write({
                                    data: models.earlampSwitch,
                                    value: value,
                                });
                            }}
                        />
                    </View> */}
                {Object.entries(models ?? {}).map(([key, item]) => {
                    const val = item.attributeValue
                    const isObj = typeof val === 'object'
                    const isArr = Array.isArray(val)
                    return (
                        <View key={key}>
                            <View>
                                {/* <Text>{`code:     ${item.code}`}</Text> */}
                                <Text>{`${key} name:     ${item.name}`}</Text>
                                <Text>{`dataType:     ${item.dataType}`}</Text>
                                <Text>{'attributeValue:'}</Text>
                                {!isObj && !isArr && <Text>{val}</Text>}
                                {isObj &&
                                    !isArr &&
                                    Object.entries(val).map(([vkey, vitem]) => (
                                        <Text key={vkey}>
                                            {'      ' +
                                                vkey +
                                                ' :      ' +
                                                vitem}
                                        </Text>
                                    ))}
                                {/* arr */}
                                {isObj &&
                                    isArr &&
                                    // <Text>{JSON.stringify(val)}</Text>
                                    val.map((vItem, i) => {
                                        if (typeof vItem === 'object') {
                                            return (
                                                <View key={i}>
                                                    {Object.entries(vItem).map(
                                                        ([vkey, vitem]) => (
                                                            <Text key={vkey}>
                                                                {'      ' +
                                                                    vkey +
                                                                    ' :      ' +
                                                                    vitem}
                                                            </Text>
                                                        ),
                                                    )}
                                                    <Text>
                                                        ----------------------------
                                                    </Text>
                                                </View>
                                            )
                                        }
                                        return <Text key={i}>{vItem}</Text>
                                    })}
                                <Text>
                                    ************************************************
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </PageContainer>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {},
})
