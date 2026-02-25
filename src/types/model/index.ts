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

export const modelDefinition = {
  /** 开关 RW BOOL */
  switch: new BooleanTSLModel(),
  /** 温度设置 RW INT */
  tempSet: new NumberTSLModel(),
  /** 当前温度 R INT */
  tempCurrent: new NumberTSLModel(),
  /** 室内湿度 R INT */
  humidity: new NumberTSLModel(),
  /** 模式 RW ENUM */
  mode: new EnumTSLModel(),
  /** 风速 RW ENUM */
  windSpeed: new EnumTSLModel(),
  /** 舒适 RW BOOL */
  comfort: new BooleanTSLModel(),
  /** 强劲 RW BOOL */
  strong: new BooleanTSLModel(),
  /** 静音 RW BOOL */
  mute: new BooleanTSLModel(),
  /** 空清 RW BOOL */
  anion: new BooleanTSLModel(),
  /** 健康 RW BOOL */
  health: new BooleanTSLModel(),
  /** 负离子 RW BOOL */
  negativeIon: new BooleanTSLModel(),
  /** 新风 RW BOOL */
  freshAir: new BooleanTSLModel(),
  /** 自清洁 RW BOOL */
  cleaning: new BooleanTSLModel(),
  /** 电加热 RW BOOL */
  heat: new BooleanTSLModel(),
  /** 睡眠 RW BOOL */
  sleep: new BooleanTSLModel(),
  /** 屏显 RW BOOL */
  display: new BooleanTSLModel(),
  /** 灯光 RW BOOL */
  light: new BooleanTSLModel(),
  /** ECO模式 RW BOOL */
  eco: new BooleanTSLModel(),
  /** 童锁 RW BOOL */
  childLockMore: new BooleanTSLModel(),
  /** 上下摆风 RW BOOL */
  verticalSwing: new BooleanTSLModel(),
  /** 左右摆风 RW BOOL */
  horizontalSwing: new BooleanTSLModel(),
  /** 温度设置_F RW INT */
  tempSetF: new NumberTSLModel(),
  /** 当前温度_F R INT */
  tempCurrentF: new NumberTSLModel(),
  /** 节能 RW ENUM */
  saveEnergy: new EnumTSLModel(),
  /** 倒计时 RW STRUCT */
  countdown: new StructTSLModel(),
  /** 故障告警 R STRUCT */
  fault: new StructTSLModel(),
  /** 温标 RW ENUM */
  tempUnitSwitch: new EnumTSLModel(),
}
