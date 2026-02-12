/// 设置页配置文件
import {DeviceModel, FamilyModel} from '@quec/panel-device-kit'
import {
    LanguageConfig,
    QCellType,
    QSetCodeConfig,
    SettingConfigModel,
    SettingPageConfig,
    SettingSectionModel,
} from '@quec/panel-universalsetting-component'
import i18n from '../../i18n/i18n'

export const initSettingConfig = (
    device: DeviceModel,
    family: FamilyModel,
    productUrl: string,
): SettingConfigModel => {
    initSettingLanguage()
    initSettingColor()

    console.log('=====' + family.familyModeEnabled)
    console.log('=====' + family.familyRole)

    let settingData: SettingConfigModel = {
        pk: device.productKey,
        dk: device.deviceKey,
        isShared: device.isShared,
        familyModeEnabled: family.familyModeEnabled,
        familyRole: family.familyRole,
        info: [],
    }

    let baseInfoSection = getBaseInfoSection(0, device)
    let wifiSection = getDeviceWifiSection(1)
    let deviceCapacitySection = getDeviceCapacity(2, productUrl)

    settingData.info.push(baseInfoSection)
    settingData.info.push(wifiSection)
    settingData.info.push(deviceCapacitySection)

    return settingData
}

const initSettingLanguage = () => {
    LanguageConfig.getInstance().setLanguages({
        setting: i18n('quec_setting_page_title'),
        confirm: i18n('confirm'),
        cancel: i18n('cancel'),
        succeed_delete: i18n('succeed_delete'),
        succeed_modify: i18n('succeed_modify'),
        pls_enter_device_name: i18n('quec_setting_pls_enter_device_name'),
        device_name_input_length_tip: i18n(
            'quec_setting_device_name_input_length_tip',
        ),
        quec_setting_remove_device: i18n('quec_setting_remove_device'),
        device_rename: i18n('device_rename'),
        device_name: i18n('device_name'),
        quec_setting_more: i18n('quec_setting_more'),
        quec_setting_remove: i18n('quec_setting_remove'),
        quec_setting_remove_share: i18n('quec_setting_remove_share'),
        quec_setting_remove_sure: i18n('quec_setting_remove_sure'),
        quec_setting_share_remove_sure: i18n('quec_setting_remove_sure'),
        quec_setting_remove_content: i18n('quec_setting_remove_content'),
        quec_setting_share_remove_content: i18n(
            'quec_setting_share_remove_content',
        ),
        quec_setting_offline_remind1: i18n('quec_setting_offline_remind1'),
        quec_setting_offline_remind2: i18n('quec_setting_offline_remind2'),
        quec_setting_offline_remind3: i18n('quec_setting_offline_remind3'),
        quec_i_know: i18n('quec_i_know'),
        quec_setting_open_file_error: i18n('quec_setting_open_file_error'),
        quec_traceable_device_id: i18n('quec_traceable_device_id'),
        quec_setting_product_manual: i18n('quec_setting_product_manual'),
    })
}

const initSettingColor = () => {
    /* ColorConfig.getInstance().setColors({
        navigationBackground: colors.bgColor,
        navigationTitleColor: colors.textColor,
        pageBgColor: colors.bgColor,

        sectionHeaderBg: colors.bgColor,
        sectionHeaderTitleColor: colors.subTextColor,
        sectionItemBg: colors.bgSubColor,
        sectionItemNameColor: colors.textColor,
        sectionItemValueColor: colors.subTextColor,

        primaryColor: colors.primaryColor,

        dgBackground: colors.dgBackground,
        dgInputBackground: colors.dgInputBackground,
        dgInputTextColor: colors.dgInputTextColor,
        dgInputHintColor: colors.dgInputHintColor,
        dgTitleColor: colors.dgTitleColor,
        dgContentColor: colors.dgContentColor,
        dgBtnColor: colors.dgBtnColor,
        dgDividerColor: colors.dgDividerColor,

        removeDeviceBtnColor: colors.bgSubColor,
        removeDeviceBtnTextColor: colors.errorColor,

        dividerColor: colors.dividerColor,
    }); */
}

