import {useCallback, useEffect, useRef} from 'react'
import QuecRNRouterModule from '@quec/rn-router-module/src/module'
import {useNavigation} from './use-navigation.hook'

type GoBackFn = () => boolean
type Callback = () => void

export const useGoBack = (cb?: Callback) => {
  const navigation = useNavigation()
  const cbRef = useRef<Callback | undefined>(cb)

  useEffect(() => {
    cbRef.current = cb
  }, [cb])

  const func = useCallback<GoBackFn>(() => {
    if (cbRef.current && typeof cbRef.current === 'function') {
      cbRef.current()
      return true
    }
    if (navigation?.canGoBack()) {
      navigation.pop()
      return true
    } else {
      goBackHome()
      return true
    }
  }, [navigation])

  return func
}

/**
 * 回到首页
 */
export const goBackHome = () => {
  QuecRNRouterModule.popWithNumber(1)
}
