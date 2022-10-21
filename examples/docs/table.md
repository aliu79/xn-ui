## table 表格 
基于 [element-ui](https://element.eleme.cn/#/zh-CN/component/table) 二次封装。

::: demo 
```html
<template>
  <xn-table
    @sort-change="handleSort"
    index
    selection
    :columns="listHeader"
    :data="list"
    :show-page="false"
    :page="pageConfig"
    show-column
    @on-refresh="handleRefresh"
    @handle-buttons="handleButtons"
    @on-page="fnGetList"
    show-refresh
    :tools="tools"
  ></xn-table>
</template>

<script>
export default {
  data() {
    return {
      listHeader: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄", labelMsg: "表头字段说明" },
        { prop: "date", label: "日期", sortable: true },
        {
          label: "操作",
          fixed: "right",
          more: {
            options: [
              {
                label: "按钮",
                icon: "el-icon-info",
                method: "info",
              },
              { label: "删除", method: "info" },
            ],
          },
        },
      ],
      list: [
        { id: 1, date: "2011-01-01", name: "lzw", age: 18 },
        { id: 2, date: "2011-01-03", name: "lzw", age: 22 },
      ],
      pageConfig: {
        total: 100,
        pageSize: 15,
        pageNum: 1,
      },
      tools:[
        {
          label:'按钮1',
          prop:'btn1',
          icon:'el-icon-edit'
        },
        {
          label:'按钮2',
          prop:'btn2',
        }
      ]
    };
  },
  created() {},
  methods: {
    handleSort(e) {
      console.log(e);
    },
    handleRefresh() {
      console.log("re");
    },
    handleButtons(args) {
      console.log(args);
    },
    fnGetList(v) {
      console.log(v);
    },
  },
};
</script>

<style>
</style>

```
:::

### 属性

:::warning 
默认继承 `el-table` 的属性与事件，可直接使用
:::

| 参数        | 说明                 | 类型    | 可选值                               | 默认值                          |
| ----------- | -------------------- | ------- | ------------------------------------ | ------------------------------- |
| selection   | 是否显示勾选         | boolean | true/false                           | false                           |
| radio       | 是否显示单选         | boolean | true/false                           | false                           |
| index       | 是否显示序号         | boolean | true/false                           | false                           |
| show-page   | 是否显示分页         | boolean | true/false                           | false                           |
| page        | 分页的配置项         | oject   | {pageNum:1,pageSize:15}              | {pageSize:15,pageNum:1,total:0} |
| columns     | 表头                 | array   | 详见[columns-参数](#columns-can-shu) | []                              |
| show-column | 是否显示勾选表头按钮 | boolean | true/false                           | -                               |
| show-refresh | 是否显示刷新按钮 | boolean | true/false                           | -                               |
| tools | 更多工具栏 | array | []                           | -                               |


### columns-属性
| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| label    | 字段名称     | string  | -          | -      |
| prop     | 对应接口字段 | string  | -          | -      |
| sortable | 是否排序     | boolean | true/false | false  |
| labelMsg | 表头描述     | string  | -          | -      |

### 事件
| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| on-refresh    | 刷新按钮     | function  | -          | -      |
| on-page    | 切换分页     | function  | -          | {pageNum,pageSize}      |
| handle-buttons （render）   | 列表右侧按钮(事件名称，行数据，当前行索引)     | function  | -          | {method,row,index}      |
