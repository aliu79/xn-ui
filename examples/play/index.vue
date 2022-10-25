<template>
  <div>
    <xn-search ref="search" :form-data="formSearch" @on-search="onSearch"></xn-search>

    <xn-search ref="search" :span="2" :show-coll="false" :form-data="formSearch" @on-search="onSearch"></xn-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSearch: [
        {
          label: "报价单状态",
          type: "select",
          prop: "salesCode",
          data:[{asd:'asdas',a:1},{asd:'sfsddfdsf',a:2}],
          options:{
            labelKey:'asd',
            valueKey:'a',
            multiple:true
          }
        },
        {
          label: "报价单状态",
          type: "select",
          prop: "field1",
        },
        {
          label: "报价单状态",
          type: "input",
          prop: "field2",
        },
        {
          label: "订单号",
          type: "city",
          prop: "city",
          placeholder: "请输入订单号",
        },
        {
          label: "下单日期",
          type: "daterange",
          options: { start: "orderTimeLeft", end: "orderTimeRight" },
        },
      ],
      demoList:[{asd:'asdas',a:1},{asd:'sfsddfdsf',a:2}]
    };
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    asd() {
      console.log("rrrrrr");
      this.$refs.search.setData('报价单状态',this.demoList)
    },
  },
};
</script>

<style>
</style>