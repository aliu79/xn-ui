## 输入任意框计算最终值

因业务需求中要求`3个输入框，输入任意2个值计算第3个值`，想到了以下计算方式作为参考，优势在于减少了每种条件下的`if`，只需要写入需要计算的值的公式。

:::demo
```html
<template>
  <div>
        <el-input v-model="form.a" @input="computed($event,'a')" />
        <el-input class="mt-20" v-model="form.b" @input="computed($event,'b')" />
        <el-input class="mt-20" v-model="form.c" @input="computed($event,'c')" />
        <p>{{fields}}</p>
        <p>最终需要计算的：{{fields[0]}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        val: '',
        a: 1,
        b: 2,
        c: 3
      },
      rules: {},
      fields: ['a', 'b', 'c'],
      arr: {
        a: () => {
          if (this.form.b && this.form.c) {
            this.form.a = this.$math.add(this.form.b, this.form.c)
          }
        },
        b: () => {
          if (this.form.a && this.form.c) {
            this.form.b = this.$math.add(this.form.a, this.form.c)
          }
        },
        c: () => {
          if (this.form.a && this.form.b) {
            this.form.c = this.$math.add(this.form.a, this.form.b)
          }
        }
      }
    }
  },
  methods: {
    computed(e, field) {
        const res = this.$math.autoComputed(this.fields,this.arr,field)
        console.log('res: ', res);
    }
  }
}
</script>
```
:::