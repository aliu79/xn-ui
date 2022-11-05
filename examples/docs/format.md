## 金额格式化
多数情况下金额格式化显示 `1000 -> ￥1000.00`

:::demo 
```html
    <template>
        <div>
            <p>{{price}}：{{toText}}</p>
            <p>{{price}}：{{toCN}}</p>
        </div>
    </template>
    <script>
        export default {
            data(){
                return {
                    price:100000000
                }
            },
            computed:{
                toText(){
                    return this.$format.toText(this.price)
                },
                toCN(){
                    return this.$format.toCN(this.price)
                }
            },
            created(){
                
            }
        }
    </script>
```
 * @param {Number} number 要格式化的数字
 * @param {Number} decimals 保留几位小数
 * @param {String} dec_point 小数点符号
 * @param {String} thousands_sep 千分位符号
:::
### 说明

| 参数           | 说明                                                                   | 类型   | 可选值 | 默认值         |
| -------------- | ---------------------------------------------------------------------- | ------ | ------ | -------------- |
| $format.toText | 格式化金额(要格式化的数字,保留几位小数,小数点符号,千分位符号,货币符号) | number | -      | ('',2,.,,,'￥') |
| $format.toCN   | 转中文大写                                                             | number | -      | -              |
### decimal

项目中存在大量金额计算，难免会出现精度问题，[decimal.js](http://mikemcl.github.io/decimal.js)可以有效解决精度问题，并且有大量的api可以满足大多数计算需求。

:::demo
```html
<template>
    <div>
        <p>结果1：{{res1}}</p>
        <p>结果2：{{res2}}</p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                val:[
                    {id: 1,num: 0.1},
                    {id: 2,num: '0.2'},
                ],
                num1: 1,
                num2: 2,
                num3: 3,
                num4: '6'
            }
        },
        computed:{
            res1(){
                return this.$math.add(this.val,'num')
            },
            res2(){
                return this.$math.add(this.num1,this.num2,this.num3,this.num4)
            }
        }
    }
</script>
```
:::

### 示例

```js
/*
方式一
@params 0 array 要计算的数组
@params 1 string 需要计算的key
return number 最终结果
*/
this.$math.add([num:1,num:2],'num') // 3

/*
方式二
@params number/string 需要计算的数值
return number 最终结果
*/
this.$math.add(0.1,0.2,0.3,0.4) // 1
```

### 说明

| 参数      | 说明         | 类型 | 可选值 | 默认值 |
| --------- | ------------ | ---- | ------ | ------ |
| $math.add | 对数值做加法 | -    | -      | -      |
| $math.sub | 对数值做减法 | -    | -      | -      |
| $math.mul | 对数值做乘法 | -    | -      | -      |
| $math.div | 对数值做除法 | -    | -      | -      |
| $math.D   | decimal实例  | -    | -      | -      |