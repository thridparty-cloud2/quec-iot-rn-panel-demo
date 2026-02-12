/*
 *
 * @Author: 李征宇
 * @Date: 2024-09-09 16:38:48
 * @DESCRIPTION
 * 编辑text物模型界面
 */
import QuecRNNetworkModule from '@quec/rn-network-module/src/module';
import QuecRNUserModule from '@quec/rn-user-module/src/module';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {EmptyView} from '../../components/empty-view';
import {NetError} from '../../components/net-error';
import i18n from '../../i18n/i18n';

import {useDevice} from '@quec/panel-device-kit'
import {TextTSLModel} from '@quec/panel-model-kit'
import {useThemeColors, useThemeImg} from '../../hooks/theme'
import {PageProps} from '../../types/page-props'
import QLog from '../../util/q-log.util'
import TimeUtils from '../../util/time.util'
import {alarmFaultPageStyle} from './style'

interface AlarmFaultPageProps extends PageProps<PropsParams> {}

interface PropsParams {
    attr: TextTSLModel
    callback: Function
}

interface DataParams {
    title: string
    addTime: number
    isDrawTop: boolean
    isDrawBottom: boolean
}

/**
 * 默认页下标
 * @type {number}
 */
const DEFAULT_PAGE_NUM = 1
/**
 * 默认页大小
 * @type {number}
 */
const DEFAULT_PAGE_SIZE = 15

/**
 * 事件类型---告警
 * @type {number}
 */
const EVENT_TYPE_ALARM = 2
/**
 * 事件类型---故障
 * @type {number}
 */
const EVENT_TYPE_FAULT = 3

