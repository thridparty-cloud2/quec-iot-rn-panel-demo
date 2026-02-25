import {StyleSheet} from 'react-native'

export const alarmFaultPageStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  flatListContainerStyle: {
    flex: 1,
  },

  /**
   * 告警记录的整体布局
   */
  recordContainerStyle: {
    flexDirection: 'row',
    paddingStart: 28,
    paddingEnd: 28,
  },
  /**
   * 时间轴的整体布局
   */
  timelineContainerStyle: {
    alignItems: 'center',
  },

  /**
   * 时间轴顶部显示的样式
   */
  timelineTopShowStyle: {
    width: 1,
    height: 24,
  },
  /**
   * 时间轴顶部显示的样式
   */
  timelineTopHideStyle: {
    width: 1,
    backgroundColor: '#00000000',
    height: 24,
  },
  /**
   * 时间轴节点样式
   */
  timelineDotStyle: {
    marginTop: 5,
    marginBottom: 5,
    height: 10,
    width: 10,
    borderRadius: 5,
  },

  /**
   * 时间轴底部显示的样式
   */
  timelineBottomShowStyle: {
    width: 1,
    flex: 1,
  },
  /**
   * 时间轴底部显示的样式
   */
  timelineBottomHideStyle: {
    width: 1,
    backgroundColor: '#00000000',
    flex: 1,
  },

  /**
   * 记录内容整体样式
   */
  recordContentContainerStyle: {
    marginStart: 15,
    marginTop: 24,
    marginBottom: 6,
  },
  /**
   * 记录文本的样式
   */
  recordTextStyle: {
    fontSize: 16,
  },
  /**
   * 时间文本样式
   */
  timeTextStyle: {
    marginTop: 8,
    fontSize: 12,
  },
})
