import {useCallback} from 'react'
import QuecRNRouterModule from '@quec/rn-router-module/src/module'
import {useNavigation} from './use-navigation.hook'

type GoBackFn = () => boolean
type Callback = () => void

export const useGoBack = (cb?: Callback) => {
    const navigation = useNavigation()
    const func = useCallback<GoBackFn>(() => {
        if (cb) {
            cb()
            return true
        }
        if (navigation?.canGoBack()) {
            navigation?.pop()
            return true
        } else {
            goBackHome()
            return true
        }
    }, [navigation, cb])

    return func
}

/**
 * 回到首页
 */
export const goBackHome = () => {
    QuecRNRouterModule.popWithNumber(1)
}
