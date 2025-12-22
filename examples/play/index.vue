<template>
  <div>
    <h3>Amount 组件默认插槽测试</h3>
    
    <h4>1. 使用默认插槽（自动格式化数字）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      <span>222222222222</span>
    </xn-amount>
    
    <h4>2. 使用 value 属性</h4>
    <p>值: {{ value }}</p>
    <xn-amount :value="value" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>3. 值为 null（应该显示缺省值 "--"）</h4>
    <p>值: {{ nullValue }}</p>
    <xn-amount :value="nullValue" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>4. 值为 0（应该显示 "0.00"）</h4>
    <p>值: {{ zeroValue }}</p>
    <xn-amount :value="zeroValue" :precision="2" :hasSeparator="true" separator=","></xn-amount>
    
    <h4>5. 插槽中的数字（自动格式化）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      1234567.89
    </xn-amount>
    
    <h4>6. 插槽中的大数字（自动格式化）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      {{ 9876543210.12345 }}
    </xn-amount>
    
    <h4>7. 插槽中的非数字内容（保持原样）</h4>
    <xn-amount :precision="2" :hasSeparator="true" separator=",">
      <span style="color: red;">自定义内容</span>
    </xn-amount>
    
    <h4>8. 自定义空值显示</h4>
    <p>值: {{ nullValue }}</p>
    <xn-amount :value="nullValue" :precision="2" :hasSeparator="true" separator="," empty-value="N/A"></xn-amount>
    
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
      value: 1234567.89,
      nullValue: null,
      zeroValue: 0,
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