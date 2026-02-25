# 🕹 开发流程

## 1. 前期收集 📦

#### a. 确定面板名称 QuecPanelDemo
#### b. 胁迫产品交出《物模型》
#### c. 抢劫ui的《🎨figma》
#### f. 从ui图里抽出所有的图标
```
导出x2或者x3的PNG格式，重命名并存好
ps： 此时可以开始要求lottie动画的json
```

**** 
<br>

## 2.  使用脚手架创建面板  🔧

脚手架使用文档 👉[脚手架wiki](https://knowledge.quectel.com/pages/viewpage.action?pageId=268318580)

``` powerShell
PS E:\user\QuecPanelDemo> quec-panel-cli create QuecPanelDemo
``` 

**** 
<br>

## 3. 处理图片资源和颜色 🎨
``` js
解： 
    已知目录 `src/assets` 为静态资源目录
        静态图片 => `src/assets/image` 
        动画json => `src/assets/lottie` 
``` 
关于图片和颜色引入使用，目录

👉 `src/config/color.config.ts` 

👉 `src/config/image.config.ts` 

``` powerShell
PS E:\QuecPanelFireRabbit\src\assets\image> Get-ChildItem -Name
# 查出所有图片文件名字
(windows =>  Get-ChildItem -Name)
(mac =>  ls -p | grep -v /)
``` 
获取到图片文件名后，在 `src/config/image.config.ts` 中进行引入，关于图片Key建议一并ChatGPT产出，产出结果类似以下：

```ts
// chatGPT
    back: require('../assets/image/ic_back.png'),
    itemRightArrow: require('../assets/image/ic_menu_arrow.png'), 

    帮我将下面图片名按照上面的格式转换一下，并提供合适的key

    ic_back.png
    ic_menu_arrow.png
``` 
**** 
<br>

## 4. 处理多语言 🌏

####  从ui图里抽出所有的多语言
多语言目录 `src/i18n/locales/zh.js`

ps: 关于多语言，建议直接将中文字符串整理完整后，将以下文字塞入ChatGPT进行产出

``` js 
// chatGPT
export default {
loading: '加载中',
}

帮我将下面文字按照上面的格式转换一下，并提供合适的key

: '开启',
: '关闭',
: '温馨提示',
``` 
####  整理好之后将多语言的excel文件放给产品，要求产品发给翻译组翻译

**** 
<br>

## 5. 确定路由页面 🗺 

路由目录为 `src/router`

页面目录为 `src/pages`

页面路由名称定义Config在 `src\config\route-page.config.ts`

将页面里所有的路由放入`src/router/index.ts`和`src/router/router.ts`中

格式如下

``` ts
// index.tsx
import Page1 from '../page/first-page';
import {PAGE_DEMO} from '../config/route-page.config';

export const PageRoutes = {
    DemoPage: new PageRouterImp(PAGE_DEMO, Page1, {
        headerShown: false,
    }),

// router.d.ts
export type RootStackParamList = {
    [PAGE_1]: undefined;
    [PAGE_2]: Params;
    [PAGE_DEMO]: {device: any; area: string};
```


## 6. 开始写面板 

写面板的基本逻辑：👉👉 [~~物模型、样式、设备三个状态库~~]()

常用的组件库：👉👉 [常用组件库](./Component.md)

**** 
<br>

## 7. 🔧 使用cli打包面板 
``` cmd
E:\user\QuecPanelDemo> 
quec-panel-cli package E:\user\QuecPanelDemo 1.0.0
``` 
将打包好的面板拿出来放入wiki中


**** 
<br>
