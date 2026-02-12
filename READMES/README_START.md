

## 🚀 模板工程

### 前言

本模板使用 `函数式组件` 以及 `Zustand` 进行编写，同时还引入了多个 `hooks` 。

### 🤝 规范

-   文件命名规范

    使用 **kebab-case（烤肉串命名法）** ：

    1. 页面命名 `demo-page/index.tsx`
    2. 组件命名 `demo-list/index.tsx`
    3. util/config/constant/hook 命名 `demo.util.ts` `demo.config.ts` `demo.constant.ts` `use-demo.hook.ts`

-   ....



***

### 目录结构

```shell
├── __tests__
├── app.json
├── App.tsx
├── babel.config.js
├── CHANGELOG.md
├── global.d.ts
├── index.android.js
├── index.ios.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── quec-dependencies.json
├── .configs // 全局配置文件夹
├── type // 全局类型定义
├── src
│   ├── assets
│   │   ├── image // 图片资源
│   │   └── lottie // 动画资源
│   ├── components
│   │   ├── CommonContainer // 通用容器组件
│   │   ├── CommonHeader // 通用头部组件
│   │   ├── EasyLoading  // 加载中组件
│   │   ├── EmptyView   // 空视图
│   │   └── NetError  // 网络错误视图
│   ├── config
│   │   ├── AttrConfig.ts // 物模型 code config
│   │   ├── ChannelConfig.ts // 通道 config
│   │   ├── DPConfig.ts // DP config
│   │   ├── DeviceConfig.ts // 设备相关的 config
│   │   ├── EventType.ts // 事件类型名称 config
│   │   ├── RoutePageConfig.ts // 路由 config
│   │   └── TSLConfig.ts // 物模型相关 config
│   ├── hooks
│   │   ├── back.ts // 返回相关 hooks
│   │   ├── constructor.ts // 模拟 constructor hooks
│   │   ├── dynamic.ts // 监听当前主题返回对应值
│   │   ├── dynamicStyle.ts // 监听当前主题返回对应样式
│   │   ├── event.ts // 事件注册 hooks
│   │   ├── index.ts
│   │   ├── settings.ts // 设置相关 hooks
│   │   ├── themeContext.tsx // 提供主题相关的 Provider
│   │   └── writeTsl.ts // 下发物模型 hooks
│   ├── i18n  // 多语言
│   ├── AppContainer.tsx
│   ├── App.tsx  // 项目入口
│   ├── page
│   │   ├── BaseMore //设置页面
│   │   ├── BaseRecord // 告警页面
│   │   ├── BaseRename // 设备重命名页面
│   │   └── Main
│   ├── router  // 路由
│   ├── store
│   │   ├── alarmStore.ts // 告警 store
│   │   ├── deviceStateStore.ts // 设备状态 store
│   │   ├── globalStore.ts // 全局 store, 存放 props 和 device 等
│   │   └── tslStore.ts // 物模型 store, 处理物模型的初始化和上报更新
│   │   └── ThemeStore.ts // 亮色和暗黑模式等主题颜色、图片配置
│   ├── style // 通用样式
│   ├── types // 项目 Typescript 类型
│   └── util // 通用工具
├── template.config.js
├── tsconfig.json
└── yarn.lock
```



***

### Layout 布局

新增 `QuecHeader`、`QuecContainer`  公共组件；

#### QuecHeader

`src/components/quec-header`

新增 `QuecHeader` 组件。用于页面头部的导航，支持左右图标更换以及自定义右侧视图的渲染，已经适配 `Android` 和 `IOS` 的安全区域。

使用：

```jsx
function Main() {
  return (
    <QuecHeader
      title={...}
      leftIcon={...}
      rightIcons={...}
      leftIconStyle={...}
      rightIconStyle={...}
      onLeftCallback={...}
    >
      {...}
    </QuecHeader>
  )
}
```

#### QuecContainer

`src/components/quec-container`

