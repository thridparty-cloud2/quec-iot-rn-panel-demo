
# 物模型 💬

## code 定义

相关物模型 `code` 定义编写在 `src/config/attr-config.ts` 中：

```typescript
// src/config/attr-config.ts

/**
 * 负载无用功率 FLOAT R
 */
export const TSL_ATTR_DEMO = 'demo_code';
```

## 数据点定义

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

## 物模型请求

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

## 初始化

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

## 上报处理

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

## 页面中使用物模型

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

## 下发

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

## NumberTSLModel、EnumTslModel、BooleanTslModel 类工具函数

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
