import React, {FC, useMemo, useState, useEffect} from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Switch,
    TextInput,
    Button,
    Alert,
    BackHandler,
} from 'react-native'
import {IconModel} from '../../components/quec-header'
import {PAGE_ALARM_FAULT, PAGE_SETTING} from '../../config/route-page.config'
import {useNavigation} from '../../hooks'
import QuecRNRouterModule from '@quec/rn-router-module/src/module'
import {PageContainer} from '@quec/panel-business-kit'
import {
    useDevice,
    useDeviceFamily,
    useDeviceProductUrl,
} from '@quec/panel-device-kit'
import {useTslWriter} from '@quec/panel-model-kit'
import {useModel} from '../../App'
import {useThemeColors, useThemeImg} from '../../hooks/theme'
import {setupI18nConfig} from '@quec/rn-language-module/src/i18n'
import i18n from '../../i18n/i18n'

interface MainProps {}

const Main: FC<MainProps> = () => {
    const device = useDevice()
    const productUrl = useDeviceProductUrl()
    const family = useDeviceFamily()
    const colors = useThemeColors()
    const images = useThemeImg()

    const navigation = useNavigation()
    const models = useModel()
    const t = i18n

    // 初始化多语言配置
    setupI18nConfig()

    // 返回键处理
    useEffect(() => {
        let isExiting = false

        const backAction = () => {
            if (isExiting) return true

            // 检查是否可以返回上一页
            if (navigation.canGoBack()) {
                navigation.goBack()
                return true
            } else {
                // 如果没有上一页，显示退出确认对话框
                Alert.alert(
                    '提示',
                    '确定要退出应用吗？',
                    [
                        {text: '取消', onPress: () => {}, style: 'cancel'},
                        {
                            text: '确定',
                            onPress: () => {
                                isExiting = true
                                console.log('返回键退出应用')

                                // 直接使用QuecRNRouterModule.popWithNumber(1)退出应用
                                try {
                                    console.log(
                                        '返回键退出应用: QuecRNRouterModule.popWithNumber(1)',
                                    )
                                    QuecRNRouterModule.popWithNumber(1)
                                } catch (e) {
                                    console.log(
                                        'QuecRNRouterModule.popWithNumber(1) failed:',
                                        e,
                                    )

                                    // 如果QuecRNRouterModule失败，尝试备用方法
                                    try {
                                        console.log(
                                            '备用方法: BackHandler.exitApp()',
                                        )
                                        BackHandler.exitApp()
                                    } catch (e2) {
                                        console.log(
                                            'BackHandler.exitApp() failed:',
                                            e2,
                                        )
                                    }
                                }
                            },
                        },
                    ],
                    {cancelable: false},
                )
                return true
            }
        }

        // 添加返回键监听器
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )

        // 清理函数
        return () => backHandler.remove()
    }, [navigation])

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

    // 示例状态
    const [switchValue, setSwitchValue] = useState(false)
    const [numberValue, setNumberValue] = useState(50)
    const [textValue, setTextValue] = useState('')
    const [enumValue, setEnumValue] = useState('0')

    // 布尔型物模型操作示例
    const handleBooleanChange = (value: boolean) => {
        setSwitchValue(value)
        // 查找第一个布尔类型的物模型进行演示
        const booleanModel = Object.values(models).find(
            model => model.dataType === 'BOOL',
        )

        if (booleanModel) {
            write(
                {
                    data: booleanModel,
                    value: value.toString(),
                },
                {
                    success() {
                        console.log('布尔型物模型下发成功')
                    },
                    fail() {
                        console.log('布尔型物模型下发失败')
                        Alert.alert('提示', '布尔型物模型下发失败')
                    },
                },
            )
        } else {
            Alert.alert(
                t('main_page_alert_tip'),
                t('main_page_boolean_not_found'),
            )
        }
    }

    // 数值型物模型操作示例
    const handleNumberChange = (value: number) => {
        setNumberValue(value)
        // 查找第一个数值类型的物模型进行演示
        const numberModel = Object.values(models).find(
            model => model.dataType === 'INT' || model.dataType === 'FLOAT',
        )

        if (numberModel) {
            write(
                {
                    data: numberModel,
                    value: value.toString(),
                },
                {
                    success() {
                        console.log('数值型物模型下发成功')
                    },
                    fail() {
                        console.log('数值型物模型下发失败')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_numeric_send_fail'),
                        )
                    },
                },
            )
        } else {
            Alert.alert(
                t('main_page_alert_tip'),
                t('main_page_numeric_not_found'),
            )
        }
    }

    // 文本型物模型操作示例
    const handleTextSubmit = () => {
        if (!textValue.trim()) {
            Alert.alert(
                t('main_page_alert_tip'),
                t('main_page_text_input_prompt'),
            )
            return
        }

        // 查找第一个文本类型的物模型进行演示
        const textModel = Object.values(models).find(
            model => model.dataType === 'TEXT',
        )

        if (textModel) {
            write(
                {
                    data: textModel,
                    value: textValue,
                },
                {
                    success() {
                        console.log('文本型物模型下发成功')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_text_send_success'),
                        )
                    },
                    fail() {
                        console.log('文本型物模型下发失败')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_text_send_fail'),
                        )
                    },
                },
            )
        } else {
            Alert.alert(t('main_page_alert_tip'), t('main_page_text_not_found'))
        }
    }

    // 枚举型物模型操作示例
    const handleEnumChange = (value: string) => {
        setEnumValue(value)
        // 查找第一个枚举类型的物模型进行演示
        const enumModel = Object.values(models).find(
            model => model.dataType === 'ENUM',
        )

        if (enumModel) {
            write(
                {
                    data: enumModel,
                    value: value,
                },
                {
                    success() {
                        console.log('枚举型物模型下发成功')
                    },
                    fail() {
                        console.log('枚举型物模型下发失败')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_enum_send_fail'),
                        )
                    },
                },
            )
        } else {
            Alert.alert(t('main_page_alert_tip'), t('main_page_enum_not_found'))
        }
    }

    // 多个物模型同时下发示例
    const handleMultiWrite = () => {
        const writeItems = []

        // 收集可用的物模型
        Object.values(models).forEach(model => {
            switch (model.dataType) {
                case 'BOOL':
                    writeItems.push({attr: model, value: 'true'})
                    break
                case 'INT':
                case 'FLOAT':
                    writeItems.push({attr: model, value: '60'})
                    break
                case 'TEXT':
                    writeItems.push({attr: model, value: '多参数下发测试'})
                    break
                case 'ENUM':
                    writeItems.push({attr: model, value: '1'})
                    break
            }
        })

        if (writeItems.length > 0) {
            write(
                {
                    data: writeItems,
                },
                {
                    success() {
                        console.log('多物模型下发成功')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_multi_send_success'),
                        )
                    },
                    fail() {
                        console.log('多物模型下发失败')
                        Alert.alert(
                            t('main_page_alert_tip'),
                            t('main_page_multi_send_fail'),
                        )
                    },
                },
            )
        } else {
            Alert.alert(
                t('main_page_alert_tip'),
                t('main_page_no_available_model'),
            )
        }
    }

    return (
        <PageContainer
            headerTitle={device?.deviceName}
            rightIcons={rightIcons}
            hideStatusBar
        >
            <ScrollView style={styles.container}>
                {/* 物模型调用示例区域 */}
                <View style={styles.demoSection}>
                    <Text style={styles.sectionTitle}>
                        {t('main_page_model_demo')}
                    </Text>

                    {/* 布尔型物模型示例 */}
                    <View style={styles.demoItem}>
                        <Text style={styles.demoTitle}>
                            {t('main_page_boolean_model')}
                        </Text>
                        <View style={styles.row}>
                            <Text>{t('main_page_boolean_control')}</Text>
                            <Switch
                                value={switchValue}
                                onValueChange={handleBooleanChange}
                            />
                        </View>
                    </View>

                    {/* 数值型物模型示例 */}
                    <View style={styles.demoItem}>
                        <Text style={styles.demoTitle}>
                            {t('main_page_numeric_model')}
                        </Text>
                        <View style={styles.row}>
                            <Text>{t('main_page_numeric_adjust')}</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType="numeric"
                                value={numberValue.toString()}
                                onChangeText={text => {
                                    const num = parseInt(text) || 0
                                    if (num >= 0 && num <= 100) {
                                        setNumberValue(num)
                                    }
                                }}
                                onBlur={() => handleNumberChange(numberValue)}
                            />
                            <Button
                                title={t('main_page_setting')}
                                onPress={() => handleNumberChange(numberValue)}
                                color={colors.primary}
                            />
                        </View>
                        <View style={styles.buttonRow}>
                            <Button
                                title="-10"
                                onPress={() =>
                                    handleNumberChange(
                                        Math.max(0, numberValue - 10),
                                    )
                                }
                                color={colors.primary}
                            />
                            <Button
                                title="+10"
                                onPress={() =>
                                    handleNumberChange(
                                        Math.min(100, numberValue + 10),
                                    )
                                }
                                color={colors.primary}
                            />
                        </View>
                    </View>

                    {/* 文本型物模型示例 */}
                    <View style={styles.demoItem}>
                        <Text style={styles.demoTitle}>
                            {t('main_page_text_model')}
                        </Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={t('main_page_text_input_prompt')}
                                value={textValue}
                                onChangeText={setTextValue}
                            />
                            <Button
                                title={t('main_page_send')}
                                onPress={handleTextSubmit}
                                color={colors.primary}
                            />
                        </View>
                    </View>

                    {/* 枚举型物模型示例 */}
                    <View style={styles.demoItem}>
                        <Text style={styles.demoTitle}>
                            {t('main_page_enum_model')}
                        </Text>
                        <View style={styles.row}>
                            <Text>{t('main_page_mode_selection')}</Text>
                        </View>
                        <View style={styles.enumContainer}>
                            <Button
                                title={t('main_page_mode_1')}
                                onPress={() => handleEnumChange('0')}
                                color={
                                    enumValue === '0' ? colors.primary : '#ccc'
                                }
                            />
                            <Button
                                title={t('main_page_mode_2')}
                                onPress={() => handleEnumChange('1')}
                                color={
                                    enumValue === '1' ? colors.primary : '#ccc'
                                }
                            />
                            <Button
                                title={t('main_page_mode_3')}
                                onPress={() => handleEnumChange('2')}
                                color={
                                    enumValue === '2' ? colors.primary : '#ccc'
                                }
                            />
                        </View>
                        <Text style={styles.selectedValue}>
                            {t('main_page_current_selection')}:{' '}
                            {t('main_page_mode_' + (parseInt(enumValue) + 1))}
                        </Text>
                    </View>

                    {/* 多物模型同时下发示例 */}
                    <View style={styles.demoItem}>
                        <Text style={styles.demoTitle}>
                            {t('main_page_multi_model_send')}:
                        </Text>
                        <View style={styles.row}>
                            <Button
                                title={t('main_page_multi_model_send')}
                                onPress={handleMultiWrite}
                                color={colors.primary}
                            />
                        </View>
                    </View>
                </View>

                {/* 分隔线 */}
                <View style={styles.separator} />

                {/* 原有的物模型展示区域 */}
                <View style={styles.modelSection}>
                    <Text style={styles.sectionTitle}>
                        {t('main_page_model_display')}
                    </Text>
                    {Object.entries(models ?? {}).map(([key, item]) => {
                        const val = item.attributeValue
                        const isObj = typeof val === 'object'
                        const isArr = Array.isArray(val)
                        return (
                            <View key={key} style={styles.modelItem}>
                                <View>
                                    <Text
                                        style={styles.modelName}
                                    >{`${key} name: ${item.name}`}</Text>
                                    <Text
                                        style={styles.modelType}
                                    >{`dataType: ${item.dataType}`}</Text>
                                    <Text style={styles.modelValueLabel}>
                                        attributeValue:
                                    </Text>
                                    {!isObj && !isArr && (
                                        <Text style={styles.modelValue}>
                                            {val}
                                        </Text>
                                    )}
                                    {isObj &&
                                        !isArr &&
                                        Object.entries(val).map(
                                            ([vkey, vitem]) => (
                                                <Text
                                                    key={vkey}
                                                    style={
                                                        styles.modelNestedValue
                                                    }
                                                >
                                                    {'  ' +
                                                        vkey +
                                                        ' : ' +
                                                        vitem}
                                                </Text>
                                            ),
                                        )}
                                    {/* arr */}
                                    {isObj &&
                                        isArr &&
                                        val.map((vItem, i) => {
                                            if (typeof vItem === 'object') {
                                                return (
                                                    <View key={i}>
                                                        {Object.entries(
                                                            vItem,
                                                        ).map(
                                                            ([vkey, vitem]) => (
                                                                <Text
                                                                    key={vkey}
                                                                    style={
                                                                        styles.modelNestedValue
                                                                    }
                                                                >
                                                                    {'  ' +
                                                                        vkey +
                                                                        ' : ' +
                                                                        vitem}
                                                                </Text>
                                                            ),
                                                        )}
                                                        <Text
                                                            style={
                                                                styles.modelSeparator
                                                            }
                                                        >
                                                            ----------------------------
                                                        </Text>
                                                    </View>
                                                )
                                            }
                                            return (
                                                <Text
                                                    key={i}
                                                    style={styles.modelValue}
                                                >
                                                    {vItem}
                                                </Text>
                                            )
                                        })}
                                </View>
                            </View>
                        )
                    })}
                </View>
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
    // 示例区域样式
    demoSection: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    demoItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    demoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginRight: 8,
    },
    numberInput: {
        width: 80,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    enumContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    selectedValue: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    // 物模型展示区域样式
    modelSection: {
        marginBottom: 20,
    },
    modelItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    modelName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    modelType: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    modelValueLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    modelValue: {
        fontSize: 14,
        marginLeft: 8,
        marginBottom: 2,
    },
    modelNestedValue: {
        fontSize: 12,
        marginLeft: 16,
        marginBottom: 2,
    },
    modelSeparator: {
        fontSize: 12,
        color: '#999',
        marginVertical: 4,
    },
})