/**
 * 设备基础信息
 * @param id
 * @returns
 */
const getBaseInfoSection = (
    id: number,
    device: DeviceModel,
): SettingSectionModel => {
    let section: SettingSectionModel = {
        id: id,
        name: i18n('quec_setting_section_basic_info'),
        code: QSetCodeConfig.Section_Code_Basic_Information,
        type: 'section',
        data: [],
    }
    section.data.push({
        id: 0,
        name: i18n('quec_setting_item_device_icon'),
        code: QSetCodeConfig.Code_DeviceIcon,
        type: QCellType.CellType_Text_Icon,
        iconStyle: {
            height: 56,
            width: 56,
            borderRadius: 12,
            marginVertical: 16,
        },
    })
    section.data.push({
        id: 1,
        name: i18n('quec_setting_item_device_name'),
        code: QSetCodeConfig.Code_DeviceName,
        type: QCellType.CellType_Text_Arrow,
        value: device.deviceName,
    })
    section.data.push({
        id: 2,
        name: i18n('quec_setting_item_more_info'),
        code: QSetCodeConfig.Code_MoreInfo,
        type: QCellType.CellType_Text_Arrow,
        router: SettingPageConfig.RN_PAGE_SETTING_MORE_INFO,
    })
    return section
}

/**
 * 设备基础信息
 * @param id
 * @returns
 */
const getDeviceWifiSection = (id: number): SettingSectionModel => {
    let section: SettingSectionModel = {
        id: id,
        name: i18n('quec_setting_section_device_wifi_info'),
        code: QSetCodeConfig.Section_Code_Device_Wifi_Info,
        type: 'section',
        data: [],
    }
    section.data.push({
        id: 0,
        name: i18n('quec_setting_item_device_wifi_info'),
        code: QSetCodeConfig.Code_DeviceWiFiInfo,
        type: QCellType.CellType_Text_Arrow,
    })
    section.data.push({
        id: 1,
        name: i18n('quec_setting_item_device_signal_strength'),
        code: QSetCodeConfig.Code_DeviceSignalStrength,
        type: QCellType.CellType_Text_Arrow,
    })
    return section
}

/**
 * 设备功能
 * @param id
 * @returns
 */
const getDeviceCapacity = (
    id: number,
    productUrl: string,
): SettingSectionModel => {
    let section: SettingSectionModel = {
        id: id,
        name: i18n('quec_setting_section_device_capacity'),
        code: QSetCodeConfig.Section_Code_Device_Capacity,
        type: 'section',
        data: [],
    }
    section.data.push({
        id: 0,
        name: i18n('quec_setting_item_offline_reminder'),
        code: QSetCodeConfig.Code_OfflineReminder,
        type: QCellType.CellType_Text_Switch,
    })
    section.data.push({
        id: 1,
        name: i18n('quec_setting_item_device_share'),
        code: QSetCodeConfig.Code_DeviceShare,
        type: QCellType.CellType_Text_Arrow,
        router: SettingPageConfig.APP_PAGE_SHARE,
    })
    section.data.push({
        id: 2,
        name: i18n('quec_setting_item_device_upgrade'),
        code: QSetCodeConfig.Code_DeviceUpgrade,
        type: QCellType.CellType_Text_Number,
        router: SettingPageConfig.APP_PAGE_DEVICE_UPGRADE,
    })

    if (
        productUrl !== null &&
        productUrl !== undefined &&
        productUrl.length > 0
    ) {
        section.data.push({
            id: 3,
            name: i18n('quec_setting_item_device_product_description'),
            code: QSetCodeConfig.Code_ProductDescription,
            type: QCellType.CellType_Text_Arrow,
            router: SettingPageConfig.RN_PAGE_NAME_PRODUCT_DESCRIPTION_PAGE,
            params: {
                url: productUrl,
            },
        })
    }
    return section
}
