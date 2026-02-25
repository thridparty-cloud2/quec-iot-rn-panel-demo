/*
 *
 * @Author: 李征宇
 * @Date: 2023-12-07 16:12:38
 * @DESCRIPTION
 *
 */
import React, {Component, ReactNode} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import {DataUtils, QLog} from '@quec/panel-sdk/utils'
import i18n from '../../i18n/i18n'

interface LoadingProps extends ViewProps {
  title?: string
  loadingStyle?: ViewStyle
  progressColor?: string
  textStyle?: TextStyle
}

export default class Loading extends Component<LoadingProps, any> {
  timer: NodeJS.Timeout | undefined
  dismissTimer: NodeJS.Timeout | undefined

  isShow = false

  constructor(props: LoadingProps) {
    super(props)
    this.state = {
      isShow: this.isShow,
      title: DataUtils.isNull(props.title) ? i18n('loading') : props.title,
    }
    //全局变量申明，便于使用
    global.loadingRef = this
  }

  show(title: string = i18n('loading'), timeout: number = 10000, timeOutCallBack?: Function) {
    QLog.info(
      'Loading',
      '====show====timeout' +
        timeout +
        '==timeOutCallBack:' +
        timeOutCallBack +
        '==:' +
        this.isShow,
    )
    if (!this.isShow) {
      this.isShow = true
      if (this.dismissTimer) {
        clearTimeout(this.dismissTimer)
        this.dismissTimer = undefined
      }
      this.setState(
        {
          isShow: this.isShow,
          title: title,
        },
        () => {
          if (timeout > 0) {
            this._startTimer(timeout, timeOutCallBack)
          } else {
            this._endTimer()
          }
        },
      )
    }
  }

  _startTimer(timeout: number, timeOutCallBack?: Function) {
    this._endTimer()
    QLog.info('Loading', '====_startTimer====' + timeout)
    this.timer = setTimeout(() => {
      if (typeof timeOutCallBack === 'function') {
        timeOutCallBack()
      } else {
        this.dismiss()
      }
    }, timeout)
  }

  _endTimer() {
    if (this.timer) {
      QLog.info('Loading', '====_endTimer====')
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }

  dismiss(callback?: Function) {
    //从日志上看，loading过程中，dismiss的刷新过程中，又触发了show
    //多次刷新，可能导致状态出现问题，所以如果已经是isShow是不显示的状态，则不再关闭
    if (this.isShow) {
      QLog.info('Loading', '====dismiss====start')
      this.isShow = false
      if (this.dismissTimer) {
        clearTimeout(this.dismissTimer)
        this.dismissTimer = undefined
      }
      this.dismissTimer = setTimeout(() => {
        this.setState(
          {
            isShow: this.isShow,
          },
          () => {
            QLog.info('Loading', '====dismiss====after setState isShow false')
            this._endTimer()
            if (callback instanceof Function) {
              QLog.info('Loading', '====dismiss====callback')
              callback()
            }
          },
        )
      }, 200)
    } else {
      if (callback instanceof Function) {
        QLog.info('Loading', '====dismiss====callback')
        callback()
      }
    }
  }

  componentWillUnmount(): void {
    this._endTimer()
  }

  render(): ReactNode {
    if (this.state.isShow) {
      return (
        <View style={styles.container}>
          <View style={[styles.load_box, this.props.loadingStyle]}>
            <ActivityIndicator
              animating={true}
              color={this.props.progressColor || '#FFF'}
              size={'large'}
              style={styles.load_progress}
            />
            <Text style={[styles.load_text, this.props.textStyle]}>{this.state.title}</Text>
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  load_box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  load_progress: {
    width: 50,
    height: 50,
  },
  //默认字体颜色
  load_text: {
    color: '#FFFFFF',
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
