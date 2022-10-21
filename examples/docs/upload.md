## 上传
简单封装了下，为了不用每次都写上传接口。
:::demo
```html
<template>
    <div>
        <xn-upload :file-list="list" :limit="10"></xn-upload>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[
                    {
                        url:'//i.xianniu.cn/accessory/2022/09/28/14fe799e59e5423eb40a2e3749f97e10.xlsx',
                        name:'asdsa'
                    }
                ]
            }
        }
    }
</script>
```
:::

### 属性

继承了[el-upload](https://element.eleme.cn/#/zh-CN/component/upload)的属性与事件。