新增 `QuecContainer` 组件。用于通用的页面布局，包含 `QuecHeader ` 组件以及传入 `children`。头部导航栏可按需求自定义。

使用：

```jsx
function Main() {
    return (
        <CommonContainer>
            <Text>Main</Text>
        </CommonContainer>
    );
}
```



***

### Zustand-Store（状态管理）

新增 `global.stroe`、`device-state.store` 、`theme.store` 、`tsl.store`  公共组件；

#### global.store - 全局的 props 和 device

src/store/global.store.ts

项目初始化时，将 `App` 传递的 `props` 和 `device` 存储至 `globalStore` 中。并编写了相关的 `selector` :

```typescript
export const useGlobalProps = () => uesGlobalStore(state => state.props);
export const useGlobalDevice = (): DeviceModel =>
    uesGlobalStore(state => {
        let device = state.props.device;
        if (typeof device === 'string') {
            device = JSON.parse(device);
        }
        return device;
    });
export const useGlobalActions = () => uesGlobalStore(state => state.actions);
```

使用：

```typescript
function Main() {
    const device = useGlobalDevice();
    const globalProps = useGlobalProps();
}
```

#### device.state.store - 设备状态

src/store/device-state.store.ts

设备的 `在线状态` 在项目初始化时获取，并存储至 `deviceStateStore` 中, 并提供对应的 `selector`:

```typescript
/**
* 获取在线状态
*/
async getOnlineStatus() {
 // ...
},

/**
 * 更新在线状态
 * @param onlineState
 */
updateOnlineStatus(onlineState) {
 // ...
},

export const useDeviceOnline = () => useDeviceStateStore(state => state.online)
export const useDeviceOnlineState = () => useDeviceStateStore(state => state.onlineState)
```

#### theme.store - 主题定义、配置

src/store/theme.store.ts

在 `lightColors`、`darkColors` 配置亮色模式和暗色模式下对应的颜色；

在 `lightImages`、`darkImages` 配置亮色模式和暗色模式下对应的图片；

```typescript
let lightColors: ColorConfigData = {
    bgColor: '#FAFAFA',
};

let darkColors: ColorConfigData = {
    bgColor: '#000000',
};

let lightImages: ImageConfigData = {
    back: require('../assets/image/ic_back.png'),
};

let darkImages: ImageConfigData = {
    back: require('../assets/image/ic_back_dark.png'),
};


// 对应的 selector
export const useThemeColor = () => useThemeStore(state => state.colors);
export const useThemeImages = () => useThemeStore(state => state.images);
```

在页面中使用：

```jsx
const images = useThemeImages();
const colors = useThemeColor();
const Demo = () => {
    return (
        <View style={{backgroundColor: colors.bgColor}}>
            <Image source={images.back} />
        </View>
    );
};
```

#### tsl.store - 物模型状态

src/store/tsl.store.ts

物模型的 `请求、初始化、上报处理`的逻辑编写在 `src/store/tsl-store.ts` 中。

详见下方 **物模型**



***

### 物模型

#### code 定义

相关物模型 `code` 定义编写在 `src/config/attr-config.ts` 中：

```typescript
// src/config/attr-config.ts

/**
 * 负载无用功率 FLOAT R
 */
export const TSL_ATTR_DEMO = 'demo_code';
```

#### 数据点定义

相关物模型的 `数据` 定义编写在 `src/types/tsl/dps-model.ts` 的 `interface DPSModel `中：

```typescript
// src/types/tsl/dps-model.ts

export interface DPSMode {
    /**
     * 负载无功功率
     * @type {NumberTSLModel}
     */
    demoPowerAttr?: NumberTSLModel;
    enumPowerAttr?: EnumTslModel;
    booleanPowerAttr?: BooleanTslModel;
}
```

#### 物模型请求

获取物模型的方法在 `tsl.store` 中定义：

