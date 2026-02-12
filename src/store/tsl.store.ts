import QuecRNDeviceModule from '@quec/rn-device-module/src/module'
import _ from 'lodash'
import {create} from 'zustand'

import * as TSLConfig from '../config/tsl.config'
import {DPS, InitialTSL} from '../types'
import {DeviceModel} from '../types/device'
import {DPSMode} from '../types/tsl/dps-model'
import EnumTSLModel from '../types/tsl/enum/EnumTSLModel'
import NumberTSLModel from '../types/tsl/number/NumberTSLModel'
import StructTSLModel from '../types/tsl/struct/StructTSLModel'
import TSLModel from '../types/tsl/tsl-model'
import {DataUtils} from '../util'
import QLog from '../util/q-log.util'
import TSLUtils, {TSLInitUtils} from '../util/tsl.util'

const TSL_ERROR_CODE = '5193'

type States = {
    isEmptyTsl: boolean
    isRequestTslFailed: boolean
    deviceDPSModel: DPSMode
}

type Actions = {
    getTslModal: (device: DeviceModel) => void
    initTslModal: (data: Array<InitialTSL>) => void
    reportTslModal: (dps: Array<DPS>) => void
}

const initialState: States = {
    isEmptyTsl: false,
    isRequestTslFailed: false,
    deviceDPSModel: {},
}

export const useTslStore = create<States & Actions>()((set: any, get: any) => ({
    ...initialState,
    /**
     * 获取物模型
     */
    getTslModal(device: any) {
        let params = {
            productKey: device.productKey,
            deviceKey: device.deviceKey,
            gatewayPk: undefined,
            gatewayDk: undefined,
        }
        global.loading()
        QuecRNDeviceModule.getTslAndAttrs(params)
            .then(
                (res: {data: Array<InitialTSL>}) => {
                    if (res && res.data?.length > 0) {
                        global.loadingDismiss()
                        get().initTslModal(res.data)
                    } else {
                        set({
                            isEmptyTsl: true,
                        })
                    }
                },
                (reject: any) => {
                    QLog.info('getTslAndAttrs_error', JSON.stringify(reject))
                },
            )
            .catch((err: {code: string | any[]; message: any}) => {
                QLog.info('getTslAndAttrs_error', JSON.stringify(err))
                global.loadingDismiss()
                if (!err.code) {
                    global.toast(err.message)
                }
                if (err.code?.toString() === TSL_ERROR_CODE) {
                    set({
                        isRequestTslFailed: true,
                    })
                } else {
                    set({
                        isEmptyTsl: true,
                    })
                }
            })
    },

    /**
     * 初始化物模型
     */
    initTslModal(data: any) {
        let dpsModel: DPSMode = {}

        data.map((item: any) => {
            switch (item.code) {
                default:
                    break
            }
        })

        set({deviceDPSModel: dpsModel})
        getRealTimeTsl(dpsModel)
    },

    /**
     * 处理上报的物模型
     * @param data
     */
    reportTslModal(dps: any) {
        if (dps === undefined || dps === null) {
            return
        }
        QLog.info('reportTslModal', JSON.stringify(dps))
        let tempDPSModel: DPSMode = _.cloneDeep(get().deviceDPSModel)

        dps.map((item: any) => {
            switch (item.code) {
                default:
                    break
            }
        })

        set({deviceDPSModel: tempDPSModel})
    },
}))

/**
 * 转换 structItem, 平铺 spec 数据
 * @param structIem
 */
export const _convertStructItem = (
    structIem: StructTSLModel,
): StructTSLModel => {
    const nextStructItem = structIem
    nextStructItem.specs.map(s => {
        let nextS
        switch (s.dataType) {
            case TSLConfig.TSL_ATTR_DATA_TYPE_INT:
            case TSLConfig.TSL_ATTR_DATA_TYPE_DOUBLE:
            case TSLConfig.TSL_ATTR_DATA_TYPE_FLOAT:
                nextS = TSLInitUtils.initNumberModel(
                    s as unknown as NumberTSLModel,
                )
                break
            case TSLConfig.TSL_ATTR_DATA_TYPE_ENUM:
                nextS = TSLInitUtils.initEnumModel(s as EnumTSLModel)
                break
            default:
                nextS = s
                break
        }
        return nextS
    })
    return nextStructItem
}

export const useDpsModel = () => useTslStore(state => state.deviceDPSModel)

/**
 * 获取实时物模型
 * @param data
 */
const getRealTimeTsl = (dps: DPSMode) => {
    TSLUtils.multiReadData(_getAllDpsModels(dps))
}

/**
 * 平铺 model 中所有的物模型到一个数组中
 * @param familyPowerModel
 */
const _getAllDpsModels = (dspModel: DPSMode): Array<TSLModel> => {
    const flatModelList: Array<TSLModel> = []
    for (const key in dspModel) {
        if (Object.prototype.hasOwnProperty.call(dspModel, key)) {
            const model = dspModel[key as keyof DPSMode]
            if (
                DataUtils.typeOfValue(model) === 'object' &&
                !DataUtils.isNull(model)
            ) {
                flatModelList.push(model as TSLModel)
            } else if (DataUtils.typeOfValue(model) === 'array') {
                flatModelList.push(...(model as unknown as Array<TSLModel>))
            }
        }
    }
    return flatModelList
}
