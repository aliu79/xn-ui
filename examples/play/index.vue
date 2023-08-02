<template>
  <div>
    <xn-search
      ref="search"
      last-label-width="0"
      :form-data="formSearch"
      @on-search="onSearch"
    >
      <template #prepend>
        <el-button type="primary">选择</el-button>
      </template>
      <template #append>
        <el-button type="primary">选择</el-button>
      </template>
    </xn-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: [],
      formSearch: [
        {
          label: "报价单状态",
          type: "select",
          prop: "salesCode",
          data: [
            { asd: "a", a: 1 },
            { asd: "b", a: 2 },
          ],
          options: {
            labelKey: "asd",
            valueKey: "a",
            multiple: true,
          },
        },
        {
          label: "city",
          type: "city",
          prop: "fieldcity",
          options:{
            props:{ checkStrictly: true }
          }
        },
        {
          label: "报价单状态111",
          type: "select",
          prop: "field1",
          options: {
            labelKey: "asd",
            valueKey: "a",
          },
        },
        {
          label: "报价单状态1",
          type: "input",
          prop: "field2",
        },
      ],
    };
  },

  mounted() {
    this.$refs.search.setValue({
      field2: "a",
      salesCode: [1],
    });
    console.log(
      this.$math.mul(
        this.$math.add(1, 6.5 / 100,{unFixed:true}),
        53287.25
      )
    );
    console.log(
      this.$math.add(1, 6.5 / 100)
    );
  },
  methods: {
    change(val) {
      this.type = val;
      this.form = val === 1 ? this.formSearch : this.formSearch1;
    },
    onSearch(val) {
      console.log(val);
    },
    asd() {
      console.log("rrrrrr");
      this.$refs.search.setData("报价单状态111", this.demoList);
    },
  },
};
</script>

<style>
</style>