```typescript
/**
* 请求物模型
*/
getTslModal(device) {
  // ....
},
```

在 `src/index.tsx` 中进行调用，即在项目初始化时，调用获取物模型：

```typescript
const {getTslModal} = useTslStore();

useEffect(() => {
    // 获取物模型
    getTslModal(props.device);
}, []);
```

#### 初始化

初始化物模型的方法在 `tsl.store`  中定义：

```typescript
/**
* 初始化物模型
* @param data
*/
initTslModal(data) {
  let dpsModel: DPSMode = {}

  // 根据 code 进行不同物模型类型的初始化
  data.map((item: any) => {
    switch (item.code) {
      case TSL_ATTR_DEMO:
        dpsModel.demoPowerAttr = TSLInitUtils.initNumberModel(item);
        break;
      // ... 
      default:
        break
    }
  })

  set({ deviceDPSModel: dpsModel })
  // 初始化完成后，主动查询物模型
  getRealTimeTsl(dpsModel)
},
```

和以往一样，物模型初始化时通过 `AttrConfig` 定义的 code 已进行不同物模型类型的初始化，初始化完成后，主动查询物模型。

#### 上报处理

物模型上报处理的方法在 `tsl.store` 中定义:

```typescript
/**
* 处理上报的物模型
* @param data
*/
reportTslModal(dps) {
  if (dps === undefined || dps === null) {
    return
  }
  let tempDPSModel: DPSMode = _.cloneDeep(get().deviceDPSModel)

  dps.map((item: any) => {
    switch (item.code) {
      case TSL_ATTR_DEMO:
        TSLUtils.handlerReportNumberAttr(tempDPSModel.demoPowerAttr, item);
       	break;
      // ... 
      default:
        break
    }
  })

  set({ deviceDPSModel: tempDPSModel })
},
```

和以往一样，物模型初始化时通过 `AttrConfig` 定义的 code 已进行不同物模型类型上报处理。

#### 页面中使用物模型

在 `tslStore` 中提供了对应的 `selector`：

```typescript
export const useDpsModel = () => useTslStore(state => state.deviceDPSModel);
```

使用：

```jsx
function Main(){
  const dspModel = useDpsModel()
  return (
    <View>
      <Text>{dpsModel.demoPowerAttr.name}</Text>
    </View>
  )
}
```

#### 下发

通过 `src/hooks/use-tsl-writer.hook.ts` 进行物模型的下发：

(**由于参数个数不一致, 无法进行函数重载, 因此在使用时, 请严格按照以下示例传参**)

使用：

```jsx
function Main() {
    const attr1 = new TSLModel();
    const attr2 = new TSLModel();
    const tslWriter = useTslWriter();

    // 单个下发
    tslWriter(dpsModel.numberAttr, '20', {
        success() { },
        fail() { },
    });
   tslWriter(dpsModel.enumAttr, '1', {
        success() { },
        fail() { },
    });
   tslWriter(dpsModel.booleanAttr, 'true', {
        success() { },
        fail() { },
    });

    // 多个下发
    tslWriter(
        [
            {attr: dpsModel.numberAttr, value: '20'},
            {attr: dpsModel.enumAttr, value: '1'},
         		{attr: dpsModel.booleanAttr, value: 'true'},
        ],
        {
            success() { },
            fail() { },
        },
    );
}
```

#### NumberTSLModel、EnumTslModel、BooleanTslModel 类工具函数

```tsx
    const Demo = () => {
      	const dpsModel = useDpsModel();
      
        return (
            <>
                <View>
                    <Text>{JSON.stringify(numberAttr.getSpecs())}</Text>
                    <Text>{dpsModel.numberAttr.getUnit()}</Text>
                    <Text>{dpsModel.numberAttr.getStep()}</Text>
                    <Text>{dpsModel.numberAttr.getMinAndMax()}</Text>
                    <Text>{dpsModel.numberAttr.getDecimalCount()}</Text>
                </View>

                <View>
                    <Text>{JSON.stringify(dpsModel.enumAttr.getSpecs())}</Text>
                    <Text>{dpsModel.enumAttr.getName()}</Text>
                </View>

                <View>
                    <Text>{JSON.stringify(dpsModel.booleanAttr.getSpecs())}</Text>
                    <Text>{dpsModel.booleanAttr.getName()}</Text>
                </View>
            </>
        );
    };
```



