## 输入任意框计算最终值

因业务需求中要求`3个输入框，输入任意2个值计算第3个值`，想到了以下计算方式作为参考，优势在于减少了每种条件下的`if`，只需要写入需要计算的值的公式。

:::demo
```html
<template>
    <div>
        <el-input clearable placeholder="请输入" v-model="form.val1" @input="computed($event,'val1')" />
        <el-input clearable class="mt-20" placeholder="请输入" v-model="form.val2" @input="computed($event,'val2')" />
        <el-input clearable class="mt-20" placeholder="请输入" v-model="form.val3" @input="computed($event,'val3')" />
        <p>
            fieldArr：{{fieldArr}}
        </p>
        <p>
            最终需要计算的：{{fieldArr[0]}}
        </p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form:{
                    val1:1,
                    val2:2,
                    val3:3
                },
                fieldArr:['val1','val2','val3']
            }
        },
        methods: {
            computed(_, v) {
                // 获取当前输入的索引
                const idx = this.fieldArr.indexOf(v)
                if (idx !== -1) {
                    // 删除第idx个
                    this.fieldArr.splice(idx, 1)
                }
                // 把正在输入的字段放到最后
                this.fieldArr.push(v)
                // 计数器 判断是否有值，有值就+1
                let step = 0
                for(let i=0;i<this.fieldArr.length;i++){
                    step += this.form[this.fieldArr[i]] ? 1 : 0
                }
                // or
                // step += this.form.val1 ? 1 : 0
                // step += this.form.val2 ? 1 : 0
                // step += this.form.val3 ? 1 : 0
                // 当计数器达到满足计算条件时候（只剩需要计算的最后一个输入框）
                if (step >= this.fieldArr.length - 1) {
                    // this.fieldArr[0] 始终是需要计算的结果
                    switch (this.fieldArr[0]) {
                    // 当 this.fieldArr[0] = val1时，val1的计算公式,依此类推...
                    case 'val1':
                        this.form.val1 = this.$math.add(this.form.val2, this.form.val3)
                        break
                    case 'val2':
                        this.form.val2 = this.$math.add(this.form.val1, this.form.val3)
                        break
                    case 'val3':
                        this.form.val3 = this.$math.add(this.form.val1, this.form.val2)
                        break
                    }
                }
            }
        }
    }
</script>
```
:::