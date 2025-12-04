<template>
  <div>
    <el-button type="primary" size="default">123112</el-button>
    
    <xn-amount :value="value" :prefix-style="{color:'#f00'}" prefix="￥" suffix="美元" :suffix-style="{color:'#00f'}">
      <template #suffix>
        <span style="color: #00f;">元</span>
      </template>
    </xn-amount>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
    };
  },
  mounted() {
  
  },
  methods: {},
};
</script>

<style></style>