***

### 网络请求

`Saas` 以及 `PaaS` 的请求实例已封装在 `src/api/http-instance.ts` 中；

各请求模块存放在 `src/api/module`；

 使用：

```ts
// src/api/module/demo.ts

/**
 * 请求 SaaS 接口
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqSaaSData = () =>
    httpSaasInstance.get<HttpSaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });

/**
 * 请求 SaaS 列表接口
 * @returns
 *  {list: [{demo: 'xxxxxx'}], total: 1}
 */
export const reqSaaSList = () =>
    httpSaasInstance.get<HttpSaaSListResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });

/**
 * 请求 PaaS 接口
 * @returns
 *  {data: {demo: 'xxxxxx'}}
 */
export const reqPaaSData = () =>
    httpPaasInstance.get<HttpPaaSResponseType<{demo: string}>>({
        path: '/demo',
        params: {},
    });
```



```typescript
export const useInitEvent = () => {
    useEffect(() => {
        // ... 编写监听事件注册逻辑

        // 移除监听事件
        return () => {
            // ...注销监听事件
        };
    }, []);
};
```

在项目初始化时，注册监听事件。

#### useTslWriter

下发物模型 hooks。参照上方 `物模型的下发`。

#### useDynamicValue

参考了 `react-native-dynamic` 进行编写，用于不同的主题返回不同的值。

使用：

```typescript
function Main() {
    const value = useDynamicValue('a', 'b');
    console.log(value); // 亮色主题时,返回 a; 暗黑主题时, 返回b
}
```

#### useDynamicStyleSheet

同 `useDynamicValue` ：

```typescript
export const useDynamicStyleSheet = useDynamicValue;
```

### 暗黑模型的适配

参考 `react-native-dynamic` ，使用 `useColorScheme` + `useDynamicValue` 的方法适配暗黑模式。

#### 定义不同主题下的颜色

在 `src/utils/DarkModeUtils` 中，定义不同主题下的颜色：

```typescript
import {DynamicValue} from '../hooks';

type DarkModeColorsType = {
    [K in keyof typeof rawDarkModeColors]: () => any;
};

const rawDarkModeColors = {
    color_Text() {
        return new DynamicValue('#333', '#FFF');
    },

    color_Bg() {
        return new DynamicValue('#EFF1F7', '#242529');
    },

    color_FFF() {
        return new DynamicValue('#FFF', '#1b1b1b');
    },

    color_subText() {
        return new DynamicValue('#666', '#B4B4B4');
    },
};

export const DarkModeColors: DarkModeColorsType = rawDarkModeColors;
```

#### 使用 DynamicStyleSheet 创建动态样式

使用 `DynamicStyleSheet` 创建动态样式后，`styles` 存储着 `亮色主题`下的样式以及 `暗黑主题`下的样式。

```typescript
const styles = new DynamicStyleSheet({
    container: {
        backgroundColor: DarkModeColors.color_FFF(),
    },
});
```

#### 在组件中根据当前主题选择对应的样式

在组件中，使用 `useDynamicStyleSheet` 即可根据当前主题选择对应的样式：

```jsx
function Main() {
    const mStyles = useDynamicStyleSheet(styles);

    return (
        <View style={mStyles.container}>
            <Text>Main</Text>
        </View>
    );
}

export default Main;

const styles = new DynamicStyleSheet({
    container: {
        backgroundColor: DarkModeColors.color_FFF(),
    },
});
```

完成暗黑模式的适配。
