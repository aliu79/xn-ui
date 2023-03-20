## tag 标签

继承 `elTag`，添加了图标属性

::: demo 
```html
<template>
    <xn-tag
      :key="item"
      class="mr-20"
      v-for="item in ['grey', 'blue', 'yellow', 'orange', 'red', 'green']"
      :default-color="item"
      effect="dark"
      icon="el-icon-edit"
      >
      
      Tag</xn-tag
    >
</template>

```
:::

### 属性

| 参数          | 说明           | 类型   | 可选值                                 | 默认值 |
| ------------- | -------------- | ------ | -------------------------------------- | ------ |
| 继承elTag属性 | -              | -      | -                                      | -      |
| defaultColor  | 默认的几种颜色 | string | grey/ blue/ yellow/ orange/ red/ green | -      |

### 插槽 slot

| 参数 | 说明         | 类型 | 可选值 | 默认值 |
| ---- | ------------ | ---- | ------ | ------ |
| icon | 图标位置插槽 | -    | -      | -      |