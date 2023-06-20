<template>
  <div>
    <xn-city
      ref="city"
      v-model="city"
      filterable
      :data-level="2"
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
      const name = this.$refs.city.str2Code("地址：四川省'-广安市@武胜县show");
      this.city = name
    },
  },
};
</script>

<style>
</style>