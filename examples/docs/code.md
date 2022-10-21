## 拉取权限码
权限码的枚举需要我们手动添加，挨个添加比较麻烦，所以写了一个脚本，借助自动拉取该项目下的所有权限码。

::: tip warning
    具体源码在目录 `build/build-auth.js`下
    使用时需要配置下 `config`
:::

#### 生成如下结果
``` js
/* appCode: XTD */
const AUTH_CODE = {
  'auth941': '7008_1002', // 异常服务
  'auth951': '7008_1002_1001', // 查看详情
  'auth952': '7008_1002_1002' // 取消申请
}
export default AUTH_CODE

```