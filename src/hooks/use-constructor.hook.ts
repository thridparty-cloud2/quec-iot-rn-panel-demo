import {useRef} from 'react'

type VoidFunction = () => void

const noop: VoidFunction = () => {}

/**
 * 模拟 Class Component 的 constructor
 * @param callback 需要第一次执行且执行一次的函数
 */
export const useConstructor = (callback: VoidFunction = noop) => {
    const hasBeenCalled = useRef<boolean>(false)
    if (!hasBeenCalled.current) {
        callback()
        hasBeenCalled.current = true
    }
}
