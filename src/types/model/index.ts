import {
  ArrayTSLModel,
  BooleanTSLModel,
  EnumTSLModel,
  EventTSLModel,
  NumberTSLModel,
  StructTSLModel,
  TextTSLModel,
} from '@quec/panel-model-kit'

export type ModelsType = {}

export interface DPSModel {
  /** 开关 RW BOOL */
  switch?: BooleanTSLModel
  /** 温度设置 RW INT */
  tempSet?: NumberTSLModel
  /** 当前温度 R INT */
  tempCurrent?: NumberTSLModel
  /** 室内湿度 R INT */
  humidity?: NumberTSLModel
  /** 模式 RW ENUM */
  mode?: EnumTSLModel
  /** 风速 RW ENUM */
  windSpeed?: EnumTSLModel
  /** 舒适 RW BOOL */
  comfort?: BooleanTSLModel
  /** 强劲 RW BOOL */
  strong?: BooleanTSLModel
  /** 静音 RW BOOL */
  mute?: BooleanTSLModel
  /** 空清 RW BOOL */
  anion?: BooleanTSLModel
  /** 健康 RW BOOL */
  health?: BooleanTSLModel
  /** 负离子 RW BOOL */
  negativeIon?: BooleanTSLModel
  /** 新风 RW BOOL */
  freshAir?: BooleanTSLModel
  /** 自清洁 RW BOOL */
  cleaning?: BooleanTSLModel
  /** 电加热 RW BOOL */
  heat?: BooleanTSLModel
  /** 睡眠 RW BOOL */
  sleep?: BooleanTSLModel
  /** 屏显 RW BOOL */
  display?: BooleanTSLModel
  /** 灯光 RW BOOL */
  light?: BooleanTSLModel
  /** ECO模式 RW BOOL */
  eco?: BooleanTSLModel
  /** 童锁 RW BOOL */
  childLockMore?: BooleanTSLModel
  /** 上下摆风 RW BOOL */
  verticalSwing?: BooleanTSLModel
  /** 左右摆风 RW BOOL */
  horizontalSwing?: BooleanTSLModel
  /** 温度设置_F RW INT */
  tempSetF?: NumberTSLModel
  /** 当前温度_F R INT */
  tempCurrentF?: NumberTSLModel
  /** 节能 RW ENUM */
  saveEnergy?: EnumTSLModel
  /** 倒计时 RW STRUCT */
  countdown?: StructTSLModel
  /** 故障告警 R STRUCT */
  fault?: StructTSLModel
  /** 温标 RW ENUM */
  tempUnitSwitch?: EnumTSLModel
}
