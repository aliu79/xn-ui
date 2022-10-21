## 列表查询
基于 [element-ui](https://element.eleme.cn/#/zh-CN/component/input) 二次封装。

:::demo 
```html
<template>
    <xn-search ref="search" label-width="100px" :form-data="formData" @on-search="handleSearch" @on-reset="handleReset" />
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