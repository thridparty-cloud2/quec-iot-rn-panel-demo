import {httpSaasInstance} from '@quec/panel-sdk/request'

export const reqExample = (params: any) =>
  httpSaasInstance.get({
    path: 'v2/your/api/path',
    params,
  })
