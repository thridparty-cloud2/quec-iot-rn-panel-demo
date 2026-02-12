
# Component 组件 ♻

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