const AlarmFaultPage: FC<AlarmFaultPageProps> = (
    props: AlarmFaultPageProps,
    context?: any,
) => {
    const colors = useThemeColors()
    const images = useThemeImg()

    const [isNetworkError, setNetworkError] = useState(false)
    const [isRefresh, setRefresh] = useState(false)
    const [canLoadMore, setCanLoadMore] = useState(true)
    const [showEmptyView, setShowEmptyView] = useState(false)
    const [page, setPage] = useState(DEFAULT_PAGE_NUM)
    const [dataList, setDataList] = useState<DataParams[]>([])
    const [total, setTotal] = useState<number>(0)

    const device = useDevice()

    /**
     * 获取设备列表
     */
    const getAlarmList = (
        pageNum: number,
        refresh: boolean,
        isLoadMore: boolean,
    ) => {
        checkNetwork(() => {
            if (!refresh) {
                global.loading()
            }
            let param = {
                pageNumber: pageNum,
                pageSize: DEFAULT_PAGE_SIZE,
                msgType: EVENT_TYPE_ALARM,
                productKey: device!!.productKey,
                deviceKey: device!!.deviceKey,
            }
            QuecRNUserModule.getUserMessageListWithParams(param)
                .then((res: any) => {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].id =
                            res.data.list[i].id ?? res.data.list[i].msgId
                    }
                    if (isLoadMore) {
                        handlerLoadMore(res)
                    } else {
                        handlerData(res, refresh)
                    }
                })
                .catch((error: any) => {
                    QLog.info(
                        'AlarmFaultPage',
                        'getAlarmList==' + JSON.stringify(error),
                    )
                    if (!refresh) {
                        global.loadingDismiss()
                        global.toast(error.message)
                    } else {
                        setRefresh(false)
                    }
                })
        })
    }

    useEffect(() => {
        getAlarmList(DEFAULT_PAGE_NUM, false, false)
    }, [])

    const checkNetwork = (callback: Function) => {
        QuecRNNetworkModule.fetchPhoneInternetReachable()
            .then((res: any) => {
                if (
                    res.internetReachable === 'true' ||
                    res.internetReachable === true
                ) {
                    setNetworkError(false)
                    callback()
                } else {
                    setNetworkError(true)
                    setRefresh(false)
                }
            })
            .catch((error: any) => {
                QLog.info(
                    'AlarmFaultPage',
                    'getAlarmList==' + JSON.stringify(error),
                )
                setNetworkError(true)
                setRefresh(false)
            })
    }

    /**
     * 处理数据
     * @param res
     */
    const handlerData = (res: any, refresh: boolean) => {
        if (refresh) {
            setRefresh(false)
        } else {
            global.loadingDismiss()
        }
        if (res.data && res.data.list.length > 0) {
            let newDataList = markDataList(res.data.list)
            setDataList([...newDataList])
            setShowEmptyView(false)
            setTotal(res.data.total)

            if (res.data.list.length < res.data.total) {
                setCanLoadMore(true)
            } else {
                setCanLoadMore(false)
            }
        } else {
            setDataList([])
            setTotal(0)
            setShowEmptyView(true)
            setCanLoadMore(false)
        }
    }

    /**
     * 处理加载更多
     * @param res
     */
    const handlerLoadMore = (res: any) => {
        global.loadingDismiss()
        if (res.data && res.data.list.length > 0) {
            let newDataList = [...dataList, ...res.data.list]
            newDataList = markDataList(newDataList)

            setDataList([...newDataList])
            if (newDataList.length >= total) {
                setCanLoadMore(false)
            }
            setPage(page + 1)
        } else {
            setCanLoadMore(false)
            global.toast(i18n('no_more_data'))
        }
    }

    const markDataList = (list: DataParams[]): DataParams[] => {
        list.forEach((record: DataParams, index: number) => {
            record.isDrawTop = index !== 0
            record.isDrawBottom = index !== list.length - 1
        })
        return list
    }

    const onRefresh = () => {
        setRefresh(true)
        getAlarmList(DEFAULT_PAGE_NUM, true, false)
    }

    const onLoadMore = () => {
        setRefresh(false)
        getAlarmList(page + 1, false, true)
    }

    const renderItem = (item: ListRenderItemInfo<DataParams>) => {
        return (
            <View style={alarmFaultPageStyle.recordContainerStyle}>
                <View style={alarmFaultPageStyle.timelineContainerStyle}>
                    <View
                        style={
                            item.item.isDrawTop
                                ? [
                                      alarmFaultPageStyle.timelineTopShowStyle,
                                      {backgroundColor: colors.timelineColor},
                                  ]
                                : alarmFaultPageStyle.timelineTopHideStyle
                        }
                    />
                    <View
                        style={[
                            alarmFaultPageStyle.timelineDotStyle,
                            {backgroundColor: colors.timelineColor},
                        ]}
                    />
                    <View
                        style={
                            item.item.isDrawBottom
                                ? [
                                      alarmFaultPageStyle.timelineBottomShowStyle,
                                      {backgroundColor: colors.timelineColor},
                                  ]
                                : alarmFaultPageStyle.timelineBottomHideStyle
                        }
                    />
                </View>
                <View style={alarmFaultPageStyle.recordContentContainerStyle}>
                    <Text
                        style={[
                            alarmFaultPageStyle.recordTextStyle,
                            {
                                color: colors.textColor,
                            },
                        ]}
                    >
                        {item.item.title}
                    </Text>
                    <Text
                        style={[
                            alarmFaultPageStyle.timeTextStyle,
                            {color: colors.hintTextColor},
                        ]}
                    >
                        {TimeUtils.formatDate(
                            item.item.addTime,
                            i18n('time_format_long'),
                        )}
                    </Text>
                </View>
            </View>
        )
    }

    if (showEmptyView) {
        return (
            <>
                <EmptyView emptyIcon={images.msgEmpty} emptyText={i18n('noData')} />
            </>
        );
    } else if (isNetworkError) {
        return (
            <>
                <NetError
                    mainTip={i18n('net_error_page_main_tip')}
                    subTip={i18n('net_error_page_sub_tip')}
                    icon={images.netError}
                    onClick={() => {
                        getAlarmList(DEFAULT_PAGE_NUM, false, false);
                    }}
                />
            </>
        );
    } else {
        return (
            <>
                <View
                    style={[
                        alarmFaultPageStyle.containerStyle,
                        {backgroundColor: colors.bgColor},
                    ]}
                >
                    <FlatList
                        style={alarmFaultPageStyle.flatListContainerStyle}
                        data={dataList}
                        refreshing={isRefresh}
                        onRefresh={onRefresh}
                        renderItem={item => renderItem(item)}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => {
                            if (canLoadMore) {
                                onLoadMore();
                            }
                        }}
                    />
                </View>
            </>
        );
    }
}

export default AlarmFaultPage
