## 输入任意框计算最终值

因业务需求中要求`3个输入框，输入任意2个值计算第3个值`，想到了以下计算方式作为参考，优势在于减少了每种条件下的`if`，只需要写入需要计算的值的公式。

:::demo
```html
<template>
  <div>
        <el-form :model="form">
            <el-form-item label="签约金额" prop="">
                <el-link type="success" :underline="false" icon="el-icon-circle-plus-outline" @click="handleAdd('signingAmounts')">添加明细</el-link>
                <xn-table :data="form.signingAmounts" border :index="false">
                    <el-table-column label="金额（未税）" prop="">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.priceExcludingTax" placeholder="金额（未税）" size="mini" clearable @input="computed(row,'priceExcludingTax')" />
                    </template>
                    </el-table-column>
                    <el-table-column label="税率" prop="">
                    <template slot-scope="{ row }">
                        <el-input v-model.number="row.taxRate" min="0" max="100" type="number" placeholder="税率" size="mini" clearable @input="computed(row,'taxRate')" />
                    </template>
                    </el-table-column>
                    <el-table-column label="金额（含税）" prop="">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.totalPrice" placeholder="金额（含税）" size="mini" clearable @input="computed(row,'totalPrice')" />
                    </template>
                    </el-table-column>
                    <el-table-column label="税额" prop="">
                    <template slot-scope="{ row }">
                        <span>{{row.taxAmount}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="" width="70px">
                    <template slot-scope="{ row, $index }">
                        <el-button type="text" @click="handleRemove(row,$index,'signingAmounts')">删除</el-button>
                    </template>
                    </el-table-column>
                </xn-table>
                </el-form-item>
        </el-form>

        <p class="text-warning">最终计算结果：{{result}}</p>
        
        <p class="mt-30">需要计算的字段：{{fields}} （按照表单顺序）</p>
        <p>最终需要计算的：{{fields[0]}}</p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        signingAmounts: []
      },
      tpl: {
        signingAmounts: {
          priceExcludingTax: '',
          taxRate: '',
          taxAmount: '',
          totalPrice: ''
        }
      },
      rules: {},
      fields: ['priceExcludingTax', 'taxRate', 'totalPrice','taxAmount'],
      fieldsRules: {
        priceExcludingTax:(row)=> {
            if(row.totalPrice&&row.taxRate){
                row.priceExcludingTax = this.$math.div(row.totalPrice,row.taxRate/100)
                row.taxAmount = this.$math.sub(row.priceExcludingTax,row.totalPrice)
            }
        },
        taxRate:(row)=> {
            // console.log('row: ', row);
        },
        taxAmount:(row)=> {
            if(row.totalPrice&&row.priceExcludingTax){
                row.taxAmount = this.$math.sub(row.priceExcludingTax,row.totalPrice)
            }
        },
        totalPrice:(row)=> {
            if(row.taxRate&&row.priceExcludingTax){
                row.totalPrice = this.$math.sub(row.priceExcludingTax,this.$math.mul(row.priceExcludingTax,row.taxRate/100))
                row.taxAmount = this.$math.sub(row.priceExcludingTax,row.totalPrice)
            }
        }
      },
      result:{
        priceExcludingTax: '',
        taxRate: '',
        taxAmount: '',
        totalPrice: ''
      }
    }
  },
  methods: {
    computed(value, field) {
        const res = this.$math.autoComputed(this.fields,this.fieldsRules,field,value)
        // 计算总未税
        this.result.priceExcludingTax = this.$math.add(this.form.signingAmounts,'priceExcludingTax')
        // 计算总税率
        this.result.taxRate = this.$math.add(this.form.signingAmounts,'taxRate')
        // 计算总含税
        this.result.totalPrice = this.$math.add(this.form.signingAmounts,'totalPrice')
        // 计算总税额
        this.result.taxAmount = this.$math.add(this.form.signingAmounts,'taxAmount')
    },
    handleAdd(type) {
      switch (type) {
        case 'signingAmounts':
          this.form.signingAmounts.push(this.$lodash.cloneDeep(this.tpl[type]))
          break
      }
    },
    handleRemove(_, idx, type) {
      this.form[type].forEach((item, index, arr) => {
        if (idx === index) {
          arr.splice(idx, 1)
        }
      })
    }
  }
}
</script>
```
:::