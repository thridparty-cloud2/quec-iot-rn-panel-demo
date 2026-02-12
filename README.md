

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

### 🕹 开发面板的流程 
👉👉 [开发流程](./READMES/StartPanel.md)

***

### 📜 目录结构 

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

###  ♻ Component 组件
👉👉 [Component 组件](./READMES/Component.md)


***

### 🎈 Zustand-Store（状态管理）
👉👉 [状态管理](./READMES/Store.md)


***

### 💬 物模型
👉👉 [物模型](./READMES/Model.md)

***

### ☁ 网络请求

👉👉 [网络请求](./READMES/Request.md)

***
### 📎 相关库说明书连接

| 库名                     | 描述                         | 私仓链接                                                                   |
| ------------------------ | ---------------------------- | -------------------------------------------------------------------------- |
| `@quec/panel-model-kit`  | 面板管理设备物模型信息状态库 | [私仓地址](http://192.168.23.184:4873/-/web/detail/@quec/panel-model-kit)  |
| `@quec/panel-theme-kit`  | 面板主题状态管理&样式工具库  | [私仓地址](http://192.168.23.184:4873/-/web/detail/@quec/panel-theme-kit)  |
| `@quec/panel-device-kit` | 面板管理设备信息状态库       | [私仓地址](http://192.168.23.184:4873/-/web/detail/@quec/panel-device-kit) |


***
