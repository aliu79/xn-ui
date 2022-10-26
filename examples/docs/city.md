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
                const code = this.$refs.city.str2Code(this.address)
                console.log('code: ', code);
                this.cityCode = code
            }
        }
    }
</script>
```
:::