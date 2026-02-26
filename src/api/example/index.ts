import {httpSaasInstance} from '@quec/panel-sdk/request'
import {Params} from './types'

export const reqSaasExample = (params: Params) =>
  httpSaasInstance.get<SaaSResponse<any>>({
    path: 'v2/aibiz/enduserapi/device/bot/variables/obtain',
    params,
  })
