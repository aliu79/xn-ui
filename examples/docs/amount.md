## amount 数字金额

用于显示数字金额，可以选择显示为中文大写金额或带有分隔符的数字金额。

### 示例

::: demo
```html
<template>
  <div>
    <xn-amount :value="value" :precision="2" :isRoundUp="true" :hasSeparator="true" separator="," :isCapital="false"></xn-amount>
    <xn-amount :value="value" :precision="2" :isRoundUp="true" :hasSeparator="false" :isCapital="true"></xn-amount>
    <div>
        <xn-amount :value="value" :precision="3" :isRoundUp="false" :hasSeparator="false" ></xn-amount>
    </div>
     <div>
        <xn-amount :value="value1" :precision="2" :prefix-style="{color:'#f00',fontSize:'42px'}"></xn-amount>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 示例数据
      value:123456.235,
      value1:-123456.239
    };
  },
};
</script>
```
:::

### 属性

| 参数         | 说明                     | 类型    | 可选值 | 默认值 |
| ------------ | ------------------------ | ------- | ------ | ------ |
| value        | 数值                     | Number  | -      | 0      |
| precision    | 小数点后的位数           | Number  | -      | 2      |
| isRoundUp    | 是否四舍五入             | Boolean | -      | true   |
| hasSeparator | 是否显示分隔符           | Boolean | -      | true   |
| separator    | 分隔符                   | String  | -      | ","    |
| isAnimated   | 是否启用动画             | Boolean | -      | false  |
| transition   | 是否启用过渡效果         | Boolean | -      | false  |
| isCapital    | 是否显示为中文大写金额   | Boolean | -      | false  |
| duration     | 动画持续时间（毫秒）     | Number  | -      | 1000   |
| prefix     | 前缀符号     | String  | -      | ￥   |
| prefixStyle     | 前缀符号样式     | Object  | -      | -   |
