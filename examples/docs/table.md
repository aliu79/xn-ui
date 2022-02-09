## table 表格 
基于 [element-ui](https://element.eleme.cn/#/zh-CN/component/table) 封装的业务组件。

::: demo 
```html
<template>
    <xn-table index selection :data="list">
    </xn-table>
</template>
<script>
    export default {
        data(){
            return {
                list:[
                    {id:1}
                ],
            }
        }
    }
</script>

```
:::

### Attributes

:::warning 
默认继承 `el-table` 的属性与事件，可直接使用
:::

| 参数      | 说明         | 类型    | 可选值     | 默认值 |
| --------- | ------------ | ------- | ---------- | ------ |
| selection | 是否显示勾选 | boolean | true/false | false  |
| index | 是否显示序号 | boolean | true/false | false  |
