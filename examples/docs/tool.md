## 常用工具

### dayjs
推荐使用[dayjs](https://dayjs.gitee.io/docs/zh-CN/installation/installation)来做时间格式等处理。

::: demo 
```html
    <template>
        <div>
            <p>{{date1}}</p>
            <p>{{date2}}</p>
            <p>{{date3}}</p>
            <p>{{date4}}</p>
        </div>
    </template>

    
    <script>
        export default {
            data(){
                return {
                    date:new Date(),
                    date1:'',
                    date2:'',
                    date3:'',
                    date4:'',
                }
            },
            created(){
                this.date1 = this.$dayjs(this.date).format('YYYY')
                this.date2 = this.$dayjs(this.date).format('YYYY-MM')
                this.date3 = this.$dayjs(this.date).format('YYYY-MM-DD')
                this.date4 = this.$dayjs(this.date).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    </script>
```
:::





### lodash
[lodash](https://www.lodashjs.com/)，一个高性能`javascript`工具库。

``` js
this.$lodash().forEach(item=>item)
this.$lodash.add(4,6) // 10
```

### 数据缓存
[good-storage](https://www.npmjs.com/package/good-storage)，localStorage/sessionStorage二次封装。
``` js
// localStorage
this.$storage.get(key)
this.$storage.set(key,value)
this.$storage.remove(key)
this.$storage.clear() // 清除所有
this.$storage.has(key)
this.$storage.getAll() // 返回所有储存的key,value

// sessionStorage
this.$storage.session.get(key)
...
```

