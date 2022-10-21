## 格式化金额
多数情况下金额格式化显示 `1000 -> ￥1000.00`

:::demo 
```html
    <template>
        <div>
            <p>{{price}}：{{toText}}</p>
            <p>{{price}}：{{toCN}}</p>
        </div>
    </template>
    <script>
        export default {
            data(){
                return {
                    price:10000000
                }
            },
            computed:{
                toText(){
                    return this.$format.toText(this.price)
                },
                toCN(){
                    return this.$format.toCN(this.price)
                }
            },
            created(){
                
            }
        }
    </script>
```
:::