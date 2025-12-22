<template>
  <div>
    <h3>Amount 组件 null 值测试</h3>
    
    <h4>1. 值为 null（应该显示缺省值 "--"）</h4>
    <p>值: {{ value }}</p>
    <xn-amount :value="value" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>2. 值为 0（应该显示 "0.00"）</h4>
    <p>值: {{ zeroValue }}</p>
    <xn-amount :value="zeroValue" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>3. 值为 undefined（应该显示缺省值 "--"）</h4>
    <p>值: {{ undefinedValue }}</p>
    <xn-amount :value="undefinedValue" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>4. 值为 NaN（应该显示缺省值 "--"）</h4>
    <p>值: {{ nanValue }}</p>
    <xn-amount :value="nanValue" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>5. 自定义空值显示</h4>
    <p>值: {{ value }}</p>
    <xn-amount :value="value" :precision="2" :hasSeparator="true" separator="," empty-value="N/A"></xn-amount>
    
    <h4>6. 插槽中提供 null 值（应该显示缺省值 "--"）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      {{ null }}
    </xn-amount>
    
    <h4>7. 插槽中提供 0 值（应该显示 "0.00"）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      {{ 0 }}
    </xn-amount>
    
    <div style="margin-top: 20px;">
      <el-button @click="setNull">设置为 null</el-button>
      <el-button @click="setZero">设置为 0</el-button>
      <el-button @click="setNumber">设置为一个数字</el-button>
      <el-input-number v-model="value" :precision="2" :step="1000" style="width: 200px; margin-left: 10px;"></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      zeroValue: 0,
      undefinedValue: undefined,
      nanValue: NaN,
    };
  },
  methods: {
    setNull() {
      this.value = null;
    },
    setZero() {
      this.value = 0;
    },
    setNumber() {
      this.value = 1234567.89;
    },
  },
};
</script>

<style scoped>
h3, h4 {
  margin: 10px 0;
}
p {
  margin: 5px 0;
}
</style>