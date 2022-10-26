<template>
  <div>
    <xn-city
      ref="city"
      v-model="city"
      filterable
      :props="{ checkStrictly: true }"
    ></xn-city>
    <el-button type="primary" size="default" @click="click">btn</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
    };
  },
  mounted() {},
  methods: {
    click() {
      const name = this.$refs.city.str2Code("北京市大兴区亦庄镇富源里6-1-501");
      this.city = name
    },
  },
};
</script>

<style>
</style>