## 底部状态栏

如果页面用作表单提交，可以用这个组件，会固定在页面底部，放一些提交按钮啥的。

:::demo
```html
    <template>
        <span>固定在页面最底部</span>
        <xn-footer class="text-right">
            <el-button>返回</el-button>
            <el-button type="primary">提交</el-button>
        </xn-footer>
    </template>
```
:::

### 插槽

| 参数     | 说明         | 类型    | 可选值     | 默认值 |
| -------- | ------------ | ------- | ---------- | ------ |
| -    | 内容插槽     | -  | -          | -      |