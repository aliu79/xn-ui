## 列表查询
基于 [element-ui](https://element.eleme.cn/#/zh-CN/component/input) 二次封装。

:::demo 
```html
<template>
    <xn-search ref="search" label-width="100px" :form-data="formData" @on-search="handleSearch" @on-reset="handleReset">
        <template #prepend>前边的</template>    
        <template #append>后边的</template>    
    </xn-search>
    <el-divider content-position="left"><span class="text-primary">分割线</span></el-divider>
    <xn-search ref="search" :span="12" :show-coll="false" :form-data="formData" @on-search="onSearch"></xn-search>
</template>
<script>
    export default {
        data(){
            return {
                formData:[
                    {label: '姓名',prop:'name',type:'input'},
                    {label: '性别',prop:'sex',type:'select',data:[{label:'男',value:1},{label:'女',value:2}]},
                    {label: '城市',prop:'city',type:'city'},
                    {label: '范围',prop:'num',type:'range'},
                    {label: '时间',prop:'date',type:'daterange',options:{start:'stime',end:'etime'}},
                    {label: '时间',prop:'date1',type:'date'},
                    {label: '传入数据',prop:'field3',type:'select'},
                    {label: '级联菜单',prop:'field4',type:'cascader',data:[{label:'男',value:1},{label:'女',value:2}],options:{
                        props:{
                            value:'value',
                            label:'label',
                            children:'children'
                        }
                    }},
                ]
            }
        },
        methods:{
            handleSearch(val){
                console.log(val)
            },
            handleReset(){}
        },
        mounted(){
            this.$refs.search.setData('传入数据',[{label:'字段1',value:1}])
        }
    }
</script>
```
:::

### 属性

| 参数             | 说明                                | 类型    | 可选值     | 默认值      |
| ---------------- | ----------------------------------- | ------- | ---------- | ----------- |
| label-width      | label宽度                           | string  | -          | 80px        |
| span             | 栅格的数量，优先级大于xs/sm/md/lg等 | number  | 0-24       | null        |
| show-coll        | 是否显示折叠按钮                    | boolean | true/false | true        |
| default-coll     | 默认下显示几个搜索字段              | number  | -          | 3           |
| last-label-width | 最后搜索按钮的label-width           | string  | -          | label-width |

### 事件
| 参数       | 说明 | 类型                                | 可选值 | 默认值 |
| ---------- | ---- | ----------------------------------- | ------ | ------ |
| @on-search | 搜索 | function(val){} val为json格式的数据 | -      | -      |
| @on-reset  | 重置 | function                            | -      | -      |


### form-data 参数
| 参数        | 说明                                                   | 类型   | 可选值                                                  | 默认值 |
| ----------- | ------------------------------------------------------ | ------ | ------------------------------------------------------- | ------ |
| type        | 表单的类型                                             | string | input/select/city/date/datetime/daterange/datetimerange/cascader | -      |
| label       | 名称                                                   | string | -                                                       | -      |
| prop        | 查询需要的key                                          | string | -                                                       | -      |
| placeholder | 占位符                                                 | string | -                                                       | -      |
| data        | type=select时必传，下拉的数据                          | array  | -                                                       | -      |
| options     | 默认继承组件的所有属性，同时可以传入自定义，见下方说明 | array  | -                                                       | -      |


### options 详细说明
| 参数     | 说明                                        | 类型 | 可选值 | 默认值 |
| -------- | ------------------------------------------- | ---- | ------ | ------ |
| labelKey | type=select时可选，label的key               | -    | -      | -      |
| valueKey | type=select时可选，value的key               | -    | -      | -      |
| start    | type=daterange时可选，时间范围开始字段的key | -    | -      | -      |
| end      | type=daterange时可选，时间范围结束字段的key | -    | -      | -      |


### slots 插槽
搜索按钮区域额外的插槽

| 参数    | 说明           | 类型 | 可选值 | 默认值 |
| ------- | -------------- | ---- | ------ | ------ |
| prepend | 搜索按钮前面的 | -    | -      | -      |
| append  | 重置按钮后面的 | -    | -      | -      |