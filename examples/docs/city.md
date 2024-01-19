## 选择城市
基于 [el-cascader](https://element.eleme.cn/#/zh-CN/component/cascader) 封装，你默认继承该组件的属性与事件。

:::demo
```html
<template>
    <div>
        <p>根据地址设置默认值：{{address}}</p>
        <xn-city ref="city" v-model="cityCode"  @on-city="getCity" />
        <el-button class="mt-20" type="primary" @click="setData">设置</el-button>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                address:'内蒙古自治区通辽市开鲁县建外soho-1702',
                cityCode:''
            }
        },
        methods:{
            getCity(val){
                console.log('val: ', val);
            },
            setData(){
                const { cityCodeLast } = this.$refs.city.str2Code(this.address)
                console.log('code: ', cityCodeLast);
                this.cityCode = cityCodeLast
            }
        }
    }
</script>
```
:::


### 属性

| 参数       | 说明                             | 类型   | 可选值 | 默认值 |
| ---------- | -------------------------------- | ------ | ------ | ------ |
| data-level | 显示层级，3=省市县，2=省市，1=省 | number | 1/2/3  | 3      |

### 事件
| 参数       | 说明               | 类型   | 可选值 | 默认值 |
| ---------- | ------------------ | ------ | ------ | ------ |
| @on-change | 返回程式码         | array  | -      | -      |
| @on-city   | 返回格式化后的数据 | object | -      | -      |

### 方法
| 参数     | 说明                 | 类型   | 可选值 | 默认值 |
| -------- | -------------------- | ------ | ------ | ------ |
| str2Code | 根据详细地址查找对应的code，返回值是最后一级code | string | -      | -      |