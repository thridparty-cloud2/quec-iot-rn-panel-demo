# Zustand-Store（状态管理）🎈

新增 `global.stroe`、`device-state.store` 、`theme.store` 、`tsl.store`  公共组件；

## global.store - 全局的 props 和 device

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

## device.state.store - 设备状态

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

## theme.store - 主题定义、配置

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

## tsl.store - 物模型状态

src/store/tsl.store.ts

物模型的 `请求、初始化、上报处理`的逻辑编写在 `src/store/tsl-store.ts` 中。

详见此目录内 👉👉 [物模型说明书](./READMES/Model.md)

