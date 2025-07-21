<template>
  <div>
    <xn-amount :value="value" :prefix-style="{color:'#f00'}" prefix="LLL" suffix="美元" :suffix-style="{color:'#00f'}">
      <template #prefix>
        <span style="color: #f00;">&</span>
      </template>
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
      value: 9999999.982,
    };
  },
  mounted() {
  
  },
  methods: {},
};
</script>

<style></style>
