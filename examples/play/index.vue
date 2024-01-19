<template>
  <div>
    <xn-city ref="city" v-model="city" filterable @on-city="oncity"></xn-city>
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
      const { cityCodeLast } = this.$refs.city.str2Code(
        "北京市东城区东华门街道故宫快餐故宫博物院"
      );
      this.city = cityCodeLast;
    },
    oncity(val) {
      console.log("🚀 ~ oncity ~ val:", val);
    },
  },
};
</script>

<style>
</style>