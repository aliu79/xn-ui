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
      const res = this.$refs.city.str2Code(
        "天津市红桥区"
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