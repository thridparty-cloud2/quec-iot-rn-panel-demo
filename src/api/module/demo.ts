import {httpPaasInstance, httpSaasInstance} from '../http-instance'

/**
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqSaaSData = () =>
    httpSaasInstance.get<HttpSaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    })

/**
 * @returns
 *  {rows: [{demo: 'xxxxxx'}], total: 1}
 */
export const reqSaaSList = () =>
    httpSaasInstance.get<HttpSaaSListResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    })

/**
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqPaaSData = () =>
    httpPaasInstance.get<HttpPaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    })
