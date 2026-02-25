/**
 * 设备连接状态---不在连接中
 */
export const NOT_CONNECTING = 0
/**
 * 设备类型---绑定
 */
export const DEVICE_TYPE_BIND = 1
/**
 * 设备类型---分享
 */
export const DEVICE_TYPE_SHARE = 2
/**
 * 设备类型---直连设备
 */
export const DEVICE_ACCESS_TYPE_DIRECTLY = 0
/**
 * 设备类型---网关设备
 */
export const DEVICE_ACCESS_TYPE_GATEWAY = 1
/**
 * 设备类型---网关子设备
 */
export const DEVICE_ACCESS_TYPE_GATEWAY_CHILD = 2
/**
 * 设备名称--长度
 */
export const DEVICE_NAME_MAX_LENGTH = 14

/** 设备在线状态枚举 */
export enum onlineStatus {
  /**
   * all offline
   */
  ALL_OFFLINE = 0,
  /**
   * 1: websocket online,
   */
  WS_ONLINE = 1,
  /**
   * 2 : wifi online,
   */
  WIFI_ONLINE = 1 << 1,
  /**
   * 3: wifi + websocket online,
   */
  WS_WIFI_ONLINE = 3,
  /**
   * 4: ble online,
   */
  BLE_ONLINE = 1 << 2,
  /**
   * 5: websocket + ble online,
   */
  WS_BLE_ONLINE = 5,
  /**
   * 6: ble + wifi online ,
   */
  WIFI_BLE_ONLINE = 6,
  /**
   * 7: wifi + ble + ws online
   */
  ALL_ONLINE = 7,
}

/**
 * loading超时时间
 */
export const LOADING_SEND_TIMEOUT = 60 * 1000
