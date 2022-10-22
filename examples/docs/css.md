## 内置样式
一些内置样式，包括边距类/flex布局等。

### 文字颜色
四类常用颜色
``` html
    <span class="text-primary">文字</span>
    <span class="text-success">文字</span>
    <span class="text-warning">文字</span>
    <span class="text-danger">文字</span>
```

### 边距类
支持 0 - 30px
``` html
    <span calss="ml-10">margin-left: 10px</span>
    <span calss="mr-10">margin-right: 10px</span>
    <span calss="mt-10">margin-top: 10px</span>
    <span calss="mb-10">margin-bottom: 10px</span>
    <span calss="m-10">margin: 10px</span>

    <span calss="pl-10">padding-left: 10px</span>
    <span calss="pr-10">padding-right: 10px</span>
    <span calss="pt-10">padding-top: 10px</span>
    <span calss="pb-10">padding-bottom: 10px</span>
    <span calss="p-10">padding: 10px</span>

    <span calss="fz-10">font-size: 10px</span>


```

### flex布局

``` css
    .flex -> display:flex;
    .inline-flex -> display:inline-flex;
    .justify-content-center -> justify-content:center;
    .align-items-center -> align-items:center;
    ......
```

:::demo


```html
<template>
    <div>
        <span class="text-primary">文字</span>
        <span class="text-success">文字</span>
        <span class="text-warning">文字</span>
        <span class="text-danger">文字</span>
        <div class="flex pt-30 pb-30 justify-content-between">
            <span>文本</span>
            <span>flex</span>
        </div>

        <span class="mr-30">文本</span>
        <el-button class="p-10 ml-30 fz-30">注意class</el-button>
    </div>
</template>
```

:::