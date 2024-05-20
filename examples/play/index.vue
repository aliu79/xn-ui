<template>
  <div>
    <xn-city ref="city" is-all v-model="city" filterable @on-city="oncity"></xn-city>
    <el-button type="primary" size="default" @click="click">btn</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "000000",
    };
  },
  mounted() {},
  methods: {
    click() {
      const res = this.$refs.city.str2Code(
        "北京市北京市通州区"
      );
      console.log(res)
      // this.city = cityCodeLast;
    },  
    oncity(val) {
      console.log("🚀 ~ oncity ~ val:", val);
    },
  },
};
</script>

<style>
</style>