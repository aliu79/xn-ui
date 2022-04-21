## tip 提示条

::: demo 
```html
<template>
    <xn-tip type="primary">标题</xn-tip>

    <xn-tip type="warning">标题</xn-tip>

    <xn-tip type="success">标题</xn-tip>
    <xn-tip type="danger">标题</xn-tip>
    <xn-tip type="info">标题</xn-tip>
</template>

```
:::

### 属性

| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| type    | 类型     | string  | primary/success/info/warning/danger          | primary      |

### 插槽 slot

| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| -    | 标题内容插槽     | -  | -          | -      |