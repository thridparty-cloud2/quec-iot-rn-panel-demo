# 网络请求 ☁

`Saas` 以及 `PaaS` 的请求实例已封装在 `src/api/http-instance.ts` 中；

各请求基础参数存放在 `src/api/constants.ts`；

各请求模块存放在 `src/api/module`；

 使用：

```ts
// src/api/module/demo.ts

/**
 * 请求 SaaS 接口
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqSaaSData = () =>
    httpSaasInstance.get<HttpSaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });

/**
 * 请求 SaaS 列表接口
 * @returns
 *  {list: [{demo: 'xxxxxx'}], total: 1}
 */
export const reqSaaSList = () =>
    httpSaasInstance.get<HttpSaaSListResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });

/**
 * 请求 PaaS 接口
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqPaaSData = () =>
    httpPaasInstance.get<HttpPaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });
```



