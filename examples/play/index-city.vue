<template>
  <div>
    <xn-city
      ref="city"
      v-model="form.city"
      filterable
      clearable
      :data-level="2"
      @on-city="oncity"
      @on-change="onChange"
    ></xn-city>

    <xn-search
      ref="formSearch"
      class="mt-18"
      label-width="0"
      :form-data="formSearch"
      @on-search="onSearch"
    ></xn-search>
    <el-button type="primary" size="default" @click="click">btn</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
     form:{
      city: "",
     },
      formSearch: [
        {
          type: "city",
          prop: "city",
          options: {
            props: {
              multiple: true,
              checkStrictly: true,
            },
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    click() {
      const res = this.$refs.city.str2Code("北京市北京市通州区");
      console.log(res);
      this.city = ["110100","140400"];
    },
    onChange(val){
    console.log("🚀 ~ onChange ~ val:", val)

    },
    oncity(val) {
      console.log("🚀 ~ oncity ~ val:", val);
    },
    onSearch(val) {
      console.log("🚀 ~ onSearch ~ val:", val);
    },
  },
};
</script>

<style>
</style>