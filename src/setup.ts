import {GlobalManager, DependenciesManager} from '@quec/panel-sdk/managers'
import Toast from 'react-native-toast-next'
import {QLog} from '@quec/panel-sdk/utils'
import i18n from './i18n/i18n'
import packageJson from '../package.json'

const BASE_TAG = `${packageJson.name || 'quec-panel'}`

function setupLog() {
  QLog.init({
    baseTag: BASE_TAG,
  })
}

function setupDependencies() {
  DependenciesManager.init({
    pkgJson: packageJson as any,
  })
}

function setupGlobalFunction() {
  const toastFn = function (message: any) {
    let newMessage = i18n('network_error')
    if (typeof message === 'object') {
      if (message.message !== null && message.message !== undefined && message.message.length > 0) {
        newMessage = message.message
      } else if (message.msg !== null && message.msg !== undefined && message.msg.length > 0) {
        newMessage = message.msg
      } else if (message.message !== null && message.message !== undefined) {
        newMessage = JSON.stringify(message)
      }
    } else if (typeof message === 'string' || typeof message === 'number') {
      newMessage = message
    }
    Toast.show({type: 'info', text: newMessage})
  }
  // 10s后，loading自动消除， 一直存在的loading timeout设置为-1
  const loadingFn = function (timeoutCallback?: Function) {
    Toast.hide()
    QLog.info('LOADING', 'global.loading===')
    global.loadingRef?.show(i18n('loading'), 10000, timeoutCallback)
  }
  const loadingTimeFn = function (message: any, time: any, timeoutCallback?: Function) {
    QLog.info('LOADING', 'global.loadingTime===')
    global.loadingRef?.show(message || i18n('loading'), time, timeoutCallback)
  }
  const loadingDismissFn = function (callback?: Function) {
    QLog.info('LOADING', 'global.loadingDismiss===')
    global.loadingRef?.dismiss(callback)
  }

  global.toast = toastFn
  global.loading = loadingFn
  global.loadingTime = loadingTimeFn
  global.loadingDismiss = loadingDismissFn

  GlobalManager.initMethods({
    toast: toastFn,
    loading: loadingFn,
    loadingTime: loadingTimeFn,
    loadingDismiss: loadingDismissFn,
  })
}

export function setup() {
  setupLog()
  setupDependencies()
  setupGlobalFunction()
}
